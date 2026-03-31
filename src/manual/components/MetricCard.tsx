import React from 'react';
import { cn } from '../../lib/utils';

export function MetricCard({ title, value, unit, icon, desc, status }: { 
  title: string, 
  value: string | number, 
  unit: string, 
  icon: React.ReactNode, 
  desc: string,
  status?: 'success' | 'error'
}) {
  return (
    <div className="glass-panel p-6 space-y-5 border-white/5 group hover:border-cyan-500/30 transition-all">
      <div className="flex items-center justify-between">
        <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">{title}</span>
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "text-4xl font-bold tracking-tighter glow-text-cyan",
            status === 'success' && "text-cyan-400",
            status === 'error' && "text-rose-400"
          )}>{value}</span>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{unit}</span>
        </div>
        <p className="text-[10px] text-white/40 leading-relaxed mt-3 font-medium">{desc}</p>
      </div>
    </div>
  );
}
