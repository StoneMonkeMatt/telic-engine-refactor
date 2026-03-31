import React from 'react';
import { Cpu, BookOpen, Layers, Anchor, Compass as CompassIcon, Workflow, ChevronRight, FileText } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { LexiconItem } from '../components/LexiconItem';
import { PARAMETERS_MAPPING } from '../content/parameters-mapping';
import { METRICS_MAPPING } from '../content/metrics-mapping';
import { CORE_ONTOLOGY_STRUCTURES, PARAMETER_FAMILIES } from '../content/core-ontology-structures';
import { DOMAIN_REGISTRY } from '../content/domain-registry';
import { KERNEL_SYMBOLS } from '../content/kernel-symbols';
import { COMPASS_POLES } from '../content/compass-poles';
import { BRIDGE_EXAMPLES } from '../content/bridge-examples';
import { PROTOCOL_SYMBOLS } from '../content/protocol-symbols';
import { ROSETTA_AMINO_MAPPINGS } from '../content/rosetta-amino-mappings';
import { DESIGN_PRINCIPLES } from '../content/design-principles';
import { AGENT_ROLES } from '../content/agent-roles';
import { CANONICAL_SYMBOL_RECORD_FIELDS } from '../content/canonical-symbol-record';
import { VERSIONING_SCHEMA } from '../content/versioning-schema';

