import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';
import { SeededRandom } from '../../src/logic/random';
import { buildProposalFrontier } from '../../src/logic/proposals/frontier';
import { rankProposals } from '../../src/logic/proposals/rank';
import { selectProposal } from '../../src/logic/proposals/select';
import { createTieBreakContext } from '../../src/logic/benchmarks/reproducibility';
import {
  bridgeRate,
  bridgeSignatures,
  multisetRecall,
} from './criticalBridgePermutation';
import { ExactTargetBridgeLesionReceipt } from './exactTargetBridgeLesion';

interface CarrierConfig {
  experimentId: string;
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

interface FrozenLesion {
  sequence: string[];
  receipt: ExactTargetBridgeLesionReceipt;
  replicate: number;
  branchSeed: number;
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
  lesions: FrozenLesion[];
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
type MicrostateSource = 'nonEmergent' | 'emergent';

interface MacroHistoryCapsule {
  capsuleId: CapsuleId;
  declaredObserverState: 0 | 1;
  sourceSeed: number;
  sourceStep: number;
  sourceSmoothedDuality: number;
  threshold: number;
  requiredPersistence: number;
  persistenceReceipt: 'not-latched-at-source-step' | 'latched-at-source-step';
}

interface KernelProjection {
  finalTargetRecovery: number;
  finalCoherence: number;
  finalBridgeRate: number;
  acceptedSteps: number;
  feedbackChangedWinnerSteps: number;
  finalSequence: string[];
}

interface ComparisonReceipt {
  pairId: string;
  microstateSource: MicrostateSource;
  replicate: number;
  feedback: 0 | 1;
  branchSeed: number;
  targetBridgeSignatures: string[];
  lesionSha256: string;
  m0CapsuleSha256: string;
  m1CapsuleSha256: string;
  projectedTrajectorySha256: string;
  byteIdentical: boolean;
  finalTargetRecovery: number;
}

function stableHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function loadPanel(path: string): FrozenPanel {
  const panel = JSON.parse(readFileSync(path, 'utf8')) as FrozenPanel;
  const observedHash = stableHash(panel.frozen);
  if (observedHash !== panel.selectorSha256) {
    throw new Error(
      `Frozen panel hash mismatch: expected ${panel.selectorSha256}, observed ${observedHash}.`,
    );
  }
  return panel;
}

function buildCapsules(
  config: CarrierConfig,
  pair: FrozenPair,
): [MacroHistoryCapsule, MacroHistoryCapsule] {
  const m0: MacroHistoryCapsule = {
    capsuleId: 'M0-unlatched',
    declaredObserverState: 0,
    sourceSeed: pair.nonEmergent.sourceSeed,
    sourceStep: pair.nonEmergent.sourceStep,
    sourceSmoothedDuality: pair.nonEmergent.duality,
    threshold: config.theta,
    requiredPersistence: config.observerPersistence,
    persistenceReceipt: 'not-latched-at-source-step',
  };
  const m1: MacroHistoryCapsule = {
    capsuleId: 'M1-latched',
    declaredObserverState: 1,
    sourceSeed: pair.emergent.sourceSeed,
    sourceStep: pair.emergent.sourceStep,
    sourceSmoothedDuality: pair.emergent.duality,
    threshold: config.theta,
    requiredPersistence: config.observerPersistence,
    persistenceReceipt: 'latched-at-source-step',
  };
  if (JSON.stringify(m0) === JSON.stringify(m1)) {
    throw new Error(`${pair.pairId} produced indistinguishable macro-history capsules.`);
  }
  return [m0, m1];
}

function runCurrentKernel(
  config: CarrierConfig,
  codex: Codex,
  checkpoint: FrozenCheckpoint,
  lesion: FrozenLesion,
  feedback: 0 | 1,
  macroHistory: MacroHistoryCapsule,
): KernelProjection {
  // EMERGE-CARRIER-001 boundary: the current recovery kernel has no state-carrier
  // input. The capsule is intentionally receipt-only. Any output difference between
  // the twins therefore reveals an undocumented leak or nondeterminism.
  void macroHistory;

  const telos = new Telos(codex, {
    seed: lesion.branchSeed,
    threshold: config.theta,
    observerPersistence: config.observerPersistence,
  });
  const rng = new SeededRandom(lesion.branchSeed);
  const targets = checkpoint.targetBridgeSignatures;
  let current = [...lesion.sequence];
  let acceptedSteps = 0;
  let feedbackChangedWinnerSteps = 0;

  const initialRecovery = multisetRecall(targets, bridgeSignatures(codex, current));
  if (initialRecovery !== 0) {
    throw new Error(
      `Carrier-null branch E=${checkpoint.measuredEmergence} replicate=${lesion.replicate} did not begin at Y=0.`,
    );
  }

  for (let step = 1; step <= config.horizon; step++) {
    const frontier = buildProposalFrontier(current, step, {
      codex,
      rng,
      maxSequenceLength: 10,
      architectureMode: 'stratified',
    });
    const ranked = rankProposals(frontier, telos);
    const currentCoherence = telos.coherence(current);
    const currentBridgeRate = bridgeRate(codex, current);

    const augmented = ranked.map(candidate => {
      const candidateCoherence = telos.coherence(candidate.sequence);
      const candidateBridgeRate = bridgeRate(codex, candidate.sequence);
      const targetRecovery = multisetRecall(
        targets,
        bridgeSignatures(codex, candidate.sequence),
      );
      const structuralLoss = 1 - targetRecovery;
      const recovery =
        config.recoveryWeights.coherenceDelta *
          (candidateCoherence - currentCoherence) +
        config.recoveryWeights.bridgeDelta *
          (candidateBridgeRate - currentBridgeRate) -
        config.recoveryWeights.structuralLoss * structuralLoss;

      return {
        ...candidate,
        score: candidate.score + config.kappa * feedback * recovery,
      };
    });

    const rawWinner = [...ranked].sort((a, b) => b.score - a.score)[0];
    const steeredWinner = [...augmented].sort((a, b) => b.score - a.score)[0];
    if (
      rawWinner &&
      steeredWinner &&
      rawWinner.sequence.join('|') !== steeredWinner.sequence.join('|')
    ) {
      feedbackChangedWinnerSteps++;
    }

    const selection = selectProposal(
      {
        ranked: augmented,
        currentTemp: Math.pow(0.95, step),
        tieBreakContext: createTieBreakContext(lesion.branchSeed, step, current),
      },
      rng,
    );

    if (selection.accepted) {
      current = [...selection.selected.sequence];
      acceptedSteps++;
    }
  }

  return {
    finalTargetRecovery: multisetRecall(
      targets,
      bridgeSignatures(codex, current),
    ),
    finalCoherence: telos.coherence(current),
    finalBridgeRate: bridgeRate(codex, current),
    acceptedSteps,
    feedbackChangedWinnerSteps,
    finalSequence: current,
  };
}

function main(): void {
  const panelPath = resolve(
    process.argv[2] ??
      'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const outputPath = resolve(
    process.argv[3] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-001-result.json',
  );
  const panel = loadPanel(panelPath);
  const config = panel.frozen.config;
  const codex = new Codex();
  const receipts: ComparisonReceipt[] = [];
  const outcomes = new Map<string, number[]>();

  for (const pair of panel.frozen.pairs) {
    const [m0, m1] = buildCapsules(config, pair);
    for (const microstateSource of ['nonEmergent', 'emergent'] as const) {
      const checkpoint = pair[microstateSource];
      for (const lesion of checkpoint.lesions) {
        for (const feedback of [0, 1] as const) {
          const projectionM0 = runCurrentKernel(
            config,
            codex,
            checkpoint,
            lesion,
            feedback,
            m0,
          );
          const projectionM1 = runCurrentKernel(
            config,
            codex,
            checkpoint,
            lesion,
            feedback,
            m1,
          );
          const byteIdentical =
            JSON.stringify(projectionM0) === JSON.stringify(projectionM1);
          const receipt: ComparisonReceipt = {
            pairId: pair.pairId,
            microstateSource,
            replicate: lesion.replicate,
            feedback,
            branchSeed: lesion.branchSeed,
            targetBridgeSignatures: [...checkpoint.targetBridgeSignatures],
            lesionSha256: stableHash({
              sequence: lesion.sequence,
              receipt: lesion.receipt,
            }),
            m0CapsuleSha256: stableHash(m0),
            m1CapsuleSha256: stableHash(m1),
            projectedTrajectorySha256: stableHash(projectionM0),
            byteIdentical,
            finalTargetRecovery: projectionM0.finalTargetRecovery,
          };
          receipts.push(receipt);
          if (!byteIdentical) {
            throw new Error(
              `Carrier-null mismatch at ${pair.pairId}/${microstateSource}/replicate=${lesion.replicate}/Z=${feedback}.`,
            );
          }

          for (const capsule of [m0, m1]) {
            const key = `${capsule.capsuleId}|${feedback}`;
            const values = outcomes.get(key) ?? [];
            values.push(projectionM0.finalTargetRecovery);
            outcomes.set(key, values);
          }
        }
      }
    }
  }

  const cell = (capsuleId: CapsuleId, feedback: 0 | 1) => {
    const values = outcomes.get(`${capsuleId}|${feedback}`) ?? [];
    return {
      capsuleId,
      feedback,
      n: values.length,
      meanFinalTargetRecovery: mean(values),
    };
  };
  const cells = [cell('M0-unlatched', 0), cell('M0-unlatched', 1), cell('M1-latched', 0), cell('M1-latched', 1)];
  const value = (capsuleId: CapsuleId, feedback: 0 | 1): number =>
    cells.find(entry => entry.capsuleId === capsuleId && entry.feedback === feedback)!
      .meanFinalTargetRecovery;
  const carrierInteraction =
    (value('M1-latched', 1) - value('M1-latched', 0)) -
    (value('M0-unlatched', 1) - value('M0-unlatched', 0));
  const mismatches = receipts.filter(receipt => !receipt.byteIdentical);

  const result = {
    schemaVersion: 'emerge-carrier-001-v1',
    experimentId: 'EMERGE-CARRIER-001',
    generatedAt: new Date().toISOString(),
    sourceSelectorSha256: panel.selectorSha256,
    preregisteredExpectation: 'carrierInteraction = 0 and every projected twin trajectory byte-identical',
    architecturalBoundary:
      'Macro-history capsules are retained as receipts but are not consumed by the current recovery transition kernel.',
    panelPairs: panel.frozen.pairs.length,
    microstatesTested: panel.frozen.pairs.length * 2,
    frozenLesionsTested: panel.frozen.pairs.length * 2 * config.replicates,
    branchRuns: receipts.length * 2,
    twinComparisons: receipts.length,
    byteIdenticalComparisons: receipts.length - mismatches.length,
    mismatchCount: mismatches.length,
    cells,
    carrierInteraction,
    comparisonReceiptSha256: stableHash(receipts),
    comparisonReceipts: receipts,
    interpretation:
      mismatches.length === 0 && carrierInteraction === 0
        ? 'Carrier null confirmed: retained macro-history is currently descriptive metadata, not an executable causal state in the recovery kernel.'
        : 'Carrier null failed: investigate undocumented state leakage or nondeterminism before adding a state carrier.',
    nextExperiment:
      'EMERGE-CARRIER-002: add an explicit, auditable state capsule interface and test active carrier versus capsule knockout on identical microstates before any real-versus-shuffled timing comparison.',
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({
    experimentId: result.experimentId,
    sourceSelectorSha256: result.sourceSelectorSha256,
    twinComparisons: result.twinComparisons,
    byteIdenticalComparisons: result.byteIdenticalComparisons,
    mismatchCount: result.mismatchCount,
    cells: result.cells,
    carrierInteraction: result.carrierInteraction,
    comparisonReceiptSha256: result.comparisonReceiptSha256,
    interpretation: result.interpretation,
    nextExperiment: result.nextExperiment,
  }, null, 2));
}

main();
