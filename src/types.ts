export interface Symbol {
  glyph: string;
  meaning: string;
  domain: string;
  weight: number;
  opposites: string[];
}

export interface DomainMap {
  [key: string]: string[];
}

export interface CompassDirection {
  name?: string;
  symbols: string[];
  mod97?: number;
  mod93?: number;
}

export interface Compass {
  [key: string]: CompassDirection;
}

export interface Bridge {
  from: string;
  to: string;
  symbol: string;
  function?: string;
}

export interface BridgeEvent {
  bridgeKey: string;
  fromSymbol: string;
  toSymbol: string;
  fromDomain: string;
  toDomain: string;
  agent: string;
  proposalType: string;
  deltaScore: number;
  deltaCoherence: number;
  deltaDuality: number;
  accepted: boolean;
  kernelPurityChange?: number;
  kernelDivergenceChange?: number;
  leakageStayedFalse?: boolean;
}

export interface OntologyField {
  name: string;
  description: string;
  domains: string[];
}

export interface SymbolDatabase {
  symbols: Symbol[];
  domains: DomainMap;
  compass: Compass;
  cross_domain_bridges: Bridge[];
  ontology_fields?: OntologyField[];
}

export interface SimulationStep {
  step: number;
  sequence: string[];
  rawDuality: number;
  duality: number;
  telicScore: number;
  mod97: number;
  adversarialPassed: boolean;
  compassMatch: string;
  resilience: number;
  telicCurvature: number;
  pathIntegral: number;

  bestScoreSoFar: number;
  proposalType: string; // "init", "insert", "delete", "swap", "combine", "none"
  accepted: boolean | null; // null for step 0 (init)
  deltaScore: number;
  inventoryChanged: boolean;
  orderChanged: boolean;

  scoreInfo: number;
  scoreCoherence: number;
  scoreEnergy: number;
  scoreComplexityPenalty: number;

  // Phase 1: Instrumentation
  kernelPurity: number;
  convergenceIndex: number;
  kernelDivergence: number;
  bridgeActivationRate: number;
  telicScoreTrend: number;
  invariantLeakageFlag: boolean;

  // Phase 3: Consensus
  consensusScore: number;
  fracturePoints: number[];
  
  // Phase 5: Bridge Trace
  bridgeEvents?: BridgeEvent[];
}

export interface ProposalStats {
  counts: Record<string, { 
    proposed: number; 
    accepted: number; 
    totalDelta: number; 
    rejectedNegative: number;
    acceptanceRate: number;
    meanDeltaScore: number;
  }>;
  totalProposed: number;
  totalAccepted: number;
  noneProposed: number;
  acceptanceRateOverall: number;
}

export interface BridgeFamilyStats {
  proposed: number;
  accepted: number;
  rejected: number;
  acceptanceRate: number;
  meanAcceptedDeltaScore: number;
  meanAcceptedDeltaCoherence: number;
  meanAcceptedDeltaDuality: number;
  meanRejectedDeltaScore: number;
  meanRejectedDeltaCoherence: number;
  meanRejectedDeltaDuality: number;
  acceptedSafeRate: number;
  meanKernelPurityChange: number;
  meanKernelDivergenceChange: number;
}

export interface BridgeSummary {
  families: Record<string, BridgeFamilyStats>;
}

export interface SimulationResults {
  history: SimulationStep[];
  observerEmerged: boolean;
  observerStep?: number;
  originalText?: string;
  seed?: number;
  iterationsRun: number;
  bestScoreStep: number;
  plateauStartStep: number;
  lastInventoryChangeStep: number;
  lastOrderChangeStep: number;
  lastAcceptedChangeStep: number;
  lastMeaningfulAcceptedStep: number;
  proposalStats: ProposalStats;
  bridgeSummary: BridgeSummary;
}

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'grok' | 'deepseek';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  rememberKey: boolean;
}

