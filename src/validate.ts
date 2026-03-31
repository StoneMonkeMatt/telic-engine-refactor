import type { CompassRunRecord, EventType, ProposalType } from "./types";

export interface ValidationResult<T> {
  valid: boolean;
  errors: string[];
  value?: T;
}

/**
 * Minimal runtime validator.
 *
 * This is intentionally lightweight and dependency-free.
 * For production-grade validation, compile the JSON schema
 * in `schema.ts` with Ajv or another Draft 2020-12 validator.
 */
export function validateCompassRunRecord(input: unknown): ValidationResult<CompassRunRecord> {
  const errors: string[] = [];

  if (!isObject(input)) {
    return { valid: false, errors: ["Root value must be an object."] };
  }

  const record = input as Record<string, unknown>;

  requireObject(record, "metadata", errors);
  requireObject(record, "parameters", errors);
  requireObject(record, "initialState", errors);
  requireObject(record, "metrics", errors);
  requireObject(record, "structuralSummary", errors);
  requireArray(record, "eventLog", errors);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  validateMetadata(record.metadata as Record<string, unknown>, errors);
  validateParameters(record.parameters as Record<string, unknown>, errors);
  validateInitialState(record.initialState as Record<string, unknown>, errors);
  validateMetrics(record.metrics as Record<string, unknown>, "metrics", errors);
  validateStructuralSummary(record.structuralSummary as Record<string, unknown>, errors);
  validateEventLog(record.eventLog as unknown[], errors);

  if (record.runSummary !== undefined) {
    if (!isObject(record.runSummary)) {
      errors.push("runSummary must be an object when present.");
    } else {
      validateRunSummary(record.runSummary as Record<string, unknown>, errors);
    }
  }

  if (record.debugTrace !== undefined) {
    if (!Array.isArray(record.debugTrace)) {
      errors.push("debugTrace must be an array when present.");
    } else {
      validateDebugTrace(record.debugTrace as unknown[], errors);
    }
  }

  if (record.adversarial !== undefined && !isObject(record.adversarial)) {
    errors.push("adversarial must be an object when present.");
  }

  if (record.tags !== undefined && !isStringArray(record.tags)) {
    errors.push("tags must be an array of strings when present.");
  }

  return errors.length === 0
    ? { valid: true, errors: [], value: input as unknown as CompassRunRecord }
    : { valid: false, errors };
}

function validateMetadata(metadata: Record<string, unknown>, errors: string[]): void {
  requireString(metadata, "schemaVersion", errors, ["compass-run-v1", "compass-run-v1.1"]);
  requireString(metadata, "parameterLexiconVersion", errors, ["compass-v1"]);
  requireString(metadata, "metricsLexiconVersion", errors, ["compass-v1"]);
  requireString(metadata, "runId", errors);
  requireString(metadata, "timestamp", errors);
  requireString(metadata, "engineVersion", errors);
  requireStringOrNumber(metadata, "seed", errors);
}

function validateParameters(parameters: Record<string, unknown>, errors: string[]): void {
  [
    "alpha",
    "gamma",
    "delta",
    "beta",
    "lambda",
    "eta",
    "epsilon",
    "temperature",
    "threshold",
  ].forEach((key) => requireFiniteNumber(parameters, key, errors));

  requireStringOrNumber(parameters, "seed", errors);
  requirePositiveInteger(parameters, "maxSequenceLength", errors);
  requirePositiveInteger(parameters, "maxSteps", errors);
  requireString(parameters, "architectureMode", errors);
}

function validateInitialState(initialState: Record<string, unknown>, errors: string[]): void {
  requireStringArray(initialState, "initialSequence", errors);
  requireNonNegativeInteger(initialState, "initialLength", errors);

  if (initialState.initialMetrics !== undefined) {
    if (!isObject(initialState.initialMetrics)) {
      errors.push("initialState.initialMetrics must be an object when present.");
    } else {
      validateMetrics(initialState.initialMetrics as Record<string, unknown>, "initialState.initialMetrics", errors, true);
    }
  }
}

