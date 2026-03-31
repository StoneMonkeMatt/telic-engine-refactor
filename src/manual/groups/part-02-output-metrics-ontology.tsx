import React from 'react';
import { Activity } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { LexiconItem } from '../components/LexiconItem';
import { METRICS_MAPPING } from '../content/metrics-mapping';
import { METRIC_FAMILIES } from '../content/core-ontology-structures';

export const Part02OutputMetricsOntology: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Activity} 
      title="Part II. Output Metrics Ontology" 
      subtitle="Classification of Simulation Results"
    >
      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <p>
          This ontology categorizes the metrics produced by the Compass engine. These outputs provide a multi-dimensional view of the symbolic state's evolution and final convergence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {METRIC_FAMILIES.map((distinction, i) => (
            <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">{distinction.label}</div>
              <div className="text-[10px] text-white/40 leading-relaxed">{distinction.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <ManualDrawer title="A. Composite Score">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Top-line valuation of the current symbolic state.</p>
            {METRICS_MAPPING.filter(m => m.family === "Composite Score").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                meaning={metric.description} 
                question="How strong is this state overall under the active parameter regime?"
                interpretation="More favoured under the active scoring regime."
                notes="Composite preference signal, not an absolute truth metric."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Stability">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Measures of persistence and robustness.</p>
            {METRICS_MAPPING.filter(m => m.family === "Stability").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                meaning={metric.description} 
                question="How well does this state hold together?"
                interpretation="Greater robustness or persistence."
                notes="Must remain distinct from telic score."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Shape">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Measures of local structural or geometric form.</p>
            {METRICS_MAPPING.filter(m => m.family === "Shape").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                role={metric.canonicalName}
                meaning={metric.description} 
                question="What is the local geometric character of the run?"
                interpretation="Stronger local directional shaping, sharper attractor geometry, or more pronounced trajectory bending."
                notes="Should not drift into a generic importance metric."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. Trajectory">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Measures of cumulative movement through the run.</p>
            {METRICS_MAPPING.filter(m => m.family === "Trajectory").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                role={metric.canonicalName}
                meaning={metric.description} 
                question="How much meaningful trajectory has the run accumulated?"
                interpretation="Longer, richer, or more substantial cumulative traversal."
                notes="Distinct from terminal score."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="E. Signature / Integrity">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Compact arithmetic or harmonic identifiers.</p>
            {METRICS_MAPPING.filter(m => m.family === "Signature / Integrity").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                meaning={metric.description} 
                question="What compact arithmetic signature does this state resolve to?"
                notes="Best treated as a signature and comparison aid unless later theory sharpens its role."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="F. Orientation">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Categorical directional interpretation.</p>
            {METRICS_MAPPING.filter(m => m.family === "Orientation").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                meaning={metric.description} 
                question="Which directional regime does this state currently align with?"
                typicalValues="North, South, East, West, None"
                notes="Requires a formal derivation rule in engine documentation."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="G. Agreement">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Alignment among evaluative components.</p>
            {METRICS_MAPPING.filter(m => m.family === "Agreement").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                meaning={metric.description} 
                question="How strongly do the engine’s evaluative components agree on this state?"
                interpretation="Stronger internal agreement."
                notes="Keep distinct from telic score and resilience."
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="H. Stress Test Outcome">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Pass/fail or test-result fields under adversarial pressure.</p>
            {METRICS_MAPPING.filter(m => m.family === "Stress Test Outcome").map(metric => (
              <LexiconItem 
                key={metric.key}
                label={metric.label} 
                dbLabel={metric.key} 
                meaning={metric.description} 
                question="Does the state survive adversarial challenge?"
                typicalValues="passed, failed"
                notes="Should ideally be accompanied by test name, version, and failure reason."
              />
            ))}
          </div>
        </ManualDrawer>

        <div className="pt-8 border-t border-white/5">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">Metric Distinctions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {METRICS_MAPPING.map((m, i) => (
              <div key={i} className="flex items-start gap-1 text-[10px]">
                <span className="text-cyan-400 font-bold whitespace-nowrap">{m.label}</span>
                <span className="text-white/40">is {m.interpretation.toLowerCase()}.</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
