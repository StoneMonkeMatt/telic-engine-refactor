import { MetricMapping } from "../manual.types";

/**
 * Mapping of Compass engine metrics from UI labels to canonical keys and descriptions.
 */
export const METRICS_MAPPING: MetricMapping[] = [
  {
    key: "telic_score",
    label: "Telic Score",
    canonicalName: "T",
    family: "Composite Score",
    description: "The engine’s primary composite valuation of the current symbolic state, combining reward terms and penalties into a single decision-relevant score.",
    formula: "T = αI + γΦ + δE - βK + (0.2 * I * Φ)",
    layer: "SimulationStep",
    interpretation: "Overall fitness",
    type: "terminal/aggregate"
  },
  {
    key: "resilience",
    label: "Resilience",
    canonicalName: "R",
    family: "Stability",
    description: "Measures how robustly the current state preserves structural integrity under local variation, perturbation, or adversarial pressure.",
    layer: "SimulationStep",
    interpretation: "Stability against Void",
    type: "derived"
  },
  {
    key: "telic_curvature",
    label: "Telic Curvature",
    canonicalName: "kappa (κ)",
    family: "Shape",
    description: "Measures the local shape or directional bending of the trajectory through symbolic state space under the telic objective.",
    formula: "κ = Φ * (1 + λ * ΔT)",
    layer: "SimulationStep",
    interpretation: "κ_telic",
    type: "derived"
  },
  {
    key: "path_integral",
    label: "Path Integral",
    canonicalName: "P",
    family: "Trajectory",
    description: "Aggregates the cumulative movement, work, or traversed significance of the run across steps rather than only inspecting the final state.",
    layer: "SimulationStep",
    interpretation: "Cumulative trajectory value",
    type: "aggregate"
  },
  {
    key: "mod97_value",
    label: "Mod97",
    canonicalName: "mod97",
    family: "Signature / Integrity",
    description: "A compact modular signature or checksum-like harmonic marker derived from the current state or run summary.",
    layer: "SimulationStep",
    interpretation: "Symbolic signature",
    type: "derived"
  },
  {
    key: "compass_orientation",
    label: "Compass",
    canonicalName: "compass",
    family: "Orientation",
    description: "A categorical orientation output mapping the state onto a directional interpretive frame within the ontology.",
    layer: "SimulationStep",
    interpretation: "Compass orientation",
    type: "derived"
  },
  {
    key: "consensus_score",
    label: "Consensus Score",
    canonicalName: "C",
    family: "Agreement",
    description: "Measures the degree of agreement, convergence, or internal alignment among the contributing evaluative signals in the current state.",
    layer: "SimulationStep",
    interpretation: "Consensus among signals",
    type: "derived"
  },
  {
    key: "adversarial_status",
    label: "Adversarial Status",
    canonicalName: "adversarialStatus",
    family: "Stress Test Outcome",
    description: "Records whether the current state or run passes the system’s adversarial integrity test.",
    layer: "SimulationStep",
    interpretation: "Adversarial test result",
    type: "derived/flag"
  }
];
