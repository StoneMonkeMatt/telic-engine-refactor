/**
 * PROPOSAL SELECTION
 * 
 * This module implements the decision logic for choosing the winning proposal 
 * from a ranked set of candidates. It utilizes a simulated annealing approach 
 * (Metropolis-Hastings criterion) to balance exploration and exploitation, 
 * allowing for stochastic acceptance of lower-scoring candidates based on 
 * the current simulation temperature.
 */
import { RankedProposal, ProposalSelection } from '../../types';

/**
 * [PROPOSAL SELECTION / TIE-BREAK BEHAVIOR]
 * Chooses the winning proposal from the ranked candidate set.
 * Implements the simulated annealing / Metropolis-Hastings criterion.
 */
export function selectProposal(
  ranked: RankedProposal[],
  currentTemp: number,
  rng: { next: () => number }
): ProposalSelection {
  const randomIdx = Math.floor(rng.next() * ranked.length);
  const proposal = ranked[randomIdx];
  const deltaScore = proposal.deltaScore;

  // Metropolis-Hastings criterion
  const passCriterion = deltaScore > 0 || Math.log(rng.next()) < deltaScore / (currentTemp + 1e-6);
  
  // A proposal is "accepted" as a meaningful change if it passes the criterion 
  // AND it's not a 'none' proposal.
  const accepted = passCriterion && proposal.type !== 'none';

  return {
    selected: proposal,
    accepted: accepted,
    method: 'metropolis-hastings'
  };
}
