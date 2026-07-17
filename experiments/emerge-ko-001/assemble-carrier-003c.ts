import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const sourcePath =
  process.argv[2] ?? 'experiments/emerge-ko-001/run-carrier-002c.ts';
const outputPath =
  process.argv[3] ?? 'experiments/emerge-ko-001/run-carrier-003c.generated.ts';
const source = readFileSync(sourcePath, 'utf8');

const expectedSourceSha256 =
  'f2169f7a1f03ef599cdbfffd0f99d8dae3f532bea80fcb842ec60240beb46592';
const observedSourceSha256 = createHash('sha256').update(source).digest('hex');
if (observedSourceSha256 !== expectedSourceSha256) {
  throw new Error(
    `Carrier-003C base source drift: expected ${expectedSourceSha256}, observed ${observedSourceSha256}.`,
  );
}

let generated = source;

function replaceOnce(label: string, search: string, replacement: string): void {
  const first = generated.indexOf(search);
  if (first < 0) throw new Error(`Carrier-003C transform missing: ${label}.`);
  if (generated.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Carrier-003C transform ambiguous: ${label}.`);
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
};`,
  `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  candidateVelocity: number;
  candidateTargetDuality: number;
  candidateDema: number;
};`,
);

replaceOnce(
  'capsule update signature and law',
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
        capsuleState.dEma + emaAlpha * (candidate.rawDuality - capsuleState.dEma);
      const carriedDualityLoss = Math.max(0, capsuleState.dEma - candidateDema);
      const carrierAdjustment = active * 0.5 * (rawDualityLoss - carriedDualityLoss);`,
  `      const projection = projectDualityUpdate(
        telos,
        capsuleState.dEma,
        candidate.sequence,
      );
      const candidateDema = projection.nextDuality;
      const candidateVelocity = projection.velocity;
      const candidateTargetDuality = projection.targetDuality;
      const carrierAdjustment =
        active * 0.5 * (candidateVelocity + rawDualityLoss);`,
);

replaceOnce(
  'candidate result fields',
  `        carrierAdjustment,
        carriedDualityLoss,
        candidateDema,`,
  `        carrierAdjustment,
        candidateVelocity,
        candidateTargetDuality,
        candidateDema,`,
);

replaceOnce(
  'zero carrier fields',
  `      carrierAdjustment: 0,
      carriedDualityLoss: 0,
      candidateDema: capsuleState.dEma,`,
  `      carrierAdjustment: 0,
      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,`,
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
  'accepted trace slope fields',
  `          carrierAdjustment: selected.carrierAdjustment,
          carriedDualityLoss: selected.carriedDualityLoss,
          candidateDema: selected.candidateDema,`,
  `          carrierAdjustment: selected.carrierAdjustment,
          candidateVelocity: selected.candidateVelocity,
          candidateTargetDuality: selected.candidateTargetDuality,
          candidateDema: selected.candidateDema,`,
);

generated = generated
  .replaceAll('Carrier-002C', 'Carrier-003C')
  .replaceAll('EMERGE-CARRIER-002C', 'EMERGE-CARRIER-003C')
  .replaceAll('emerge-carrier-002c-v1', 'emerge-carrier-003c-v1')
  .replaceAll('emerge-carrier-002c-manifest-v1', 'emerge-carrier-003c-manifest-v1');

replaceOnce(
  'interpretation block',
  `  const interpretation = !mechanisticEndpointMet
    ? 'Carrier-003C reached hold/swap candidates but did not change any exact winner or admission decision. Recovery efficacy is not interpretable.'
    : primaryClearsZero
      ? 'Carrier-003C changed reachable decisions and produced a pair-generalised state-specific recovery effect under feedback. Direction follows the signed interval.'
      : 'Carrier-003C changed reachable hold/swap decisions, establishing a functioning macro-history carrier. The pair-level recovery interval still crosses zero, so state-specific recovery efficacy is not established.';`,
  `  const interpretation = !mechanisticEndpointMet
    ? 'Carrier-003C exposed native projected duality velocity to reachable candidates but changed no exact winner or admission decision. A complete-sham slope sweep is not admissible.'
    : primaryClearsZero
      ? 'Carrier-003C changed reachable decisions and produced a pair-generalised state-specific recovery effect under feedback. Direction follows the signed interval; complete-sham slope timing control is the next gate.'
      : 'Carrier-003C changed reachable hold/swap decisions using native projected signed duality slope. Recovery efficacy is not established; the complete-sham slope timing control is now admissible.';`,
);

replaceOnce(
  'preregistration fields',
  `      carriedLoss:
        'L_D(c;M_t)=max(0,D_EMA-[D_EMA+0.2*(Dhat(c)-D_EMA)])',
      coefficient: 0.5,
      emaAlpha,`,
  `      projectedVelocity:
        'v_t(c)=D_next_native(c)-D_EMA, where D_next_native uses the existing Telos force, target and alpha=0.2 update',
      insertionReplacement:
        'For insert candidates, the existing 0.5 raw-duality loss is removed before applying 0.5*v_t(c); non-insert candidates receive 0.5*v_t(c).',
      coefficient: 0.5,
      emaAlpha,`,
);

replaceOnce(
  'next experiment',
  `    nextExperiment: mechanisticEndpointMet
      ? 'EMERGE-CARRIER-003: freeze real and equal-distribution sham histories, preserving marginal capsule exposure while permuting temporal alignment.'
      : 'Carrier-002D sensitivity audit: measure score margins and the minimum continuity coefficient required to alter a reachable decision without changing the confirmatory coefficient retrospectively.',`,
  `    nextExperiment: mechanisticEndpointMet
      ? 'EMERGE-CARRIER-003D: complete 14-rotation real-versus-sham audit of the native projected signed-slope carrier.'
      : 'No slope sweep. Audit score margins and candidate exposure before changing any coefficient or mechanism.',`,
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
