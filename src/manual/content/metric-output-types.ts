
/**
 * Metric output types for the Telos kernel.
 */
export const METRIC_OUTPUT_TYPES = `
interface MetricsData {
  // Composite Scores
  telicScore: number;        // Overall fitness (T)
  duality: number;           // Awareness vs. Structure

  // Stability & Integrity
  resilience: number;        // Stability against Void (R)
  mod97: number;             // Symbolic signature
  kernelPurity: number;      // % of Invariant Kernel symbols
  invariantLeakageFlag: boolean;

  // Shape & Trajectory
  telicCurvature: number;    // κ_telic
  pathIntegral: number;      // Cumulative trajectory value

  // Structural Dynamics
  bridgeActivationRate: number;
  consensusScore: number;
  adversarialStatus: boolean;
  compassOrientation: string;
}
`;
