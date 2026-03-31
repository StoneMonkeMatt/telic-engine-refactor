
/**
 * Core simulation types for the Telos kernel.
 */
export const CORE_SIMULATION_TYPES = `
interface SimulationState {
  sequence: SymbolID[];      // The current symbolic sequence
  step: number;              // Current iteration step
  metrics: MetricsData;      // Snapshot of all metrics at this step
  history: StateDelta[];     // Trace of changes leading to this state
}

type SymbolID = string;      // Canonical key from library.ts (e.g., "whale")

interface StateDelta {
  step: number;
  operation: "insert" | "delete" | "swap" | "combine" | "init";
  payload: any;
  scoreDelta: number;
  coherenceShift: number;
}
`;
