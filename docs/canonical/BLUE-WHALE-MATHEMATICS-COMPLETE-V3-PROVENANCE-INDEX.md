# Blue Whale Mathematics V3 — Provenance and Association Index

Status: active recovery audit — public lineages partially verified
Opened: 18 July 2026  
Recovered source: `BLUE-WHALE-MATHEMATICS-COMPLETE-V3-17JUL2026-SEALED-CANONICAL.md`  
Recovery commit: `76871da`

This index records what is associated with the recovered system-wide mathematics document. It distinguishes evidence verified in this clone from references that require another repository or source archive.

## 1. Presence in this repository

Before recovery commit `76871da`, no reachable Git object in this clone had a path containing the recovered Blue Whale title, filename, or the phrases:

- `Blue Whale / Intelligent Notes`
- `Restored discovery source of truth`
- `Preserve discovery. Correct error. Record implementation separately.`

The full system-wide V3 corpus was therefore absent from all refs available in this clone. The similarly named `experiments/emerge-ko-001/MATHEMATICS.md` is a separate, experiment-specific ledger and is not a predecessor or copy of the recovered corpus.

## 2. Directly verified `telic-engine-refactor` lineage

The recovered document names the following commits. They exist in this clone and resolve to these exact commits:

| Cited id | Full commit | Date | Subject | Role in recovered document |
| --- | --- | --- | --- | --- |
| `ac3539b` | `ac3539bc053084324699899a4f111e0f0cb4014a` | 31 Mar 2026 10:03:03 +0100 | `feat: Initialize project with baseline configuration and structure` | Earliest recovered refined sequence functional in this repository |
| `2f18052809d0cf1f2d470f8666c657c5b1874ada` | same | 31 Mar 2026 14:02:41 +0100 | `refactor: Introduce proposal generation and selection modules` | Modular random selector generation |
| `35675957f10d6c7c7f3818cf05c10ced8e2a775f` | same | 31 Mar 2026 15:15:28 +0100 | `feat(selection): Introduce deterministic proposal selection logic` | Explicit helper while selection remained full-pool random |
| `cec3f7d02ab8aa7ecab34d4d5eb50deb1dfb17c3` | same | 31 Mar 2026 15:53:21 +0100 | `feat: Introduce AI distillation seed and diagnostics` | Raw-score winner restriction with seeded tie resolution |

The document states that `src/logic/telos.ts` has five inspected revisions. `git log --follow` confirms exactly five revisions in this clone, in this order:

1. `ac3539bc053084324699899a4f111e0f0cb4014a`
2. `aaafa957dd8d7c5550e3d75200a310e062b695e1`
3. `2f18052809d0cf1f2d470f8666c657c5b1874ada`
4. `35675957f10d6c7c7f3818cf05c10ced8e2a775f`
5. `cec3f7d02ab8aa7ecab34d4d5eb50deb1dfb17c3`

This is the strongest locally verified implementation association found so far.

## 3. Named external repositories

The recovered document explicitly names these repository families:

- `StoneMonkeMatt/blue-whale`
- `StoneMonkeMatt/blue-whale-sim`
- `StoneMonkeMatt/telic-engine`
- `StoneMonkeMatt/telic-engine-refactor`
- `StoneMonkeMatt/The-Compass-V4-Current-State-`
- `StoneMonkeMatt/bluewhalememory`
- `StoneMonkeMatt/Consciousness-`
- `StoneMonkeMatt/Unicode`

Only `StoneMonkeMatt/telic-engine-refactor` is the configured remote of this clone. References belonging to the other repositories cannot be classified as missing merely because their objects are absent here.

## 4. External or unavailable commit references

These cited identifiers do not resolve to commits in this clone:

- `d97fa9e23` — attributed to `blue-whale`, 12 March 2026
- `d568dcab1` — attributed to `blue-whale-sim`, 19 March 2026
- `8c39278470353d8400aa7962a6bb608dd1eac6b8` — attributed to the V4 source lineage, 4 May 2026
- `853478e505f5933202445ce26953fa1aefc8a2dd` — attributed to a `src/logic/telos.ts` blob in that lineage
- `4a5b0b4` — attributed to a CH20 draft addition
- `69a826967` — attributed to a later V3 note
- `8725797`, `92d6a88b5`, `966493b`, and `a734304` — cited historical identifiers requiring repository attribution and verification

Their absence from this clone is unresolved provenance, not disproof.

## 4A. Public repository verification — 18 July 2026

Two named repositories were independently fetched as complete bare mirrors and inspected across all advertised refs.

### `StoneMonkeMatt/blue-whale-sim`

