import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const sourcePath =
  process.argv[2] ?? 'experiments/emerge-ko-001/aggregate-carrier-003d.generated.ts';
const outputPath =
  process.argv[3] ?? 'experiments/emerge-ko-001/aggregate-carrier-003e.generated.ts';
const source = readFileSync(sourcePath, 'utf8');

const expectedSourceSha256 =
  '07faa44920f6c1cbba306e409c4b63f38fe741c3487835c4ae1f2fbf410688a2';
const observedSourceSha256 = createHash('sha256').update(source).digest('hex');
if (observedSourceSha256 !== expectedSourceSha256) {
  throw new Error(
    `Carrier-003E base aggregate drift: expected ${expectedSourceSha256}, observed ${observedSourceSha256}.`,
  );
}

let generated = source;

function replaceOnce(label: string, search: string, replacement: string): void {
  const first = generated.indexOf(search);
  if (first < 0) throw new Error(`Carrier-003E aggregate transform missing: ${label}.`);
  if (generated.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Carrier-003E aggregate transform ambiguous: ${label}.`);
  }
  generated =
    generated.slice(0, first) +
    replacement +
    generated.slice(first + search.length);
}

replaceOnce(
  'rotation acceleration dynamics type',
  `    reconvergenceEvents: number;
    mechanisticTimingEndpointMet: boolean;
  };
  scale: {
    totalBranchRuns: number;
    activeTimingBranchRuns: number;
    acceptedTraceRecords: number;
  };`,
  `    reconvergenceEvents: number;
    mechanisticTimingEndpointMet: boolean;
    accelerationComparablePreStateSteps: number;
    accelerationChangedWinnerSteps: number;
    accelerationChangedAdmissionSteps: number;
    acceptedAccelerationInducedActions: number;
    accelerationStateDivergenceCount: number;
    accelerationReconvergenceCount: number;
    accelerationReconvergenceEvents: number;
    mechanisticAccelerationEndpointMet: boolean;
  };
  scale: {
    totalBranchRuns: number;
    accelerationOffBranchRuns: number;
    activeTimingBranchRuns: number;
    acceptedTraceRecords: number;
  };`,
);

replaceOnce(
  'acceleration receipt identity gate',
  `  const shamReceipts = new Set(summaries.map(summary => summary.shamProjectionReceiptSha256));
  if (shamReceipts.size !== 14) {
    throw new Error('Carrier-003D did not produce 14 distinct sham projection receipts.');
  }`,
  `  const shamReceipts = new Set(summaries.map(summary => summary.shamProjectionReceiptSha256));
  if (shamReceipts.size !== 14) {
    throw new Error('Carrier-003E did not produce 14 distinct sham projection receipts.');
  }
  const accelerationMechanismReceipts = new Set(
    summaries.map(summary =>
      stableHash({
        comparablePreStateSteps: summary.dynamics.accelerationComparablePreStateSteps,
        changedWinnerSteps: summary.dynamics.accelerationChangedWinnerSteps,
        changedAdmissionSteps: summary.dynamics.accelerationChangedAdmissionSteps,
        acceptedAccelerationInducedActions:
          summary.dynamics.acceptedAccelerationInducedActions,
        stateDivergenceCount: summary.dynamics.accelerationStateDivergenceCount,
        reconvergenceCount: summary.dynamics.accelerationReconvergenceCount,
        reconvergenceEvents: summary.dynamics.accelerationReconvergenceEvents,
        mechanisticAccelerationEndpointMet:
          summary.dynamics.mechanisticAccelerationEndpointMet,
      }),
    ),
  );
  if (accelerationMechanismReceipts.size !== 1) {
    throw new Error('Acceleration-on versus acceleration-off mechanism drifted across rotations.');
  }`,
);

replaceOnce(
  'rotation seven acceleration replication',
  `    'realReconvergenceCount',
    'reconvergenceEvents',
  ] as const) {`,
  `    'realReconvergenceCount',
    'reconvergenceEvents',
    'accelerationComparablePreStateSteps',
    'accelerationChangedWinnerSteps',
    'accelerationChangedAdmissionSteps',
    'acceptedAccelerationInducedActions',
    'accelerationStateDivergenceCount',
    'accelerationReconvergenceCount',
    'accelerationReconvergenceEvents',
  ] as const) {`,
);

replaceOnce(
  'aggregate acceleration dynamics',
  `  const dynamics = {
    rotationsWithMechanisticTimingEndpoint: summaries.filter(
      summary => summary.dynamics.mechanisticTimingEndpointMet,
    ).length,`,
  `  const accelerationMechanism = summaries[0].dynamics;
  const dynamics = {
    rotationsWithMechanisticTimingEndpoint: summaries.filter(
      summary => summary.dynamics.mechanisticTimingEndpointMet,
    ).length,
    rotationsWithMechanisticAccelerationEndpoint: summaries.filter(
      summary => summary.dynamics.mechanisticAccelerationEndpointMet,
    ).length,
    accelerationComparablePreStateSteps:
      accelerationMechanism.accelerationComparablePreStateSteps,
    accelerationChangedWinnerSteps:
      accelerationMechanism.accelerationChangedWinnerSteps,
    accelerationChangedAdmissionSteps:
      accelerationMechanism.accelerationChangedAdmissionSteps,
    acceptedAccelerationInducedActions:
      accelerationMechanism.acceptedAccelerationInducedActions,
    accelerationStateDivergenceCount:
      accelerationMechanism.accelerationStateDivergenceCount,
    accelerationReconvergenceCount:
      accelerationMechanism.accelerationReconvergenceCount,
    accelerationReconvergenceEvents:
      accelerationMechanism.accelerationReconvergenceEvents,`,
);

replaceOnce(
  'aggregate acceleration branch counts',
  `    totalActiveBranchRuns: summaries.reduce(
      (sum, summary) => sum + summary.scale.activeTimingBranchRuns,
      0,
    ),`,
  `    totalActiveBranchRuns: summaries.reduce(
      (sum, summary) => sum + summary.scale.activeTimingBranchRuns,
      0,
    ),
    totalAccelerationOffBranchRuns: summaries.reduce(
      (sum, summary) => sum + summary.scale.accelerationOffBranchRuns,
      0,
    ),`,
);

replaceOnce(
  'mechanism-gated primary',
  `  const primary = ensembleUncertainty.deltaRealMinusShamZ1;
  const interference = ensembleUncertainty.timingFeedbackInteraction;
  const trueHistoryAdvantageEstablished = primary.interval95[0] > 0;
  const trueHistoryHarmEstablished = primary.interval95[1] < 0;`,
  `  const primary = ensembleUncertainty.deltaRealMinusShamZ1;
  const interference = ensembleUncertainty.timingFeedbackInteraction;
  const mechanisticAccelerationEstablished =
    dynamics.rotationsWithMechanisticAccelerationEndpoint === 14;
  const mechanisticTimingAcrossAllRotations =
    dynamics.rotationsWithMechanisticTimingEndpoint === 14;
  const trueHistoryAdvantageEstablished =
    mechanisticAccelerationEstablished &&
    mechanisticTimingAcrossAllRotations &&
    primary.interval95[0] > 0;
  const trueHistoryHarmEstablished =
    mechanisticAccelerationEstablished &&
    mechanisticTimingAcrossAllRotations &&
    primary.interval95[1] < 0;`,
);

replaceOnce(
  'acceleration interpretation',
  `  const interpretation = trueHistoryAdvantageEstablished
    ? 'Across the complete cyclic-rotation sham ensemble, true signed-slope chronology produced a pair-generalised repair advantage under feedback.'
    : trueHistoryHarmEstablished
      ? 'Across the complete cyclic-rotation sham ensemble, true signed-slope chronology produced lower pair-generalised repair under feedback.'
      : feedbackInterferenceRobust
        ? 'True signed-slope chronology did not establish a repair advantage, while the negative slope-timing-by-feedback interaction remained pair-generalised across the ensemble.'
        : feedbackSynergyRobust
          ? 'True signed-slope chronology did not establish a direct repair advantage, but feedback produced a positive pair-generalised slope-timing interaction across the ensemble.'
          : 'Signed-slope temporal order remained mechanistically active across the rotation ensemble, but neither a true-history repair advantage nor a stable feedback interaction was established.';`,
  `  const interpretation = !mechanisticAccelerationEstablished
    ? 'The preregistered acceleration-on versus acceleration-off decision endpoint did not pass, so recovery efficacy is not interpretable.'
    : !mechanisticTimingAcrossAllRotations
      ? 'Candidate-projected acceleration changed reachable decisions, but true prior-slope order was not mechanistically expressed across every cyclic sham.'
      : trueHistoryAdvantageEstablished
        ? 'Across the complete cyclic-rotation sham ensemble, candidate-projected acceleration from true prior-slope chronology produced a pair-generalised repair advantage under feedback.'
        : trueHistoryHarmEstablished
          ? 'Across the complete cyclic-rotation sham ensemble, candidate-projected acceleration from true prior-slope chronology produced lower pair-generalised repair under feedback.'
          : feedbackInterferenceRobust
            ? 'True acceleration chronology did not establish a repair advantage, while the negative acceleration-timing-by-feedback interaction remained pair-generalised.'
            : feedbackSynergyRobust
              ? 'True acceleration chronology did not establish a direct repair advantage, but feedback produced a positive pair-generalised acceleration-timing interaction.'
              : 'Candidate-projected acceleration and prior-slope temporal order were mechanistically active, but positive true-history usefulness was not established.';`,
);

replaceOnce(
  'acceleration decision',
  `  const nextExperiment = trueHistoryAdvantageEstablished
    ? 'EMERGE-CARRIER-004: preregister held-out generalisation of the native signed-slope carrier across fresh seeds, microstates, wounds, inventories and ontology perturbations.'
    : trueHistoryHarmEstablished
      ? 'Close positive signed-slope chronology usefulness for the current law and audit the next model-native directional feature without coefficient rescue.'
      : feedbackInterferenceRobust || feedbackSynergyRobust
        ? 'Preregister a fixed-law feedback decomposition before any held-out generalisation.'
        : 'Recovery usefulness remains unestablished. Audit the next model-native directional feature, beginning with curvature or persistence transition, without tuning Carrier-003D retrospectively.';`,
  `  const nextExperiment = trueHistoryAdvantageEstablished
    ? 'EMERGE-CARRIER-004: preregister held-out generalisation of the fixed candidate-projected acceleration law across fresh seeds, microstates, wounds, inventories and ontology perturbations.'
    : trueHistoryHarmEstablished
      ? 'Close positive candidate-acceleration chronology usefulness for the fixed law and audit the next model-native higher-order feature without coefficient rescue.'
      : 'Carrier-004 remains gated. Record the fixed acceleration result and audit persistence-transition direction, threshold-crossing direction or inventory-event timing without tuning Carrier-003E retrospectively.';`,
);

replaceOnce(
  'acceleration primary estimand wording',
  `'For each matched pair, true signed-slope-history recovery minus mean recovery across all 14 non-zero cyclic sham signed-slope rotations under Z=1; inference across eight pair-level ensemble effects.',`,
  `'For each matched pair, recovery under true candidate-projected acceleration minus mean recovery across all 14 cyclic rotations of the same fifteen prior-slope values under Z=1; inference across eight pair-level ensemble effects.',`,
);

replaceOnce(
  'acceleration preregistration gates',
  `      rotation7ReplicationGate: true,
      realReceiptIdentityGate: true,`,
  `      accelerationProjectionGate: true,
      accelerationOffNeutralityGate: true,
      accelerationDecisionGate: true,
      rotation7ReplicationGate: true,
      realReceiptIdentityGate: true,`,
);

replaceOnce(
  'acceleration aggregate scale',
  `      activeBranchRuns: dynamics.totalActiveBranchRuns,
      setupNeutralityComparisons: neutrality.neutrality.comparisons,`,
  `      activeBranchRuns: dynamics.totalActiveBranchRuns,
      accelerationOffBranchRuns: dynamics.totalAccelerationOffBranchRuns,
      setupNeutralityComparisons: neutrality.neutrality.comparisons,`,
);

replaceOnce(
  'acceleration mechanism receipt',
  `      realProjectionReceiptSha256: [...realReceipts][0],
      shamProjectionReceiptsSha256: stableHash(`,
  `      realProjectionReceiptSha256: [...realReceipts][0],
      accelerationMechanismReceiptSha256: [...accelerationMechanismReceipts][0],
      shamProjectionReceiptsSha256: stableHash(`,
);

replaceOnce(
  'rotation replication acceleration counts',
  `        acceptedTimingInducedActions: rotation7.dynamics.acceptedTimingInducedActions,
      },`,
  `        acceptedTimingInducedActions: rotation7.dynamics.acceptedTimingInducedActions,
        accelerationChangedWinnerSteps:
          rotation7.dynamics.accelerationChangedWinnerSteps,
        accelerationChangedAdmissionSteps:
          rotation7.dynamics.accelerationChangedAdmissionSteps,
        acceptedAccelerationInducedActions:
          rotation7.dynamics.acceptedAccelerationInducedActions,
      },`,
);

replaceOnce(
  'acceleration conclusions',
  `      feedbackSynergyRobust,
      mechanisticTimingAcrossAllRotations:
        dynamics.rotationsWithMechanisticTimingEndpoint === 14,`,
  `      feedbackSynergyRobust,
      mechanisticAccelerationEstablished,
      mechanisticTimingAcrossAllRotations,
      positiveCompleteShamUsefulnessEstablished:
        trueHistoryAdvantageEstablished,`,
);

replaceOnce(
  'acceleration manifest',
  `    realProjectionReceiptSha256: summary.receipts.realProjectionReceiptSha256,
    neutralityPassed: summary.neutrality.passed,`,
  `    realProjectionReceiptSha256: summary.receipts.realProjectionReceiptSha256,
    accelerationMechanismReceiptSha256:
      summary.receipts.accelerationMechanismReceiptSha256,
    neutralityPassed: summary.neutrality.passed,
    mechanisticAccelerationEstablished,
    mechanisticTimingAcrossAllRotations,`,
);

generated = generated
  .replaceAll('Carrier-003D', 'Carrier-003E')
  .replaceAll('EMERGE-CARRIER-003D', 'EMERGE-CARRIER-003E')
  .replaceAll('carrier-003d', 'carrier-003e')
  .replaceAll('emerge-carrier-003d', 'emerge-carrier-003e')
  .replaceAll('signed-slope', 'candidate-acceleration')
  .replaceAll('slope-timing', 'acceleration-timing');

const generatedSha256 = createHash('sha256').update(generated).digest('hex');
writeFileSync(outputPath, generated, 'utf8');
console.log(
  JSON.stringify(
    {
      sourcePath,
      outputPath,
      sourceSha256: observedSourceSha256,
      generatedSha256,
    },
    null,
    2,
  ),
);
