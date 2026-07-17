import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';

interface CarrierConfig {
  experimentId: string;
  initialSequence: string[];
  baselineSteps: number;
  replicates: number;
  panelPairs: number;
  horizon: number;
  theta: number;
  observerPersistence: number;
  kappa: number;
  recoveryWeights: {
    coherenceDelta: number;
    bridgeDelta: number;
    structuralLoss: number;
  };
}

interface FrozenCheckpoint {
  measuredEmergence: 0 | 1;
  sourceSeed: number;
  sourceStep: number;
  sequence: string[];
  duality: number;
  coherence: number;
  bridgeRate: number;
  targetBridgeSignatures: string[];
  lesions: unknown[];
}

interface FrozenPair {
  pairId: string;
  nonEmergent: FrozenCheckpoint;
  emergent: FrozenCheckpoint;
}

interface FrozenPanel {
  selectorSha256: string;
  frozen: {
    config: CarrierConfig;
    pairs: FrozenPair[];
  };
}

type CapsuleId = 'M0-unlatched' | 'M1-latched';

interface MacroHistoryCapsule {
  schemaVersion: 'emerge-carrier-capsule-v1';
  capsuleId: CapsuleId;
  declaredObserverState: 0 | 1;
  sourcePairId: string;
  sourceSeed: number;
  sourceStep: number;
  dEma: number;
  rawDuality: number;
  persistenceCounter: number;
  qualifyingInventoryChangeSeen: boolean;
  threshold: number;
  requiredPersistence: number;
  historyWindow: number;
  boundedDualityHistory: number[];
  sourceSequenceSha256: string;
  reconstructionVerified: boolean;
}

interface FrozenCarrierPair {
  pairId: string;
  m0: MacroHistoryCapsule;
  m1: MacroHistoryCapsule;
}

function stableHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function multisetKey(sequence: string[]): string {
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join('|');
}

function loadPanel(path: string): FrozenPanel {
  const panel = JSON.parse(readFileSync(path, 'utf8')) as FrozenPanel;
  const observed = stableHash(panel.frozen);
  if (observed !== panel.selectorSha256) {
    throw new Error(`Frozen V2.2 panel hash mismatch: expected ${panel.selectorSha256}, observed ${observed}.`);
  }
  return panel;
}

function reconstructCapsule(
  codex: Codex,
  config: CarrierConfig,
  pairId: string,
  checkpoint: FrozenCheckpoint,
  capsuleId: CapsuleId,
): MacroHistoryCapsule {
  const telos = new Telos(codex, {
    seed: checkpoint.sourceSeed,
    threshold: config.theta,
    observerPersistence: config.observerPersistence,
  });
  const run = telos.run(config.initialSequence, config.baselineSteps);
  const source = run.history.find(step => step.step === checkpoint.sourceStep);
  if (!source) {
    throw new Error(`${pairId}/${capsuleId} source step ${checkpoint.sourceStep} was not reconstructed.`);
  }
  if (source.sequence.join('|') !== checkpoint.sequence.join('|')) {
    throw new Error(`${pairId}/${capsuleId} reconstructed source sequence does not match the frozen checkpoint.`);
  }
  if (Math.abs(source.duality - checkpoint.duality) > 1e-12) {
    throw new Error(`${pairId}/${capsuleId} reconstructed EMA duality does not match the frozen checkpoint.`);
  }

  let qualifyingInventoryChangeSeen = false;
  let persistenceCounter = 0;
  let declaredObserverState: 0 | 1 = 0;
  for (const step of run.history.filter(entry => entry.step > 0 && entry.step <= checkpoint.sourceStep)) {
    if (step.accepted && step.inventoryChanged) qualifyingInventoryChangeSeen = true;
    if (declaredObserverState === 0 && qualifyingInventoryChangeSeen) {
      if (step.duality >= config.theta) {
        persistenceCounter++;
        if (persistenceCounter >= config.observerPersistence) declaredObserverState = 1;
      } else {
        persistenceCounter = 0;
      }
    }
  }

  if (declaredObserverState !== checkpoint.measuredEmergence) {
    throw new Error(
      `${pairId}/${capsuleId} reconstructed declaration ${declaredObserverState} does not match frozen class ${checkpoint.measuredEmergence}.`,
    );
  }

  const historyWindow = 16;
  const boundedDualityHistory = run.history
    .filter(step => step.step <= checkpoint.sourceStep)
    .slice(-historyWindow)
    .map(step => step.duality);

  return {
    schemaVersion: 'emerge-carrier-capsule-v1',
    capsuleId,
    declaredObserverState,
    sourcePairId: pairId,
    sourceSeed: checkpoint.sourceSeed,
    sourceStep: checkpoint.sourceStep,
    dEma: source.duality,
    rawDuality: source.rawDuality,
    persistenceCounter,
    qualifyingInventoryChangeSeen,
    threshold: config.theta,
    requiredPersistence: config.observerPersistence,
    historyWindow,
    boundedDualityHistory,
    sourceSequenceSha256: stableHash(checkpoint.sequence),
    reconstructionVerified: true,
  };
}

function main(): void {
  const panelPath = resolve(
    process.argv[2] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const outputPath = resolve(
    process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-capsules.json',
  );
  const panel = loadPanel(panelPath);
  const config = panel.frozen.config;
  const codex = new Codex();

  const pairs: FrozenCarrierPair[] = panel.frozen.pairs.map(pair => ({
    pairId: pair.pairId,
    m0: reconstructCapsule(codex, config, pair.pairId, pair.nonEmergent, 'M0-unlatched'),
    m1: reconstructCapsule(codex, config, pair.pairId, pair.emergent, 'M1-latched'),
  }));

  const frozen = {
    schemaVersion: 'emerge-carrier-002-capsule-freeze-v1',
    experimentId: 'EMERGE-CARRIER-002',
    selectionBoundary:
      'All macro-history capsules are reconstructed, verified and hashed before zero-coupling or active-carrier branches execute.',
    sourceSelectorSha256: panel.selectorSha256,
    historyWindow: 16,
    emaAlpha: 0.2,
    couplingDoctrine: {
      zeroCoupling: 'Capsule is updated and receipted but contributes exactly zero to candidate score and deltaScore.',
      activeCoupling:
        'For insert candidates only, replace the memoryless raw-duality loss with the model-native EMA-continuity loss. Apply the replacement differential equally to score and deltaScore so the existing selector and admission rule can both observe the carrier.',
      declarationGate: false,
      feedbackStrengthChange: false,
    },
    pairs,
  };
  const capsuleSelectorSha256 = stableHash(frozen);
  const result = {
    generatedAt: new Date().toISOString(),
    capsuleSelectorSha256,
    frozen,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify(
      {
        experimentId: frozen.experimentId,
        sourceSelectorSha256: frozen.sourceSelectorSha256,
        capsuleSelectorSha256,
        pairs: pairs.length,
        capsules: pairs.length * 2,
        m0MeanDema:
          pairs.reduce((sum, pair) => sum + pair.m0.dEma, 0) / Math.max(pairs.length, 1),
        m1MeanDema:
          pairs.reduce((sum, pair) => sum + pair.m1.dEma, 0) / Math.max(pairs.length, 1),
        reconstructionVerified: pairs.every(
          pair => pair.m0.reconstructionVerified && pair.m1.reconstructionVerified,
        ),
      },
      null,
      2,
    ),
  );
}

main();
