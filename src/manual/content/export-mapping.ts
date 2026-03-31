
/**
 * Mapping of engine-level data structures to the canonical run record layers.
 */
export const EXPORT_MAPPING = [
  { 
    target: "metrics", 
    source: "MetricsData", 
    fields: "convergence, contraction, fidelity, cfIndex, mod97, resilience, telicCurvature, pathIntegral, kernelPurity, convergenceIndex, kernelDivergence, bridgeActivationRate, telicScoreTrend, invariantLeakageFlag, mirrorMetric" 
  },
  { 
    target: "runSummary", 
    source: "SimulationResults", 
    fields: "history, observerEmerged, observerStep, seed, iterationsRun, bestScoreStep, plateauStartStep, lastInventoryChangeStep, lastOrderChangeStep, lastAcceptedChangeStep, lastMeaningfulAcceptedStep" 
  },
  { 
    target: "structuralSummary", 
    source: "BridgeSummary", 
    fields: "family-level bridge proposal/acceptance stats" 
  },
  { 
    target: "eventLog", 
    source: "BridgeEvent[]", 
    fields: "trace of all bridge activations with delta scores and coherence shifts" 
  }
];
