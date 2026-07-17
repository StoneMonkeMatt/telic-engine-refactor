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

interface Checkpoint {
  measuredEmergence: 0 | 1;
  sourceSeed: number;
  sourceStep: number;
  sequence: string[];
  duality: number;
  coherence: number;
  bridgeRate: number;
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
  if (parsed.replicates < 1 || parsed.horizon < 1) throw new Error('replicates and horizon must be positive.');
  return parsed;
}

function checkpointFromStep(
  telos: Telos,
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
    bridgeRate: bridgeRate((telos as unknown as { codex: Codex }).codex, step.sequence),
  };
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

    const nonEmergentCandidates = result.history
      .filter(step => step.step < result.observerStep! && bridgeRate(codex, step.sequence) > 0)
      .sort((a, b) => bridgeRate(codex, b.sequence) - bridgeRate(codex, a.sequence) || b.step - a.step);
    const nonEmergentStep = nonEmergentCandidates[0];
    if (!nonEmergentStep) continue;

    return {
      emergent: {
        measuredEmergence: 1,
        sourceSeed,
        sourceStep: emergentStep.step,
        sequence: [...emergentStep.sequence],
        duality: emergentStep.duality,
        coherence: telos.coherence(emergentStep.sequence),
        bridgeRate: bridgeRate(codex, emergentStep.sequence),
      },
      nonEmergent: {
        measuredEmergence: 0,
        sourceSeed,
        sourceStep: nonEmergentStep.step,
        sequence: [...nonEmergentStep.sequence],
        duality: nonEmergentStep.duality,
        coherence: telos.coherence(nonEmergentStep.sequence),
        bridgeRate: bridgeRate(codex, nonEmergentStep.sequence),
      },
    };
  }

  throw new Error(
    `No usable emergent/non-emergent checkpoint pair found in ${config.checkpointSearchSeeds} seeds.`,
  );
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
    if (rawWinner && steeredWinner && rawWinner.sequence.join('|') !== steeredWinner.sequence.join('|')) {
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

function main(): void {
  const configPath = resolve(process.argv[2] ?? 'experiments/emerge-ko-001/config.example.json');
  const outputPath = resolve(process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001.json');
  const config = loadConfig(configPath);
  const codex = new Codex();
  const checkpoints = findCheckpointPair(config, codex);
  const results: BranchResult[] = [];

  for (let replicate = 0; replicate < config.replicates; replicate++) {
    for (const checkpoint of [checkpoints.nonEmergent, checkpoints.emergent]) {
      const perturbationSeed = config.seed + 10_000 + replicate * 101 + checkpoint.measuredEmergence;
      const branchSeed = config.seed + 20_000 + replicate * 101 + checkpoint.measuredEmergence;
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

  const output = {
    schemaVersion: 'emerge-ko-001-v1',
    generatedAt: new Date().toISOString(),
    config,
    checkpoints,
    cells,
    gamma,
    interpretation:
      gamma > 0
        ? 'Feedback is more effective in the measured-emergent checkpoint than in the non-emergent checkpoint.'
        : gamma < 0
          ? 'Feedback is mismatched with the measured-emergent checkpoint.'
          : 'Feedback behaves as a state-independent switch at the measured resolution.',
    results,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ outputPath, gamma, cells }, null, 2));
}

main();
