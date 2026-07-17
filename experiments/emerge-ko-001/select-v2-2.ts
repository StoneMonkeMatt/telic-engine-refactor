import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';
import { SimulationStep } from '../../src/types';
import {
  bridgeRate,
  bridgeSignatures,
} from './criticalBridgePermutation';
import {
  ExactTargetBridgeLesion,
  generateExactTargetBridgeLesion,
  selectTargetBridgeOccurrences,
} from './exactTargetBridgeLesion';

interface V22Config {
  experimentId: string;
  initialSequence: string[];
  seed: number;
  replicates: number;
  panelPairs: number;
  targetBridgeCount: number;
  checkpointSearchSeeds: number;
  baselineSteps: number;
  horizon: number;
  maxPermutationAttempts: number;
  theta: number;
  observerPersistence: number;
  kappa: number;
  recoveryWeights: {
    coherenceDelta: number;
    bridgeDelta: number;
    structuralLoss: number;
  };
  recoveryThresholds: {
    targetRecovery: number;
    coherenceTolerance: number;
  };
}

interface CandidateCheckpoint {
  measuredEmergence: 0 | 1;
  sourceSeed: number;
  sourceStep: number;
  sequence: string[];
  duality: number;
  coherence: number;
  bridgeRate: number;
  activeBridgeCount: number;
  observerCount: number;
  inventoryKey: string;
}

interface FrozenLesion extends ExactTargetBridgeLesion {
  replicate: number;
  branchSeed: number;
}

interface FrozenCheckpoint extends CandidateCheckpoint {
  targetBridgeIndices: number[];
  targetBridgeSignatures: string[];
  lesions: FrozenLesion[];
}

interface FrozenPair {
  pairId: string;
  matchTier: string;
  matchDistance: number;
  nonEmergent: FrozenCheckpoint;
  emergent: FrozenCheckpoint;
}

const OBSERVER_TOKENS = new Set(['👁️', '🧠', 'qualia', '🌟']);

function loadConfig(path: string): V22Config {
  const config = JSON.parse(readFileSync(path, 'utf8')) as V22Config;
  if (config.panelPairs < 2) throw new Error('panelPairs must be at least 2.');
  if (config.targetBridgeCount < 1) throw new Error('targetBridgeCount must be positive.');
  if (config.replicates < 2) throw new Error('replicates must be at least 2.');
  if (!(config.theta > 0 && config.theta < 1)) throw new Error('theta must lie in (0,1).');
  return config;
}

function inventoryKey(sequence: string[]): string {
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join('|');
}

function sequenceKey(sequence: string[]): string {
  return sequence.join('|');
}

function observerCount(sequence: string[]): number {
  return sequence.reduce((count, symbol) => count + Number(OBSERVER_TOKENS.has(symbol)), 0);
}

function checkpointFromStep(
  telos: Telos,
  codex: Codex,
  step: SimulationStep,
  measuredEmergence: 0 | 1,
  sourceSeed: number,
): CandidateCheckpoint {
  const signatures = bridgeSignatures(codex, step.sequence);
  return {
    measuredEmergence,
    sourceSeed,
    sourceStep: step.step,
    sequence: [...step.sequence],
    duality: step.duality,
    coherence: telos.coherence(step.sequence),
    bridgeRate: bridgeRate(codex, step.sequence),
    activeBridgeCount: signatures.length,
    observerCount: observerCount(step.sequence),
    inventoryKey: inventoryKey(step.sequence),
  };
}

