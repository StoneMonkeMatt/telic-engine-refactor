/**
 * Dated development notes and architectural breakdowns.
 */
export const DEVELOPMENT_NOTES = [
  {
    date: "2026-03-31",
    title: "Phased Refactor: Proposal Intelligence & Reproducibility",
    status: "Active implementation roadmap for externalizing proposal logic and hardening the engine.",
    filesToAdapt: [
      { file: "src/logic/telos.ts", changes: "Orchestration only; removal of proposal/ranking/selection logic." },
      { file: "src/types.ts", changes: "New interfaces for proposal frontier, candidate sets, and benchmark metadata." },
      { file: "src/services/aiService.ts", changes: "Deterministic/cached preparation path, temperature 0 support." }
    ],
    newFiles: [
      { path: "src/logic/proposals/", files: "frontier.ts, rank.ts, select.ts, agents.ts" },
      { path: "src/logic/selection/", files: "tiebreak.ts, eligibility.ts" },
      { path: "src/logic/benchmarks/", files: "reproducibility.ts, probes.ts, initialStates.ts" },
      { path: "src/logic/analysis/", files: "proposalDiagnostics.ts, bridgeDiagnostics.ts, invariantDiagnostics.ts" }
    ],
    primaryGoal: "Pull proposal intelligence out of telos.ts into a dedicated proposal frontier/ranking layer.",
    phases: [
      {
        title: "Phase 1: Extract Proposal Mechanics",
        goal: "Move proposal generation/ranking/selection out of telos.ts while preserving current sim outputs.",
        files: [
          "src/logic/proposals/frontier.ts",
          "src/logic/proposals/rank.ts",
          "src/logic/proposals/select.ts",
          "src/logic/proposals/agents.ts",
          "src/logic/telos.ts (orchestration edits)",
          "src/types.ts (minimal new types)"
        ],
        constraints: [
          "Do not change canonical schema or exported run format unless required.",
          "Do not change user-facing UI behavior during the first extraction.",
          "Treat this phase as an internal architectural refactor."
        ],
        successCriteria: [
          "telos.ts becomes thinner and more orchestration-focused.",
          "Proposal generation is externalized into a frontier/ranking/selection pipeline.",
          "Current runs remain behaviorally comparable under the same seed."
        ]
      },
      {
        title: "Phase 2: Formalize Determinism & Reproducibility",
        goal: "Seeded selection, stable tie-breaks, and reproducibility metadata.",
        files: [
          "src/logic/selection/tiebreak.ts",
          "src/logic/selection/eligibility.ts",
          "src/logic/benchmarks/reproducibility.ts",
          "src/types.ts"
        ]
      },
      {
        title: "Phase 3: Diagnostics & Benchmark Probes",
        goal: "Expose why proposals were considered and why candidates won.",
        files: [
          "src/logic/analysis/proposalDiagnostics.ts",
          "src/logic/analysis/bridgeDiagnostics.ts",
          "src/logic/analysis/invariantDiagnostics.ts",
          "src/logic/benchmarks/probes.ts",
          "src/logic/benchmarks/initialStates.ts"
        ]
      },
      {
        title: "Phase 4: AI & Preparation Path Hardening",
        goal: "Deterministic prep path and cached distillation preparation.",
        files: [
          "src/services/aiService.ts"
        ]
      }
    ],
    notes: "Caution: Keep benchmark mode support in useSimulation.ts as a later concern. Pushing benchmark plumbing into the hook too soon risks mixing engine design and UI orchestration again. Benchmark and reproducibility logic should be born in the logic layer first.",
    keywords: "refactor, telos, proposals, frontier, rank, select, determinism, reproducibility, diagnostics, benchmarks, phases"
  },
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
