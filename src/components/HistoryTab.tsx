import React from 'react';
import { History as HistoryIcon, RefreshCw } from 'lucide-react';
import { SimulationRun } from '../types';

interface HistoryTabProps {
  history: SimulationRun[];
  restoreFromHistory: (run: SimulationRun) => void;
  setActiveTab: (tab: string) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  history,
  restoreFromHistory,
  setActiveTab
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 border-cyan-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest">Simulation History</h2>
          </div>
          <span className="text-[10px] font-mono opacity-40 uppercase">Last 10 Experiments</span>
        </div>
        
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-sm text-white/20 uppercase tracking-widest font-bold">No experiments recorded yet</p>
            </div>
          ) : (
            history.map((run) => (
              <div 
                key={run.id}
                className="group relative glass-panel p-4 hover:bg-white/5 transition-all cursor-pointer border-white/5 hover:border-cyan-500/30"
                onClick={() => {
                  restoreFromHistory(run);
                  setActiveTab('simulation');
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-xs">
                      {run.narrative.length}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                        {new Date(run.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-[9px] font-mono text-cyan-400/60">
                        SEED: {run.seed}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="text-[8px] uppercase tracking-tighter opacity-40">Telic</div>
                      <div className="text-xs font-bold text-cyan-400">{run.summary.telic.toFixed(3)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] uppercase tracking-tighter opacity-40">Duality</div>
                      <div className="text-xs font-bold text-purple-400">{run.summary.duality.toFixed(3)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  {run.narrative.map((glyph, i) => (
                    <span key={i} className="text-lg">{glyph}</span>
                  ))}
                </div>
                
                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-cyan-400">
                    <RefreshCw className="w-2 h-2" />
                    Restore
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