export const Part01ParameterOntology: React.FC = () => {
  return (
    <>
    <ManualSectionDrawer 
      icon={FileText} 
      title="Compass Parameter & Metrics Lexicon V1" 
      subtitle="Version 1.0 // Release 2026.03"
    >
        <div className="space-y-4 text-sm text-white/60 leading-relaxed">
          <p>
            This lexicon defines the canonical vocabulary for The Compass simulation. Its purpose is to keep the same meanings aligned across the simulation UI, the engine and scoring logic, exported JSON schema, database storage, experiment records, and research writing.
          </p>
          <p>
            The goal is simple: each parameter and each metric should have one stable meaning, one primary role, and one canonical database label.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Design Principles</h4>
            <ul className="space-y-4">
              {DESIGN_PRINCIPLES.map((principle, i) => (
                <li key={i} className="space-y-1">
                  <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{principle.label}</div>
                  <div className="text-[10px] text-white/40 leading-relaxed">{principle.desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Lexicon Drawers</h4>
            <div className="space-y-2">
              <ManualDrawer title="Engine Parameters (Inputs)">
                <div className="space-y-4">
                  {PARAMETERS_MAPPING.filter(p => ["information_weight", "coherence_weight", "energy_weight", "complexity_penalty", "coupling_factor"].includes(p.key)).map(param => (
                    <LexiconItem 
                      key={param.key}
                      label={param.label} 
                      dbLabel={param.key} 
                      role={param.canonicalName} 
                      meaning={param.description} 
                      effect={param.effect}
                    />
                  ))}
                </div>
              </ManualDrawer>

              <ManualDrawer title="Simulation Metrics (Outputs)">
                <div className="space-y-4">
                  {METRICS_MAPPING.filter(m => ["telic_score", "resilience", "mod97_value"].includes(m.key)).map(metric => (
                    <LexiconItem 
                      key={metric.key}
                      label={metric.label} 
                      dbLabel={metric.key} 
                      role={metric.canonicalName} 
                      meaning={metric.description} 
                    />
                  ))}
                  <LexiconItem 
                    label="Duality" 
                    dbLabel="duality" 
                    role="Consciousness Index" 
                    meaning="The average awareness weight of the sequence, used to trigger Observer emergence." 
                  />
                  <LexiconItem 
                    label="Kernel Purity" 
                    dbLabel="kernelPurity" 
                    role="Foundational Ratio" 
                    meaning="The percentage of the sequence composed of Invariant Kernel symbols." 
                  />
                </div>
              </ManualDrawer>

              <ManualDrawer title="Agent Roles">
                <div className="space-y-4">
                  {AGENT_ROLES.map((role, i) => (
                    <LexiconItem 
                      key={i}
                      label={role.role} 
                      dbLabel={role.role.toLowerCase().replace(" ", "_")} 
                      meaning={role.desc} 
                    />
                  ))}
                </div>
              </ManualDrawer>

              <ManualDrawer title="System Constraints">
                <div className="space-y-4">
                  {PARAMETERS_MAPPING.filter(p => ["observer_threshold", "max_sequence_length", "max_simulation_depth", "architecture_mode"].includes(p.key)).map(param => (
                    <LexiconItem 
                      key={param.key}
                      label={param.label} 
                      dbLabel={param.key} 
                      role={param.canonicalName} 
                      meaning={param.description} 
                      effect={param.key === "max_sequence_length" ? "Allows richer or more expressive states, but also increases the chance of noise and bloat." : param.key === "max_simulation_depth" ? "Allows longer convergence, deeper exploration, and more post-plateau churn." : undefined}
                    />
                  ))}
                </div>
              </ManualDrawer>
            </div>
          </div>
        </div>
    </ManualSectionDrawer>

    <ManualSectionDrawer 
      icon={Cpu} 
      title="Part I. Parameter Ontology" 
      subtitle="Classification of Engine Variables"
    >
      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <p>
          This ontology categorizes the parameters of the Compass engine into functional families. Each family governs a specific aspect of the simulation's behavior, from state evaluation to structural boundaries.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {PARAMETER_FAMILIES.map((distinction, i) => (
            <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">{distinction.label}</div>
              <div className="text-[10px] text-white/40 leading-relaxed">{distinction.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <ManualDrawer title="A. Evaluation">
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Parameters**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                Parameters that define what the engine rewards or penalizes when scoring a symbolic state.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Information Weight (α)</div>
                  <div className="text-[9px] font-mono text-cyan-400/60">DB: information_weight</div>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">Meaning: Rewards informational richness or signal-bearing symbolic structure in the current state.</p>
                <p className="text-[10px] text-cyan-400/40 italic">Effect (+): Favours states with stronger information content.</p>
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Coherence Weight (γ)</div>
                  <div className="text-[9px] font-mono text-cyan-400/60">DB: coherence_weight</div>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">Meaning: Rewards internal structural fit, integration, and compositional harmony across the sequence.</p>
                <p className="text-[10px] text-cyan-400/40 italic">Effect (+): Favours states with stronger coherence content.</p>
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Energy Weight (δ)</div>
                  <div className="text-[9px] font-mono text-cyan-400/60">DB: energy_weight</div>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">Meaning: Rewards energetic viability, structural capacity, or state strength as defined by the engine’s scoring term.</p>
                <p className="text-[10px] text-cyan-400/40 italic">Effect (+): Favours states with stronger energy content.</p>
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Complexity Penalty (β)</div>
                  <div className="text-[9px] font-mono text-cyan-400/60">DB: complexity_penalty</div>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">Meaning: Penalises excessive symbolic growth, unresolved expansion, or non-productive complexity.</p>
                <p className="text-[10px] text-cyan-400/40 italic">Effect (+): Makes growth more costly when complexity rises.</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] text-white/40 italic mb-4">Other Evaluation Parameters:</p>
              {PARAMETERS_MAPPING.filter(p => p.family === "Evaluation" && !["information_weight", "coherence_weight", "energy_weight", "complexity_penalty"].includes(p.key)).map(param => (
                <LexiconItem 
                  key={param.key}
                  label={param.label} 
                  dbLabel={param.key} 
                  role={param.canonicalName} 
                  meaning={param.description} 
                  effect={param.effect}
                />
              ))}
            </div>
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Relational Dynamics">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Parameters that shape how symbols couple, bind, or stabilize into structure.</p>
            {PARAMETERS_MAPPING.filter(p => p.family === "Relational Dynamics").map(param => (
              <LexiconItem 
                key={param.key}
                label={param.label} 
                dbLabel={param.key} 
                role={param.canonicalName} 
                meaning={param.description} 
                effect={param.effect}
                notes={param.key === "binding_strength" ? "More local and stabilizing than coupling factor." : undefined}
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Search Dynamics">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Parameters that shape exploration, stochasticity, and movement through state space.</p>
            {PARAMETERS_MAPPING.filter(p => p.family === "Search Dynamics").map(param => (
              <LexiconItem 
                key={param.key}
                label={param.label} 
                dbLabel={param.key} 
                role={param.canonicalName} 
                meaning={param.description} 
                effect={param.effect}
                notes={param.key === "experiment_seed" ? "Identity parameter, not a tuning weight." : undefined}
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. Thresholds">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Parameters that determine when a condition qualifies as crossing a boundary.</p>
            {PARAMETERS_MAPPING.filter(p => p.family === "Thresholds").map(param => (
              <LexiconItem 
                key={param.key}
                label={param.label} 
                dbLabel={param.key} 
                role={param.canonicalName} 
                meaning={param.description} 
                effect={param.effect}
                notes={param.key === "observer_threshold" ? "Keep separate from future acceptance, plateau, and warning thresholds." : undefined}
              />
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="E. Structural Constraints">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Parameters that mechanically bound the run.</p>
            {PARAMETERS_MAPPING.filter(p => p.family === "Structural Constraints").map(param => (
              <LexiconItem 
                key={param.key}
                label={param.label} 
                dbLabel={param.key} 
                role={param.canonicalName} 
                meaning={param.description} 
                effect={param.effect}
                notes={param.key === "architecture_mode" ? "Treated as a categorical configuration field." : undefined}
              />
            ))}
          </div>
        </ManualDrawer>
      </div>
    </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={BookOpen} 
        title="Part I-A. Symbolic Ontology Source (library.ts)" 
        subtitle="The Canonical Symbolic Contract"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Purpose</h4>
            <p>
              This section defines the canonical symbolic ontology used by Compass. The ontology is sourced from <code>library.ts</code> and provides the authoritative registry for symbols, domains, compass orientations, and cross-domain bridge relations. The simulation may operationalize only a subset of these structures at any given engine version, but the ontology source remains canonical.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**canonical target**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The <code>library.ts</code> file is the single source of truth for all symbolic definitions. It contains the full registry of symbols, their weights, and their domain associations.
              </p>
            </div>
            <div className="p-4 bg-ocean-900/50 rounded-xl border border-cyan-500/20 space-y-2">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">**current engine reference**</div>
              <p className="text-[10px] text-cyan-400/60 leading-relaxed">
                The Telos v0.9 engine imports the <code>SYMBOLS</code> and <code>DOMAINS</code> constants from <code>library.ts</code> to populate its internal lookup tables.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Runtime Constraint**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The present engine uses a glyph-first lookup model in <code>codex.ts</code>. In the live runtime, symbol identity is resolved by glyph rather than by composite symbolic identity. This keeps the engine lightweight, but it also means that repeated glyphs across conceptual contexts are not yet represented as distinct runtime records. The ontology source remains canonical, but the current kernel operationalizes a simplified glyph-indexed view of it.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Build Rule**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The ontology source should remain richer than the current engine when necessary. The purpose of the manual is not to reduce the ontology to present implementation limits, but to guide the engine toward the correct finished form.
              </p>
            </div>
          </div>

          <ManualDrawer title="1. Canonical Symbol Record">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>Each symbol in the ontology is defined as a structured record with the following fields:</p>
              <ul className="list-disc pl-5 space-y-1">
                {CANONICAL_SYMBOL_RECORD_FIELDS.map((field, i) => (
                  <li key={i}><code>{field.field}</code> — {field.description}</li>
                ))}
              </ul>
              <p>This makes the ontology more than a flat list of icons. It is a weighted symbolic database with explicit domain membership and optional opposition relations.</p>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. Core Ontology Structures">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The ontology source is organized into four primary structures:</p>
              <ul className="list-disc pl-5 space-y-1">
                {CORE_ONTOLOGY_STRUCTURES.map((struct, i) => (
                  <li key={i}><code>{struct.key}</code> — {struct.description}</li>
                ))}
              </ul>
              <p>These structures should be treated as the canonical symbolic source for the Build Manual.</p>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Layers} 
        title="Part I-B. Domain Registry" 
        subtitle="Canonical Symbolic World of Compass"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Purpose</h4>
            <p>
              The domain registry defines the canonical symbolic world of Compass. Each domain groups symbols into a named conceptual family. The registry includes the foundational kernel and a large multi-domain periphery spanning scientific, technical, cognitive, social, and expressive domains. 
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Usage Note**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                Domains are canonical ontology groupings. The current runtime may operationalize only part of this richness through glyph-level lookup and local bridge evaluation. Domain completeness in the manual is intentional and should not be reduced to match temporary engine limits.
              </p>
            </div>
          </div>

          <ManualDrawer title="1. Foundational Domains">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The ontology begins with the foundational domains:</p>
              <div className="flex flex-wrap gap-2">
                {DOMAIN_REGISTRY.filter(d => d.category === "foundational").map(d => (
                  <span key={d.id} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40 border border-white/5">{d.name}</span>
                ))}
              </div>
              <p>These appear explicitly in the domain registry and symbol definitions.</p>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. Scientific and Technical Expansion">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The library then extends into scientific and technical domains including:</p>
              <div className="flex flex-wrap gap-2">
                {DOMAIN_REGISTRY.filter(d => d.category === "scientific").map(d => (
                  <span key={d.id} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40 border border-white/5">{d.name}</span>
                ))}
              </div>
              <p>These domains make the ontology capable of representing formal science, applied science, and technical system behavior.</p>
            </div>
          </ManualDrawer>

          <ManualDrawer title="3. Human, Social, and Expressive Expansion">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The ontology also includes domains such as:</p>
              <div className="flex flex-wrap gap-2">
                {DOMAIN_REGISTRY.filter(d => d.category === "social" || d.category === "expressive").map(d => (
                  <span key={d.id} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40 border border-white/5">{d.name}</span>
                ))}
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="4. V9 Advanced Formalisms & Applied Domains">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The V9 update introduces advanced mathematical formalisms and applied physical world domains:</p>
              <div className="space-y-3">
                <div>
                  <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Formalisms</h5>
                  <div className="flex flex-wrap gap-2">
                    {DOMAIN_REGISTRY.filter(d => d.category === "formalism").map(d => (
                      <span key={d.id} className="px-2 py-1 bg-cyan-500/5 rounded text-[10px] font-mono text-cyan-400/60 border border-cyan-500/10">{d.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Applied World</h5>
                  <div className="flex flex-wrap gap-2">
                    {DOMAIN_REGISTRY.filter(d => d.category === "applied").map(d => (
                      <span key={d.id} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/30 border border-white/5">{d.name}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p>This confirms that V9 is a complete cross-domain ontology capable of representing both abstract theory and physical systems.</p>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Anchor} 
        title="Part I-C. Core Kernel Definition" 
        subtitle="Invariant Symbolic Anchor"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Purpose</h4>
            <p>
              The <code>Core_Kernel</code> domain defines the invariant symbolic anchor of the ontology. It is the foundational kernel against which preservation, purity, and leakage are later interpreted in the simulation.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Engine Note**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The canonical kernel is broader than the live implementation heuristic. In the current Telos engine, kernel status is operationalized through a hardcoded runtime subset used for measures such as <code>kernelPurity</code>, <code>kernelDivergence</code>, and invariant leakage flags. These current-engine metrics should be understood as operational approximations to the broader canonical kernel concept.
              </p>
            </div>
          </div>

          <ManualDrawer title="Canonical Kernel Symbols">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {KERNEL_SYMBOLS.map((s, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
                    <span className="text-2xl">{s.glyph}</span>
                    <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{s.meaning}</span>
                  </div>
                ))}
              </div>
              <p>These are explicitly registered in both the symbol list and the domain registry.</p>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={CompassIcon} 
        title="Part I-D. Compass Ontology" 
        subtitle="Canonical 7-Point Navigational Ontology"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Purpose</h4>
            <p>
              The compass defines the canonical 7-point navigational ontology of V9. Each pole has a name, an associated symbol set, and a <code>mod97</code> harmonic value. 
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Engine Usage**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The compass remains the canonical navigational ontology. In the current engine, <code>mod97</code> and compass matching provide an operational orientation mechanism. Compass interpretation is therefore active in the live build, but still represents a simplified runtime use of the broader navigational layer.
              </p>
            </div>
          </div>

          <ManualDrawer title="Canonical Compass Poles">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <div className="space-y-3">
                {COMPASS_POLES.map((p, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">{p.pole} — {p.name}</div>
                      <div className="flex gap-2">
                        {p.symbols.map(s => <span key={s} className="text-lg">{s}</span>)}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                      mod97: <span className="text-cyan-400">{p.mod97}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="Interpretation">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The compass should be documented as a canonical navigational structure, not merely a UI motif. It defines named symbolic clusters and harmonic signatures that the simulation may use in whole or in part depending on engine version.</p>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Workflow} 
        title="Part I-E. Cross-Domain Bridge Ontology" 
        subtitle="Canonical Symbolic Transitions"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Purpose</h4>
            <p>
              The bridge registry defines canonical symbolic transitions between domains. Each bridge record contains a <code>from</code> domain, a <code>to</code> domain, a <code>symbol</code>, and a <code>function</code>. This makes the bridge ontology an explicit relational layer, not just an inferred property of adjacent symbols.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">**Current Engine Usage**</div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                The bridge ontology remains canonical and explicit. In the current engine, bridges are used operationally through local adjacency checks, bridge activation summaries, and event-level bridge traces. The canonical bridge layer is therefore broader than the current runtime bridge evaluation behavior.
              </p>
            </div>
          </div>

          <ManualDrawer title="Example Canonical Bridges">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <div className="grid grid-cols-1 gap-2">
                {BRIDGE_EXAMPLES.map((b, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">{b.from}</span>
                      <ChevronRight className="w-3 h-3 text-white/20" />
                      <span className="text-white/40">{b.to}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{b.symbol}</span>
                      <span className="text-cyan-400 italic">{b.function}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="Interpretation">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The bridge registry should be treated as the canonical source of allowed or meaningful cross-domain relations. The simulation may operationalize only part of this structure, but the ontology source defines the full bridge vocabulary.</p>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>

      <ManualSectionDrawer 
        icon={Cpu} 
        title="Part I-F. Protocol & Mapping Symbols" 
        subtitle="V8.2 Whale Song & Rosetta Amino Mappings"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Purpose</h4>
            <p>
              This section documents the specialized symbol sets used for the V8.2 "Whale Song" protocol and the Rosetta biological mapping. These symbols bridge the gap between abstract ontology and specific implementation domains.
            </p>
          </div>

          <ManualDrawer title="1. V8.2 Protocol Symbols">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The V8.2 set defines the "Whale Song" protocol logic:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PROTOCOL_SYMBOLS.map((s, i) => (
                  <div key={i} className="p-2 bg-white/5 rounded border border-white/5 flex items-center gap-2">
                    <span className="text-lg">{s.glyph}</span>
                    <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">{s.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="2. Rosetta Amino Mappings">
            <div className="space-y-4 text-xs text-white/60 leading-relaxed">
              <p>The Rosetta domain maps symbols to amino acid residues and protein structures:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROSETTA_AMINO_MAPPINGS.map((s, i) => (
                  <div key={i} className="p-2 bg-white/5 rounded border border-white/5 flex items-center gap-2">
                    <span className="text-lg">{s.glyph}</span>
                    <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">{s.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </ManualDrawer>
        </div>
      </ManualSectionDrawer>
    </>
  );
};