- Public repository HEAD: `b85a660bb929e8cbc718575cb6fa3e43517c5096`.
- Cited commit `d568dcab1` resolves exactly to `d568dcab12a2efecbb577f54961e91b75bfe4908`, dated 19 March 2026 13:23:17 UTC, subject `feat: Initialize Blue Whale project structure`.
- At that commit, `src/logic/telos.ts` contains defaults `alpha=0.5`, `gamma=0.3`, `delta=0.2`, `beta=0.1`, `lambda=0.618`, `eta=0.3`, `epsilon=0.05`, `threshold=0.8`, and `temperature=1.0`.
- The executable telic score is the four-term base score plus the literal coupling `0.2 * (I * Phi)`.
- The same source uses `lambda` in `dNew = D + lambda * C + eta * N + noise`, confirming that the configured `0.618` parameter has a distinct live role from the hardcoded `0.2` information–coherence coupling.
- The source computes the first-step-cooled schedule as `temperature * 0.95^t` and uses the effective admission denominator `currentTemp + 1e-6`.

These observations directly corroborate the principal `blue-whale-sim` claims in the recovered V3 corpus.

### `StoneMonkeMatt/telic-engine`

- Public repository HEAD: `966493b72a1219415f61cab2b050387f9f09fdaa`.
- Complete history exposes one commit and one revision of `src/simulation/engine.ts`, matching the corpus's repository-local archaeology boundary.
- The executable agent functional is `gamma * I + delta * Phi - alpha * K + beta * E`, confirming that it is a distinct four-term system from the sequence engine despite shared vocabulary.
- The `MUTUAL_INFO` branch fixes the self symbol while iterating neighbour symbols. For every observed neighbour value, its `pJoint` equals its `pNei`, so every logarithmic ratio is `log2(1)` and the accumulated value is identically zero. This corroborates the corpus's rejection of that implementation as mutual information.

Neither public repository contains the exact V3 title, the restored-source preamble, or the truncated-tail phrase. They corroborate cited implementation archaeology but do not provide the missing document continuation.

### Access boundary

At this checkpoint, unauthenticated Git access did not resolve `StoneMonkeMatt/blue-whale`, `StoneMonkeMatt/The-Compass-V4-Current-State-`, `StoneMonkeMatt/bluewhalememory`, `StoneMonkeMatt/Consciousness-`, or `StoneMonkeMatt/Unicode`. This is recorded only as an access boundary. It does not establish deletion or nonexistence.

## 5. Named source files

Present in this clone:

- `src/logic/telos.ts`

Named by the recovered document but absent from this clone's current tree:

- `codex-v9.1.ts`
- `docs/CH20-MATHEMATICS-LIVING-REFERENCE-DRAFT-29JUN2026.md`
- `docs/Key_Formulas.md`
- `research/archive/UIA_Formula_Tree_V2.txt`
- root-level `telos.ts`
- `versions/v6`
- `Key_Formulas.pdf`
- `The_purpose_(1).txt`

The recovered document itself already labels the last two items as named but inaccessible lineage material. The remaining absent paths may belong to other named repositories or historical revisions and must be checked there.

## 6. Association with the emergence experiment ledger

`experiments/emerge-ko-001/MATHEMATICS.md` was first committed as an independent canonical experiment ledger in commit `d099a7e` on 17 July 2026. It records the Carrier evidence programme, including duality EMA, slope, acceleration, and native-boundary experiments. The recovered V3 corpus is broader and supplies the system-level mathematical and implementation archaeology from which parts of that bench derive.

The documents must remain linked but must not be conflated:

- **V3 corpus:** discovery architecture, algorithms, implementation archaeology, statuses, and open questions across the wider Blue Whale / Intelligent Notes system.
- **EMERGE ledger:** preregistered causal claims, experiment gates, receipts, and results for the `emerge-ko-001` bench.

## 7. Open recovery actions

1. [ ] Acquire authenticated access to the unresolved named repositories and verify every remaining external commit and blob.
2. [ ] Search their complete refs for this exact title, predecessor V2/V3 files, and a continuation after `It first appears with \`c`.
3. [ ] Locate the CH20 draft, Key Formulas sources, UIA formula tree, V4 replay source, and named inaccessible files.
4. [x] Build a core Part II section-to-source matrix instead of relying only on prose citations; expand it as external sources are recovered.
5. [ ] Recover the missing tail without generating or inferring text.
6. [x] Add a repository-level canonical-document index so this corpus cannot become detached again.

Completed locally:

- Core Part II section-to-source matrix: `BLUE-WHALE-MATHEMATICS-V3-SECTION-SOURCE-MATRIX.md`.
- Repository-level canonical-document index: `docs/canonical/README.md`, linked from the root `README.md`.
