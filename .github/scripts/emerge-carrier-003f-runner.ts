import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SOURCE_SHA256 =
  'b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a';
const PREREGISTRATION_SHA256 =
  '596718bb1c23c8d1cd9aeeee999565f7c2a487de09496b02941665322c6ee515';
// This receipt seals the ledger as it stood before outcome execution. The live
// ledger advances when the result is recorded, so completed-branch reruns embed
// this immutable receipt instead of rehashing the finalized ledger.
const PREOUTCOME_LEDGER_SHA256 =
  '3dfac9e29147cb1a2520a3f33329f55e06ecb3b89bf07a890959e3544e1a9b8e';

function sha256(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function replaceExactly(source: string, needle: string, replacement: string): string {
  const first = source.indexOf(needle);
  if (first === -1) throw new Error(`Carrier-003F assembly needle not found:\n${needle}`);
  if (source.indexOf(needle, first + needle.length) !== -1) {
    throw new Error(`Carrier-003F assembly needle was not unique:\n${needle}`);
  }
  return `${source.slice(0, first)}${replacement}${source.slice(first + needle.length)}`;
}

function main(): void {
  const sourcePath = resolve(
    process.argv[2] ??
      'experiments/emerge-ko-001/run-carrier-003c.reference.generated.ts',
  );
  const outputPath = resolve(
    process.argv[3] ??
      'experiments/emerge-ko-001/run-carrier-003f.active.generated.ts',
  );
  const preregistrationPath = resolve(
    process.argv[4] ??
      'docs/EMERGE-CARRIER-003F-PREREGISTRATION-18JUL2026.md',
  );
  let source = readFileSync(sourcePath, 'utf8');
  const sourceSha256 = sha256(source);
  const preregistrationSha256 = sha256(readFileSync(preregistrationPath));
  if (sourceSha256 !== SOURCE_SHA256) {
    throw new Error(`Carrier-003C source drift: ${sourceSha256}`);
  }
  if (preregistrationSha256 !== PREREGISTRATION_SHA256) {
    throw new Error(`Carrier-003F preregistration drift: ${preregistrationSha256}`);
  }

  source = replaceExactly(
    source,
    "import { projectDualityUpdate } from '../../src/logic/dualityProjection';",
    `import {
  classifyDualityBoundaryTransition,
  projectDualityUpdate,
} from '../../src/logic/dualityProjection';`,
  );

  source = replaceExactly(
    source,
    `interface BranchDiagnostics {
  candidateExposures: Record<string, number>;
  carrierAdjustedCandidates: number;
  carrierAdjustedByAction: Record<string, number>;
  carrierAdjustmentSum: number;
  maxAbsCarrierAdjustment: number;
  acceptedTransitions: number;
  finalCapsule: CapsuleState;
}`,
    `interface BranchDiagnostics {
  candidateExposures: Record<string, number>;
  carrierAdjustedCandidates: number;
  carrierAdjustedByAction: Record<string, number>;
  carrierAdjustmentSum: number;
  maxAbsCarrierAdjustment: number;
  acceptedTransitions: number;
  boundaryArm: BoundaryArm;
  boundaryRotation: number;
  boundaryFrontiers: number;
  boundaryDivergentFrontiers: number;
  boundaryMultisetComparisons: number;
  boundaryMultisetMismatches: number;
  boundaryCandidateAssignmentsChanged: number;
  trueBoundaryDirections: Record<string, number>;
  appliedBoundaryDirections: Record<string, number>;
  trueBoundaryAssignmentReceiptSha256: string;
  appliedBoundaryAssignmentReceiptSha256: string;
  maxAbsNeedleAdjustment: number;
  finalCapsule: CapsuleState;
}`,
  );

  source = replaceExactly(
    source,
    `interface BranchSummary {
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

type RankedCandidate`,
    `interface BranchSummary {
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

type BoundaryArm = 'off' | 'real' | 'sham';

interface NeedleBranchSummary {
  pairId: string;
  microstateSource: MicrostateSource;
  replicate: number;
  feedback: 0 | 1;
  capsuleId: CapsuleId;
  branchSeed: number;
  arm: Exclude<BoundaryArm, 'off'>;
  rotation: number;
  projection: KernelProjection;
  projectionSha256: string;
  diagnostics: BranchDiagnostics;
  reachabilityDiagnostics: PairedDiagnostics | null;
  assignmentDiagnostics: PairedDiagnostics | null;
}

type RankedCandidate`,
  );

  source = replaceExactly(
    source,
    `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  candidateVelocity: number;
  candidateTargetDuality: number;
  candidateDema: number;
};`,
    `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  candidateVelocity: number;
  candidateTargetDuality: number;
  candidateDema: number;
  trueBoundaryDirection: -1 | 0 | 1;
  appliedBoundaryDirection: -1 | 0 | 1;
  needleAdjustment: number;
};`,
  );

  source = replaceExactly(
    source,
    `function increment(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
}`,
    `function increment(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
}

function mergeCounts(
  target: Record<string, number>,
  source: Record<string, number>,
): void {
  for (const [key, count] of Object.entries(source)) {
    target[key] = (target[key] ?? 0) + count;
  }
}

function branchReceiptKey(
  pairId: string,
  microstateSource: MicrostateSource,
  replicate: number,
  feedback: 0 | 1,
  capsuleId: CapsuleId,
): string {
  return \`${'${pairId}'}|${'${microstateSource}'}|${'${replicate}'}|${'${feedback}'}|${'${capsuleId}'}\`;
}`,
  );

  source = replaceExactly(
    source,
    `  active: CarrierActive,
  emaAlpha: number,
  historyWindow: number,
): BranchRun {`,
    `  active: CarrierActive,
  emaAlpha: number,
  historyWindow: number,
  boundaryArm: BoundaryArm = 'off',
  boundaryRotation = 0,
): BranchRun {`,
  );

  source = replaceExactly(
    source,
    `  const acceptedTrace: Record<string, unknown>[] = [];

  if (multisetRecall(targets, bridgeSignatures(codex, current)) !== 0) {`,
    `  const acceptedTrace: Record<string, unknown>[] = [];
  let boundaryFrontiers = 0;
  let boundaryDivergentFrontiers = 0;
  let boundaryMultisetComparisons = 0;
  let boundaryMultisetMismatches = 0;
  let boundaryCandidateAssignmentsChanged = 0;
  const trueBoundaryDirections: Record<string, number> = {};
  const appliedBoundaryDirections: Record<string, number> = {};
  const trueBoundaryAssignmentParts: string[] = [];
  const appliedBoundaryAssignmentParts: string[] = [];
  let maxAbsNeedleAdjustment = 0;

  if (boundaryArm === 'sham' && (boundaryRotation < 1 || boundaryRotation > 14)) {
    throw new Error('Carrier-003F sham rotation must be in [1,14].');
  }

  if (multisetRecall(targets, bridgeSignatures(codex, current)) !== 0) {`,
  );

  source = replaceExactly(
    source,
    `        candidateTargetDuality,
        candidateDema,
      };
    });

    const augmentFeedback`,
    `        candidateTargetDuality,
        candidateDema,
        trueBoundaryDirection: classifyDualityBoundaryTransition(
          capsuleState.dEma,
          candidateDema,
          config.theta,
        ),
        appliedBoundaryDirection: 0,
        needleAdjustment: 0,
      };
    });

    boundaryFrontiers++;
    const canonicalCandidates = carrierRanked
      .map((candidate, originalIndex) => ({
        candidate,
        originalIndex,
        receipt: stableHash({
          type: candidate.type,
          sequence: candidate.sequence,
        }),
      }))
      .sort((left, right) =>
        left.receipt.localeCompare(right.receipt) ||
        left.originalIndex - right.originalIndex,
      );
    if (
      new Set(canonicalCandidates.map(entry => entry.receipt)).size !==
      canonicalCandidates.length
    ) {
      throw new Error('Carrier-003F canonical candidate receipts were not unique.');
    }
    const frontierReceipt = stableHash({
      pairId,
      microstateSource,
      replicate: lesion.replicate,
      feedback,
      capsuleId: capsule.capsuleId,
      step,
      beforeSequenceSha256,
      candidates: canonicalCandidates.map(entry => entry.receipt),
    });
    const trueVector = canonicalCandidates.map(
      entry => entry.candidate.trueBoundaryDirection,
    );
    if (new Set(trueVector).size > 1) boundaryDivergentFrontiers++;
    let appliedVector: Array<-1 | 0 | 1>;
    if (boundaryArm === 'off') {
      appliedVector = trueVector.map(() => 0 as const);
    } else if (boundaryArm === 'real') {
      appliedVector = [...trueVector];
    } else {
      const salt = String(boundaryRotation).padStart(2, '0');
      const sourceOrder = trueVector
        .map((_, index) => ({
          index,
          key: stableHash({
            experimentId: 'EMERGE-CARRIER-003F',
            salt,
            frontierReceipt,
            slot: index,
          }),
        }))
        .sort((left, right) => left.key.localeCompare(right.key) || left.index - right.index)
        .map(entry => entry.index);
      appliedVector = sourceOrder.map(sourceIndex => trueVector[sourceIndex]);
    }
    if (boundaryArm !== 'off') {
      boundaryMultisetComparisons++;
      const trueMultiset = [...trueVector].sort((a, b) => a - b);
      const appliedMultiset = [...appliedVector].sort((a, b) => a - b);
      if (JSON.stringify(trueMultiset) !== JSON.stringify(appliedMultiset)) {
        boundaryMultisetMismatches++;
        throw new Error('Carrier-003F sham changed the per-frontier ternary multiset.');
      }
    }
    const appliedByOriginalIndex = new Array<-1 | 0 | 1>(carrierRanked.length);
    for (let index = 0; index < canonicalCandidates.length; index++) {
      const trueDirection = trueVector[index];
      const appliedDirection = appliedVector[index];
      increment(trueBoundaryDirections, String(trueDirection));
      increment(appliedBoundaryDirections, String(appliedDirection));
      if (trueDirection !== appliedDirection) boundaryCandidateAssignmentsChanged++;
      appliedByOriginalIndex[canonicalCandidates[index].originalIndex] = appliedDirection;
    }
    trueBoundaryAssignmentParts.push(stableHash({ frontierReceipt, vector: trueVector }));
    appliedBoundaryAssignmentParts.push(
      stableHash({ frontierReceipt, vector: appliedVector }),
    );
    const needleRanked = carrierRanked.map((candidate, index) => {
      const appliedBoundaryDirection = appliedByOriginalIndex[index];
      const needleAdjustment = active * 0.01 * appliedBoundaryDirection;
      maxAbsNeedleAdjustment = Math.max(
        maxAbsNeedleAdjustment,
        Math.abs(needleAdjustment),
      );
      return {
        ...candidate,
        score: candidate.score + needleAdjustment,
        deltaScore: candidate.deltaScore + needleAdjustment,
        appliedBoundaryDirection,
        needleAdjustment,
      };
    });

    const augmentFeedback`,
  );

  source = replaceExactly(
    source,
    `      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
    })) as CarrierCandidate[];
    const baselineAugmented = augmentFeedback(zeroCarrier);
    const activeAugmented = augmentFeedback(carrierRanked);`,
    `      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
      trueBoundaryDirection: 0,
      appliedBoundaryDirection: 0,
      needleAdjustment: 0,
    })) as CarrierCandidate[];
    const baselineAugmented = augmentFeedback(zeroCarrier);
    const activeAugmented = augmentFeedback(needleRanked);`,
  );

  source = replaceExactly(
    source,
    `      if (active === 1) {
        const selected = selection.selected as CarrierCandidate;`,
    `      if (active === 1 && boundaryArm === 'off') {
        const selected = selection.selected as CarrierCandidate;`,
  );

  source = replaceExactly(
    source,
    `      maxAbsCarrierAdjustment,
      acceptedTransitions: acceptedSteps,
      finalCapsule: capsuleState,`,
    `      maxAbsCarrierAdjustment,
      acceptedTransitions: acceptedSteps,
      boundaryArm,
      boundaryRotation,
      boundaryFrontiers,
      boundaryDivergentFrontiers,
      boundaryMultisetComparisons,
      boundaryMultisetMismatches,
      boundaryCandidateAssignmentsChanged,
      trueBoundaryDirections,
      appliedBoundaryDirections,
      trueBoundaryAssignmentReceiptSha256: stableHash(trueBoundaryAssignmentParts),
      appliedBoundaryAssignmentReceiptSha256: stableHash(
        appliedBoundaryAssignmentParts,
      ),
      maxAbsNeedleAdjustment,
      finalCapsule: capsuleState,`,
  );

  source = replaceExactly(
    source,
    `  const manifestPath = resolve(
    process.argv[7] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003C-manifest.json',
  );

  const panel = loadPanel(panelPath);`,
    `  const manifestPath = resolve(
    process.argv[7] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-manifest.json',
  );
  const rotation = Number(process.argv[8] ?? '7');
  const carrier003cReferencePath = resolve(
    process.argv[9] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-carrier-003c-dark-reference-summary.json',
  );
  if (!Number.isInteger(rotation) || rotation < 1 || rotation > 14) {
    throw new Error('Carrier-003F rotation must be an integer in [1,14].');
  }

  const panel = loadPanel(panelPath);`,
  );

  source = replaceExactly(
    source,
    `  const legacyReceiptMap = new Map(
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

  const branches: BranchSummary[] = [];`,
    `  const legacyReceiptMap = new Map(
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
  const carrier003cReference = JSON.parse(
    readFileSync(carrier003cReferencePath, 'utf8'),
  ) as { branches: BranchSummary[] };
  const carrier003cReferenceMap = new Map(
    carrier003cReference.branches
      .filter(branch => branch.active === 1)
      .map(branch => [
        branchReceiptKey(
          branch.pairId,
          branch.microstateSource,
          branch.replicate,
          branch.feedback,
          branch.capsuleId,
        ),
        branch.projectionSha256,
      ]),
  );

  const branches: BranchSummary[] = [];`,
  );

  source = replaceExactly(
    source,
    `  const traceLines: string[] = [];
  let neutralityComparisons = 0;
  let neutralityMismatches = 0;`,
    `  const traceLines: string[] = [];
  const needleBranches: NeedleBranchSummary[] = [];
  let neutralityComparisons = 0;
  let neutralityMismatches = 0;
  let carrier003cReferenceComparisons = 0;
  let carrier003cReferenceMismatches = 0;`,
  );

  source = replaceExactly(
    source,
    `            const pairedDiagnostics = compareRuns(knockout, active);

            branches.push({`,
    `            const pairedDiagnostics = compareRuns(knockout, active);
            const referenceKey = branchReceiptKey(
              pair.pairId,
              microstateSource,
              lesion.replicate,
              feedback,
              capsule.capsuleId,
            );
            carrier003cReferenceComparisons++;
            if (
              carrier003cReferenceMap.get(referenceKey) !==
              stableHash(active.projection)
            ) {
              carrier003cReferenceMismatches++;
              throw new Error(\`Carrier-003F boundary-off reference mismatch at ${'${referenceKey}'}.\`);
            }

            const realNeedle = runBranch(
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
              'real',
              rotation,
            );
            const shamNeedle = runBranch(
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
              'sham',
              rotation,
            );
            const reachabilityDiagnostics = compareRuns(active, realNeedle);
            const assignmentDiagnostics = compareRuns(shamNeedle, realNeedle);
            needleBranches.push({
              pairId: pair.pairId,
              microstateSource,
              replicate: lesion.replicate,
              feedback,
              capsuleId: capsule.capsuleId,
              branchSeed: lesion.branchSeed,
              arm: 'real',
              rotation,
              projection: realNeedle.projection,
              projectionSha256: stableHash(realNeedle.projection),
              diagnostics: realNeedle.diagnostics,
              reachabilityDiagnostics,
              assignmentDiagnostics: null,
            });
            needleBranches.push({
              pairId: pair.pairId,
              microstateSource,
              replicate: lesion.replicate,
              feedback,
              capsuleId: capsule.capsuleId,
              branchSeed: lesion.branchSeed,
              arm: 'sham',
              rotation,
              projection: shamNeedle.projection,
              projectionSha256: stableHash(shamNeedle.projection),
              diagnostics: shamNeedle.diagnostics,
              reachabilityDiagnostics: null,
              assignmentDiagnostics,
            });

            branches.push({`,
  );

  source = replaceExactly(
    source,
    `  const interpretation = !mechanisticEndpointMet
    ? 'Carrier-003C exposed native projected duality velocity to reachable candidates but changed no exact winner or admission decision. A complete-sham slope sweep is not admissible.'
    : primaryClearsZero
      ? 'Carrier-003C changed reachable decisions and produced a pair-generalised state-specific recovery effect under feedback. Direction follows the signed interval; complete-sham slope timing control is the next gate.'
      : 'Carrier-003C changed reachable hold/swap decisions using native projected signed duality slope. Recovery efficacy is not established; the complete-sham slope timing control is now admissible.';

  const traceText`,
    `  const interpretation = !mechanisticEndpointMet
    ? 'Carrier-003C exposed native projected duality velocity to reachable candidates but changed no exact winner or admission decision. A complete-sham slope sweep is not admissible.'
    : primaryClearsZero
      ? 'Carrier-003C changed reachable decisions and produced a pair-generalised state-specific recovery effect under feedback. Direction follows the signed interval; complete-sham slope timing control is the next gate.'
      : 'Carrier-003C changed reachable hold/swap decisions using native projected signed duality slope. Recovery efficacy is not established; the complete-sham slope timing control is now admissible.';

  const realNeedleBranches = needleBranches.filter(branch => branch.arm === 'real');
  const shamNeedleBranches = needleBranches.filter(branch => branch.arm === 'sham');
  const needleOutcome = (
    pairId: string,
    feedback: 0 | 1,
    arm: 'real' | 'sham',
    capsuleId?: CapsuleId,
  ): number =>
    mean(
      needleBranches
        .filter(
          branch =>
            branch.pairId === pairId &&
            branch.feedback === feedback &&
            branch.arm === arm &&
            (capsuleId === undefined || branch.capsuleId === capsuleId),
        )
        .map(branch => branch.projection.finalTargetRecovery),
    );
  const needlePairEffects = panel.frozen.pairs.map(pair => {
    const delta = (feedback: 0 | 1) =>
      needleOutcome(pair.pairId, feedback, 'real') -
      needleOutcome(pair.pairId, feedback, 'sham');
    const stateSpecific = (feedback: 0 | 1) =>
      (needleOutcome(pair.pairId, feedback, 'real', 'M1-latched') -
        needleOutcome(pair.pairId, feedback, 'sham', 'M1-latched')) -
      (needleOutcome(pair.pairId, feedback, 'real', 'M0-unlatched') -
        needleOutcome(pair.pairId, feedback, 'sham', 'M0-unlatched'));
    const deltaZ0 = delta(0);
    const deltaZ1 = delta(1);
    const stateZ0 = stateSpecific(0);
    const stateZ1 = stateSpecific(1);
    return {
      pairId: pair.pairId,
      deltaRealMinusShamZ0: deltaZ0,
      deltaRealMinusShamZ1: deltaZ1,
      boundaryFeedbackInteraction: deltaZ1 - deltaZ0,
      stateSpecificBoundaryZ0: stateZ0,
      stateSpecificBoundaryZ1: stateZ1,
      stateBoundaryFeedbackInteraction: stateZ1 - stateZ0,
    };
  });
  const needleEstimators = {
    deltaRealMinusShamZ0: mean(
      needlePairEffects.map(pair => pair.deltaRealMinusShamZ0),
    ),
    deltaRealMinusShamZ1: mean(
      needlePairEffects.map(pair => pair.deltaRealMinusShamZ1),
    ),
    boundaryFeedbackInteraction: mean(
      needlePairEffects.map(pair => pair.boundaryFeedbackInteraction),
    ),
    stateSpecificBoundaryZ0: mean(
      needlePairEffects.map(pair => pair.stateSpecificBoundaryZ0),
    ),
    stateSpecificBoundaryZ1: mean(
      needlePairEffects.map(pair => pair.stateSpecificBoundaryZ1),
    ),
    stateBoundaryFeedbackInteraction: mean(
      needlePairEffects.map(pair => pair.stateBoundaryFeedbackInteraction),
    ),
  };
  const needleUncertainty = {
    deltaRealMinusShamZ0: interval(
      needlePairEffects.map(pair => pair.deltaRealMinusShamZ0),
    ),
    deltaRealMinusShamZ1: interval(
      needlePairEffects.map(pair => pair.deltaRealMinusShamZ1),
    ),
    boundaryFeedbackInteraction: interval(
      needlePairEffects.map(pair => pair.boundaryFeedbackInteraction),
    ),
    stateSpecificBoundaryZ0: interval(
      needlePairEffects.map(pair => pair.stateSpecificBoundaryZ0),
    ),
    stateSpecificBoundaryZ1: interval(
      needlePairEffects.map(pair => pair.stateSpecificBoundaryZ1),
    ),
    stateBoundaryFeedbackInteraction: interval(
      needlePairEffects.map(pair => pair.stateBoundaryFeedbackInteraction),
    ),
  };
  type CountedDiagnostic = keyof Pick<
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
  >;
  const sumDiagnostics = (
    entries: PairedDiagnostics[],
    key: CountedDiagnostic,
  ): number => entries.reduce((sum, entry) => sum + entry[key], 0);
  const reachabilityPaired = realNeedleBranches
    .map(branch => branch.reachabilityDiagnostics)
    .filter((entry): entry is PairedDiagnostics => entry !== null);
  const assignmentPaired = shamNeedleBranches
    .map(branch => branch.assignmentDiagnostics)
    .filter((entry): entry is PairedDiagnostics => entry !== null);
  const reachability = {
    comparablePreStateSteps: sumDiagnostics(
      reachabilityPaired,
      'comparablePreStateSteps',
    ),
    changedWinnerSteps: sumDiagnostics(reachabilityPaired, 'changedWinnerSteps'),
    changedAdmissionSteps: sumDiagnostics(
      reachabilityPaired,
      'changedAdmissionSteps',
    ),
    acceptedBoundaryInducedActions: sumDiagnostics(
      reachabilityPaired,
      'acceptedCarrierInducedActions',
    ),
    stateDivergenceCount: reachabilityPaired.filter(
      entry => entry.firstStateDivergenceStep !== null,
    ).length,
    reconvergenceEvents: sumDiagnostics(reachabilityPaired, 'reconvergenceEvents'),
  };
  const assignmentMechanism = {
    comparablePreStateSteps: sumDiagnostics(
      assignmentPaired,
      'comparablePreStateSteps',
    ),
    changedWinnerSteps: sumDiagnostics(assignmentPaired, 'changedWinnerSteps'),
    changedAdmissionSteps: sumDiagnostics(
      assignmentPaired,
      'changedAdmissionSteps',
    ),
    acceptedAssignmentInducedActions: sumDiagnostics(
      assignmentPaired,
      'acceptedCarrierInducedActions',
    ),
    shamHoldToRealSwap: sumDiagnostics(assignmentPaired, 'holdToSwap'),
    shamSwapToRealHold: sumDiagnostics(assignmentPaired, 'swapToHold'),
    shamSwapToDifferentRealSwap: sumDiagnostics(assignmentPaired, 'swapToSwap'),
    otherWinnerChanges: sumDiagnostics(assignmentPaired, 'otherWinnerChanges'),
    stateDivergenceCount: assignmentPaired.filter(
      entry => entry.firstStateDivergenceStep !== null,
    ).length,
    reconvergenceEvents: sumDiagnostics(assignmentPaired, 'reconvergenceEvents'),
  };
  const trueBoundaryDirections: Record<string, number> = {};
  const appliedShamBoundaryDirections: Record<string, number> = {};
  let shamMultisetComparisons = 0;
  let shamMultisetMismatches = 0;
  let shamCandidateAssignmentsChanged = 0;
  for (const branch of shamNeedleBranches) {
    mergeCounts(trueBoundaryDirections, branch.diagnostics.trueBoundaryDirections);
    mergeCounts(
      appliedShamBoundaryDirections,
      branch.diagnostics.appliedBoundaryDirections,
    );
    shamMultisetComparisons += branch.diagnostics.boundaryMultisetComparisons;
    shamMultisetMismatches += branch.diagnostics.boundaryMultisetMismatches;
    shamCandidateAssignmentsChanged +=
      branch.diagnostics.boundaryCandidateAssignmentsChanged;
  }
  const boundaryReachabilityMet =
    reachability.changedWinnerSteps > 0 ||
    reachability.changedAdmissionSteps > 0 ||
    reachability.acceptedBoundaryInducedActions > 0;
  const assignmentMechanismMet =
    assignmentMechanism.changedWinnerSteps > 0 ||
    assignmentMechanism.changedAdmissionSteps > 0 ||
    assignmentMechanism.acceptedAssignmentInducedActions > 0;
  const primaryNeedleInterval = needleUncertainty.deltaRealMinusShamZ1.interval95;
  const trueAssignmentImproves =
    boundaryReachabilityMet &&
    assignmentMechanismMet &&
    needleEstimators.deltaRealMinusShamZ1 > 0 &&
    primaryNeedleInterval[0] > 0;
  const trueAssignmentHarms =
    boundaryReachabilityMet &&
    assignmentMechanismMet &&
    needleEstimators.deltaRealMinusShamZ1 < 0 &&
    primaryNeedleInterval[1] < 0;
  const needleInterpretation = !boundaryReachabilityMet
    ? 'The fixed native boundary law changed no reachable winner or admission relative to Carrier-003C; efficacy is not interpretable.'
    : !assignmentMechanismMet
      ? 'The true boundary law was reachable, but this sham assignment changed no decision relative to the native candidate assignment.'
      : trueAssignmentImproves
        ? 'The true native candidate assignment improved pair-generalised repair under feedback relative to this equal-exposure sham.'
        : trueAssignmentHarms
          ? 'The true native candidate assignment reduced pair-generalised repair under feedback relative to this equal-exposure sham.'
          : 'The true and sham boundary assignments changed reachable decisions, but this rotation-specific pair interval crosses zero.';
  const trueProjectionReceiptSha256 = stableHash(
    realNeedleBranches.map(branch => ({
      key: branchReceiptKey(
        branch.pairId,
        branch.microstateSource,
        branch.replicate,
        branch.feedback,
        branch.capsuleId,
      ),
      projectionSha256: branch.projectionSha256,
    })),
  );
  const trueAssignmentReceiptSha256 = stableHash(
    realNeedleBranches.map(branch => ({
      key: branchReceiptKey(
        branch.pairId,
        branch.microstateSource,
        branch.replicate,
        branch.feedback,
        branch.capsuleId,
      ),
      receipt: branch.diagnostics.appliedBoundaryAssignmentReceiptSha256,
    })),
  );
  const shamProjectionReceiptSha256 = stableHash(
    shamNeedleBranches.map(branch => ({
      key: branchReceiptKey(
        branch.pairId,
        branch.microstateSource,
        branch.replicate,
        branch.feedback,
        branch.capsuleId,
      ),
      projectionSha256: branch.projectionSha256,
    })),
  );
  const shamAssignmentReceiptSha256 = stableHash(
    shamNeedleBranches.map(branch => ({
      key: branchReceiptKey(
        branch.pairId,
        branch.microstateSource,
        branch.replicate,
        branch.feedback,
        branch.capsuleId,
      ),
      receipt: branch.diagnostics.appliedBoundaryAssignmentReceiptSha256,
    })),
  );
  const needle = {
    rotation,
    coefficient: 0.01,
    threshold: config.theta,
    preregistrationSha256: '${PREREGISTRATION_SHA256}',
    preOutcomeLedgerSha256: '${PREOUTCOME_LEDGER_SHA256}',
    carrier003cReference: {
      comparisons: carrier003cReferenceComparisons,
      mismatches: carrier003cReferenceMismatches,
      passed: carrier003cReferenceMismatches === 0,
    },
    shamIntegrity: {
      perFrontierMultisetComparisons: shamMultisetComparisons,
      perFrontierMultisetMismatches: shamMultisetMismatches,
      candidateAssignmentsChanged: shamCandidateAssignmentsChanged,
      trueBoundaryDirections,
      appliedBoundaryDirections: appliedShamBoundaryDirections,
      exactExposurePreserved:
        JSON.stringify(trueBoundaryDirections) ===
        JSON.stringify(appliedShamBoundaryDirections),
    },
    reachability,
    assignmentMechanism,
    boundaryReachabilityMet,
    assignmentMechanismMet,
    estimators: needleEstimators,
    uncertainty: needleUncertainty,
    pairEffects: needlePairEffects,
    trueProjectionReceiptSha256,
    trueAssignmentReceiptSha256,
    shamProjectionReceiptSha256,
    shamAssignmentReceiptSha256,
    trueAssignmentImproves,
    trueAssignmentHarms,
    interpretation: needleInterpretation,
  };

  if (!needle.shamIntegrity.exactExposurePreserved) {
    throw new Error('Carrier-003F aggregate sham exposure drifted.');
  }

  const traceText`,
  );

  source = source
    .replace("schemaVersion: 'emerge-carrier-003c-v1'", "schemaVersion: 'emerge-carrier-003f-v1'")
    .replace("experimentId: 'EMERGE-CARRIER-003C'", "experimentId: 'EMERGE-CARRIER-003F'")
    .replace("schemaVersion: 'emerge-carrier-003c-manifest-v1'", "schemaVersion: 'emerge-carrier-003f-manifest-v1'");

  source = replaceExactly(
    source,
    `      acceptedTraceRecords: traceLines.length,
    },`,
    `      acceptedTraceRecords: traceLines.length,
      needleBranchRuns: needleBranches.length,
      totalBranchRunsIncludingNeedle: branches.length + needleBranches.length,
    },`,
  );

  source = replaceExactly(
    source,
    `      mechanisticEndpointMet,
    },
    interpretation,
    nextExperiment: mechanisticEndpointMet
      ? 'EMERGE-CARRIER-003D: complete 14-rotation real-versus-sham audit of the native projected signed-slope carrier.'
      : 'No slope sweep. Audit score margins and candidate exposure before changing any coefficient or mechanism.',
    branches,`,
    `      mechanisticEndpointMet,
    },
    needle,
    interpretation: needle.interpretation,
    nextExperiment:
      'Aggregate all fourteen preregistered Carrier-003F equal-exposure sham schedules before selecting any next mechanism or held-out test.',
    branches,
    needleBranches,`,
  );

  source = replaceExactly(
    source,
    `    neutralityPassed: summary.neutrality.passed,
    mechanisticEndpointMet,
  };`,
    `    neutralityPassed: summary.neutrality.passed,
    mechanisticEndpointMet,
    rotation,
    carrier003cReferencePassed: needle.carrier003cReference.passed,
    shamExposurePreserved: needle.shamIntegrity.exactExposurePreserved,
    boundaryReachabilityMet: needle.boundaryReachabilityMet,
    assignmentMechanismMet: needle.assignmentMechanismMet,
    trueProjectionReceiptSha256: needle.trueProjectionReceiptSha256,
    shamProjectionReceiptSha256: needle.shamProjectionReceiptSha256,
    trueAssignmentReceiptSha256: needle.trueAssignmentReceiptSha256,
    shamAssignmentReceiptSha256: needle.shamAssignmentReceiptSha256,
  };`,
  );

  source = replaceExactly(
    source,
    `        dynamics: summary.dynamics,
        interpretation: summary.interpretation,`,
    `        dynamics: summary.dynamics,
        needle: summary.needle,
        interpretation: summary.interpretation,`,
  );

  const generatedSha256 = sha256(source);
  writeFileSync(outputPath, source, 'utf8');
  process.stdout.write(
    `${JSON.stringify(
      {
        sourcePath,
        outputPath,
        sourceSha256,
        preregistrationSha256,
        preOutcomeLedgerSha256: PREOUTCOME_LEDGER_SHA256,
        generatedSha256,
      },
      null,
      2,
    )}\n`,
  );
}

main();
