
/**
 * Standard event vocabulary used in the Telos v0.9 engine.
 */
export const EVENT_VOCABULARY = [
  { 
    id: "new_best", 
    label: "New Best",
    category: "State Transition",
    trigger: "Score Delta > 0",
    description: "A new highest telic score has been achieved.",
    question: "When did the engine find a superior state?",
    interpretation: "Indicates successful optimization progress."
  },
  { 
    id: "inventory_change", 
    label: "Inventory Change",
    category: "State Transition",
    trigger: "Symbol Addition/Removal",
    description: "The set of symbolic elements has been modified.",
    question: "When did the available symbols evolve?",
    interpretation: "Indicates structural exploration of the lexicon."
  },
  { 
    id: "order_change", 
    label: "Order Change",
    category: "State Transition",
    trigger: "Symbol Re-ordering",
    description: "The arrangement of elements has been modified.",
    question: "When did the sequence structure shift?",
    interpretation: "Indicates local re-ordering or permutation."
  },
  { 
    id: "meaningful_order_change", 
    label: "Meaningful Order Change",
    category: "State Transition",
    trigger: "Score Delta > 0.01",
    description: "A non-trivial structural shift in ordering.",
    question: "When did a significant structural reorganization occur?",
    interpretation: "Indicates a major shift in the state's logic."
  },
  { 
    id: "plateau_start", 
    label: "Plateau Start",
    category: "Convergence",
    trigger: "Score Stagnation",
    description: "The run has entered a period of score stability.",
    question: "When did the engine stop finding improvements?",
    interpretation: "Indicates the beginning of convergence."
  },
  { 
    id: "sequence_stabilized", 
    label: "Sequence Stabilized",
    category: "Convergence",
    trigger: "Local Optimum Reached",
    description: "The symbolic sequence has reached a stable configuration.",
    question: "When did the structure stop oscillating?",
    interpretation: "Indicates a high-confidence final state."
  },
  { 
    id: "bridge_event", 
    label: "Bridge Event",
    category: "Emergence",
    trigger: "Cross-Domain Alignment",
    description: "A significant transition connecting disparate states.",
    question: "When did the engine jump between state families?",
    interpretation: "Indicates a non-local optimization leap."
  },
  { 
    id: "observer_candidate", 
    label: "Observer Candidate",
    category: "Emergence",
    trigger: "Duality > Threshold",
    description: "A state has qualified for observer inspection.",
    question: "When did the state become interesting enough to watch?",
    interpretation: "Indicates high complexity or novelty."
  },
  { 
    id: "observer_emerged", 
    label: "Observer Emerged",
    category: "Emergence",
    trigger: "Persistence Met",
    description: "An emergent property has been registered.",
    question: "When did a coherent pattern manifest?",
    interpretation: "Indicates the birth of a stable emergent feature."
  },
  { 
    id: "structural_warning", 
    label: "Structural Warning",
    category: "Integrity",
    trigger: "Boundary Proximity",
    description: "A potential integrity issue has been detected.",
    question: "Is the state becoming unstable?",
    interpretation: "Indicates a risk of structural collapse."
  },
  { 
    id: "collapse_warning", 
    label: "Collapse Warning",
    category: "Integrity",
    trigger: "Critical Instability",
    description: "A high risk of state collapse has been identified.",
    question: "Is the simulation about to fail?",
    interpretation: "High-priority warning of imminent failure."
  },
  { 
    id: "adversarial_failure", 
    label: "Adversarial Failure",
    category: "Integrity",
    trigger: "Stress Test Failure",
    description: "The state failed an adversarial stress test.",
    question: "Did the state break under pressure?",
    interpretation: "Indicates a lack of resilience."
  }
];
