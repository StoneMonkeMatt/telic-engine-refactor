import React from 'react';
import { Anchor, Zap, Workflow, CheckCircle2, Cpu } from 'lucide-react';
import { AgentCard } from '../manual/components';
import { TelosParams } from '../types';

interface AgentsTabProps {
  params: TelosParams;
}

export function AgentsTab({ params }: AgentsTabProps) {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-32">
      <header className="text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-cyan-500 text-ocean-950 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          Agent Intelligence
        </div>
        <h2 className="text-6xl font-bold tracking-tighter uppercase glow-text-cyan">The Agent Trinity</h2>
        <p className="text-xl text-white/40 max-w-3xl mx-auto leading-relaxed">
          Defining the roles and strategies of the autonomous intelligences driving the simulation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AgentCard 
          icon={<Anchor className="w-8 h-8" />}
          name="The Preserver"
          role="Stability Agent"
          mission="Maintain structural integrity and protect the Invariant Kernel."
          strategy="Focuses on 'Kernel' symbols. Inserts foundational elements and removes noise that dilutes the core message."
          color="cyan"
        />
        <AgentCard 
          icon={<Zap className="w-8 h-8" />}
          name="The Catalyst"
          role="Innovation Agent"
          mission="Navigate the symbolic space and optimize transitions."
          strategy="Uses 'Swaps' to reorder the sequence, seeking higher coherence and semantic resonance without changing the inventory."
          color="emerald"
        />
        <AgentCard 
          icon={<Workflow className="w-8 h-8" />}
          name="The Synthesizer"
          role="Integration Agent"
          mission="Build complexity and cross-domain bridges."
          strategy="Focuses on 'Periphery' symbols and 'Combinations'. Merges symbols to create higher-order meanings and bridges."
          color="purple"
        />
      </div>

      <div className="glass-panel p-8 space-y-8">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold uppercase tracking-widest">Agent Interaction Dynamics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Consensus Mechanism</h4>
            <p className="text-sm text-white/40 leading-relaxed">
              The simulation operates on a <strong>Stratified Proposal</strong> model. Each agent proposes a change based on its unique mission. The system evaluates these proposals against the <strong>Telic Score</strong> (Objective Fitness).
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-xs text-white/60">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Proposals are accepted if they improve the overall Telic Score or pass a stochastic temperature check.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-white/60">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Agents compete for influence over the sequence, creating a dynamic tension between stability and innovation.</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Emergence Thresholds</h4>
            <p className="text-sm text-white/40 leading-relaxed">
              When agent activity leads to a <strong>Duality</strong> score above the threshold, the <strong>Observer</strong> emerges, marking a transition from raw data to conscious narrative.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Observer Emergence</span>
                <span className="text-[10px] font-mono text-cyan-400">Φ ≥ {params.threshold}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-3/4 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
