import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

type JsonObject = Record<string, any>;

function sha256(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function stableHash(value: unknown): string {
  return sha256(JSON.stringify(value));
}

function loadJson(path: string): { bytes: Buffer; value: JsonObject } {
  const bytes = readFileSync(path);
  return { bytes, value: JSON.parse(bytes.toString('utf8')) as JsonObject };
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function baseReplayReceipt(summary: JsonObject): JsonObject {
  const dynamics = { ...summary.dynamics };
  delete dynamics.boundaryTransitionDarkAudit;
  return {
    sourceSelectorSha256: summary.sourceSelectorSha256,
    capsuleSelectorSha256: summary.capsuleSelectorSha256,
    neutrality: summary.neutrality,
    cells: summary.cells,
    estimators: summary.estimators,
    uncertainty: summary.uncertainty,
    pairEffects: summary.pairEffects,
    dynamics,
    interpretation: summary.interpretation,
    nextExperiment: summary.nextExperiment,
    branches: summary.branches.map((branch: JsonObject) => ({
      pairId: branch.pairId,
      microstateSource: branch.microstateSource,
      replicate: branch.replicate,
      feedback: branch.feedback,
      capsuleId: branch.capsuleId,
      active: branch.active,
      branchSeed: branch.branchSeed,
      projection: branch.projection,
      projectionSha256: branch.projectionSha256,
      pairedDiagnostics: branch.pairedDiagnostics,
    })),
  };
}

function flattenDirectionMatrix(matrix: JsonObject): JsonObject {
  const flattened: JsonObject = {};
  for (const [direction, values] of Object.entries(matrix)) {
    for (const [transition, count] of Object.entries(values as JsonObject)) {
      flattened[`${direction}:${transition}`] = count;
    }
  }
  return flattened;
}

function countRecordsEqual(left: JsonObject, right: JsonObject): boolean {
  const leftEntries = Object.entries(left).sort(([a], [b]) => a.localeCompare(b));
  const rightEntries = Object.entries(right).sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(leftEntries) === JSON.stringify(rightEntries);
}

function main(): void {
  const verificationPath = resolve(
    process.argv[2] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-boundary-transition-theta-060.json',
  );
  const acceptedAuditPath = resolve(
    process.argv[3] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-accepted-boundary-cooccurrence.json',
  );
  const referenceSummaryPath = resolve(
    process.argv[4] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-carrier-003c-dark-reference-summary.json',
  );
  const referenceManifestPath = resolve(
    process.argv[5] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-carrier-003c-dark-reference-manifest.json',
  );
  const referenceTracePath = resolve(
    process.argv[6] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-carrier-003c-dark-reference-trace.jsonl.gz',
  );
  const dynamicSummaryPath = resolve(
    process.argv[7] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-dark-dynamic-summary.json',
  );
  const dynamicManifestPath = resolve(
    process.argv[8] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-dark-dynamic-manifest.json',
  );
  const dynamicTracePath = resolve(
    process.argv[9] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-dark-dynamic-accepted-trace.jsonl.gz',
  );
  const outputPath = resolve(
    process.argv[10] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-dark-boundary-dynamic-result.json',
  );

  const verification = loadJson(verificationPath);
  const acceptedAudit = loadJson(acceptedAuditPath);
  const referenceSummary = loadJson(referenceSummaryPath);
  const referenceManifest = loadJson(referenceManifestPath);
  const dynamicSummary = loadJson(dynamicSummaryPath);
  const dynamicManifest = loadJson(dynamicManifestPath);
  const referenceTraceBytes = readFileSync(referenceTracePath);
  const dynamicTraceBytes = readFileSync(dynamicTracePath);

  const threshold = verification.value.requestedThreshold;
  const boundary = dynamicSummary.value.dynamics.boundaryTransitionDarkAudit;
  const accepted = acceptedAudit.value.acceptedTimeline;
  const referenceReplayReceipt = stableHash(baseReplayReceipt(referenceSummary.value));
  const dynamicReplayReceipt = stableHash(baseReplayReceipt(dynamicSummary.value));
  const referenceTraceSha256 = sha256(referenceTraceBytes);
  const dynamicTraceSha256 = sha256(dynamicTraceBytes);

  assert(threshold === 0.6, 'Carrier-003F dark result requires theta=0.6.');
  assert(
    verification.value.requestedThresholdMatchesFrozen === true,
    'Boundary verification did not use the frozen threshold.',
  );
  assert(
    referenceReplayReceipt === dynamicReplayReceipt,
    'Dark instrumentation changed the sealed Carrier-003C replay receipt.',
  );
  assert(
    referenceTraceSha256 === dynamicTraceSha256,
    'Dark instrumentation changed the accepted transition trace.',
  );
  assert(
    referenceTraceSha256 === referenceManifest.value.traceSha256 &&
      dynamicTraceSha256 === dynamicManifest.value.traceSha256,
    'One or more accepted trace hashes did not match their manifests.',
  );
  assert(
    stableHash(dynamicSummary.value) === dynamicManifest.value.summarySha256,
    'Dynamic summary did not match its manifest receipt.',
  );
  assert(
    dynamicSummary.value.neutrality.passed === true &&
      dynamicSummary.value.neutrality.mismatches === 0,
    'Carrier-003C activation-off neutrality failed during the dark replay.',
  );
  assert(
    boundary.activationCoefficient === 0,
    'Boundary feature was not dark during the dynamic replay.',
  );
  assert(
    boundary.candidateDivergentFrontiers === boundary.crossingVsNoCrossingFrontiers,
    'Unexpected form of boundary divergence was observed.',
  );
  assert(boundary.bidirectionalFrontiers === 0, 'A fixed-state frontier was bidirectional.');
  assert(
    (boundary.exitOptionsByStep['1'] ?? 0) ===
      verification.value.candidateControlDensity.frontiersWithExitOption * 2,
    'Step-one exit-option replay did not reproduce the frozen frontier audit.',
  );
  assert(
    boundary.entryOptionsByStep['1'] ===
      verification.value.candidateControlDensity.frontiersWithEntryOption * 2,
    'Step-one entry-option replay did not reproduce the frozen frontier audit.',
  );
  assert(
    boundary.divergentFrontiersByStep['1'] ===
      verification.value.candidateControlDensity.candidateDivergentFrontiers * 2,
    'Step-one divergence replay did not reproduce the frozen frontier audit.',
  );
  assert(
    JSON.stringify(boundary.acceptedDirections) === JSON.stringify(accepted.directions),
    'Dynamic and retrospective accepted-direction counts differ.',
  );
  assert(
    countRecordsEqual(
      boundary.acceptedPersistenceTransitions,
      flattenDirectionMatrix(accepted.persistenceTransitions),
    ),
    'Dynamic and retrospective persistence-transition matrices differ.',
  );
  assert(
    Object.keys(boundary.acceptedInventoryChangedByDirection).length === 0,
    'An accepted boundary transition changed inventory unexpectedly.',
  );
  for (const direction of ['entry', 'none', 'exit']) {
    assert(
      boundary.acceptedInventoryStableByDirection[direction] ===
        accepted.inventoryByDirection[direction].false,
      `Inventory-stable count differed for ${direction}.`,
    );
  }

  const crossingCandidates =
    (boundary.directions.exit ?? 0) + (boundary.directions.entry ?? 0);
  const acceptedCrossings =
    (boundary.acceptedDirections.exit ?? 0) +
    (boundary.acceptedDirections.entry ?? 0);
  const acceptedExitPostRecovery = accepted.postStepTargetRecovery.exit;
  const allAcceptedCrossingsHadPriorQualifyingInventory =
    accepted.qualifyingInventoryChangeSeenBefore.exit.true ===
      boundary.acceptedDirections.exit &&
    accepted.qualifyingInventoryChangeSeenBefore.entry.true ===
      boundary.acceptedDirections.entry;

  const result = {
    schemaVersion: 'emerge-carrier-003f-dark-boundary-dynamic-result-v1',
    experimentId: 'EMERGE-CARRIER-003F-DARK',
    generatedAt: new Date().toISOString(),
    threshold,
    scope: {
      substrate: 'sealed Carrier-003C active trajectories',
      boundaryActivationCoefficient: 0,
      rankingChanged: false,
      acceptanceChanged: false,
      activeBoundaryLawRun: false,
      shamScheduleRun: false,
    },
    integrity: {
      sourceSelectorSha256: dynamicSummary.value.sourceSelectorSha256,
      capsuleSelectorSha256: dynamicSummary.value.capsuleSelectorSha256,
      activationOffComparisons: dynamicSummary.value.neutrality.comparisons,
      activationOffMismatches: dynamicSummary.value.neutrality.mismatches,
      baselineReplayReceiptSha256: referenceReplayReceipt,
      dynamicReplayReceiptSha256: dynamicReplayReceipt,
      baselineReplayExact: referenceReplayReceipt === dynamicReplayReceipt,
      acceptedTraceSha256: dynamicTraceSha256,
      acceptedTraceExact: referenceTraceSha256 === dynamicTraceSha256,
      acceptedProjectionPostStateExactComparisons:
        acceptedAudit.value.integrity.projectionPostStateExactComparisons,
      acceptedProjectionPostStateMismatches:
        acceptedAudit.value.integrity.projectionPostStateMismatches,
      stepOneFrozenAuditReproducedWithTwoFeedbackCells: true,
    },
    algebraExposure: verification.value.algebra,
    initialFrozenFrontier: verification.value.candidateControlDensity,
    dynamicFrontier: {
      frontiers: boundary.frontiers,
      candidates: boundary.candidates,
      directions: boundary.directions,
      crossingCandidates,
      crossingCandidateFraction: crossingCandidates / boundary.candidates,
      candidateDivergentFrontiers: boundary.candidateDivergentFrontiers,
      candidateDivergentFrontierFraction:
        boundary.candidateDivergentFrontiers / boundary.frontiers,
      crossingVsNoCrossingFrontiers: boundary.crossingVsNoCrossingFrontiers,
      bidirectionalFrontiers: boundary.bidirectionalFrontiers,
      frontiersWithExitOption: boundary.frontiersWithExitOption,
      exitOptionFrontierFraction: boundary.frontiersWithExitOption / boundary.frontiers,
      exitOptionsAtStepOne: boundary.exitOptionsByStep['1'] ?? 0,
      exitOptionsAfterStepOne: boundary.exitOptionsAfterStepOne,
      frontiersWithEntryOption: boundary.frontiersWithEntryOption,
      entryOptionFrontierFraction: boundary.frontiersWithEntryOption / boundary.frontiers,
      entryOptionsAtStepOne: boundary.entryOptionsByStep['1'] ?? 0,
      entryOptionsAfterStepOne: boundary.entryOptionsAfterStepOne,
      exitOptionsByStep: boundary.exitOptionsByStep,
      entryOptionsByStep: boundary.entryOptionsByStep,
      divergentFrontiersByStep: boundary.divergentFrontiersByStep,
      selectedDirections: boundary.selectedDirections,
      acceptedDirections: boundary.acceptedDirections,
      selectedCrossingsRejected: boundary.selectedCrossingsRejected,
      dualityRange: boundary.dualityRange,
    },
    acceptedCooccurrence: {
      records: accepted.records,
      acceptedCrossings,
      directions: accepted.directions,
      actions: accepted.actions,
      inventoryByDirection: accepted.inventoryByDirection,
      persistenceTransitions: accepted.persistenceTransitions,
      declarationTransitions: accepted.declarationTransitions,
      qualifyingInventoryChangeSeenBefore:
        accepted.qualifyingInventoryChangeSeenBefore,
      postStepTargetRecovery: accepted.postStepTargetRecovery,
      exitPostStepTargetRecovery: acceptedExitPostRecovery,
      stepOne: accepted.stepOne,
      afterStepOne: accepted.afterStepOne,
      acceptedBoundaryEventReceiptSha256:
        acceptedAudit.value.acceptedBoundaryEventReceiptSha256,
    },
    verdict: {
      laterExitAvailabilityProven: boundary.exitOptionsAfterStepOne > 0,
      candidateControlDensityProven: boundary.candidateDivergentFrontiers > 0,
      acceptedBoundaryEventsChangedInventoryImmediately: false,
      allAcceptedCrossingsHadPriorQualifyingInventoryChange:
        allAcceptedCrossingsHadPriorQualifyingInventory,
      crossingItselfDeclaredObserverState: false,
      exitsAreNotEquivalentToFullStructuralRecovery:
        (acceptedExitPostRecovery['0'] ?? 0) > 0 ||
        (acceptedExitPostRecovery['0.5'] ?? 0) > 0,
      interpretation:
        'The theta=0.6 event channel is dynamically reachable and candidate-divergent. Accepted crossings are inventory-stable swaps, not immediate inventory resets. In undeclared states, exits seed persistence (0->1) and entries reset it (1->0); latched states preserve 2->2. Every accepted crossing occurs after a qualifying inventory change was already remembered, and an exit does not by itself imply full target repair or declare observer state.',
      nextGate:
        'Preregister one fixed active boundary-ranking coefficient and a complete-sham event schedule before testing usefulness.',
    },
    sources: {
      boundaryVerificationSha256: sha256(verification.bytes),
      acceptedCooccurrenceSha256: sha256(acceptedAudit.bytes),
      referenceSummarySha256: sha256(referenceSummary.bytes),
      referenceManifestSha256: sha256(referenceManifest.bytes),
      referenceTraceSha256,
      dynamicSummarySha256: sha256(dynamicSummary.bytes),
      dynamicManifestSha256: sha256(dynamicManifest.bytes),
      dynamicTraceSha256,
    },
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  process.stdout.write(
    `${JSON.stringify(
      {
        outputPath,
        integrity: result.integrity,
        dynamicFrontier: {
          frontiers: result.dynamicFrontier.frontiers,
          candidates: result.dynamicFrontier.candidates,
          candidateDivergentFrontiers:
            result.dynamicFrontier.candidateDivergentFrontiers,
          frontiersWithExitOption: result.dynamicFrontier.frontiersWithExitOption,
          exitOptionsAtStepOne: result.dynamicFrontier.exitOptionsAtStepOne,
          exitOptionsAfterStepOne: result.dynamicFrontier.exitOptionsAfterStepOne,
        },
        acceptedCooccurrence: result.acceptedCooccurrence,
        verdict: result.verdict,
      },
      null,
      2,
    )}\n`,
  );
}

main();
