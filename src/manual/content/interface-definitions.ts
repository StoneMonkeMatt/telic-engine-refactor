
/**
 * TypeScript interface definitions for the Compass simulation.
 */

export const VERSIONING_INTERFACES = `export type LexiconVersion = "compass-v1";

export type SchemaVersion =
  | "compass-run-v1"
  | "compass-run-v1.1";`;

export const PROBE_METADATA_INTERFACE = `export interface ProbeMetadata {
  probeId?: string;
  probeFamily?: string;
  probeRole?: "kernel" | "navigation" | "expression" | "baseline" | string;
  probeVersion?: string;
  sourceTextHash?: string;
  sourceTextTitle?: string;
  sourceTextPreview?: string;
}`;

export const RUN_METADATA_INTERFACE = `export interface RunMetadata {
  schemaVersion: SchemaVersion;
  parameterLexiconVersion: LexiconVersion;
  metricsLexiconVersion: LexiconVersion;
  runId: string;
  timestamp: string;
  engineVersion: string;
  ontologyVersion?: string;
  seed: number | string;
  mode?: string;
  provider?: string;
  model?: string;
}`;

export const PARAMETER_TYPES_INTERFACE = `export type ParameterFamily =
  | "evaluation"
  | "relational_dynamics"
  | "search_dynamics"
  | "threshold"
  | "structural_constraint";

export type ParameterKey =
  | "alpha" | "gamma" | "delta" | "beta" | "lambda"
  | "eta" | "epsilon" | "temperature" | "seed"
  | "threshold" | "maxSequenceLength" | "maxSteps"
  | "architectureMode";

export interface CompassParameters {
  alpha: number; gamma: number; delta: number; beta: number;
  lambda: number; eta: number; epsilon: number; temperature: number;
  seed: number | string; threshold: number; maxSequenceLength: number;
  maxSteps: number; architectureMode: "stratified" | "flat" | string;
}`;

export const PARAMETER_PROFILES_INTERFACE = `export interface ParameterProfiles {
  evaluationProfile?: string;
  relationalProfile?: string;
  searchProfile?: string;
  thresholdProfile?: string;
  constraintProfile?: string;
}`;

export const PARAMETER_SPEC_INTERFACE = `export interface ParameterSpec {
  key: ParameterKey;
  label: string;
  family: ParameterFamily;
  dbLabel: string;
  canonicalMeaning: string;
  higherValueEffect?: string;
  notes?: string;
}`;

export const METRIC_TYPES_INTERFACE = `export type MetricFamily =
  | "composite_score" | "stability" | "shape" | "trajectory"
  | "signature_integrity" | "orientation" | "agreement"
  | "stress_test_outcome";

export type MetricKey =
  | "telic_score" | "resilience" | "telic_curvature"
  | "path_integral" | "mod97_value" | "compass_orientation"
  | "consensus_score" | "adversarial_status";

export type CompassOrientation = "North" | "South" | "East" | "West" | "None" | string;
export type AdversarialStatus = "passed" | "failed" | "unknown";

export interface TerminalMetrics {
  telic_score: number; resilience: number; telic_curvature: number;
  path_integral: number; mod97_value: number | string;
  compass_orientation: CompassOrientation;
  consensus_score: number; adversarial_status: AdversarialStatus;
}`;

export const METRIC_SPEC_INTERFACE = `export interface MetricSpec {
  key: MetricKey;
  label: string;
  family: MetricFamily;
  dbLabel: string;
  canonicalMeaning: string;
  analyticQuestion: string;
  notes?: string;
}`;

export const RUN_SUMMARY_METRICS_INTERFACE = `export interface RunSummaryMetrics {
  best_telic_score?: number;
  best_score_step?: number;
  plateau_start_step?: number;
  growth_phase_end_step?: number;
  mean_resilience?: number;
  peak_telic_curvature?: number;
  final_compass_orientation?: CompassOrientation;
  adversarial_passed?: boolean;
}`;

export const INITIAL_STATE_INTERFACE = `export interface InitialState {
  initialSequence: string[];
  initialLength: number;
  initialNarrative?: string;
  distilledNarrative?: string;
  initialMetrics?: Partial<TerminalMetrics>;
}`;

export const TRANSITION_TYPES_INTERFACE = `export type ProposalType = "init" | "none" | "insert" | "delete" | "swap" | "combine";

export type StepDelta =
  | { kind: "none" }
  | { kind: "insert"; symbol: string; index?: number }
  | { kind: "delete"; symbol: string; index?: number }
  | { kind: "swap"; fromIndex: number; toIndex: number }
  | { kind: "combine"; symbols: string[]; result?: string };`;

export const DEBUG_TRACE_INTERFACE = `export interface DebugTraceEntry {
  step: number;
  sequence: string[];
  proposalType: ProposalType;
  accepted: boolean | null;
  deltaScore?: number;
  inventoryChanged?: boolean;
  orderChanged?: boolean;
  delta?: StepDelta;
  metrics: Partial<TerminalMetrics>;
  rawDuality?: number;
  duality?: number;
  bridgeActive?: boolean;
  bridgeType?: string;
  observerCandidate?: boolean;
  observerEmerged?: boolean;
  notes?: string;
}`;