export interface MetricsData {
  convergenceIters: number;
  contractionRate: number;
  fidelity: number;
  cfIndex: number;
  mod97Final: number;
  adversarialPassed: boolean;
  observerEmerged: boolean;
  resilience: number;
  telicCurvature: number;
  pathIntegral: number;
  bestScoreStep: number;
  plateauStartStep: number;
  lastInventoryChangeStep: number;
  lastOrderChangeStep: number;
  lastAcceptedChangeStep: number;
  lastMeaningfulAcceptedStep: number;

  // Phase 1: Instrumentation
  kernelPurity: number;
  convergenceIndex: number;
  kernelDivergence: number;
  bridgeActivationRate: number;
  telicScoreTrend: number;
  invariantLeakageFlag: boolean;
  
  // Phase 3: Consensus
  mirrorMetric: number;

  // Phase 5: Bridge Trace
  totalBridges: number;
  uniqueBridges: number;
}

// --- Compass Run Record (Part VIII) ---

export type LexiconVersion = "compass-v1";
export type SchemaVersion = "compass-run-v1" | "compass-run-v1.1";

export type ParameterFamily =
  | "evaluation"
  | "relational_dynamics"
  | "search_dynamics"
  | "threshold"
  | "structural_constraint";

export type ParameterKey =
  | "alpha"
  | "beta"
  | "gamma"
  | "delta"
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
  beta: number;
  gamma: number;
  delta: number;
  lambda: number;
  eta: number;
  epsilon: number;
  temperature: number;
  maxSteps: number;
  threshold: number;
  maxSequenceLength: number;
  architectureMode: "stratified" | "flat" | string;
  seed: number | string;
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

export interface ProbeMetadata {
  probeId: string;
  probeFamily: string;
  probeRole: string;
  probeVersion: string;
  sourceTextHash: string;
  sourceTextTitle: string;
  sourceTextPreview: string;
}

export interface TerminalMetrics {
  telic_score: number;
  resilience: number;
  telic_curvature: number;
  path_integral: number;
  mod97_value: number | string;
  compass_orientation: string;
  consensus_score: number;
  adversarial_status: "passed" | "failed" | "unknown";
}

export interface InitialState {
  initialSequence: string[];
  initialLength: number;
  initialNarrative?: string;
  distilledNarrative?: string;
  initialMetrics?: Partial<TerminalMetrics>;
}

export interface RunSummaryMetrics {
  best_telic_score: number;
  best_score_step: number;
  plateau_start_step: number;
  growth_phase_end_step: number;
  mean_resilience: number;
  peak_telic_curvature: number;
  final_compass_orientation: string;
  adversarial_passed: boolean;
}

export interface StructuralSummary {
  finalSequence: string[];
  finalLength: number;
  convergenceIters?: number;
  contractionRate?: number;
  fidelity?: number;
  cfIndex: number;
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
}

export type EventType = 
  | "new_best"
  | "inventory_change"
  | "order_change"
  | "meaningful_order_change"
  | "plateau_start"
  | "sequence_stabilized"
  | "bridge_event"
  | "observer_candidate"
  | "observer_emerged"
  | "structural_warning"
  | "collapse_warning"
  | "adversarial_failure";

export interface EventLogEntry {
  type: EventType;
  step: number;
  score?: number;
  sequence?: string[];
  payload?: any;
}

export type ProposalType = "init" | "none" | "insert" | "delete" | "swap" | "combine";

export interface DebugTraceEntry {
  step: number;
  sequence: string[];
  proposalType: ProposalType;
  accepted: boolean | null;
  deltaScore?: number;
  inventoryChanged?: boolean;
  orderChanged?: boolean;
  delta?: any;
  metrics: Partial<TerminalMetrics>;
  rawDuality?: number;
  duality?: number;
  bridgeActive?: boolean;
  bridgeType?: string;
  observerCandidate?: boolean;
  observerEmerged?: boolean;
  notes?: string;
}

export interface AdversarialMetadata {
  adversarialTestName: string;
  adversarialTestVersion: string;
  adversarialFailureReason: string;
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
}
