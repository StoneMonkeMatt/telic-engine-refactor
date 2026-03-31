import { SymbolDatabase, Symbol } from '../types';
import { LIBRARY } from './library';

export class Codex {
  public symbols: SymbolDatabase;
  private byGlyph: Map<string, Symbol>;

  constructor(customDb?: SymbolDatabase) {
    this.symbols = customDb || LIBRARY;
    this.byGlyph = new Map(this.symbols.symbols.map(s => [s.glyph, s]));
  }

  public getSymbol(glyph: string): Symbol | undefined {
    return this.byGlyph.get(glyph);
  }

  public isOpposite(a: string, b: string): boolean {
    const symA = this.getSymbol(a);
    const symB = this.getSymbol(b);
    if (!symA || !symB) return false;
    return symA.opposites.includes(b) || symB.opposites.includes(a);
  }

  public combine(a: string, b: string): string {
    const symA = this.getSymbol(a);
    const symB = this.getSymbol(b);

    // Special Case: The Void and Light Awareness
    if ((a === "🕳️" && b === "🕯️") || (a === "🕯️" && b === "🕳️")) {
      return "👁️";
    }

    // Dominance of the Void
    if (a === "🕳️" || b === "🕳️") return "🕳️";
    // Persistence of Light
    if (a === "🕯️" || b === "🕯️") return "🕯️";

    if (!symA || !symB) return a || b;

    const da = symA.domain;
    const db = symB.domain;

    // Domain coherence: stronger weight wins
    if (da === db) {
      return symA.weight >= symB.weight ? a : b;
    }

    // Cross-domain bridging
    for (const bridge of this.symbols.cross_domain_bridges) {
      if ((bridge.from === da && bridge.to === db) || (bridge.from === db && bridge.to === da)) {
        return bridge.symbol;
      }
    }

    // Default: weight-based dominance
    return symA.weight >= symB.weight ? a : b;
  }

  public compress(seq: string[], maxSteps: number = 50): string[][] {
    const steps: string[][] = [[...seq]];
    let current = [...seq];

    for (let s = 0; s < maxSteps; s++) {
      if (current.length <= 1) break;

      const next: string[] = [];
      let i = 0;
      while (i < current.length - 1) {
        next.push(this.combine(current[i], current[i + 1]));
        i += 2;
      }
      if (i < current.length) {
        next.push(current[i]);
      }

      // Stability check
      if (this.isEqual(next, current)) break;

      current = next;
      steps.push([...current]);

      // Convergence to terminal states
      const unique = new Set(current);
      if (unique.size === 1 && (unique.has("🕯️") || unique.has("🕳️"))) break;
    }
    return steps;
  }

  private isEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  public mod97(seq: string[]): number {
    if (seq.length === 0) return 0;
    const total = seq.reduce((acc, glyph, idx) => {
      const sym = this.getSymbol(glyph);
      const weight = sym?.weight || 0;
      // Use golden ratio for harmonic weighting
      const posHarmonic = Math.pow(idx + 1, 1.618);
      return acc + (weight * 17) + (posHarmonic * 7);
    }, 0);
    
    return Math.floor(total) % 97;
  }

  public adversarialTest(seq: string[]): boolean {
    const testSeq = [...seq, "🕳️"];
    // Run until stable
    const compressionSteps = this.compress(testSeq, 50);
    const final = compressionSteps[compressionSteps.length - 1];
    // If the Void persists, the sequence is not resilient
    return !final.includes("🕳️");
  }

  public findCompassMatch(seq: string[]): string {
    const m97 = this.mod97(seq);
    let bestMatch = "None";
    let minDiff = 10; // Slightly more relaxed threshold

    for (const [dir, config] of Object.entries(this.symbols.compass)) {
      if (config.mod97 !== undefined) {
        const diff = Math.abs(config.mod97 - m97);
        if (diff < minDiff) {
          minDiff = diff;
          bestMatch = dir;
        }
      }
    }
    return bestMatch;
  }

  public resilience(seq: string[]): number {
    if (seq.length === 0) return 0;
    
    const lightCount = seq.filter(s => s === "🕯️").length;
    const totalWeight = seq.reduce((acc, s) => acc + (this.getSymbol(s)?.weight || 0), 0);
    
    // Base resilience from structural weight
    const baseResilience = totalWeight / (seq.length * 100);
    // Light (🕯️) provides a significant resilience boost
    const lightBoost = (lightCount * 0.2); 
    
    return Math.max(0, Math.min(1.0, baseResilience + lightBoost));
  }
}
