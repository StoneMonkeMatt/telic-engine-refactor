
/**
 * Engine parameter types for the Telos kernel.
 */
export const ENGINE_PARAMETER_TYPES = `
interface TelosParams {
  // Evaluation Weights
  alpha: number;             // Information Weight (0-1.0)
  gamma: number;             // Coherence Weight (0-1.0)
  delta: number;             // Energy Weight (0-1.0)
  beta: number;              // Complexity Penalty (0-1.0)

  // Relational Dynamics
  lambda: number;            // Coupling Factor (0-1.0)
  eta: number;               // Binding Strength (0-1.0)

  // Search Dynamics
  epsilon: number;           // Noise Level (0-1.0)
  temperature: number;       // Simulation Temperature (0-2.0)
  seed: number | "random";   // PRNG Seed

  // Thresholds
  threshold: number;         // Observer Threshold (0-1.0)

  // Structural Constraints
  maxSequenceLength: number; // Upper bound on sequence size
  maxSteps: number;          // Max iterations per run
  architectureMode: "stratified" | "flat";
}
`;
