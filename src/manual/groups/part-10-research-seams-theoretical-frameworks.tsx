import React from 'react';
import { Layers } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { cn } from '../../lib/utils';

import { PYRAMID_LAYERS, SPECULATIVE_FORMALISMS } from '../content/theoretical-frameworks';
import { SYMBOL_MEANINGS_STATUS } from '../content/symbol-meanings';
import { SYMBOL_OPPOSITES_STATUS } from '../content/symbol-opposites';
import { BRIDGE_FUNCTION_SEMANTICS_STATUS } from '../content/bridge-function-semantics';
import { HIGH_LEVEL_GROUPINGS_STATUS } from '../content/high-level-groupings';
import { COMPASS_SYMBOL_LISTS_STATUS } from '../content/compass-symbol-lists';

export const Part10ResearchSeamsTheoreticalFrameworks: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Layers} 
      title="Part X. Research Seams & Theoretical Frameworks" 
      subtitle="Conceptual Foundations & Future Formalisms"
      keywords="theory, research, pyramid, triangle, consciousness, speculative, future, framework"
    >
      <div className="space-y-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-6">
          <p className="text-[11px] text-white/40 leading-relaxed font-medium italic">
            This section documents theoretical constructs, research findings, and speculative formalisms that inform the Telos project but are not currently implemented as functional engine logic.
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
          <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**research practice**</div>
          <p className="text-[10px] text-white/40 leading-relaxed">
            Theoretical frameworks provide the "why" behind the simulation's "how." They guide the interpretation of results and the selection of future engine features.
          </p>
        </div>

        <ManualDrawer title="1. The Five-Layer Pyramid">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-1 py-4">
              {PYRAMID_LAYERS.map((layer, i) => (
                <div 
                  key={layer.label}
                  className={cn(
                    "w-full py-3 text-center text-[9px] font-bold uppercase tracking-[0.4em] transition-all hover:scale-105 rounded-lg",
                    layer.color
                  )}
                  style={{ width: `${100 - i * 12}%` }}
                >
                  {layer.label}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              A dependency graph where each layer rests on the one below and enables the one above. This framework describes the ontological stack from raw reality to verified meaning.
            </p>
          </div>
        </ManualDrawer>

        <ManualDrawer title="2. The Research Triangle">
          <div className="space-y-6">
            <div className="relative h-48 flex items-center justify-center">
              <div className="absolute top-0 font-bold text-[8px] uppercase tracking-[0.5em] text-white/40">Reality</div>
              <div className="absolute bottom-0 left-0 font-bold text-[8px] uppercase tracking-[0.5em] text-white/40">Systems</div>
              <div className="absolute bottom-0 right-0 font-bold text-[8px] uppercase tracking-[0.5em] text-white/40">Information</div>
              <svg className="w-32 h-32 text-cyan-500/20" viewBox="0 0 100 100">
                <polygon points="50,5 95,95 5,95" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="5" r="3" fill="currentColor" />
                <circle cx="95" cy="95" r="3" fill="currentColor" />
                <circle cx="5" cy="95" r="3" fill="currentColor" />
              </svg>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Emergence arises only when all three vertices (Reality, Systems, Information) interact. It is the product of their non-linear interaction at the center of the triangle.
            </p>
          </div>
        </ManualDrawer>

        <ManualDrawer title="3. The Consciousness Integral">
          <div className="space-y-4">
            <div className="bg-white/5 p-8 rounded-2xl font-mono text-2xl text-center text-white border border-white/5 glow-text-cyan">
              C = ∫ (Q × L × Cₘ) dt
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              A conceptual placeholder for future exploration into the integration of Qualia (Q), Logic (L), and Complexity (Cₘ) over time. Variables are intentionally undefined in the current engine.
            </p>
          </div>
        </ManualDrawer>

        <ManualDrawer title="4. Speculative Formalisms">
          <div className="grid grid-cols-1 gap-4">
            {SPECULATIVE_FORMALISMS.map((f, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{f.title}</h5>
                <div className="font-mono text-[10px] text-white/80">{f.formula}</div>
                <p className="text-[10px] text-white/40">{f.description}</p>
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="5. Interpretive Overlays">
          <div className="space-y-4 text-xs text-white/60 leading-relaxed">
            <p><strong>Semantic Attractors:</strong> The simulation treats narrative evolution as a dynamical system where sequences tend to move toward stable configurations (attractors) over time. This is an interpretive lens for observing convergence.</p>
            <p><strong>Reverse Evolution:</strong> Infers past conditions from present observations by weighting paths according to telic utility. While the engine performs forward evolution, this overlay provides a framework for causal reconstruction.</p>
          </div>
        </ManualDrawer>

        <ManualDrawer title="6. Ontological Implementation Mapping">
          <div className="space-y-6">
            <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
              <p>
                The <code>library.ts</code> file defines a much richer ontology than the current simulation engine operationalizes. This mapping clarifies which structures are computationally active and which are currently reserved for documentation or future use.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Symbol Opposites", ...SYMBOL_OPPOSITES_STATUS },
                { title: "Compass Symbol Lists", ...COMPASS_SYMBOL_LISTS_STATUS },
                { title: "Bridge Function Semantics", ...BRIDGE_FUNCTION_SEMANTICS_STATUS },
                { title: "High-Level Groupings", ...HIGH_LEVEL_GROUPINGS_STATUS },
                { title: "Symbol Meanings", ...SYMBOL_MEANINGS_STATUS }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{item.title}</h5>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white/40 text-[8px] font-bold uppercase tracking-tighter">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ManualDrawer>
      </div>
    </ManualSectionDrawer>
  );
};
