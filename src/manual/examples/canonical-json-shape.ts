export const CANONICAL_JSON_SHAPE = `{
  "metadata": {
    "schemaVersion": "compass-run-v1",
    "parameterLexiconVersion": "compass-v1",
    "metricsLexiconVersion": "compass-v1",
    "runId": "run-2026-03-25-001",
    "timestamp": "2026-03-25T12:00:00Z",
    "engineVersion": "telos-v0.9",
    "ontologyVersion": "codex-v9",
    "seed": 176509,
    "mode": "simulation",
    "provider": "DeepSeek",
    "model": "deepseek-chat"
  },
  "probe": {
    "probeId": "baseline-001",
    "probeFamily": "architectural-strata-v1",
    "probeRole": "baseline",
    "probeVersion": "v1",
    "sourceTextHash": "abc123",
    "sourceTextTitle": "Baseline Probe — Structural Stratification",
    "sourceTextPreview": "A system that must preserve continuity under repeated transformation..."
  },
  "parameters": {
    "alpha": 0.5, "gamma": 0.3, "delta": 0.2, "beta": 0.1,
    "lambda": 0.618, "eta": 0.3, "epsilon": 0.05, "temperature": 1,
    "seed": 176509, "threshold": 0.8, "maxSequenceLength": 10,
    "maxSteps": 60, "architectureMode": "stratified"
  },
  "parameterProfiles": {
    "evaluationProfile": "balanced",
    "relationalProfile": "moderate_binding",
    "searchProfile": "moderate_exploration",
    "thresholdProfile": "standard_observer",
    "constraintProfile": "canonical_10x60"
  },
  "initialState": {
    "initialSequence": ["⚓", "⛓️", "🕸️"],
    "initialLength": 3,
    "initialNarrative": "A system that must preserve continuity...",
    "distilledNarrative": "⚓ ⛓️ 🕸️",
    "initialMetrics": { "telic_score": 88.5, "resilience": 0.88 }
  },
  "metrics": {
    "telic_score": 157.3, "resilience": 0.8, "telic_curvature": 0.5857,
    "path_integral": 275, "mod97_value": 17, "compass_orientation": "East",
    "consensus_score": 149.44, "adversarial_status": "failed"
  },
  "runSummary": {
    "best_telic_score": 157.39, "best_score_step": 26, "plateau_start_step": 26,
    "growth_phase_end_step": 26, "mean_resilience": 0.84, "peak_telic_curvature": 0.60,
    "final_compass_orientation": "East", "adversarial_passed": false
  },
  "structuralSummary": {
    "finalSequence": ["⚓", "⛓️", "🧘", "🕯️"],
    "finalLength": 4, "convergenceIters": 60, "contractionRate": 0.5,
    "fidelity": 0.45, "cfIndex": 0.81, "mod97Final": 17,
    "bestScoreStep": 26, "plateauStartStep": 26,
    "lastInventoryChangeStep": 26, "lastOrderChangeStep": 51,
    "lastAcceptedChangeStep": 51, "lastMeaningfulAcceptedStep": 46,
    "meaningfulChangeCount": 11, "nullOrNoEffectStepCount": 19,
    "stabilityRatio": 0.77, "bridgeEventCount": 12,
    "uniqueBridgeCount": 2, "observerEmerged": false
  },
  "eventLog": [
    { "type": "new_best", "step": 8, "score": 120.68 },
    { "type": "inventory_change", "step": 17, "sequence": ["⚓", "⛓️", "🧘", "🕯️"] },
    { "type": "plateau_start", "step": 26 }
  ],
  "debugTrace": [],
  "adversarial": {
    "adversarialTestName": "void-test",
    "adversarialTestVersion": "v1",
    "adversarialFailureReason": "coherence collapse under perturbation"
  },
  "tags": ["baseline", "canonical", "paper-probe"]
}`;
