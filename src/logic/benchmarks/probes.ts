/**
 * BENCHMARK PROBES
 * 
 * This module provides utilities for defining and running reproducible 
 * comparison probes. It enables deterministic benchmarking by ensuring 
 * that initial states, seeds, and selection contexts are explicitly 
 * controlled across multiple runs.
 */
import { Telos } from '../telos';
import { Codex } from '../codex';
import { 
  TelosParams, 
  SimulationResults, 
  ProbeMetadata 
} from '../../types';

/**
 * [PROBE DEFINITION]
 * Represents a controlled comparison between two initial states 
 * under the same deterministic parameters.
 */
export interface ComparisonProbe {
  id: string;
  name: string;
  seed: number;
  params: TelosParams;
  initialStateA: string[];
  initialStateB: string[];
}

/**
 * [PROBE DEFINITION]
 * Helper to define a comparison probe.
 */
export function defineComparisonProbe(
  id: string,
  name: string,
  seed: number,
  params: TelosParams,
  initialStateA: string[],
  initialStateB: string[]
): ComparisonProbe {
  return { id, name, seed, params, initialStateA, initialStateB };
}

/**
 * [PROBE METADATA CREATION]
 * Helper to create a structured ProbeMetadata object.
 */
export function createProbeMetadata(
  id: string,
  family: string,
  role: string,
  version: string = '1.0.0',
  sourceHash: string = '',
  sourceTitle: string = '',
  sourcePreview: string = ''
): ProbeMetadata {
  return {
    probeId: id,
    probeFamily: family,
    probeRole: role,
    probeVersion: version,
    sourceTextHash: sourceHash,
    sourceTextTitle: sourceTitle,
    sourceTextPreview: sourcePreview
  };
}

/**
 * [DETERMINISTIC COMPARISON RUNNER]
 * Runs a comparison probe and returns the results for both branches.
 * This ensures that both runs use the same seed and parameters, 
 * making the comparison stable and reproducible.
 */
export function runComparisonProbe(
  codex: Codex,
  probe: ComparisonProbe,
  steps: number = 30
): { resultA: SimulationResults; resultB: SimulationResults } {
  // We create two separate engine instances with the same seed 
  // to ensure deterministic selection behavior in both branches.
  const engineA = new Telos(codex, { ...probe.params, seed: probe.seed });
  const engineB = new Telos(codex, { ...probe.params, seed: probe.seed });

  const resultA = engineA.run(probe.initialStateA, steps);
  const resultB = engineB.run(probe.initialStateB, steps);

  return { resultA, resultB };
}

/**
 * [STABILITY PROBE]
 * Runs the same initial state multiple times with the same seed 
 * to verify engine stability and determinism.
 */
export function verifyStability(
  codex: Codex,
  initialState: string[],
  params: TelosParams,
  seed: number,
  steps: number = 30,
  runs: number = 2
): boolean {
  const results: string[][] = [];

  for (let i = 0; i < runs; i++) {
    const engine = new Telos(codex, { ...params, seed });
    const result = engine.run(initialState, steps);
    results.push(result.history[result.history.length - 1].sequence);
  }

  // Check if all final sequences are identical
  const first = results[0].join('|');
  return results.every(r => r.join('|') === first);
}
