import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
import {
  bridgeRate,
  bridgeSignatures,
  multisetRecall,
} from './criticalBridgePermutation';
import { ExactTargetBridgeLesionReceipt } from './exactTargetBridgeLesion';

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
type CarrierActive = 0 | 1;

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

interface FrozenCarrierCapsules {
  capsuleSelectorSha256: string;
  frozen: {
    schemaVersion: string;
    experimentId: string;
    sourceSelectorSha256: string;
    historyWindow: number;
    emaAlpha: number;
    couplingDoctrine: Record<string, unknown>;
    pairs: FrozenCarrierPair[];
  };
}

interface Carrier001Receipt {
  pairId: string;
  microstateSource: MicrostateSource;
  replicate: number;
  feedback: 0 | 1;
  projectedTrajectorySha256: string;
}

interface Carrier001Result {
  sourceSelectorSha256: string;
  comparisonReceipts: Carrier001Receipt[];
}

interface CapsuleState {
  capsuleId: CapsuleId;
  declaredObserverState: 0 | 1;
  dEma: number;
  persistenceCounter: number;
  qualifyingInventoryChangeSeen: boolean;
  boundedDualityHistory: number[];
}

interface KernelProjection {
  finalTargetRecovery: number;
  finalCoherence: number;
  finalBridgeRate: number;
  acceptedSteps: number;
  feedbackChangedWinnerSteps: number;
  finalSequence: string[];
}

interface StepDecision {
  step: number;
  beforeSequenceSha256: string;
  winnerSequenceSha256: string;
  winnerType: string;
  accepted: boolean;
  afterSequenceSha256: string;
}

interface BranchDiagnostics {
  candidateExposures: Record<string, number>;
  carrierAdjustedCandidates: number;
  carrierAdjustedByAction: Record<string, number>;
  carrierAdjustmentSum: number;
  maxAbsCarrierAdjustment: number;
  acceptedTransitions: number;
  finalCapsule: CapsuleState;
}

interface BranchRun {
  projection: KernelProjection;
  diagnostics: BranchDiagnostics;
  trajectoryKeys: string[];
  decisions: StepDecision[];
  acceptedTrace: Record<string, unknown>[];
}

interface PairedDiagnostics {
  comparablePreStateSteps: number;
  changedWinnerSteps: number;
  changedAdmissionSteps: number;
  acceptedCarrierInducedActions: number;
  holdToSwap: number;
  swapToHold: number;
  swapToSwap: number;
  otherWinnerChanges: number;
  firstDecisionDifferenceStep: number | null;
  firstStateDivergenceStep: number | null;
  reconvergenceEvents: number;
  everReconverged: boolean;
}

interface BranchSummary {
  pairId: string;
  microstateSource: MicrostateSource;
  replicate: number;
  feedback: 0 | 1;
  capsuleId: CapsuleId;
  active: CarrierActive;
  branchSeed: number;
  projection: KernelProjection;
  diagnostics: BranchDiagnostics;
  projectionSha256: string;
  pairedDiagnostics: PairedDiagnostics | null;
}

type RankedCandidate = ReturnType<typeof rankProposals>[number];
type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  carriedDualityLoss: number;
  candidateDema: number;
};

function stableHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
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
    1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571,
    6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
    11: 2.201, 12: 2.179, 13: 2.16, 14: 2.145, 15: 2.131,
    16: 2.12, 17: 2.11, 18: 2.101, 19: 2.093, 20: 2.086,
    21: 2.08, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.06,
    26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042,
  };
  return table[Math.min(Math.max(degreesOfFreedom, 1), 30)] ?? 1.96;
}

function multisetKey(sequence: string[]): string {
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join('|');
}

function actionLabel(type: string): string {
  return type === 'none' ? 'hold' : type;
}

function increment(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
}

function cloneCapsule(capsule: MacroHistoryCapsule): CapsuleState {
  return {
    capsuleId: capsule.capsuleId,
    declaredObserverState: capsule.declaredObserverState,
    dEma: capsule.dEma,
    persistenceCounter: capsule.persistenceCounter,
    qualifyingInventoryChangeSeen: capsule.qualifyingInventoryChangeSeen,
    boundedDualityHistory: [...capsule.boundedDualityHistory],
  };
}

