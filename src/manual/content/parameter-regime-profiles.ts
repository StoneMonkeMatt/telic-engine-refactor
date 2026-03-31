/**
 * Recommended parameter regime profiles for categorical interpretation of simulation runs.
 */
export const PARAMETER_REGIME_PROFILES = {
  evaluation: [
    { id: "balanced", description: "Standard weighting across all telic terms." },
    { id: "info_heavy", description: "High alpha (α) weighting for informational richness." },
    { id: "coherence_heavy", description: "High gamma (γ) weighting for structural harmony." },
    { id: "energy_heavy", description: "High delta (δ) weighting for energetic viability." },
    { id: "complexity_restricted", description: "High beta (β) penalty to resist expansion." }
  ],
  relational: [
    { id: "moderate_binding", description: "Standard binding and coupling values." },
    { id: "tight_coupling", description: "High lambda (λ) for strong interdependence." },
    { id: "loose_binding", description: "Low eta (η) for fluid structural relations." }
  ],
  search: [
    { id: "moderate_exploration", description: "Standard noise and temperature levels." },
    { id: "high_stochasticity", description: "High epsilon (ε) and temperature for broad search." },
    { id: "conservative_convergence", description: "Low noise and temperature for narrow optimization." }
  ],
  threshold: [
    { id: "standard_observer", description: "Standard threshold for emergence detection." },
    { id: "strict_observer", description: "High threshold requiring strong evidence for emergence." },
    { id: "permissive_observer", description: "Low threshold for early registration of signals." }
  ],
  constraint: [
    { id: "canonical_10x60", description: "Max length 10, simulation depth 60." },
    { id: "extended_20x200", description: "Max length 20, simulation depth 200 for deep exploration." },
    { id: "compact_5x30", description: "Max length 5, simulation depth 30 for rapid convergence." }
  ]
};
