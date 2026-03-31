/**
 * Defines the active symbol set and implementation notes for Telos v0.9 simulation.
 */
export const ACTIVE_SYMBOL_SET_CONFIG = {
  totalSymbolCount: 210,
  weightThreshold: 20,
  prioritizedDomains: ["Computer_Science", "Logic", "Mathematics"],
  implementationNote: "Symbols with weight < 20 or those in highly specialized domains (e.g., Footwear, Sports_Equipment) may have lower emergence rates in general-purpose simulations."
};
