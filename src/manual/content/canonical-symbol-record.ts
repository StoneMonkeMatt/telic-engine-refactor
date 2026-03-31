/**
 * Defines the canonical structure of a symbol record in the Compass ontology.
 */
export const CANONICAL_SYMBOL_RECORD_FIELDS = [
  {
    field: "glyph",
    description: "The visual representation (emoji or character)",
    type: "string"
  },
  {
    field: "meaning",
    description: "The conceptual definition or name of the symbol",
    type: "string"
  },
  {
    field: "domain",
    description: "The primary ontological domain the symbol belongs to",
    type: "string"
  },
  {
    field: "weight",
    description: "The telic significance of the symbol (range 0-100)",
    type: "number"
  },
  {
    field: "opposites",
    description: "Related symbols with inverse or antagonistic meaning",
    type: "string[]",
    optional: true
  }
];
