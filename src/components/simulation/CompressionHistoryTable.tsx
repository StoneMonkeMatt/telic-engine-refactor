import React from 'react';
import { Activity, Target, Database } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SimulationResults } from '../../types';

interface CompressionHistoryTableProps {
  results: SimulationResults | null;
  simSteps: number;
  handleExport: () => void;
}

export const CompressionHistoryTable: React.FC<CompressionHistoryTableProps> = ({
  results,
  simSteps,
  handleExport
}) => {
  if (!results) return null;

  return (
    <div className="glass-panel">
      <div className="p-4 border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Compression History</h3>
            {results.observerEmerged && (
              <div className="flex items-center gap-2 text-emerald-600 animate-pulse">
                <Activity className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Observer Emerged @ Step {results.observerStep}</span>
              </div>
            )}
            {results.history.length && results.history.length < simSteps + 1 && (
              <div className="flex items-center gap-2 text-amber-500">
                <Target className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Attractor Reached @ Step {results.history.length - 1}</span>
              </div>
            )}
          </div>
        <button 
          onClick={handleExport}
          className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-1 transition-opacity"
        >
          <Database className="w-3 h-3" />
          Export JSON
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <div className="data-row bg-black/5 grid-cols-[40px_1fr_60px_60px_60px_60px_60px_60px_40px_80px_60px]">
          <span className="col-header">Step</span>
          <span className="col-header">Sequence</span>
          <span className="col-header text-right">Telic</span>
          <span className="col-header text-right">Info/Coh/En</span>
          <span className="col-header text-right">Duality (R/S)</span>
          <span className="col-header text-right">Resil</span>
          <span className="col-header text-right">M97</span>
          <span className="col-header text-center">Adv</span>
          <span className="col-header text-center">Δ</span>
          <span className="col-header text-right">Compass</span>
          <span className="col-header text-right">Consensus</span>
        </div>
        {results.history.map((step, i) => (
          <div key={i} className={cn(
            "data-row grid-cols-[40px_1fr_60px_60px_60px_60px_60px_60px_40px_80px_60px] hover:bg-black/5 transition-colors",
            step.accepted === false ? "opacity-40" : ""
          )}>
            <span className="data-value text-[10px] opacity-40">{step.step}</span>
            <span className="text-xl tracking-tighter flex items-center gap-1">
              {step.sequence.join('')}
              {step.proposalType && (
                <span className={cn(
                  "text-[8px] font-bold uppercase px-1 rounded opacity-60",
                  step.proposalType === 'Preserver' ? "bg-emerald-500/20 text-emerald-400" :
                  step.proposalType === 'Catalyst' ? "bg-amber-500/20 text-amber-400" :
                  step.proposalType === 'Synthesizer' ? "bg-purple-500/20 text-purple-400" :
                  "bg-black/5 opacity-40"
                )}>
                  {step.proposalType}
                </span>
              )}
            </span>
            <span className="data-value text-[10px] text-right font-bold">{step.telicScore.toFixed(3)}</span>
            <span className="data-value text-[8px] text-right opacity-60">
              {step.scoreInfo.toFixed(2)}/{step.scoreCoherence.toFixed(2)}/{step.scoreEnergy.toFixed(2)}
            </span>
            <span className="data-value text-[8px] text-right">
              <span className="opacity-40">{step.rawDuality.toFixed(2)}</span>
              <span className="mx-1">/</span>
              <span className="font-bold">{step.duality.toFixed(2)}</span>
            </span>
            <span className="data-value text-[10px] text-right text-blue-600">{step.resilience.toFixed(3)}</span>
            <span className="data-value text-[10px] text-right opacity-60">{step.mod97}</span>
            <span className={cn("data-value text-[8px] text-center font-bold uppercase", step.adversarialPassed ? "text-emerald-600" : "text-red-500")}>
              {step.adversarialPassed ? "✓" : "✗"}
            </span>
            <span className="flex items-center justify-center gap-0.5">
              {step.inventoryChanged && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" title="Inventory Changed" />}
              {step.orderChanged && !step.inventoryChanged && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Order Changed" />}
            </span>
            <span className="data-value text-[9px] text-right opacity-60 uppercase font-bold">{step.compassMatch}</span>
            <span className="data-value text-[10px] text-right font-bold text-cyan-600">{(step.consensusScore || 0).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
