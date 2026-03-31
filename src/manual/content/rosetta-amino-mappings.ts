import { SymbolRecord } from "../manual.types";

/**
 * Rosetta domain mappings between symbols and amino acid residues/protein structures.
 */
export const ROSETTA_AMINO_MAPPINGS: SymbolRecord[] = [
  { glyph: '🔷', meaning: 'Alanine A', domain: 'Rosetta', weight: 50 },
  { glyph: '🔗', meaning: 'Cysteine C', domain: 'Rosetta', weight: 60 },
  { glyph: '🎪', meaning: 'Glutamate E', domain: 'Rosetta', weight: 55 },
  { glyph: '🔶', meaning: 'Phenylalanine F', domain: 'Rosetta', weight: 65 },
  { glyph: '🔸', meaning: 'Isoleucine I', domain: 'Rosetta', weight: 55 },
  { glyph: '➕', meaning: 'Lysine K', domain: 'Rosetta', weight: 60 },
  { glyph: '🔺', meaning: 'Leucine L', domain: 'Rosetta', weight: 55 },
  { glyph: '💎', meaning: 'Methionine M', domain: 'Rosetta', weight: 70 },
  { glyph: '🧿', meaning: 'N-Terminus', domain: 'Rosetta', weight: 80 },
  { glyph: '🎭', meaning: 'C-Terminus', domain: 'Rosetta', weight: 80 },
  { glyph: '⚗️', meaning: 'Active Site', domain: 'Rosetta', weight: 95 },
  { glyph: '🌫️', meaning: 'Disordered Region', domain: 'Rosetta', weight: 40 }
];
