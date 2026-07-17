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
