import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';
import { SeededRandom } from '../../src/logic/random';
import { buildProposalFrontier } from '../../src/logic/proposals/frontier';
import { rankProposals } from '../../src/logic/proposals/rank';
import { selectProposal } from '../../src/logic/proposals/select';
import { resolveTie } from '../../src/logic/selection/tiebreak';
import { createTieBreakContext } from '../../src/logic/benchmarks/reproducibility';
import { RankedProposal, SimulationStep, TelosParams } from '../../src/types';
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
  firstStateDivergenceStep?: number | null;
  reconvergenceSteps?: number[];
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

interface ProposalTrace {
  candidateId: number;
  type: string;
  agent: string;
  symbols: string[];
  qRaw: number;
  recovery: number;
  qFeedback: number;
  deltaScore: number;
  rawDuality: number;
  coherence: number;
  bridgeRate: number;
  overlapY: number;
  deltaCoherence: number;
  deltaBridgeRate: number;
  deltaBridgeCount: number;
  structuralLoss: number;
}

interface StepTrace {
  schemaVersion: 'emerge-ko-001-v2.1-step';
  experimentId: string;
  measuredEmergence: 0 | 1;
  feedback: 0 | 1;
  replicate: number;
  branchSeed: number;
  sourceCheckpointStep: number;
  step: number;
  systemState: {
    sequence: string[];
    rawDuality: number;
    smoothedDuality: number;
    coherence: number;
    bridgeRate: number;
    bridgeCount: number;
    overlapY: number;
    activeBridges: string[];
  };
  decisionParameters: {
    temperature: number;
    rngDrawStart: number;
    frontierDraws: number;
    selectionDraws: number;
    firstDivergenceOccurred: boolean;
    divergenceStep: number | null;
  };
  frontierSummary: {
    totalProposals: number;
    positiveRecoveryProposals: number;
    bridgeGainProposals: number;
    overlapGainProposals: number;
  };
  proposals: ProposalTrace[];
  outcome: {
    rawWinnerIdx: number;
    feedbackWinnerIdx: number;
    selectedIdx: number;
    acceptedIdx: number | null;
    accepted: boolean;
    acceptanceDraw: number | null;
    acceptanceMode: 'automatic-improvement' | 'stochastic' | 'none-proposal';
    postSequence: string[];
    postRawDuality: number;
    postSmoothedDuality: number;
    postCoherence: number;
    postBridgeRate: number;
    postOverlapY: number;
    bridgesGained: string[];
    bridgesLost: string[];
    targetBridgesGained: string[];
    targetBridgesLost: string[];
  };
}

interface BranchExecution {
  result: BranchResult;
  traces: StepTrace[];
}

class AuditedRandom {
  private readonly generator: SeededRandom;
  private readonly values: number[] = [];

  constructor(seed: number) {
    this.generator = new SeededRandom(seed);
  }

  next(): number {
    const value = this.generator.next();
    this.values.push(value);
    return value;
  }

  mark(): number {
    return this.values.length;
  }

  countSince(mark: number): number {
    return this.values.length - mark;
  }

