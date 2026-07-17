import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';
import { SeededRandom } from '../../src/logic/random';
import { buildProposalFrontier } from '../../src/logic/proposals/frontier';
import { rankProposals } from '../../src/logic/proposals/rank';
import { selectProposal } from '../../src/logic/proposals/select';
import { createTieBreakContext } from '../../src/logic/benchmarks/reproducibility';
import { SimulationStep } from '../../src/types';
import {
  bridgeRate,
  bridgeSignatures,
  generateCriticalBridgePermutation,
  multisetRecall,
  PerturbationReceipt,
} from './criticalBridgePermutation';

interface ExperimentConfig {
  experimentId: string;
  initialSequence: string[];
  seed: number;
  replicates: number;
  checkpointSearchSeeds: number;
  baselineSteps: number;
  horizon: number;
  rho: number;
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
    bridgeOverlap: number;
    coherenceTolerance: number;
  };
}

type MatchTier = 'same-inventory' | 'same-length-observer-count' | 'nearest-distinct';

interface Checkpoint {
  measuredEmergence: 0 | 1;
  sourceSeed: number;
  sourceStep: number;
  sequence: string[];
  duality: number;
  coherence: number;
  bridgeRate: number;
  observerCount: number;
  inventoryKey: string;
  matchTier?: MatchTier;
  matchDistance?: number;
}

interface BranchResult {
  measuredEmergence: 0 | 1;
  feedback: 0 | 1;
  replicate: number;
  branchSeed: number;
  perturbation: PerturbationReceipt;
  initialBridgeOverlap: number;
  finalBridgeOverlap: number;
  initialCoherence: number;
  finalCoherence: number;
  finalBridgeRate: number;
  recoveryStep: number | null;
  acceptedSteps: number;
  feedbackChangedWinnerSteps: number;
  finalSequence: string[];
}

interface AggregateCell {
  measuredEmergence: 0 | 1;
  feedback: 0 | 1;
  n: number;
  meanFinalBridgeOverlap: number;
  meanFinalCoherence: number;
  meanRecoveryStep: number | null;
  recoveryRate: number;
  meanFeedbackChangedWinnerSteps: number;
}

function loadConfig(path: string): ExperimentConfig {
  const parsed = JSON.parse(readFileSync(path, 'utf8')) as ExperimentConfig;
  if (!(parsed.theta > 0 && parsed.theta < 1)) throw new Error('theta must lie in (0,1).');
  if (!(parsed.rho > 0 && parsed.rho <= 1)) throw new Error('rho must lie in (0,1].');
  if (parsed.replicates < 2 || parsed.horizon < 1) throw new Error('replicates must be at least 2 and horizon positive.');
  return parsed;
}

function inventoryKey(sequence: string[]): string {
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join('|');
}

function observerCount(sequence: string[]): number {
  const observerTokens = new Set(['👁️', '🧠', 'qualia', '🌟']);
  return sequence.reduce((count, symbol) => count + Number(observerTokens.has(symbol)), 0);
}

function sequenceKey(sequence: string[]): string {
  return sequence.join('|');
}

function checkpointFromStep(
  telos: Telos,
  codex: Codex,
  step: SimulationStep,
  measuredEmergence: 0 | 1,
  sourceSeed: number,
): Checkpoint {
  return {
    measuredEmergence,
    sourceSeed,
    sourceStep: step.step,
    sequence: [...step.sequence],
    duality: step.duality,
    coherence: telos.coherence(step.sequence),
    bridgeRate: bridgeRate(codex, step.sequence),
    observerCount: observerCount(step.sequence),
    inventoryKey: inventoryKey(step.sequence),
  };
}

function checkpointDistance(a: Checkpoint, b: Checkpoint): number {
  return (
    2 * Math.abs(a.bridgeRate - b.bridgeRate) +
    Math.abs(a.coherence - b.coherence) +
    Math.abs(a.duality - b.duality) +
    Math.abs(a.sequence.length - b.sequence.length) / 10 +
    Math.abs(a.observerCount - b.observerCount) / 4
  );
}

function chooseMatchedNonEmergent(emergent: Checkpoint, candidates: Checkpoint[]): Checkpoint | null {
  const distinct = candidates.filter(candidate => sequenceKey(candidate.sequence) !== sequenceKey(emergent.sequence));
  if (distinct.length === 0) return null;

  const tiers: Array<{ tier: MatchTier; members: Checkpoint[] }> = [
    {
      tier: 'same-inventory',
      members: distinct.filter(candidate => candidate.inventoryKey === emergent.inventoryKey),
    },
    {
      tier: 'same-length-observer-count',
      members: distinct.filter(
        candidate =>
          candidate.sequence.length === emergent.sequence.length &&
          candidate.observerCount === emergent.observerCount,
      ),
    },
    { tier: 'nearest-distinct', members: distinct },
  ];

  for (const { tier, members } of tiers) {
    if (members.length === 0) continue;
    const selected = [...members].sort(
      (a, b) => checkpointDistance(emergent, a) - checkpointDistance(emergent, b) || b.sourceStep - a.sourceStep,
    )[0];
    return {
      ...selected,
      matchTier: tier,
      matchDistance: checkpointDistance(emergent, selected),
    };
  }

  return null;
}

