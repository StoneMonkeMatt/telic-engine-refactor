
/**
 * Mapping of simulation data structures to research evidence for the Telos v0.9 paper.
 */
export const RESEARCH_ALIGNMENT_MAPPING = [
  { 
    key: "eventLog", 
    value: "Evidence of transition structure (order vs inventory changes).", 
    ref: "Part VI.15" 
  },
  { 
    key: "runSummary", 
    value: "Evidence of phase structure (growth vs plateau).", 
    ref: "Part VI.9" 
  },
  { 
    key: "structuralSummary", 
    value: "Evidence of invariant vs expansion (kernel vs periphery).", 
    ref: "Part VI.16" 
  },
  { 
    key: "parameterProfiles", 
    value: "Evidence of causal conditions (regime-based outcomes).", 
    ref: "Part VI.4" 
  },
  { 
    key: "probeMetadata", 
    value: "Evidence of input design (starting state influence).", 
    ref: "Part VI.2" 
  }
];

/**
 * Core research questions and their evidence checklist.
 */
export const RESEARCH_QUESTIONS = [
  { 
    title: "Kernel Pressure", 
    description: "Does a compact kernel appear repeatedly across different seeds?" 
  },
  { 
    title: "Navigational Control", 
    description: "Does the observer emerge at specific parameter thresholds?" 
  },
  { 
    title: "Expressive Expansion", 
    description: "How does the sequence length correlate with telic curvature?" 
  },
  { 
    title: "Observer Behavior", 
    description: "Does observer emergence correlate with specific structural transitions?" 
  }
];

/**
 * Evidence checklist for research alignment.
 */
export const EVIDENCE_CHECKLIST = [
  {
    question: "Does a navigational layer emerge as a distinct regime?",
    check: "Check structuralSummary.observerEmerged vs parameterProfiles"
  },
  {
    question: "Does expressive expansion arrive without replacing invariant preservation?",
    check: "Check eventLog for inventory vs order changes"
  },
  {
    question: "Do runs plateau in recognizable phases?",
    check: "Check runSummary.plateau_start_step"
  }
];

/**
 * The steps in the research-product loop.
 */
export const RESEARCH_PRODUCT_LOOP = [
  { step: "Claim", text: "The system exhibits structural stratification." },
  { step: "Schema", text: "Define architectureMode and cfIndex." },
  { step: "Simulation", text: "Run 1,000 trials across parameter regimes." },
  { step: "Evidence", text: "Query the archive for cfIndex distribution." }
];