  firstSince(mark: number): number | null {
    return this.values.length > mark ? this.values[mark] : null;
  }
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

function resolveWinner(ranked: RankedProposal[], seed: number, step: number, sequence: string[]): RankedProposal {
  const maxScore = Math.max(...ranked.map(candidate => candidate.score));
  const eligible = ranked.filter(candidate => candidate.score === maxScore);
  return resolveTie(eligible, createTieBreakContext(seed, step, sequence)).selected;
}

function multisetDifference(left: string[], right: string[]): string[] {
  const rightCounts = new Map<string, number>();
  for (const item of right) rightCounts.set(item, (rightCounts.get(item) ?? 0) + 1);
  const difference: string[] = [];
  for (const item of left) {
    const count = rightCounts.get(item) ?? 0;
    if (count > 0) rightCounts.set(item, count - 1);
    else difference.push(item);
  }
  return difference;
}

function updateDiagnosticDuality(telos: Telos, previous: number, sequence: string[]): number {
  const params = (telos as unknown as { params: TelosParams }).params;
  const coherence = telos.coherence(sequence);
  const information = telos.information(sequence);
  const raw = telos.computeRawDuality(sequence);
  const force = params.lambda * coherence + params.eta * information + params.epsilon;
  const target = Math.min(1, raw * (1 + force * 0.2));
  const next = previous + (target - previous) * 0.2;
  return Math.max(0, Math.min(1, next));
}

function runBranchWithTrace(
  config: ExperimentConfig,
  codex: Codex,
  checkpoint: Checkpoint,
  feedback: 0 | 1,
  replicate: number,
  perturbedSequence: string[],
  perturbation: PerturbationReceipt,
  branchSeed: number,
): BranchExecution {
  const telos = new Telos(codex, {
    seed: branchSeed,
    threshold: config.theta,
    observerPersistence: config.observerPersistence,
  });
  const rng = new AuditedRandom(branchSeed);
  const referenceBridges = bridgeSignatures(codex, checkpoint.sequence);
  const preCoherence = telos.coherence(checkpoint.sequence);
  const initialCoherence = telos.coherence(perturbedSequence);
  const initialBridgeOverlap = multisetRecall(referenceBridges, bridgeSignatures(codex, perturbedSequence));

  let current = [...perturbedSequence];
  let smoothedDuality = checkpoint.duality;
  let recoveryStep: number | null = null;
  let acceptedSteps = 0;
  let feedbackChangedWinnerSteps = 0;
  const traces: StepTrace[] = [];

  for (let step = 1; step <= config.horizon; step++) {
    const preSequence = [...current];
    const preBridges = bridgeSignatures(codex, preSequence);
    const preTargetBridges = preBridges.filter(signature => referenceBridges.includes(signature));
    const currentCoherence = telos.coherence(preSequence);
    const currentBridgeRate = bridgeRate(codex, preSequence);
    const currentOverlap = multisetRecall(referenceBridges, preBridges);
    const currentRawDuality = telos.computeRawDuality(preSequence);
    const rngDrawStart = rng.mark();

    const frontier = buildProposalFrontier(preSequence, step, {
      codex,
      rng,
      maxSequenceLength: 10,
      architectureMode: 'stratified',
    });
    const frontierDraws = rng.countSince(rngDrawStart);
    const ranked = rankProposals(frontier, telos);
    const currentBridgeCount = preBridges.length;

    const proposalTraces: ProposalTrace[] = ranked.map((candidate, candidateId) => {
      const candidateCoherence = telos.coherence(candidate.sequence);
      const candidateBridgeSignatures = bridgeSignatures(codex, candidate.sequence);
      const candidateBridgeRate = bridgeRate(codex, candidate.sequence);
      const overlap = multisetRecall(referenceBridges, candidateBridgeSignatures);
      const structuralLoss = 1 - overlap;
      const deltaCoherence = candidateCoherence - currentCoherence;
      const deltaBridgeRate = candidateBridgeRate - currentBridgeRate;
      const deltaBridgeCount = candidateBridgeSignatures.length - currentBridgeCount;
      const recovery =
        config.recoveryWeights.coherenceDelta * deltaCoherence +
        config.recoveryWeights.bridgeDelta * deltaBridgeRate -
        config.recoveryWeights.structuralLoss * structuralLoss;

      return {
        candidateId,
        type: candidate.type,
        agent: candidate.agent,
        symbols: [...candidate.sequence],
        qRaw: candidate.score,
        recovery,
        qFeedback: candidate.score + config.kappa * feedback * recovery,
        deltaScore: candidate.deltaScore,
        rawDuality: candidate.rawDuality,
        coherence: candidateCoherence,
        bridgeRate: candidateBridgeRate,
        overlapY: overlap,
        deltaCoherence,
        deltaBridgeRate,
        deltaBridgeCount,
        structuralLoss,
      };
    });

    const augmented = ranked.map((candidate, index) => ({
      ...candidate,
      score: proposalTraces[index].qFeedback,
    }));

    const metricRawWinner = [...ranked].sort((a, b) => b.score - a.score)[0];
    const metricSteeredWinner = [...augmented].sort((a, b) => b.score - a.score)[0];
    if (
      metricRawWinner &&
      metricSteeredWinner &&
      sequenceKey(metricRawWinner.sequence) !== sequenceKey(metricSteeredWinner.sequence)
    ) {
      feedbackChangedWinnerSteps++;
    }

    const rawWinner = resolveWinner(ranked, branchSeed, step, preSequence);
    const feedbackWinner = resolveWinner(augmented, branchSeed, step, preSequence);
    const rawWinnerIdx = ranked.indexOf(rawWinner);
    const feedbackWinnerIdx = augmented.indexOf(feedbackWinner);

    const selectionMark = rng.mark();
    const selection = selectProposal(
      {
        ranked: augmented,
        currentTemp: Math.pow(0.95, step),
        tieBreakContext: createTieBreakContext(branchSeed, step, preSequence),
      },
      rng,
    );
    const selectionDraws = rng.countSince(selectionMark);
    const acceptanceDraw = rng.firstSince(selectionMark);
    const selectedIdx = augmented.indexOf(selection.selected);

    if (selection.accepted) {
      current = [...selection.selected.sequence];
      acceptedSteps++;
    }

    const postBridges = bridgeSignatures(codex, current);
    const postTargetBridges = postBridges.filter(signature => referenceBridges.includes(signature));
    const postOverlap = multisetRecall(referenceBridges, postBridges);
    const postCoherence = telos.coherence(current);
    const postRawDuality = telos.computeRawDuality(current);
    const nextSmoothedDuality = updateDiagnosticDuality(telos, smoothedDuality, current);

    if (
      recoveryStep === null &&
      postOverlap >= config.recoveryThresholds.bridgeOverlap &&
      postCoherence >= preCoherence - config.recoveryThresholds.coherenceTolerance
    ) {
      recoveryStep = step;
    }

    traces.push({
      schemaVersion: 'emerge-ko-001-v2.1-step',
      experimentId: config.experimentId,
      measuredEmergence: checkpoint.measuredEmergence,
      feedback,
      replicate,
      branchSeed,
      sourceCheckpointStep: checkpoint.sourceStep,
      step,
      systemState: {
        sequence: preSequence,
        rawDuality: currentRawDuality,
        smoothedDuality,
        coherence: currentCoherence,
        bridgeRate: currentBridgeRate,
        bridgeCount: currentBridgeCount,
        overlapY: currentOverlap,
        activeBridges: preBridges,
      },
      decisionParameters: {
        temperature: Math.pow(0.95, step),
        rngDrawStart,
        frontierDraws,
        selectionDraws,
        firstDivergenceOccurred: false,
        divergenceStep: null,
      },
      frontierSummary: {
        totalProposals: proposalTraces.length,
        positiveRecoveryProposals: proposalTraces.filter(candidate => candidate.recovery > 0).length,
        bridgeGainProposals: proposalTraces.filter(candidate => candidate.deltaBridgeCount > 0).length,
        overlapGainProposals: proposalTraces.filter(candidate => candidate.overlapY > currentOverlap).length,
      },
      proposals: proposalTraces,
      outcome: {
        rawWinnerIdx,
        feedbackWinnerIdx,
        selectedIdx,
        acceptedIdx: selection.accepted ? selectedIdx : null,
        accepted: selection.accepted,
        acceptanceDraw,
        acceptanceMode:
          selection.selected.type === 'none'
            ? 'none-proposal'
            : selection.selected.deltaScore > 0
              ? 'automatic-improvement'
              : 'stochastic',
        postSequence: [...current],
        postRawDuality,
        postSmoothedDuality: nextSmoothedDuality,
        postCoherence,
        postBridgeRate: bridgeRate(codex, current),
        postOverlapY: postOverlap,
        bridgesGained: multisetDifference(postBridges, preBridges),
        bridgesLost: multisetDifference(preBridges, postBridges),
        targetBridgesGained: multisetDifference(postTargetBridges, preTargetBridges),
        targetBridgesLost: multisetDifference(preTargetBridges, postTargetBridges),
      },
    });

    smoothedDuality = nextSmoothedDuality;
  }

  return {
    result: {
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
    },
    traces,
  };
}

function annotatePairedDivergence(withoutFeedback: BranchExecution, withFeedback: BranchExecution): void {
  let firstDivergenceStep: number | null = null;
  const reconvergenceSteps: number[] = [];
  let previouslyDiverged = false;

  for (let index = 0; index < withoutFeedback.traces.length; index++) {
    const control = withoutFeedback.traces[index];
    const treatment = withFeedback.traces[index];
    const diverged = sequenceKey(control.outcome.postSequence) !== sequenceKey(treatment.outcome.postSequence);

    if (diverged && firstDivergenceStep === null) firstDivergenceStep = control.step;
    if (!diverged && previouslyDiverged) reconvergenceSteps.push(control.step);
    previouslyDiverged = diverged;
  }

  for (const execution of [withoutFeedback, withFeedback]) {
    execution.result.firstStateDivergenceStep = firstDivergenceStep;
    execution.result.reconvergenceSteps = reconvergenceSteps;
    for (const trace of execution.traces) {
      trace.decisionParameters.firstDivergenceOccurred =
        firstDivergenceStep !== null && trace.step >= firstDivergenceStep;
      trace.decisionParameters.divergenceStep = firstDivergenceStep;
    }
  }
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

function sha256(data: Buffer | string): string {
  return createHash('sha256').update(data).digest('hex');
}

function main(): void {
  const configPath = resolve(process.argv[2] ?? 'experiments/emerge-ko-001/config.example.json');
  const summaryPath = resolve(
    process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.1-summary.json',
  );
  const tracePath = resolve(
    process.argv[4] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.1-trace.jsonl.gz',
  );
  const manifestPath = resolve(
    process.argv[5] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.1-manifest.json',
  );
  const config = loadConfig(configPath);
  const codex = new Codex();
  const checkpoints = findCheckpointPair(config, codex);
  const results: BranchResult[] = [];
  const traceLines: string[] = [];
  const pairSummaries: Array<{
    measuredEmergence: 0 | 1;
    replicate: number;
    firstStateDivergenceStep: number | null;
    reconvergenceSteps: number[];
  }> = [];

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
      const withoutFeedback = runBranchWithTrace(
        config,
        codex,
        checkpoint,
        0,
        replicate,
        perturbation.sequence,
        perturbation.receipt,
        branchSeed,
      );
      const withFeedback = runBranchWithTrace(
        config,
        codex,
        checkpoint,
        1,
        replicate,
        perturbation.sequence,
        perturbation.receipt,
        branchSeed,
      );

      annotatePairedDivergence(withoutFeedback, withFeedback);
      results.push(withoutFeedback.result, withFeedback.result);
      pairSummaries.push({
        measuredEmergence: checkpoint.measuredEmergence,
        replicate,
        firstStateDivergenceStep: withoutFeedback.result.firstStateDivergenceStep ?? null,
        reconvergenceSteps: withoutFeedback.result.reconvergenceSteps ?? [],
      });
      for (const trace of [...withoutFeedback.traces, ...withFeedback.traces]) {
        traceLines.push(JSON.stringify(trace));
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

  const uncompressedTrace = Buffer.from(`${traceLines.join('\n')}\n`, 'utf8');
  const compressedTrace = gzipSync(uncompressedTrace, { level: 9 });
  mkdirSync(dirname(summaryPath), { recursive: true });
  mkdirSync(dirname(tracePath), { recursive: true });
  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(tracePath, compressedTrace);

  const summary = {
    schemaVersion: 'emerge-ko-001-v2.1',
    generatedAt: new Date().toISOString(),
    dynamicsStatement:
      'V2.1 adds diagnostic trace capture only. Proposal generation, scoring, feedback strength, selection, admission, checkpoint matching, perturbation, seeds, horizon, and outcomes are unchanged from v2.',
    config,
    checkpoints,
    cells,
    gamma,
    replicateGammas,
    gammaStandardError,
    gamma95,
    pairSummaries,
    interpretation:
      gamma95.lower > 0
        ? 'Positive first-pass interaction with a descriptive interval above zero; independent checkpoint pairs remain required.'
        : gamma95.upper < 0
          ? 'Negative first-pass interaction; feedback is mismatched with the measured-emergent checkpoint.'
          : 'The first-pass interval includes zero; state-specific causal efficacy is not established.',
    results,
  };
  writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  const manifest = {
    schemaVersion: 'emerge-ko-001-v2.1-manifest',
    generatedAt: new Date().toISOString(),
    experimentId: config.experimentId,
    branchCount: results.length,
    pairCount: pairSummaries.length,
    stepTraceCount: traceLines.length,
    expectedStepTraceCount: config.replicates * 2 * 2 * config.horizon,
    uncompressedBytes: uncompressedTrace.byteLength,
    compressedBytes: compressedTrace.byteLength,
    compressionRatio: compressedTrace.byteLength / Math.max(uncompressedTrace.byteLength, 1),
    traceSha256: sha256(compressedTrace),
    summarySha256: sha256(readFileSync(summaryPath)),
    files: {
      summary: summaryPath,
      trace: tracePath,
      manifest: manifestPath,
    },
  };
  if (manifest.stepTraceCount !== manifest.expectedStepTraceCount) {
    throw new Error(
      `Trace count mismatch: expected ${manifest.expectedStepTraceCount}, got ${manifest.stepTraceCount}.`,
    );
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(JSON.stringify({ summaryPath, tracePath, manifestPath, gamma, gamma95, cells, manifest }, null, 2));
}

main();
