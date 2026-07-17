import { Codex } from '../../src/logic/codex';
import { Telos } from '../../src/logic/telos';
import { projectDualityUpdate } from '../../src/logic/dualityProjection';

const seeds = Array.from({ length: 64 }, (_, index) => 41000 + index);
const initialSequences = [
  ['🌪️', '🐋', '🎯', '⚓', '💀'],
  ['🐋', '⚓', '🌪️', '💀', '🎯'],
];

let comparisons = 0;
let mismatches = 0;
let maxAbsError = 0;

for (const seed of seeds) {
  for (const initialSequence of initialSequences) {
    const codex = new Codex();
    const telos = new Telos(codex, {
      seed,
      threshold: 0.6,
      observerPersistence: 2,
      architectureMode: 'stratified',
    });
    const result = telos.run(initialSequence, 50);

    for (let index = 1; index < result.history.length; index++) {
      const previous = result.history[index - 1];
      const current = result.history[index];
      const projection = projectDualityUpdate(
        telos,
        previous.duality,
        current.sequence,
      );
      const error = Math.abs(projection.nextDuality - current.duality);
      comparisons++;
      maxAbsError = Math.max(maxAbsError, error);
      if (error > 1e-15) mismatches++;
    }
  }
}

if (mismatches !== 0) {
  throw new Error(
    `Native duality projection mismatch: ${mismatches}/${comparisons}, maxAbsError=${maxAbsError}.`,
  );
}

console.log(
  JSON.stringify(
    {
      comparisons,
      mismatches,
      maxAbsError,
      interpretation:
        'The public pure projection exactly reproduces the engine native duality update on accepted and held trajectories.',
    },
    null,
    2,
  ),
);
