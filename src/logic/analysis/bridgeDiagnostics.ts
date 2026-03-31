/**
 * BRIDGE DIAGNOSTICS
 * 
 * This module provides utilities for analyzing bridge activations and their 
 * impact on the simulation's structural evolution. It helps identify 
 * cross-domain connectivity and the influence of bridge families.
 */
import { BridgeEvent, BridgeDiagnostic } from '../../types';

/**
 * [BRIDGE DIAGNOSTIC CREATION]
 * Creates a structured diagnostic entry for a bridge activation.
 */
export function createBridgeDiagnostic(
  step: number,
  bridgeKey: string,
  strength: number,
  deltaTelic: number,
  deltaCoherence: number
): BridgeDiagnostic {
  return {
    step,
    bridgeKey,
    activationStrength: strength,
    deltaTelic,
    deltaCoherence
  };
}

/**
 * [BRIDGE ACTIVITY SUMMARY]
 * Summarizes bridge events for a given step or set of events.
 */
export function summarizeBridgeActivity(events: BridgeEvent[]) {
  const families = new Set<string>();
  let totalDeltaScore = 0;
  let acceptedCount = 0;

  events.forEach(e => {
    families.add(e.bridgeKey);
    if (e.accepted) {
      acceptedCount++;
      totalDeltaScore += e.deltaScore;
    }
  });

  return {
    activeFamilies: Array.from(families),
    acceptedCount,
    totalDeltaScore,
    intensity: events.length > 0 ? totalDeltaScore / events.length : 0
  };
}

/**
 * [BRIDGE IMPACT ANALYSIS]
 * Determines if bridge activity was a significant factor in the current step.
 */
export function wasBridgeDecisive(events: BridgeEvent[]): boolean {
  // Heuristic: Bridge was decisive if an accepted bridge event contributed positive delta score.
  return events.some(e => e.accepted && e.deltaScore > 0);
}

/**
 * [FAMILY TRACING]
 * Groups bridge events by their family (bridgeKey).
 */
export function groupEventsByFamily(events: BridgeEvent[]): Record<string, BridgeEvent[]> {
  const groups: Record<string, BridgeEvent[]> = {};
  events.forEach(e => {
    if (!groups[e.bridgeKey]) groups[e.bridgeKey] = [];
    groups[e.bridgeKey].push(e);
  });
  return groups;
}
