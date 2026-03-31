import { DomainDefinition } from "../manual.types";

/**
 * Registry of canonical domains in the Compass ontology.
 */
export const DOMAIN_REGISTRY: DomainDefinition[] = [
  // Formal & Mathematical Foundations
  { id: "Logic", name: "Logic", category: "formalism" },
  { id: "Mathematics", name: "Mathematics", category: "formalism" },
  { id: "Set_Theory", name: "Set Theory", category: "formalism" },
  { id: "Measure_Theory", name: "Measure Theory", category: "formalism" },
  { id: "Complexity_Theory", name: "Complexity Theory", category: "formalism" },
  { id: "Comp_Learning", name: "Computational Learning", category: "formalism" },
  { id: "Uncertainty_Probability", name: "Uncertainty & Probability", category: "formalism" },
  { id: "Diff_Geometry", name: "Differential Geometry", category: "formalism" },
  { id: "Optimization", name: "Optimization", category: "formalism" },

  // Temporal & Causal Foundations
  { id: "Time_Temporality", name: "Time & Temporality", category: "foundational" },
  { id: "Causality", name: "Causality", category: "foundational" },
  { id: "Causal_Inference", name: "Causal Inference", category: "foundational" },

  // Physical Sciences & Engineering
  { id: "Physics", name: "Physics", category: "scientific" },
  { id: "Chemistry", name: "Chemistry", category: "scientific" },
  { id: "Materials_Science", name: "Materials Science", category: "scientific" },
  { id: "Fluid_Dynamics", name: "Fluid Dynamics", category: "scientific" },
  { id: "General_Relativity", name: "General Relativity", category: "scientific" },

  // Scientific & Technical Systems
  { id: "Systems_Theory", name: "Systems Theory", category: "technical" },
  { id: "Info_Theory", name: "Information Theory", category: "technical" },
  { id: "Network_Theory", name: "Network Theory", category: "technical" },
  { id: "Control_Theory", name: "Control Theory", category: "technical" },
  { id: "Dynamical_Systems", name: "Dynamical Systems", category: "technical" },
  { id: "Stochastic", name: "Stochastic Processes", category: "technical" },
  { id: "Signal_Processing", name: "Signal Processing", category: "technical" },
  { id: "Cryptography", name: "Cryptography", category: "technical" },
  { id: "Computer_Science", name: "Computer Science", category: "technical" },

  // Biological & Life Sciences
  { id: "Biology", name: "Biology", category: "scientific" },
  { id: "Evolutionary_Biology", name: "Evolutionary Biology", category: "scientific" },
  { id: "Neuroscience", name: "Neuroscience", category: "scientific" },
  { id: "Medicine_Health", name: "Medicine & Health", category: "scientific" },
  { id: "Pharmacology", name: "Pharmacology", category: "scientific" },
  { id: "Epidemiology", name: "Epidemiology", category: "scientific" },
  { id: "Ecology", name: "Ecology", category: "scientific" },

  // Cognitive & Psychological
  { id: "Cognition", name: "Cognition", category: "social" },
  { id: "Consciousness", name: "Consciousness", category: "social" },
  { id: "Philosophy_of_Mind", name: "Philosophy of Mind", category: "social" },
  { id: "Linguistics", name: "Linguistics", category: "expressive" },
  { id: "Wisdom", name: "Wisdom", category: "social" },

  // Social & Political Systems
  { id: "Social_Dynamics", name: "Social Dynamics", category: "social" },
  { id: "Economics", name: "Economics", category: "social" },
  { id: "Social_Choice", name: "Social Choice", category: "social" },
  { id: "Law", name: "Law", category: "social" },
  { id: "Ethics", name: "Ethics", category: "social" },
  { id: "Political_Science", name: "Political Science", category: "social" },
  { id: "Decision_Theory", name: "Decision Theory", category: "social" },
  { id: "Game_Theory", name: "Game Theory", category: "social" },

  // Applied & Practical Domains
  { id: "Environmental", name: "Environmental", category: "applied" },
  { id: "AI_Tech", name: "AI Technology", category: "applied" },
  { id: "Emergency_Response", name: "Emergency Response", category: "applied" },
  { id: "Transport_Mobility", name: "Transport & Mobility", category: "applied" },
  { id: "Footwear", name: "Footwear", category: "applied" },
  { id: "Sports_Equipment", name: "Sports Equipment", category: "applied" },
  { id: "Clothing_Textiles", name: "Clothing & Textiles", category: "applied" },
  { id: "Color_Spectrum", name: "Color Spectrum", category: "applied" },
  { id: "Art_Aesthetics", name: "Art & Aesthetics", category: "expressive" }
];