function validateMetrics(
  metrics: Record<string, unknown>,
  path: string,
  errors: string[],
  partial = false,
): void {
  const requiredKeys = [
    "telic_score",
    "resilience",
    "telic_curvature",
    "path_integral",
    "mod97_value",
    "compass_orientation",
    "consensus_score",
    "adversarial_status",
  ];

  if (!partial) {
    requiredKeys.forEach((key) => {
      if (!(key in metrics)) errors.push(`${path}.${key} is required.`);
    });
  }

  maybeFiniteNumber(metrics, "telic_score", `${path}.telic_score`, errors);
  maybeFiniteNumber(metrics, "resilience", `${path}.resilience`, errors);
  maybeFiniteNumber(metrics, "telic_curvature", `${path}.telic_curvature`, errors);
  maybeFiniteNumber(metrics, "path_integral", `${path}.path_integral`, errors);

  if ("mod97_value" in metrics && !isStringOrNumber(metrics.mod97_value)) {
    errors.push(`${path}.mod97_value must be a string or number.`);
  }
  if ("compass_orientation" in metrics && typeof metrics.compass_orientation !== "string") {
    errors.push(`${path}.compass_orientation must be a string.`);
  }
  if (
    "adversarial_status" in metrics &&
    !["passed", "failed", "unknown"].includes(String(metrics.adversarial_status))
  ) {
    errors.push(`${path}.adversarial_status must be 'passed', 'failed', or 'unknown'.`);
  }
  maybeFiniteNumber(metrics, "consensus_score", `${path}.consensus_score`, errors);
}

function validateRunSummary(runSummary: Record<string, unknown>, errors: string[]): void {
  ["best_telic_score", "mean_resilience", "peak_telic_curvature"].forEach((key) =>
    maybeFiniteNumber(runSummary, key, `runSummary.${key}`, errors),
  );

  ["best_score_step", "plateau_start_step", "growth_phase_end_step"].forEach((key) =>
    maybeNonNegativeInteger(runSummary, key, `runSummary.${key}`, errors),
  );

  if ("final_compass_orientation" in runSummary && typeof runSummary.final_compass_orientation !== "string") {
    errors.push("runSummary.final_compass_orientation must be a string.");
  }
  if ("adversarial_passed" in runSummary && typeof runSummary.adversarial_passed !== "boolean") {
    errors.push("runSummary.adversarial_passed must be a boolean.");
  }
}

function validateStructuralSummary(summary: Record<string, unknown>, errors: string[]): void {
  requireStringArray(summary, "finalSequence", errors);
  requireNonNegativeInteger(summary, "finalLength", errors);

  [
    "convergenceIters",
    "bestScoreStep",
    "plateauStartStep",
    "lastInventoryChangeStep",
    "lastOrderChangeStep",
    "lastAcceptedChangeStep",
    "lastMeaningfulAcceptedStep",
    "meaningfulChangeCount",
    "nullOrNoEffectStepCount",
    "bridgeEventCount",
    "uniqueBridgeCount",
    "observerStep",
  ].forEach((key) => maybeNonNegativeInteger(summary, key, `structuralSummary.${key}`, errors));

  ["contractionRate", "fidelity", "cfIndex", "stabilityRatio"].forEach((key) =>
    maybeFiniteNumber(summary, key, `structuralSummary.${key}`, errors),
  );

  if ("mod97Final" in summary && !isStringOrNumber(summary.mod97Final)) {
    errors.push("structuralSummary.mod97Final must be a string or number.");
  }
  if ("observerEmerged" in summary && typeof summary.observerEmerged !== "boolean") {
    errors.push("structuralSummary.observerEmerged must be a boolean.");
  }
}

function validateEventLog(eventLog: unknown[], errors: string[]): void {
  const validTypes = new Set<EventType>([
    "new_best",
    "inventory_change",
    "order_change",
    "meaningful_order_change",
    "plateau_start",
    "sequence_stabilized",
    "bridge_event",
    "observer_candidate",
    "observer_emerged",
    "structural_warning",
    "collapse_warning",
    "adversarial_failure",
  ]);

  eventLog.forEach((entry, index) => {
    if (!isObject(entry)) {
      errors.push(`eventLog[${index}] must be an object.`);
      return;
    }
    const item = entry as Record<string, unknown>;
    if (!validTypes.has(item.type as EventType)) {
      errors.push(`eventLog[${index}].type is invalid.`);
    }
    if (!Number.isInteger(item.step) || (item.step as number) < 0) {
      errors.push(`eventLog[${index}].step must be a non-negative integer.`);
    }
    if ("score" in item && !isFiniteNumber(item.score)) {
      errors.push(`eventLog[${index}].score must be a finite number.`);
    }
    if ("sequence" in item && !isStringArray(item.sequence)) {
      errors.push(`eventLog[${index}].sequence must be an array of strings.`);
    }
  });
}

