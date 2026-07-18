import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';
import {
  projectDualityAcceleration,
  projectDualityUpdate,
} from '../../src/logic/dualityProjection';

interface FrozenLesion {
  sequence: string[];
}

interface FrozenCheckpoint {
  sequence: string[];
  lesions: FrozenLesion[];
}

interface FrozenPanel {
  selectorSha256: string;
  frozen: {
    pairs: Array<{
      pairId: string;
      nonEmergent: FrozenCheckpoint;
      emergent: FrozenCheckpoint;
    }>;
  };
}

interface MacroHistoryCapsule {
  capsuleId: 'M0-unlatched' | 'M1-latched';
  dEma: number;
  boundedDualityHistory: number[];
}

interface FrozenCarrierCapsules {
  capsuleSelectorSha256: string;
  frozen: {
    sourceSelectorSha256: string;
    pairs: Array<{
      pairId: string;
      m0: MacroHistoryCapsule;
      m1: MacroHistoryCapsule;
    }>;
  };
}

function stableHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function assertExact(label: string, actual: number, expected: number): void {
  if (!Object.is(actual, expected)) {
    throw new Error(`${label}: expected ${expected}, observed ${actual}.`);
  }
}

function main(): void {
  const panelPath = resolve(
    process.argv[2] ??
      'experiments/emerge-ko-001/results/EMERGE-KO-001-v2.2-panel.json',
  );
  const capsulesPath = resolve(
    process.argv[3] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-002-capsules.json',
  );
  const outputPath = resolve(
    process.argv[4] ??
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003E-acceleration-projection-verification.json',
  );

  const panel = JSON.parse(readFileSync(panelPath, 'utf8')) as FrozenPanel;
  const capsules = JSON.parse(
    readFileSync(capsulesPath, 'utf8'),
  ) as FrozenCarrierCapsules;
  if (stableHash(panel.frozen) !== panel.selectorSha256) {
    throw new Error('Frozen V2.2 selector receipt drifted.');
  }
  if (stableHash(capsules.frozen) !== capsules.capsuleSelectorSha256) {
    throw new Error('Frozen capsule selector receipt drifted.');
  }
  if (capsules.frozen.sourceSelectorSha256 !== panel.selectorSha256) {
    throw new Error('Frozen panel and capsule selectors do not match.');
  }

  const codex = new Codex();
  const telos = new Telos(codex, {
    seed: 0,
    threshold: 0.6,
    observerPersistence: 2,
  });
  let comparisons = 0;
  let historyTransitions = 0;
  let maximumAbsoluteError = 0;
  const capsuleReceipts: Array<Record<string, unknown>> = [];

  for (const pair of panel.frozen.pairs) {
    const carrierPair = capsules.frozen.pairs.find(
      entry => entry.pairId === pair.pairId,
    );
    if (!carrierPair) throw new Error(`Missing capsules for ${pair.pairId}.`);
    const sequences = [
      pair.nonEmergent.sequence,
      ...pair.nonEmergent.lesions.map(lesion => lesion.sequence),
      pair.emergent.sequence,
      ...pair.emergent.lesions.map(lesion => lesion.sequence),
    ];

    for (const capsule of [carrierPair.m0, carrierPair.m1]) {
      const history = capsule.boundedDualityHistory;
      if (history.length < 2) {
        throw new Error(`${pair.pairId}/${capsule.capsuleId} lacks two EMA values.`);
      }
      if (!Object.is(history[history.length - 1], capsule.dEma)) {
        throw new Error(`${pair.pairId}/${capsule.capsuleId} does not terminate at dEma.`);
      }

      for (let index = 1; index < history.length; index++) {
        const currentDuality = history[index];
        const previousDuality = history[index - 1];
        const previousVelocity = currentDuality - previousDuality;
        historyTransitions++;

        for (const sequence of sequences) {
          const acceleration = projectDualityAcceleration(
            telos,
            currentDuality,
            previousDuality,
            sequence,
          );
          const direct = projectDualityUpdate(telos, currentDuality, sequence);
          assertExact(
            'projected next duality',
            acceleration.projection.nextDuality,
            direct.nextDuality,
          );
          assertExact(
            'projected velocity',
            acceleration.projection.velocity,
            direct.velocity,
          );
          assertExact(
            'previous velocity',
            acceleration.previousVelocity,
            previousVelocity,
          );
          assertExact(
            'candidate acceleration',
            acceleration.acceleration,
            direct.velocity - previousVelocity,
          );
          maximumAbsoluteError = Math.max(
            maximumAbsoluteError,
            Math.abs(
              acceleration.acceleration -
                (direct.velocity - previousVelocity),
            ),
          );
          comparisons++;
        }
      }

      capsuleReceipts.push({
        pairId: pair.pairId,
        capsuleId: capsule.capsuleId,
        historyLength: history.length,
        historySha256: stableHash(history),
        slopeHistorySha256: stableHash(
          history.slice(1).map((value, index) => value - history[index]),
        ),
        terminalAnchor: capsule.dEma,
      });
    }
  }

  const result = {
    schemaVersion: 'emerge-carrier-003e-acceleration-verification-v1',
    experimentId: 'EMERGE-CARRIER-003E',
    sourceSelectorSha256: panel.selectorSha256,
    capsuleSelectorSha256: capsules.capsuleSelectorSha256,
    formula: 'a_t(c)=[D_next(c)-D_t]-[D_t-D_(t-1)]',
    comparisons,
    historyTransitions,
    maximumAbsoluteError,
    exact: maximumAbsoluteError === 0,
    capsuleReceipts,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(result, null, 2));
}

main();
