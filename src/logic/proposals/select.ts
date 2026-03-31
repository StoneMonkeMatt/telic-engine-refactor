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
  // Currently, we consider all ranked candidates as eligible for the selection pool.
  // In future iterations, this might filter by score thresholds or validity.
  const eligible = ranked; 

  // 2. [TIE-RESOLUTION / CANDIDATE SELECTION]
  // We pick a candidate from the eligible pool. 
  // Currently, this is a random pick from the entire set (implicit tie-break).
  const selected = resolveTie(eligible, tieBreakContext, rng);

  // 3. [ACCEPTANCE CHECK (ELIGIBILITY FOR STATE TRANSITION)]
  // We determine if the selected candidate is accepted as the next state.
  const accepted = checkEligibility(selected, currentTemp, rng);

  return {
    selected,
    accepted,
    method: 'metropolis-hastings',
    tieBreakApplied: eligible.length > 1
  };
}