function validateDebugTrace(debugTrace: unknown[], errors: string[]): void {
  const validProposalTypes = new Set<ProposalType>(["init", "none", "insert", "delete", "swap", "combine"]);

  debugTrace.forEach((entry, index) => {
    if (!isObject(entry)) {
      errors.push(`debugTrace[${index}] must be an object.`);
      return;
    }
    const item = entry as Record<string, unknown>;
    if (!Number.isInteger(item.step) || (item.step as number) < 0) {
      errors.push(`debugTrace[${index}].step must be a non-negative integer.`);
    }
    if (!isStringArray(item.sequence)) {
      errors.push(`debugTrace[${index}].sequence must be an array of strings.`);
    }
    if (!validProposalTypes.has(item.proposalType as ProposalType)) {
      errors.push(`debugTrace[${index}].proposalType is invalid.`);
    }
    if (!(typeof item.accepted === "boolean" || item.accepted === null)) {
      errors.push(`debugTrace[${index}].accepted must be boolean or null.`);
    }
    if (!isObject(item.metrics)) {
      errors.push(`debugTrace[${index}].metrics must be an object.`);
    } else {
      validateMetrics(item.metrics as Record<string, unknown>, `debugTrace[${index}].metrics`, errors, true);
    }
  });
}

function requireObject(parent: Record<string, unknown>, key: string, errors: string[]): void {
  if (!isObject(parent[key])) errors.push(`${key} must be an object.`);
}

function requireArray(parent: Record<string, unknown>, key: string, errors: string[]): void {
  if (!Array.isArray(parent[key])) errors.push(`${key} must be an array.`);
}

function requireString(
  parent: Record<string, unknown>,
  key: string,
  errors: string[],
  allowed?: string[],
): void {
  const value = parent[key];
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${key} must be a non-empty string.`);
    return;
  }
  if (allowed && !allowed.includes(value)) {
    errors.push(`${key} must be one of: ${allowed.join(", ")}.`);
  }
}

function requireStringOrNumber(parent: Record<string, unknown>, key: string, errors: string[]): void {
  if (!isStringOrNumber(parent[key])) errors.push(`${key} must be a string or number.`);
}

function requireFiniteNumber(parent: Record<string, unknown>, key: string, errors: string[]): void {
  if (!isFiniteNumber(parent[key])) errors.push(`${key} must be a finite number.`);
}

function requirePositiveInteger(parent: Record<string, unknown>, key: string, errors: string[]): void {
  const value = parent[key];
  if (!Number.isInteger(value) || (value as number) <= 0) {
    errors.push(`${key} must be a positive integer.`);
  }
}

function requireNonNegativeInteger(parent: Record<string, unknown>, key: string, errors: string[]): void {
  const value = parent[key];
  if (!Number.isInteger(value) || (value as number) < 0) {
    errors.push(`${key} must be a non-negative integer.`);
  }
}

function requireStringArray(parent: Record<string, unknown>, key: string, errors: string[]): void {
  if (!isStringArray(parent[key])) errors.push(`${key} must be an array of strings.`);
}

function maybeFiniteNumber(
  parent: Record<string, unknown>,
  key: string,
  path: string,
  errors: string[],
): void {
  if (key in parent && !isFiniteNumber(parent[key])) {
    errors.push(`${path} must be a finite number.`);
  }
}

function maybeNonNegativeInteger(
  parent: Record<string, unknown>,
  key: string,
  path: string,
  errors: string[],
): void {
  if (key in parent && (!Number.isInteger(parent[key]) || (parent[key] as number) < 0)) {
    errors.push(`${path} must be a non-negative integer.`);
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringOrNumber(value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number";
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
