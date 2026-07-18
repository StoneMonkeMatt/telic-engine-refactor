# Blue Whale Mathematics V3 — Provenance and Association Index

Status: all V3-named public and private repository lineages inspected
Opened: 18 July 2026  
Recovered source: `BLUE-WHALE-MATHEMATICS-COMPLETE-V3-17JUL2026-SEALED-CANONICAL.md`  
Recovery commit: `76871da`

Complete-source recovery: commit `2bc1512`, 9,401 lines, SHA-256 `b5e916465758a04a3e5ee63172b3b8b1530abfcf092ca9c088700c5e3f0c5dff`

This index records what is associated with the recovered system-wide mathematics document. The authenticated cross-repository findings are detailed in `BLUE-WHALE-V3-PUBLIC-PRIVATE-REPOSITORY-AUDIT-18JUL2026.md`.

## 1. Presence in this repository

Before recovery commit `76871da`, no reachable Git object in this clone had a path containing the recovered Blue Whale title, filename, or the phrases:

- `Blue Whale / Intelligent Notes`
- `Restored discovery source of truth`
- `Preserve discovery. Correct error. Record implementation separately.`

The full system-wide V3 corpus was absent from the original local ref set, but was subsequently recovered and committed under `docs/mathematics-lineage/` in commit `2bc1512`. The similarly named `experiments/emerge-ko-001/MATHEMATICS.md` is a separate experiment-specific ledger.

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

All eight named repository families have now been inspected across every available ref. `StoneMonkeMatt/telic-engine-refactor` remains the configured remote of this working clone; the other repositories were inspected as authenticated mirrors.

## 4. Cross-repository commit references

These cited identifiers are external to this clone and now resolve in their named repositories:

- `d97fa9e23` — `blue-whale` commit `d97fa9e235c3ec9b806931021099a8a75fb89369`
- `d568dcab1` — `blue-whale-sim` commit `d568dcab12a2efecbb577f54961e91b75bfe4908`
- `8c39278470353d8400aa7962a6bb608dd1eac6b8` — exact V4 repository commit
- `853478e505f5933202445ce26953fa1aefc8a2dd` — exact V4 `src/logic/telos.ts` blob
- `4a5b0b4` — `bluewhalememory` commit `4a5b0b46db531d0b903e5f8e69e783d25ad2f8de`
- `69a826967` — `bluewhalememory` commit `69a8269676ff29829fc1300051ebbf4b4311e1d7`
- `8725797` — `bluewhalememory` commit `87257972cc7eef6d7f0f854da2609a2ed58f7240`
- `92d6a88b5` — `Consciousness-` commit `92d6a88b56fd063e2969c1908023447dc3f4703f`
- `966493b` — `telic-engine` commit `966493b72a1219415f61cab2b050387f9f09fdaa`
- `a734304` — `bluewhalememory` commit `a73430454111bca33e18ff55c48f131f9075de03`

The detailed content findings and ref receipts are recorded in the authenticated audit.

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

### Authenticated expansion

The later authenticated audit added `blue-whale`, `The-Compass-V4-Current-State-`, `bluewhalememory`, `Consciousness-`, and `Unicode`. It recovered the cited commits, the V4 source blob, CH20 and formula sources, and the Needle–Action provenance. Separately, commit `2bc1512` recovered the complete V3 source from stored evidence.

## 5. Named source files

Present in this clone:

- `src/logic/telos.ts`

Named by the recovered document, absent from this clone's current tree, and recovered in the authenticated repository set:

- `codex-v9.1.ts`
- `docs/CH20-MATHEMATICS-LIVING-REFERENCE-DRAFT-29JUN2026.md`
- `docs/Key_Formulas.md`
- `research/archive/UIA_Formula_Tree_V2.txt`
- V4 `src/logic/telos.ts`
- `versions/v6` lineage material
- `versions/knowledge/messy/the-purpose.txt`

The private history confirms that `Key_Formulas.pdf` and the exact filename `The_purpose_(1).txt` were cited but never present in that repository. Later recovered Markdown/text sources close much of that citation gap without retroactively creating those exact files.

## 6. Association with the emergence experiment ledger

`experiments/emerge-ko-001/MATHEMATICS.md` was first committed as an independent canonical experiment ledger in commit `d099a7e` on 17 July 2026. It records the Carrier evidence programme, including duality EMA, slope, acceleration, and native-boundary experiments. The recovered V3 corpus is broader and supplies the system-level mathematical and implementation archaeology from which parts of that bench derive.

The documents are linked and recorded as distinct sources:

- **V3 corpus:** discovery architecture, algorithms, implementation archaeology, statuses, and open questions across the wider Blue Whale / Intelligent Notes system.
- **EMERGE ledger:** preregistered causal claims, experiment gates, receipts, and results for the `emerge-ko-001` bench.

## 7. Open recovery actions

1. [x] Inspect all V3-named public and private repositories and verify the cited commits and blobs.
2. [x] Search complete refs and stored evidence; the complete V3 source was recovered in commit `2bc1512`.
3. [x] Locate the CH20 draft, Key Formulas source, UIA formula tree, V4 source, and later purpose text.
4. [x] Build a core Part II section-to-source matrix instead of relying only on prose citations; expand it as external sources are recovered.
5. [ ] Recover the missing tail without generating or inferring text.
6. [x] Add a repository-level canonical-document index for direct discovery of this corpus.

Completed locally:

- Core Part II section-to-source matrix: `BLUE-WHALE-MATHEMATICS-V3-SECTION-SOURCE-MATRIX.md`.
- Repository-level canonical-document index: `docs/canonical/README.md`, linked from the root `README.md`.
