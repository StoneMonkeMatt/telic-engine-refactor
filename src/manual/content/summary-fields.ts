
/**
 * Standard summary fields used in the Telos v0.9 engine for run analysis.
 */
export const SUMMARY_FIELDS = [
  { 
    id: "best_score_step", 
    label: "Best Score Step",
    category: "Temporal Milestones",
    description: "The step number where the maximum telic score was first reached.",
    question: "How quickly did we find the peak?"
  },
  { 
    id: "plateau_start_step", 
    label: "Plateau Start Step",
    category: "Temporal Milestones",
    description: "The step number where the final score plateau began.",
    question: "When did optimization stop being productive?"
  },
  { 
    id: "growth_phase_end_step", 
    label: "Growth Phase End Step",
    category: "Temporal Milestones",
    description: "The step where the initial expansion phase concluded.",
    question: "When did the state stop growing in size?"
  },
  { 
    id: "last_inventory_change_step", 
    label: "Last Inventory Change Step",
    category: "Finality & Persistence",
    description: "The final step where the symbolic inventory was modified.",
    question: "When was the lexicon finalized?"
  },
  { 
    id: "last_order_change_step", 
    label: "Last Order Change Step",
    category: "Finality & Persistence",
    description: "The final step where the sequence order was modified.",
    question: "When was the arrangement finalized?"
  },
  { 
    id: "last_accepted_change_step", 
    label: "Last Accepted Change Step",
    category: "Finality & Persistence",
    description: "The final step where any proposal was accepted.",
    question: "When did the state stop changing entirely?"
  },
  { 
    id: "last_meaningful_accepted_step", 
    label: "Last Meaningful Accepted Step",
    category: "Finality & Persistence",
    description: "The final step where a significant change was accepted.",
    question: "When did the state's logic stop evolving?"
  },
  { 
    id: "meaningful_change_count", 
    label: "Meaningful Change Count",
    category: "Cumulative Statistics",
    description: "Total number of significant transitions in the run.",
    question: "How dynamic was the simulation?"
  },
  { 
    id: "null_or_no_effect_step_count", 
    label: "Null Step Count",
    category: "Cumulative Statistics",
    description: "Total steps that resulted in no state change.",
    question: "How much 'dead time' was in the run?"
  },
  { 
    id: "bridge_event_count", 
    label: "Bridge Event Count",
    category: "Cumulative Statistics",
    description: "Total number of bridge events recorded.",
    question: "How many non-local leaps occurred?"
  },
  { 
    id: "unique_bridge_count", 
    label: "Unique Bridge Count",
    category: "Cumulative Statistics",
    description: "Number of distinct bridge transitions identified.",
    question: "How many unique state families were visited?"
  },
  { 
    id: "stability_ratio", 
    label: "Stability Ratio",
    category: "Performance Ratios",
    description: "The ratio of stable steps to total simulation depth.",
    question: "How much of the run was spent in a stable state?",
    interpretation: "Higher values indicate a more converged simulation."
  }
];
