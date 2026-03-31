/**
 * REPRODUCIBILITY HELPERS
 * 
 * This module provides utilities for capturing and normalizing the metadata 
 * required to reproduce a specific simulation run. It ensures that all 
 * parameters, seeds, and initial states are explicitly recorded.
 */
import { 
  TelosParams, 
  ReproducibilityMetadata, 
  TieBreakContext 
} from '../../types';

/**
 * [REPRODUCIBILITY METADATA]
 * Captures the full set of parameters and initial state required to 
 * recreate a simulation run.
 */
export function captureReproducibilityMetadata(
  params: TelosParams,
  initialSequence: string[],
  engineVersion: string = '1.0.0'
): ReproducibilityMetadata {
  return {
    seed: params.seed || 0,
    engineVersion,
    params: { ...params },
    initialSequence: [...initialSequence]
  };
}

/**
 * [SELECTION CONTEXT NORMALIZATION]
 * Normalizes the context required for deterministic selection/tie-breaking 
 * at a specific step in the simulation.
 */
export function createTieBreakContext(
  seed: number,
  step: number,
  currentSequence: string[]
): TieBreakContext {
  return {
    seed,
    step,
    currentSequence: [...currentSequence]
  };
}

/**
 * [DETERMINISTIC HASHING]
 * A simple helper to generate a stable numeric hash from a string sequence.
 * This can be used as a secondary tie-break factor to ensure stability 
 * across different environments if the global RNG is not sufficient.
 */
export function sequenceHash(sequence: string[]): number {
  const str = sequence.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
