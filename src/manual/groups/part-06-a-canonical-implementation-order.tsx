import React from 'react';
import { Workflow } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';

import { IMPLEMENTATION_SEQUENCE, RUN_RECORD_SECTIONS } from '../content/implementation-order';

export const Part06ACanonicalImplementationOrder: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Workflow} 
      title="Part VI-A. Canonical Implementation Order" 
      subtitle="The Compass Data Contract Implementation Pathway"
    >
      <div className="space-y-6">
        <div className="space-y-4 text-sm text-white/60 leading-relaxed">
          <p>
            The Compass data contract must be implemented in a fixed order to preserve semantic stability across the engine, exported records, validation, and storage.
          </p>
        </div>

        <ManualDrawer title="1. Implementation Rule">
          <div className="space-y-4 text-[10px] text-white/50 leading-relaxed">
            <p>The canonical run record is defined first as a TypeScript contract. JSON Schema is derived from that contract. Validation utilities are then built against the schema. Engine logic maps into the contract, but does not define it.</p>
            <p>This order prevents semantic drift and avoids coupling storage structure to transient engine details.</p>
          </div>
        </ManualDrawer>

        <ManualDrawer title="2. Required Build Sequence">
          <div className="space-y-6">
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Step 1. Lock the top-level run record</h5>
              <p className="text-[10px] text-white/50 leading-relaxed">The first implementation task is to define the canonical <code className="text-cyan-300">CompassRunRecord</code> shape and its top-level sections:</p>
              <ul className="list-disc list-inside text-[10px] text-white/40 space-y-1 ml-2">
                {RUN_RECORD_SECTIONS.map((section, i) => (
                  <li key={i}>{section}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Step 2. Define subtype contracts</h5>
              <p className="text-[10px] text-white/50 leading-relaxed">Once the top-level record is fixed, subtype interfaces are defined for parameter families, terminal metrics, run summaries, structural summaries, event log entries, debug trace entries, and persistence views.</p>
              <p className="text-[10px] text-white/40 italic">Subtypes must refine the canonical vocabulary established in the lexicon rather than introduce alternative terminology.</p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Step 3. Derive JSON Schema from the contract</h5>
              <p className="text-[10px] text-white/50 leading-relaxed">The JSON Schema must reflect the canonical TypeScript model. Schema design should describe what was configured, what happened, what was measured, and what was concluded.</p>
              <p className="text-[10px] text-white/40 italic">The schema must not encode engine reasoning, observer logic, kernel protection logic, or scoring logic.</p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Step 4. Add validation helpers</h5>
              <p className="text-[10px] text-white/50 leading-relaxed">Validation utilities are implemented after the schema is stable. These validators should support at least three persistence modes: full run validation, research archive validation, and debug export validation.</p>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="3. Architectural Constraint">
          <div className="space-y-4 text-[10px] text-white/50 leading-relaxed">
            <p className="font-bold text-white/70 uppercase tracking-tighter">The schema layer is descriptive, not inferential.</p>
            <p>It records simulation configuration, state transitions, metrics, summaries, and event history. It does not decide whether an observer emerged, whether a kernel was valid, or how a score should be computed. Those decisions belong to the engine and analysis layers.</p>
          </div>
        </ManualDrawer>

        <ManualDrawer title="4. Canonical Reference Shape">
          <div className="space-y-4">
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] text-cyan-300/80 overflow-x-auto">
              <pre>{`interface CompassRunRecord {
  metadata: CompassRunMetadata;
  parameters: CompassParameters;
  parameterProfiles?: CompassParameterProfiles;
  initialState: CompassInitialState;
  metrics: CompassTerminalMetrics;
  runSummary?: CompassRunSummary;
  structuralSummary?: CompassStructuralSummary;
  eventLog: CompassEvent[];
  debugTrace?: CompassDebugTraceEntry[];
}`}</pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="5. File Realization Order">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {IMPLEMENTATION_SEQUENCE.map(f => (
                <div key={f.step} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center space-y-1">
                  <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Step {f.step}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{f.file}</div>
                  <div className="text-[8px] text-white/40 uppercase tracking-tighter">{f.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed italic">This order ensures that the Compass run contract is defined once, validated consistently, and reused safely across exports, storage backends, and research workflows.</p>
          </div>
        </ManualDrawer>

        <div className="pt-8 border-t border-white/5">
          <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
            <p className="text-[11px] text-cyan-400/80 leading-relaxed font-medium italic text-center">
              "The canonical implementation order protects the builder from inventing a schema too early. The contract must come first, and everything else should follow it."
            </p>
          </div>
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
