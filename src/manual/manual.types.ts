/**
 * Shared TypeScript types and interfaces for the Compass Build Manual subsystem.
 */

export type ManualSourceType = "reference" | "current-engine" | "example" | "speculative";

export interface ManualSectionMeta {
  id: string;
  title: string;
  subtitle?: string;
  sourceType: ManualSourceType;
  isLive: boolean;
  keywords: string[];
  related?: string[];
}

export interface ManualManifestEntry extends ManualSectionMeta {
  file: string;
  summary: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  aliases?: string[];
  forbiddenMeanings?: string[];
  relatedTerms?: string[];
  sourceSectionIds?: string[];
  sourceType: ManualSourceType;
}

export interface DivergenceEntry {
  id: string;
  topic: string;
  referencePosition: string;
  currentEnginePosition: string;
  divergence: string;
  severity: "low" | "medium" | "high" | "critical";
  relatedSections: string[];
  status: "documented" | "planned" | "resolved";
}

export interface ExpertPolicy {
  instructions: string[];
  principles: string[];
  constraints: string[];
}

export interface SymbolRecord {
  glyph: string;
  meaning: string;
  domain: string;
  weight: number;
  opposites?: string[];
}

export interface DomainDefinition {
  id: string;
  name: string;
  category: "foundational" | "scientific" | "technical" | "social" | "expressive" | "formalism" | "applied";
  symbols?: string[];
}

export interface CompassPole {
  pole: string;
  name: string;
  symbols: string[];
  mod97: number;
}

export interface BridgeDefinition {
  from: string;
  to: string;
  symbol: string;
  function: string;
}

export interface ParameterMapping {
  key: string;
  label: string;
  referenceName: string;
  family: string;
  description: string;
  range: string;
  type?: string;
  default?: string;
  effect?: string;
  exposure?: "user-facing" | "internal";
}

export interface MetricMapping {
  key: string;
  label: string;
  referenceName: string;
  family: string;
  description: string;
  formula?: string;
  layer?: string;
  interpretation?: string;
  type?: string;
}
