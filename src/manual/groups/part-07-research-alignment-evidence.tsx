import React from 'react';
import { BookOpen } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';

import { RESEARCH_ALIGNMENT_MAPPING, RESEARCH_QUESTIONS, EVIDENCE_CHECKLIST, RESEARCH_PRODUCT_LOOP } from '../content/research-alignment';

export const Part07ResearchAlignmentEvidence: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={BookOpen} 
      title="Part VII. Research Alignment & Evidence" 
      subtitle="Bridging Simulation and Theoretical Claims"
    >
      <div className="space-y-4">
        <ManualDrawer title="A. The Schema as a Research Bridge">
          <div className="space-y-6">
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p>
                The schema is not just for storage hygiene. It is what turns the simulation from a generator of interesting runs into a system that can actually help answer the paper’s questions.
              </p>
              <p>
                If the paper is asking about structural pressure, stratification, invariant preservation, navigational control, expressive expansion, and observer-related behavior, then the schema decides whether those things are properly recorded and compared.
              </p>
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Measurement Grammar for the Paper">
          <div className="space-y-6">
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p className="italic">
                "The paper is not asking: 'did something interesting happen once?' It is asking: 'does a compact kernel appear repeatedly?'"
              </p>
              <p>
                We translate raw state transitions into research evidence using specific schema fields:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RESEARCH_ALIGNMENT_MAPPING.map((item, i) => (
                <div key={i} className="flex flex-col gap-1 p-3 bg-black/20 rounded-lg border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-cyan-400 text-[10px]">{item.key}</span>
                    <span className="text-[8px] text-white/20 uppercase">{item.ref}</span>
                  </div>
                  <span className="text-white/40 text-[10px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Paper-Facing Schema Questions">
          <div className="space-y-6">
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p>
                By querying concrete fields across the archive, we can answer the core research questions:
              </p>
            </div>

            <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10 space-y-3">
              <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Evidence Checklist</div>
              <ul className="space-y-2 text-[10px] text-white/60">
                {EVIDENCE_CHECKLIST.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-400">?</span>
                    <span>{item.question} ({item.check})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESEARCH_QUESTIONS.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-[9px] font-bold text-white/60 uppercase">{item.title}</div>
                  <p className="text-[10px] text-white/30">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. The Research-Product Loop">
          <div className="space-y-6">
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p>
                The schema creates a closed loop between simulation development and research output:
              </p>
              <ol className="space-y-3 list-decimal pl-4">
                {RESEARCH_PRODUCT_LOOP.map((item, i) => (
                  <li key={i}><strong>{item.step}:</strong> "{item.text}"</li>
                ))}
              </ol>
            </div>
          </div>
        </ManualDrawer>
      </div>

      <div className="pt-8 border-t border-white/5">
        <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
          <p className="text-[11px] text-cyan-400/80 leading-relaxed font-medium italic text-center">
            "The schema is the bridge. It translates the 'interesting things' seen in a single run into the 'statistical evidence' required for the paper."
          </p>
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
