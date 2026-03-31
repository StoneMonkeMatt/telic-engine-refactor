import { ParameterMapping } from "../manual.types";

/**
 * Mapping of Compass engine parameters from UI labels to canonical keys and descriptions.
 */
export const PARAMETERS_MAPPING: ParameterMapping[] = [
  // Evaluation Parameters
  {
    key: "information_weight",
    label: "Information Weight",
    canonicalName: "alpha (α)",
    family: "Evaluation",
    description: "Rewards informational richness or signal-bearing symbolic structure in the current state.",
    range: "0-1.0 (typical)",
    type: "number",
    default: "0.5",
    effect: "Favours states with stronger information content.",
    exposure: "user-facing"
  },
  {
    key: "coherence_weight",
    label: "Coherence Weight",
    canonicalName: "gamma (γ)",
    family: "Evaluation",
    description: "Rewards internal structural fit, integration, and compositional harmony across the sequence.",
    range: "0-1.0 (typical)",
    type: "number",
    default: "0.3",
    effect: "Favours states with stronger coherence content.",
    exposure: "user-facing"
  },
  {
    key: "energy_weight",
    label: "Energy Weight",
    canonicalName: "delta (δ)",
    family: "Evaluation",
    description: "Rewards energetic viability, structural capacity, or state strength as defined by the engine’s scoring term.",
    range: "0-1.0 (typical)",
    type: "number",
    default: "0.2",
    effect: "Favours states with stronger energy content.",
    exposure: "user-facing"
  },
  {
    key: "complexity_penalty",
    label: "Complexity Penalty",
    canonicalName: "beta (β)",
    family: "Evaluation",
    description: "Penalises excessive symbolic growth, unresolved expansion, or non-productive complexity.",
    range: "0-1.0 (typical)",
    type: "number",
    default: "0.1",
    effect: "Makes growth more costly when complexity rises.",
    exposure: "user-facing"
  },
  {
    key: "coupling_factor",
    label: "Coupling Factor",
    canonicalName: "lambda (λ)",
    family: "Relational Dynamics",
    description: "Controls how strongly symbolic elements are treated as mutually coupled in evaluation or transition dynamics.",
    range: "0-1.0 (typical)",
    type: "number",
    default: "0.618",
    effect: "Favours states with stronger coupling content.",
    exposure: "user-facing"
  },

  // Relational Dynamics
  {
    key: "binding_strength",
    label: "Binding Strength",
    canonicalName: "eta (η)",
    family: "Relational Dynamics",
    description: "Controls how strongly neighbouring or related symbols stabilize into persistent structured relations.",
    range: "0-1.0 (typical)",
    type: "number",
    default: "0.3",
    effect: "Favours more durable structural binding.",
    exposure: "user-facing"
  },

  // Search Dynamics
  {
    key: "noise_level",
    label: "Noise Level",
    canonicalName: "epsilon (ε)",
    family: "Search Dynamics",
    description: "Controls the probability of random symbolic mutations or noise injection in the search process.",
    range: "0-0.5 (typical)",
    type: "number",
    default: "0.05",
    effect: "Increases variation and exploratory instability.",
    exposure: "user-facing"
  },
  {
    key: "simulation_temperature",
    label: "Simulation Temperature",
    canonicalName: "temperature",
    family: "Search Dynamics",
    description: "Governs the acceptance probability of non-improving proposals in the simulated annealing process.",
    range: "0.1-5.0 (typical)",
    type: "number",
    default: "1.0",
    effect: "Produces broader, less conservative search behaviour.",
    exposure: "user-facing"
  },
  {
    key: "experiment_seed",
    label: "Experiment Seed",
    canonicalName: "seed",
    family: "Search Dynamics",
    description: "Fixes stochastic initialization and proposal trajectory for reproducibility.",
    range: "integer",
    type: "number",
    default: "random",
    effect: "Ensures identical results for identical inputs.",
    exposure: "user-facing"
  },

  // Thresholds
  {
    key: "observer_threshold",
    label: "Observer Threshold",
    canonicalName: "threshold",
    family: "Thresholds",
    description: "The minimum telic score required for a state to qualify as an 'observer' or meaningful structure.",
    range: "0-1.0",
    type: "number",
    default: "0.8",
    effect: "Makes observer qualification stricter.",
    exposure: "user-facing"
  },

  // Structural Constraints
  {
    key: "max_sequence_length",
    label: "Max Sequence Length",
    canonicalName: "maxSequenceLength",
    family: "Structural Constraints",
    description: "The maximum number of symbols allowed in a single sequence.",
    range: "5-50",
    type: "number",
    default: "10",
    effect: "Allows richer or more expressive states, but also increases the chance of noise and bloat.",
    exposure: "user-facing"
  },
  {
    key: "simulation_depth",
    label: "Simulation Depth",
    canonicalName: "maxSteps",
    family: "Structural Constraints",
    description: "The maximum number of iterations the simulation is allowed to run.",
    range: "100-5000",
    type: "number",
    default: "1000",
    effect: "Allows longer convergence, deeper exploration, and more post-plateau churn.",
    exposure: "user-facing"
  },
  {
    key: "architecture_mode",
    label: "Architecture Mode",
    canonicalName: "architectureMode",
    family: "Structural Constraints",
    description: "Selects the structural regime of the engine, such as stratified or flat evaluation.",
    range: "categorical",
    type: "enum",
    default: "stratified",
    effect: "Determines whether the engine uses layered or uniform evaluation.",
    exposure: "user-facing"
  }
];
