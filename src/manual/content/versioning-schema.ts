
/**
 * Versioning and schema definitions for the Compass protocol.
 */
export const VERSIONING_SCHEMA = {
  lexicon: [
    { version: "compass-v1", status: "Active", date: "2024-03-24", notes: "Initial canonical release." }
  ],
  runSchema: [
    { version: "compass-run-v1", status: "Active", date: "2024-03-24", notes: "Standard JSON contract." },
    { version: "compass-run-v1.1", status: "Draft", date: "2024-04-10", notes: "Extended trace support." }
  ]
};