function collectCandidates(
  config: V22Config,
  codex: Codex,
): { emergent: CandidateCheckpoint[]; nonEmergent: CandidateCheckpoint[] } {
  const emergent: CandidateCheckpoint[] = [];
  const nonEmergentByKey = new Map<string, CandidateCheckpoint>();

  for (let offset = 0; offset < config.checkpointSearchSeeds; offset++) {
    const sourceSeed = config.seed + offset;
    const telos = new Telos(codex, {
      seed: sourceSeed,
      threshold: config.theta,
      observerPersistence: config.observerPersistence,
    });
    const result = telos.run(config.initialSequence, config.baselineSteps);
    if (!result.observerEmerged || result.observerStep === undefined) continue;

    const observerStep = result.observerStep;
    const emergentStep = result.history.find(step => step.step === observerStep);
    if (emergentStep) {
      const checkpoint = checkpointFromStep(telos, codex, emergentStep, 1, sourceSeed);
      if (checkpoint.activeBridgeCount >= config.targetBridgeCount) emergent.push(checkpoint);
    }

    for (const step of result.history) {
      if (step.step >= observerStep) continue;
      const checkpoint = checkpointFromStep(telos, codex, step, 0, sourceSeed);
      if (checkpoint.activeBridgeCount < config.targetBridgeCount) continue;
      const key = `${sourceSeed}:${sequenceKey(checkpoint.sequence)}`;
      const prior = nonEmergentByKey.get(key);
      if (!prior || checkpoint.sourceStep > prior.sourceStep) nonEmergentByKey.set(key, checkpoint);
    }
  }

  return {
    emergent: emergent.sort((a, b) => a.sourceSeed - b.sourceSeed || a.sourceStep - b.sourceStep),
    nonEmergent: [...nonEmergentByKey.values()].sort(
      (a, b) => a.sourceSeed - b.sourceSeed || a.sourceStep - b.sourceStep,
    ),
  };
}

function matchTier(emergent: CandidateCheckpoint, candidate: CandidateCheckpoint): number {
  const sameInventory = emergent.inventoryKey === candidate.inventoryKey;
  const sameBridgeCount = emergent.activeBridgeCount === candidate.activeBridgeCount;
  if (sameInventory && sameBridgeCount) return 0;
  if (sameBridgeCount) return 1;
  if (sameInventory) return 2;
  return 3;
}

function matchingDistance(emergent: CandidateCheckpoint, candidate: CandidateCheckpoint): number {
  return (
    2 * Math.abs(emergent.bridgeRate - candidate.bridgeRate) +
    Math.abs(emergent.coherence - candidate.coherence) +
    0.25 * Math.abs(emergent.activeBridgeCount - candidate.activeBridgeCount)
  );
}

function freezeCheckpoint(
  config: V22Config,
  codex: Codex,
  checkpoint: CandidateCheckpoint,
  pairIndex: number,
): FrozenCheckpoint {
  const targets = selectTargetBridgeOccurrences(codex, checkpoint.sequence, config.targetBridgeCount);
  const lesions: FrozenLesion[] = [];

  for (let replicate = 0; replicate < config.replicates; replicate++) {
    const perturbationSeed = config.seed + 30_000 + pairIndex * 100_000 + replicate * 101;
    const branchSeed = config.seed + 40_000 + pairIndex * 100_000 + replicate * 101;
    const lesion = generateExactTargetBridgeLesion(
      codex,
      checkpoint.sequence,
      targets.signatures,
      targets.indices,
      perturbationSeed,
      config.maxPermutationAttempts,
    );

    const remainingTargetOverlap = targets.signatures.filter(signature =>
      bridgeSignatures(codex, lesion.sequence).includes(signature),
    ).length;
    if (remainingTargetOverlap !== 0) {
      throw new Error('Frozen lesion retained a target signature; Y must begin at zero.');
    }

    lesions.push({
      ...lesion,
      replicate,
      branchSeed,
    });
  }

  return {
    ...checkpoint,
    targetBridgeIndices: targets.indices,
    targetBridgeSignatures: targets.signatures,
    lesions,
  };
}

function tryFreezePair(
  config: V22Config,
  codex: Codex,
  pairIndex: number,
  emergent: CandidateCheckpoint,
  nonEmergent: CandidateCheckpoint,
): FrozenPair | null {
  try {
    return {
      pairId: `pair-${String(pairIndex + 1).padStart(2, '0')}`,
      matchTier: ['same-inventory-and-bridge-count', 'same-bridge-count', 'same-inventory', 'matched-shape'][
        matchTier(emergent, nonEmergent)
      ],
      matchDistance: matchingDistance(emergent, nonEmergent),
      nonEmergent: freezeCheckpoint(config, codex, nonEmergent, pairIndex),
      emergent: freezeCheckpoint(config, codex, emergent, pairIndex),
    };
  } catch {
    return null;
  }
}

