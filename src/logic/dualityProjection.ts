export interface DualityProjectionScorer {
  coherence: (seq: string[]) => number;
  information: (seq: string[]) => number;
  computeRawDuality: (seq: string[]) => number;
}

export interface DualityProjectionParams {
  lambda: number;
  eta: number;
  epsilon: number;
  alpha: number;
}

export interface DualityProjection {
  coherence: number;
  information: number;
  rawDuality: number;
  force: number;
  targetDuality: number;
  nextDuality: number;
  velocity: number;
}

export interface DualityAccelerationProjection {
  projection: DualityProjection;
  previousDuality: number;
  previousVelocity: number;
  acceleration: number;
}

export type DualityBoundaryDirection = -1 | 0 | 1;

export interface DualityBoundaryTransitionProjection {
  projection: DualityProjection;
  threshold: number;
  currentQualifies: boolean;
  projectedQualifies: boolean;
  direction: DualityBoundaryDirection;
}

export const NATIVE_DUALITY_PROJECTION_PARAMS: Readonly<DualityProjectionParams> = {
  lambda: 0.618,
  eta: 0.3,
  epsilon: 0.05,
  alpha: 0.2,
};

export function projectDualityUpdate(
  scorer: DualityProjectionScorer,
  previousDuality: number,
  sequence: string[],
  params: DualityProjectionParams = NATIVE_DUALITY_PROJECTION_PARAMS,
): DualityProjection {
  const coherence = scorer.coherence(sequence);
  const information = scorer.information(sequence);
  const rawDuality = scorer.computeRawDuality(sequence);
  const force =
    params.lambda * coherence +
    params.eta * information +
    params.epsilon;
  const targetDuality = Math.min(1, rawDuality * (1 + force * 0.2));
  const unclampedNext =
    previousDuality + (targetDuality - previousDuality) * params.alpha;
  const nextDuality = Math.max(0, Math.min(1, unclampedNext));

  return {
    coherence,
    information,
    rawDuality,
    force,
    targetDuality,
    nextDuality,
    velocity: nextDuality - previousDuality,
  };
}

export function projectDualityAcceleration(
  scorer: DualityProjectionScorer,
  currentDuality: number,
  previousDuality: number,
  sequence: string[],
  params: DualityProjectionParams = NATIVE_DUALITY_PROJECTION_PARAMS,
): DualityAccelerationProjection {
  const projection = projectDualityUpdate(
    scorer,
    currentDuality,
    sequence,
    params,
  );
  const previousVelocity = currentDuality - previousDuality;

  return {
    projection,
    previousDuality,
    previousVelocity,
    acceleration: projection.velocity - previousVelocity,
  };
}

export function classifyDualityBoundaryTransition(
  currentDuality: number,
  nextDuality: number,
  threshold: number,
): DualityBoundaryDirection {
  const currentQualifies = currentDuality >= threshold;
  const nextQualifies = nextDuality >= threshold;
  if (currentQualifies === nextQualifies) return 0;
  return nextQualifies ? 1 : -1;
}

export function projectDualityBoundaryTransition(
  scorer: DualityProjectionScorer,
  currentDuality: number,
  sequence: string[],
  threshold: number,
  params: DualityProjectionParams = NATIVE_DUALITY_PROJECTION_PARAMS,
): DualityBoundaryTransitionProjection {
  const projection = projectDualityUpdate(
    scorer,
    currentDuality,
    sequence,
    params,
  );
  const currentQualifies = currentDuality >= threshold;
  const projectedQualifies = projection.nextDuality >= threshold;
  const direction = classifyDualityBoundaryTransition(
    currentDuality,
    projection.nextDuality,
    threshold,
  );

  return {
    projection,
    threshold,
    currentQualifies,
    projectedQualifies,
    direction,
  };
}