function capsuleSnapshot(state: CapsuleState): Record<string, unknown> {
  return {
    capsuleId: state.capsuleId,
    declaredObserverState: state.declaredObserverState,
    dEma: state.dEma,
    persistenceCounter: state.persistenceCounter,
    qualifyingInventoryChangeSeen: state.qualifyingInventoryChangeSeen,
    boundedDualityHistory: [...state.boundedDualityHistory],
  };
}

function loadPanel(path: string): FrozenPanel {
  const panel = JSON.parse(readFileSync(path, 'utf8')) as FrozenPanel;
  const observed = stableHash(panel.frozen);
  if (observed !== panel.selectorSha256) {
    throw new Error(
      `Frozen V2.2 panel hash mismatch: expected ${panel.selectorSha256}, observed ${observed}.`,
    );
  }
  return panel;
}

function loadCapsules(path: string, sourceSelectorSha256: string): FrozenCarrierCapsules {
  const capsules = JSON.parse(readFileSync(path, 'utf8')) as FrozenCarrierCapsules;
  const observed = stableHash(capsules.frozen);
  if (observed !== capsules.capsuleSelectorSha256) {
    throw new Error(
      `Frozen carrier capsule hash mismatch: expected ${capsules.capsuleSelectorSha256}, observed ${observed}.`,
    );
  }
  if (capsules.frozen.sourceSelectorSha256 !== sourceSelectorSha256) {
    throw new Error('Carrier capsules were not frozen from the supplied V2.2 panel.');
  }
  return capsules;
}

function loadCarrier001(path: string, sourceSelectorSha256: string): Carrier001Result {
  const result = JSON.parse(readFileSync(path, 'utf8')) as Carrier001Result;
  if (result.sourceSelectorSha256 !== sourceSelectorSha256) {
    throw new Error('Carrier-001 result and V2.2 panel have different selector receipts.');
  }
  return result;
}

function receiptKey(
  pairId: string,
  microstateSource: MicrostateSource,
  replicate: number,
  feedback: 0 | 1,
): string {
  return `${pairId}|${microstateSource}|${replicate}|${feedback}`;
}

function deterministicWinner(
  ranked: CarrierCandidate[],
  tieBreakContext: ReturnType<typeof createTieBreakContext>,
): CarrierCandidate {
  const maxScore = Math.max(...ranked.map(candidate => candidate.score));
  const eligible = ranked.filter(candidate => candidate.score === maxScore);
  return resolveTie(eligible, tieBreakContext).selected as CarrierCandidate;
}

function updateCapsule(
  state: CapsuleState,
  rawDuality: number,
  inventoryChanged: boolean,
  config: CarrierConfig,
  emaAlpha: number,
  historyWindow: number,
): CapsuleState {
  const dEma = state.dEma + emaAlpha * (rawDuality - state.dEma);
  const qualifyingInventoryChangeSeen =
    state.qualifyingInventoryChangeSeen || inventoryChanged;
  let persistenceCounter = state.persistenceCounter;
  let declaredObserverState = state.declaredObserverState;

  if (declaredObserverState === 0 && qualifyingInventoryChangeSeen) {
    if (dEma >= config.theta) {
      persistenceCounter++;
      if (persistenceCounter >= config.observerPersistence) declaredObserverState = 1;
    } else {
      persistenceCounter = 0;
    }
  }

  return {
    ...state,
    declaredObserverState,
    dEma,
    persistenceCounter,
    qualifyingInventoryChangeSeen,
    boundedDualityHistory: [...state.boundedDualityHistory, dEma].slice(-historyWindow),
  };
}