export const EVENT_LOG_INTERFACE = `export type EventType =
  | "new_best" | "inventory_change" | "order_change"
  | "meaningful_order_change" | "plateau_start"
  | "sequence_stabilized" | "bridge_event"
  | "observer_candidate" | "observer_emerged"
  | "structural_warning" | "collapse_warning"
  | "adversarial_failure";

export interface EventLogEntry {
  type: EventType;
  step: number;
  score?: number;
  sequence?: string[];
  payload?: Record<string, unknown>;
}`;

export const STRUCTURAL_SUMMARY_INTERFACE = `export interface StructuralSummary {
  finalSequence: string[];
  finalLength: number;
  convergenceIters?: number;
  contractionRate?: number;
  fidelity?: number;
  cfIndex?: number;
  mod97Final?: number | string;
  bestScoreStep?: number;
  plateauStartStep?: number;
  lastInventoryChangeStep?: number;
  lastOrderChangeStep?: number;
  lastAcceptedChangeStep?: number;
  lastMeaningfulAcceptedStep?: number;
  meaningfulChangeCount?: number;
  nullOrNoEffectStepCount?: number;
  stabilityRatio?: number;
  bridgeEventCount?: number;
  uniqueBridgeCount?: number;
  observerEmerged?: boolean;
  observerStep?: number;
}`;

export const ADVERSARIAL_METADATA_INTERFACE = `export interface AdversarialMetadata {
  adversarialTestName?: string;
  adversarialTestVersion?: string;
  adversarialFailureReason?: string;
}`;

export const RUN_RECORD_INTERFACE = `export interface CompassRunRecord {
  metadata: RunMetadata;
  probe?: ProbeMetadata;
  parameters: CompassParameters;
  parameterProfiles?: ParameterProfiles;
  initialState: InitialState;
  metrics: TerminalMetrics;
  runSummary?: RunSummaryMetrics;
  structuralSummary: StructuralSummary;
  eventLog: EventLogEntry[];
  debugTrace?: DebugTraceEntry[];
  adversarial?: AdversarialMetadata;
  tags?: string[];
}`;

export const SUMMARY_ROW_INTERFACE = `export interface CompassRunSummaryRow {
  run_id: string;
  timestamp: string;
  schema_version: SchemaVersion;
  parameter_lexicon_version: LexiconVersion;
  metrics_lexicon_version: LexiconVersion;
  engine_version: string;
  ontology_version?: string;
  probe_family?: string;
  probe_role?: string;
  source_text_hash?: string;
  evaluation_profile?: string;
  relational_profile?: string;
  search_profile?: string;
  threshold_profile?: string;
  constraint_profile?: string;
  information_weight: number;
  coherence_weight: number;
  energy_weight: number;
  complexity_penalty: number;
  coupling_factor: number;
  binding_strength: number;
  noise_level: number;
  simulation_temperature: number;
  observer_threshold: number;
  max_sequence_length: number;
  simulation_depth: number;
  architecture_mode: string;
  experiment_seed: number | string;
  telic_score: number;
  resilience: number;
  telic_curvature: number;
  path_integral: number;
  mod97_value: number | string;
  compass_orientation: string;
  consensus_score: number;
  adversarial_status: string;
  best_telic_score?: number;
  best_score_step?: number;
  plateau_start_step?: number;
  mean_resilience?: number;
  peak_telic_curvature?: number;
  final_compass_orientation?: string;
  adversarial_passed?: boolean;
  last_inventory_change_step?: number;
  last_order_change_step?: number;
  last_accepted_change_step?: number;
  last_meaningful_accepted_step?: number;
  meaningful_change_count?: number;
  null_or_no_effect_step_count?: number;
  bridge_event_count?: number;
  unique_bridge_count?: number;
  final_sequence_json?: string;
  tags_json?: string;
}`;

export const CONSTANT_MAPS_INTERFACE = `export const PARAMETER_DB_LABELS = {
  alpha: "information_weight",
  gamma: "coherence_weight",
  delta: "energy_weight",
  beta: "complexity_penalty",
  lambda: "coupling_factor",
  eta: "binding_strength",
  epsilon: "noise_level",
  temperature: "simulation_temperature",
  seed: "experiment_seed",
  threshold: "observer_threshold",
  maxSequenceLength: "max_sequence_length",
  maxSteps: "simulation_depth",
  architectureMode: "architecture_mode",
} as const;

export const METRIC_DB_LABELS = {
  telic_score: "telic_score",
  resilience: "resilience",
  telic_curvature: "telic_curvature",
  path_integral: "path_integral",
  mod97_value: "mod97_value",
  compass_orientation: "compass_orientation",
  consensus_score: "consensus_score",
  adversarial_status: "adversarial_status",
} as const;`;
