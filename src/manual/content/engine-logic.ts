/**
 * Structural logic summaries for the current engine.
 */
export const STRUCTURAL_LOGIC_SUMMARIES = [
  {
    title: "Candidate Generation",
    desc: "The engine uses a stratified multi-agent proposal system. Three specialized agents (Preserver, Catalyst, Synthesizer) propose modifications to the symbolic sequence based on their respective roles (Kernel focus, Bridge focus, Periphery focus). Alternatively, a flat mode provides simple stochastic proposals."
  },
  {
    title: "Scoring & Evaluation",
    desc: "Scoring is applied via the Unified Equation, which balances Information Weight (rewarding signal), Coherence Weight (rewarding structural fit), and Energy Weight (rewarding viability) against a Complexity Penalty that resists non-productive growth."
  },
  {
    title: "Kernel & Bridge Dynamics",
    desc: "Kernel pressure is monitored via Kernel Purity; if the sequence contains less than 30% Invariant Kernel symbols, a leakage flag is raised. Bridge events are recognized when adjacent symbols from different domains align with a valid cross-domain bridge in the Codex."
  },
  {
    title: "Observer Emergence",
    desc: "Observer emergence is checked by monitoring the Duality metric. If duality crosses the threshold (currently 0.8) and remains above it for the duration of the persistence requirement (currently 2 Steps), an emergence event is registered."
  }
];

/**
 * Initialization logic details.
 */
export const INITIALIZATION_LOGIC = [
  { label: "Initial Sequence", desc: "A starting array of symbols (Codex entries) that defines the baseline state." },
  { label: "Parameters", desc: "The `TelosParams` object containing weights (α, γ, δ, β) and thresholds." },
  { label: "Architecture Mode", desc: "Selection between `stratified` (multi-agent) or `flat` (stochastic) execution regimes." },
  { label: "Experiment Seed", desc: "A numeric value used to seed the PRNG, ensuring deterministic reproducibility." },
  { label: "Step Limit", desc: "The maximum number of iterations (`simSteps`) allowed for the run." }
];

/**
 * Agent proposal strategies.
 */
export const AGENT_PROPOSAL_STRATEGIES = [
  {
    name: "Preserver",
    focus: "Positions 0–2 (The Invariant Root)",
    strategy: "Prioritizes the maintenance of Kernel Purity. It will propose swaps or insertions that reinforce the 12 core symbols and penalize any deletion of kernel anchors."
  },
  {
    name: "Catalyst",
    focus: "Positions 3–6 (The Causal Bridge)",
    strategy: "Proposes new symbols from peripheral domains to increase Information (I). It specifically favors symbols that can form active bridges with the current sequence neighbors."
  },
  {
    name: "Synthesizer",
    focus: "Positions 7–9 (The Emergent Tail)",
    strategy: "Focuses on Coherence (Φ) and Compression. It frequently proposes 'Combine' operations to reduce complexity and 'Swap' operations to optimize domain alignment at the end of the sequence."
  }
];

/**
 * Evaluation weights and factors.
 */
export const EVALUATION_WEIGHTS = [
  { label: "α (Alpha)", desc: "Rewards informational richness and symbolic variety." },
  { label: "γ (Gamma)", desc: "Rewards structural fit and bridge alignment." },
  { label: "δ (Delta)", desc: "Rewards energetic viability and sequence stability." },
  { label: "β (Beta)", desc: "Penalizes excessive symbolic growth to prevent bloat." }
];

export const ENVIRONMENTAL_FACTORS = [
  { label: "Coupling (λ)", desc: "Influences how strongly adjacent symbols affect each other's coherence." },
  { label: "Temperature", desc: "Controls the probability of accepting sub-optimal states to escape local minima." },
  { label: "Noise (ε)", desc: "Introduces stochastic jitter to the scoring process." }
];

/**
 * Acceptance criteria for proposals.
 */
export const ACCEPTANCE_CRITERIA = [
  "Best-State Comparison: If the candidate score exceeds the current best score, the change is accepted and the best state is updated.",
  "Stochastic Acceptance: Under high temperature regimes, sub-optimal changes may be accepted to promote exploration.",
  "Accepted-Change Tracking: Every acceptance is logged as an event, incrementing counters for `inventory_change` or `order_change`.",
  "Meaningful Change: A change is considered meaningful if it results in a net increase in Telic Score or a significant shift in Duality."
];

/**
 * Structural checks performed by the engine.
 */
export const STRUCTURAL_CHECKS = [
  {
    label: "Kernel Purity",
    desc: "Calculates the percentage of symbols in the sequence that belong to the Invariant Kernel. If purity drops below the current threshold (default 30%), a leakage flag is raised."
  },
  {
    label: "Bridge Activation",
    desc: "Scans the sequence for adjacent symbols from different domains. If a valid bridge exists in the Codex for that pair, a bridge event is emitted and coherence is boosted."
  },
  {
    label: "Leakage Conditions",
    desc: "Monitors for 'symbolic drift' where high-energy symbols overwhelm the stabilizing kernel, potentially leading to run termination."
  }
];

/**
 * Summary logic components.
 */
export const SUMMARY_LOGIC_COMPONENTS = [
  { label: "Terminal Metrics", desc: "Aggregates step-level data into final values for Convergence, Fidelity, and Path Integral." },
  { label: "Run Summaries", desc: "Calculates plateau points, best-score steps, and total iterations run." },
  { label: "Structural Summaries", desc: "Maps the final symbolic sequence to domain density and bridge activation maps." },
  { label: "Event Logs", desc: "Compiles the full trace of all proposals, acceptances, and bridge events into a chronological record." }
];
