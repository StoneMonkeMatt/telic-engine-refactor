import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
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
  activeBridgeCount: number;
  observerCount: number;
  inventoryKey: string;
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

interface FrozenPanel {
  generatedAt: string;
  selectorSha256: string;
  frozen: {
    schemaVersion: string;
    experimentId: string;
    selectionBoundary: string;
    matchingDoctrine: Record<string, unknown>;
    config: V22Config;
    pairs: FrozenPair[];
  };
}

interface BranchResult {
  pairId: string;
  measuredEmergence: 0 | 1;
  feedback: 0 | 1;
  replicate: number;
  branchSeed: number;
  lesion: ExactTargetBridgeLesionReceipt;
  targetBridgeSignatures: string[];
  initialTargetRecovery: number;
  finalTargetRecovery: number;
  initialCoherence: number;
  finalCoherence: number;
  finalBridgeRate: number;
  fullRecoveryStep: number | null;
  acceptedSteps: number;
  feedbackChangedWinnerSteps: number;
  finalSequence: string[];
}

interface AggregateCell {
  measuredEmergence: 0 | 1;
  feedback: 0 | 1;
  n: number;
  meanFinalTargetRecovery: number;
  meanFinalCoherence: number;
  fullRecoveryRate: number;
  meanFullRecoveryStep: number | null;
  meanFeedbackChangedWinnerSteps: number;
}

function loadPanel(path: string): FrozenPanel {
  const panel = JSON.parse(readFileSync(path, 'utf8')) as FrozenPanel;
  const observedHash = createHash('sha256').update(JSON.stringify(panel.frozen)).digest('hex');
  if (observedHash !== panel.selectorSha256) {
    throw new Error(`Frozen panel hash mismatch: expected ${panel.selectorSha256}, observed ${observedHash}.`);
  }
  if (panel.frozen.pairs.length !== panel.frozen.config.panelPairs) {
    throw new Error('Frozen panel does not contain the preregistered number of pairs.');
  }
  return panel;
}

function sequenceKey(sequence: string[]): string {
  return sequence.join('|');
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function sampleStandardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const center = mean(values);
  return Math.sqrt(
    values.reduce((sum, value) => sum + Math.pow(value - center, 2), 0) /
      (values.length - 1),
  );
}

function tCritical95(degreesOfFreedom: number): number {
  const table: Record<number, number> = {
    1: 12.706,
    2: 4.303,
    3: 3.182,
    4: 2.776,
    5: 2.571,
    6: 2.447,
    7: 2.365,
    8: 2.306,
    9: 2.262,
    10: 2.228,
    11: 2.201,
    12: 2.179,
    13: 2.16,
    14: 2.145,
    15: 2.131,
    16: 2.12,
    17: 2.11,
    18: 2.101,
    19: 2.093,
    20: 2.086,
    21: 2.08,
    22: 2.074,
    23: 2.069,
    24: 2.064,
    25: 2.06,
    26: 2.056,
    27: 2.052,
    28: 2.048,
    29: 2.045,
    30: 2.042,
  };
  return table[Math.min(Math.max(degreesOfFreedom, 1), 30)] ?? 1.96;
}

function runBranch(
  config: V22Config,
  codex: Codex,
  pairId: string,
  checkpoint: FrozenCheckpoint,
  feedback: 0 | 1,
  lesion: FrozenLesion,
): BranchResult {
  const telos = new Telos(codex, {
    seed: lesion.branchSeed,
    threshold: config.theta,
    observerPersistence: config.observerPersistence,
  });
  const rng = new SeededRandom(lesion.branchSeed);
  const targets = checkpoint.targetBridgeSignatures;
  const preCoherence = telos.coherence(checkpoint.sequence);
  const initialCoherence = telos.coherence(lesion.sequence);
  const initialTargetRecovery = multisetRecall(targets, bridgeSignatures(codex, lesion.sequence));
  if (initialTargetRecovery !== 0) {
    throw new Error(`${pairId} E=${checkpoint.measuredEmergence} replicate=${lesion.replicate} did not begin at Y=0.`);
  }

  let current = [...lesion.sequence];
  let fullRecoveryStep: number | null = null;
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
      const targetRecovery = multisetRecall(targets, bridgeSignatures(codex, candidate.sequence));
      const structuralLoss = 1 - targetRecovery;
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
        tieBreakContext: createTieBreakContext(lesion.branchSeed, step, current),
      },
      rng,
    );

    if (selection.accepted) {
      current = [...selection.selected.sequence];
      acceptedSteps++;
    }

    const recovery = multisetRecall(targets, bridgeSignatures(codex, current));
    const coherence = telos.coherence(current);
    if (
      fullRecoveryStep === null &&
      recovery >= config.recoveryThresholds.targetRecovery &&
      coherence >= preCoherence - config.recoveryThresholds.coherenceTolerance
    ) {
      fullRecoveryStep = step;
    }
  }

  return {
    pairId,
    measuredEmergence: checkpoint.measuredEmergence,
    feedback,
    replicate: lesion.replicate,
    branchSeed: lesion.branchSeed,
    lesion: lesion.receipt,
    targetBridgeSignatures: [...targets],
    initialTargetRecovery,
    finalTargetRecovery: multisetRecall(targets, bridgeSignatures(codex, current)),
    initialCoherence,
    finalCoherence: telos.coherence(current),
    finalBridgeRate: bridgeRate(codex, current),
    fullRecoveryStep,
    acceptedSteps,
    feedbackChangedWinnerSteps,
    finalSequence: current,
  };
}

