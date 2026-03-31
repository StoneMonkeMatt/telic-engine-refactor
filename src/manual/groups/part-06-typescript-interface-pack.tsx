import React from 'react';
import { Code, Layers, Database, Workflow, FileJson, Shield } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { 
  VERSIONING_INTERFACES, 
  PROBE_METADATA_INTERFACE, 
  RUN_METADATA_INTERFACE, 
  PARAMETER_TYPES_INTERFACE, 
  PARAMETER_PROFILES_INTERFACE, 
  PARAMETER_SPEC_INTERFACE, 
  METRIC_TYPES_INTERFACE, 
  METRIC_SPEC_INTERFACE, 
  RUN_SUMMARY_METRICS_INTERFACE, 
  INITIAL_STATE_INTERFACE, 
  TRANSITION_TYPES_INTERFACE, 
  DEBUG_TRACE_INTERFACE, 
  EVENT_LOG_INTERFACE, 
  STRUCTURAL_SUMMARY_INTERFACE, 
  ADVERSARIAL_METADATA_INTERFACE, 
  RUN_RECORD_INTERFACE, 
  SUMMARY_ROW_INTERFACE, 
  CONSTANT_MAPS_INTERFACE 
} from '../content/interface-definitions';
import { INTERFACE_PACK_GOALS, VALIDATION_GUIDANCE, IMPLEMENTATION_NOTES } from '../content/implementation-guidance';
import { CORE_SIMULATION_TYPES } from '../content/core-simulation-types';
import { ENGINE_PARAMETER_TYPES } from '../content/engine-parameter-types';
import { METRIC_OUTPUT_TYPES } from '../content/metric-output-types';
import { EXPORT_RECORD_TYPES } from '../content/export-record-types';
import { BRIDGE_EVENT_TYPES } from '../content/bridge-event-types';

export const Part06TypeScriptInterfacePack: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Code} 
      title="Part VI. TypeScript Interface Pack" 
      subtitle="Implementation-Ready Simulation Contract"
    >
      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <p>
          This interface pack turns the lexicon into an implementation-ready contract for the simulation engine, exported JSON, and database ingest layer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {INTERFACE_PACK_GOALS.map((goal, i) => (
            <div key={i} className="flex gap-3 items-start p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="w-1 h-1 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{goal.label}</div>
                <div className="text-[10px] text-white/40 leading-tight mt-0.5">{goal.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <ManualDrawer title="A. Core & Metadata">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">0. Kernel Core Types</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{CORE_SIMULATION_TYPES}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">1. Core Versioning</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{VERSIONING_INTERFACES}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">10. Probe Metadata</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{PROBE_METADATA_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">11. Run Metadata</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{RUN_METADATA_INTERFACE}
              </pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Parameters & Metrics">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">2. Parameter Families and Keys</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{PARAMETER_TYPES_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">2a. Engine Parameter Contract</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{ENGINE_PARAMETER_TYPES}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">4. Interpreted Parameter Profiles</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{PARAMETER_PROFILES_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">5. Parameter Specification Metadata</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{PARAMETER_SPEC_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">6. Metric Families and Keys</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{METRIC_TYPES_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">6a. Engine Metric Contract</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{METRIC_OUTPUT_TYPES}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">8. Metric Specification Metadata</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{METRIC_SPEC_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">9. Run-Level Summary Metrics</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{RUN_SUMMARY_METRICS_INTERFACE}
              </pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Simulation State & Transitions">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">12. Initial State</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{INITIAL_STATE_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">13. Transition Types</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{TRANSITION_TYPES_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">14. Debug Trace Entry</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{DEBUG_TRACE_INTERFACE}
              </pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. Analysis & Summary">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">15. Event Log Types</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{EVENT_LOG_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">15a. Bridge Event Contract</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{BRIDGE_EVENT_TYPES}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">16. Structural Summary</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{STRUCTURAL_SUMMARY_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">17. Adversarial Metadata</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{ADVERSARIAL_METADATA_INTERFACE}
              </pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="E. Contracts & Storage">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">18. Full Run Contract</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{RUN_RECORD_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">18a. Engine Run Record</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{EXPORT_RECORD_TYPES}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">19. Database-Oriented Summary Row</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{SUMMARY_ROW_INTERFACE}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">20. Recommended Constant Maps</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{CONSTANT_MAPS_INTERFACE}
              </pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="F. Implementation Guidance">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">21. Validation Guidance</div>
                <ul className="text-[10px] text-white/40 space-y-1 list-disc pl-4">
                  {VALIDATION_GUIDANCE.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">22. Implementation Notes</div>
                <ul className="text-[10px] text-white/40 space-y-1 list-disc pl-4">
                  {IMPLEMENTATION_NOTES.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ManualDrawer>
      </div>

      <div className="pt-8 border-t border-white/5">
        <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
          <p className="text-[11px] text-cyan-400/80 leading-relaxed font-medium italic text-center">
            "The TypeScript Interface Pack provides the practical contract for Compass v1. It translates the parameter and metrics lexicon into a stable implementation layer so that simulation runs, exported JSON, event logs, and database records all use the same controlled vocabulary and structural boundaries."
          </p>
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
