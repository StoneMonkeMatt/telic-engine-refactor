
/**
 * Export and record types for the Telos kernel.
 */
export const EXPORT_RECORD_TYPES = `
interface RunRecord {
  // Metadata
  id: string;                // Unique run identifier
  timestamp: string;         // ISO 8601 creation date
  engineVersion: string;     // e.g., "Telos v0.9"

  // Input
  params: TelosParams;       // The input parameter set
  initialSequence: SymbolID[];

  // Output
  metrics: MetricsData;      // Final terminal metrics
  runSummary: SimulationResults;
  structuralSummary: BridgeSummary;
  eventLog: StateDelta[];    // Chronological trace
}

interface SimulationResults {
  history: StateDelta[];
  observerEmerged: boolean;
  observerStep: number | null;
  seed: number;
  iterationsRun: number;
  bestScoreStep: number;
  plateauStartStep: number;
}
`;
