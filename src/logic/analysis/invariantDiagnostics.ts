/**
 * INVARIANT DIAGNOSTICS
 * 
 * This module provides utilities for analyzing engine invariants, specifically 
 * focusing on kernel preservation and structural stability. It helps identify 
 * when transitions support or erode the simulation's core constraints.
 */
import { InvariantDiagnostic } from '../../types';

/**
 * [INVARIANT DIAGNOSTIC CREATION]
 * Creates a structured diagnostic entry for an invariant check.
 */
export function createInvariantDiagnostic(
  step: number,
  invariantId: string,
  status: 'preserved' | 'violated' | 'warned',
  currentValue: number,
  threshold: number
): InvariantDiagnostic {
  return {
    step,
    invariantId,
    status,
    currentValue,
    threshold
  };
}

/**
 * [KERNEL PRESERVATION ANALYSIS]
 * Analyzes how a transition affected the kernel purity of the sequence.
 */
export function analyzeKernelPreservation(
  beforePurity: number,
  afterPurity: number,
  threshold: number
) {
  const delta = afterPurity - beforePurity;
  const status = afterPurity < threshold ? 'violated' : (afterPurity < threshold + 0.1 ? 'warned' : 'preserved');
  
  return {
    beforePurity,
    afterPurity,
    delta,
    status,
    isEroding: delta < 0,
    isSupporting: delta > 0
  };
}

/**
 * [TRANSITION CLASSIFICATION]
 * Classifies a transition based on its impact on engine stability.
 */
export function classifyTransition(
  kernelDelta: number,
  telicDelta: number
): 'supporting' | 'eroding' | 'neutral' | 'trade-off' {
  if (kernelDelta > 0 && telicDelta >= 0) return 'supporting';
  if (kernelDelta < 0 && telicDelta <= 0) return 'eroding';
  if (kernelDelta < 0 && telicDelta > 0) return 'trade-off';
  if (kernelDelta > 0 && telicDelta < 0) return 'trade-off';
  return 'neutral';
}

/**
 * [STABILITY IMPACT]
 * Determines if a structural change was meaningful for stability.
 */
export function isMeaningfulStabilityChange(
  beforePurity: number,
  afterPurity: number,
  threshold: number
): boolean {
  // Meaningful if it crosses the threshold or has a significant delta
  const crossedThreshold = (beforePurity >= threshold && afterPurity < threshold) || 
                           (beforePurity < threshold && afterPurity >= threshold);
  const significantDelta = Math.abs(afterPurity - beforePurity) > 0.05;
  
  return crossedThreshold || significantDelta;
}
