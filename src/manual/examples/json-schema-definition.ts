export const JSON_SCHEMA_DEFINITION = `export const compassRunRecordSchema: JsonSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://blue-whale.app/schemas/compass-run-v1.json",
  "title": "CompassRunRecord",
  "type": "object",
  "required": [
    "metadata", "parameters", "initialState",
    "metrics", "structuralSummary", "eventLog"
  ],
  "properties": {
    "metadata": {
      "type": "object",
      "required": ["schemaVersion", "runId", "timestamp", "seed"],
      "properties": {
        "schemaVersion": { "enum": ["compass-run-v1", "compass-run-v1.1"] },
        "runId": { "type": "string", "minLength": 1 },
        "timestamp": { "type": "string", "format": "date-time" },
        "seed": { "anyOf": [{ "type": "string" }, { "type": "number" }] }
      }
    },
    "parameterProfiles": {
      "type": "object",
      "properties": {
        "evaluationProfile": { "type": "string" },
        "relationalProfile": { "type": "string" },
        "searchProfile": { "type": "string" },
        "thresholdProfile": { "type": "string" },
        "constraintProfile": { "type": "string" }
      }
    },
    "initialState": {
      "type": "object",
      "required": ["initialSequence", "initialLength"],
      "properties": {
        "initialSequence": { "type": "array", "items": { "type": "string" } },
        "initialLength": { "type": "integer" },
        "initialNarrative": { "type": "string" },
        "distilledNarrative": { "type": "string" },
        "initialMetrics": { "type": "object" }
      }
    },
    "metrics": {
      "type": "object",
      "properties": {
        "telic_score": { "type": "number" },
        "resilience": { "type": "number" },
        "telic_curvature": { "type": "number" },
        "path_integral": { "type": "number" },
        "mod97_value": { "type": "integer" },
        "compass_orientation": { "type": "string" },
        "consensus_score": { "type": "number" },
        "adversarial_status": { "type": "string" }
      }
    },
    "structuralSummary": {
      "type": "object",
      "required": ["finalSequence", "finalLength", "cfIndex"],
      "properties": {
        "finalSequence": { "type": "array", "items": { "type": "string" } },
        "finalLength": { "type": "integer" },
        "cfIndex": { "type": "number" },
        "observerEmerged": { "type": "boolean" },
        "bridgeEventCount": { "type": "integer" }
      }
    },
    "eventLog": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["type", "step"],
        "properties": {
          "type": { "type": "string" },
          "step": { "type": "integer" },
          "score": { "type": "number" },
          "sequence": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
};`;
