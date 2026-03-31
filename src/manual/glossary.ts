import { GlossaryEntry } from "./manual.types";

/**
 * Glossary of terms for the Compass Build Manual.
 * Sourced from App.tsx and canonical manual content.
 */
export const manualGlossary: GlossaryEntry[] = [
  {
    term: "kernel",
    definition: "The core set of 12 foundational symbols (e.g., 🐋, ⚓, 🌿) that provide structural stability to the simulation narrative.",
    aliases: ["core symbols", "foundational symbols"],
    relatedTerms: ["invariant kernel", "kernel purity"],
    sourceSectionIds: ["part-01-c", "part-01-d"],
    authority: "canonical"
  },
  {
    term: "invariant kernel",
    definition: "The Core_Kernel domain, representing the symbolic anchor that remains stable across simulation runs and against which preservation is measured.",
    relatedTerms: ["kernel", "kernel purity", "leakage"],
    sourceSectionIds: ["part-01-d"],
    authority: "canonical"
  },
  {
    term: "observer",
    definition: "An emergent property or entity that manifests when the simulation's duality score exceeds a specific threshold for a sustained period.",
    relatedTerms: ["observer emergence", "duality", "observer threshold"],
    sourceSectionIds: ["part-09"],
    authority: "canonical"
  },
  {
    term: "observer emergence",
    definition: "The process where an observer is officially registered after the duality score remains above the threshold for the required persistence duration.",
    relatedTerms: ["observer", "observer persistence", "observer threshold"],
    sourceSectionIds: ["part-09"],
    authority: "canonical"
  },
  {
    term: "duality",
    definition: "A metric representing the balance between Awareness and Structure (Awareness vs. Structure) in the simulation state.",
    aliases: ["awareness weight"],
    relatedTerms: ["observer", "resilience"],
    sourceSectionIds: ["part-02", "part-09-d"],
    authority: "canonical"
  },
  {
    term: "telic score",
    definition: "The objective fitness function of the simulation, calculated as a weighted sum of Information, Coherence, Energy, and Complexity.",
    aliases: ["objective fitness", "T"],
    relatedTerms: ["information", "coherence", "energy", "complexity"],
    sourceSectionIds: ["part-02", "part-09-d"],
    authority: "canonical"
  },
  {
    term: "bridge",
    definition: "A canonical symbolic transition between two different domains, explicitly defined in the Codex/library.",
    aliases: ["cross-domain bridge"],
    relatedTerms: ["bridge event", "codex"],
    sourceSectionIds: ["part-01-f"],
    authority: "canonical"
  },
  {
    term: "bridge event",
    definition: "A significant transition in the simulation where adjacent symbols from different domains activate a valid bridge from the Codex.",
    relatedTerms: ["bridge", "coherence"],
    sourceSectionIds: ["part-03", "part-09-c"],
    authority: "canonical"
  },
  {
    term: "resilience",
    definition: "A metric measuring the simulation state's stability against adversarial injection ('The Void') or stochastic perturbation.",
    aliases: ["stability against void"],
    relatedTerms: ["duality", "adversarial status"],
    sourceSectionIds: ["part-02", "part-09-e"],
    authority: "canonical"
  },
  {
    term: "mod97",
    definition: "A harmonic signature or symbolic fingerprint (0-96) used for alignment checks and mapping the state to the 7-point compass.",
    aliases: ["harmonic signature", "symbolic fingerprint"],
    relatedTerms: ["compass orientation", "alignment"],
    sourceSectionIds: ["part-01-e", "part-02"],
    authority: "canonical"
  },
  {
    term: "canon",
    definition: "The authoritative, theoretical specification of the Compass system, as defined in Parts I-IV of the manual.",
    forbiddenMeanings: ["current engine implementation"],
    relatedTerms: ["lexicon", "doctrine"],
    authority: "canonical"
  },
  {
    term: "current engine",
    definition: "The specific implementation of the Compass logic (e.g., Telos v0.9) which may diverge from the theoretical canon.",
    aliases: ["implementation", "Telos"],
    relatedTerms: ["canon", "divergence"],
    sourceSectionIds: ["part-09"],
    authority: "current-engine"
  },
  {
    term: "schema boundary",
    definition: "The strict separation between the persistence/validation contract (the record) and the execution/simulation logic (the engine).",
    relatedTerms: ["validation", "run record"],
    sourceSectionIds: ["part-08-a"],
    authority: "canonical"
  },
  {
    term: "lexicon",
    definition: "The controlled vocabulary of parameters, metrics, and symbols used across the Compass ecosystem to ensure semantic stability.",
    relatedTerms: ["ontology", "controlled vocabulary"],
    sourceSectionIds: ["part-05"],
    authority: "canonical"
  },
  {
    term: "narrative",
    definition: "The symbolic sequence evolved by the simulation, representing a compressed transformation of distilled meaning.",
    aliases: ["symbolic sequence", "run narrative"],
    relatedTerms: ["distillation", "proposal"],
    authority: "canonical"
  },
  {
    term: "distillation",
    definition: "The process of compressing human or AI-generated text into a symbolic narrative suitable for simulation input.",
    relatedTerms: ["narrative", "input sequence"],
    authority: "canonical"
  },
  {
    term: "proposal",
    definition: "A modification to the symbolic sequence suggested by a simulation agent (Preserver, Catalyst, or Synthesizer).",
    relatedTerms: ["agent", "acceptance", "stratified proposal"],
    sourceSectionIds: ["part-09-f"],
    authority: "canonical"
  },
  {
    term: "plateau",
    definition: "A phase in the simulation run where the telic score stabilizes and optimization progress significantly slows or stops.",
    aliases: ["convergence phase"],
    relatedTerms: ["plateau start step", "convergence"],
    sourceSectionIds: ["part-03"],
    authority: "canonical"
  },
  {
    term: "compass orientation",
    definition: "The directional alignment of the simulation state (North, East, South, West, etc.), calculated via mod97 harmonic values.",
    relatedTerms: ["compass", "mod97"],
    sourceSectionIds: ["part-01-e", "part-02"],
    authority: "canonical"
  },
  {
    term: "event vocabulary",
    definition: "The set of standard event types (e.g., new_best, bridge_event) used to record the history of a simulation run.",
    relatedTerms: ["event log", "run record"],
    sourceSectionIds: ["part-03"],
    authority: "canonical"
  },
  {
    term: "debug trace",
    definition: "A detailed, step-by-step history of the simulation engine's internal state, including rejected proposals and raw metrics.",
    relatedTerms: ["event log", "run record"],
    sourceSectionIds: ["part-03", "part-06"],
    authority: "canonical"
  },
  {
    term: "research archive",
    definition: "A collection of validated simulation runs used for academic, engineering, or comparative analysis.",
    relatedTerms: ["run record", "validation"],
    sourceSectionIds: ["part-07"],
    authority: "canonical"
  },
  {
    term: "run record",
    definition: "The complete, canonical data object (CompassRunRecord) representing a single simulation execution.",
    aliases: ["run object", "simulation record"],
    relatedTerms: ["schema", "validation"],
    sourceSectionIds: ["part-06", "part-08"],
    authority: "canonical"
  },
  {
    term: "validation",
    definition: "The process of verifying that a run record conforms to the canonical JSON Schema and TypeScript contract.",
    relatedTerms: ["schema", "run record"],
    sourceSectionIds: ["part-08"],
    authority: "canonical"
  },
  {
    term: "current parameter map",
    definition: "The set of live input parameters governing the current engine's behavior (e.g., alpha, gamma, threshold).",
    relatedTerms: ["parameter ontology", "current engine"],
    sourceSectionIds: ["part-09"],
    authority: "current-engine"
  },
  {
    term: "current metric map",
    definition: "The set of live output metrics produced by the current engine (e.g., telic_score, resilience).",
    relatedTerms: ["metrics ontology", "current engine"],
    sourceSectionIds: ["part-09"],
    authority: "current-engine"
  },
  {
    term: "export mapping",
    definition: "The logic that populates the canonical run record from the live engine's internal data structures.",
    relatedTerms: ["run record", "current engine"],
    sourceSectionIds: ["part-09-c"],
    authority: "current-engine"
  }
];
