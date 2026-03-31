import React from 'react';
import { 
  Workflow, ChevronRight, Compass as CompassIcon, BarChart3, 
  Layers, Search, X 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Codex } from '../logic/codex';
import { CompassDirection, OntologyField } from '../types';
import { cn } from '../lib/utils';
import { Highlight } from '../manual/components';

interface OntologyTabProps {
  codex: Codex;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  ontologyOpenField: string | null;
  setOntologyOpenField: (field: string | null) => void;
  ontologyOpenDomain: string | null;
  setOntologyOpenDomain: (domain: string | null) => void;
  isBridgesOpen: boolean;
  setIsBridgesOpen: (open: boolean) => void;
  filteredOntologyFields: OntologyField[];
}

export const OntologyTab: React.FC<OntologyTabProps> = ({
  codex,
  searchQuery,
  setSearchQuery,
  ontologyOpenField,
  setOntologyOpenField,
  ontologyOpenDomain,
  setOntologyOpenDomain,
  isBridgesOpen,
  setIsBridgesOpen,
  filteredOntologyFields,
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 bg-cyan-500/5 border-cyan-500/20">
        <h2 className="text-xl font-bold mb-2 text-cyan-400">The V9 Symbolic Ontology</h2>
        <p className="text-xs text-white/60 leading-relaxed max-w-3xl">
          The Blue Whale simulation operates on a foundational ontology of <span className="text-cyan-400 font-bold">{codex.symbols.symbols.length}</span> unique symbols. 
          These symbols are categorized into <span className="text-cyan-400 font-bold">{Object.keys(codex.symbols.domains).length}</span> semantic domains, 
          ranging from core physical constants to high-level consciousness operators. 
          The system uses these as the "atoms" of narrative evolution, where meaning is compressed and transformed through cross-domain bridges and telic optimization.
        </p>
      </div>

      {/* Global Search & Filter for Ontology */}
      <div className="max-w-md mx-auto relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
        <input 
          type="text"
          placeholder="Search the Ontology..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Ontology Brief / High-level Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Ontology Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[8px] uppercase font-bold opacity-40">Total Symbols</span>
              <div className="text-xl font-bold font-mono">{codex.symbols.symbols.length}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] uppercase font-bold opacity-40">Active Domains</span>
              <div className="text-xl font-bold font-mono">{Object.keys(codex.symbols.domains).length}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] uppercase font-bold opacity-40">Bridges</span>
              <div className="text-xl font-bold font-mono">{codex.symbols.cross_domain_bridges.length}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] uppercase font-bold opacity-40">Compass Nodes</span>
              <div className="text-xl font-bold font-mono">{Object.keys(codex.symbols.compass).length}</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-0 overflow-hidden md:col-span-2">
          <button 
            onClick={() => setIsBridgesOpen(!isBridgesOpen)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-cyan-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Cross-Domain Bridges</h3>
            </div>
            <ChevronRight className={cn(
              "w-4 h-4 text-white/40 transition-transform duration-300",
              isBridgesOpen && "rotate-90"
            )} />
          </button>
          
          <AnimatePresence>
            {isBridgesOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {codex.symbols.cross_domain_bridges.map((bridge, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-2 border border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[7px] uppercase font-bold opacity-30">{bridge.from}</span>
                          <span className="text-[7px] uppercase font-bold opacity-30">{bridge.to}</span>
                          {bridge.function && (
                            <span className="text-[6px] italic opacity-50 mt-1 leading-tight">{bridge.function.replace(/_/g, ' ')}</span>
                          )}
                        </div>
                        <span className="text-2xl">{bridge.symbol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <CompassIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Compass Alignment</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(codex.symbols.compass).map(([dir, config]) => {
              const c = config as CompassDirection;
              return (
                <div key={dir} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col w-20">
                      <span className="text-[10px] font-bold uppercase tracking-widest">{dir}</span>
                      {c.name && (
                        <span className="text-[7px] italic opacity-50 leading-tight">{c.name.replace(/_/g, ' ')}</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {c.symbols.map(s => (
                        <span key={s} className="text-lg">{s}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">Φ-{c.mod97?.toString().padStart(2, '0')}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Domain Density</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={Object.entries(codex.symbols.domains).map(([name, syms]) => ({ name, count: (syms as string[]).length })).sort((a, b) => b.count - a.count).slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis fontSize={8} stroke="#ffffff20" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', fontSize: '10px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="count" stroke="#22d3ee" fill="#22d3ee20" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(codex.symbols.domains).sort((a, b) => (b[1] as string[]).length - (a[1] as string[]).length).slice(0, 5).map(([name, syms]) => (
              <span key={name} className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-bold uppercase tracking-widest opacity-40 border border-white/5">
                {name} ({(syms as string[]).length})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Symbol Registry (V9 Codex)</h3>
          <span className="text-[9px] font-mono opacity-30 uppercase">Grouped by Domain</span>
        </div>
        <div className="p-4 space-y-4">
          {filteredOntologyFields?.map((field) => (
            <div key={field.name} className="space-y-2">
              <button
                onClick={() => setOntologyOpenField(ontologyOpenField === field.name ? null : field.name)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all border",
                  ontologyOpenField === field.name 
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 opacity-40" />
                  <div className="flex flex-col items-start">
                    <span><Highlight text={field.name} query={searchQuery} /></span>
                    <span className="text-[8px] opacity-40 font-medium normal-case tracking-normal"><Highlight text={field.description} query={searchQuery} /></span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono opacity-40">{field.domains.length} Domains</span>
                  <ChevronRight className={cn("w-4 h-4 transition-transform", ontologyOpenField === field.name && "rotate-90")} />
                </div>
              </button>
              <AnimatePresence>
                {ontologyOpenField === field.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-6 space-y-2"
                  >
                    {field.domains.map(domain => {
                      const glyphs = codex.symbols.domains[domain] as string[] || [];
                      if (glyphs.length === 0) return null;
                      return (
                        <div key={domain} className="space-y-2">
                          <button
                            onClick={() => setOntologyOpenDomain(ontologyOpenDomain === domain ? null : domain)}
                            className={cn(
                              "w-full flex items-center justify-between p-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
                              ontologyOpenDomain === domain 
                                ? "bg-white/10 text-cyan-300 border-white/20" 
                                : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                              <span><Highlight text={domain.replace(/_/g, ' ')} query={searchQuery} /></span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[9px] font-mono opacity-40">{glyphs.length} Symbols</span>
                              <ChevronRight className={cn("w-3 h-3 transition-transform", ontologyOpenDomain === domain && "rotate-90")} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {ontologyOpenDomain === domain && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-white/5">
                                        <th className="p-4 col-header">Glyph</th>
                                        <th className="p-4 col-header">Meaning</th>
                                        <th className="p-4 col-header text-right">Weight</th>
                                        <th className="p-4 col-header">Opposites</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {glyphs.filter(glyph => {
                                        if (!searchQuery) return true;
                                        const q = searchQuery.toLowerCase();
                                        const s = codex.getSymbol(glyph);
                                        return (
                                          field.name.toLowerCase().includes(q) ||
                                          domain.toLowerCase().includes(q) ||
                                          glyph.toLowerCase().includes(q) ||
                                          (s && s.meaning.toLowerCase().includes(q))
                                        );
                                      }).map(glyph => {
                                        const s = codex.getSymbol(glyph);
                                        if (!s) return null;
                                        return (
                                          <tr key={s.glyph} className="border-b border-white/5 hover:bg-cyan-500/5 transition-colors group">
                                            <td className="p-4 text-2xl group-hover:scale-110 transition-transform inline-block">{s.glyph}</td>
                                            <td className="p-4 text-xs font-medium text-white/80"><Highlight text={s.meaning} query={searchQuery} /></td>
                                            <td className="p-4 text-right data-value text-xs text-white/60">{s.weight}</td>
                                            <td className="p-4 text-xs opacity-40 italic">{s.opposites.join(', ') || '—'}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {!codex.symbols.ontology_fields && Object.entries(codex.symbols.domains).map(([domain, glyphs]) => {
            const g = glyphs as string[];
            return (
              <div key={domain} className="space-y-2">
                <button
                  onClick={() => setOntologyOpenDomain(ontologyOpenDomain === domain ? null : domain)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all border",
                    ontologyOpenDomain === domain 
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 opacity-40" />
                    <span>{domain.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono opacity-40">{g.length} Symbols</span>
                    <ChevronRight className={cn("w-4 h-4 transition-transform", ontologyOpenDomain === domain && "rotate-90")} />
                  </div>
                </button>
                <AnimatePresence>
                  {ontologyOpenDomain === domain && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-white/5">
                              <th className="p-4 col-header">Glyph</th>
                              <th className="p-4 col-header">Meaning</th>
                              <th className="p-4 col-header text-right">Weight</th>
                              <th className="p-4 col-header">Opposites</th>
                            </tr>
                          </thead>
                          <tbody>
                            {g.map(glyph => {
                              const s = codex.getSymbol(glyph);
                              if (!s) return null;
                              return (
                                <tr key={s.glyph} className="border-b border-white/5 hover:bg-cyan-500/5 transition-colors group">
                                  <td className="p-4 text-2xl group-hover:scale-110 transition-transform inline-block">{s.glyph}</td>
                                  <td className="p-4 text-xs font-medium text-white/80">{s.meaning}</td>
                                  <td className="p-4 text-right data-value text-xs text-white/60">{s.weight}</td>
                                  <td className="p-4 text-xs opacity-40 italic">{s.opposites.join(', ') || '—'}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