function aggregate(results: BranchResult[], emergence: 0 | 1, feedback: 0 | 1): AggregateCell {
  const cell = results.filter(
    result => result.measuredEmergence === emergence && result.feedback === feedback,
  );
  const recovered = cell.filter(result => result.fullRecoveryStep !== null);
  return {
    measuredEmergence: emergence,
    feedback,
    n: cell.length,
    meanFinalTargetRecovery: mean(cell.map(result => result.finalTargetRecovery)),
    meanFinalCoherence: mean(cell.map(result => result.finalCoherence)),
    fullRecoveryRate: recovered.length / Math.max(cell.length, 1),
    meanFullRecoveryStep: recovered.length
      ? mean(recovered.map(result => result.fullRecoveryStep!))
      : null,
    meanFeedbackChangedWinnerSteps: mean(
      cell.map(result => result.feedbackChangedWinnerSteps),
    ),
  };
}

function branchOutcome(
  results: BranchResult[],
  pairId: string,
  replicate: number,
  emergence: 0 | 1,
  feedback: 0 | 1,
): number {
  const result = results.find(
    branch =>
      branch.pairId === pairId &&
      branch.replicate === replicate &&
      branch.measuredEmergence === emergence &&
      branch.feedback === feedback,
  );
  if (!result) {
    throw new Error(
      `Missing branch ${pairId}, replicate=${replicate}, E=${emergence}, Z=${feedback}.`,
    );
  }
  return result.finalTargetRecovery;
}

function main(): void {
  const panelPath = resolve(
    process.argv[2] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const outputPath = resolve(
    process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-result.json',
  );
  const panel = loadPanel(panelPath);
  const config = panel.frozen.config;
  const codex = new Codex();
  const results: BranchResult[] = [];

  for (const pair of panel.frozen.pairs) {
    for (const checkpoint of [pair.nonEmergent, pair.emergent]) {
      for (const lesion of checkpoint.lesions) {
        for (const feedback of [0, 1] as const) {
          results.push(runBranch(config, codex, pair.pairId, checkpoint, feedback, lesion));
        }
      }
    }
  }

  const cells = [
    aggregate(results, 0, 0),
    aggregate(results, 0, 1),
    aggregate(results, 1, 0),
    aggregate(results, 1, 1),
  ];

  const pairEffects = panel.frozen.pairs.map(pair => {
    const replicateGammas = Array.from({ length: config.replicates }, (_, replicate) =>
      (branchOutcome(results, pair.pairId, replicate, 1, 1) -
        branchOutcome(results, pair.pairId, replicate, 1, 0)) -
      (branchOutcome(results, pair.pairId, replicate, 0, 1) -
        branchOutcome(results, pair.pairId, replicate, 0, 0)),
    );
    return {
      pairId: pair.pairId,
      matchTier: pair.matchTier,
      matchDistance: pair.matchDistance,
      meanGamma: mean(replicateGammas),
      replicateGammas,
    };
  });

  const pairMeanGammas = pairEffects.map(pair => pair.meanGamma);
  const gamma = mean(pairMeanGammas);
  const gammaStandardError = sampleStandardDeviation(pairMeanGammas) / Math.sqrt(pairMeanGammas.length);
  const criticalValue = tCritical95(pairMeanGammas.length - 1);
  const gamma95 = {
    lower: gamma - criticalValue * gammaStandardError,
    upper: gamma + criticalValue * gammaStandardError,
    criticalValue,
    unitOfGeneralisation: 'matched checkpoint pair',
  };

  const output = {
    schemaVersion: 'emerge-ko-001-v2.2-equal-wound',
    generatedAt: new Date().toISOString(),
    selectorSha256: panel.selectorSha256,
    preregisteredPrimaryOutcome:
      'Fraction of the two uniquely identified target bridges restored at horizon h=100.',
    causalBoundary:
      'Constant kappa; no threshold check. Checkpoints, targets, lesions, perturbation seeds, and branch seeds were fixed before treatment execution.',
    config,
    panelSummary: panel.frozen.pairs.map(pair => ({
      pairId: pair.pairId,
      matchTier: pair.matchTier,
      matchDistance: pair.matchDistance,
      nonEmergent: {
        sourceSeed: pair.nonEmergent.sourceSeed,
        sourceStep: pair.nonEmergent.sourceStep,
        duality: pair.nonEmergent.duality,
        sequence: pair.nonEmergent.sequence,
        targets: pair.nonEmergent.targetBridgeSignatures,
      },
      emergent: {
        sourceSeed: pair.emergent.sourceSeed,
        sourceStep: pair.emergent.sourceStep,
        duality: pair.emergent.duality,
        sequence: pair.emergent.sequence,
        targets: pair.emergent.targetBridgeSignatures,
      },
    })),
    cells,
    pairEffects,
    gamma,
    gammaStandardError,
    gamma95,
    interpretation:
      gamma95.lower > 0
        ? 'Positive state-specific interaction across the matched-pair panel; equal-wound macro-state efficacy is supported for this sandbox.'
        : gamma95.upper < 0
          ? 'Negative state-specific interaction across the matched-pair panel; the current feedback formula is mismatched with the measured-emergent checkpoint class.'
          : 'The matched-pair interval includes zero; equal-wound state-specific causal efficacy is not established.',
    results,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify(
      {
        outputPath,
        selectorSha256: panel.selectorSha256,
        gamma,
        gammaStandardError,
        gamma95,
        interpretation: output.interpretation,
        cells,
        pairEffects: pairEffects.map(pair => ({
          pairId: pair.pairId,
          matchTier: pair.matchTier,
          meanGamma: pair.meanGamma,
        })),
      },
      null,
      2,
    ),
  );
}

main();