function runBranch(
  config: CarrierConfig,
  codex: Codex,
  pairId: string,
  microstateSource: MicrostateSource,
  checkpoint: FrozenCheckpoint,
  lesion: FrozenLesion,
  feedback: 0 | 1,
  capsule: MacroHistoryCapsule,
  active: CarrierActive,
  emaAlpha: number,
  historyWindow: number,
): BranchRun {
  const telos = new Telos(codex, {
    seed: lesion.branchSeed,
    threshold: config.theta,
    observerPersistence: config.observerPersistence,
  });
  const rng = new SeededRandom(lesion.branchSeed);
  const targets = checkpoint.targetBridgeSignatures;
  let current = [...lesion.sequence];
  let capsuleState = cloneCapsule(capsule);
  let acceptedSteps = 0;
  let feedbackChangedWinnerSteps = 0;
  let carrierAdjustedCandidates = 0;
  let carrierAdjustmentSum = 0;
  let maxAbsCarrierAdjustment = 0;
  const candidateExposures: Record<string, number> = {};
  const carrierAdjustedByAction: Record<string, number> = {};
  const trajectoryKeys = [current.join('|')];
  const decisions: StepDecision[] = [];
  const acceptedTrace: Record<string, unknown>[] = [];

  if (multisetRecall(targets, bridgeSignatures(codex, current)) !== 0) {
    throw new Error(
      `${pairId}/${microstateSource}/${capsule.capsuleId}/replicate=${lesion.replicate} did not begin at Y=0.`,
    );
  }

  for (let step = 1; step <= config.horizon; step++) {
    const beforeSequence = [...current];
    const beforeSequenceSha256 = stableHash(beforeSequence);
    const frontier = buildProposalFrontier(current, step, {
      codex,
      rng,
      maxSequenceLength: 10,
      architectureMode: 'stratified',
    });
    const ranked = rankProposals(frontier, telos);
    const currentRawDuality = telos.computeRawDuality(current);
    const currentCoherence = telos.coherence(current);
    const currentBridgeRate = bridgeRate(codex, current);
    const tieBreakContext = createTieBreakContext(lesion.branchSeed, step, current);

    const carrierRanked: CarrierCandidate[] = ranked.map(candidate => {
      increment(candidateExposures, actionLabel(candidate.type));
      const isInsert = candidate.sequence.length > current.length;
      const rawDualityLoss = isInsert
        ? Math.max(0, currentRawDuality - candidate.rawDuality)
        : 0;
      const candidateDema =
        capsuleState.dEma + emaAlpha * (candidate.rawDuality - capsuleState.dEma);
      const carriedDualityLoss = Math.max(0, capsuleState.dEma - candidateDema);
      const carrierAdjustment = active * 0.5 * (rawDualityLoss - carriedDualityLoss);

      if (Math.abs(carrierAdjustment) > 1e-15) {
        carrierAdjustedCandidates++;
        increment(carrierAdjustedByAction, actionLabel(candidate.type));
      }
      carrierAdjustmentSum += carrierAdjustment;
      maxAbsCarrierAdjustment = Math.max(
        maxAbsCarrierAdjustment,
        Math.abs(carrierAdjustment),
      );

      return {
        ...candidate,
        score: candidate.score + carrierAdjustment,
        deltaScore: candidate.deltaScore + carrierAdjustment,
        carrierAdjustment,
        carriedDualityLoss,
        candidateDema,
      };
    });

    const augmentFeedback = (candidates: CarrierCandidate[]): CarrierCandidate[] =>
      candidates.map(candidate => {
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

    const zeroCarrier = ranked.map(candidate => ({
      ...candidate,
      carrierAdjustment: 0,
      carriedDualityLoss: 0,
      candidateDema: capsuleState.dEma,
    })) as CarrierCandidate[];
    const baselineAugmented = augmentFeedback(zeroCarrier);
    const activeAugmented = augmentFeedback(carrierRanked);

    const rawWinner = [...ranked].sort((a, b) => b.score - a.score)[0];
    const feedbackWinner = [...baselineAugmented].sort(
      (a, b) => b.score - a.score,
    )[0];
    if (
      rawWinner &&
      feedbackWinner &&
      rawWinner.sequence.join('|') !== feedbackWinner.sequence.join('|')
    ) {
      feedbackChangedWinnerSteps++;
    }

    const exactWinner = deterministicWinner(activeAugmented, tieBreakContext);
    const selection = selectProposal(
      {
        ranked: activeAugmented,
        currentTemp: Math.pow(0.95, step),
        tieBreakContext,
      },
      rng,
    );

    if (selection.selected.sequence.join('|') !== exactWinner.sequence.join('|')) {
      throw new Error('Exact tie-resolved winner disagreed with selector output.');
    }

    if (selection.accepted) {
      const beforeCapsule = capsuleSnapshot(capsuleState);
      current = [...selection.selected.sequence];
      acceptedSteps++;
      const inventoryChanged = multisetKey(beforeSequence) !== multisetKey(current);
      capsuleState = updateCapsule(
        capsuleState,
        telos.computeRawDuality(current),
        inventoryChanged,
        config,
        emaAlpha,
        historyWindow,
      );

      if (active === 1) {
        const selected = selection.selected as CarrierCandidate;
        acceptedTrace.push({
          pairId,
          microstateSource,
          replicate: lesion.replicate,
          feedback,
          capsuleId: capsule.capsuleId,
          step,
          action: actionLabel(selected.type),
          carrierAdjustment: selected.carrierAdjustment,
          carriedDualityLoss: selected.carriedDualityLoss,
          candidateDema: selected.candidateDema,
          beforeSequenceSha256,
          afterSequenceSha256: stableHash(current),
          beforeCapsule,
          afterCapsule: capsuleSnapshot(capsuleState),
          targetRecovery: multisetRecall(
            targets,
            bridgeSignatures(codex, current),
          ),
        });
      }
    }

    decisions.push({
      step,
      beforeSequenceSha256,
      winnerSequenceSha256: stableHash(selection.selected.sequence),
      winnerType: actionLabel(selection.selected.type),
      accepted: selection.accepted,
      afterSequenceSha256: stableHash(current),
    });
    trajectoryKeys.push(current.join('|'));
  }

  const projection: KernelProjection = {
    finalTargetRecovery: multisetRecall(targets, bridgeSignatures(codex, current)),
    finalCoherence: telos.coherence(current),
    finalBridgeRate: bridgeRate(codex, current),
    acceptedSteps,
    feedbackChangedWinnerSteps,
    finalSequence: current,
  };

  return {
    projection,
    trajectoryKeys,
    decisions,
    acceptedTrace,
    diagnostics: {
      candidateExposures,
      carrierAdjustedCandidates,
      carrierAdjustedByAction,
      carrierAdjustmentSum,
      maxAbsCarrierAdjustment,
      acceptedTransitions: acceptedSteps,
      finalCapsule: capsuleState,
    },
  };
}

function compareRuns(knockout: BranchRun, active: BranchRun): PairedDiagnostics {
  let comparablePreStateSteps = 0;
  let changedWinnerSteps = 0;
  let changedAdmissionSteps = 0;
  let acceptedCarrierInducedActions = 0;
  let holdToSwap = 0;
  let swapToHold = 0;
  let swapToSwap = 0;
  let otherWinnerChanges = 0;
  let firstDecisionDifferenceStep: number | null = null;

  for (let index = 0; index < Math.min(knockout.decisions.length, active.decisions.length); index++) {
    const baseline = knockout.decisions[index];
    const carrier = active.decisions[index];
    if (baseline.beforeSequenceSha256 !== carrier.beforeSequenceSha256) continue;

    comparablePreStateSteps++;
    const winnerChanged =
      baseline.winnerSequenceSha256 !== carrier.winnerSequenceSha256;
    const admissionChanged = baseline.accepted !== carrier.accepted;

    if (winnerChanged) {
      changedWinnerSteps++;
      if (baseline.winnerType === 'hold' && carrier.winnerType === 'swap') {
        holdToSwap++;
      } else if (baseline.winnerType === 'swap' && carrier.winnerType === 'hold') {
        swapToHold++;
      } else if (baseline.winnerType === 'swap' && carrier.winnerType === 'swap') {
        swapToSwap++;
      } else {
        otherWinnerChanges++;
      }
    }

    if (admissionChanged) changedAdmissionSteps++;
    if (
      carrier.accepted &&
      carrier.winnerType !== 'hold' &&
      (winnerChanged || admissionChanged)
    ) {
      acceptedCarrierInducedActions++;
    }

    if (
      firstDecisionDifferenceStep === null &&
      (winnerChanged || admissionChanged)
    ) {
      firstDecisionDifferenceStep = baseline.step;
    }
  }

  let firstStateDivergenceStep: number | null = null;
  let reconvergenceEvents = 0;
  let divergent = false;
  let everReconverged = false;
  for (
    let index = 0;
    index < Math.min(knockout.trajectoryKeys.length, active.trajectoryKeys.length);
    index++
  ) {
    const equal = knockout.trajectoryKeys[index] === active.trajectoryKeys[index];
    if (!equal && firstStateDivergenceStep === null) firstStateDivergenceStep = index;
    if (!equal) divergent = true;
    if (equal && divergent) {
      reconvergenceEvents++;
      everReconverged = true;
      divergent = false;
    }
  }

  return {
    comparablePreStateSteps,
    changedWinnerSteps,
    changedAdmissionSteps,
    acceptedCarrierInducedActions,
    holdToSwap,
    swapToHold,
    swapToSwap,
    otherWinnerChanges,
    firstDecisionDifferenceStep,
    firstStateDivergenceStep,
    reconvergenceEvents,
    everReconverged,
  };
}

function main(): void {
  const panelPath = resolve(
    process.argv[2] ??
      'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const capsulePath = resolve(
    process.argv[3] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-capsules.json',
  );
  const carrier001Path = resolve(
    process.argv[4] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-001-result.json',
  );
  const summaryPath = resolve(
    process.argv[5] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-002C-summary.json',
  );
  const tracePath = resolve(
    process.argv[6] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-002C-trace.jsonl.gz',
  );
  const manifestPath = resolve(
    process.argv[7] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-002C-manifest.json',
  );

  const panel = loadPanel(panelPath);
  const capsules = loadCapsules(capsulePath, panel.selectorSha256);
  const carrier001 = loadCarrier001(carrier001Path, panel.selectorSha256);
  const config = panel.frozen.config;
  const emaAlpha = capsules.frozen.emaAlpha;
  const historyWindow = capsules.frozen.historyWindow;
  const codex = new Codex();
  const legacyReceiptMap = new Map(
    carrier001.comparisonReceipts.map(receipt => [
      receiptKey(
        receipt.pairId,
        receipt.microstateSource,
        receipt.replicate,
        receipt.feedback,
      ),
      receipt.projectedTrajectorySha256,
    ]),
  );

  const branches: BranchSummary[] = [];
  const traceLines: string[] = [];
  let neutralityComparisons = 0;
  let neutralityMismatches = 0;

  for (const pair of panel.frozen.pairs) {
    const carrierPair = capsules.frozen.pairs.find(
      entry => entry.pairId === pair.pairId,
    );
    if (!carrierPair) throw new Error(`Missing frozen carrier capsules for ${pair.pairId}.`);

    for (const microstateSource of ['nonEmergent', 'emergent'] as const) {
      const checkpoint = pair[microstateSource];
      for (const lesion of checkpoint.lesions) {
        for (const feedback of [0, 1] as const) {
          const legacyHash = legacyReceiptMap.get(
            receiptKey(pair.pairId, microstateSource, lesion.replicate, feedback),
          );
          if (!legacyHash) {
            throw new Error(
              `Missing Carrier-001 receipt for ${pair.pairId}/${microstateSource}/replicate=${lesion.replicate}/Z=${feedback}.`,
            );
          }

          for (const capsule of [carrierPair.m0, carrierPair.m1]) {
            const knockout = runBranch(
              config,
              codex,
              pair.pairId,
              microstateSource,
              checkpoint,
              lesion,
              feedback,
              capsule,
              0,
              emaAlpha,
              historyWindow,
            );
            const knockoutHash = stableHash(knockout.projection);
            neutralityComparisons++;
            if (knockoutHash !== legacyHash) {
              neutralityMismatches++;
              throw new Error(
                `Carrier-002C neutrality mismatch at ${pair.pairId}/${microstateSource}/${capsule.capsuleId}/replicate=${lesion.replicate}/Z=${feedback}.`,
              );
            }

            const active = runBranch(
              config,
              codex,
              pair.pairId,
              microstateSource,
              checkpoint,
              lesion,
              feedback,
              capsule,
              1,
              emaAlpha,
              historyWindow,
            );
            const pairedDiagnostics = compareRuns(knockout, active);

            branches.push({
              pairId: pair.pairId,
              microstateSource,
              replicate: lesion.replicate,
              feedback,
              capsuleId: capsule.capsuleId,
              active: 0,
              branchSeed: lesion.branchSeed,
              projection: knockout.projection,
              diagnostics: knockout.diagnostics,
              projectionSha256: knockoutHash,
              pairedDiagnostics: null,
            });
            branches.push({
              pairId: pair.pairId,
              microstateSource,
              replicate: lesion.replicate,
              feedback,
              capsuleId: capsule.capsuleId,
              active: 1,
              branchSeed: lesion.branchSeed,
              projection: active.projection,
              diagnostics: active.diagnostics,
              projectionSha256: stableHash(active.projection),
              pairedDiagnostics,
            });

            for (const trace of active.acceptedTrace) traceLines.push(JSON.stringify(trace));
          }
        }
      }
    }
  }

  const cell = (capsuleId: CapsuleId, active: CarrierActive, feedback: 0 | 1) => {
    const selected = branches.filter(
      branch =>
        branch.capsuleId === capsuleId &&
        branch.active === active &&
        branch.feedback === feedback,
    );
    return {
      capsuleId,
      active,
      feedback,
      n: selected.length,
      meanFinalTargetRecovery: mean(
        selected.map(branch => branch.projection.finalTargetRecovery),
      ),
      meanFinalCoherence: mean(
        selected.map(branch => branch.projection.finalCoherence),
      ),
    };
  };

  const cells = (['M0-unlatched', 'M1-latched'] as const).flatMap(capsuleId =>
    ([0, 1] as const).flatMap(active =>
      ([0, 1] as const).map(feedback => cell(capsuleId, active, feedback)),
    ),
  );

  const value = (
    capsuleId: CapsuleId,
    active: CarrierActive,
    feedback: 0 | 1,
  ): number =>
    cells.find(
      entry =>
        entry.capsuleId === capsuleId &&
        entry.active === active &&
        entry.feedback === feedback,
    )!.meanFinalTargetRecovery;

  const gammaForFeedback = (feedback: 0 | 1) =>
    (value('M1-latched', 1, feedback) - value('M1-latched', 0, feedback)) -
    (value('M0-unlatched', 1, feedback) - value('M0-unlatched', 0, feedback));

  const gammaAFeedback0 = gammaForFeedback(0);
  const gammaAFeedback1 = gammaForFeedback(1);
  const tripleInteraction = gammaAFeedback1 - gammaAFeedback0;

  const branchValue = (
    pairId: string,
    microstateSource: MicrostateSource,
    replicate: number,
    capsuleId: CapsuleId,
    active: CarrierActive,
    feedback: 0 | 1,
  ): number => {
    const branch = branches.find(
      entry =>
        entry.pairId === pairId &&
        entry.microstateSource === microstateSource &&
        entry.replicate === replicate &&
        entry.capsuleId === capsuleId &&
        entry.active === active &&
        entry.feedback === feedback,
    );
    if (!branch) throw new Error('Missing branch while calculating pair effects.');
    return branch.projection.finalTargetRecovery;
  };

  const pairEffects = panel.frozen.pairs.map(pair => {
    const effect = (feedback: 0 | 1) => {
      const replicateEffects: number[] = [];
      for (const microstateSource of ['nonEmergent', 'emergent'] as const) {
        for (let replicate = 0; replicate < config.replicates; replicate++) {
          replicateEffects.push(
            (branchValue(
              pair.pairId,
              microstateSource,
              replicate,
              'M1-latched',
              1,
              feedback,
            ) -
              branchValue(
                pair.pairId,
                microstateSource,
                replicate,
                'M1-latched',
                0,
                feedback,
              )) -
              (branchValue(
                pair.pairId,
                microstateSource,
                replicate,
                'M0-unlatched',
                1,
                feedback,
              ) -
                branchValue(
                  pair.pairId,
                  microstateSource,
                  replicate,
                  'M0-unlatched',
                  0,
                  feedback,
                )),
          );
        }
      }
      return mean(replicateEffects);
    };

    const gammaZ0 = effect(0);
    const gammaZ1 = effect(1);
    return {
      pairId: pair.pairId,
      gammaAFeedback0: gammaZ0,
      gammaAFeedback1: gammaZ1,
      tripleInteraction: gammaZ1 - gammaZ0,
    };
  });

  const interval = (values: number[]) => {
    const center = mean(values);
    const standardError =
      sampleStandardDeviation(values) / Math.sqrt(Math.max(values.length, 1));
    const critical = tCritical95(values.length - 1);
    return {
      mean: center,
      standardError,
      degreesOfFreedom: Math.max(values.length - 1, 0),
      interval95: [
        center - critical * standardError,
        center + critical * standardError,
      ],
    };
  };

  const uncertainty = {
    gammaAFeedback0: interval(pairEffects.map(pair => pair.gammaAFeedback0)),
    gammaAFeedback1: interval(pairEffects.map(pair => pair.gammaAFeedback1)),
    tripleInteraction: interval(pairEffects.map(pair => pair.tripleInteraction)),
  };

  const activeBranches = branches.filter(branch => branch.active === 1);
  const paired = activeBranches
    .map(branch => branch.pairedDiagnostics)
    .filter((entry): entry is PairedDiagnostics => entry !== null);

  const sumPaired = (
    key: keyof Pick<
      PairedDiagnostics,
      | 'comparablePreStateSteps'
      | 'changedWinnerSteps'
      | 'changedAdmissionSteps'
      | 'acceptedCarrierInducedActions'
      | 'holdToSwap'
      | 'swapToHold'
      | 'swapToSwap'
      | 'otherWinnerChanges'
      | 'reconvergenceEvents'
    >,
  ): number => paired.reduce((sum, entry) => sum + entry[key], 0);

  const candidateExposures: Record<string, number> = {};
  const carrierAdjustedByAction: Record<string, number> = {};
  let carrierAdjustedCandidates = 0;
  let maxAbsCarrierAdjustment = 0;
  for (const branch of activeBranches) {
    for (const [action, count] of Object.entries(branch.diagnostics.candidateExposures)) {
      candidateExposures[action] = (candidateExposures[action] ?? 0) + count;
    }
    for (const [action, count] of Object.entries(branch.diagnostics.carrierAdjustedByAction)) {
      carrierAdjustedByAction[action] = (carrierAdjustedByAction[action] ?? 0) + count;
    }
    carrierAdjustedCandidates += branch.diagnostics.carrierAdjustedCandidates;
    maxAbsCarrierAdjustment = Math.max(
      maxAbsCarrierAdjustment,
      branch.diagnostics.maxAbsCarrierAdjustment,
    );
  }

  const changedWinnerSteps = sumPaired('changedWinnerSteps');
  const changedAdmissionSteps = sumPaired('changedAdmissionSteps');
  const acceptedCarrierInducedActions = sumPaired('acceptedCarrierInducedActions');
  const mechanisticEndpointMet =
    changedWinnerSteps > 0 ||
    changedAdmissionSteps > 0 ||
    acceptedCarrierInducedActions > 0;

  const primaryInterval = uncertainty.gammaAFeedback1.interval95;
  const primaryClearsZero = primaryInterval[0] > 0 || primaryInterval[1] < 0;

  const interpretation = !mechanisticEndpointMet
    ? 'Carrier-002C reached hold/swap candidates but did not change any exact winner or admission decision. Recovery efficacy is not interpretable.'
    : primaryClearsZero
      ? 'Carrier-002C changed reachable decisions and produced a pair-generalised state-specific recovery effect under feedback. Direction follows the signed interval.'
      : 'Carrier-002C changed reachable hold/swap decisions, establishing a functioning macro-history carrier. The pair-level recovery interval still crosses zero, so state-specific recovery efficacy is not established.';

  const traceText = traceLines.length ? `${traceLines.join('\n')}\n` : '';
  const traceGzip = gzipSync(traceText, { level: 9 });

  const summary = {
    schemaVersion: 'emerge-carrier-002c-v1',
    experimentId: 'EMERGE-CARRIER-002C',
    generatedAt: new Date().toISOString(),
    sourceSelectorSha256: panel.selectorSha256,
    capsuleSelectorSha256: capsules.capsuleSelectorSha256,
    preregistration: {
      primaryMechanisticEndpoint:
        'At least one exact paired hold/swap winner or admission decision must change while the branches share the same pre-state.',
      directionalRecoverySign: 'none',
      carriedLoss:
        'L_D(c;M_t)=max(0,D_EMA-[D_EMA+0.2*(Dhat(c)-D_EMA)])',
      coefficient: 0.5,
      emaAlpha,
      kappa: config.kappa,
      declarationGate: false,
      feedbackStrengthChange: false,
      forcedMutation: false,
      coefficientSweep: false,
      targetWound:
        'exactly two uniquely identified bridges inherited from frozen V2.2',
    },
    scale: {
      panelPairs: panel.frozen.pairs.length,
      microstates: panel.frozen.pairs.length * 2,
      frozenLesions: panel.frozen.pairs.length * 2 * config.replicates,
      neutralityComparisons,
      totalBranchRuns: branches.length,
      activeBranchRuns: activeBranches.length,
      acceptedTraceRecords: traceLines.length,
    },
    neutrality: {
      comparisons: neutralityComparisons,
      mismatches: neutralityMismatches,
      passed: neutralityMismatches === 0,
    },
    cells,
    estimators: {
      gammaAFeedback0,
      gammaAFeedback1,
      tripleInteraction,
    },
    uncertainty,
    pairEffects,
    dynamics: {
      candidateExposures,
      carrierAdjustedCandidates,
      carrierAdjustedByAction,
      maxAbsCarrierAdjustment,
      comparablePreStateSteps: sumPaired('comparablePreStateSteps'),
      changedWinnerSteps,
      changedAdmissionSteps,
      acceptedCarrierInducedActions,
      holdToSwap: sumPaired('holdToSwap'),
      swapToHold: sumPaired('swapToHold'),
      swapToSwap: sumPaired('swapToSwap'),
      otherWinnerChanges: sumPaired('otherWinnerChanges'),
      activeStateDivergenceCount: paired.filter(
        entry => entry.firstStateDivergenceStep !== null,
      ).length,
      activeReconvergenceCount: paired.filter(entry => entry.everReconverged).length,
      reconvergenceEvents: sumPaired('reconvergenceEvents'),
      mechanisticEndpointMet,
    },
    interpretation,
    nextExperiment: mechanisticEndpointMet
      ? 'EMERGE-CARRIER-003: freeze real and equal-distribution sham histories, preserving marginal capsule exposure while permuting temporal alignment.'
      : 'Carrier-002D sensitivity audit: measure score margins and the minimum continuity coefficient required to alter a reachable decision without changing the confirmatory coefficient retrospectively.',
    branches,
  };

  const manifest = {
    schemaVersion: 'emerge-carrier-002c-manifest-v1',
    experimentId: summary.experimentId,
    sourceSelectorSha256: summary.sourceSelectorSha256,
    capsuleSelectorSha256: summary.capsuleSelectorSha256,
    summarySha256: stableHash(summary),
    traceSha256: createHash('sha256').update(traceGzip).digest('hex'),
    traceRecords: traceLines.length,
    traceUncompressedBytes: Buffer.byteLength(traceText),
    traceCompressedBytes: traceGzip.byteLength,
    neutralityPassed: summary.neutrality.passed,
    mechanisticEndpointMet,
  };

  mkdirSync(dirname(summaryPath), { recursive: true });
  mkdirSync(dirname(tracePath), { recursive: true });
  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  writeFileSync(tracePath, traceGzip);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(
    JSON.stringify(
      {
        experimentId: summary.experimentId,
        sourceSelectorSha256: summary.sourceSelectorSha256,
        capsuleSelectorSha256: summary.capsuleSelectorSha256,
        neutrality: summary.neutrality,
        estimators: summary.estimators,
        uncertainty: summary.uncertainty,
        dynamics: summary.dynamics,
        interpretation: summary.interpretation,
        nextExperiment: summary.nextExperiment,
        manifest,
      },
      null,
      2,
    ),
  );
}

main();
