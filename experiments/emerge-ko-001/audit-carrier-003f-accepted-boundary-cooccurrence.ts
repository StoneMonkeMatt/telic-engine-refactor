import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { classifyDualityBoundaryTransition } from '../../src/logic/dualityProjection';

type BoundaryDirection = 'entry' | 'none' | 'exit';

interface CapsuleSnapshot {
  declaredObserverState: 0 | 1;
  dEma: number;
  persistenceCounter: number;
  qualifyingInventoryChangeSeen: boolean;
}

interface AcceptedTraceRecord {
  pairId: string;
  microstateSource: 'nonEmergent' | 'emergent';
  replicate: number;
  feedback: 0 | 1;
  capsuleId: 'M0-unlatched' | 'M1-latched';
  step: number;
  action: string;
  candidateDema: number;
  targetRecovery: number;
  beforeCapsule: CapsuleSnapshot;
  afterCapsule: CapsuleSnapshot;
}

interface BoundaryVerification {
  requestedThreshold: number;
  frozenThreshold: number;
  requestedThresholdMatchesFrozen: boolean;
  sourceSelectorSha256: string;
  capsuleSelectorSha256: string;
  algebra: {
    comparisons: number;
    directions: Record<string, number>;
  };
}

interface TraceManifest {
  sourceSelectorSha256: string;
  capsuleSelectorSha256: string;
  traceSha256: string;
  traceRecords: number;
}

interface AcceptedBoundaryEvent {
  pairId: string;
  microstateSource: 'nonEmergent' | 'emergent';
  replicate: number;
  feedback: 0 | 1;
  capsuleId: 'M0-unlatched' | 'M1-latched';
  step: number;
  direction: Exclude<BoundaryDirection, 'none'>;
  action: string;
  inventoryChanged: boolean;
  currentDuality: number;
  projectedDuality: number;
  persistenceBefore: number;
  persistenceAfter: number;
  declaredBefore: 0 | 1;
  declaredAfter: 0 | 1;
  qualifyingInventoryChangeSeenBefore: boolean;
  qualifyingInventoryChangeSeenAfter: boolean;
  postStepTargetRecovery: number;
}

