import { 
  SimulationResults, 
  CompassRunRecord, 
  CompassParameters, 
  RunMetadata, 
  InitialState, 
  TerminalMetrics, 
  RunSummaryMetrics, 
  StructuralSummary, 
  EventLogEntry, 
  DebugTraceEntry,
  EventType,
  ProposalType,
  MetricsData
} from '../types';
import { manualVersion } from '../manual/manual.version';

export function transformToCompassRunRecord(
  results: SimulationResults,
  params: any, // TelosParams
  metrics: MetricsData | null,
  initialSequence: string[],
  originalText?: string,
  includeDebugTrace: boolean = true
): CompassRunRecord {
  const history = results.history;
  const finalStep = history[history.length - 1];
  const initialStep = history[0];

  // 1. Metadata
  const metadata: RunMetadata = {
    schemaVersion: "compass-run-v1",
    parameterLexiconVersion: "compass-v1",
    metricsLexiconVersion: "compass-v1",
    runId: `run-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    engineVersion: manualVersion.engineReferenceVersion,
    ontologyVersion: manualVersion.notes.split(' ')[0] || 'codex-v9', // Heuristic
    seed: results.seed || params.seed || 0,
    mode: originalText ? "probe" : "simulation",
  };

  // 1.1 Probe (if applicable)
  let probe: any = undefined;
  if (originalText) {
    probe = {
      probeId: `probe-${Math.floor(Math.random() * 1000000)}`,
      probeFamily: "narrative_distillation",
      probeRole: "source_text",
      probeVersion: "1.0",
      sourceTextHash: "sha256-placeholder", // Would need a hash function
      sourceTextTitle: originalText.slice(0, 30) + "...",
      sourceTextPreview: originalText.slice(0, 100) + "..."
    };
  }

  // 2. Parameters
  const parameters: CompassParameters = {
    alpha: params.alpha,
    beta: params.beta,
    gamma: params.gamma,
    delta: params.delta,
    lambda: params.lambda,
    eta: params.eta,
    epsilon: params.epsilon,
    temperature: params.temperature,
    maxSteps: results.iterationsRun,
    threshold: params.threshold,
    maxSequenceLength: params.maxSequenceLength,
    architectureMode: params.architectureMode,
    seed: results.seed || params.seed || 0,
  };

  // 2.1 Parameter Profiles
  const parameterProfiles = {
    evaluationProfile: params.alpha > 0.6 ? "Information-Heavy" : "Balanced",
    relationalProfile: params.lambda > 0.7 ? "Strong-Coupling" : "Standard",
    searchProfile: params.temperature > 1.2 ? "Exploratory" : "Conservative",
    thresholdProfile: params.threshold > 0.85 ? "Strict" : "Standard",
    constraintProfile: params.maxSequenceLength > 15 ? "High-Capacity" : "Standard"
  };

  // 3. Initial State
  const initialState: InitialState = {
    initialSequence: [...initialSequence],
    initialLength: initialSequence.length,
    initialNarrative: originalText,
    distilledNarrative: initialSequence.join(' '),
    initialMetrics: {
      telic_score: initialStep.telicScore,
      resilience: initialStep.resilience,
      telic_curvature: initialStep.telicCurvature,
      path_integral: initialStep.pathIntegral,
      mod97_value: initialStep.mod97,
      compass_orientation: initialStep.compassMatch,
      consensus_score: initialStep.consensusScore,
      adversarial_status: initialStep.adversarialPassed ? "passed" : "failed"
    }
  };

  // 4. Metrics (Terminal)
  const terminalMetrics: TerminalMetrics = {
    telic_score: finalStep.telicScore,
    resilience: finalStep.resilience,
    telic_curvature: finalStep.telicCurvature,
    path_integral: finalStep.pathIntegral,
    mod97_value: finalStep.mod97,
    compass_orientation: finalStep.compassMatch,
    consensus_score: finalStep.consensusScore,
    adversarial_status: finalStep.adversarialPassed ? "passed" : "failed"
  };

  // 5. Run Summary
  const runSummary: RunSummaryMetrics = {
    best_telic_score: results.history.reduce((max, s) => Math.max(max, s.telicScore), -Infinity),
    best_score_step: results.bestScoreStep,
    plateau_start_step: results.plateauStartStep,
    growth_phase_end_step: results.bestScoreStep, // Heuristic
    mean_resilience: results.history.reduce((acc, s) => acc + s.resilience, 0) / results.history.length,
    peak_telic_curvature: results.history.reduce((max, s) => Math.max(max, s.telicCurvature), -Infinity),
    final_compass_orientation: finalStep.compassMatch,
    adversarial_passed: finalStep.adversarialPassed
  };

  // 6. Structural Summary
  const structuralSummary: StructuralSummary = {
    finalSequence: [...finalStep.sequence],
    finalLength: finalStep.sequence.length,
    convergenceIters: results.iterationsRun,
    contractionRate: metrics?.contractionRate || 0,
    fidelity: metrics?.fidelity || 0,
    cfIndex: metrics?.cfIndex || 0,
    mod97Final: finalStep.mod97,
    bestScoreStep: results.bestScoreStep,
    plateauStartStep: results.plateauStartStep,
    lastInventoryChangeStep: results.lastInventoryChangeStep,
    lastOrderChangeStep: results.lastOrderChangeStep,
    lastAcceptedChangeStep: results.lastAcceptedChangeStep,
    lastMeaningfulAcceptedStep: results.lastMeaningfulAcceptedStep,
    meaningfulChangeCount: results.history.filter(s => s.accepted && (s.inventoryChanged || s.deltaScore > 0.01)).length,
    nullOrNoEffectStepCount: results.history.filter(s => !s.accepted || s.proposalType === 'none').length,
    stabilityRatio: results.history.filter(s => !s.accepted).length / results.history.length,
    bridgeEventCount: metrics?.totalBridges || 0,
    uniqueBridgeCount: metrics?.uniqueBridges || 0,
    observerEmerged: results.observerEmerged,
    observerStep: results.observerStep
  };

  // 7. Event Log
  const eventLog: EventLogEntry[] = [];
  let lastScore = -Infinity;
  
  history.forEach((step, idx) => {
    if (step.telicScore > lastScore) {
      eventLog.push({
        type: "new_best",
        step: step.step,
        score: step.telicScore,
        sequence: [...step.sequence]
      });
      lastScore = step.telicScore;
    }

    if (step.inventoryChanged) {
      eventLog.push({
        type: "inventory_change",
        step: step.step,
        score: step.telicScore,
        sequence: [...step.sequence]
      });
    }

    if (step.orderChanged && !step.inventoryChanged) {
      eventLog.push({
        type: "order_change",
        step: step.step,
        score: step.telicScore,
        sequence: [...step.sequence]
      });
    }

    if (step.bridgeEvents && step.bridgeEvents.length > 0 && step.accepted) {
      eventLog.push({
        type: "bridge_event",
        step: step.step,
        score: step.telicScore,
        sequence: [...step.sequence],
        payload: { bridges: step.bridgeEvents.map(e => e.bridgeKey) }
      });
    }
  });

  // 8. Debug Trace (Full history)
  const debugTrace: DebugTraceEntry[] | undefined = includeDebugTrace ? history.map(step => ({
    step: step.step,
    sequence: [...step.sequence],
    proposalType: step.proposalType as ProposalType,
    accepted: step.accepted,
    deltaScore: step.deltaScore,
    inventoryChanged: step.inventoryChanged,
    orderChanged: step.orderChanged,
    metrics: {
      telic_score: step.telicScore,
      resilience: step.resilience,
      telic_curvature: step.telicCurvature,
      path_integral: step.pathIntegral,
      mod97_value: step.mod97,
      compass_orientation: step.compassMatch,
      consensus_score: step.consensusScore,
      adversarial_status: step.adversarialPassed ? "passed" : "failed"
    },
    rawDuality: step.rawDuality,
    duality: step.duality,
    bridgeActive: (step.bridgeEvents?.length || 0) > 0,
    observerEmerged: results.observerEmerged && results.observerStep === step.step
  })) : undefined;

  // 9. Adversarial
  let adversarial: any = undefined;
  if (!finalStep.adversarialPassed) {
    adversarial = {
      adversarialTestName: "Invariant Leakage Test",
      adversarialTestVersion: "v1.0",
      adversarialFailureReason: "Invariant leakage flag triggered or score threshold mismatch."
    };
  }

  return {
    metadata,
    probe,
    parameters,
    parameterProfiles,
    initialState,
    metrics: terminalMetrics,
    runSummary,
    structuralSummary,
    eventLog,
    debugTrace,
    adversarial,
    tags: ["simulation", params.architectureMode]
  };
}
