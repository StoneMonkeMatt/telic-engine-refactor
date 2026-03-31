
/**
 * Canonical implementation sequence for the Compass data contract.
 */
export const IMPLEMENTATION_SEQUENCE = [
  { 
    step: "1", 
    file: "types.ts", 
    desc: "Canonical Contract",
    details: "The core TypeScript interfaces that define the run record shape."
  },
  { 
    step: "2", 
    file: "json-schema-types.ts", 
    desc: "Schema Types",
    details: "Meta-types used to define the structural contract."
  },
  { 
    step: "3", 
    file: "schema.ts", 
    desc: "JSON Schema",
    details: "The Draft 2020-12 structural definition of the run record."
  },
  { 
    step: "4", 
    file: "validate.ts", 
    desc: "Validation Logic",
    details: "Runtime enforcement of the structural contract."
  }
];

/**
 * Top-level sections of the canonical CompassRunRecord.
 */
export const RUN_RECORD_SECTIONS = [
  "metadata",
  "parameters",
  "parameterProfiles",
  "initialState",
  "metrics",
  "runSummary",
  "structuralSummary",
  "eventLog",
  "debugTrace?"
];
