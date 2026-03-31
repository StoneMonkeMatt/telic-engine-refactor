import React from 'react';
import { Cpu, Activity, Layers, Shield, Workflow, Info, Zap, Database, AlertTriangle, Share2, CheckCircle2, Clock } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { cn } from '../../lib/utils';
import { ENGINE_IDENTITY } from '../content/engine-identity';
import { PARAMETERS_MAPPING } from '../content/parameters-mapping';
import { METRICS_MAPPING } from '../content/metrics-mapping';
import { EVENT_VOCABULARY } from '../content/event-vocabulary';
import { DIVERGENCE_REGISTRY } from '../content/divergence-registry';
import { EXPORT_MAPPING } from '../content/export-mapping';
import { IMPLEMENTATION_STATUS } from '../content/implementation-status';
import { 
  STRUCTURAL_LOGIC_SUMMARIES, 
  INITIALIZATION_LOGIC, 
  AGENT_PROPOSAL_STRATEGIES, 
  EVALUATION_WEIGHTS, 
  ENVIRONMENTAL_FACTORS, 
  ACCEPTANCE_CRITERIA, 
  STRUCTURAL_CHECKS, 
  SUMMARY_LOGIC_COMPONENTS 
} from '../content/engine-logic';
import { ACTIVE_SYMBOL_SET_CONFIG } from '../content/active-symbol-set';
import { BRIDGE_ACTIVATION_STATUS } from '../content/bridge-activation-status';
import { BRIDGE_EVENT_TYPES } from '../content/bridge-event-types';
import { COMPASS_ALIGNMENT_RULES } from '../content/compass-alignment';
import { DOMAIN_CONNECTIVITY_RULES } from '../content/domain-connectivity';
import { ENGINE_PARAMETER_TYPES } from '../content/engine-parameter-types';
import { EXPORT_RECORD_TYPES } from '../content/export-record-types';
import { METRIC_OUTPUT_TYPES } from '../content/metric-output-types';
import { MOD93_ALIGNMENT_STATUS } from '../content/mod93-alignment';

