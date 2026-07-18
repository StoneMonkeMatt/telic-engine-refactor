import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Codex } from '../../src/logic/codex';
import {
  classifyDualityBoundaryTransition,
  DualityBoundaryDirection,
  projectDualityBoundaryTransition,
  projectDualityUpdate,
} from '../../src/logic/dualityProjection';
import { buildProposalFrontier } from '../../src/logic/proposals/frontier';
import { rankProposals } from '../../src/logic/proposals/rank';
import { SeededRandom } from '../../src/logic/random';
import { Telos } from '../../src/logic/telos';

const PROPOSED_BOUNDARY_THRESHOLD = 0.65;

interface CarrierConfig {
  theta: number;
  observerPersistence: number;
}

interface FrozenLesion {
  sequence: string[];
  replicate: number;
  branchSeed: number;
}

interface FrozenCheckpoint {
  sequence: string[];
  lesions: FrozenLesion[];
}

interface FrozenPanel {
  selectorSha256: string;
  frozen: {
    config: CarrierConfig;
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
  threshold: number;
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

interface CandidateAuditAccumulator {
  frontiers: number;
  candidates: number;
  darknessComparisons: number;
  candidateDivergentFrontiers: number;
  bidirectionalFrontiers: number;
  frontiersWithExitOption: number;
  frontiersWithEntryOption: number;
  directions: Record<DualityBoundaryDirection, number>;
  minimumCurrentDuality: number;
  maximumCurrentDuality: number;
  minimumProjectedDuality: number;
  maximumProjectedDuality: number;
}

function stableHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function assertExact(label: string, actual: number, expected: number): void {
  if (!Object.is(actual, expected)) {
    throw new Error(`${label}: expected ${expected}, observed ${actual}.`);
  }
}

function expectedDirection(
  currentDuality: number,
  nextDuality: number,
  threshold: number,
): DualityBoundaryDirection {
  const currentQualifies = currentDuality >= threshold;
  const nextQualifies = nextDuality >= threshold;
  if (currentQualifies === nextQualifies) return 0;
  return nextQualifies ? 1 : -1;
}

function emptyCandidateAudit(): CandidateAuditAccumulator {
  return {
    frontiers: 0,
    candidates: 0,
    darknessComparisons: 0,
    candidateDivergentFrontiers: 0,
    bidirectionalFrontiers: 0,
    frontiersWithExitOption: 0,
    frontiersWithEntryOption: 0,
    directions: { '-1': 0, '0': 0, '1': 0 },
    minimumCurrentDuality: Number.POSITIVE_INFINITY,
    maximumCurrentDuality: Number.NEGATIVE_INFINITY,
    minimumProjectedDuality: Number.POSITIVE_INFINITY,
    maximumProjectedDuality: Number.NEGATIVE_INFINITY,
  };
}

function mergeCandidateAudit(
  target: CandidateAuditAccumulator,
  source: CandidateAuditAccumulator,
): void {
  target.frontiers += source.frontiers;
  target.candidates += source.candidates;
  target.darknessComparisons += source.darknessComparisons;
  target.candidateDivergentFrontiers += source.candidateDivergentFrontiers;
  target.bidirectionalFrontiers += source.bidirectionalFrontiers;
  target.frontiersWithExitOption += source.frontiersWithExitOption;
  target.frontiersWithEntryOption += source.frontiersWithEntryOption;
  target.directions[-1] += source.directions[-1];
  target.directions[0] += source.directions[0];
  target.directions[1] += source.directions[1];
  target.minimumCurrentDuality = Math.min(
    target.minimumCurrentDuality,
    source.minimumCurrentDuality,
  );
  target.maximumCurrentDuality = Math.max(
    target.maximumCurrentDuality,
    source.maximumCurrentDuality,
  );
  target.minimumProjectedDuality = Math.min(
    target.minimumProjectedDuality,
    source.minimumProjectedDuality,
  );
  target.maximumProjectedDuality = Math.max(
    target.maximumProjectedDuality,
    source.maximumProjectedDuality,
  );
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
      'experiments/emerge-ko-001/results/EMERGE-CARRIER-003F-boundary-transition-verification.json',
  );
  const requestedThreshold = Number(
    process.argv[5] ?? PROPOSED_BOUNDARY_THRESHOLD,
  );
  if (!Number.isFinite(requestedThreshold)) {
    throw new Error(`Invalid boundary threshold: ${process.argv[5]}.`);
  }
  const truthTable: Array<{
    current: number;
    next: number;
    expected: DualityBoundaryDirection;
  }> = [
    { current: requestedThreshold - 0.01, next: requestedThreshold, expected: 1 },
    { current: requestedThreshold, next: requestedThreshold - 0.01, expected: -1 },
    { current: requestedThreshold, next: requestedThreshold, expected: 0 },
    { current: requestedThreshold, next: requestedThreshold + 0.01, expected: 0 },
    { current: requestedThreshold - 0.02, next: requestedThreshold - 0.01, expected: 0 },
    { current: requestedThreshold + 0.01, next: requestedThreshold - 0.01, expected: -1 },
  ];
  for (const entry of truthTable) {
    assertExact(
      'boundary truth table',
      classifyDualityBoundaryTransition(
        entry.current,
        entry.next,
        requestedThreshold,
      ),
      entry.expected,
    );
  }

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
  const frozenThreshold = panel.frozen.config.theta;

  const codex = new Codex();
  const telos = new Telos(codex, {
    seed: 0,
    threshold: panel.frozen.config.theta,
    observerPersistence: panel.frozen.config.observerPersistence,
  });
  let algebraComparisons = 0;
  let historyTransitions = 0;
  let maximumAbsoluteError = 0;
  let minimumAlgebraCurrentDuality = Number.POSITIVE_INFINITY;
  let maximumAlgebraCurrentDuality = Number.NEGATIVE_INFINITY;
  let minimumAlgebraProjectedDuality = Number.POSITIVE_INFINITY;
  let maximumAlgebraProjectedDuality = Number.NEGATIVE_INFINITY;
  const algebraDirections: Record<DualityBoundaryDirection, number> = {
    '-1': 0,
    '0': 0,
    '1': 0,
  };
  const candidateAudit = emptyCandidateAudit();
  const capsuleReceipts: Array<Record<string, unknown>> = [];
  const frontierReceipts: Array<Record<string, unknown>> = [];

  for (const pair of panel.frozen.pairs) {
    const carrierPair = capsules.frozen.pairs.find(
      entry => entry.pairId === pair.pairId,
    );
    if (!carrierPair) throw new Error(`Missing capsules for ${pair.pairId}.`);
    const checkpoints = [
      { label: 'nonEmergent', checkpoint: pair.nonEmergent },
      { label: 'emergent', checkpoint: pair.emergent },
    ] as const;
    const sequences = checkpoints.flatMap(({ checkpoint }) => [
      checkpoint.sequence,
      ...checkpoint.lesions.map(lesion => lesion.sequence),
    ]);

    for (const capsule of [carrierPair.m0, carrierPair.m1]) {
      assertExact(
        `${pair.pairId}/${capsule.capsuleId} threshold`,
        capsule.threshold,
        frozenThreshold,
      );
      const history = capsule.boundedDualityHistory;
      if (history.length < 2) {
        throw new Error(`${pair.pairId}/${capsule.capsuleId} lacks two EMA values.`);
      }
      if (!Object.is(history[history.length - 1], capsule.dEma)) {
        throw new Error(`${pair.pairId}/${capsule.capsuleId} does not terminate at dEma.`);
      }

      for (let index = 1; index < history.length; index++) {
        const currentDuality = history[index];
        historyTransitions++;

        for (const sequence of sequences) {
          const boundary = projectDualityBoundaryTransition(
            telos,
            currentDuality,
            sequence,
            requestedThreshold,
          );
          const direct = projectDualityUpdate(telos, currentDuality, sequence);
          const expected = expectedDirection(
            currentDuality,
            direct.nextDuality,
            requestedThreshold,
          );
          assertExact(
            'projected next duality',
            boundary.projection.nextDuality,
            direct.nextDuality,
          );
          assertExact('boundary direction', boundary.direction, expected);
          if (
            boundary.currentQualifies !==
            (currentDuality >= requestedThreshold)
          ) {
            throw new Error('Current boundary classification drifted.');
          }
          if (
            boundary.projectedQualifies !==
            (direct.nextDuality >= requestedThreshold)
          ) {
            throw new Error('Projected boundary classification drifted.');
          }
          maximumAbsoluteError = Math.max(
            maximumAbsoluteError,
            Math.abs(boundary.projection.nextDuality - direct.nextDuality),
          );
          minimumAlgebraCurrentDuality = Math.min(
            minimumAlgebraCurrentDuality,
            currentDuality,
          );
          maximumAlgebraCurrentDuality = Math.max(
            maximumAlgebraCurrentDuality,
            currentDuality,
          );
          minimumAlgebraProjectedDuality = Math.min(
            minimumAlgebraProjectedDuality,
            boundary.projection.nextDuality,
          );
          maximumAlgebraProjectedDuality = Math.max(
            maximumAlgebraProjectedDuality,
            boundary.projection.nextDuality,
          );
          algebraDirections[boundary.direction]++;
          algebraComparisons++;
        }
      }

      const capsuleAudit = emptyCandidateAudit();
      for (const { label, checkpoint } of checkpoints) {
        for (const lesion of checkpoint.lesions) {
          const rng = new SeededRandom(lesion.branchSeed);
          const frontier = buildProposalFrontier(lesion.sequence, 1, {
            codex,
            rng,
            maxSequenceLength: 10,
            architectureMode: 'stratified',
          });
          const ranked = rankProposals(frontier, telos);
          const baselineReceipt = ranked.map(candidate => ({
            type: candidate.type,
            agent: candidate.agent,
            sequence: candidate.sequence,
            score: candidate.score,
            deltaScore: candidate.deltaScore,
          }));
          const directions = new Set<DualityBoundaryDirection>();
          const darkReceipt = ranked.map(candidate => {
            const boundary = projectDualityBoundaryTransition(
              telos,
              capsule.dEma,
              candidate.sequence,
              requestedThreshold,
            );
            const direct = projectDualityUpdate(
              telos,
              capsule.dEma,
              candidate.sequence,
            );
            assertExact(
              'frontier projected next duality',
              boundary.projection.nextDuality,
              direct.nextDuality,
            );
            assertExact(
              'frontier boundary direction',
              boundary.direction,
              expectedDirection(
                capsule.dEma,
                direct.nextDuality,
                requestedThreshold,
              ),
            );
            directions.add(boundary.direction);
            capsuleAudit.directions[boundary.direction]++;
            capsuleAudit.candidates++;
            capsuleAudit.darknessComparisons++;
            capsuleAudit.minimumCurrentDuality = Math.min(
              capsuleAudit.minimumCurrentDuality,
              capsule.dEma,
            );
            capsuleAudit.maximumCurrentDuality = Math.max(
              capsuleAudit.maximumCurrentDuality,
              capsule.dEma,
            );
            capsuleAudit.minimumProjectedDuality = Math.min(
              capsuleAudit.minimumProjectedDuality,
              boundary.projection.nextDuality,
            );
            capsuleAudit.maximumProjectedDuality = Math.max(
              capsuleAudit.maximumProjectedDuality,
              boundary.projection.nextDuality,
            );

            return {
              type: candidate.type,
              agent: candidate.agent,
              sequence: candidate.sequence,
              score: candidate.score,
              deltaScore: candidate.deltaScore,
            };
          });
          if (stableHash(darkReceipt) !== stableHash(baselineReceipt)) {
            throw new Error('Dark boundary metadata changed the ranked frontier.');
          }
          capsuleAudit.frontiers++;
          if (directions.size > 1) capsuleAudit.candidateDivergentFrontiers++;
          if (directions.has(-1) && directions.has(1)) {
            capsuleAudit.bidirectionalFrontiers++;
          }
          if (directions.has(1)) capsuleAudit.frontiersWithExitOption++;
          if (directions.has(-1)) capsuleAudit.frontiersWithEntryOption++;

          frontierReceipts.push({
            pairId: pair.pairId,
            checkpoint: label,
            capsuleId: capsule.capsuleId,
            replicate: lesion.replicate,
            branchSeed: lesion.branchSeed,
            currentDuality: capsule.dEma,
            directionSet: [...directions].sort(),
            baselineRankingSha256: stableHash(baselineReceipt),
          });
        }
      }
      mergeCandidateAudit(candidateAudit, capsuleAudit);
      capsuleReceipts.push({
        pairId: pair.pairId,
        capsuleId: capsule.capsuleId,
        historyLength: history.length,
        historySha256: stableHash(history),
        terminalAnchor: capsule.dEma,
        candidateAudit: capsuleAudit,
      });
    }
  }

  if (candidateAudit.bidirectionalFrontiers !== 0) {
    throw new Error(
      'A single frontier cannot contain both entry and exit directions from one current boundary side.',
    );
  }

  const result = {
    schemaVersion: 'emerge-carrier-003f-boundary-transition-verification-v1',
    experimentId: 'EMERGE-CARRIER-003F-DARK',
    sourceSelectorSha256: panel.selectorSha256,
    capsuleSelectorSha256: capsules.capsuleSelectorSha256,
    requestedThreshold,
    frozenThreshold,
    requestedThresholdMatchesFrozen: Object.is(
      requestedThreshold,
      frozenThreshold,
    ),
    formula: 'b_t(c)=1[D_t<theta<=D_next(c)]-1[D_next(c)<theta<=D_t]',
    scope: {
      darkOnly: true,
      rankingAdjustment: 0,
      projectsObserverDeclaration: false,
      projectsPersistence: false,
      projectsInventoryEligibility: false,
    },
    truthTable: {
      comparisons: truthTable.length,
      exact: true,
    },
    algebra: {
      comparisons: algebraComparisons,
      historyTransitions,
      maximumAbsoluteError,
      exact: maximumAbsoluteError === 0,
      directions: algebraDirections,
      dualityRange: {
        current: [minimumAlgebraCurrentDuality, maximumAlgebraCurrentDuality],
        projected: [
          minimumAlgebraProjectedDuality,
          maximumAlgebraProjectedDuality,
        ],
      },
    },
    candidateControlDensity: {
      ...candidateAudit,
      divergentFrontierFraction:
        candidateAudit.candidateDivergentFrontiers /
        Math.max(candidateAudit.frontiers, 1),
      crossingCandidateFraction:
        (candidateAudit.directions[-1] + candidateAudit.directions[1]) /
        Math.max(candidateAudit.candidates, 1),
      interpretation:
        'Within one frontier the current boundary side is fixed, so useful candidate divergence is crossing versus no crossing; simultaneous +1 and -1 is impossible by construction.',
    },
    darkness: {
      comparisons: candidateAudit.darknessComparisons,
      rankedFrontierMismatches: 0,
      passed: true,
    },
    capsuleReceipts,
    frontierReceiptSha256: stableHash(frontierReceipts),
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(result, null, 2));
}

main();
