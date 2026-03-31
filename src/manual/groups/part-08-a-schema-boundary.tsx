import React from 'react';
import { Shield } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';

export const Part08ASchemaBoundary: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Shield} 
      title="Part VIII-A. Schema Boundary" 
      subtitle="Separation of Persistence and Execution"
    >
      <div className="space-y-6">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <blockquote className="text-sm text-white/70 leading-relaxed italic">
            "The Compass schema is a persistence and validation contract, not an execution model. It captures the output of simulation logic, but does not reproduce or embed that logic. This separation preserves clarity, portability, and long-term compatibility."
          </blockquote>
        </div>
        <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
          <p>By enforcing this boundary, we ensure that the simulation's data remains a neutral record of what occurred, allowing different analysis engines or future versions of the Compass kernel to interpret the results without being coupled to the specific execution logic of the original run.</p>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Research Note**</div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              The schema is not merely a storage format. It is the bridge between single-run symbolic behavior and paper-facing evidence about invariant preservation, bridge stability, kernel purity, stratification, and failure modes under pressure.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Preparation Boundary</h4>
          <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
            <p>A Compass run may contain three distinct phases:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Probe Definition:</strong> The source text, experiment identity, and parameter regime are defined.</li>
              <li><strong>Initial State Preparation:</strong> A symbolic starting sequence is derived, selected, or restored.</li>
              <li><strong>Seeded Execution:</strong> The Telos kernel executes from the prepared symbolic starting state under an explicit seed.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              The schema should store the <code>seed</code> value used to initialize the PRNG. This allows the exact same sequence of "random" choices to be reproduced if the engine version and parameters are identical.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Canonical Rule**</div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              The persistence schema records the run as executed. It does not require that the upstream preparation mechanism be identical across engine versions.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Reproducibility Rule**</div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              A seeded Compass run is only fully repeatable when both of the following are fixed:
              <br />- the execution seed
              <br />- the initial symbolic sequence
            </p>
          </div>
          <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
            <p className="text-[10px] text-cyan-400/60 leading-relaxed">
              In the current architecture, seeded execution begins inside the Telos kernel, while text-to-symbol distillation may occur upstream. This means that execution can be deterministic even when the preparation phase is not yet fully deterministic.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
          <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Research Practice**</div>
          <p className="text-[10px] text-white/40 leading-relaxed">
            For benchmark, comparison, and paper-facing runs, the recommended procedure is:
            <br />1. define the probe
            <br />2. derive and store the initial symbolic sequence
            <br />3. execute the seeded simulation from that fixed starting state
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
          <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Canonical Top-Level Blocks**</div>
          <p className="text-[10px] text-white/40 leading-relaxed">
            The canonical Compass run record should preserve the following top-level structural distinction:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {['metadata', 'probe', 'parameters', 'parameterProfiles', 'initialState', 'metrics', 'runSummary', 'structuralSummary', 'eventLog', 'debugTrace', 'adversarial', 'tags'].map(block => (
              <code key={block} className="text-[9px] text-cyan-400/60 bg-white/5 px-1 py-0.5 rounded border border-white/5">{block}</code>
            ))}
          </div>
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
