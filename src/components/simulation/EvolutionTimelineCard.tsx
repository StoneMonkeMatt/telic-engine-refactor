import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Play, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SimulationResults } from '../../types';

interface EvolutionTimelineCardProps {
  results: SimulationResults | null;
  currentStepIdx: number;
  setCurrentStepIdx: (idx: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const EvolutionTimelineCard: React.FC<EvolutionTimelineCardProps> = ({
  results,
  currentStepIdx,
  setCurrentStepIdx,
  isPlaying,
  setIsPlaying
}) => {
  if (!results) return null;

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Evolution Timeline</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:bg-black/5 rounded transition-colors text-cyan-600"
            title={isPlaying ? "Pause" : "Play Evolution"}
          >
            {isPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <button 
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(Math.max(0, currentStepIdx - 1));
            }}
            className="p-1 hover:bg-black/5 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <span className="text-[10px] font-mono font-bold">Step {currentStepIdx} / {results.history.length ? results.history.length - 1 : 0}</span>
          <button 
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(Math.min((results.history.length || 1) - 1, currentStepIdx + 1));
            }}
            className="p-1 hover:bg-black/5 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 min-h-[100px] items-center justify-center bg-black/5 rounded-xl p-4 border border-black/5">
        <AnimatePresence mode='popLayout'>
          {results.history[currentStepIdx]?.sequence.map((glyph, i) => (
            <motion.span
              key={`${glyph}-${i}-${currentStepIdx}`}
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="text-3xl"
            >
              {glyph}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-[8px] uppercase font-bold opacity-40">Telic Score</span>
          <div className="text-lg font-bold font-mono">{results.history[currentStepIdx]?.telicScore.toFixed(4)}</div>
        </div>
        <div className="space-y-1">
          <span className="text-[8px] uppercase font-bold opacity-40">Resilience</span>
          <div className="text-lg font-bold font-mono text-blue-600">{(results.history[currentStepIdx]?.resilience || 0).toFixed(3)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/5">
        <div className="space-y-1">
          <span className="text-[8px] uppercase font-bold opacity-40">Telic Curvature (κ)</span>
          <div className="text-xs font-bold font-mono">{(results.history[currentStepIdx]?.telicCurvature || 0).toFixed(4)}</div>
        </div>
        <div className="space-y-1">
          <span className="text-[8px] uppercase font-bold opacity-40">Path Integral (P)</span>
          <div className="text-xs font-bold font-mono">{(results.history[currentStepIdx]?.pathIntegral || 0).toExponential(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/5">
        <div className="space-y-1">
          <span className="text-[7px] uppercase font-bold opacity-40">Mod97</span>
          <div className="text-xs font-mono font-bold">Φ-{results.history[currentStepIdx]?.mod97?.toString().padStart(2, '0')}</div>
        </div>
        <div className="space-y-1">
          <span className="text-[7px] uppercase font-bold opacity-40">Adversarial</span>
          <div className={cn("text-[8px] font-bold uppercase", results.history[currentStepIdx]?.adversarialPassed ? "text-emerald-600" : "text-red-500")}>
            {results.history[currentStepIdx]?.adversarialPassed ? "Passed" : "Failed"}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[7px] uppercase font-bold opacity-40">Compass</span>
          <div className="text-[8px] font-bold uppercase opacity-60">{results.history[currentStepIdx]?.compassMatch}</div>
        </div>
      </div>

      <input 
        type="range"
        min="0"
        max={(results.history.length || 1) - 1}
        value={currentStepIdx}
        onChange={(e) => setCurrentStepIdx(parseInt(e.target.value))}
        className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
      />
    </div>
  );
};
