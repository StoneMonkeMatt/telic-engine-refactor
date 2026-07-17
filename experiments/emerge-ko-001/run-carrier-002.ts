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

interface BranchDiagnostics {
  insertCandidatesSeen: number;
  carrierAdjustedCandidates: number;
  carrierChangedWinnerSteps: number;
  acceptedCarrierChangedWinnerSteps: number;
  firstCarrierWinnerChangeStep: number | null;
  firstCarrierWinnerChange: {
    baselineAction: string;
    activeAction: string;
  } | null;
  carrierAdjustmentSum: number;
  maxAbsCarrierAdjustment: number;
  acceptedTransitions: number;
  finalCapsule: CapsuleState;
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
  firstStateDivergenceFromKnockout: number | null;
  reconvergenceEvents: number;
  everReconverged: boolean;
}

interface BranchRun {
  projection: KernelProjection;
  diagnostics: BranchDiagnostics;
  trajectoryKeys: string[];
  acceptedTrace: Record<string, unknown>[];
}

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

function multisetKey(sequence: string[]): string {
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join('|');
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

function loadPanel(path: string): FrozenPanel {
  const panel = JSON.parse(readFileSync(path, 'utf8')) as FrozenPanel;
  const observed = stableHash(panel.frozen);
  if (observed !== panel.selectorSha256) {
    throw new Error(`Frozen V2.2 panel hash mismatch: expected ${panel.selectorSha256}, observed ${observed}.`);
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

function deterministicWinner(
  ranked: ReturnType<typeof rankProposals>,
  tieBreakContext: ReturnType<typeof createTieBreakContext>,
) {
  const maxScore = Math.max(...ranked.map(candidate => candidate.score));
  const eligible = ranked.filter(candidate => candidate.score === maxScore);
  return resolveTie(eligible, tieBreakContext).selected;
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
  let insertCandidatesSeen = 0;
  let carrierAdjustedCandidates = 0;
  let carrierChangedWinnerSteps = 0;
  let acceptedCarrierChangedWinnerSteps = 0;
  let firstCarrierWinnerChangeStep: number | null = null;
  let firstCarrierWinnerChange: BranchDiagnostics['firstCarrierWinnerChange'] = null;
  let carrierAdjustmentSum = 0;
  let maxAbsCarrierAdjustment = 0;
  const trajectoryKeys = [current.join('|')];
  const acceptedTrace: Record<string, unknown>[] = [];

  if (multisetRecall(targets, bridgeSignatures(codex, current)) !== 0) {
    throw new Error(
      `${pairId}/${microstateSource}/${capsule.capsuleId}/replicate=${lesion.replicate} did not begin at Y=0.`,
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
    const currentRawDuality = telos.computeRawDuality(current);
    const currentCoherence = telos.coherence(current);
    const currentBridgeRate = bridgeRate(codex, current);
    const tieBreakContext = createTieBreakContext(lesion.branchSeed, step, current);

    const carrierRanked = ranked.map(candidate => {
      const isInsert = candidate.sequence.length > current.length;
      if (isInsert) insertCandidatesSeen++;
      const rawDualityLoss = isInsert
        ? Math.max(0, currentRawDuality - candidate.rawDuality)
        : 0;
      const candidateDema =
        capsuleState.dEma + emaAlpha * (candidate.rawDuality - capsuleState.dEma);
      const carriedDualityLoss = isInsert
        ? Math.max(0, capsuleState.dEma - candidateDema)
        : 0;
      const replacementAdjustment =
        active * 0.5 * (rawDualityLoss - carriedDualityLoss);
      if (Math.abs(replacementAdjustment) > 1e-15) carrierAdjustedCandidates++;
      carrierAdjustmentSum += replacementAdjustment;
      maxAbsCarrierAdjustment = Math.max(
        maxAbsCarrierAdjustment,
        Math.abs(replacementAdjustment),
      );
      return {
        ...candidate,
        score: candidate.score + replacementAdjustment,
        deltaScore: candidate.deltaScore + replacementAdjustment,
        carrierAdjustment: replacementAdjustment,
      };
    });

    const augmentFeedback = (candidates: typeof carrierRanked) =>
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

    const baselineAugmented = augmentFeedback(
      ranked.map(candidate => ({ ...candidate, carrierAdjustment: 0 })),
    );
    const activeAugmented = augmentFeedback(carrierRanked);
    const rawWinner = deterministicWinner(
      ranked.map(candidate => ({ ...candidate, carrierAdjustment: 0 })),
      tieBreakContext,
    );
    const feedbackWinner = deterministicWinner(baselineAugmented, tieBreakContext);
    if (rawWinner.sequence.join('|') !== feedbackWinner.sequence.join('|')) {
      feedbackChangedWinnerSteps++;
    }

    const baselineWinner = deterministicWinner(baselineAugmented, tieBreakContext);
    const carrierWinner = deterministicWinner(activeAugmented, tieBreakContext);
    const carrierChangedWinner =
      baselineWinner.sequence.join('|') !== carrierWinner.sequence.join('|');
    if (carrierChangedWinner) {
      carrierChangedWinnerSteps++;
      if (firstCarrierWinnerChangeStep === null) {
        firstCarrierWinnerChangeStep = step;
        firstCarrierWinnerChange = {
          baselineAction: baselineWinner.type,
          activeAction: carrierWinner.type,
        };
      }
    }

    const selection = selectProposal(
      {
        ranked: activeAugmented,
        currentTemp: Math.pow(0.95, step),
        tieBreakContext,
      },
      rng,
    );

    if (selection.accepted) {
      const beforeSequence = [...current];
      const beforeCapsule = capsuleSnapshot(capsuleState);
      current = [...selection.selected.sequence];
      acceptedSteps++;
      if (carrierChangedWinner) acceptedCarrierChangedWinnerSteps++;
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
        acceptedTrace.push({
          pairId,
          microstateSource,
          replicate: lesion.replicate,
          feedback,
          capsuleId: capsule.capsuleId,
          active,
          step,
          proposalType: selection.selected.type,
          carrierChangedWinner,
          carrierAdjustment:
            'carrierAdjustment' in selection.selected
              ? selection.selected.carrierAdjustment
              : 0,
          beforeSequenceSha256: stableHash(beforeSequence),
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
    trajectoryKeys.push(current.join('|'));
  }

  const projection: KernelProjection = {
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

  return {
    projection,
    trajectoryKeys,
    acceptedTrace,
    diagnostics: {
      insertCandidatesSeen,
      carrierAdjustedCandidates,
      carrierChangedWinnerSteps,
      acceptedCarrierChangedWinnerSteps,
      firstCarrierWinnerChangeStep,
      firstCarrierWinnerChange,
      carrierAdjustmentSum,
      maxAbsCarrierAdjustment,
      acceptedTransitions: acceptedSteps,
      finalCapsule: capsuleState,
    },
  };
}

function trajectoryComparison(knockout: string[], active: string[]) {
  let firstStateDivergenceFromKnockout: number | null = null;
  let reconvergenceEvents = 0;
  let divergent = false;
  let everReconverged = false;
  for (let index = 0; index < Math.min(knockout.length, active.length); index++) {
    const equal = knockout[index] === active[index];
    if (!equal && firstStateDivergenceFromKnockout === null) {
      firstStateDivergenceFromKnockout = index;
    }
    if (!equal) divergent = true;
    if (equal && divergent) {
      reconvergenceEvents++;
      everReconverged = true;
      divergent = false;
    }
  }
  return {
    firstStateDivergenceFromKnockout,
    reconvergenceEvents,
    everReconverged,
  };
}

function main(): void {
  const panelPath = resolve(
    process.argv[2] ?? 'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const capsulePath = resolve(
    process.argv[3] ?? 'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-capsules.json',
  );
  const carrier001Path = resolve(
    process.argv[4] ?? 'experiments/emerge-ko-001/results/EMERGE-CARRIER-001-result.json',
  );
  const summaryPath = resolve(
    process.argv[5] ?? 'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-summary.json',
  );
  const tracePath = resolve(
    process.argv[6] ?? 'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-trace.jsonl.gz',
  );
  const manifestPath = resolve(
    process.argv[7] ?? 'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-manifest.json',
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
    const carrierPair = capsules.frozen.pairs.find(entry => entry.pairId === pair.pairId);
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
            if (knockoutHash !== legacyHash) neutralityMismatches++;
            if (knockoutHash !== legacyHash) {
              throw new Error(
                `Carrier-002A neutrality mismatch at ${pair.pairId}/${microstateSource}/${capsule.capsuleId}/replicate=${lesion.replicate}/Z=${feedback}.`,
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
            const comparison = trajectoryComparison(
              knockout.trajectoryKeys,
              active.trajectoryKeys,
            );

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
              firstStateDivergenceFromKnockout: null,
              reconvergenceEvents: 0,
              everReconverged: false,
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
              ...comparison,
            });
            for (const trace of active.acceptedTrace) {
              traceLines.push(JSON.stringify(trace));
            }
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
      meanCarrierChangedWinnerSteps: mean(
        selected.map(branch => branch.diagnostics.carrierChangedWinnerSteps),
      ),
      meanAcceptedCarrierChangedWinnerSteps: mean(
        selected.map(
          branch => branch.diagnostics.acceptedCarrierChangedWinnerSteps,
        ),
      ),
      stateDivergenceRate:
        selected.filter(
          branch => branch.firstStateDivergenceFromKnockout !== null,
        ).length / Math.max(selected.length, 1),
      reconvergenceRate:
        selected.filter(branch => branch.everReconverged).length /
        Math.max(selected.length, 1),
    };
  };

  const cells = ([0, 1] as const).flatMap(feedback =>
    (['M0-unlatched', 'M1-latched'] as const).flatMap(capsuleId =>
      ([0, 1] as const).map(active => cell(capsuleId, active, feedback)),
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
    (value('M1-latched', 1, feedback) -
      value('M1-latched', 0, feedback)) -
    (value('M0-unlatched', 1, feedback) -
      value('M0-unlatched', 0, feedback));
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
    gammaAFeedback0: interval(
      pairEffects.map(pair => pair.gammaAFeedback0),
    ),
    gammaAFeedback1: interval(
      pairEffects.map(pair => pair.gammaAFeedback1),
    ),
    tripleInteraction: interval(
      pairEffects.map(pair => pair.tripleInteraction),
    ),
  };

  const activeBranches = branches.filter(branch => branch.active === 1);
  const totalCarrierChangedWinnerSteps = activeBranches.reduce(
    (sum, branch) => sum + branch.diagnostics.carrierChangedWinnerSteps,
    0,
  );
  const acceptedCarrierChangedWinnerSteps = activeBranches.reduce(
    (sum, branch) =>
      sum + branch.diagnostics.acceptedCarrierChangedWinnerSteps,
    0,
  );
  const carrierAdjustedCandidates = activeBranches.reduce(
    (sum, branch) => sum + branch.diagnostics.carrierAdjustedCandidates,
    0,
  );
  const insertCandidatesSeen = activeBranches.reduce(
    (sum, branch) => sum + branch.diagnostics.insertCandidatesSeen,
    0,
  );

  const primaryInterval = uncertainty.gammaAFeedback1.interval95;
  const carrierFunctional = totalCarrierChangedWinnerSteps > 0;
  const primaryClearsZero =
    primaryInterval[0] > 0 || primaryInterval[1] < 0;
  const interpretation = !carrierFunctional
    ? 'Carrier-002A passed, but the active native carrier did not alter any winner or trajectory at this resolution. The carrier path is inert or too weak on this substrate.'
    : primaryClearsZero
      ? 'Carrier-002A passed and the active native carrier produced a pair-generalised state-specific recovery effect under feedback. Direction follows the signed interval.'
      : 'Carrier-002A passed and the native carrier is functionally causal: it changed rankings, accepted decisions or trajectories. The pair-level interval still crosses zero, so state-specific recovery efficacy is not established.';

  const traceText = traceLines.length ? `${traceLines.join('\n')}\n` : '';
  const traceGzip = gzipSync(traceText, { level: 9 });
  const summary = {
    schemaVersion: 'emerge-carrier-002-v1',
    experimentId: 'EMERGE-CARRIER-002',
    generatedAt: new Date().toISOString(),
    sourceSelectorSha256: panel.selectorSha256,
    capsuleSelectorSha256: capsules.capsuleSelectorSha256,
    preregistration: {
      carrier002A:
        'Every A=0 capsule branch must reproduce the corresponding Carrier-001 projection hash exactly. Any mismatch aborts before interpretation.',
      carrier002B:
        'No directional sign is preregistered. Primary estimator is the M-by-A interaction under feedback Z=1. Z=0 is a negative-control interaction; their difference is the triple interaction.',
      emaAlpha,
      kappa: config.kappa,
      declarationGate: false,
      feedbackStrengthChange: false,
      targetWound: 'exactly two uniquely identified bridges, inherited from frozen V2.2',
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
    carrier002A: {
      neutralityComparisons,
      neutralityMismatches,
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
      insertCandidatesSeen,
      carrierAdjustedCandidates,
      totalCarrierChangedWinnerSteps,
      acceptedCarrierChangedWinnerSteps,
      activeStateDivergenceCount: activeBranches.filter(
        branch => branch.firstStateDivergenceFromKnockout !== null,
      ).length,
      activeReconvergenceCount: activeBranches.filter(
        branch => branch.everReconverged,
      ).length,
    },
    interpretation,
    nextExperiment: carrierFunctional
      ? 'EMERGE-CARRIER-003: freeze real and equal-distribution sham histories, holding marginal capsule exposure constant while permuting temporal alignment.'
      : 'Run a carrier reachability/sensitivity audit before Carrier-003. Quantify insert opportunity, adjustment magnitude and whether the model-native path can influence the selector on this fixed-length substrate.',
    branches,
  };

  const manifest = {
    schemaVersion: 'emerge-carrier-002-manifest-v1',
    experimentId: summary.experimentId,
    sourceSelectorSha256: summary.sourceSelectorSha256,
    capsuleSelectorSha256: summary.capsuleSelectorSha256,
    summarySha256: stableHash(summary),
    traceSha256: createHash('sha256').update(traceGzip).digest('hex'),
    traceRecords: traceLines.length,
    traceUncompressedBytes: Buffer.byteLength(traceText),
    traceCompressedBytes: traceGzip.byteLength,
    neutralityPassed: summary.carrier002A.passed,
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
        carrier002A: summary.carrier002A,
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
