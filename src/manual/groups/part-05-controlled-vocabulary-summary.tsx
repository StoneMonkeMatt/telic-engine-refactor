import React from 'react';
import { List } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { PARAMETERS_MAPPING } from '../content/parameters-mapping';
import { METRICS_MAPPING } from '../content/metrics-mapping';
import { PROFILE_FIELDS_MAPPING } from '../content/profile-fields-mapping';
import { VERSIONING_SCHEMA } from '../content/versioning-schema';

export const Part05ControlledVocabularySummary: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={List} 
      title="Part V. Controlled Vocabulary Summary" 
      subtitle="Canonical Mapping Reference"
    >
      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <p>
          This summary provides the definitive mapping between engine-level keys, user interface labels, functional families, and database storage keys.
        </p>
      </div>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <ManualDrawer title="A. Parameters Mapping">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-white/10 text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">
              <div>Engine Key</div>
              <div>UI Label</div>
              <div>Family</div>
              <div>DB Label</div>
            </div>
            <div className="space-y-1">
              {PARAMETERS_MAPPING.map((item, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 bg-white/5 rounded-lg border border-white/5 text-[10px] font-mono">
                  <div className="text-cyan-400">{item.canonicalName}</div>
                  <div className="text-white/80">{item.label}</div>
                  <div className="text-white/40">{item.family}</div>
                  <div className="text-white/60 italic">{item.key}</div>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Metrics Mapping">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-white/10 text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">
              <div>Metric Key</div>
              <div>UI Label</div>
              <div>Family</div>
              <div>DB Label</div>
            </div>
            <div className="space-y-1">
              {METRICS_MAPPING.map((item, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 bg-white/5 rounded-lg border border-white/5 text-[10px] font-mono">
                  <div className="text-cyan-400">{item.canonicalName}</div>
                  <div className="text-white/80">{item.label}</div>
                  <div className="text-white/40">{item.family}</div>
                  <div className="text-white/60 italic">{item.key}</div>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Parameter Regime Profiles">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-white/10 text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">
              <div>Profile Field</div>
              <div>Parameter Family</div>
              <div>DB Label</div>
            </div>
            <div className="space-y-1">
              {PROFILE_FIELDS_MAPPING.map((item, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 px-4 py-3 bg-white/5 rounded-lg border border-white/5 text-[10px] font-mono">
                  <div className="text-cyan-400">{item.field}</div>
                  <div className="text-white/40">{item.family}</div>
                  <div className="text-white/60 italic">{item.db}</div>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. Versioning & Schema">
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Lexicon Name</div>
                  <div className="text-[10px] text-cyan-400 font-mono">Compass Parameter & Metrics Lexicon</div>
                </div>
                <div>
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Version</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{VERSIONING_SCHEMA.lexicon[0].version}</div>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Recommended Schema Fields</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded border border-white/5 font-mono text-[9px]">
                    <span className="text-white/40">metrics_lexicon_version</span>
                    <span className="text-cyan-400">"{VERSIONING_SCHEMA.lexicon[0].version}"</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/20 rounded border border-white/5 font-mono text-[9px]">
                    <span className="text-white/40">parameter_lexicon_version</span>
                    <span className="text-cyan-400">"{VERSIONING_SCHEMA.lexicon[0].version}"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ManualDrawer>
      </div>

      <div className="pt-8 border-t border-white/5">
        <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
          <p className="text-[11px] text-cyan-400/80 leading-relaxed font-medium italic text-center">
            "The Compass Parameter & Metrics Lexicon v1 defines the shared language of the simulation. Its purpose is to ensure that parameters, metrics, events, and saved records all refer to the same underlying concepts with stable names and non-overlapping roles. This allows the simulation to mature as a product, a research instrument, and a database-backed experimental system without semantic drift."
          </p>
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
