import React from 'react';
import { Settings2, Info, RefreshCw } from 'lucide-react';
import { TelosParams } from '../types';
import { cn } from '../lib/utils';
import { SeedControls } from './SeedControls';

interface ParameterPanelProps {
  params: TelosParams;
  setParams: (params: TelosParams) => void;
  simSteps: number;
  setSimSteps: (steps: number) => void;
  runSimulation: () => void;
  autoRandomize: boolean;
  setAutoRandomize: (val: boolean) => void;
  setSeed: (seed: number) => void;
}

export function ParameterPanel({
  params,
  setParams,
  simSteps,
  setSimSteps,
  runSimulation,
  autoRandomize,
  setAutoRandomize,
  setSeed
}: ParameterPanelProps) {
  const labels: Record<string, string> = {
    alpha: "Information Weight",
    gamma: "Coherence Weight",
    delta: "Energy Weight",
    beta: "Complexity Penalty",
    lambda: "Coupling Factor (λ)",
    maxSequenceLength: "Max Sequence Length",
    threshold: "Observer Threshold",
    eta: "Binding Strength (η)",
    epsilon: "Noise Level (ε)",
    temperature: "Simulation Temp"
  };

  const tooltips: Record<string, string> = {
    alpha: "Influences how much the system values information richness.",
    gamma: "Determines the importance of semantic alignment between symbols.",
    delta: "Controls the dynamic potential and drive within the sequence.",
    beta: "Penalizes overly convoluted or redundant symbolic structures.",
    lambda: "Adjusts the strength of interaction between information and coherence.",
    maxSequenceLength: "Sets the maximum number of symbols allowed in a sequence. 10 is canonical, 16 is research, 24+ is stress.",
    threshold: "The duality level required for an 'Observer' to emerge.",
    eta: "Controls the strength of semantic binding between symbols.",
    epsilon: "The amount of random noise injected into the duality evolution.",
    temperature: "Controls the stochasticity of the evolution process."
  };

  return (
    <section className="glass-panel p-5 space-y-5">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Settings2 className="w-4 h-4 text-cyan-400" />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Parameters</h2>
      </div>
      <div className="space-y-4">
        {Object.entries(params).filter(([key]) => key !== 'seed').map(([key, value]) => {
          const label = labels[key] || key;
          const tooltip = tooltips[key];

          if (key === 'architectureMode') {
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="opacity-40">Architecture Mode</span>
                  <span className="text-cyan-400 font-bold">{value}</span>
                </div>
                <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                  {(['stratified', 'flat'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setParams({ ...params, architectureMode: m })}
                      className={cn(
                        "flex-1 py-1 rounded text-[8px] font-bold uppercase tracking-widest transition-all",
                        params.architectureMode === m ? "bg-cyan-500 text-ocean-950" : "text-white/40 hover:bg-white/5"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          if (key === 'maxSequenceLength') {
            const val = value as number;
            let status = "Canonical";
            let statusColor = "text-emerald-400";
            if (val > 10 && val <= 16) {
              status = "Research";
              statusColor = "text-cyan-400";
            } else if (val > 16) {
              status = "Stress Test";
              statusColor = "text-amber-400";
            }

            return (
              <div key={key} className="space-y-2 group relative">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="opacity-40 flex items-center gap-1">
                    {label}
                    {tooltip && <Info className="w-2.5 h-2.5 opacity-40" title={tooltip} />}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[8px] font-bold uppercase px-1 rounded bg-white/5", statusColor)}>
                      {status}
                    </span>
                    <span className="text-cyan-400 font-bold">{value}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={value}
                  onChange={(e) => setParams({ ...params, [key]: parseInt(e.target.value) })}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[7px] font-mono opacity-30 uppercase tracking-tighter">
                  <span>5</span>
                  <span className={val === 10 ? "opacity-100 font-bold text-emerald-400" : ""}>10 (Canonical)</span>
                  <span className={val === 16 ? "opacity-100 font-bold text-cyan-400" : ""}>16 (Research)</span>
                  <span>30 (Stress)</span>
                </div>
              </div>
            );
          }

          return (
            <div key={key} className="space-y-2 group relative">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                <span className="opacity-40 flex items-center gap-1">
                  {label}
                  {tooltip && <Info className="w-2.5 h-2.5 opacity-40" title={tooltip} />}
                </span>
                <span className="text-cyan-400 font-bold">{value}</span>
              </div>
              <input
                type="range"
                min={key === 'maxSequenceLength' ? "5" : "0"}
                max={key === 'lambda' ? "2" : (key === 'maxSequenceLength' ? "30" : "1")}
                step={key === 'maxSequenceLength' ? "1" : "0.01"}
                value={value}
                onChange={(e) => setParams({ ...params, [key]: parseFloat(e.target.value) })}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          );
        })}

        <SeedControls 
          seed={params.seed}
          autoRandomize={autoRandomize}
          setAutoRandomize={setAutoRandomize}
          setSeed={setSeed}
        />
        
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Simulation Depth</label>
            <span className="text-[10px] font-mono font-bold text-cyan-400">{simSteps} steps</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={simSteps}
            onChange={(e) => setSimSteps(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <p className="text-[9px] opacity-30 italic leading-relaxed">Higher depth allows for deeper convergence in complex narratives.</p>
        </div>
      </div>
      <button
        onClick={runSimulation}
        className="w-full bg-cyan-500 text-ocean-950 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all uppercase text-[10px] font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Re-Simulate
      </button>
    </section>
  );
}
