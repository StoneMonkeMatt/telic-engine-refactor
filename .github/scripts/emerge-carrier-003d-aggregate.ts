import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const sourcePath =
  process.argv[2] ?? 'experiments/emerge-ko-001/aggregate-carrier-003b-base.generated.ts';
const outputPath =
  process.argv[3] ?? 'experiments/emerge-ko-001/aggregate-carrier-003d.generated.ts';
const source = readFileSync(sourcePath, 'utf8');

const expectedSourceSha256 =
  'df10a6501be5156fa6466f96e778388ece75f4b49b23ad2a79bdb76e6c8413b6';
const observedSourceSha256 = createHash('sha256').update(source).digest('hex');
if (observedSourceSha256 !== expectedSourceSha256) {
  throw new Error(
    `Carrier-003D base aggregate drift: expected ${expectedSourceSha256}, observed ${observedSourceSha256}.`,
  );
}

let generated = source;

function replaceOnce(label: string, search: string, replacement: string): void {
  const first = generated.indexOf(search);
  if (first < 0) throw new Error(`Carrier-003D aggregate transform missing: ${label}.`);
  if (generated.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Carrier-003D aggregate transform ambiguous: ${label}.`);
  }
  generated =
    generated.slice(0, first) +
    replacement +
    generated.slice(first + search.length);
}

generated = generated
  .replaceAll('Carrier-003B', 'Carrier-003D')
  .replaceAll('EMERGE-CARRIER-003B', 'EMERGE-CARRIER-003D')
  .replaceAll('carrier-003b', 'carrier-003d')
  .replaceAll('emerge-carrier-003b', 'emerge-carrier-003d')
  .replaceAll('carrier002C', 'carrier003C')
  .replaceAll('Carrier002C', 'Carrier003C');

replaceOnce(
  'rotation reference path',
  `  const manifestPath = resolve(
    process.argv[5] ?? \`${resultsDirectory}/EMERGE-CARRIER-003D-aggregate-manifest.json\`,
  );`,
  `  const manifestPath = resolve(
    process.argv[5] ?? \`${resultsDirectory}/EMERGE-CARRIER-003D-aggregate-manifest.json\`,
  );
  const rotation7ReferencePath = resolve(
    process.argv[6] ??
      \`${resultsDirectory}/EMERGE-CARRIER-003D-rotation-7-reference-summary.json\`,
  );`,
);

replaceOnce(
  'rotation seven hardcoded gate',
  `  // Rotation 7 must exactly reproduce the sealed Carrier-003 point estimates and diagnostics.
  const rotation7 = summaries.find(summary => summary.rotation === 7)!;
  const rotation7Expected = {
    deltaRealMinusShamZ0: 0.0068359375,
    deltaRealMinusShamZ1: -0.01611328125,
    timingFeedbackInteraction: -0.02294921875,
    stateSpecificTimingZ0: -0.009765625,
    stateSpecificTimingZ1: -0.0048828125,
    stateTimingFeedbackInteraction: 0.0048828125,
    changedWinnerSteps: 1615,
    changedAdmissionSteps: 1280,
    acceptedTimingInducedActions: 1260,
  };
  for (const metric of METRICS) {
    assertClose(\`Rotation 7 ${metric}\`, rotation7.estimators[metric], rotation7Expected[metric]);
  }
  for (const key of ['changedWinnerSteps', 'changedAdmissionSteps', 'acceptedTimingInducedActions'] as const) {
    if (rotation7.dynamics[key] !== rotation7Expected[key]) {
      throw new Error(\`Rotation 7 ${key} drifted from Carrier-003.\`);
    }
  }`,
  `  // Rotation 7 is independently repeated in setup before the full sweep.
  const rotation7Reference = JSON.parse(
    readFileSync(rotation7ReferencePath, 'utf8'),
  ) as RotationSummary;
  if (
    rotation7Reference.experimentId !== 'EMERGE-CARRIER-003D' ||
    rotation7Reference.rotation !== 7 ||
    rotation7Reference.runMode !== 'active'
  ) {
    throw new Error('Carrier-003D rotation-7 reference is invalid.');
  }
  const rotation7 = summaries.find(summary => summary.rotation === 7)!;
  for (const metric of METRICS) {
    assertClose(
      \`Rotation 7 ${metric}\`,
      rotation7.estimators[metric],
      rotation7Reference.estimators[metric],
    );
  }
  for (const key of [
    'comparablePreStateSteps',
    'changedWinnerSteps',
    'changedAdmissionSteps',
    'acceptedTimingInducedActions',
    'shamHoldToRealSwap',
    'shamSwapToRealHold',
    'shamSwapToDifferentRealSwap',
    'otherWinnerChanges',
    'realStateDivergenceCount',
    'realReconvergenceCount',
    'reconvergenceEvents',
  ] as const) {
    if (rotation7.dynamics[key] !== rotation7Reference.dynamics[key]) {
      throw new Error(\`Rotation 7 ${key} drifted from its independent setup reference.\`);
    }
  }
  if (
    rotation7.realProjectionReceiptSha256 !==
      rotation7Reference.realProjectionReceiptSha256 ||
    rotation7.shamProjectionReceiptSha256 !==
      rotation7Reference.shamProjectionReceiptSha256
  ) {
    throw new Error('Rotation 7 projection receipts drifted from the setup reference.');
  }`,
);

replaceOnce(
  'interpretation wording',
  `  const interpretation = trueHistoryAdvantageEstablished
    ? 'Across the complete cyclic-rotation sham ensemble, true chronology produced a pair-generalised repair advantage under feedback.'
    : trueHistoryHarmEstablished
      ? 'Across the complete cyclic-rotation sham ensemble, true chronology produced lower pair-generalised repair under feedback.'
      : feedbackInterferenceRobust
        ? 'True chronology did not establish a repair advantage over the complete sham ensemble, while the negative timing-by-feedback interaction remained pair-generalised across the ensemble.'
        : feedbackSynergyRobust
          ? 'True chronology did not establish a direct repair advantage, but feedback produced a positive pair-generalised timing interaction across the complete sham ensemble.'
          : 'Temporal order remained mechanistically active across the rotation ensemble, but neither a true-history repair advantage nor a stable feedback interaction was established.';`,
  `  const interpretation = trueHistoryAdvantageEstablished
    ? 'Across the complete cyclic-rotation sham ensemble, true signed-slope chronology produced a pair-generalised repair advantage under feedback.'
    : trueHistoryHarmEstablished
      ? 'Across the complete cyclic-rotation sham ensemble, true signed-slope chronology produced lower pair-generalised repair under feedback.'
      : feedbackInterferenceRobust
        ? 'True signed-slope chronology did not establish a repair advantage, while the negative slope-timing-by-feedback interaction remained pair-generalised across the ensemble.'
        : feedbackSynergyRobust
          ? 'True signed-slope chronology did not establish a direct repair advantage, but feedback produced a positive pair-generalised slope-timing interaction across the ensemble.'
          : 'Signed-slope temporal order remained mechanistically active across the rotation ensemble, but neither a true-history repair advantage nor a stable feedback interaction was established.';`,
);

replaceOnce(
  'next experiment decision',
  `  const nextExperiment = trueHistoryAdvantageEstablished
    ? 'EMERGE-CARRIER-004: preregister held-out generalisation across fresh seeds, microstates, wounds, inventories and ontology perturbations.'
    : feedbackInterferenceRobust
      ? 'EMERGE-CARRIER-003C: preregister a feedback-mechanism decomposition to locate why the fixed repair term interferes with chronological history before held-out generalisation.'
      : 'Close the positive timing-usefulness claim for the current carrier and preregister the next model-native carrier mechanism before held-out generalisation.';`,
  `  const nextExperiment = trueHistoryAdvantageEstablished
    ? 'EMERGE-CARRIER-004: preregister held-out generalisation of the native signed-slope carrier across fresh seeds, microstates, wounds, inventories and ontology perturbations.'
    : trueHistoryHarmEstablished
      ? 'Close positive signed-slope chronology usefulness for the current law and audit the next model-native directional feature without coefficient rescue.'
      : feedbackInterferenceRobust || feedbackSynergyRobust
        ? 'Preregister a fixed-law feedback decomposition before any held-out generalisation.'
        : 'Recovery usefulness remains unestablished. Audit the next model-native directional feature, beginning with curvature or persistence transition, without tuning Carrier-003D retrospectively.';`,
);

replaceOnce(
  'primary estimand wording',
  'For each matched pair, real-history recovery minus the mean recovery across all 14 non-zero cyclic sham rotations under Z=1; inference across eight pair-level ensemble effects.',
  'For each matched pair, true signed-slope-history recovery minus mean recovery across all 14 non-zero cyclic sham signed-slope rotations under Z=1; inference across eight pair-level ensemble effects.',
);

replaceOnce(
  'rotation replication object',
  `    rotation7Replication: {
      passed: true,
      expected: rotation7Expected,
      observedEstimators: rotation7.estimators,
      observedDynamics: {
        changedWinnerSteps: rotation7.dynamics.changedWinnerSteps,
        changedAdmissionSteps: rotation7.dynamics.changedAdmissionSteps,
        acceptedTimingInducedActions: rotation7.dynamics.acceptedTimingInducedActions,
      },
    },`,
  `    rotation7Replication: {
      passed: true,
      referenceSummarySha256: stableHash(rotation7Reference),
      observedSummarySha256: stableHash(rotation7),
      referenceEstimators: rotation7Reference.estimators,
      observedEstimators: rotation7.estimators,
      observedDynamics: {
        changedWinnerSteps: rotation7.dynamics.changedWinnerSteps,
        changedAdmissionSteps: rotation7.dynamics.changedAdmissionSteps,
        acceptedTimingInducedActions: rotation7.dynamics.acceptedTimingInducedActions,
      },
    },`,
);

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
