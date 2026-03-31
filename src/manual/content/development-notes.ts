/**
 * Dated development notes and architectural breakdowns.
 */
export const DEVELOPMENT_NOTES = [
  {
    date: "2026-03-30",
    title: "Clean Breakdown",
    status: "Proposed refactor direction for proposal intelligence and reproducibility support.",
    filesToAdapt: [
      { file: "src/logic/telos.ts", changes: "Proposal generation, candidate frontier building, ranking, seeded sampling, tie-break handling." },
      { file: "src/logic/codex.ts", changes: "Symbol identity, stable tie-break helpers, local semantic/bridge checks." },
      { file: "src/logic/library.ts", changes: "Ranked selection support, kernel/navigational/periphery tagging." },
      { file: "src/logic/metrics.ts", changes: "Reusable local scoring helpers, separation of proposal vs export metrics." },
      { file: "src/hooks/useSimulation.ts", changes: "Benchmark mode support, diagnostic exposure." },
      { file: "src/services/aiService.ts", changes: "Deterministic/cached preparation path, temperature 0 support." },
      { file: "src/types.ts", changes: "New interfaces for proposal frontier, candidate sets, and benchmark metadata." }
    ],
    newFiles: [
      { path: "src/logic/proposals/", files: "frontier.ts, rank.ts, select.ts, agents.ts" },
      { path: "src/logic/selection/", files: "tiebreak.ts, eligibility.ts" },
      { path: "src/logic/benchmarks/", files: "probes.ts, initialStates.ts, reproducibility.ts" },
      { path: "src/logic/analysis/", files: "proposalDiagnostics.ts, bridgeDiagnostics.ts, invariantDiagnostics.ts" }
    ],
    primaryGoal: "Pull proposal intelligence out of telos.ts into a dedicated proposal frontier/ranking layer.",
    keywords: "breakdown, telos, codex, library, metrics, simulation, aiService, types, proposals, frontier, rank, select, agents, selection, tiebreak, eligibility, benchmarks, probes, initialStates, reproducibility, analysis, diagnostics"
  }
];
