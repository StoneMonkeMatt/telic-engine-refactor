import React from 'react';
import { Database } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';

import { PROFILE_FIELDS_MAPPING } from '../content/profile-fields-mapping';
import { FIELD_GUIDANCE } from '../content/implementation-guidance';
import { PARAMETER_REGIME_PROFILES } from '../content/parameter-regime-profiles';

export const Part04CanonicalFieldGuidance: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Database} 
      title="Part IV. Canonical Field Guidance" 
      subtitle="Best Practices for Data Persistence"
    >
      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <p>
          This section provides guidance on how to structure and persist simulation data to ensure long-term utility, reproducibility, and efficient analysis.
        </p>
      </div>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <ManualDrawer title="A. Save Raw Values and Interpreted Labels">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Runs should save both raw inputs and their categorical interpretations.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELD_GUIDANCE.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{item.label}</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Separate Debug Trace from Research Archive">
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**Trace Boundary**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                Compass distinguishes between two kinds of trace:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-white/60 uppercase tracking-wider">Research Trace</div>
                  <p className="text-[9px] text-white/30 leading-relaxed">A compact, comparison-ready record intended for interpretation, aggregation, and downstream analysis.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-white/60 uppercase tracking-wider">Execution Trace</div>
                  <p className="text-[9px] text-white/30 leading-relaxed">A detailed engineering record intended for debugging proposal flow, acceptance behavior, and transition mechanics.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Export Mapping**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                In the current Compass run contract:
              </p>
              <ul className="list-disc pl-5 text-[10px] text-white/40 space-y-1">
                <li><code>eventLog</code> serves as the research-facing trace</li>
                <li><code>debugTrace</code> serves as the execution-facing trace</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Design Rule**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The research trace should preserve meaningful state changes, interpretable structural events, and summary-relevant transitions. The execution trace may be more verbose, but should remain optional and non-canonical for long-term archive use.
              </p>
            </div>

            <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
              <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                The current engine now exports both <code>eventLog</code> and <code>debugTrace</code>. This is the correct structural direction. For reproducible research comparison, <code>eventLog</code> should remain the primary analytical trace, while <code>debugTrace</code> should be treated as optional execution detail.
              </p>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Parameter Regime Profiles">
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The schema should support categorical labels for common parameter configurations (e.g., "Standard Search", "Aggressive Exploration"). This allows for high-level filtering of runs.
              </p>
            </div>
            <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
              <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                The Telos v0.9 engine uses the <code>PARAMETER_REGIME_PROFILES</code> constant to map numerical weights to categorical labels for export.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Engine Note**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                Raw parameter values must always be stored. <code>parameterProfiles</code> provide family-level regime descriptors aligned to the parameter ontology. These profiles should be understood as interpretive labels rather than replacements for numeric parameter storage.
              </p>
            </div>
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p>
                In addition to raw numerical values, saved runs should support interpreted regime labels. These labels provide a categorical context for the simulation's parameter configuration, making it easier to filter and compare runs across different experimental setups.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Recommended Fields</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROFILE_FIELDS_MAPPING.map((field, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="font-mono text-white/60 shrink-0">{field.field}:</span>
                      <span className="text-white/30">{field.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Recommended Regime Labels</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(PARAMETER_REGIME_PROFILES).map(([family, profiles]) => (
                  <div key={family} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{family}</div>
                    <ul className="space-y-1 text-[10px] text-white/40">
                      {profiles.map((profile) => (
                        <li key={profile.id}>
                          <span className="font-mono text-white/60">{profile.id}</span>
                          <span className="text-white/30"> — {profile.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Example Regime JSON</div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{JSON.stringify({
  evaluation_profile: PARAMETER_REGIME_PROFILES.evaluation[0].id,
  relational_profile: PARAMETER_REGIME_PROFILES.relational[0].id,
  search_profile: PARAMETER_REGIME_PROFILES.search[0].id,
  threshold_profile: PARAMETER_REGIME_PROFILES.threshold[0].id,
  constraint_profile: PARAMETER_REGIME_PROFILES.constraint[0].id
}, null, 2)}
              </pre>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. Recommended Metric Storage">
          <div className="space-y-6">
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p>
                Metrics should be stored in two primary formats: Terminal Metrics (representing the final state of the simulation) and Run-Level Summary Metrics (representing aggregate or peak performance over the entire run).
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Terminal Metrics</div>
                <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{`{
  "metrics": {
    "telic_score": 157.30,
    "resilience": 0.80,
    "telic_curvature": 0.5857,
    "path_integral": 275.0,
    "mod97_value": 17,
    "compass_orientation": "East",
    "consensus_score": 149.44,
    "adversarial_status": "failed"
  }
}`}
                </pre>
              </div>
              <div className="space-y-2">
                <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Run-Level Summary Metrics</div>
                <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{`{
  "run_summary": {
    "best_telic_score": 157.39,
    "best_score_step": 24,
    "plateau_start_step": 26,
    "mean_resilience": 0.84,
    "peak_telic_curvature": 0.60,
    "final_compass_orientation": "East",
    "adversarial_passed": false
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </ManualDrawer>
      </div>
    </ManualSectionDrawer>
  );
};