function findCheckpointPair(config: ExperimentConfig, codex: Codex): { emergent: Checkpoint; nonEmergent: Checkpoint } {
  for (let offset = 0; offset < config.checkpointSearchSeeds; offset++) {
    const sourceSeed = config.seed + offset;
    const telos = new Telos(codex, {
      seed: sourceSeed,
      threshold: config.theta,
      observerPersistence: config.observerPersistence,
    });
    const result = telos.run(config.initialSequence, config.baselineSteps);
    if (!result.observerEmerged || result.observerStep === undefined) continue;

    const emergentStep = result.history.find(step => step.step === result.observerStep);
    if (!emergentStep || bridgeRate(codex, emergentStep.sequence) <= 0) continue;
    const emergent = checkpointFromStep(telos, codex, emergentStep, 1, sourceSeed);

    const candidates = result.history
      .filter(step => step.step < result.observerStep! && bridgeRate(codex, step.sequence) > 0)
      .map(step => checkpointFromStep(telos, codex, step, 0, sourceSeed));
    const nonEmergent = chooseMatchedNonEmergent(emergent, candidates);
    if (!nonEmergent) continue;

    return { emergent, nonEmergent };
  }

  throw new Error(`No distinct matched checkpoint pair found in ${config.checkpointSearchSeeds} seeds.`);
}

function runBranch(
  config: ExperimentConfig,
  codex: Codex,
  checkpoint: Checkpoint,
  feedback: 0 | 1,
  replicate: number,
  perturbedSequence: string[],
  perturbation: PerturbationReceipt,
  branchSeed: number,
): BranchResult {
  const telos = new Telos(codex, {
    seed: branchSeed,
    threshold: config.theta,
    observerPersistence: config.observerPersistence,
  });
  const rng = new SeededRandom(branchSeed);
  const referenceBridges = bridgeSignatures(codex, checkpoint.sequence);
  const preCoherence = telos.coherence(checkpoint.sequence);
  const initialCoherence = telos.coherence(perturbedSequence);
  const initialBridgeOverlap = multisetRecall(referenceBridges, bridgeSignatures(codex, perturbedSequence));

  let current = [...perturbedSequence];
  let recoveryStep: number | null = null;
  let acceptedSteps = 0;
  let feedbackChangedWinnerSteps = 0;

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
      const overlap = multisetRecall(referenceBridges, bridgeSignatures(codex, candidate.sequence));
      const structuralLoss = 1 - overlap;
      const recovery =
        config.recoveryWeights.coherenceDelta * (candidateCoherence - currentCoherence) +
        config.recoveryWeights.bridgeDelta * (candidateBridgeRate - currentBridgeRate) -
        config.recoveryWeights.structuralLoss * structuralLoss;

      return {
        ...candidate,
        score: candidate.score + config.kappa * feedback * recovery,
      };
    });

    const rawWinner = [...ranked].sort((a, b) => b.score - a.score)[0];
    const steeredWinner = [...augmented].sort((a, b) => b.score - a.score)[0];
    if (rawWinner && steeredWinner && sequenceKey(rawWinner.sequence) !== sequenceKey(steeredWinner.sequence)) {
      feedbackChangedWinnerSteps++;
    }

    const selection = selectProposal(
      {
        ranked: augmented,
        currentTemp: Math.pow(0.95, step),
        tieBreakContext: createTieBreakContext(branchSeed, step, current),
      },
      rng,
    );

    if (selection.accepted) {
      current = [...selection.selected.sequence];
      acceptedSteps++;
    }

    const overlap = multisetRecall(referenceBridges, bridgeSignatures(codex, current));
    const coherence = telos.coherence(current);
    if (
      recoveryStep === null &&
      overlap >= config.recoveryThresholds.bridgeOverlap &&
      coherence >= preCoherence - config.recoveryThresholds.coherenceTolerance
    ) {
      recoveryStep = step;
    }
  }

  return {
    measuredEmergence: checkpoint.measuredEmergence,
    feedback,
    replicate,
    branchSeed,
    perturbation,
    initialBridgeOverlap,
    finalBridgeOverlap: multisetRecall(referenceBridges, bridgeSignatures(codex, current)),
    initialCoherence,
    finalCoherence: telos.coherence(current),
    finalBridgeRate: bridgeRate(codex, current),
    recoveryStep,
    acceptedSteps,
    feedbackChangedWinnerSteps,
    finalSequence: current,
  };
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function sampleStandardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const center = mean(values);
  return Math.sqrt(values.reduce((sum, value) => sum + Math.pow(value - center, 2), 0) / (values.length - 1));
}

