/**
 * Canonical field guidance for data persistence.
 */
export const FIELD_GUIDANCE = [
  { label: "Raw Parameter Values", desc: "Save exact numerical or symbolic inputs for bit-perfect reproducibility." },
  { label: "Interpreted Regime Labels", desc: "Save human-readable labels (e.g., 'High Pressure') for comparison and queryability." },
  { label: "Terminal Metrics", desc: "Save the final state metrics for quick current-state analysis." },
  { label: "Run Summary Metrics", desc: "Save aggregate whole-run metrics for high-level comparison." }
];

/**
 * Design goals for the TypeScript Interface Pack.
 */
export const INTERFACE_PACK_GOALS = [
  { label: "Separation", desc: "Keep UI labels separate from engine keys." },
  { label: "Hybrid Storage", desc: "Store raw values and interpreted labels together." },
  { label: "Granularity", desc: "Separate terminal metrics from run-level summaries." },
  { label: "Extensibility", desc: "Support for debug traces and future ontology extensions." }
];

/**
 * Design principles for the JSON Schema.
 */
export const SCHEMA_DESIGN_PRINCIPLES = [
  { k: "metrics", v: "Final or terminal state facts." },
  { k: "runSummary", v: "Aggregated run-level metrics." },
  { k: "structuralSummary", v: "Paper-facing structural facts." },
  { k: "eventLog", v: "Meaningful historical events." },
  { k: "debugTrace", v: "Optional raw engineering detail." }
];

/**
 * Validation guidance for implementation.
 */
export const VALIDATION_GUIDANCE = [
  "Weights must be finite numbers",
  "maxSequenceLength and maxSteps must be positive integers",
  "runId, timestamp, and engineVersion are required",
  "metrics must always exist on a saved run",
  "eventLog must always exist, even if empty",
  "debugTrace is optional and should be omitted for compact archive saves"
];

/**
 * Implementation notes for the simulation.
 */
export const IMPLEMENTATION_NOTES = [
  "Use CompassRunRecord as the export JSON contract",
  "Use CompassRunSummaryRow as the ingestion target for D1 / SQL-style storage",
  "Keep debugTrace out of default archive exports when storage size matters",
  "Treat eventLog as the canonical compressed research history",
  "Keep lexicon versions in every saved run so meaning stays stable over time"
];
