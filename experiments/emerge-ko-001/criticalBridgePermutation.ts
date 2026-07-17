import { Codex } from '../../src/logic/codex';
import { SeededRandom } from '../../src/logic/random';

export interface PerturbationReceipt {
  operator: 'critical_bridge_permutation';
  rho: number;
  attempts: number;
  preBridgeRate: number;
  postBridgeRate: number;
  observedReduction: number;
  targetedBridgeIndices: number[];
  targetedBridgePairs: string[];
  inventoryPreserved: boolean;
  lengthPreserved: boolean;
  energyPreserved: boolean;
  unigramEntropyPreserved: boolean;
  observerCountPreserved: boolean;
  perturbationSeed: number;
}

const OBSERVER_TOKENS = new Set(['👁️', '🧠', 'qualia', '🌟']);

function domainPairKey(a: string, b: string): string {
  return [a, b].sort().join('::');
}

export function isRecognisedBridge(codex: Codex, a: string, b: string): boolean {
  const sa = codex.getSymbol(a);
  const sb = codex.getSymbol(b);
  if (!sa || !sb || sa.domain === sb.domain) return false;
  const key = domainPairKey(sa.domain, sb.domain);
  return codex.symbols.cross_domain_bridges.some(
    bridge => domainPairKey(bridge.from, bridge.to) === key,
  );
}

export function bridgeIndices(codex: Codex, sequence: string[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    if (isRecognisedBridge(codex, sequence[i], sequence[i + 1])) result.push(i);
  }
  return result;
}

export function bridgeRate(codex: Codex, sequence: string[]): number {
  if (sequence.length < 2) return 0;
  return bridgeIndices(codex, sequence).length / (sequence.length - 1);
}

export function bridgeSignatures(codex: Codex, sequence: string[]): string[] {
  const signatures: string[] = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    if (!isRecognisedBridge(codex, sequence[i], sequence[i + 1])) continue;
    signatures.push(`${sequence[i]}→${sequence[i + 1]}`);
  }
  return signatures;
}

export function multisetRecall(reference: string[], candidate: string[]): number {
  if (reference.length === 0) return 1;
  const counts = new Map<string, number>();
  for (const key of candidate) counts.set(key, (counts.get(key) ?? 0) + 1);
  let overlap = 0;
  for (const key of reference) {
    const remaining = counts.get(key) ?? 0;
    if (remaining > 0) {
      overlap++;
      counts.set(key, remaining - 1);
    }
  }
  return overlap / reference.length;
}

function observerCount(sequence: string[]): number {
  return sequence.reduce((n, symbol) => n + Number(OBSERVER_TOKENS.has(symbol)), 0);
}

function multisetKey(sequence: string[]): string {
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join('|');
}

function meanWeight(codex: Codex, sequence: string[]): number {
  if (sequence.length === 0) return 0;
  return sequence.reduce((sum, symbol) => sum + (codex.getSymbol(symbol)?.weight ?? 0), 0) / sequence.length;
}

function unigramEntropy(sequence: string[]): number {
  if (sequence.length === 0) return 0;
  const counts = new Map<string, number>();
  for (const symbol of sequence) counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
  let entropy = 0;
  for (const count of counts.values()) {
    const p = count / sequence.length;
    entropy -= p * Math.log(p + 1e-9);
  }
  return entropy;
}

function shuffle<T>(items: T[], rng: SeededRandom): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function calculateBridgeCriticality(
  codex: Codex,
  sequence: string[],
): Map<number, number> {
  const active = bridgeIndices(codex, sequence);
  const criticality = new Map<number, number>();
  for (const index of active) {
    const left = sequence[index];
    const right = sequence[index + 1];
    const leftFrequency = sequence.filter(symbol => symbol === left).length;
    const rightFrequency = sequence.filter(symbol => symbol === right).length;
    const uniqueness = 0.5 * (1 / leftFrequency + 1 / rightFrequency);
    const coherenceContribution = 0.8;
    const reach = active.filter(i => Math.abs(i - index) <= 2).length / Math.max(active.length, 1);
    criticality.set(index, 0.4 * uniqueness + 0.3 * coherenceContribution + 0.3 * reach);
  }
  return criticality;
}

export function generateCriticalBridgePermutation(
  codex: Codex,
  sequence: string[],
  rho: number,
  seed: number,
  maxAttempts = 10_000,
): { sequence: string[]; receipt: PerturbationReceipt } {
  if (!(rho > 0 && rho <= 1)) throw new RangeError('rho must lie in (0, 1].');
  if (sequence.length < 2) throw new Error('Sequence must contain at least two symbols.');

  const criticality = calculateBridgeCriticality(codex, sequence);
  const active = [...criticality.keys()];
  if (active.length === 0) throw new Error('Cannot perturb: no active cross-domain bridges.');

  const targetCount = Math.max(1, Math.ceil(rho * active.length));
  const targetedIndices = [...active]
    .sort((a, b) => (criticality.get(b) ?? 0) - (criticality.get(a) ?? 0) || a - b)
    .slice(0, targetCount);
  const targetedPairs = new Set(targetedIndices.map(i => `${sequence[i]}→${sequence[i + 1]}`));

  const rng = new SeededRandom(seed);
  const preRate = bridgeRate(codex, sequence);
  const originalMultiset = multisetKey(sequence);
  const originalObserverCount = observerCount(sequence);
  const originalEnergy = meanWeight(codex, sequence);
  const originalEntropy = unigramEntropy(sequence);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const perturbed = shuffle(sequence, rng);
    const signatures = new Set(
      Array.from({ length: perturbed.length - 1 }, (_, i) => `${perturbed[i]}→${perturbed[i + 1]}`),
    );
    if ([...targetedPairs].some(pair => signatures.has(pair))) continue;

    const postRate = bridgeRate(codex, perturbed);
    const observedReduction = preRate === 0 ? 0 : (preRate - postRate) / preRate;
    if (observedReduction + 1e-12 < rho) continue;

    const inventoryPreserved = multisetKey(perturbed) === originalMultiset;
    const lengthPreserved = perturbed.length === sequence.length;
    const energyPreserved = Math.abs(meanWeight(codex, perturbed) - originalEnergy) < 1e-12;
    const unigramEntropyPreserved = Math.abs(unigramEntropy(perturbed) - originalEntropy) < 1e-12;
    const observerCountPreserved = observerCount(perturbed) === originalObserverCount;

    if (!(inventoryPreserved && lengthPreserved && energyPreserved && unigramEntropyPreserved && observerCountPreserved)) {
      continue;
    }

    return {
      sequence: perturbed,
      receipt: {
        operator: 'critical_bridge_permutation',
        rho,
        attempts: attempt,
        preBridgeRate: preRate,
        postBridgeRate: postRate,
        observedReduction,
        targetedBridgeIndices: targetedIndices,
        targetedBridgePairs: [...targetedPairs],
        inventoryPreserved,
        lengthPreserved,
        energyPreserved,
        unigramEntropyPreserved,
        observerCountPreserved,
        perturbationSeed: seed,
      },
    };
  }

  throw new Error(`No valid constrained permutation found within ${maxAttempts} attempts.`);
}
