/**
 * Implementation status of compass symbol lists in Telos v0.9.
 */
export const COMPASS_SYMBOL_LISTS_STATUS = {
  status: "Partially Implemented",
  description: "Each compass pole includes a concrete list of symbols (e.g., North includes 🐋, 🌿, ⚓). However, the current findCompassMatch logic relies exclusively on the mod97 value and does not verify if the sequence content matches these specific symbol sets."
};
