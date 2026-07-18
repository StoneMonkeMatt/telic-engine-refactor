import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SOURCE_SHA256 =
  'b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a';

function replaceExactly(source: string, needle: string, replacement: string): string {
  const first = source.indexOf(needle);
  if (first === -1) throw new Error(`Assembly needle not found:\n${needle}`);
  if (source.indexOf(needle, first + needle.length) !== -1) {
    throw new Error(`Assembly needle was not unique:\n${needle}`);
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
      'experiments/emerge-ko-001/run-carrier-003f.dark-dynamic.generated.ts',
  );
  let source = readFileSync(sourcePath, 'utf8');
  const sourceSha256 = createHash('sha256').update(source).digest('hex');
  if (sourceSha256 !== SOURCE_SHA256) {
    throw new Error(`Carrier-003C source drift: ${sourceSha256}`);
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
  boundaryThreshold: number;
  boundaryFrontiers: number;
  boundaryCandidates: number;
  boundaryDirections: Record<string, number>;
  boundaryCandidateDivergentFrontiers: number;
  boundaryCrossingVsNoCrossingFrontiers: number;
  boundaryBidirectionalFrontiers: number;
  boundaryFrontiersWithExitOption: number;
  boundaryFrontiersWithEntryOption: number;
  boundaryExitOptionsAfterStepOne: number;
  boundaryEntryOptionsAfterStepOne: number;
  boundaryExitOptionsByStep: Record<string, number>;
  boundaryEntryOptionsByStep: Record<string, number>;
  boundaryDivergentFrontiersByStep: Record<string, number>;
  boundarySelectedDirections: Record<string, number>;
  boundaryAcceptedDirections: Record<string, number>;
  boundaryAcceptedInventoryChangedByDirection: Record<string, number>;
  boundaryAcceptedInventoryStableByDirection: Record<string, number>;
  boundaryAcceptedPersistenceTransitions: Record<string, number>;
  boundaryAcceptedDeclarationTransitions: Record<string, number>;
  boundaryAcceptedQualifyingBefore: Record<string, number>;
  boundaryMinimumCurrentDuality: number;
  boundaryMaximumCurrentDuality: number;
  boundaryMinimumProjectedDuality: number;
  boundaryMaximumProjectedDuality: number;
  finalCapsule: CapsuleState;
}`,
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
  boundaryDirection: -1 | 0 | 1;
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

function boundaryDirectionKey(direction: -1 | 0 | 1): 'entry' | 'none' | 'exit' {
  if (direction === -1) return 'entry';
  if (direction === 1) return 'exit';
  return 'none';
}`,
  );

  source = replaceExactly(
    source,
    `  const acceptedTrace: Record<string, unknown>[] = [];

  if (multisetRecall(targets, bridgeSignatures(codex, current)) !== 0) {`,
    `  const acceptedTrace: Record<string, unknown>[] = [];
  let boundaryFrontiers = 0;
  let boundaryCandidates = 0;
  const boundaryDirections: Record<string, number> = {};
  let boundaryCandidateDivergentFrontiers = 0;
  let boundaryCrossingVsNoCrossingFrontiers = 0;
  let boundaryBidirectionalFrontiers = 0;
  let boundaryFrontiersWithExitOption = 0;
  let boundaryFrontiersWithEntryOption = 0;
  let boundaryExitOptionsAfterStepOne = 0;
  let boundaryEntryOptionsAfterStepOne = 0;
  const boundaryExitOptionsByStep: Record<string, number> = {};
  const boundaryEntryOptionsByStep: Record<string, number> = {};
  const boundaryDivergentFrontiersByStep: Record<string, number> = {};
  const boundarySelectedDirections: Record<string, number> = {};
  const boundaryAcceptedDirections: Record<string, number> = {};
  const boundaryAcceptedInventoryChangedByDirection: Record<string, number> = {};
  const boundaryAcceptedInventoryStableByDirection: Record<string, number> = {};
  const boundaryAcceptedPersistenceTransitions: Record<string, number> = {};
  const boundaryAcceptedDeclarationTransitions: Record<string, number> = {};
  const boundaryAcceptedQualifyingBefore: Record<string, number> = {};
  let boundaryMinimumCurrentDuality = Number.POSITIVE_INFINITY;
  let boundaryMaximumCurrentDuality = Number.NEGATIVE_INFINITY;
  let boundaryMinimumProjectedDuality = Number.POSITIVE_INFINITY;
  let boundaryMaximumProjectedDuality = Number.NEGATIVE_INFINITY;

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
        boundaryDirection: classifyDualityBoundaryTransition(
          capsuleState.dEma,
          candidateDema,
          config.theta,
        ),
      };
    });

    boundaryFrontiers++;
    boundaryCandidates += carrierRanked.length;
    boundaryMinimumCurrentDuality = Math.min(
      boundaryMinimumCurrentDuality,
      capsuleState.dEma,
    );
    boundaryMaximumCurrentDuality = Math.max(
      boundaryMaximumCurrentDuality,
      capsuleState.dEma,
    );
    for (const candidate of carrierRanked) {
      increment(boundaryDirections, boundaryDirectionKey(candidate.boundaryDirection));
      boundaryMinimumProjectedDuality = Math.min(
        boundaryMinimumProjectedDuality,
        candidate.candidateDema,
      );
      boundaryMaximumProjectedDuality = Math.max(
        boundaryMaximumProjectedDuality,
        candidate.candidateDema,
      );
    }
    const boundaryDirectionSet = new Set(
      carrierRanked.map(candidate => candidate.boundaryDirection),
    );
    const boundaryHasEntry = boundaryDirectionSet.has(-1);
    const boundaryHasNoCrossing = boundaryDirectionSet.has(0);
    const boundaryHasExit = boundaryDirectionSet.has(1);
    if (boundaryDirectionSet.size > 1) {
      boundaryCandidateDivergentFrontiers++;
      increment(boundaryDivergentFrontiersByStep, String(step));
    }
    if (boundaryHasNoCrossing && (boundaryHasEntry || boundaryHasExit)) {
      boundaryCrossingVsNoCrossingFrontiers++;
    }
    if (boundaryHasEntry && boundaryHasExit) boundaryBidirectionalFrontiers++;
    if (boundaryHasExit) {
      boundaryFrontiersWithExitOption++;
      increment(boundaryExitOptionsByStep, String(step));
      if (step > 1) boundaryExitOptionsAfterStepOne++;
    }
    if (boundaryHasEntry) {
      boundaryFrontiersWithEntryOption++;
      increment(boundaryEntryOptionsByStep, String(step));
      if (step > 1) boundaryEntryOptionsAfterStepOne++;
    }

    const augmentFeedback`,
  );

  source = replaceExactly(
    source,
    `      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
    })) as CarrierCandidate[];`,
    `      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
      boundaryDirection: 0,
    })) as CarrierCandidate[];`,
  );

  source = replaceExactly(
    source,
    `    if (selection.selected.sequence.join('|') !== exactWinner.sequence.join('|')) {
      throw new Error('Exact tie-resolved winner disagreed with selector output.');
    }

    if (selection.accepted) {`,
    `    if (selection.selected.sequence.join('|') !== exactWinner.sequence.join('|')) {
      throw new Error('Exact tie-resolved winner disagreed with selector output.');
    }

    const selectedBoundaryCandidate = selection.selected as CarrierCandidate;
    const selectedBoundaryDirection = boundaryDirectionKey(
      selectedBoundaryCandidate.boundaryDirection,
    );
    const selectedPersistenceBefore = capsuleState.persistenceCounter;
    const selectedDeclarationBefore = capsuleState.declaredObserverState;
    const selectedQualifyingBefore = capsuleState.qualifyingInventoryChangeSeen;
    increment(boundarySelectedDirections, selectedBoundaryDirection);

    if (selection.accepted) {`,
  );

  source = replaceExactly(
    source,
    `      capsuleState = updateCapsule(
        capsuleState,
        current,
        inventoryChanged,
        config,
        historyWindow,
        telos,
      );

      if (active === 1) {`,
    `      capsuleState = updateCapsule(
        capsuleState,
        current,
        inventoryChanged,
        config,
        historyWindow,
        telos,
      );
      increment(boundaryAcceptedDirections, selectedBoundaryDirection);
      increment(
        inventoryChanged
          ? boundaryAcceptedInventoryChangedByDirection
          : boundaryAcceptedInventoryStableByDirection,
        selectedBoundaryDirection,
      );
      increment(
        boundaryAcceptedPersistenceTransitions,
        \`${'${selectedBoundaryDirection}'}:${'${selectedPersistenceBefore}'}->${'${capsuleState.persistenceCounter}'}\`,
      );
      increment(
        boundaryAcceptedDeclarationTransitions,
        \`${'${selectedBoundaryDirection}'}:${'${selectedDeclarationBefore}'}->${'${capsuleState.declaredObserverState}'}\`,
      );
      increment(
        boundaryAcceptedQualifyingBefore,
        \`${'${selectedBoundaryDirection}'}:${'${selectedQualifyingBefore}'}\`,
      );

      if (active === 1) {`,
  );

  source = replaceExactly(
    source,
    `      maxAbsCarrierAdjustment,
      acceptedTransitions: acceptedSteps,
      finalCapsule: capsuleState,`,
    `      maxAbsCarrierAdjustment,
      acceptedTransitions: acceptedSteps,
      boundaryThreshold: config.theta,
      boundaryFrontiers,
      boundaryCandidates,
      boundaryDirections,
      boundaryCandidateDivergentFrontiers,
      boundaryCrossingVsNoCrossingFrontiers,
      boundaryBidirectionalFrontiers,
      boundaryFrontiersWithExitOption,
      boundaryFrontiersWithEntryOption,
      boundaryExitOptionsAfterStepOne,
      boundaryEntryOptionsAfterStepOne,
      boundaryExitOptionsByStep,
      boundaryEntryOptionsByStep,
      boundaryDivergentFrontiersByStep,
      boundarySelectedDirections,
      boundaryAcceptedDirections,
      boundaryAcceptedInventoryChangedByDirection,
      boundaryAcceptedInventoryStableByDirection,
      boundaryAcceptedPersistenceTransitions,
      boundaryAcceptedDeclarationTransitions,
      boundaryAcceptedQualifyingBefore,
      boundaryMinimumCurrentDuality,
      boundaryMaximumCurrentDuality,
      boundaryMinimumProjectedDuality,
      boundaryMaximumProjectedDuality,
      finalCapsule: capsuleState,`,
  );

  source = replaceExactly(
    source,
    `  let carrierAdjustedCandidates = 0;
  let maxAbsCarrierAdjustment = 0;
  for (const branch of activeBranches) {`,
    `  let carrierAdjustedCandidates = 0;
  let maxAbsCarrierAdjustment = 0;
  let boundaryFrontiers = 0;
  let boundaryCandidates = 0;
  const boundaryDirections: Record<string, number> = {};
  let boundaryCandidateDivergentFrontiers = 0;
  let boundaryCrossingVsNoCrossingFrontiers = 0;
  let boundaryBidirectionalFrontiers = 0;
  let boundaryFrontiersWithExitOption = 0;
  let boundaryFrontiersWithEntryOption = 0;
  let boundaryExitOptionsAfterStepOne = 0;
  let boundaryEntryOptionsAfterStepOne = 0;
  const boundaryExitOptionsByStep: Record<string, number> = {};
  const boundaryEntryOptionsByStep: Record<string, number> = {};
  const boundaryDivergentFrontiersByStep: Record<string, number> = {};
  const boundarySelectedDirections: Record<string, number> = {};
  const boundaryAcceptedDirections: Record<string, number> = {};
  const boundaryAcceptedInventoryChangedByDirection: Record<string, number> = {};
  const boundaryAcceptedInventoryStableByDirection: Record<string, number> = {};
  const boundaryAcceptedPersistenceTransitions: Record<string, number> = {};
  const boundaryAcceptedDeclarationTransitions: Record<string, number> = {};
  const boundaryAcceptedQualifyingBefore: Record<string, number> = {};
  let boundaryMinimumCurrentDuality = Number.POSITIVE_INFINITY;
  let boundaryMaximumCurrentDuality = Number.NEGATIVE_INFINITY;
  let boundaryMinimumProjectedDuality = Number.POSITIVE_INFINITY;
  let boundaryMaximumProjectedDuality = Number.NEGATIVE_INFINITY;
  for (const branch of activeBranches) {`,
  );

  source = replaceExactly(
    source,
    `    maxAbsCarrierAdjustment = Math.max(
      maxAbsCarrierAdjustment,
      branch.diagnostics.maxAbsCarrierAdjustment,
    );
  }

  const changedWinnerSteps`,
    `    maxAbsCarrierAdjustment = Math.max(
      maxAbsCarrierAdjustment,
      branch.diagnostics.maxAbsCarrierAdjustment,
    );
    boundaryFrontiers += branch.diagnostics.boundaryFrontiers;
    boundaryCandidates += branch.diagnostics.boundaryCandidates;
    mergeCounts(boundaryDirections, branch.diagnostics.boundaryDirections);
    boundaryCandidateDivergentFrontiers +=
      branch.diagnostics.boundaryCandidateDivergentFrontiers;
    boundaryCrossingVsNoCrossingFrontiers +=
      branch.diagnostics.boundaryCrossingVsNoCrossingFrontiers;
    boundaryBidirectionalFrontiers += branch.diagnostics.boundaryBidirectionalFrontiers;
    boundaryFrontiersWithExitOption +=
      branch.diagnostics.boundaryFrontiersWithExitOption;
    boundaryFrontiersWithEntryOption +=
      branch.diagnostics.boundaryFrontiersWithEntryOption;
    boundaryExitOptionsAfterStepOne += branch.diagnostics.boundaryExitOptionsAfterStepOne;
    boundaryEntryOptionsAfterStepOne += branch.diagnostics.boundaryEntryOptionsAfterStepOne;
    mergeCounts(boundaryExitOptionsByStep, branch.diagnostics.boundaryExitOptionsByStep);
    mergeCounts(boundaryEntryOptionsByStep, branch.diagnostics.boundaryEntryOptionsByStep);
    mergeCounts(
      boundaryDivergentFrontiersByStep,
      branch.diagnostics.boundaryDivergentFrontiersByStep,
    );
    mergeCounts(boundarySelectedDirections, branch.diagnostics.boundarySelectedDirections);
    mergeCounts(boundaryAcceptedDirections, branch.diagnostics.boundaryAcceptedDirections);
    mergeCounts(
      boundaryAcceptedInventoryChangedByDirection,
      branch.diagnostics.boundaryAcceptedInventoryChangedByDirection,
    );
    mergeCounts(
      boundaryAcceptedInventoryStableByDirection,
      branch.diagnostics.boundaryAcceptedInventoryStableByDirection,
    );
    mergeCounts(
      boundaryAcceptedPersistenceTransitions,
      branch.diagnostics.boundaryAcceptedPersistenceTransitions,
    );
    mergeCounts(
      boundaryAcceptedDeclarationTransitions,
      branch.diagnostics.boundaryAcceptedDeclarationTransitions,
    );
    mergeCounts(
      boundaryAcceptedQualifyingBefore,
      branch.diagnostics.boundaryAcceptedQualifyingBefore,
    );
    boundaryMinimumCurrentDuality = Math.min(
      boundaryMinimumCurrentDuality,
      branch.diagnostics.boundaryMinimumCurrentDuality,
    );
    boundaryMaximumCurrentDuality = Math.max(
      boundaryMaximumCurrentDuality,
      branch.diagnostics.boundaryMaximumCurrentDuality,
    );
    boundaryMinimumProjectedDuality = Math.min(
      boundaryMinimumProjectedDuality,
      branch.diagnostics.boundaryMinimumProjectedDuality,
    );
    boundaryMaximumProjectedDuality = Math.max(
      boundaryMaximumProjectedDuality,
      branch.diagnostics.boundaryMaximumProjectedDuality,
    );
  }

  const changedWinnerSteps`,
  );

  source = replaceExactly(
    source,
    `      mechanisticEndpointMet,
    },
    interpretation,`,
    `      mechanisticEndpointMet,
      boundaryTransitionDarkAudit: {
        threshold: config.theta,
        activationCoefficient: 0,
        frontiers: boundaryFrontiers,
        candidates: boundaryCandidates,
        directions: boundaryDirections,
        candidateDivergentFrontiers: boundaryCandidateDivergentFrontiers,
        crossingVsNoCrossingFrontiers: boundaryCrossingVsNoCrossingFrontiers,
        bidirectionalFrontiers: boundaryBidirectionalFrontiers,
        frontiersWithExitOption: boundaryFrontiersWithExitOption,
        frontiersWithEntryOption: boundaryFrontiersWithEntryOption,
        exitOptionsAfterStepOne: boundaryExitOptionsAfterStepOne,
        entryOptionsAfterStepOne: boundaryEntryOptionsAfterStepOne,
        exitOptionsByStep: boundaryExitOptionsByStep,
        entryOptionsByStep: boundaryEntryOptionsByStep,
        divergentFrontiersByStep: boundaryDivergentFrontiersByStep,
        selectedDirections: boundarySelectedDirections,
        acceptedDirections: boundaryAcceptedDirections,
        selectedCrossingsRejected: {
          exit: (boundarySelectedDirections.exit ?? 0) -
            (boundaryAcceptedDirections.exit ?? 0),
          entry: (boundarySelectedDirections.entry ?? 0) -
            (boundaryAcceptedDirections.entry ?? 0),
        },
        acceptedInventoryChangedByDirection:
          boundaryAcceptedInventoryChangedByDirection,
        acceptedInventoryStableByDirection:
          boundaryAcceptedInventoryStableByDirection,
        acceptedPersistenceTransitions: boundaryAcceptedPersistenceTransitions,
        acceptedDeclarationTransitions: boundaryAcceptedDeclarationTransitions,
        acceptedQualifyingBefore: boundaryAcceptedQualifyingBefore,
        dualityRange: {
          current: [boundaryMinimumCurrentDuality, boundaryMaximumCurrentDuality],
          projected: [boundaryMinimumProjectedDuality, boundaryMaximumProjectedDuality],
        },
        interpretation:
          'Dark candidate boundary transitions were observed at every active Carrier-003C frontier and did not alter ranking or acceptance.',
      },
    },
    interpretation,`,
  );

  writeFileSync(outputPath, source, 'utf8');
  process.stdout.write(
    `${JSON.stringify(
      {
        sourcePath,
        outputPath,
        sourceSha256,
        generatedSha256: createHash('sha256').update(source).digest('hex'),
      },
      null,
      2,
    )}\n`,
  );
}

main();
