/**
 * PROPOSAL SELECTION
 * 
 * This module implements the decision logic for choosing the winning proposal 
 * from a ranked set of candidates. It utilizes a simulated annealing approach 
 * (Metropolis-Hastings criterion) to balance exploration and exploitation, 
 * allowing for stochastic acceptance of lower-scoring candidates based on 
 * the current simulation temperature.
 */
import { 
  RankedProposal, 
  DeterministicSelectionInput, 
  DeterministicSelectionResult 
} from '../../types';
import { resolveTie } from '../selection/tiebreak';
import { checkEligibility } from '../selection/eligibility';

/**
 * [PROPOSAL SELECTION / TIE-BREAK BEHAVIOR]
 * Chooses the winning proposal from the ranked candidate set.
 * Implements the simulated annealing / Metropolis-Hastings criterion.
 * 
 * @param input The deterministic selection input containing ranked candidates and context.
 * @param rng The random number generator for stochastic selection.
 * @returns A deterministic selection result.
 */
export function selectProposal(
  input: DeterministicSelectionInput,
  rng: { next: () => number }
): DeterministicSelectionResult {
  const { ranked, currentTemp, tieBreakContext } = input;

  // [PHASE 2: ORCHESTRATION]
  // 1. [CANDIDATE ELIGIBILITY FILTERING]
  // We identify the best score in the ranked set.
  const maxScore = Math.max(...ranked.map(c => c.score));
  
  // We only consider candidates that have the maximum score as eligible for tie-breaking.
  // This ensures that we always favor the highest-scoring proposals.
  const eligible = ranked.filter(c => c.score === maxScore); 

  // 2. [TIE-RESOLUTION / CANDIDATE SELECTION]
  // We pick a candidate from the eligible pool (the tied best candidates) 
  // using a stable deterministic policy.
  const { selected, reasoning } = resolveTie(eligible, tieBreakContext);

  // 3. [ACCEPTANCE CHECK (ELIGIBILITY FOR STATE TRANSITION)]
  // We determine if the selected candidate is accepted as the next state.
  const accepted = checkEligibility(selected, currentTemp, rng);

  return {
    selected,
    accepted,
    method: 'metropolis-hastings',
    tieBreakApplied: eligible.length > 1,
    reasoning
  };
}
