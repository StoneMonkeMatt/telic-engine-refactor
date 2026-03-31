/**
 * PROPOSAL FRONTIER
 * 
 * This module orchestrates the construction of the "candidate frontier"—the set 
 * of all possible next-state transitions considered during a single simulation 
 * step. It selects the appropriate agent generation strategy (Flat or Stratified) 
 * based on the simulation's architecture mode.
 */
import { ProposalCandidate, ProposalFrontier } from '../../types';
import { AgentContext, generateFlatProposals, generateStratifiedProposals } from './agents';

export interface FrontierContext extends AgentContext {
  architectureMode: 'stratified' | 'flat';
}

/**
 * [CANDIDATE FRONTIER BUILDING]
 * Constructs the set of possible next-state candidates based on the current architecture mode.
 */
export function buildProposalFrontier(seq: string[], step: number, ctx: FrontierContext): ProposalFrontier {
  let candidates: ProposalCandidate[];
  
  if (ctx.architectureMode === 'stratified') {
    candidates = generateStratifiedProposals(seq, ctx);
  } else {
    candidates = generateFlatProposals(seq, ctx);
  }

  return {
    step,
    currentSequence: [...seq],
    candidates
  };
}