function sha256(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function stableHash(value: unknown): string {
  return sha256(JSON.stringify(value));
}

function increment(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
}

function directionKey(direction: -1 | 0 | 1): BoundaryDirection {
  if (direction === -1) return 'entry';
  if (direction === 1) return 'exit';
  return 'none';
}

function inventoryChangedFromAction(action: string): boolean {
  if (action === 'hold' || action === 'swap') return false;
  if (action === 'insert' || action === 'delete' || action === 'combine') return true;
  throw new Error(`Unrecognised accepted action while inferring inventory change: ${action}`);
}

function emptyDirectionMatrix(): Record<BoundaryDirection, Record<string, number>> {
  return { entry: {}, none: {}, exit: {} };
}

function main(): void {
  const verificationPath = resolve(
    process.argv[2] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-boundary-transition-theta-060.json',
  );
  const tracePath = resolve(
    process.argv[3] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-carrier-003c-dark-reference-trace.jsonl.gz',
  );
  const manifestPath = resolve(
    process.argv[4] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-carrier-003c-dark-reference-manifest.json',
  );
  const outputPath = resolve(
    process.argv[5] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-accepted-boundary-cooccurrence.json',
  );

  const verificationBytes = readFileSync(verificationPath);
  const traceBytes = readFileSync(tracePath);
  const manifestBytes = readFileSync(manifestPath);
  const verification = JSON.parse(
    verificationBytes.toString('utf8'),
  ) as BoundaryVerification;
  const manifest = JSON.parse(manifestBytes.toString('utf8')) as TraceManifest;
  const threshold = verification.requestedThreshold;

  if (!verification.requestedThresholdMatchesFrozen || threshold !== 0.6) {
    throw new Error('Accepted co-occurrence audit requires the frozen native threshold theta=0.6.');
  }
  if (manifest.sourceSelectorSha256 !== verification.sourceSelectorSha256) {
    throw new Error('Trace manifest and boundary verification selector receipts differ.');
  }
  if (manifest.capsuleSelectorSha256 !== verification.capsuleSelectorSha256) {
    throw new Error('Trace manifest and boundary verification capsule receipts differ.');
  }
  const observedTraceSha256 = sha256(traceBytes);
  if (observedTraceSha256 !== manifest.traceSha256) {
    throw new Error('Accepted trace SHA-256 does not match its recorded manifest.');
  }

  const traceText = gunzipSync(traceBytes).toString('utf8');
  const records = traceText
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line) as AcceptedTraceRecord);
  if (records.length !== manifest.traceRecords) {
    throw new Error('Accepted trace record count does not match its recorded manifest.');
  }

  const directions: Record<string, number> = {};
  const actions: Record<string, number> = {};
  const inventoryByDirection = emptyDirectionMatrix();
  const persistenceTransitions = emptyDirectionMatrix();
  const declarationTransitions = emptyDirectionMatrix();
  const qualifyingBefore = emptyDirectionMatrix();
  const postStepTargetRecovery = emptyDirectionMatrix();
  const capsules = emptyDirectionMatrix();
  const feedback = emptyDirectionMatrix();
  const microstates = emptyDirectionMatrix();
  const steps = emptyDirectionMatrix();
  const acceptedBoundaryEvents: AcceptedBoundaryEvent[] = [];
  let projectionPostStateExactComparisons = 0;

  for (const record of records) {
    if (record.candidateDema !== record.afterCapsule.dEma) {
      throw new Error('Accepted candidate projection did not reproduce the recorded post-state.');
    }
    projectionPostStateExactComparisons++;
    const direction = directionKey(
      classifyDualityBoundaryTransition(
        record.beforeCapsule.dEma,
        record.afterCapsule.dEma,
        threshold,
      ),
    );
    const inventoryChanged = inventoryChangedFromAction(record.action);
    increment(directions, direction);
    increment(actions, record.action);
    increment(inventoryByDirection[direction], String(inventoryChanged));
    increment(
      persistenceTransitions[direction],
      `${record.beforeCapsule.persistenceCounter}->${record.afterCapsule.persistenceCounter}`,
    );
    increment(
      declarationTransitions[direction],
      `${record.beforeCapsule.declaredObserverState}->${record.afterCapsule.declaredObserverState}`,
    );
    increment(
      qualifyingBefore[direction],
      String(record.beforeCapsule.qualifyingInventoryChangeSeen),
    );
    increment(postStepTargetRecovery[direction], String(record.targetRecovery));
    increment(capsules[direction], record.capsuleId);
    increment(feedback[direction], String(record.feedback));
    increment(microstates[direction], record.microstateSource);
    increment(steps[direction], String(record.step));

    if (direction !== 'none') {
      acceptedBoundaryEvents.push({
        pairId: record.pairId,
        microstateSource: record.microstateSource,
        replicate: record.replicate,
        feedback: record.feedback,
        capsuleId: record.capsuleId,
        step: record.step,
        direction,
        action: record.action,
        inventoryChanged,
        currentDuality: record.beforeCapsule.dEma,
        projectedDuality: record.afterCapsule.dEma,
        persistenceBefore: record.beforeCapsule.persistenceCounter,
        persistenceAfter: record.afterCapsule.persistenceCounter,
        declaredBefore: record.beforeCapsule.declaredObserverState,
        declaredAfter: record.afterCapsule.declaredObserverState,
        qualifyingInventoryChangeSeenBefore:
          record.beforeCapsule.qualifyingInventoryChangeSeen,
        qualifyingInventoryChangeSeenAfter:
          record.afterCapsule.qualifyingInventoryChangeSeen,
        postStepTargetRecovery: record.targetRecovery,
      });
    }
  }

  const result = {
    schemaVersion: 'emerge-carrier-003f-accepted-boundary-cooccurrence-v1',
    experimentId: 'EMERGE-CARRIER-003F-DARK',
    generatedAt: new Date().toISOString(),
    threshold,
    sources: {
      verificationSha256: sha256(verificationBytes),
      traceSha256: observedTraceSha256,
      manifestSha256: sha256(manifestBytes),
      sourceSelectorSha256: verification.sourceSelectorSha256,
      capsuleSelectorSha256: verification.capsuleSelectorSha256,
    },
    claimBoundary: {
      algebraExposureComparisons: verification.algebra.comparisons,
      algebraExposureDirections: verification.algebra.directions,
      acceptedTimelineRecords: records.length,
      note:
        'Algebra exposures are not accepted timeline events and have no row-wise temporal join. This receipt independently classifies every accepted Carrier-003C transition at the same frozen threshold.',
    },
    integrity: {
      traceManifestVerified: true,
      traceRecordCountVerified: true,
      projectionPostStateExactComparisons,
      projectionPostStateMismatches: 0,
    },
    acceptedTimeline: {
      records: records.length,
      directions,
      actions,
      inventoryByDirection,
      persistenceTransitions,
      declarationTransitions,
      qualifyingInventoryChangeSeenBefore: qualifyingBefore,
      postStepTargetRecovery,
      capsules,
      feedback,
      microstates,
      steps,
      stepOne: {
        entry: acceptedBoundaryEvents.filter(
          event => event.direction === 'entry' && event.step === 1,
        ).length,
        exit: acceptedBoundaryEvents.filter(
          event => event.direction === 'exit' && event.step === 1,
        ).length,
      },
      afterStepOne: {
        entry: acceptedBoundaryEvents.filter(
          event => event.direction === 'entry' && event.step > 1,
        ).length,
        exit: acceptedBoundaryEvents.filter(
          event => event.direction === 'exit' && event.step > 1,
        ).length,
      },
    },
    acceptedBoundaryEventReceiptSha256: stableHash(acceptedBoundaryEvents),
    acceptedBoundaryEvents,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  process.stdout.write(
    `${JSON.stringify(
      {
        outputPath,
        threshold,
        integrity: result.integrity,
        directions,
        inventoryByDirection,
        persistenceTransitions,
        stepOne: result.acceptedTimeline.stepOne,
        afterStepOne: result.acceptedTimeline.afterStepOne,
        acceptedBoundaryEventReceiptSha256:
          result.acceptedBoundaryEventReceiptSha256,
      },
      null,
      2,
    )}\n`,
  );
}

main();