function selectPanel(config: V22Config, codex: Codex): FrozenPair[] {
  const candidates = collectCandidates(config, codex);
  const pairs: FrozenPair[] = [];
  const usedSeeds = new Set<number>();
  const usedSequences = new Set<string>();

  for (const emergent of candidates.emergent) {
    if (pairs.length === config.panelPairs) break;
    if (usedSeeds.has(emergent.sourceSeed) || usedSequences.has(sequenceKey(emergent.sequence))) continue;

    const eligible = candidates.nonEmergent
      .filter(candidate => candidate.sourceSeed !== emergent.sourceSeed)
      .filter(candidate => !usedSeeds.has(candidate.sourceSeed))
      .filter(candidate => !usedSequences.has(sequenceKey(candidate.sequence)))
      .filter(candidate => candidate.sequence.length === emergent.sequence.length)
      .filter(candidate => candidate.observerCount === emergent.observerCount)
      .sort(
        (a, b) =>
          matchTier(emergent, a) - matchTier(emergent, b) ||
          matchingDistance(emergent, a) - matchingDistance(emergent, b) ||
          a.sourceSeed - b.sourceSeed ||
          b.sourceStep - a.sourceStep,
      );

    for (const nonEmergent of eligible) {
      const frozen = tryFreezePair(config, codex, pairs.length, emergent, nonEmergent);
      if (!frozen) continue;
      pairs.push(frozen);
      usedSeeds.add(emergent.sourceSeed);
      usedSeeds.add(nonEmergent.sourceSeed);
      usedSequences.add(sequenceKey(emergent.sequence));
      usedSequences.add(sequenceKey(nonEmergent.sequence));
      break;
    }
  }

  if (pairs.length !== config.panelPairs) {
    throw new Error(
      `Selector froze ${pairs.length} matched pairs; ${config.panelPairs} were preregistered.`,
    );
  }

  return pairs;
}

function main(): void {
  const configPath = resolve(process.argv[2] ?? 'experiments/emerge-ko-001/config-v2-2.json');
  const outputPath = resolve(
    process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const config = loadConfig(configPath);
  const codex = new Codex();
  const pairs = selectPanel(config, codex);

  const frozen = {
    schemaVersion: 'emerge-ko-001-v2.2-frozen-panel',
    experimentId: config.experimentId,
    selectionBoundary: 'All checkpoints, targets, lesions, perturbation seeds, and branch seeds are frozen before treatment execution.',
    matchingDoctrine: {
      panelPairs: config.panelPairs,
      exactTargetBridgeCount: config.targetBridgeCount,
      requiredEqualLength: true,
      requiredEqualObserverCount: true,
      sourceSeedReuse: false,
      matchingDistanceExcludesDuality: true,
      treatmentOutcomesAvailableToSelector: false,
    },
    config,
    pairs,
  };
  const selectorSha256 = createHash('sha256').update(JSON.stringify(frozen)).digest('hex');
  const output = {
    generatedAt: new Date().toISOString(),
    selectorSha256,
    frozen,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify(
      {
        outputPath,
        selectorSha256,
        pairCount: pairs.length,
        totalFrozenLesions: pairs.length * 2 * config.replicates,
        pairs: pairs.map(pair => ({
          pairId: pair.pairId,
          matchTier: pair.matchTier,
          matchDistance: pair.matchDistance,
          nonEmergent: {
            sourceSeed: pair.nonEmergent.sourceSeed,
            sourceStep: pair.nonEmergent.sourceStep,
            duality: pair.nonEmergent.duality,
            activeBridgeCount: pair.nonEmergent.activeBridgeCount,
            targets: pair.nonEmergent.targetBridgeSignatures,
          },
          emergent: {
            sourceSeed: pair.emergent.sourceSeed,
            sourceStep: pair.emergent.sourceStep,
            duality: pair.emergent.duality,
            activeBridgeCount: pair.emergent.activeBridgeCount,
            targets: pair.emergent.targetBridgeSignatures,
          },
        })),
      },
      null,
      2,
    ),
  );
}

main();
