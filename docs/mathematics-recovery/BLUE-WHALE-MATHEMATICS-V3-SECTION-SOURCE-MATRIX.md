# Blue Whale Mathematics V3 — Section-to-Source Matrix

Status: verified core implementation map  
Established: 18 July 2026

This matrix links the most consequential executable mathematics in Part II of the recovered V3 corpus to primary repository sources. A source match verifies implementation lineage; it does not automatically prove every documentary interpretation or status claim surrounding the equation.

## Core sequence-engine map

| V3 section | Mathematical object | Primary implementation | Earliest verified commit in this repository | Verification boundary |
| --- | --- | --- | --- | --- |
| §31.6.5–§31.6.5.1 | Four-term sequence telic functional and coefficient bindings | `src/logic/telos.ts` — `computeTelicScore`, `telicScore` | `ac3539bc053084324699899a4f111e0f0cb4014a` | Current source retains the weighted score and hardcoded interaction architecture; predecessor `blue-whale-sim` is verified separately |
| §31.6.5.2 | Unigram/bigram information blend | `src/logic/telos.ts` — `information` | `ac3539bc053084324699899a4f111e0f0cb4014a` | Empirical symbol and adjacent-pair identity entropies are executable source, not conditional transition entropy |
| §31.6.5.3 | Coherence generations | `src/logic/telos.ts` — `coherence` | `ac3539bc053084324699899a4f111e0f0cb4014a` | Current source verifies the active generation only; earlier and V4 variants require their cited historical repositories/blobs |
| §31.6.7 | Telic curvature | `src/logic/telos.ts` — `computeTelicCurvature` | `ac3539bc053084324699899a4f111e0f0cb4014a` | This is coherence-modulated telic-score velocity, not second derivative of smoothed duality |
| §31.6.9 | Proposal frontier | `src/logic/proposals/agents.ts`, `frontier.ts` | modular boundary `2f18052809d0cf1f2d470f8666c657c5b1874ada` | Frontier is generated in order and is not deduplicated before ranking |
| §31.6.9 | Candidate evaluation and shaped delta | `src/logic/proposals/rank.ts` — `rankProposals` | modular boundary `2f18052809d0cf1f2d470f8666c657c5b1874ada` | Raw score, raw duality, coherence, insertion penalty, identity bonus, and swap bonus are directly visible |
| §31.6.9 | Winner restriction and tie resolution | `src/logic/proposals/select.ts`, `src/logic/selection/tiebreak.ts` | current selector boundary `cec3f7d02ab8aa7ecab34d4d5eb50deb1dfb17c3` | Winner membership is restricted to exact maximum raw score before tie resolution |
| §31.6.9 | Admission | `src/logic/selection/eligibility.ts` — `checkEligibility` | helper introduced by `35675957f10d6c7c7f3818cf05c10ced8e2a775f` | Uses shaped `deltaScore`, effective denominator `currentTemp + 1e-6`, and rejects identity proposals |
| §31.6.12 | Raw and smoothed duality | `src/logic/telos.ts` — `computeRawDuality`, `duality`, `evolveStep`, `run` | `ac3539bc053084324699899a4f111e0f0cb4014a` | Raw product, clamp, EMA update, history construction, persistence, and observer predicate must be distinguished |
| §31.6.12A | Diversity offset and clamp | `src/logic/telos.ts` — `computeRawDuality` | `ac3539bc053084324699899a4f111e0f0cb4014a` | Verifies the executable `0.01` offset and clamp consumer; the shorter uploaded copy ends here, while the complete recovered V3 continues |

## Codex and invariant map

| V3 section | Mathematical object | Primary implementation | Verification boundary |
| --- | --- | --- | --- |
| §6 | Engine mod97 selector | `src/logic/codex.ts` — `mod97`, `findCompassMatch` | Engine weight–position hash must remain separate from the ontology rolling hash described elsewhere in the corpus |
| §6.7 and symbol-combination closure | Needle/Action and symbol combination | `src/logic/codex.ts` — `combine`, `compress` | Verifies current combination and repeated pair-halving mechanics; does not close the open Needle–Action algebra by itself |
| §7 | Symbol library algorithms | `src/logic/library.ts` and the loaded symbol database | This repository exposes runtime ontology structures; corpus-wide row counts and provenance require the cited data sources |
| §15 and adversarial closure | Sequence resilience probe | `src/logic/codex.ts` — `adversarialTest`, `resilience` | Diagnostic behaviour is executable; broad resilience interpretation remains bounded by the corpus warning |

## Verified predecessor systems

| Repository | Commit | Source | Provenance contribution |
| --- | --- | --- | --- |
| `StoneMonkeMatt/blue-whale-sim` | `d568dcab12a2efecbb577f54961e91b75bfe4908` | `src/logic/telos.ts` | Earliest publicly verified executable `0.2 * I * Phi`, raw energy, linear complexity, `lambda=0.618` feedback, and cooled admission schedule |
| `StoneMonkeMatt/telic-engine` | `966493b72a1219415f61cab2b050387f9f09fdaa` | `src/simulation/engine.ts` | Distinct multi-agent four-term functional and the historically preserved, identically-zero `MUTUAL_INFO` implementation |

## Experimental descendants

The `experiments/emerge-ko-001/` bench and its separate `MATHEMATICS.md` ledger test candidate controls built around smoothed-duality history. Those files are downstream experimental evidence rather than source evidence for the historical V3 corpus. In particular, `src/logic/dualityProjection.ts` contains later projection utilities created for Carrier experiments and is dated separately from the recovered V3 implementation lineage.

## Remaining source gaps

- Generation-C/V4 coherence source at commit `8c39278470353d8400aa7962a6bb608dd1eac6b8` and blob `853478e505f5933202445ce26953fa1aefc8a2dd`.
- The documentary nonlinear-coupling proposal at `blue-whale` commit `d97fa9e23`.
- CH20 draft commits `4a5b0b4` and `69a826967`, plus their cited formula-tree source.
- `codex-v9.1.ts` and the wider ontology data required for corpus-wide symbol and Compass claims.
- The complete continuation is now present under `docs/mathematics-lineage/`; remaining gaps concern its cited external sources rather than the V3 document tail.
