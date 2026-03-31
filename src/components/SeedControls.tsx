import React from 'react';
import { RefreshCw, Lock, Copy } from 'lucide-react';

interface SeedControlsProps {
  seed: number;
  autoRandomize: boolean;
  setAutoRandomize: (val: boolean) => void;
  setSeed: (val: number) => void;
}

export function SeedControls({ seed, autoRandomize, setAutoRandomize, setSeed }: SeedControlsProps) {
  return (
    <div className="space-y-2 pt-2 border-t border-white/10">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
        <span className="opacity-40 flex items-center gap-2">
          Experiment Seed
          <button 
            onClick={() => setAutoRandomize(!autoRandomize)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border transition-all ${
              autoRandomize 
                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                : "bg-white/5 border-white/10 text-white/30 hover:text-white/50"
            }`}
            title={autoRandomize ? "Auto-Randomize Enabled" : "Manual Seed Mode"}
          >
            {autoRandomize ? <RefreshCw className="w-2 h-2 animate-spin-slow" /> : <Lock className="w-2 h-2" />}
            <span className="text-[7px] font-bold">{autoRandomize ? "AUTO" : "MANUAL"}</span>
          </button>
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(seed.toString());
            }}
            className="p-1 hover:text-cyan-400 transition-colors"
            title="Copy Seed"
          >
            <Copy className="w-2.5 h-2.5" />
          </button>
          <span className="text-cyan-400 font-bold">{seed}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={seed || 0}
          onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
        />
        <button 
          onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
          className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-cyan-400 transition-colors"
          title="Generate Random Seed"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
