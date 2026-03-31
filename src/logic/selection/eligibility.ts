/**
 * CANDIDATE ELIGIBILITY
 * 
 * This module defines the criteria that a proposal must meet to be considered 
 * "eligible" for acceptance as the next state in the simulation. 
 * It separates the logic of "who can win" (eligibility) from "who does win" (selection).
 * 
 * Currently, it implements the Metropolis-Hastings criterion used in 
 * simulated annealing.
 */
import { RankedProposal } from '../../types';

/**
 * [CANDIDATE ELIGIBILITY]
 * Determines if a proposal passes the acceptance criteria for the current step.
 * Implements the stochastic Metropolis-Hastings check.
 */
export function checkEligibility(
  proposal: RankedProposal,
  currentTemp: number,
  rng: { next: () => number }
): boolean {
  const deltaScore = proposal.deltaScore;

  // [RANDOMNESS ENTRY / SEED-DEPENDENT BEHAVIOR]
  // Metropolis-Hastings criterion: 
  // 1. Always accept improvements (deltaScore > 0).
  // 2. Stochastically accept regressions based on temperature.
  const passCriterion = deltaScore > 0 || Math.log(rng.next()) < deltaScore / (currentTemp + 1e-6);

  // A proposal is "eligible" for acceptance if it passes the criterion 
  // AND it represents a meaningful change (not a 'none' proposal).
  return passCriterion && proposal.type !== 'none';
}
