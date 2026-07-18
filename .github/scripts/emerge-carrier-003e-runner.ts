import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const sourcePath =
  process.argv[2] ?? 'experiments/emerge-ko-001/run-carrier-003d-rotation.generated.ts';
const outputPath =
  process.argv[3] ?? 'experiments/emerge-ko-001/run-carrier-003e-rotation.generated.ts';
const source = readFileSync(sourcePath, 'utf8');

const expectedSourceSha256 =
  '4a89285d5fdf9dc1510f381bc17be9194d09a562c4cea3078c4962d253d205ff';
const observedSourceSha256 = createHash('sha256').update(source).digest('hex');
if (observedSourceSha256 !== expectedSourceSha256) {
  throw new Error(
    `Carrier-003E base runner drift: expected ${expectedSourceSha256}, observed ${observedSourceSha256}.`,
  );
}

let generated = source;

function replaceOnce(label: string, search: string, replacement: string): void {
  const first = generated.indexOf(search);
  if (first < 0) throw new Error(`Carrier-003E transform missing: ${label}.`);
  if (generated.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Carrier-003E transform ambiguous: ${label}.`);
  }
  generated =
    generated.slice(0, first) +
    replacement +
    generated.slice(first + search.length);
}

replaceOnce(
  'acceleration projection import',
  "import { projectDualityUpdate } from '../../src/logic/dualityProjection';",
  `import {
  projectDualityAcceleration,
  projectDualityUpdate,
} from '../../src/logic/dualityProjection';`,
);

replaceOnce(
  'branch acceleration diagnostics',
  `  projectionSha256: string;
  pairedDiagnostics: PairedDiagnostics | null;
}`,
  `  projectionSha256: string;
  pairedDiagnostics: PairedDiagnostics | null;
  accelerationDiagnostics: PairedDiagnostics | null;
}`,
);

replaceOnce(
  'candidate acceleration fields',
  `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  candidateVelocity: number;
  candidateTargetDuality: number;
  candidateDema: number;
  historyAnchor: number;
};`,
  `type CarrierCandidate = RankedCandidate & {
  carrierAdjustment: number;
  slopeCarrierAdjustment: number;
  accelerationAdjustment: number;
  candidateVelocity: number;
  previousVelocity: number;
  candidateAcceleration: number;
  candidateTargetDuality: number;
  candidateDema: number;
  historyAnchor: number;
};`,
);

replaceOnce(
  'slope schedule construction',
  `function normalizedHistory(capsule: MacroHistoryCapsule, length = 16): number[] {
  const source = capsule.boundedDualityHistory.slice(-length);
  if (source.length === 0) throw new Error(\`Capsule \${capsule.capsuleId} has no history.\`);
  const padded = [...Array(Math.max(0, length - source.length)).fill(source[0]), ...source];
  const schedule = padded.slice(-length);
  if (Math.abs(schedule[schedule.length - 1] - capsule.dEma) > 1e-12) {
    throw new Error(\`Capsule \${capsule.capsuleId} history does not terminate at dEma.\`);
  }
  return schedule;
}

function rotatePreterminal(values: number[], offset: number): number[] {
  if (values.length < 3) throw new Error('Timing schedule must contain at least three values.');
  const terminal = values[values.length - 1];
  const prefixValues = values.slice(0, -1);
  const shift = ((offset % prefixValues.length) + prefixValues.length) % prefixValues.length;
  if (shift === 0) throw new Error('Sham rotation must be non-zero.');
  return [...prefixValues.slice(shift), ...prefixValues.slice(0, shift), terminal];
}

function sortedNumeric(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

function buildTimingSchedules(capsule: MacroHistoryCapsule, rotation: number) {
  if (!Number.isInteger(rotation) || rotation < 1 || rotation > 14) {
    throw new Error(\`Carrier-003D rotation must be an integer from 1 to 14; received \${rotation}.\`);
  }
  const real = normalizedHistory(capsule, 16);
  const sham = rotatePreterminal(real, rotation);
  if (JSON.stringify(sortedNumeric(real)) !== JSON.stringify(sortedNumeric(sham))) {
    throw new Error('Real and sham timing schedules do not preserve the same value multiset.');
  }
  if (real[real.length - 1] !== sham[sham.length - 1]) {
    throw new Error('Real and sham timing schedules do not preserve the terminal anchor.');
  }
  return {
    real,
    sham,
    realSha256: stableHash(real),
    shamSha256: stableHash(sham),
    rotation,
  };
}`,
  `function normalizedSlopeHistory(capsule: MacroHistoryCapsule, length = 16): number[] {
  const source = capsule.boundedDualityHistory.slice(-length);
  if (source.length === 0) throw new Error(\`Capsule \${capsule.capsuleId} has no history.\`);
  const padded = [...Array(Math.max(0, length - source.length)).fill(source[0]), ...source];
  const levels = padded.slice(-length);
  if (Math.abs(levels[levels.length - 1] - capsule.dEma) > 1e-12) {
    throw new Error(\`Capsule \${capsule.capsuleId} history does not terminate at dEma.\`);
  }
  return levels.slice(1).map((value, index) => value - levels[index]);
}

function rotateSlopeSchedule(values: number[], offset: number): number[] {
  if (values.length !== 15) throw new Error('Acceleration schedule must contain fifteen slopes.');
  const shift = ((offset % values.length) + values.length) % values.length;
  if (shift === 0) throw new Error('Sham rotation must be non-zero.');
  return [...values.slice(shift), ...values.slice(0, shift)];
}

function sortedNumeric(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

function buildTimingSchedules(capsule: MacroHistoryCapsule, rotation: number) {
  if (!Number.isInteger(rotation) || rotation < 1 || rotation > 14) {
    throw new Error(\`Carrier-003E rotation must be an integer from 1 to 14; received \${rotation}.\`);
  }
  const real = normalizedSlopeHistory(capsule, 16);
  const sham = rotateSlopeSchedule(real, rotation);
  if (JSON.stringify(sortedNumeric(real)) !== JSON.stringify(sortedNumeric(sham))) {
    throw new Error('Real and sham acceleration schedules do not preserve the same slope multiset.');
  }
  return {
    real,
    sham,
    currentDualityAnchor: capsule.dEma,
    realSha256: stableHash(real),
    shamSha256: stableHash(sham),
    rotation,
  };
}`,
);

replaceOnce(
  'native anchor and prior velocity',
  `    const historyAnchor =
      timingActive === 1 && step <= timingSchedule.length
        ? timingSchedule[step - 1]
        : capsuleState.dEma;
    if (timingActive === 1 && step <= timingSchedule.length) timingExposureSteps++;`,
  `    const historyAnchor = capsuleState.dEma;
    const endogenousHistory = capsuleState.boundedDualityHistory;
    const endogenousPreviousVelocity =
      endogenousHistory.length >= 2
        ? endogenousHistory[endogenousHistory.length - 1] -
          endogenousHistory[endogenousHistory.length - 2]
        : 0;
    const previousVelocity =
      timingActive === 1 && step <= timingSchedule.length
        ? timingSchedule[step - 1]
        : endogenousPreviousVelocity;
    if (timingActive === 1 && step <= timingSchedule.length) timingExposureSteps++;`,
);

replaceOnce(
  'candidate acceleration law',
  `      const projection = projectDualityUpdate(
        telos,
        historyAnchor,
        candidate.sequence,
      );
      const candidateDema = projection.nextDuality;
      const candidateVelocity = projection.velocity;
      const candidateTargetDuality = projection.targetDuality;
      const carrierAdjustment = 0.5 * (candidateVelocity + rawDualityLoss);`,
  `      const accelerationProjection = projectDualityAcceleration(
        telos,
        historyAnchor,
        historyAnchor - previousVelocity,
        candidate.sequence,
      );
      const projection = accelerationProjection.projection;
      const candidateDema = projection.nextDuality;
      const candidateVelocity = projection.velocity;
      const candidateAcceleration = accelerationProjection.acceleration;
      const candidateTargetDuality = projection.targetDuality;
      const slopeCarrierAdjustment = 0.5 * (candidateVelocity + rawDualityLoss);
      const accelerationAdjustment = timingActive * 0.5 * candidateAcceleration;
      const carrierAdjustment = slopeCarrierAdjustment + accelerationAdjustment;`,
);

replaceOnce(
  'candidate result acceleration fields',
  `        carrierAdjustment,
        candidateVelocity,
        candidateTargetDuality,
        candidateDema,
        historyAnchor,`,
  `        carrierAdjustment,
        slopeCarrierAdjustment,
        accelerationAdjustment,
        candidateVelocity,
        previousVelocity,
        candidateAcceleration,
        candidateTargetDuality,
        candidateDema,
        historyAnchor,`,
);

replaceOnce(
  'zero acceleration fields',
  `      carrierAdjustment: 0,
      candidateVelocity: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
      historyAnchor: capsuleState.dEma,`,
  `      carrierAdjustment: 0,
      slopeCarrierAdjustment: 0,
      accelerationAdjustment: 0,
      candidateVelocity: 0,
      previousVelocity: 0,
      candidateAcceleration: 0,
      candidateTargetDuality: capsuleState.dEma,
      candidateDema: capsuleState.dEma,
      historyAnchor: capsuleState.dEma,`,
);

replaceOnce(
  'accepted acceleration trace',
  `          carrierAdjustment: selected.carrierAdjustment,
          candidateVelocity: selected.candidateVelocity,
          candidateTargetDuality: selected.candidateTargetDuality,
          candidateDema: selected.candidateDema,
          historyAnchor: selected.historyAnchor,`,
  `          carrierAdjustment: selected.carrierAdjustment,
          slopeCarrierAdjustment: selected.slopeCarrierAdjustment,
          accelerationAdjustment: selected.accelerationAdjustment,
          candidateVelocity: selected.candidateVelocity,
          previousVelocity: selected.previousVelocity,
          candidateAcceleration: selected.candidateAcceleration,
          candidateTargetDuality: selected.candidateTargetDuality,
          candidateDema: selected.candidateDema,
          historyAnchor: selected.historyAnchor,`,
);

replaceOnce(
  'schedule receipt anchor',
  `                terminalAnchor: schedules.real[schedules.real.length - 1],`,
  `                currentDualityAnchor: schedules.currentDualityAnchor,`,
);

replaceOnce(
  'active acceleration baseline',
  `            } else {
              const real = runBranch(`,
  `            } else {
              const accelerationOff = runBranch(
                config,
                codex,
                pair.pairId,
                microstateSource,
                checkpoint,
                lesion,
                feedback,
                capsule,
                'real',
                0,
                schedules.real,
                emaAlpha,
                historyWindow,
              );
              const real = runBranch(`,
);

replaceOnce(
  'paired acceleration diagnostics',
  `              const pairedDiagnostics = compareRuns(sham, real);

              branches.push({`,
  `              const pairedDiagnostics = compareRuns(sham, real);
              const accelerationDiagnostics = compareRuns(accelerationOff, real);

              branches.push({`,
);

replaceOnce(
  'real branch acceleration diagnostics',
  `                projectionSha256: stableHash(real.projection),
                pairedDiagnostics,
              });`,
  `                projectionSha256: stableHash(real.projection),
                pairedDiagnostics,
                accelerationDiagnostics,
              });`,
);

replaceOnce(
  'sham branch acceleration diagnostics',
  `                projectionSha256: stableHash(sham.projection),
                pairedDiagnostics: null,
              });`,
  `                projectionSha256: stableHash(sham.projection),
                pairedDiagnostics: null,
                accelerationDiagnostics: null,
              });`,
);

replaceOnce(
  'complete slope sham validation',
  `        const real = normalizedHistory(capsule, 16);
        const shamReceipts = [];
        for (let shamRotation = 1; shamRotation <= 14; shamRotation++) {
          const sham = rotatePreterminal(real, shamRotation);
          if (JSON.stringify(sortedNumeric(real)) !== JSON.stringify(sortedNumeric(sham))) {
            throw new Error(\`Rotation \${shamRotation} failed multiset equality for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
          }
          if (real[real.length - 1] !== sham[sham.length - 1]) {
            throw new Error(\`Rotation \${shamRotation} failed terminal-anchor equality for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
          }
          if (JSON.stringify(real) === JSON.stringify(sham)) {
            throw new Error(\`Rotation \${shamRotation} reproduced the real schedule for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
          }
          shamReceipts.push({ rotation: shamRotation, sha256: stableHash(sham) });
        }
        if (new Set(shamReceipts.map(entry => entry.sha256)).size !== 14) {
          throw new Error(\`Carrier-003D did not produce 14 unique sham schedules for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
        }
        allScheduleReceipts.push({
          pairId: carrierPair.pairId,
          capsuleId: capsule.capsuleId,
          scheduleLength: real.length,
          terminalAnchor: real[real.length - 1],
          realSha256: stableHash(real),
          multisetSha256: stableHash(sortedNumeric(real)),
          shams: shamReceipts,
        });`,
  `        const real = normalizedSlopeHistory(capsule, 16);
        const shamReceipts = [];
        for (let shamRotation = 1; shamRotation <= 14; shamRotation++) {
          const sham = rotateSlopeSchedule(real, shamRotation);
          if (JSON.stringify(sortedNumeric(real)) !== JSON.stringify(sortedNumeric(sham))) {
            throw new Error(\`Rotation \${shamRotation} failed slope-multiset equality for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
          }
          if (JSON.stringify(real) === JSON.stringify(sham)) {
            throw new Error(\`Rotation \${shamRotation} reproduced the real slope schedule for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
          }
          shamReceipts.push({ rotation: shamRotation, sha256: stableHash(sham) });
        }
        if (new Set(shamReceipts.map(entry => entry.sha256)).size !== 14) {
          throw new Error(\`Carrier-003E did not produce 14 unique sham slope schedules for \${carrierPair.pairId}/\${capsule.capsuleId}.\`);
        }
        allScheduleReceipts.push({
          pairId: carrierPair.pairId,
          capsuleId: capsule.capsuleId,
          scheduleLength: real.length,
          currentDualityAnchor: capsule.dEma,
          realSha256: stableHash(real),
          multisetSha256: stableHash(sortedNumeric(real)),
          shams: shamReceipts,
        });`,
);

replaceOnce(
  'slope schedule validation field',
  `        allRotationsPreserveMultisetDurationAndTerminalAnchor: true,`,
  `        allRotationsPreserveSlopeMultisetDurationAndCurrentDualityAnchor: true,`,
);

replaceOnce(
  'acceleration paired aggregation',
  `  const paired = realActiveBranches
    .map(branch => branch.pairedDiagnostics)
    .filter((entry): entry is PairedDiagnostics => entry !== null);

  const sumPaired = (
    key: keyof Pick<
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
    >,
  ): number => paired.reduce((sum, entry) => sum + entry[key], 0);

  const changedWinnerSteps = sumPaired('changedWinnerSteps');
  const changedAdmissionSteps = sumPaired('changedAdmissionSteps');
  const acceptedTimingInducedActions = sumPaired('acceptedCarrierInducedActions');
  const mechanisticTimingEndpointMet =
    changedWinnerSteps > 0 || changedAdmissionSteps > 0 || acceptedTimingInducedActions > 0;`,
  `  const paired = realActiveBranches
    .map(branch => branch.pairedDiagnostics)
    .filter((entry): entry is PairedDiagnostics => entry !== null);
  const accelerationPaired = realActiveBranches
    .map(branch => branch.accelerationDiagnostics)
    .filter((entry): entry is PairedDiagnostics => entry !== null);

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

  const changedWinnerSteps = sumDiagnostics(paired, 'changedWinnerSteps');
  const changedAdmissionSteps = sumDiagnostics(paired, 'changedAdmissionSteps');
  const acceptedTimingInducedActions = sumDiagnostics(paired, 'acceptedCarrierInducedActions');
  const mechanisticTimingEndpointMet =
    changedWinnerSteps > 0 || changedAdmissionSteps > 0 || acceptedTimingInducedActions > 0;
  const accelerationChangedWinnerSteps =
    sumDiagnostics(accelerationPaired, 'changedWinnerSteps');
  const accelerationChangedAdmissionSteps =
    sumDiagnostics(accelerationPaired, 'changedAdmissionSteps');
  const acceptedAccelerationInducedActions =
    sumDiagnostics(accelerationPaired, 'acceptedCarrierInducedActions');
  const mechanisticAccelerationEndpointMet =
    accelerationChangedWinnerSteps > 0 ||
    accelerationChangedAdmissionSteps > 0 ||
    acceptedAccelerationInducedActions > 0;`,
);

replaceOnce(
  'acceleration interpretation',
  `  const interpretation = !mechanisticTimingEndpointMet
    ? 'True and equal-distribution sham signed-slope schedules produced no exact decision or trajectory differences. Slope chronology was not functionally expressed at this resolution.'
    : trueTimelineImproves
      ? 'Signed-slope chronology was functionally causal and the true ordered slope improved pair-generalised target recovery under feedback relative to the equal-distribution sham.'
      : trueTimelineHarms
        ? 'Signed-slope chronology was functionally causal, but the true ordered slope reduced pair-generalised target recovery under feedback relative to the equal-distribution sham.'
        : 'Signed-slope chronology changed reachable decisions and trajectories, but the pair-level recovery interval crosses zero. Directional timing is influential; useful control information is not established.';`,
  `  const interpretation = !mechanisticAccelerationEndpointMet
    ? 'Candidate-projected acceleration changed no exact winner or admission decision relative to the frozen signed-slope law. Recovery efficacy is not interpretable.'
    : !mechanisticTimingEndpointMet
      ? 'Candidate-projected acceleration changed reachable decisions, but true and cyclic-sham prior-slope orders produced no exact differences at this resolution.'
      : trueTimelineImproves
        ? 'Candidate-projected acceleration was functionally causal and true prior-slope chronology improved pair-generalised target recovery under feedback relative to the complete cyclic sham family.'
        : trueTimelineHarms
          ? 'Candidate-projected acceleration was functionally causal, but true prior-slope chronology reduced pair-generalised target recovery under feedback relative to the complete cyclic sham family.'
          : 'Candidate-projected acceleration and prior-slope timing changed reachable decisions, but the pair-level recovery interval crosses zero. Useful higher-order control information is not established.';`,
);

replaceOnce(
  'acceleration preregistration',
  `      primaryDirectionalEndpoint:
        'Pair-level mean target recovery difference under feedback: Delta_Z1 = Y(true ordered signed-slope history)-Y(equal-distribution cyclic-sham signed-slope history), preregistered positive.',
      mechanisticEndpoint:
        'At least one exact paired winner or admission decision changes while true-slope and sham-slope branches share the same pre-state.',
      scheduleLength: 16,
      exposureSteps: 16,`,
  `      primaryDirectionalEndpoint:
        'Pair-level mean target recovery difference under feedback: Delta_Z1 = Y(true ordered candidate acceleration)-Y(cyclic-sham prior-slope acceleration), preregistered positive.',
      mechanisticEndpoint:
        'At least one exact winner or admission decision changes when acceleration is activated over the frozen Carrier-003C signed-slope law.',
      timingEndpoint:
        'At least one exact paired winner or admission decision changes while true and sham prior-slope branches share the same pre-state.',
      scheduleLength: 15,
      exposureSteps: 15,`,
);

replaceOnce(
  'acceleration sham wording',
  `      shamConstruction:
        \`Left-pad each capsule EMA history to 16 with its earliest value; rotate the first 15 positions left by \${rotation}; preserve the terminal dEma exactly.\`,
      marginalEquality:
        'Real and sham schedules have the exact same value multiset, duration, total exposure and terminal anchor.',
      postExposureDynamics:
        'After step 16, both branches continue with the endogenous Carrier-003C native projected-slope capsule update.',
      coefficient: 0.5,`,
  `      shamConstruction:
        \`Derive fifteen realised slopes from the normalized sixteen-value EMA history; rotate all fifteen slopes left by \${rotation}; keep the native current EMA anchor unchanged.\`,
      marginalEquality:
        'Real and sham schedules have the exact same slope multiset, duration and total exposure; capsule, current EMA anchor, wounds, candidates, feedback and random streams remain fixed.',
      postExposureDynamics:
        'After step 15, both branches continue with endogenous previous velocity from the evolving capsule history.',
      slopeCoefficient: 0.5,
      accelerationCoefficient: 0.5,`,
);

replaceOnce(
  'acceleration scale',
  `      totalBranchRuns: branches.length,
      activeTimingBranchRuns: branches.filter(branch => branch.timingActive === 1).length,`,
  `      totalBranchRuns: branches.length + realActiveBranches.length,
      accelerationOffBranchRuns: realActiveBranches.length,
      activeTimingBranchRuns: branches.filter(branch => branch.timingActive === 1).length,`,
);

replaceOnce(
  'acceleration dynamics',
  `      comparablePreStateSteps: sumPaired('comparablePreStateSteps'),
      changedWinnerSteps,
      changedAdmissionSteps,
      acceptedTimingInducedActions,
      shamHoldToRealSwap: sumPaired('holdToSwap'),
      shamSwapToRealHold: sumPaired('swapToHold'),
      shamSwapToDifferentRealSwap: sumPaired('swapToSwap'),
      otherWinnerChanges: sumPaired('otherWinnerChanges'),
      realStateDivergenceCount: paired.filter(
        entry => entry.firstStateDivergenceStep !== null,
      ).length,
      realReconvergenceCount: paired.filter(entry => entry.everReconverged).length,
      reconvergenceEvents: sumPaired('reconvergenceEvents'),
      mechanisticTimingEndpointMet,`,
  `      comparablePreStateSteps: sumDiagnostics(paired, 'comparablePreStateSteps'),
      changedWinnerSteps,
      changedAdmissionSteps,
      acceptedTimingInducedActions,
      shamHoldToRealSwap: sumDiagnostics(paired, 'holdToSwap'),
      shamSwapToRealHold: sumDiagnostics(paired, 'swapToHold'),
      shamSwapToDifferentRealSwap: sumDiagnostics(paired, 'swapToSwap'),
      otherWinnerChanges: sumDiagnostics(paired, 'otherWinnerChanges'),
      realStateDivergenceCount: paired.filter(
        entry => entry.firstStateDivergenceStep !== null,
      ).length,
      realReconvergenceCount: paired.filter(entry => entry.everReconverged).length,
      reconvergenceEvents: sumDiagnostics(paired, 'reconvergenceEvents'),
      mechanisticTimingEndpointMet,
      accelerationComparablePreStateSteps:
        sumDiagnostics(accelerationPaired, 'comparablePreStateSteps'),
      accelerationChangedWinnerSteps,
      accelerationChangedAdmissionSteps,
      acceptedAccelerationInducedActions,
      accelerationStateDivergenceCount: accelerationPaired.filter(
        entry => entry.firstStateDivergenceStep !== null,
      ).length,
      accelerationReconvergenceCount: accelerationPaired.filter(
        entry => entry.everReconverged,
      ).length,
      accelerationReconvergenceEvents:
        sumDiagnostics(accelerationPaired, 'reconvergenceEvents'),
      mechanisticAccelerationEndpointMet,`,
);

replaceOnce(
  'next experiment wording',
  `    nextExperiment:
      'Aggregate all 14 preregistered Carrier-003D rotation summaries before selecting any next mechanism or held-out test.',`,
  `    nextExperiment:
      'Aggregate all 14 preregistered Carrier-003E rotations before deciding whether candidate-projected acceleration earns held-out generalisation.',`,
);

generated = generated
  .replaceAll('Carrier-003D', 'Carrier-003E')
  .replaceAll('EMERGE-CARRIER-003D', 'EMERGE-CARRIER-003E')
  .replaceAll('carrier-003d', 'carrier-003e')
  .replaceAll('emerge-carrier-003d', 'emerge-carrier-003e')
  .replaceAll('signed-slope timing', 'candidate-acceleration timing')
  .replaceAll('timing schedule', 'prior-slope schedule');

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
