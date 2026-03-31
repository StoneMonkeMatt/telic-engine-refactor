/**
 * Rules for calculating domain connectivity and coherence in Telos v0.9.
 */
export const DOMAIN_CONNECTIVITY_RULES = {
  intraDomainReward: "High reward for symbols within the same domain.",
  interDomainReward: "Reward mediated by the 51 cross-domain bridges.",
  coherenceWeighting: {
    inventoryCoherence: 0.4,
    transitionCoherence: 0.6
  }
};
