/**
 * TIE-BREAK BEHAVIOR
 * 
 * This module provides explicit logic for resolving ties between candidates 
 * with equal scores or ranks. Currently, it encapsulates the random selection 
 * behavior used to pick a candidate from the ranked frontier, preparing it 
 * for future deterministic and stable tie-breaking policies.
 */
import { RankedProposal, TieBreakContext } from '../../types';

/**
 * [TIE-BREAK BEHAVIOR]
 * Resolves ties by picking a candidate from the provided set.
 * Currently preserves the random selection behavior of the engine.
 * 
 * @param candidates The set of candidates to choose from.
 * @param context Contextual information (seed, step, etc.) for deterministic resolution.
 * @param rng The random number generator for stochastic selection.
 */
export function resolveTie(
  candidates: RankedProposal[], 
  context: TieBreakContext,
  rng: { next: () => number }
): RankedProposal {
  if (candidates.length === 0) {
    throw new Error("Cannot resolve tie for empty candidate set");
  }

  // Current behavior: random selection from the pool.
  // This is the locus of implicit tie-breaking for equal-score candidates.
  // The context is provided here to enable future stable/deterministic policies.
  const idx = Math.floor(rng.next() * candidates.length);
  return candidates[idx];
}
