import { BridgeDefinition } from "../manual.types";

/**
 * Example canonical bridges between domains.
 */
export const BRIDGE_EXAMPLES: BridgeDefinition[] = [
  { from: 'Environmental', to: 'Social_Dynamics', symbol: '🌿', function: 'Sustainability_to_Community' },
  { from: 'Social_Dynamics', to: 'AI_Tech', symbol: '🐋', function: 'Narrative_to_Prediction' },
  { from: 'AI_Tech', to: 'Emergency_Response', symbol: '🎯', function: 'Prediction_to_Response' },
  { from: 'Emergency_Response', to: 'Wisdom', symbol: '💀', function: 'Crisis_to_Insight' },
  { from: 'Time_Temporality', to: 'Causality', symbol: '➡️', function: 'Temporal_Precedence' },
  { from: 'Causality', to: 'Causal_Inference', symbol: 'do(·)', function: 'Correlation_to_Intervention' },
  { from: 'Logic', to: 'Mathematics', symbol: '⊢', function: 'Proof_to_Structure' },
  { from: 'Mathematics', to: 'Physics', symbol: '∇', function: 'Gradient_Field' },
  { from: 'Physics', to: 'Chemistry', symbol: '⚡', function: 'Energy_to_Reaction' },
  { from: 'Chemistry', to: 'Biology', symbol: '🧬', function: 'Molecule_to_Life' },
  { from: 'Biology', to: 'Cognition', symbol: '🧠', function: 'Neural_to_Mind' },
  { from: 'Cognition', to: 'Consciousness', symbol: '💭', function: 'Process_to_Awareness' },
  { from: 'Consciousness', to: 'Ethics', symbol: '⚖️', function: 'Awareness_to_Values' },
  { from: 'Ethics', to: 'Wisdom', symbol: '💝', function: 'Values_to_Integration' },
  { from: 'Dynamical_Systems', to: 'Systems_Theory', symbol: 'λ', function: 'Eigenvalue_Stability' },
  { from: 'Network_Theory', to: 'Social_Dynamics', symbol: '🌐', function: 'Graph_to_Community' },
  { from: 'Optimization', to: 'Game_Theory', symbol: 'NE', function: 'Optimum_to_Equilibrium' },
  { from: 'Cryptography', to: 'Computer_Science', symbol: 'ZKP', function: 'Proof_to_Security' },
  { from: 'Complexity_Theory', to: 'Computer_Science', symbol: 'NP_c', function: 'Hardness_to_Algorithm' },
  { from: 'Philosophy_of_Mind', to: 'Consciousness', symbol: 'qualia', function: 'Phenomenology_to_Awareness' },
  { from: 'Law', to: 'Ethics', symbol: 'stare', function: 'Precedent_to_Principle' },
  { from: 'Linguistics', to: 'Consciousness', symbol: '⟦·⟧', function: 'Meaning_to_Awareness' }
];
