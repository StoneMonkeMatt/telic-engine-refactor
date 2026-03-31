/**
 * PROPOSAL DIAGNOSTICS
 * 
 * This module provides utilities for analyzing and explaining the proposal 
 * generation and selection process. It helps identify why certain candidates 
 * were considered, how they were ranked, and the logic behind the final choice.
 */
import { 
  ProposalFrontier, 
  RankedProposal, 
  DeterministicSelectionResult,
  ProposalDiagnostic
} from '../../types';

/**
 * [FRONTIER ANALYSIS]
 * Summarizes the proposal frontier for diagnostics.
 * Explains which proposals were considered and their distribution.
 */
export function summarizeFrontier(frontier: ProposalFrontier) {
  const typeCounts: Record<string, number> = {};
  const agentCounts: Record<string, number> = {};
  
  frontier.candidates.forEach(c => {
    typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
    agentCounts[c.agent] = (agentCounts[c.agent] || 0) + 1;
  });

  return {
    step: frontier.step,
    totalCandidates: frontier.candidates.length,
    typeDistribution: typeCounts,
    agentDistribution: agentCounts
  };
}

/**
 * [RANKING ANALYSIS]
 * Identifies the highest ranked candidates from a set.
 */
export function getTopCandidates(ranked: RankedProposal[], limit: number = 5): RankedProposal[] {
  return [...ranked]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * [SELECTION EXPLANATION]
 * Explains the selection outcome of a step.
 * Connects the winning candidate to the tie-break reasoning and eligibility.
 */
export function explainSelection(
  selection: DeterministicSelectionResult,
  eligibleCount: number
) {
  return {
    selectedType: selection.selected.type,
    selectedAgent: selection.selected.agent,
    accepted: selection.accepted,
    tieBreakApplied: selection.tieBreakApplied,
    eligiblePoolSize: eligibleCount,
    reasoning: selection.reasoning,
    method: selection.method
  };
}

/**
 * [CANDIDATE TRACING]
 * Creates a diagnostic entry for a single candidate's outcome.
 */
export function createProposalDiagnostic(
  step: number,
  candidate: RankedProposal,
  accepted: boolean,
  rejectionReason?: string
): ProposalDiagnostic {
  return {
    step,
    candidateType: candidate.type,
    agent: candidate.agent,
    score: candidate.score,
    deltaScore: candidate.deltaScore,
    accepted,
    tieBreak: undefined, // Can be populated if this was the selected candidate
    rejectionReason
  };
}
