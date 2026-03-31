/**
 * PROPOSAL AGENTS
 * 
 * This module defines the specialized agents responsible for generating candidate 
 * sequence mutations. Each agent (e.g., Preserver, Catalyst, Synthesizer) 
 * implements a specific strategy for exploring the state space, such as focusing 
 * on kernel symbols, semantic bridges, or peripheral complexity.
 * 
 * Agents produce ProposalCandidate objects that are later collected into a 
 * frontier for evaluation.
 */
import { ProposalCandidate } from '../../types';
import { Codex } from '../codex';

export interface AgentContext {
  codex: Codex;
  rng: { next: () => number };
  maxSequenceLength: number;
}

/**
 * [PROPOSAL GENERATION]
 * Identifies if a glyph belongs to the kernel set.
 */
export function isKernel(glyph: string): boolean {
  const kernelGlyphs = ["⚓", "🐋", "⛓️", "💀", "🕯️", "🕳️", "🌪️", "🧘", "🦁", "🌿", "🎯", "👁️"];
  return kernelGlyphs.includes(glyph);
}

/**
 * [PROPOSAL GENERATION]
 * Flat agent logic: balanced random mutations.
 */
export function generateFlatProposals(seq: string[], ctx: AgentContext): ProposalCandidate[] {
  const { codex, rng, maxSequenceLength } = ctx;
  const proposals: ProposalCandidate[] = [
    { type: 'none', sequence: [...seq], agent: 'Flat' }
  ];

  // Insert
  if (seq.length < maxSequenceLength) {
    const next = [...seq];
    const pos = Math.floor(rng.next() * (seq.length + 1));
    const allGlyphs = codex.symbols.symbols.map(s => s.glyph);
    next.splice(pos, 0, allGlyphs[Math.floor(rng.next() * allGlyphs.length)]);
    proposals.push({ type: 'insert', sequence: next, agent: 'Flat' });
  }

  // Delete
  if (seq.length > 1) {
    const next = [...seq];
    const pos = Math.floor(rng.next() * seq.length);
    next.splice(pos, 1);
    proposals.push({ type: 'delete', sequence: next, agent: 'Flat' });
  }

  // Combine
  if (seq.length >= 2) {
    const pos = Math.floor(rng.next() * (seq.length - 1));
    const combined = codex.combine(seq[pos], seq[pos + 1]);
    const next = [...seq.slice(0, pos), combined, ...seq.slice(pos + 2)];
    proposals.push({ type: 'combine', sequence: next, agent: 'Flat' });
  }

  // Swap
  if (seq.length >= 2) {
    const next = [...seq];
    const idx1 = Math.floor(rng.next() * seq.length);
    let idx2 = Math.floor(rng.next() * seq.length);
    while (idx1 === idx2) idx2 = Math.floor(rng.next() * seq.length);
    [next[idx1], next[idx2]] = [next[idx2], next[idx1]];
    proposals.push({ type: 'swap', sequence: next, agent: 'Flat' });
  }

  return proposals;
}

/**
 * [PROPOSAL GENERATION]
 * Stratified multi-agent logic: specialized roles.
 */
export function generateStratifiedProposals(seq: string[], ctx: AgentContext): ProposalCandidate[] {
  const { codex, rng, maxSequenceLength } = ctx;
  const proposals: ProposalCandidate[] = [
    { type: 'none', sequence: [...seq], agent: 'System' }
  ];

  const allGlyphs = codex.symbols.symbols.map(s => s.glyph);
  const kernelGlyphs = allGlyphs.filter(g => isKernel(g));
  const peripheryGlyphs = allGlyphs.filter(g => !isKernel(g));

  // 1. Preserver / Anchor (Kernel focus)
  if (seq.length < maxSequenceLength) {
    const next = [...seq];
    const pos = Math.floor(rng.next() * (seq.length + 1));
    next.splice(pos, 0, kernelGlyphs[Math.floor(rng.next() * kernelGlyphs.length)]);
    proposals.push({ type: 'insert', sequence: next, agent: 'Preserver' });
  }
  if (seq.length > 1) {
    // Delete non-kernel
    const nonKernelIndices = seq.map((s, i) => isKernel(s) ? -1 : i).filter(i => i !== -1);
    if (nonKernelIndices.length > 0) {
      const next = [...seq];
      const pos = nonKernelIndices[Math.floor(rng.next() * nonKernelIndices.length)];
      next.splice(pos, 1);
      proposals.push({ type: 'delete', sequence: next, agent: 'Preserver' });
    }
  }

  // 2. Catalyst / Pilot (Navigation/Bridges focus)
  if (seq.length >= 2) {
    // Swap to find better transitions
    const next = [...seq];
    const idx1 = Math.floor(rng.next() * seq.length);
    const idx2 = Math.floor(rng.next() * seq.length);
    [next[idx1], next[idx2]] = [next[idx2], next[idx1]];
    proposals.push({ type: 'swap', sequence: next, agent: 'Catalyst' });
  }

  // 3. Synthesizer / Weaver (Periphery/Complex focus)
  if (seq.length < maxSequenceLength) {
    const next = [...seq];
    const pos = Math.floor(rng.next() * (seq.length + 1));
    next.splice(pos, 0, peripheryGlyphs[Math.floor(rng.next() * peripheryGlyphs.length)]);
    proposals.push({ type: 'insert', sequence: next, agent: 'Synthesizer' });
  }
  if (seq.length >= 2) {
    const pos = Math.floor(rng.next() * (seq.length - 1));
    const combined = codex.combine(seq[pos], seq[pos + 1]);
    const next = [...seq.slice(0, pos), combined, ...seq.slice(pos + 2)];
    proposals.push({ type: 'combine', sequence: next, agent: 'Synthesizer' });
  }

  return proposals;
}
