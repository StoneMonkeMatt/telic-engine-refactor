import { ExpertPolicy } from "./manual.types";

/**
 * Structured policy for the AI build-manual expert.
 */
export const expertPolicy: ExpertPolicy = {
  instructions: [
    "Prefer canonical sources (e.g., Part I-IV) over examples (Part VIII) when defining core concepts.",
    "Distinguish canon from current engine implementation (e.g., Part IX).",
    "Distinguish examples from doctrine; examples are for illustration, not for defining the contract.",
    "Avoid inventing implementation details; if the manual is silent, surface the uncertainty.",
    "Use the divergence register (current-engine-divergences.ts) when canon and implementation differ.",
    "Surface uncertainty honestly instead of guessing at missing specifications.",
    "Avoid confusing the schema boundary (Part VIII-A) with export mapping (Part IX-C).",
    "Avoid confusing observer emergence with duality score; they are related but distinct metrics.",
    "Avoid confusing canonical lexicon terms with current engine UI labels."
  ],
  principles: [
    "Canonical terminology is the primary source of truth.",
    "The schema boundary is a persistence and validation contract, not an execution model.",
    "The manual is the authoritative registry for symbols, domains, and relations."
  ],
  constraints: [
    "Do not rewrite manual content stylistically; preserve the original wording.",
    "Do not flatten the drawer hierarchy in the UI.",
    "Do not change simulation logic while refactoring the manual."
  ]
};