export const Part09CurrentEngineReference: React.FC = () => {
  return (
    <>
      <ManualSectionDrawer 
        icon={Cpu} 
        title="Part IX. Current Engine Reference (V9)" 
        subtitle="Implementation Profile of the Telos Kernel"
      >
        <div className="space-y-8">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              This section provides a direct mapping between the canonical Compass lexicon and the current implementation in the <strong>Telos v0.9</strong> engine. It serves as both the technical contract and the live reference for the current simulation state.
            </p>
          </div>

          <div className="space-y-6">
            <ManualDrawer title="1. Engine Identity" defaultOpen={true}>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should have a unique <code>name</code> and <code>version</code> string. This allows researchers to identify which version of the Telos kernel was used for a specific run.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The current engine is <strong>Telos v0.9</strong>. It implements the core symbolic simulation logic and the Mod97 harmonic alignment system.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Engine Name", value: ENGINE_IDENTITY.name },
                    { label: "Current Version", value: ENGINE_IDENTITY.version },
                    { label: "Ontology Version", value: ENGINE_IDENTITY.ontologyVersion },
                    { label: "Architecture Modes", value: ENGINE_IDENTITY.architecture },
                    { label: "Default Mode", value: ENGINE_IDENTITY.defaultMode },
                    { label: "Canonical Seq Length", value: ENGINE_IDENTITY.canonicalSeqLength },
                    { label: "Observer Persistence", value: ENGINE_IDENTITY.observerPersistence }
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="2. Current Parameter Map">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should expose a set of tunable parameters that govern the simulation regime. These parameters should be documented with their default values and expected ranges.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The Telos v0.9 engine uses the <code>TelosParams</code> interface to define its input parameters. These are passed to the <code>Telos</code> constructor at initialization.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] text-white/40 italic mb-4">Live input parameters governing the simulation regime.</p>
                  <div className="space-y-2 mb-6">
                    <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Technical Specification</div>
                    <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{ENGINE_PARAMETER_TYPES}
                    </pre>
                  </div>
                  {PARAMETERS_MAPPING.map((p, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">{p.label}</h4>
                          <p className="text-[10px] text-white/40 mt-1">{p.description}</p>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter ${p.exposure === 'user-facing' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white/40'}`}>
                          {p.exposure || 'internal'}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/5">
                        <div>
                          <div className="text-[8px] text-white/20 uppercase font-bold">Engine Key</div>
                          <div className="text-[10px] font-mono text-cyan-400">`{p.key}`</div>
                        </div>
                        <div>
                          <div className="text-[8px] text-white/20 uppercase font-bold">Type</div>
                          <div className="text-[10px] text-white/60">{p.type || 'number'}</div>
                        </div>
                        <div>
                          <div className="text-[8px] text-white/20 uppercase font-bold">Default</div>
                          <div className="text-[10px] text-white/60">{p.default || '0.0'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="3. Current Metric Map">
              <div className="space-y-4">
                <p className="text-[10px] text-white/40 italic mb-4">Live output metrics produced by the engine.</p>
                <div className="space-y-2 mb-6">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Technical Specification</div>
                  <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{METRIC_OUTPUT_TYPES}
                  </pre>
                </div>
                {METRICS_MAPPING.map((m, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">{m.label}</h4>
                        <p className="text-[10px] text-white/40 mt-1">{m.interpretation || m.description}</p>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-white/10 text-white/40 text-[8px] font-bold uppercase tracking-tighter">
                        {m.type || 'derived'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <div>
                        <div className="text-[8px] text-white/20 uppercase font-bold">Engine Key</div>
                        <div className="text-[10px] font-mono text-cyan-400">`{m.key}`</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-white/20 uppercase font-bold">Layer Ownership</div>
                        <div className="text-[10px] text-white/60">{m.layer || 'SimulationStep'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ManualDrawer>

            <ManualDrawer title="4. Event Vocabulary in Use">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should emit a set of named events during execution. These events should be documented with their triggers and descriptions.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The Telos v0.9 engine uses the <code>EVENT_VOCABULARY</code> constant to define its live events. These are emitted via the <code>onEvent</code> callback.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] text-white/40 italic mb-4">Actual live events emitted by the current engine.</p>
                  {EVENT_VOCABULARY.map((e, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-cyan-400 font-mono tracking-wider">`{e.id}`</h4>
                        <span className="text-[8px] text-white/20 uppercase font-bold">{e.category}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] text-white/80"><span className="text-white/40">Trigger:</span> {e.trigger}</div>
                        <div className="text-[10px] text-white/80"><span className="text-white/40">Description:</span> {e.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="5. Current Structural Logic Summary">
              <div className="space-y-6 text-xs text-white/60 leading-relaxed">
                {STRUCTURAL_LOGIC_SUMMARIES.map((summary, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{summary.title}</h4>
                    <p>{summary.desc}</p>
                  </div>
                ))}
              </div>
            </ManualDrawer>

            <ManualDrawer title="6. Known Divergences from Canonical Lexicon">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 text-white/40 uppercase font-bold">Manual Term</th>
                      <th className="p-3 text-white/40 uppercase font-bold">Engine Term</th>
                      <th className="p-3 text-white/40 uppercase font-bold">Status</th>
                      <th className="p-3 text-white/40 uppercase font-bold">Action Needed</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    {DIVERGENCE_REGISTRY.map((div, idx) => (
                      <tr key={idx} className="border-b border-white/5">
                        <td className="p-3">{div.term}</td>
                        <td className="p-3 font-mono text-cyan-400">`{div.engineTerm}`</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                            div.status === 'Drift' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {div.status}
                          </span>
                        </td>
                        <td className="p-3 italic">{div.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ManualDrawer>

            <ManualDrawer title="7. Export Mapping">
              <div className="space-y-4">
                <p className="text-[10px] text-white/40 italic mb-4">How live engine values populate the canonical run record.</p>
                <div className="space-y-2 mb-6">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Export Record Contract</div>
                  <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{EXPORT_RECORD_TYPES}
                  </pre>
                </div>
                {EXPORT_MAPPING.map((item, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{item.target}</h4>
                      <span className="text-[8px] text-white/20 uppercase font-bold">Target Layer</span>
                    </div>
                    <div className="text-[10px] text-white/80"><span className="text-white/40">Source:</span> {item.source}</div>
                    <div className="text-[10px] text-white/60 leading-relaxed"><span className="text-white/40">Populated by:</span> {item.fields}</div>
                  </div>
                ))}
              </div>
            </ManualDrawer>

            <ManualDrawer title="8. Implementation Status">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {IMPLEMENTATION_STATUS.map((item, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex flex-col gap-1">
                    <div className="text-[9px] font-bold text-white/80 uppercase tracking-wider">{item.label}</div>
                    <div className={`text-[8px] font-bold uppercase tracking-tighter ${
                      item.status === 'implemented' ? 'text-cyan-400' : 
                      item.status === 'partially implemented' ? 'text-yellow-400' : 
                      'text-white/20'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </ManualDrawer>
          </div>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Activity} 
        title="Part IX-A. Engine Logic Overview" 
        subtitle="Governing Logic of the Telos Kernel"
        keywords="engine, logic, initialization, proposal, evaluation, acceptance, structural, observer, summary, kernel, purity, bridge, duality"
      >
        <div className="space-y-8">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              This section documents the governing logic of the current engine so that parameters, metrics, events, and exported records can be understood in relation to the actual simulation process that produces them.
            </p>
          </div>

          <div className="space-y-6">
            <ManualDrawer title="1. Initialization Logic" defaultOpen={true}>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should initialize its state based on the provided parameters and symbolic prompt. This includes setting up the PRNG with the provided seed.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The Telos v0.9 engine uses the <code>SeededRandom</code> utility to ensure execution reproducibility. While the simulation trajectory is deterministic for a given seed and initial sequence, upstream preparation (narrative distillation) may introduce non-deterministic variance unless the starting symbolic state is explicitly fixed.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>The engine initialization phase prepares the simulation environment by consuming the following inputs:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {INITIALIZATION_LOGIC.map((item, i) => (
                      <li key={i}>
                        <strong>{item.label}:</strong> {item.desc.replace('α, γ, δ, β', 'alpha (α), gamma (γ), delta (δ), beta (β)').replace('simSteps', 'maxSteps')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="2. Proposal Logic">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should propose candidate modifications to the symbolic sequence. These proposals should be driven by specialized agents with distinct structural goals.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The Telos v0.9 engine implements three agents: <strong>The Preserver</strong>, <strong>The Catalyst</strong>, and <strong>The Synthesizer</strong>. Each agent uses the <code>SeededRandom</code> instance for its stochastic choices.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>Candidate modifications to the symbolic sequence are produced through two primary regimes:</p>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                    <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Stratified Agent Proposals</h4>
                    <p>Three specialized agents operate in parallel, each targeting a specific structural goal:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {AGENT_PROPOSAL_STRATEGIES.map((agent, i) => (
                        <li key={i}><strong>{agent.name}:</strong> Conceptual focus on {agent.focus}, {agent.strategy}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                    <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Allowed Operations</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['insert', 'delete', 'swap', 'combine'].map(op => (
                        <div key={op} className="p-2 bg-white/5 rounded border border-white/5 font-mono text-cyan-400 text-[10px] text-center">
                          {op}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="3. Evaluation Logic">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should evaluate candidate symbolic states based on their structural and informational properties to determine their telic fitness.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The current engine evaluates candidate symbolic states through a composite telic score derived from four active components:
                    <br />- Information
                    <br />- Coherence
                    <br />- Energy
                    <br />- Complexity Penalty
                    <br /><br />
                    These components are combined through the live Telos scoring function together with a coupling interaction term. The current evaluation layer is therefore operational, not merely conceptual.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>Each candidate state is evaluated using the <strong>Unified Telic Equation</strong>:</p>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10 font-mono text-cyan-400 text-center text-sm">
                    Score = (α * Info) + (γ * Coherence) + (δ * Energy) - (β * Complexity)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-bold text-white/40 uppercase">Weights</h5>
                      {EVALUATION_WEIGHTS.map((weight, i) => (
                        <p key={i}><strong>{weight.label}:</strong> {weight.desc}</p>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-bold text-white/40 uppercase">Environmental Factors</h5>
                      {ENVIRONMENTAL_FACTORS.map((factor, i) => (
                        <p key={i}><strong>{factor.label}:</strong> {factor.desc}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="4. Acceptance Logic">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should decide whether to commit to a proposed change based on a set of criteria, including score improvement and stochastic acceptance.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The Telos v0.9 engine implements a Metropolis-Hastings style acceptance rule. It uses the <code>SeededRandom</code> instance to determine stochastic acceptance for lower-scoring proposals.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>The engine decides whether to commit to a proposed change based on the following criteria:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {ACCEPTANCE_CRITERIA.map((criterion, i) => (
                      <li key={i}>{criterion}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="5. Structural Logic">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should monitor the structural integrity and evolution of the symbolic sequence, identifying key transitions and stability points.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The live engine tracks structural change through inventory change, order change, kernel purity, bridge activation, fracture points, and post-run summary fields.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>The engine monitors the structural integrity of the sequence through several automated checks:</p>
                  <div className="space-y-3">
                    {STRUCTURAL_CHECKS.map((check, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <h5 className="text-[10px] font-bold text-white/80 uppercase mb-1">{check.label}</h5>
                        <p>{check.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="6. Observer Logic">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    Observer emergence should be treated as a non-linear phase transition triggered by sustained symbolic duality.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    The Telos v0.9 engine implements observer logic through threshold monitoring and a persistence counter.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>Observer emergence is a non-linear phase transition determined by the following logic:</p>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li><strong>Threshold Crossing:</strong> The engine monitors the <strong>Duality</strong> metric (Awareness vs. Structure). If Duality exceeds the <code>threshold</code> (currently {ENGINE_IDENTITY.observerThreshold}), the emergence timer starts.</li>
                    <li><strong>Persistence Requirement:</strong> Duality must remain above the threshold for a continuous number of steps defined by <code>observerPersistence</code> (currently {ENGINE_IDENTITY.observerPersistence}).</li>
                    <li><strong>Emergence Registration:</strong> Once persistence is met, an <code>observer_emerged</code> flag is set to true, and the current step is recorded as the <code>observerStep</code>.</li>
                  </ol>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>

            <ManualDrawer title="7. Summary Logic">
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The engine should produce a comprehensive summary of the simulation run, capturing terminal states, structural evolution, and diagnostic metadata.
                  </p>
                </div>
                <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                    At the end of execution, the current engine derives run-level summary fields, proposal statistics, and bridge-family summaries from the step history.
                  </p>
                </div>
                <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                  <p>Upon completion of the simulation, the engine derives the final data package:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SUMMARY_LOGIC_COMPONENTS.map((component, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <h5 className="text-[10px] font-bold text-white/80 uppercase mb-1">{component.label}</h5>
                        <p>{component.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                  </p>
                </div>
              </div>
            </ManualDrawer>
          </div>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Activity} 
        title="Part IX-B. Live Ontology Usage in Telos v0.9" 
        subtitle="Operational Status of the Symbolic Library"
        keywords="ontology, library, symbol, domain, connectivity, bridge, compass, mod97"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              While <code>library.ts</code> defines a complete symbolic world, the current Telos v0.9 simulation engine selectively utilizes these structures.
            </p>
          </div>

          <ManualDrawer title="1. Active Symbol Set">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The simulation should draw from a subset of the canonical symbolic library. This subset should be prioritized based on domain relevance and symbolic weight.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine uses the <code>ACTIVE_SYMBOL_SET_CONFIG</code> to filter the symbols imported from <code>library.ts</code>.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>The simulation currently draws from a subset of the <strong>{ACTIVE_SYMBOL_SET_CONFIG.totalSymbolCount}</strong> defined symbols. High-weight symbols and those in the <code>{ACTIVE_SYMBOL_SET_CONFIG.prioritizedDomains.join(', ')}</code> are prioritized for state initialization and proposal generation.</p>
                <div className="p-3 bg-ocean-900/50 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Info className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Implementation Note</span>
                  </div>
                  <p className="text-[10px] text-cyan-400/60">{ACTIVE_SYMBOL_SET_CONFIG.implementationNote}</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. Domain Connectivity">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should reward symbolic states that exhibit high domain connectivity and coherence.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine calculates coherence based on intra-domain and inter-domain symbolic relationships.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>Domain groupings are used to calculate <strong>Coherence</strong>. The engine rewards states where symbols share a domain or are connected via an active bridge.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Intra-Domain:</strong> {DOMAIN_CONNECTIVITY_RULES.intraDomainReward}</li>
                  <li><strong>Inter-Domain:</strong> {DOMAIN_CONNECTIVITY_RULES.interDomainReward}</li>
                </ul>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <h5 className="text-[10px] font-bold text-white/80 uppercase mb-1">Coherence Weighting</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[8px] text-white/20 uppercase font-bold">Inventory</div>
                      <div className="text-[10px] text-cyan-400">{DOMAIN_CONNECTIVITY_RULES.coherenceWeighting.inventoryCoherence * 100}%</div>
                    </div>
                    <div>
                      <div className="text-[8px] text-white/20 uppercase font-bold">Transition</div>
                      <div className="text-[10px] text-cyan-400">{DOMAIN_CONNECTIVITY_RULES.coherenceWeighting.transitionCoherence * 100}%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="3. Bridge Activation Status">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should support a wide range of symbolic bridges that facilitate transitions between different domains.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine activates a subset of the canonical bridge library based on current research priorities.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>Not all <strong>{BRIDGE_ACTIVATION_STATUS.totalBridges}</strong> bridges are equally active in the v0.9 engine. The "{BRIDGE_ACTIVATION_STATUS.activeFamilies[1]}" bridges ({BRIDGE_ACTIVATION_STATUS.primaryFlowBridges.join(', ')}) are the most robustly tested and utilized.</p>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <h5 className="text-[10px] font-bold text-white/80 uppercase mb-1">Active Bridge Families</h5>
                  <div className="flex flex-wrap gap-2">
                    {BRIDGE_ACTIVATION_STATUS.activeFamilies.map(f => (
                      <span key={f} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[9px] rounded-full border border-cyan-500/20">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Bridge Event Interface</div>
                  <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-cyan-400 overflow-x-auto">
{BRIDGE_EVENT_TYPES}
                  </pre>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="4. Compass Alignment">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should align symbolic states with a canonical 7-point compass to provide directional orientation.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements compass alignment using a Mod97-based pole calculation.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>The 7-point compass is <strong>{COMPASS_ALIGNMENT_RULES.operationalStatus}</strong>. The <code>{COMPASS_ALIGNMENT_RULES.canonicalCheck}</code> calculation is used {COMPASS_ALIGNMENT_RULES.calculationFrequency.toLowerCase()} to find the closest directional pole, providing the "{COMPASS_ALIGNMENT_RULES.metricLabel}" metric.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Layers} 
        title="Part IX-C. Legacy Alignment Implementation" 
        subtitle="Legacy vs. Modern Calculation Methods"
        keywords="mapping, functional, descriptive, metadata, library, implementation, mod93"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              This section documents legacy alignment methods that have been deprecated or replaced by the Mod97 harmonic system.
            </p>
          </div>

          <ManualDrawer title="1. Mod93 Alignment">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should support legacy alignment methods for backward compatibility and historical analysis.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Mod93 alignment is currently deprecated in Telos v0.9 in favor of the Mod97 harmonic system.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p><strong>Status:</strong> {MOD93_ALIGNMENT_STATUS.status}</p>
                <p>{MOD93_ALIGNMENT_STATUS.description}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Cpu} 
        title="Part IX-D. Algebraic Core & Mathematical Formalisms" 
        subtitle="The Mathematical Foundation of Telos V9"
        keywords="formula, equation, math, telic, duality, resilience, mod97, harmonic, curvature"
      >
        <div className="space-y-6">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-6">
            <p className="text-[11px] text-cyan-400 leading-relaxed font-medium italic">
              Parts IX-D through IX-F document only mechanisms that are functionally active in the current Telos v0.9 engine. 
              Conceptual, interpretive, and future-facing formalisms are documented separately in Part X.
            </p>
          </div>
          <ManualDrawer title="1. The Unified Telic Equation">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should utilize a unified equation to calculate the telic fitness of a symbolic state, balancing information, coherence, and energy against complexity.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements the Unified Telic Equation with specific weights for <code>alpha</code> (α), <code>gamma</code> (γ), <code>delta</code> (δ), and <code>beta</code> (β), and a coupling term (currently 0.2).
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>The central scoring function of the engine is defined as:</p>
                <div className="p-3 bg-white/5 rounded-lg font-mono text-cyan-400 text-center">
                  T = αI + γΦ + δE - βK + (0.2 * I * Φ)
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>I (Information):</strong> 70% Unigram Entropy + 30% Bigram (Transition) Entropy. Controlled by <code>alpha</code> (α).</li>
                  <li><strong>Φ (Coherence):</strong> 40% Inventory Coherence + 60% Transition Coherence (Domain/Bridge matching). Controlled by <code>gamma</code> (γ).</li>
                  <li><strong>E (Energy):</strong> Sum of symbol weights with a 0.8^n diminishing return for repeated symbols. Controlled by <code>delta</code> (δ).</li>
                  <li><strong>K (Complexity):</strong> Sequence length, with a quadratic penalty (K-L)^2 applied for lengths exceeding the canonical sequence length <code>L</code> (currently 10). Controlled by <code>beta</code> (β).</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. Telic Curvature (κ)">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should measure the rate of change of symbolic meaning relative to structural coherence.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine calculates curvature (κ) as a function of coherence and the change in telic score, influenced by the <code>lambda</code> (λ) coupling factor.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>Curvature measures the "acceleration" of symbolic meaning relative to structural coherence:</p>
                <div className="p-3 bg-white/5 rounded-lg font-mono text-cyan-400 text-center">
                  κ = Φ * (1 + λ * ΔT)
                </div>
                <p>Where <strong>ΔT</strong> is the change in Telic Score from the previous step and <strong>λ</strong> is the <code>lambda</code> parameter. High curvature indicates a rapid evolution of meaning within a stable structure.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="3. Duality Update Force">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should model the dynamic force driving the balance between awareness and structure.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine uses a linear force equation to update the target duality state, incorporating <code>lambda</code> (λ), <code>eta</code> (η), and <code>epsilon</code> (ε).
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>Duality (Awareness vs. Structure) is driven by a V9 "Force" term:</p>
                <div className="p-3 bg-white/5 rounded-lg font-mono text-cyan-400 text-center">
                  Force = λC + ηN + ε
                </div>
                <p>Where <strong>C</strong> is Coherence, <strong>N</strong> is a structural noise factor, and the parameters are <code>lambda</code> (λ), <code>eta</code> (η), and <code>epsilon</code> (ε). The engine uses this force to calculate a <strong>Target Duality</strong>, which the current state approaches via a smoothing factor (currently 20% per step).</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="4. Mod97 Harmonic Alignment">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should calculate a harmonic signature for the symbolic sequence to determine its alignment with the 7-point compass.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements the Mod97 algorithm to derive the harmonic alignment pole.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>The Mod97 value determines the sequence's alignment with the 7-point compass:</p>
                <div className="p-3 bg-white/5 rounded-lg font-mono text-cyan-400 text-center">
                  Σ (Weight * 17 + Pos^1.618 * 7) mod 97
                </div>
                <p>This formula creates a non-linear "harmonic signature" where both the identity and the position of symbols contribute to the final alignment.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Shield} 
        title="Part IX-E. Adversarial Resilience Framework" 
        subtitle="The Void Interaction & State Survival"
        keywords="void, risk, security, adversarial, resilience, entropy, stability, light, witness"
      >
        <div className="space-y-6">
          <ManualDrawer title="1. The Void (🕳️) Interaction">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should model the interaction of the Void symbol as a destructive force that must be balanced by Light.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements Void propagation and Light neutralization within its compression logic.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>The <strong>Void</strong> symbol acts as a "symbolic sink" in the compression algorithm. In any binary combination (<code>combine(a, b)</code>), the presence of a Void usually results in the propagation of the Void, unless countered by a <strong>Light (🕯️)</strong> symbol.</p>
                <div className="p-3 bg-white/5 rounded-lg font-mono text-cyan-400 text-center">
                  🕳️ + 🕯️ = 👁️ (The Witness)
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. Adversarial Test Logic">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should perform adversarial stress tests to evaluate the resilience of symbolic states against entropy injection.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine executes a Void-injection stress test at each simulation step to determine state survival.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>To test state resilience, the engine performs a "stress test" at each step:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>A <strong>Void (🕳️)</strong> is injected into the current sequence.</li>
                  <li>The sequence is recursively compressed using the Codex rules.</li>
                  <li>If the final compressed state contains a Void, the test <strong>FAILS</strong>.</li>
                  <li>If the sequence "digests" the Void (usually via Light or high-weight kernel symbols), the test <strong>PASSES</strong>.</li>
                </ol>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="3. Resilience Metric (R)">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The engine should calculate a resilience metric to quantify a state's ability to withstand symbolic entropy.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine derives resilience from symbol weights, sequence length, and Light symbol count.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p>Resilience is a measure of the sequence's ability to withstand symbolic entropy:</p>
                <div className="p-3 bg-white/5 rounded-lg font-mono text-cyan-400 text-center">
                  R = (Σ Weights / (L * 100)) + (LightCount * 0.2)
                </div>
                <p>A resilience of 1.0 indicates a state that is mathematically immune to simple adversarial injection.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Workflow} 
        title="Part IX-F. Agent-Specific Decision Logic" 
        subtitle="Stratified Proposal Strategies"
        keywords="agent, preserver, catalyst, synthesizer, behavior, strategy, logic, stability, innovation, integration"
      >
        <div className="space-y-6">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-6">
            <p className="text-[11px] text-cyan-400 leading-relaxed font-medium italic">
              The manual may describe agent-zone associations conceptually, but the current engine does not enforce zone-specific positional constraints. 
              Agents operate over random positions across the full sequence.
            </p>
          </div>
          <ManualDrawer title="1. The Preserver (Stability)">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The Preserver agent should focus on maintaining structural stability and kernel purity. It should prioritize the preservation of foundational symbolic anchors.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements the Preserver behavior by weighting proposals that reinforce the 12 core symbols and penalizing deletions of kernel anchors.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p><strong>Conceptual Focus:</strong> Positions 0–2 (The Invariant Root).</p>
                <p><strong>Strategy:</strong> Prioritizes the maintenance of <strong>Kernel Purity</strong>. It will propose swaps or insertions that reinforce the 12 core symbols and penalize any deletion of kernel anchors.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. The Catalyst (Innovation)">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The Catalyst agent should focus on introducing symbolic innovation and increasing information density by bridging disparate domains.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements Catalyst behavior by favoring proposals that introduce new symbols and activate causal bridges.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p><strong>Conceptual Focus:</strong> Positions 3–6 (The Causal Bridge).</p>
                <p><strong>Strategy:</strong> Proposes new symbols from peripheral domains to increase <strong>Information (I)</strong>. It specifically favors symbols that can form active <strong>bridges</strong> with the current sequence neighbors.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="3. The Synthesizer (Integration)">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The Synthesizer agent should focus on integrating symbolic elements into a coherent whole, optimizing for compression and structural alignment.
                </p>
              </div>
              <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
                <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                  The Telos v0.9 engine implements Synthesizer behavior by prioritizing coherence-optimizing swaps and complexity-reducing combinations.
                </p>
              </div>
              <div className="space-y-4 text-xs text-white/60 leading-relaxed">
                <p><strong>Conceptual Focus:</strong> Positions 7–9 (The Emergent Tail).</p>
                <p><strong>Strategy:</strong> Focuses on <strong>Coherence (Φ)</strong> and <strong>Compression</strong>. It frequently proposes "Combine" operations to reduce complexity and "Swap" operations to optimize domain alignment at the end of the sequence.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Interpretation</div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  The canonical manual defines the parameter and metric vocabulary. The live engine supplies the present computational realization of that vocabulary. Future engine versions may refine implementation without changing the canonical role of the fields.
                </p>
              </div>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>
    </>
  );
};
