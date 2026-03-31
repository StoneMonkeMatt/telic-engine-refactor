import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export function AgentCard({ icon, name, role, mission, strategy, color }: { icon: React.ReactNode, name: string, role: string, mission: string, strategy: string, color: 'cyan' | 'emerald' | 'purple' }) {
  const colors = {
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn("glass-panel p-8 space-y-6 border transition-all", colors[color])}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-2xl">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-widest">{name}</h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{role}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Mission</h4>
          <p className="text-sm text-white/80 leading-relaxed">{mission}</p>
        </div>
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Strategy</h4>
          <p className="text-sm text-white/40 leading-relaxed italic">{strategy}</p>
        </div>
      </div>
    </motion.div>
  );
}
