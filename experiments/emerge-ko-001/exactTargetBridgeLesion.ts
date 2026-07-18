import { Codex } from '../../src/logic/codex';
import { SeededRandom } from '../../src/logic/random';
import {
  bridgeSignatures,
  calculateBridgeCriticality,
} from './criticalBridgePermutation';

export interface ExactTargetBridgeLesionReceipt {
  operator: 'exact_target_bridge_permutation';
  targetBridgeCount: number;
  targetedBridgeIndices: number[];
  targetedBridgeSignatures: string[];
  attempts: number;
  perturbationSeed: number;
  preReferenceBridgeCount: number;
  postReferenceBridgeCount: number;
  destroyedReferenceBridgeCount: number;
  addedNovelBridgeSignatures: string[];
  inventoryPreserved: boolean;
  lengthPreserved: boolean;
  observerCountPreserved: boolean;
  exactReferenceDamageVerified: boolean;
}

export interface ExactTargetBridgeLesion {
  sequence: string[];
  receipt: ExactTargetBridgeLesionReceipt;
}

const OBSERVER_TOKENS = new Set(['👁️', '🧠', 'qualia', '🌟']);

function countValues(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

function multisetKey(values: string[]): string {
  return [...countValues(values).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([value, count]) => `${value}:${count}`)
    .join('|');
}

function observerCount(sequence: string[]): number {
  return sequence.reduce((count, symbol) => count + Number(OBSERVER_TOKENS.has(symbol)), 0);
}

function shuffle<T>(values: T[], rng: SeededRandom): T[] {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(rng.next() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function selectTargetBridgeOccurrences(
  codex: Codex,
  sequence: string[],
  targetBridgeCount: number,
): { indices: number[]; signatures: string[] } {
  const criticality = calculateBridgeCriticality(codex, sequence);
  const signatureCounts = countValues(bridgeSignatures(codex, sequence));
  const sortedIndices = [...criticality.keys()].sort(
    (a, b) =>
      (criticality.get(b) ?? 0) - (criticality.get(a) ?? 0) || a - b,
  );

  const indices: number[] = [];
  const signatures: string[] = [];
  for (const index of sortedIndices) {
    const signature = `${sequence[index]}→${sequence[index + 1]}`;
    if ((signatureCounts.get(signature) ?? 0) !== 1) continue;
    indices.push(index);
    signatures.push(signature);
    if (indices.length === targetBridgeCount) break;
  }

  if (indices.length < targetBridgeCount) {
    throw new Error(
      `Checkpoint has only ${indices.length} uniquely identifiable bridges; ${targetBridgeCount} are required.`,
    );
  }

  return { indices, signatures };
}

function exactReferenceDamage(
  original: string[],
  post: string[],
  targeted: string[],
): boolean {
  const originalCounts = countValues(original);
  const postCounts = countValues(post);
  const targetCounts = countValues(targeted);

  for (const [signature, originalCount] of originalCounts) {
    const requiredPostCount = originalCount - (targetCounts.get(signature) ?? 0);
    if ((postCounts.get(signature) ?? 0) !== requiredPostCount) return false;
  }

  return true;
}

export function generateExactTargetBridgeLesion(
  codex: Codex,
  sequence: string[],
  targetedBridgeSignatures: string[],
  targetedBridgeIndices: number[],
  seed: number,
  maxAttempts: number,
): ExactTargetBridgeLesion {
  if (targetedBridgeSignatures.length === 0) {
    throw new Error('At least one target bridge is required.');
  }
  if (targetedBridgeSignatures.length !== targetedBridgeIndices.length) {
    throw new Error('Target bridge signatures and indices must have equal length.');
  }

  const originalReferenceBridges = bridgeSignatures(codex, sequence);
  const originalInventory = multisetKey(sequence);
  const originalObserverCount = observerCount(sequence);
  const originalReferenceSet = new Set(originalReferenceBridges);
  const rng = new SeededRandom(seed);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const perturbed = shuffle(sequence, rng);
    const postReferenceBridges = bridgeSignatures(codex, perturbed);
    if (!exactReferenceDamage(originalReferenceBridges, postReferenceBridges, targetedBridgeSignatures)) {
      continue;
    }

    const inventoryPreserved = multisetKey(perturbed) === originalInventory;
    const lengthPreserved = perturbed.length === sequence.length;
    const observerCountPreserved = observerCount(perturbed) === originalObserverCount;
    const addedNovelBridgeSignatures = postReferenceBridges.filter(
      signature => !originalReferenceSet.has(signature),
    );

    if (!(inventoryPreserved && lengthPreserved && observerCountPreserved)) continue;

    return {
      sequence: perturbed,
      receipt: {
        operator: 'exact_target_bridge_permutation',
        targetBridgeCount: targetedBridgeSignatures.length,
        targetedBridgeIndices: [...targetedBridgeIndices],
        targetedBridgeSignatures: [...targetedBridgeSignatures],
        attempts: attempt,
        perturbationSeed: seed,
        preReferenceBridgeCount: originalReferenceBridges.length,
        postReferenceBridgeCount: postReferenceBridges.filter(signature => originalReferenceSet.has(signature)).length,
        destroyedReferenceBridgeCount: targetedBridgeSignatures.length,
        addedNovelBridgeSignatures,
        inventoryPreserved,
        lengthPreserved,
        observerCountPreserved,
        exactReferenceDamageVerified: true,
      },
    };
  }

  throw new Error(
    `No exact ${targetedBridgeSignatures.length}-bridge lesion found within ${maxAttempts} attempts.`,
  );
}
