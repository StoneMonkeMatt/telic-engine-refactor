# Blue Whale Mathematics V3 — Provenance and Association Index

Status: active recovery audit  
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

1. Acquire or inspect the other named repositories and verify every external commit and blob.
2. Search their complete refs for this exact title, predecessor V2/V3 files, and a continuation after `It first appears with \`c`.
3. Locate the CH20 draft, Key Formulas sources, UIA formula tree, V4 replay source, and named inaccessible files.
4. Build a section-to-source matrix for Parts I and II instead of relying only on prose citations.
5. Recover the missing tail without generating or inferring text.
6. Add a repository-level canonical-document index so this corpus cannot become detached again.
