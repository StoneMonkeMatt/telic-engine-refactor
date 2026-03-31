import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass as CompassIcon, RefreshCw, Zap, Brain, FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SimulationState, InputState, SimulationActions } from '../types';
import { EvolutionTimelineCard } from './simulation/EvolutionTimelineCard';
import { TelicEvolutionChart } from './simulation/TelicEvolutionChart';
import { CompressionDynamicsChart } from './simulation/CompressionDynamicsChart';
import { CompressionHistoryTable } from './simulation/CompressionHistoryTable';

interface SimulationTabProps {
  simulationState: SimulationState;
  inputState: InputState;
  simulationActions: SimulationActions;
}

export const SimulationTab: React.FC<SimulationTabProps> = ({
  simulationState,
  inputState,
  simulationActions
}) => {
  const {
    codex,
    narrative,
    params,
    results,
    metrics,
    simSteps,
    currentStepIdx,
    isPlaying,
    chartData
  } = simulationState;

  const {
    inputText,
    isDistilling,
    distillStatus
  } = inputState;

  const {
    clearNarrative,
    handleRandomize,
    removeSymbol,
    runSimulation,
    setCurrentStepIdx,
    setIsPlaying,
    handleExport,
    setInputText,
    handleDistill
  } = simulationActions;

  return (
    <div className="space-y-6">
      {/* Narrative Input Block */}
      <section className="glass-panel p-6 border-cyan-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CompassIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Initial Narrative</h2>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={clearNarrative}
              className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-all"
            >
              Clear
            </button>
            <button 
              onClick={handleRandomize}
              className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/60 hover:text-cyan-400 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              Randomize
            </button>
            <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Max {params.maxSequenceLength} symbols</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 min-h-[100px] p-6 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />
          <AnimatePresence mode='popLayout'>
            {narrative.map((glyph, i) => (
              <motion.button
                key={`${glyph}-${i}`}
                layout
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                onClick={() => removeSymbol(i)}
                className="text-5xl cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {glyph}
              </motion.button>
            ))}
          </AnimatePresence>
          {narrative.length === 0 && (
            <p className="text-[10px] font-bold tracking-[0.3em] opacity-20 uppercase">Select symbols to begin</p>
          )}
        </div>
      </section>

      {/* Semantic Distillation Section */}
      <section className="glass-panel p-6 space-y-4 border-black/10 border-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-black" />
            <h3 className="font-bold uppercase text-xs tracking-widest">Semantic Distillation</h3>
          </div>
          <span className="text-[10px] font-mono opacity-40 uppercase">Primary Input Method</span>
        </div>
        <div className="space-y-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a story, poem, or any human/AI writing here to distill it into a symbolic narrative..."
            className="w-full h-64 bg-black/5 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-y transition-all font-serif leading-relaxed"
          />
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-mono opacity-40 uppercase">Chars: {inputText.length}</span>
            <span className="text-[10px] font-mono opacity-40 uppercase">V9 Context Window Active</span>
          </div>
          <button
            onClick={handleDistill}
            disabled={isDistilling || !inputText.trim()}
            className={cn(
              "w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all uppercase text-xs font-bold tracking-widest",
              isDistilling ? "bg-black/20 cursor-not-allowed" : "bg-black text-white hover:bg-black/80"
            )}
          >
            {isDistilling ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                {distillStatus || "Distilling Meaning..."}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Distill Narrative
              </>
            )}
          </button>
          {distillStatus && !isDistilling && (
            <p className="text-[10px] text-center font-mono opacity-60 animate-pulse">{distillStatus}</p>
          )}
        </div>
      </section>

      {/* Simulation Results Display */}
      {results && (
        <div className="space-y-6">
          {results.originalText && (
            <div className="glass-panel p-4 bg-black/5 border-black/5">
              <div className="flex items-center gap-2 mb-2 opacity-40">
                <FileText className="w-3 h-3" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Source Distillation</span>
              </div>
              <p className="text-xs font-serif italic text-black/60 line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                "{results.originalText}"
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EvolutionTimelineCard 
              results={results}
              currentStepIdx={currentStepIdx}
              setCurrentStepIdx={setCurrentStepIdx}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />

            <TelicEvolutionChart chartData={chartData} />
          </div>

          <CompressionDynamicsChart chartData={chartData} />

          <CompressionHistoryTable 
            results={results}
            simSteps={simSteps}
            handleExport={handleExport}
          />
        </div>
      )}
    </div>
  );
};
