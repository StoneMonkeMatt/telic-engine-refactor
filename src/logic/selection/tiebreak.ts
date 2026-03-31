/**
 * TIE-BREAK BEHAVIOR
 * 
 * This module provides explicit logic for resolving ties between candidates 
 * with equal scores or ranks. Currently, it encapsulates the random selection 
 * behavior used to pick a candidate from the ranked frontier, preparing it 
 * for future deterministic and stable tie-breaking policies.
 */
import { RankedProposal, TieBreakContext, TieBreakReasoning } from '../../types';
import { sequenceHash } from '../benchmarks/reproducibility';

/**
 * [TIE-BREAK BEHAVIOR]
 * Resolves ties by picking a candidate from the provided set using a stable 
 * deterministic policy. This replaces the previous random selection to 
 * ensure reproducibility and explicit selection reasoning.
 * 
 * @param candidates The set of candidates to choose from.
 * @param context Contextual information (seed, step, etc.) for deterministic resolution.
 * @returns An object containing the selected candidate and the reasoning for the selection.
 */
export function resolveTie(
  candidates: RankedProposal[], 
  context: TieBreakContext
): { selected: RankedProposal; reasoning: TieBreakReasoning } {
  if (candidates.length === 0) {
    throw new Error("Cannot resolve tie for empty candidate set");
  }

  // 1. [STABLE SORTING]
  // We sort the candidates by a composite key to ensure a stable ordering 
  // regardless of their original position in the array.
  const sorted = [...candidates].sort((a, b) => {
    // Primary: Score (descending) - though they are likely tied if we are here
    if (b.score !== a.score) return b.score - a.score;
    
    // Secondary: Type (alphabetical)
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    
    // Tertiary: Agent (alphabetical)
    if (a.agent !== b.agent) return a.agent.localeCompare(b.agent);
    
    // Quaternary: Sequence Hash (numeric)
    return sequenceHash(a.sequence) - sequenceHash(b.sequence);
  });

  // 2. [DETERMINISTIC SELECTION]
  // We use the simulation seed and step to pick an index from the sorted pool.
  // This ensures the choice is stable and reproducible for the same step/seed.
  const poolSize = sorted.length;
  const winnerIndex = (context.seed + context.step) % poolSize;
  const selected = sorted[winnerIndex];

  // 3. [STABLE REASONING]
  // We capture the reasoning for the selection to enable diagnostics.
  const reasoning: TieBreakReasoning = {
    strategy: 'stable-seeded-index',
    winnerIndex,
    poolSize,
    stableSortKey: `${selected.type}|${selected.agent}|${sequenceHash(selected.sequence)}`,
    notes: `Selected candidate ${winnerIndex + 1} of ${poolSize} from stable sorted pool.`
  };

  return { selected, reasoning };
}