function aggregate(results: BranchResult[], emergence: 0 | 1, feedback: 0 | 1): AggregateCell {
  const cell = results.filter(result => result.measuredEmergence === emergence && result.feedback === feedback);
  const recovered = cell.filter(result => result.recoveryStep !== null);
  return {
    measuredEmergence: emergence,
    feedback,
    n: cell.length,
    meanFinalBridgeOverlap: mean(cell.map(result => result.finalBridgeOverlap)),
    meanFinalCoherence: mean(cell.map(result => result.finalCoherence)),
    meanRecoveryStep: recovered.length ? mean(recovered.map(result => result.recoveryStep!)) : null,
    recoveryRate: recovered.length / Math.max(cell.length, 1),
    meanFeedbackChangedWinnerSteps: mean(cell.map(result => result.feedbackChangedWinnerSteps)),
  };
}

function branchOutcome(results: BranchResult[], replicate: number, emergence: 0 | 1, feedback: 0 | 1): number {
  const result = results.find(
    branch =>
      branch.replicate === replicate &&
      branch.measuredEmergence === emergence &&
      branch.feedback === feedback,
  );
  if (!result) throw new Error(`Missing branch e=${emergence}, z=${feedback}, replicate=${replicate}.`);
  return result.finalBridgeOverlap;
}

function main(): void {
  const configPath = resolve(process.argv[2] ?? 'experiments/emerge-ko-001/config.example.json');
  const outputPath = resolve(process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.json');
  const config = loadConfig(configPath);
  const codex = new Codex();
  const checkpoints = findCheckpointPair(config, codex);
  const results: BranchResult[] = [];

  for (let replicate = 0; replicate < config.replicates; replicate++) {
    const perturbationSeed = config.seed + 10_000 + replicate * 101;
    const branchSeed = config.seed + 20_000 + replicate * 101;

    for (const checkpoint of [checkpoints.nonEmergent, checkpoints.emergent]) {
      const perturbation = generateCriticalBridgePermutation(
        codex,
        checkpoint.sequence,
        config.rho,
        perturbationSeed,
        config.maxPermutationAttempts,
      );

      for (const feedback of [0, 1] as const) {
        results.push(
          runBranch(
            config,
            codex,
            checkpoint,
            feedback,
            replicate,
            perturbation.sequence,
            perturbation.receipt,
            branchSeed,
          ),
        );
      }
    }
  }

  const cells = [
    aggregate(results, 0, 0),
    aggregate(results, 0, 1),
    aggregate(results, 1, 0),
    aggregate(results, 1, 1),
  ];
  const lookup = (e: 0 | 1, z: 0 | 1) =>
    cells.find(cell => cell.measuredEmergence === e && cell.feedback === z)!.meanFinalBridgeOverlap;
  const gamma = (lookup(1, 1) - lookup(1, 0)) - (lookup(0, 1) - lookup(0, 0));

  const replicateGammas = Array.from({ length: config.replicates }, (_, replicate) =>
    (branchOutcome(results, replicate, 1, 1) - branchOutcome(results, replicate, 1, 0)) -
    (branchOutcome(results, replicate, 0, 1) - branchOutcome(results, replicate, 0, 0)),
  );
  const gammaStandardError = sampleStandardDeviation(replicateGammas) / Math.sqrt(replicateGammas.length);
  const gamma95 = {
    lower: gamma - 1.96 * gammaStandardError,
    upper: gamma + 1.96 * gammaStandardError,
  };

  const output = {
    schemaVersion: 'emerge-ko-001-v2',
    generatedAt: new Date().toISOString(),
    auditCorrections: [
      'Emergent and non-emergent checkpoints must have distinct symbolic sequences.',
      'The same perturbation and branch seed schedule is used across measured-emergence classes.',
      'Gamma is reported replicate-by-replicate with a descriptive 95% interval.',
    ],
    config,
    checkpoints,
    cells,
    gamma,
    replicateGammas,
    gammaStandardError,
    gamma95,
    interpretation:
      gamma95.lower > 0
        ? 'Positive first-pass interaction with a descriptive interval above zero; independent checkpoint pairs remain required.'
        : gamma95.upper < 0
          ? 'Negative first-pass interaction; feedback is mismatched with the measured-emergent checkpoint.'
          : 'The first-pass interval includes zero; state-specific causal efficacy is not established.',
    results,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ outputPath, gamma, gamma95, checkpoints, cells }, null, 2));
}

main();
