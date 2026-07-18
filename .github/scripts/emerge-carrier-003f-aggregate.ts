import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type JsonObject = Record<string, any>;

const METRICS = [
  'deltaRealMinusShamZ0',
  'deltaRealMinusShamZ1',
  'boundaryFeedbackInteraction',
  'stateSpecificBoundaryZ0',
  'stateSpecificBoundaryZ1',
  'stateBoundaryFeedbackInteraction',
] as const;

type Metric = (typeof METRICS)[number];

function sha256(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function stableHash(value: unknown): string {
  return sha256(JSON.stringify(value));
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
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

function interval(values: number[]): JsonObject {
  const center = mean(values);
  const standardError =
    sampleStandardDeviation(values) / Math.sqrt(Math.max(values.length, 1));
  const degreesOfFreedom = Math.max(values.length - 1, 0);
  const critical = tCritical95(degreesOfFreedom);
  return {
    mean: center,
    standardError,
    degreesOfFreedom,
    interval95: [
      center - critical * standardError,
      center + critical * standardError,
    ],
  };
}

function countSigns(values: number[]): JsonObject {
  return {
    positive: values.filter(value => value > 0).length,
    zero: values.filter(value => value === 0).length,
    negative: values.filter(value => value < 0).length,
  };
}

function main(): void {
  const resultsDirectory = resolve(
    process.argv[2] ?? 'experiments/emerge-ko-001/results',
  );
  const outputPath = resolve(
    process.argv[3] ??
      `${resultsDirectory}/EMERGE-CARRIER-003F-complete-sham-result.json`,
  );
  const manifestPath = resolve(
    process.argv[4] ??
      `${resultsDirectory}/EMERGE-CARRIER-003F-complete-sham-manifest.json`,
  );
  const schedule7ReferencePath = resolve(
    process.argv[5] ??
      `${resultsDirectory}/EMERGE-CARRIER-003F-schedule-07-reference-summary.json`,
  );
  const preregistrationPath = resolve(
    process.argv[6] ??
      'docs/EMERGE-CARRIER-003F-PREREGISTRATION-18JUL2026.md',
  );
  const runnerPath = resolve(
    process.argv[7] ??
      'experiments/emerge-ko-001/run-carrier-003f.active.generated.ts',
  );

  const schedules: JsonObject[] = [];
  const scheduleFileReceipts: JsonObject[] = [];
  for (let rotation = 1; rotation <= 14; rotation++) {
    const padded = String(rotation).padStart(2, '0');
    const summaryPath = resolve(
      resultsDirectory,
      `EMERGE-CARRIER-003F-schedule-${padded}-summary.json`,
    );
    const scheduleManifestPath = resolve(
      resultsDirectory,
      `EMERGE-CARRIER-003F-schedule-${padded}-manifest.json`,
    );
    const tracePath = resolve(
      resultsDirectory,
      `EMERGE-CARRIER-003F-schedule-${padded}-trace.jsonl.gz`,
    );
    const summaryBytes = readFileSync(summaryPath);
    const manifestBytes = readFileSync(scheduleManifestPath);
    const traceBytes = readFileSync(tracePath);
    const summary = JSON.parse(summaryBytes.toString('utf8')) as JsonObject;
    const scheduleManifest = JSON.parse(
      manifestBytes.toString('utf8'),
    ) as JsonObject;
    assert(
      summary.experimentId === 'EMERGE-CARRIER-003F' &&
        summary.needle.rotation === rotation,
      `Carrier-003F schedule ${rotation} identity drifted.`,
    );
    assert(
      stableHash(summary) === scheduleManifest.summarySha256,
      `Carrier-003F schedule ${rotation} summary receipt failed.`,
    );
    assert(
      sha256(traceBytes) === scheduleManifest.traceSha256,
      `Carrier-003F schedule ${rotation} trace receipt failed.`,
    );
    assert(
      summary.neutrality.passed === true && summary.neutrality.mismatches === 0,
      `Carrier-003F schedule ${rotation} Carrier-001 neutrality failed.`,
    );
    assert(
      summary.needle.carrier003cReference.passed === true &&
        summary.needle.carrier003cReference.mismatches === 0,
      `Carrier-003F schedule ${rotation} Carrier-003C reproduction failed.`,
    );
    assert(
      summary.needle.shamIntegrity.exactExposurePreserved === true &&
        summary.needle.shamIntegrity.perFrontierMultisetMismatches === 0,
      `Carrier-003F schedule ${rotation} sham exposure failed.`,
    );
    assert(
      summary.needle.shamIntegrity.candidateAssignmentsChanged > 0,
      `Carrier-003F schedule ${rotation} did not change any candidate assignment.`,
    );
    assert(
      summary.needle.boundaryReachabilityMet === true,
      `Carrier-003F schedule ${rotation} boundary reachability failed.`,
    );
    assert(
      summary.needle.assignmentMechanismMet === true,
      `Carrier-003F schedule ${rotation} assignment mechanism was silent.`,
    );
    schedules.push(summary.needle);
    scheduleFileReceipts.push({
      rotation,
      summarySha256: sha256(summaryBytes),
      manifestSha256: sha256(manifestBytes),
      traceSha256: sha256(traceBytes),
    });
  }

  const schedule7ReferenceBytes = readFileSync(schedule7ReferencePath);
  const schedule7Reference = JSON.parse(
    schedule7ReferenceBytes.toString('utf8'),
  ) as JsonObject;
  const schedule7 = schedules.find(schedule => schedule.rotation === 7)!;
  assert(
    stableHash(schedule7Reference.needle) === stableHash(schedule7),
    'Carrier-003F schedule 7 did not reproduce its independent reference.',
  );

  const preregistrationSha256 = sha256(readFileSync(preregistrationPath));
  const runnerSha256 = sha256(readFileSync(runnerPath));
  assert(
    preregistrationSha256 ===
      '596718bb1c23c8d1cd9aeeee999565f7c2a487de09496b02941665322c6ee515',
    'Carrier-003F preregistration drifted before aggregation.',
  );
  assert(
    runnerSha256 ===
      '936310ac26f75510095c9f2a000a3e34ce2ba132f9fc51de2fbfe56537767d6b',
    'Carrier-003F generated runner drifted before aggregation.',
  );

  const trueProjectionReceipts = new Set(
    schedules.map(schedule => schedule.trueProjectionReceiptSha256),
  );
  const trueAssignmentReceipts = new Set(
    schedules.map(schedule => schedule.trueAssignmentReceiptSha256),
  );
  const shamProjectionReceipts = new Set(
    schedules.map(schedule => schedule.shamProjectionReceiptSha256),
  );
  const shamAssignmentReceipts = new Set(
    schedules.map(schedule => schedule.shamAssignmentReceiptSha256),
  );
  assert(trueProjectionReceipts.size === 1, 'True projection receipts drifted.');
  assert(trueAssignmentReceipts.size === 1, 'True assignment receipts drifted.');
  assert(
    shamAssignmentReceipts.size === 14,
    'The fourteen sham assignment receipts were not distinct.',
  );

  const referenceReachabilityReceipt = stableHash(schedules[0].reachability);
  assert(
    schedules.every(
      schedule => stableHash(schedule.reachability) === referenceReachabilityReceipt,
    ),
    'The true-law reachability receipt drifted across schedules.',
  );

  const pairIds = schedules[0].pairEffects.map((pair: JsonObject) => pair.pairId);
  const pairEnsembleEffects = pairIds.map((pairId: string) => {
    const result: JsonObject = { pairId };
    for (const metric of METRICS) {
      result[metric] = mean(
        schedules.map(schedule => {
          const pair = schedule.pairEffects.find(
            (entry: JsonObject) => entry.pairId === pairId,
          );
          assert(pair !== undefined, `Missing ${pairId} in schedule pair effects.`);
          return pair[metric];
        }),
      );
    }
    return result;
  });

  const ensemble: JsonObject = {};
  for (const metric of METRICS) {
    ensemble[metric] = interval(
      pairEnsembleEffects.map(pair => pair[metric] as number),
    );
  }

  const rotationSpecific = schedules.map(schedule => ({
    rotation: schedule.rotation,
    estimators: schedule.estimators,
    primaryInterval95: schedule.uncertainty.deltaRealMinusShamZ1.interval95,
    reachability: schedule.reachability,
    assignmentMechanism: schedule.assignmentMechanism,
    shamIntegrity: schedule.shamIntegrity,
    trueProjectionReceiptSha256: schedule.trueProjectionReceiptSha256,
    trueAssignmentReceiptSha256: schedule.trueAssignmentReceiptSha256,
    shamProjectionReceiptSha256: schedule.shamProjectionReceiptSha256,
    shamAssignmentReceiptSha256: schedule.shamAssignmentReceiptSha256,
  }));

  const primary = ensemble.deltaRealMinusShamZ1;
  const positiveUsefulnessEstablished =
    primary.mean > 0 && primary.interval95[0] > 0;
  const negativeUsefulnessEstablished =
    primary.mean < 0 && primary.interval95[1] < 0;
  const primaryRotationValues = schedules.map(
    schedule => schedule.estimators.deltaRealMinusShamZ1 as number,
  );
  const primaryRotationIntervals = schedules.map(
    schedule => schedule.uncertainty.deltaRealMinusShamZ1.interval95 as number[],
  );
  const assignmentMechanismTotals = {
    changedWinnerSteps: schedules.reduce(
      (sum, schedule) => sum + schedule.assignmentMechanism.changedWinnerSteps,
      0,
    ),
    changedAdmissionSteps: schedules.reduce(
      (sum, schedule) => sum + schedule.assignmentMechanism.changedAdmissionSteps,
      0,
    ),
    acceptedAssignmentInducedActions: schedules.reduce(
      (sum, schedule) =>
        sum + schedule.assignmentMechanism.acceptedAssignmentInducedActions,
      0,
    ),
    stateDivergenceCount: schedules.reduce(
      (sum, schedule) => sum + schedule.assignmentMechanism.stateDivergenceCount,
      0,
    ),
    reconvergenceEvents: schedules.reduce(
      (sum, schedule) => sum + schedule.assignmentMechanism.reconvergenceEvents,
      0,
    ),
  };
  const shamIntegrityTotals = {
    perFrontierMultisetComparisons: schedules.reduce(
      (sum, schedule) =>
        sum + schedule.shamIntegrity.perFrontierMultisetComparisons,
      0,
    ),
    perFrontierMultisetMismatches: schedules.reduce(
      (sum, schedule) =>
        sum + schedule.shamIntegrity.perFrontierMultisetMismatches,
      0,
    ),
    candidateAssignmentsChanged: schedules.reduce(
      (sum, schedule) => sum + schedule.shamIntegrity.candidateAssignmentsChanged,
      0,
    ),
  };

  const result = {
    schemaVersion: 'emerge-carrier-003f-complete-sham-result-v1',
    experimentId: 'EMERGE-CARRIER-003F',
    generatedAt: new Date().toISOString(),
    preregistration: {
      threshold: 0.6,
      boundaryCoefficient: 0.01,
      shamSchedules: 14,
      shamSalts: Array.from({ length: 14 }, (_, index) =>
        String(index + 1).padStart(2, '0'),
      ),
      primaryEstimand:
        'Within each matched pair under Z=1, true native candidate assignment minus mean recovery across all fourteen geometry-safe equal-exposure sham assignments.',
      positiveUsefulnessCriterion:
        'Positive point estimate and two-sided 95% interval entirely above zero across eight matched-pair ensemble effects.',
      preregistrationSha256,
      preOutcomeLedgerSha256: schedules[0].preOutcomeLedgerSha256,
      runnerSha256,
    },
    scale: {
      matchedPairs: 8,
      schedules: 14,
      needleBranchRuns: 14 * 4096,
      realNeedleBranchRuns: 14 * 2048,
      shamNeedleBranchRuns: 14 * 2048,
      carrier001NeutralityComparisons: 14 * 2048,
      carrier003cReferenceComparisons: 14 * 2048,
    },
    integrity: {
      allScheduleProcessesCompleted: true,
      allCarrier001NeutralityPassed: true,
      allCarrier003cReferencesPassed: true,
      allPerFrontierShamMultisetsExact:
        shamIntegrityTotals.perFrontierMultisetMismatches === 0,
      shamIntegrityTotals,
      trueProjectionReceiptCount: trueProjectionReceipts.size,
      trueAssignmentReceiptCount: trueAssignmentReceipts.size,
      distinctShamProjectionReceiptCount: shamProjectionReceipts.size,
      distinctShamAssignmentReceiptCount: shamAssignmentReceipts.size,
      allFourteenAssignmentReceiptsDistinct: shamAssignmentReceipts.size === 14,
      schedule7IndependentReplication: {
        passed: true,
        referenceNeedleReceiptSha256: stableHash(schedule7Reference.needle),
        sweepNeedleReceiptSha256: stableHash(schedule7),
        referenceSummarySha256: sha256(schedule7ReferenceBytes),
      },
      allTrueReachabilityReceiptsExact: true,
      allSchedulesMechanisticallyActive: schedules.every(
        schedule => schedule.assignmentMechanismMet === true,
      ),
    },
    fixedTrueLawReachability: schedules[0].reachability,
    assignmentMechanismTotals,
    rotationSpecific,
    primaryRotationSigns: countSigns(primaryRotationValues),
    primaryRotationIntervals: {
      entirelyAboveZero: primaryRotationIntervals.filter(interval95 => interval95[0] > 0)
        .length,
      crossZero: primaryRotationIntervals.filter(
        interval95 => interval95[0] <= 0 && interval95[1] >= 0,
      ).length,
      entirelyBelowZero: primaryRotationIntervals.filter(interval95 => interval95[1] < 0)
        .length,
    },
    pairEnsembleEffects,
    ensemble,
    primary: {
      metric: 'deltaRealMinusShamZ1',
      ...primary,
      positiveUsefulnessEstablished,
      negativeUsefulnessEstablished,
    },
    verdict: positiveUsefulnessEstablished
      ? 'The true native boundary assignment established positive pair-generalised repair usefulness against the complete geometry-safe equal-exposure sham family. Carrier-004 held-out generalisation is admissible for the fixed law.'
      : negativeUsefulnessEstablished
        ? 'The true native boundary assignment produced lower pair-generalised repair than the complete sham family. Positive usefulness closes for the fixed w_b=0.01 law.'
        : 'The native boundary law and candidate assignment are mechanistically active, but the complete-ensemble eight-pair interval crosses zero. Positive usefulness is not established; no retrospective coefficient rescue is permitted.',
    nextExperiment: positiveUsefulnessEstablished
      ? 'EMERGE-CARRIER-004: preregister held-out generalisation of the fixed native boundary law.'
      : 'Carrier-004 remains gated. Audit a different model-native state-transition family without tuning Carrier-003F retrospectively.',
    scheduleFileReceipts,
  };

  const resultText = `${JSON.stringify(result, null, 2)}\n`;
  const resultSha256 = sha256(resultText);
  const manifest = {
    schemaVersion: 'emerge-carrier-003f-complete-sham-manifest-v1',
    experimentId: result.experimentId,
    generatedAt: new Date().toISOString(),
    resultSha256,
    preregistrationSha256,
    runnerSha256,
    sourceSelectorSha256: schedules[0].carrier003cReference
      ? '4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790'
      : null,
    schedule7ReplicationPassed: true,
    allShamExposuresExact: result.integrity.allPerFrontierShamMultisetsExact,
    allSchedulesMechanisticallyActive:
      result.integrity.allSchedulesMechanisticallyActive,
    allFourteenAssignmentReceiptsDistinct:
      result.integrity.allFourteenAssignmentReceiptsDistinct,
    positiveUsefulnessEstablished,
  };

  writeFileSync(outputPath, resultText, 'utf8');
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  process.stdout.write(
    `${JSON.stringify(
      {
        outputPath,
        manifestPath,
        resultSha256,
        integrity: result.integrity,
        fixedTrueLawReachability: result.fixedTrueLawReachability,
        assignmentMechanismTotals,
        primaryRotationSigns: result.primaryRotationSigns,
        primaryRotationIntervals: result.primaryRotationIntervals,
        pairEnsembleEffects,
        ensemble,
        primary: result.primary,
        verdict: result.verdict,
        nextExperiment: result.nextExperiment,
      },
      null,
      2,
    )}\n`,
  );
}

main();
