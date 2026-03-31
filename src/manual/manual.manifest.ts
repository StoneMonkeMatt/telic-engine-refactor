import { ManualManifestEntry } from "./manual.types";

/**
 * Manifest for the Compass Build Manual structure.
 */
export const manualManifest: ManualManifestEntry[] = [
  {
    id: "part-01",
    title: "Part I. Parameter Ontology",
    file: "part-01-parameter-ontology.tsx",
    summary: "Defines the canonical symbolic ontology and parameter registry.",
    authority: "canonical",
    isLive: false,
    keywords: ["parameter", "ontology", "lexicon", "symbols", "domains"]
  },
  {
    id: "part-02",
    title: "Part II. Output Metrics Ontology",
    file: "part-02-output-metrics-ontology.tsx",
    summary: "Defines the canonical metrics used to evaluate simulation outcomes.",
    authority: "canonical",
    isLive: false,
    keywords: ["metrics", "ontology", "telic", "resilience", "duality"]
  },
  {
    id: "part-03",
    title: "Part III. Event and Trace Vocabulary",
    file: "part-03-event-trace-vocabulary.tsx",
    summary: "Defines the standard event types and summary fields for run analysis.",
    authority: "canonical",
    isLive: false,
    keywords: ["event", "trace", "vocabulary", "log", "runSummary"]
  },
  {
    id: "part-04",
    title: "Part IV. Canonical Field Guidance",
    file: "part-04-canonical-field-guidance.tsx",
    summary: "Provides detailed guidance on the meaning and use of canonical fields.",
    authority: "canonical",
    isLive: false,
    keywords: ["field", "guidance", "metadata", "probe", "parameters"]
  },
  {
    id: "part-05",
    title: "Part V. Controlled Vocabulary Summary",
    file: "part-05-controlled-vocabulary-summary.tsx",
    summary: "A concise summary of the controlled vocabulary used across the system.",
    authority: "canonical",
    isLive: false,
    keywords: ["vocabulary", "summary", "controlled", "lexicon"]
  },
  {
    id: "part-06",
    title: "Part VI. TypeScript Interface Pack",
    file: "part-06-typescript-interface-pack.tsx",
    summary: "The core TypeScript interfaces that govern the simulation engine.",
    authority: "canonical",
    isLive: false,
    keywords: ["typescript", "interface", "types", "contract"]
  },
  {
    id: "part-06-a",
    title: "Part VI-A. Canonical Implementation Order",
    file: "part-06-a-canonical-implementation-order.tsx",
    summary: "Defines the canonical order for implementing simulation components.",
    authority: "canonical",
    isLive: false,
    keywords: ["implementation", "order", "canonical"]
  },
  {
    id: "part-07",
    title: "Part VII. Research Alignment & Evidence",
    file: "part-07-research-alignment-evidence.tsx",
    summary: "Maps simulation outputs to research evidence and alignment goals.",
    authority: "canonical",
    isLive: false,
    keywords: ["research", "alignment", "evidence", "mapping"]
  },
  {
    id: "part-08",
    title: "Part VIII. JSON Schema & Validation",
    file: "part-08-json-schema-validation.tsx",
    summary: "Defines the JSON Schema and runtime validation for run records.",
    authority: "canonical",
    isLive: false,
    keywords: ["json", "schema", "validation", "contract"]
  },
  {
    id: "part-08-a",
    title: "Part VIII-A. Schema Boundary",
    file: "part-08-a-schema-boundary.tsx",
    summary: "Defines the boundary between persistence and execution logic.",
    authority: "canonical",
    isLive: false,
    keywords: ["schema", "boundary", "persistence", "execution"]
  },
  {
    id: "part-09",
    title: "Part IX. Current Engine Reference (V9)",
    file: "part-09-current-engine-reference.tsx",
    summary: "Implementation profile of the Telos v0.9 kernel.",
    authority: "current-engine",
    isLive: true,
    keywords: ["engine", "reference", "telos", "v0.9", "implementation"]
  },
  {
    id: "part-10",
    title: "Part X. Research Seams & Theoretical Frameworks",
    file: "part-10-research-seams-theoretical-frameworks.tsx",
    summary: "Explores the theoretical frameworks and research seams of the project.",
    authority: "speculative",
    isLive: false,
    keywords: ["research", "seams", "theoretical", "frameworks"]
  },
  {
    id: "part-11",
    title: "Part XI. Development Notes",
    file: "part-11-development-notes.tsx",
    summary: "Dated development logs and architectural breakdowns.",
    authority: "current-engine",
    isLive: true,
    keywords: ["notes", "development", "logs", "breakdown", "roadmap"]
  }
];
