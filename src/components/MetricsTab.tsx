import React from 'react';
import { 
  Target, Zap, Shield, BarChart3, Compass as CompassIcon, 
  Eye, Activity, RefreshCw, TrendingUp, Pause, Edit3, Move, 
  CheckCircle2, Workflow, Layers 
} from 'lucide-react';
import { MetricCard } from '../manual/components';
import { MetricsData, SimulationResults, BridgeFamilyStats, TelosParams } from '../types';
import { cn } from '../lib/utils';

interface MetricsTabProps {
  metrics: MetricsData;
  results: SimulationResults | null;
  params: TelosParams;
}

export const MetricsTab: React.FC<MetricsTabProps> = ({
  metrics,
  results,
  params,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MetricCard 
          title="Convergence" 
          value={metrics.convergenceIters} 
          unit="steps" 
          icon={<Target className="w-4 h-4" />} 
          desc="Steps until sequence stability"
        />
        <MetricCard 
          title="Contraction" 
          value={(metrics.contractionRate * 100).toFixed(1)} 
          unit="%" 
          icon={<Zap className="w-4 h-4" />} 
          desc="Final length vs initial length"
        />
        <MetricCard 
          title="Fidelity" 
          value={metrics.fidelity.toFixed(3)} 
          unit="ratio" 
          icon={<Shield className="w-4 h-4" />} 
          desc="Weight preservation index"
        />
        <MetricCard 
          title="CF Index" 
          value={metrics.cfIndex.toFixed(3)} 
          unit="index" 
          icon={<BarChart3 className="w-4 h-4" />} 
          desc="Codex Fidelity (Entropy × Coherence)"
        />
        <MetricCard 
          title="Resonance Signature" 
          value={`Φ-${metrics.mod97Final.toString().padStart(2, '0')}`} 
          unit="MOD97" 
          icon={<CompassIcon className="w-4 h-4" />} 
          desc="Unique symbolic fingerprint of the final narrative state."
          status={metrics.mod97Final > 50 ? 'success' : undefined}
        />
        <MetricCard 
          title="Resilience" 
          value={metrics.resilience.toFixed(3)} 
          unit="index" 
          icon={<Shield className="w-4 h-4" />} 
          desc="Ability to survive Void confrontation"
          status={metrics.resilience > 0.5 ? 'success' : undefined}
        />
        <MetricCard 
          title="Observer" 
          value={metrics.observerEmerged ? "EMERGED" : "ABSENT"} 
          unit="" 
          icon={<Eye className="w-4 h-4" />} 
          desc={`Duality crossed threshold (${params.threshold})`}
          status={metrics.observerEmerged ? 'success' : undefined}
        />
        <MetricCard 
          title="Adversarial" 
          value={metrics.adversarialPassed ? "PASSED" : "FAILED"} 
          unit="" 
          icon={<Activity className="w-4 h-4" />} 
          desc="Stability against Void negation"
          status={metrics.adversarialPassed ? 'success' : 'error'}
        />
        <MetricCard 
          title="Iterations Run" 
          value={results?.iterationsRun || 0} 
          unit="steps" 
          icon={<RefreshCw className="w-4 h-4" />} 
          desc="Total steps executed"
        />
        <MetricCard 
          title="Best Score Step" 
          value={metrics.bestScoreStep} 
          unit="step" 
          icon={<TrendingUp className="w-4 h-4" />} 
          desc="Step where max telic score was first reached"
        />
        <MetricCard 
          title="Plateau Start" 
          value={metrics.plateauStartStep} 
          unit="step" 
          icon={<Pause className="w-4 h-4" />} 
          desc="First step after which score never improved"
        />
        <MetricCard 
          title="Last Inventory Change" 
          value={metrics.lastInventoryChangeStep} 
          unit="step" 
          icon={<Edit3 className="w-4 h-4" />} 
          desc="Last step where sequence was modified"
        />
        <MetricCard 
          title="Last Order Change" 
          value={metrics.lastOrderChangeStep} 
          unit="step" 
          icon={<Move className="w-4 h-4" />} 
          desc="Last step where sequence order changed"
        />
        <MetricCard 
          title="Last Accepted Proposal" 
          value={metrics.lastAcceptedChangeStep} 
          unit="step" 
          icon={<CheckCircle2 className="w-4 h-4" />} 
          desc="Last step where any proposal was accepted"
        />
        <MetricCard 
          title="Last Meaningful Change" 
          value={metrics.lastMeaningfulAcceptedStep} 
          unit="step" 
          icon={<Zap className="w-4 h-4" />} 
          desc="Last step with inventory change or score shift"
        />
        <MetricCard 
          title="Kernel Purity" 
          value={(metrics.kernelPurity * 100).toFixed(1)} 
          unit="%" 
          icon={<Target className="w-4 h-4" />} 
          desc="Proportion of kernel symbols in final state"
        />
        <MetricCard 
          title="Bridge Activation" 
          value={(metrics.bridgeActivationRate * 100).toFixed(1)} 
          unit="%" 
          icon={<Workflow className="w-4 h-4" />} 
          desc="Cross-domain transition frequency"
        />
        <MetricCard 
          title="Consensus Score" 
          value={metrics.mirrorMetric.toFixed(3)} 
          unit="avg" 
          icon={<CheckCircle2 className="w-4 h-4" />} 
          desc="Average agent consensus across simulation"
        />
        <MetricCard 
          title="Telic Trend" 
          value={metrics.telicScoreTrend > 0 ? `+${metrics.telicScoreTrend.toFixed(4)}` : metrics.telicScoreTrend.toFixed(4)} 
          unit="Δ" 
          icon={<TrendingUp className="w-4 h-4" />} 
          desc="Final step score improvement"
        />
        <MetricCard 
          title="Total Bridges" 
          value={metrics.totalBridges} 
          unit="count" 
          icon={<Workflow className="w-4 h-4" />} 
          desc="Total accepted bridge crossings across all steps"
        />
        <MetricCard 
          title="Unique Bridges" 
          value={metrics.uniqueBridges} 
          unit="types" 
          icon={<Layers className="w-4 h-4" />} 
          desc="Number of distinct bridge keys activated"
        />
      </div>

      {results?.proposalStats && (
        <div className="mt-16 space-y-8">
          <div className="flex items-center gap-4 text-cyan-400">
            <Activity className="w-6 h-6" />
            <h4 className="font-bold uppercase text-xs tracking-[0.4em]">Proposal Statistics</h4>
          </div>
          <div className="glass-panel overflow-hidden">
            <div className="data-row bg-black/5 grid-cols-[120px_1fr_1fr_1fr_1fr]">
              <span className="col-header">Operator</span>
              <span className="col-header text-right">Proposed</span>
              <span className="col-header text-right">Accepted</span>
              <span className="col-header text-right">Accept Rate</span>
              <span className="col-header text-right">Avg Δ Score</span>
            </div>
            {Object.entries(results.proposalStats.counts).map(([type, stats]) => {
              const s = stats as any;
              return (
                <div key={type} className="data-row grid-cols-[120px_1fr_1fr_1fr_1fr] hover:bg-black/5 transition-colors">
                  <span className="data-value text-[10px] font-bold uppercase tracking-widest opacity-60">{type}</span>
                  <span className="data-value text-[10px] text-right">{s.proposed}</span>
                  <span className="data-value text-[10px] text-right">{s.accepted}</span>
                  <span className="data-value text-[10px] text-right font-bold">
                    {(s.acceptanceRate * 100).toFixed(1)}%
                  </span>
                  <span className={cn(
                    "data-value text-[10px] text-right",
                    s.meanDeltaScore > 0 ? "text-emerald-500" : s.meanDeltaScore < 0 ? "text-red-500" : ""
                  )}>
                    {s.accepted > 0 ? s.meanDeltaScore.toFixed(3) : "—"}
                  </span>
                </div>
              );
            })}
            <div className="data-row bg-cyan-500/5 grid-cols-[120px_1fr_1fr_1fr_1fr] font-bold">
              <span className="data-value text-[10px] uppercase tracking-widest text-cyan-500">Total</span>
              <span className="data-value text-[10px] text-right">{results.proposalStats.totalProposed}</span>
              <span className="data-value text-[10px] text-right">{results.proposalStats.totalAccepted}</span>
              <span className="data-value text-[10px] text-right">
                {(results.proposalStats.acceptanceRateOverall * 100).toFixed(1)}%
              </span>
              <span className="data-value text-[10px] text-right">—</span>
            </div>
            <div className="data-row bg-black/20 grid-cols-[120px_1fr_1fr_1fr_1fr] text-white/40 italic">
              <span className="data-value text-[10px] uppercase tracking-widest">None (No-op)</span>
              <span className="data-value text-[10px] text-right">{results.proposalStats.noneProposed}</span>
              <span className="data-value text-[10px] text-right">—</span>
              <span className="data-value text-[10px] text-right">—</span>
              <span className="data-value text-[10px] text-right">—</span>
            </div>
          </div>
        </div>
      )}

      {results?.history && (
        <div className="mt-16 space-y-8">
          <div className="flex items-center gap-4 text-cyan-400">
            <Workflow className="w-6 h-6" />
            <h4 className="font-bold uppercase text-xs tracking-[0.4em]">Bridge Activity Trace</h4>
          </div>
          <div className="glass-panel overflow-hidden">
            <div className="data-row bg-black/5 grid-cols-[60px_120px_100px_100px_1fr_80px_80px]">
              <span className="col-header">Step</span>
              <span className="col-header">Bridge Key</span>
              <span className="col-header">From</span>
              <span className="col-header">To</span>
              <span className="col-header">Agent / Op</span>
              <span className="col-header text-right">Δ Score</span>
              <span className="col-header text-right">Status</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {results.history.flatMap(h => (h.bridgeEvents || []).map(e => ({ ...e, step: h.step }))).length > 0 ? (
                results.history.flatMap(h => (h.bridgeEvents || []).map(e => ({ ...e, step: h.step }))).map((event, idx) => (
                  <div key={`${event.step}-${idx}`} className={cn(
                    "data-row grid-cols-[60px_120px_100px_100px_1fr_80px_80px] hover:bg-white/5 transition-colors border-b border-white/5",
                    !event.accepted && "opacity-40 grayscale-[0.5]"
                  )}>
                    <span className="data-value text-[10px] opacity-40">{event.step}</span>
                    <span className="data-value text-[10px] font-bold text-cyan-400 truncate pr-2" title={event.bridgeKey}>
                      {event.bridgeKey}
                    </span>
                    <span className="data-value text-[10px] flex items-center gap-1">
                      <span className="text-lg">{event.fromSymbol}</span>
                      <span className="opacity-40 text-[8px] uppercase">{event.fromDomain}</span>
                    </span>
                    <span className="data-value text-[10px] flex items-center gap-1">
                      <span className="text-lg">{event.toSymbol}</span>
                      <span className="opacity-40 text-[8px] uppercase">{event.toDomain}</span>
                    </span>
                    <span className="data-value text-[10px] flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold uppercase tracking-tighter text-white/60">
                        {event.agent}
                      </span>
                      <span className="opacity-40 text-[8px] uppercase">{event.proposalType}</span>
                    </span>
                    <span className={cn(
                      "data-value text-[10px] text-right font-mono",
                      event.deltaScore > 0 ? "text-emerald-400" : event.deltaScore < 0 ? "text-red-400" : ""
                    )}>
                      {event.deltaScore > 0 ? "+" : ""}{event.deltaScore.toFixed(3)}
                    </span>
                    <span className="data-value text-right">
                      {event.accepted ? (
                        <span className="text-[8px] font-bold uppercase text-emerald-400 px-1 bg-emerald-400/10 rounded">Accepted</span>
                      ) : (
                        <span className="text-[8px] font-bold uppercase text-white/20 px-1 bg-white/5 rounded">Rejected</span>
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center space-y-2">
                  <Workflow className="w-8 h-8 text-white/10 mx-auto" />
                  <p className="text-[10px] uppercase tracking-widest text-white/20">No bridge activations recorded in this run</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {results?.bridgeSummary && Object.keys(results.bridgeSummary.families).length > 0 && (
        <div className="mt-16 space-y-8">
          <div className="flex items-center gap-4 text-cyan-400">
            <Layers className="w-6 h-6" />
            <h4 className="font-bold uppercase text-xs tracking-[0.4em]">Bridge Family Statistics</h4>
          </div>
          <div className="glass-panel overflow-hidden">
            <div className="data-row bg-black/5 grid-cols-[180px_1fr_1fr_1fr_1fr_1fr_1fr]">
              <span className="col-header">Family</span>
              <span className="col-header text-right">Proposed</span>
              <span className="col-header text-right">Accepted</span>
              <span className="col-header text-right">Accept Rate</span>
              <span className="col-header text-right">Avg Δ Score</span>
              <span className="col-header text-right">Avg Δ Φ</span>
              <span className="col-header text-right">Safe Rate</span>
            </div>
            {Object.entries(results.bridgeSummary.families).map(([family, s]) => {
              const stats = s as BridgeFamilyStats;
              return (
                <div key={family} className="data-row grid-cols-[180px_1fr_1fr_1fr_1fr_1fr_1fr] hover:bg-black/5 transition-colors">
                  <span className="data-value text-[10px] font-bold text-cyan-400 truncate pr-2" title={family}>
                    {family}
                  </span>
                  <span className="data-value text-[10px] text-right">{stats.proposed}</span>
                  <span className="data-value text-[10px] text-right">{stats.accepted}</span>
                  <span className="data-value text-[10px] text-right font-bold">
                    {(stats.acceptanceRate * 100).toFixed(1)}%
                  </span>
                  <span className={cn(
                    "data-value text-[10px] text-right font-mono",
                    stats.meanAcceptedDeltaScore > 0 ? "text-emerald-400" : stats.meanAcceptedDeltaScore < 0 ? "text-red-400" : ""
                  )}>
                    {stats.accepted > 0 ? (stats.meanAcceptedDeltaScore > 0 ? "+" : "") + stats.meanAcceptedDeltaScore.toFixed(3) : "—"}
                  </span>
                  <span className={cn(
                    "data-value text-[10px] text-right font-mono",
                    stats.meanAcceptedDeltaCoherence > 0 ? "text-emerald-400" : stats.meanAcceptedDeltaCoherence < 0 ? "text-red-400" : ""
                  )}>
                    {stats.accepted > 0 ? (stats.meanAcceptedDeltaCoherence > 0 ? "+" : "") + stats.meanAcceptedDeltaCoherence.toFixed(4) : "—"}
                  </span>
                  <span className={cn(
                    "data-value text-[10px] text-right font-bold",
                    stats.acceptedSafeRate > 0.8 ? "text-emerald-400" : stats.acceptedSafeRate < 0.5 ? "text-red-400" : "text-amber-400"
                  )}>
                    {stats.accepted > 0 ? (stats.acceptedSafeRate * 100).toFixed(1) + "%" : "—"}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 space-y-4">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Rejected Bridge Analysis</h5>
              <div className="space-y-2">
                {Object.entries(results.bridgeSummary.families).filter(([_, s]) => (s as BridgeFamilyStats).rejected > 0).map(([family, s]) => {
                  const stats = s as BridgeFamilyStats;
                  return (
                    <div key={family} className="flex justify-between items-center text-[10px]">
                      <span className="text-white/60 truncate max-w-[150px]">{family}</span>
                      <div className="flex gap-4">
                        <span className="text-red-400/60">Avoided Δ Score: {stats.meanRejectedDeltaScore.toFixed(2)}</span>
                        <span className="text-red-400/60">Avoided Δ Φ: {stats.meanRejectedDeltaCoherence.toFixed(4)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass-panel p-6 space-y-4">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Structural Impact</h5>
              <div className="space-y-2">
                {Object.entries(results.bridgeSummary.families).filter(([_, s]) => (s as BridgeFamilyStats).accepted > 0).map(([family, s]) => {
                  const stats = s as BridgeFamilyStats;
                  return (
                    <div key={family} className="flex justify-between items-center text-[10px]">
                      <span className="text-white/60 truncate max-w-[150px]">{family}</span>
                      <div className="flex gap-4">
                        <span className={cn(stats.meanKernelPurityChange >= 0 ? "text-emerald-400/60" : "text-red-400/60")}>
                          Purity: {stats.meanKernelPurityChange >= 0 ? "+" : ""}{(stats.meanKernelPurityChange * 100).toFixed(1)}%
                        </span>
                        <span className={cn(stats.meanKernelDivergenceChange <= 0 ? "text-emerald-400/60" : "text-red-400/60")}>
                          Divergence: {stats.meanKernelDivergenceChange >= 0 ? "+" : ""}{(stats.meanKernelDivergenceChange * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
