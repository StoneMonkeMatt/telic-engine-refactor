import * as Content from '../manual/content';

export const COMPASS_MANUAL_CONTENT = `
# The Compass Build Manual V1.0 (Full Expert Context)

## Structural Guidance for the Manual Expert
When interpreting this manual or answering builder queries, observe the following hierarchy of coherence:
1. **Canonical Understanding (Parts I–VIII):** These are primary. They define the stable contract and the "Telos" that the engine strives toward.
2. **Live-Engine Interpretation (Part IX):** This is essential for understanding current behavior, implementation status, and technical constraints of the Telos v0.9 kernel.
3. **Research Framing (Part X):** Provides the theoretical "why" and the speculative seams where the engine may evolve.
4. **Active Builder Context (Part XI):** Adds the dated implementation roadmap and development notes. This is the "builder's layer" on top of the canon and current truth.

**Verdict:** Part XI is coherent with the manual as a whole. It acts as the dated record of ongoing implementation work, following the canonical contract, the current engine reference, and the research framing.

---

## Parts I–VIII: The Canonical Contract
This section defines the stable identity, lexicon, and logic of the Compass engine.

### 1. Engine Identity & Overview
- **Name:** ${Content.ENGINE_IDENTITY.name}
- **Version:** ${Content.ENGINE_IDENTITY.version}
- **Ontology Version:** ${Content.ENGINE_IDENTITY.ontologyVersion}
- **Architecture:** ${Content.ENGINE_IDENTITY.architecture}
- **Default Mode:** ${Content.ENGINE_IDENTITY.defaultMode}
- **Canonical Sequence Length:** ${Content.ENGINE_IDENTITY.canonicalSeqLength}
- **Observer Persistence:** ${Content.ENGINE_IDENTITY.observerPersistence} Steps

### 2. Core Lexicon: Parameters (Inputs)
${Content.PARAMETERS_MAPPING.map(p => `- **${p.label} (${p.key}):** ${p.description} (Default: ${p.default}, Exposure: ${p.exposure})`).join('\n')}

### 3. Core Lexicon: Metrics (Outputs)
${Content.METRICS_MAPPING.map(m => `- **${m.label} (${m.key}):** ${m.interpretation || m.description} (Layer: ${m.layer})`).join('\n')}

### 4. Agent Roles & Proposal Strategies
${Content.AGENT_PROPOSAL_STRATEGIES.map(a => `- **${a.name}:** Focuses on ${a.focus}. Strategy: ${a.strategy}`).join('\n')}

### 5. Engine Logic & Simulation Dynamics
- **Initialization:** ${Content.INITIALIZATION_LOGIC.map(l => l.label).join(', ')}
- **Operations:** insert, delete, swap, combine
- **Telic Equation:** T = αI + γΦ + δE - βK + (0.2 * I * Φ)
- **Acceptance:** Metropolis-Hastings stochastic rule
- **Structural Checks:** ${Content.STRUCTURAL_CHECKS.map(c => c.label).join(', ')}

---

## Part IX: Current Engine Reference (Telos v0.9)
This section documents the live implementation profile of the Telos kernel.

### 1. Implementation Status
${Content.IMPLEMENTATION_STATUS.map(s => `- **${s.label}:** ${s.status}`).join('\n')}

### 2. Live Ontology Usage
- **Active Symbols:** ${Content.ACTIVE_SYMBOL_SET_CONFIG.totalSymbolCount} symbols (Prioritized: ${Content.ACTIVE_SYMBOL_SET_CONFIG.prioritizedDomains.join(', ')})
- **Bridge Activation:** ${Content.BRIDGE_ACTIVATION_STATUS.totalBridges} bridges (Active Families: ${Content.BRIDGE_ACTIVATION_STATUS.activeFamilies.join(', ')})
- **Compass Alignment:** ${Content.COMPASS_ALIGNMENT_RULES.operationalStatus} (Method: ${Content.COMPASS_ALIGNMENT_RULES.canonicalCheck})

### 3. Technical Specifications
\`\`\`typescript
// Parameters
${Content.ENGINE_PARAMETER_TYPES}

// Metrics
${Content.METRIC_OUTPUT_TYPES}
\`\`\`

---

## Part X: Research Seams & Theoretical Frameworks
Theoretical foundations and speculative formalisms.

### 1. The Five-Layer Pyramid
Layers (Bottom to Top): ${[...Content.PYRAMID_LAYERS].reverse().map(l => l.label).join(' -> ')}

### 2. Speculative Formalisms
${Content.SPECULATIVE_FORMALISMS.map(f => `- **${f.title}:** \`${f.formula}\` - ${f.description}`).join('\n')}

---

## Part XI: Development Notes & Roadmap
Dated builder-facing record of ongoing implementation work.

${Content.DEVELOPMENT_NOTES.map(n => `### ${n.date}: ${n.title}
- **Status:** ${n.status}
- **Primary Goal:** ${n.primaryGoal}
- **Files to Adapt:** ${n.filesToAdapt.map(f => f.file).join(', ')}
- **New Components:** ${n.newFiles.map(f => f.path).join(', ')}`).join('\n\n')}

---

## Appendix: Known Divergences
${Content.DIVERGENCE_REGISTRY.map(d => `- **${d.term}** (Manual) vs **${d.engineTerm}** (Engine): ${d.status}. Action: ${d.action}`).join('\n')}
`;
