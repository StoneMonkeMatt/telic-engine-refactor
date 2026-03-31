import React from 'react';

export function VisionCard({ index, title, subtitle, impact, icon }: {
  index: string,
  title: string,
  subtitle: string,
  impact: string,
  icon: React.ReactNode
}) {
  return (
    <div className="glass-panel p-8 space-y-8 group hover:bg-white hover:text-ocean-950 transition-all duration-700 border-white/5">
      <div className="flex items-center justify-between">
        <span className="text-5xl font-bold opacity-5 group-hover:opacity-10 font-mono tracking-tighter">{index}</span>
        <div className="p-3 bg-white/5 group-hover:bg-ocean-950/5 rounded-2xl text-cyan-400 transition-colors">
          {icon}
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 group-hover:text-ocean-950/40">{subtitle}</h4>
        <h3 className="text-2xl font-bold leading-tight tracking-tight uppercase">{title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-white/40 group-hover:text-ocean-950/70 font-medium">
        {impact}
      </p>
    </div>
  );
}
