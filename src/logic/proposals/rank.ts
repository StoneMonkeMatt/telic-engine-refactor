/**
 * PROPOSAL RANKING
 * 
 * This module evaluates and ranks the candidates within a proposal frontier. 
 * It calculates the telic score, duality, and coherence for each candidate, 
 * and applies specific penalties or bonuses (e.g., complexity penalties or 
 * stabilization bonuses) to determine the final deltaScore used for selection.
 */
import { ProposalFrontier, RankedProposal } from '../../types';

export interface Scorer {
  telicScore: (seq: string[]) => number;
  computeRawDuality: (seq: string[]) => number;
  coherence: (seq: string[]) => number;
}

/**
 * [CANDIDATE RANKING / EVALUATION]
 * Evaluates and ranks all candidates in the frontier.
 * Currently preserves the specific delta scoring logic from the original Telos engine.
 */
export function rankProposals(frontier: ProposalFrontier, scorer: Scorer): RankedProposal[] {
  const { currentSequence, candidates } = frontier;
  const currentScore = scorer.telicScore(currentSequence);
  const currentRawD = scorer.computeRawDuality(currentSequence);
  const currentPhi = scorer.coherence(currentSequence);

  // [DETERMINISM BOUNDARY] Candidate order is preserved from the frontier.
  // No explicit tie-breaking occurs here; candidates are mapped in their original order.
  return candidates.map(proposal => {
    const candidate = proposal.sequence;
    const candidateScore = scorer.telicScore(candidate);
    const candidateRawD = scorer.computeRawDuality(candidate);
    const candidatePhi = scorer.coherence(candidate);

    // Base delta
    let deltaScore = candidateScore - currentScore;

    // Task 2: Penalize harmful inserts
    if (candidate.length > currentSequence.length) {
      const dualityLoss = Math.max(0, currentRawD - candidateRawD);
      const coherenceLoss = Math.max(0, currentPhi - candidatePhi);
      const qualityPenalty = (dualityLoss * 0.5) + (coherenceLoss * 0.3);
      deltaScore -= qualityPenalty;
    }

    // Task 4: Encourage stabilization
    if (proposal.type === 'none') {
      deltaScore += 0.01;
    } else if (proposal.type === 'swap') {
      deltaScore += 0.005;
    }

    return {
      ...proposal,
      score: candidateScore,
      rawDuality: candidateRawD,
      coherence: candidatePhi,
      deltaScore
    };
  });
}
