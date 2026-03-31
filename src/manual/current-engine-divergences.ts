import { DivergenceEntry } from "./manual.types";

/**
 * Divergence register between the canonical Compass specification and the current engine implementation (Telos v0.9).
 */
export const currentEngineDivergences: DivergenceEntry[] = [
  {
    id: "div-01",
    topic: "UI Labels vs Canonical Names",
    canonicalPosition: "Parameters should be referred to by their canonical keys (alpha, gamma, delta, beta).",
    currentEnginePosition: "UI uses descriptive labels like 'Information Weight', 'Coherence Weight', 'Energy Weight', and 'Complexity Penalty'.",
    divergence: "The UI labels are descriptive and may obscure the underlying mathematical role of the parameters.",
    severity: "low",
    relatedSections: ["part-01", "part-09"],
    status: "documented"
  },
  {
    id: "div-02",
    topic: "Observer Threshold Naming",
    canonicalPosition: "The canonical key for the observer threshold is 'observerThreshold'.",
    currentEnginePosition: "The current engine uses the key 'threshold' for this parameter.",
    divergence: "The current engine uses a generic key ('threshold') instead of the specific canonical key ('observerThreshold').",
    severity: "medium",
    relatedSections: ["part-01", "part-09"],
    status: "planned"
  },
  {
    id: "div-03",
    topic: "Mod93 vs Mod97",
    canonicalPosition: "The canonical alignment check for the V9 engine is Mod97.",
    currentEnginePosition: "The CompassDirection interface supports an optional 'mod93' field, but it is ignored by the functional engine.",
    divergence: "The interface supports a deprecated or future-facing field ('mod93') that is not used in the current engine's logic.",
    severity: "low",
    relatedSections: ["part-01-e", "part-09-c"],
    status: "documented"
  },
  {
    id: "div-04",
    topic: "Symbol Lists in Compass Matching",
    canonicalPosition: "Compass matching should verify if the sequence content matches the pole's specific symbol set.",
    currentEnginePosition: "The current findCompassMatch logic relies exclusively on the mod97 value.",
    divergence: "The engine uses a mathematical shortcut (mod97) instead of the full symbolic verification defined in the ontology.",
    severity: "medium",
    relatedSections: ["part-01-e", "part-09-c"],
    status: "documented"
  },
  {
    id: "div-05",
    topic: "Bridge Function Semantics",
    canonicalPosition: "Bridge function labels (e.g., 'Sustainability_to_Community') should trigger specialized scoring or behavior.",
    currentEnginePosition: "The engine uses the from/to/symbol properties to detect bridges, but the specific function label is descriptive only.",
    divergence: "The engine does not yet operationalize the semantic layer of the bridge ontology.",
    severity: "low",
    relatedSections: ["part-01-f", "part-09-c"],
    status: "documented"
  },
  {
    id: "div-06",
    topic: "Schema Target vs Current Export Shape",
    canonicalPosition: "The canonical run record should be populated directly from the engine's internal data structures.",
    currentEnginePosition: "The export mapping logic is still being refined to ensure all canonical fields are correctly populated.",
    divergence: "The current export shape may not yet fully align with the canonical CompassRunRecord schema.",
    severity: "medium",
    relatedSections: ["part-06", "part-08", "part-09-c"],
    status: "documented"
  }
];
