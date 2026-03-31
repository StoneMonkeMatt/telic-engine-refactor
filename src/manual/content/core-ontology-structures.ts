/**
 * The four primary structures of the Compass ontology source (library.ts).
 */
export const CORE_ONTOLOGY_STRUCTURES = [
  {
    key: "symbols",
    description: "The full symbolic registry (~450 symbols)",
    status: "canonical"
  },
  {
    key: "domains",
    description: "The domain-to-symbol registry (70+ domains)",
    status: "canonical"
  },
  {
    key: "compass",
    description: "The 7-point navigational ontology",
    status: "canonical"
  },
  {
    key: "cross_domain_bridges",
    description: "The canonical bridge registry (50+ bridges)",
    status: "canonical"
  }
];

/**
 * Functional families for engine parameters.
 */
export const PARAMETER_FAMILIES = [
  { label: "Evaluation", desc: "Decide what the engine values." },
  { label: "Relational Dynamics", desc: "Decide how symbolic elements organize and stabilize." },
  { label: "Search Dynamics", desc: "Decide how the engine moves." },
  { label: "Thresholds", desc: "Decide what qualifies." },
  { label: "Structural Constraints", desc: "Decide what is allowed." }
];

/**
 * Functional families for output metrics.
 */
export const METRIC_FAMILIES = [
  { label: "Composite Score", desc: "Top-line valuation of the current symbolic state." },
  { label: "Stability", desc: "Measures of persistence and robustness." },
  { label: "Shape", desc: "Measures of local structural or geometric form." },
  { label: "Trajectory", desc: "Measures of cumulative movement through the run." },
  { label: "Signature / Integrity", desc: "Compact arithmetic or harmonic identifiers." },
  { label: "Orientation", desc: "Categorical directional interpretation." },
  { label: "Agreement", desc: "Alignment among evaluative components." },
  { label: "Stress Test Outcome", desc: "Pass/fail or test-result fields under adversarial pressure." }
];
