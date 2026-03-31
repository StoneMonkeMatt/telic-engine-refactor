import React, { useState } from 'react';
import { Database, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Codex } from '../logic/codex';
import { cn } from '../lib/utils';
import { OntologyField } from '../types';

interface QuickSymbolsPanelProps {
  codex: Codex;
  filteredOntologyFields: OntologyField[];
  addSymbol: (glyph: string) => void;
}

export function QuickSymbolsPanel({
  codex,
  filteredOntologyFields,
  addSymbol
}: QuickSymbolsPanelProps) {
  const [openField, setOpenField] = useState<string | null>(null);
  const [openDomain, setOpenDomain] = useState<string | null>(null);

  return (
    <section className="glass-panel p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Database className="w-4 h-4 text-cyan-400" />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Quick Symbols</h2>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredOntologyFields?.map((field) => (
          <div key={field.name} className="space-y-1">
            <button
              onClick={() => setOpenField(openField === field.name ? null : field.name)}
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border border-white/5",
                openField === field.name ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-2">
                <ChevronRight className={cn("w-3 h-3 transition-transform", openField === field.name && "rotate-90")} />
                <span>{field.name}</span>
              </div>
            </button>
            <AnimatePresence>
              {openField === field.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pl-2 space-y-1"
                >
                  {field.domains.map(domain => {
                    const glyphs = codex.symbols.domains[domain] as string[] || [];
                    if (glyphs.length === 0) return null;
                    return (
                      <div key={domain} className="space-y-1">
                        <button
                          onClick={() => setOpenDomain(openDomain === domain ? null : domain)}
                          className={cn(
                            "w-full flex items-center justify-between p-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all border border-white/5",
                            openDomain === domain ? "bg-white/10 text-cyan-300 border-white/20" : "bg-white/5 text-white/30 hover:bg-white/10"
                          )}
                        >
                          <span>{domain.replace(/_/g, ' ')}</span>
                          <span className="opacity-40">{glyphs.length}</span>
                        </button>
                        <AnimatePresence>
                          {openDomain === domain && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-4 gap-1 p-2 bg-black/20 rounded-lg">
                                {glyphs.map(glyph => {
                                  const s = codex.getSymbol(glyph);
                                  return (
                                    <button
                                      key={glyph}
                                      onClick={() => addSymbol(glyph)}
                                      title={s?.meaning}
                                      className="p-2 text-xl hover:bg-cyan-500/20 rounded-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                                    >
                                      {glyph}
                                    </button>
                                  );
                                })}
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
            <div key={domain} className="space-y-1">
              <button
                onClick={() => setOpenDomain(openDomain === domain ? null : domain)}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border border-white/5",
                  openDomain === domain ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                <span>{domain.replace(/_/g, ' ')}</span>
                <span className="opacity-40">{g.length}</span>
              </button>
              <AnimatePresence>
                {openDomain === domain && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-4 gap-1 p-2 bg-black/20 rounded-lg">
                      {g.map(glyph => {
                        const s = codex.getSymbol(glyph);
                        return (
                          <button
                            key={glyph}
                            onClick={() => addSymbol(glyph)}
                            title={s?.meaning}
                            className="p-2 text-xl hover:bg-cyan-500/20 rounded-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                          >
                            {glyph}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
