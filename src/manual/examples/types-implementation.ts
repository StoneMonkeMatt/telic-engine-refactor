export const TYPES_IMPLEMENTATION = `export type LexiconVersion = "compass-v1";
export type SchemaVersion = "compass-run-v1" | "compass-run-v1.1";

export type ParameterFamily =
  | "evaluation"
  | "relational_dynamics"
  | "search_dynamics"
  | "threshold"
  | "structural_constraint";

export type ParameterKey =
  | "alpha"
  | "gamma"
  | "delta"
  | "beta"
  | "lambda"
  | "eta"
  | "epsilon"
  | "temperature"
  | "seed"
  | "threshold"
  | "maxSequenceLength"
  | "maxSteps"
  | "architectureMode";

export interface CompassParameters {
  alpha: number;
  gamma: number;
  delta: number;
  beta: number;
  lambda: number;
  eta: number;
  epsilon: number;
  temperature: number;
  seed: number | string;
  threshold: number;
  maxSequenceLength: number;
  maxSteps: number;
  architectureMode: "stratified" | "flat" | string;
}

export interface ParameterProfiles {
  evaluationProfile?: string;
  relationalProfile?: string;
  searchProfile?: string;
  thresholdProfile?: string;
  constraintProfile?: string;
}

export interface RunMetadata {
  schemaVersion: SchemaVersion;
  parameterLexiconVersion: LexiconVersion;
  metricsLexiconVersion: LexiconVersion;
  runId: string;
  timestamp: string;
  engineVersion: string;
  ontologyVersion?: string;
  seed: number | string;
  mode: "simulation" | "adversarial" | "probe";
  provider?: string;
  model?: string;
}

export interface CompassRunRecord {
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
