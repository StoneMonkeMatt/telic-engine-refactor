import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const sourcePath =
  process.argv[2] ?? 'experiments/emerge-ko-001/run-carrier-003b-base.generated.ts';
const outputPath =
  process.argv[3] ?? 'experiments/emerge-ko-001/run-carrier-003d-rotation.generated.ts';
const source = readFileSync(sourcePath, 'utf8');

const expectedSourceSha256 =
  '5c1f2fe37979ed500db7eb482d30a43b0a6121b791df051db7e42a73e55689ea';
const observedSourceSha256 = createHash('sha256').update(source).digest('hex');
if (observedSourceSha256 !== expectedSourceSha256) {
  throw new Error(
    `Carrier-003D base runner drift: expected ${expectedSourceSha256}, observed ${observedSourceSha256}.`,
  );
}

let generated = source;

function replaceOnce(label: string, search: string, replacement: string): void {
  const first = generated.indexOf(search);
  if (first < 0) throw new Error(`Carrier-003D transform missing: ${label}.`);
  if (generated.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Carrier-003D transform ambiguous: ${label}.`);
  }
  generated =
    generated.slice(0, first) +
    replacement +
    generated.slice(first + search.length);
}

replaceOnce(
  'projection import',
  "import { ExactTargetBridgeLesionReceipt } from './exactTargetBridgeLesion';",
  "import { ExactTargetBridgeLesionReceipt } from './exactTargetBridgeLesion';\nimport { projectDualityUpdate } from '../../src/logic/dualityProjection';",
);

replaceOnce(
  'candidate type',
  `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  carriedDualityLoss: number;
  candidateDema: number;
  historyAnchor: number;
};`,
  `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  candidateVelocity: number;
  candidateTargetDuality: number;
  candidateDema: number;
  historyAnchor: number;
};`,
);

replaceOnce(
  'capsule update law',
  `function updateCapsule(
  state: CapsuleState,
  rawDuality: number,
  inventoryChanged: boolean,
  config: CarrierConfig,
  emaAlpha: number,
  historyWindow: number,
): CapsuleState {
  const dEma = state.dEma + emaAlpha * (rawDuality - state.dEma);`,
  `function updateCapsule(
  state: CapsuleState,
  nextSequence: string[],
  inventoryChanged: boolean,
  config: CarrierConfig,
  historyWindow: number,
  telos: Telos,
): CapsuleState {
  const dEma = projectDualityUpdate(
    telos,
    state.dEma,
    nextSequence,
  ).nextDuality;`,
);

replaceOnce(
  'candidate slope adjustment',
  `      const candidateDema =
        historyAnchor + emaAlpha * (candidate.rawDuality - historyAnchor);
      const carriedDualityLoss = Math.max(0, historyAnchor - candidateDema);
      const carrierAdjustment = 0.5 * (rawDualityLoss - carriedDualityLoss);`,
  `      const projection = projectDualityUpdate(
        telos,
        historyAnchor,
        candidate.sequence,
      );
      const candidateDema = projection.nextDuality;
      const candidateVelocity = projection.velocity;
      const candidateTargetDuality = projection.targetDuality;
      const carrierAdjustment = 0.5 * (candidateVelocity + rawDualityLoss);`,
);

replaceOnce(
  'candidate result fields',
  `        carrierAdjustment,
        carriedDualityLoss,
        candidateDema,
        historyAnchor,`,
  `        carrierAdjustment,
        candidateVelocity,
        candidateTargetDuality,
        candidateDema,
        historyAnchor,`,
);

replaceOnce(
  'zero carrier fields',
  `      carrierAdjustment: 0,
      carriedDualityLoss: 0,
      candidateDema: capsuleState.dEma,
      historyAnchor: capsuleState.dEma,`,
  `      carrierAdjustment: 0,
      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
      historyAnchor: capsuleState.dEma,`,
);

replaceOnce(
  'capsule update call',
  `      capsuleState = updateCapsule(
        capsuleState,
        telos.computeRawDuality(current),
        inventoryChanged,
        config,
        emaAlpha,
        historyWindow,
      );`,
  `      capsuleState = updateCapsule(
        capsuleState,
        current,
        inventoryChanged,
        config,
        historyWindow,
        telos,
      );`,
);

replaceOnce(
  'accepted trace fields',
  `          carrierAdjustment: selected.carrierAdjustment,
          carriedDualityLoss: selected.carriedDualityLoss,
          candidateDema: selected.candidateDema,
          historyAnchor: selected.historyAnchor,`,
  `          carrierAdjustment: selected.carrierAdjustment,
          candidateVelocity: selected.candidateVelocity,
          candidateTargetDuality: selected.candidateTargetDuality,
          candidateDema: selected.candidateDema,
          historyAnchor: selected.historyAnchor,`,
);

generated = generated
  .replaceAll('Carrier002C', 'Carrier003C')
  .replaceAll('carrier002C', 'carrier003C')
  .replaceAll('Carrier-002C', 'Carrier-003C')
  .replaceAll('EMERGE-CARRIER-002C', 'EMERGE-CARRIER-003C')
  .replaceAll('Carrier-003B', 'Carrier-003D')
  .replaceAll('EMERGE-CARRIER-003B', 'EMERGE-CARRIER-003D')
  .replaceAll('carrier-003b', 'carrier-003d')
  .replaceAll('emerge-carrier-003b', 'emerge-carrier-003d');

replaceOnce(
  'primary endpoint wording',
  'Pair-level mean target recovery difference under feedback: Delta_Z1 = Y(real ordered history)-Y(equal-distribution sham history), preregistered positive.',
  'Pair-level mean target recovery difference under feedback: Delta_Z1 = Y(true ordered signed-slope history)-Y(equal-distribution cyclic-sham signed-slope history), preregistered positive.',
);

replaceOnce(
  'mechanistic endpoint wording',
  'At least one exact paired winner or admission decision changes while real and sham branches share the same pre-state.',
  'At least one exact paired winner or admission decision changes while true-slope and sham-slope branches share the same pre-state.',
);

replaceOnce(
  'post exposure wording',
  'After step 16, both branches continue with the endogenous Carrier-003C capsule update.',
  'After step 16, both branches continue with the endogenous Carrier-003C native projected-slope capsule update.',
);

replaceOnce(
  'interpretation wording',
  `  const interpretation = !mechanisticTimingEndpointMet
    ? 'The real and equal-distribution sham schedules produced no exact decision or trajectory differences. Temporal ordering was not functionally expressed at this resolution.'
    : trueTimelineImproves
      ? 'Temporal ordering was functionally causal and the true ordered history improved pair-generalised target recovery under feedback relative to the equal-distribution sham.'
      : trueTimelineHarms
        ? 'Temporal ordering was functionally causal, but the true ordered history reduced pair-generalised target recovery under feedback relative to the equal-distribution sham.'
        : 'Temporal ordering changed reachable decisions and trajectories, but the pair-level recovery interval crosses zero. Timing is influential; useful control information is not established.';`,
  `  const interpretation = !mechanisticTimingEndpointMet
    ? 'True and equal-distribution sham signed-slope schedules produced no exact decision or trajectory differences. Slope chronology was not functionally expressed at this resolution.'
    : trueTimelineImproves
      ? 'Signed-slope chronology was functionally causal and the true ordered slope improved pair-generalised target recovery under feedback relative to the equal-distribution sham.'
      : trueTimelineHarms
        ? 'Signed-slope chronology was functionally causal, but the true ordered slope reduced pair-generalised target recovery under feedback relative to the equal-distribution sham.'
        : 'Signed-slope chronology changed reachable decisions and trajectories, but the pair-level recovery interval crosses zero. Directional timing is influential; useful control information is not established.';`,
);

replaceOnce(
  'next experiment wording',
  `    nextExperiment: trueTimelineImproves
      ? 'Aggregate all 14 preregistered Carrier-003D rotation summaries before selecting the next experiment.'
      : mechanisticTimingEndpointMet
        ? 'Aggregate all 14 preregistered Carrier-003D rotation summaries before selecting the next experiment. preregister a timing-resolution audit on the same coefficient, testing alternative non-adaptive sham permutations and exposure windows before held-out generalisation.'
        : 'Aggregate all 14 preregistered Carrier-003D rotation summaries before selecting the next experiment. verify schedule exposure magnitude and whether any bounded-history ordering can alter the reachable carrier without tuning the confirmatory result.',`,
  `    nextExperiment:
      'Aggregate all 14 preregistered Carrier-003D rotation summaries before selecting any next mechanism or held-out test.',`,
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
