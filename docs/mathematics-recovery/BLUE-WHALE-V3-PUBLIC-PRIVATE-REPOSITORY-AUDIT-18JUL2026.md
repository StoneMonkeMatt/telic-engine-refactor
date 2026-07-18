# Blue Whale V3 — Public and Private Repository Audit

Date: 18 July 2026  
Scope: the eight repository families explicitly named by the recovered V3 corpus  
Status: all named repositories inspected across every available ref

## Outcome

The earlier public-only verification was incomplete. Authenticated inspection of the named private repositories recovered primary sources that were previously classified as unavailable. This changes the provenance confidence of V3, but it does not invalidate the executed Carrier measurements.

The three-day Carrier programme was run on frozen `telic-engine-refactor` sources with preserved selectors, traces, and receipts. The private histories do not reveal a different hidden runtime used by those runs. They do reveal that the documentary and architectural audit should have included the private corpus before describing account-wide provenance as closed.

## Repository receipts

Each ref receipt is the SHA-256 of the repository's sorted `refname object-id` list at audit time.

| Repository | Reachable commits | HEAD | Ref receipt |
| --- | ---: | --- | --- |
| `blue-whale` | 91 | `8260ef1d11b3d4fe10063a258bc0f53a89181da6` | `b96510edb9b7828075a83a1c4d7ab681210ce0485b03da5d68077b8c727a8984` |
| `blue-whale-sim` | 3 | `b85a660bb929e8cbc718575cb6fa3e43517c5096` | `72910af54fe1ab4ff7c61307da295689bd0c5de2056821e453c9b439557990fd` |
| `telic-engine` | 2 | `966493b72a1219415f61cab2b050387f9f09fdaa` | `a4929c6c11498e31392f650be18229822cfdd7f1ea000640740d53a4e28ab528` |
| `The-Compass-V4-Current-State-` | 2 | `8c39278470353d8400aa7962a6bb608dd1eac6b8` | `e4ee1225b073a9712e1a99d0c7294c9aa90f6d77b95075406b61ab3c17715746` |
| `bluewhalememory` | 3,147 | `6e8b4e9e358f8b345364eb0525d7377b5f53ca5b` | `8d278f5e46cc392cfb03d1e5bff35602ee012ce4601927f54de56fd362812289` |
| `Consciousness-` | 4 | `92d6a88b56fd063e2969c1908023447dc3f4703f` | `b0210f32d9967ae280124ad815b785c71c8a691ade7a52ec16b559d886f5da10` |
| `Unicode` | 20 | `fa1a71af25fd0c9ed507cccf4314919571a942f1` | `4a84b87f1399514acf1f16f5f685da7a079e6e3ee29c4a0a099542b91eff5079` |
| `telic-engine-refactor` | audited working and remote experiment lineage | remote sandbox head `36d07d3` at audit checkpoint | existing Git and experiment receipts |

All seven external mirrors completed `git fsck --full --no-dangling` without reported object errors.

## Cited commits and blobs now resolved

| V3 citation | Resolved source | Finding |
| --- | --- | --- |
| `d97fa9e23` | `blue-whale` commit `d97fa9e235c3ec9b806931021099a8a75fb89369` | `telos-future-development.html` proposes `T = αI + γΦ + δE − βK + λ(IΦ)` without a numeric coupling |
| `d568dcab1` | `blue-whale-sim` commit `d568dcab12a2efecbb577f54961e91b75bfe4908` | Executes the literal `0.2 * (I * Phi)`, `lambda=0.618` feedback, and cooled admission schedule |
| `966493b` | `telic-engine` commit `966493b72a1219415f61cab2b050387f9f09fdaa` | Contains the distinct agent functional and identically-zero `MUTUAL_INFO` implementation |
| `8c392784…` | `The-Compass-V4-Current-State-` commit `8c39278470353d8400aa7962a6bb608dd1eac6b8` | Recovers the V4 engine with default threshold `0.8`, compound high-duality predicate, and persistence count |
| `853478e…` | blob `853478e505f5933202445ce26953fa1aefc8a2dd` in the V4 repository | Exact cited `src/logic/telos.ts` object recovered |
| `4a5b0b4` | `bluewhalememory` commit `4a5b0b46db531d0b903e5f8e69e783d25ad2f8de` | Introduces the CH20 four-layer mathematics draft and its `E = Integration validated via CFI` gloss |
| `69a826967` | `bluewhalememory` commit `69a8269676ff29829fc1300051ebbf4b4311e1d7` | Reference Ch20 V3 note lineage recovered |
| `8725797` | `bluewhalememory` commit `87257972cc7eef6d7f0f854da2609a2ed58f7240` | Mathematics specification held/deferred register recovered |
| `92d6a88b5` | `Consciousness-` commit `92d6a88b56fd063e2969c1908023447dc3f4703f` | Historical repository identifier resolved |
| `a734304` | `bluewhalememory` commit `a73430454111bca33e18ff55c48f131f9075de03` | Needle–Action inventory candidate provenance recovered |

## Named files now recovered

The private `bluewhalememory` history contains:

- `src/lib/codex-v9.1.ts`
- `docs/CH20-MATHEMATICS-LIVING-REFERENCE-DRAFT-29JUN2026.md`
- `docs/CH20-MATHEMATICS-LIVING-REFERENCE-V3-29JUN2026.md`
- `docs/Key_Formulas.md`
- `research/archive/UIA_Formula_Tree_V2.txt`
- `versions/knowledge/messy/the-purpose.txt`
- the mathematics collation, stack specification, Needle–Action inventory, and related receipts

The CH20 correction in recovered V3 is supported by the private source comparison: CH20 assigns integration/CFI to a fourth `E` operand, while the UIA formula tree presents the three-term expression `αI + β(-K) + γΦ` and associates integration fidelity with `Φ`.

## Exact experiment-identifier audit

The following identifiers were searched literally across every ref of all eight repository families and the recovered V3 file:

- `EXP-001-BASE`
- `EXP-002-CODEX`
- `EXP-003-ONT`
- `EXP-004-GATE`
- `EXP-005-EVAL`
- `EXP-006-THETA-INIT`
- `EXP-007-THETA-DROP`
- `EXP-008-LOOP`

No occurrence was recovered. The proposed mapping of these identifiers to V3 objects is therefore not a recovered paper trail. It is a later classification and should be labelled as such if retained.

## Threshold and emergence chronology

The authenticated V4 source confirms:

- configurable default `threshold=0.8`;
- `highDualityPersistenceSteps=2`;
- a six-part compound high-duality diagnostic;
- persistence increment only after the diagnostic passes;
- persistence reset when it fails;
- smoothed duality as the threshold comparand.

No private-repository source was recovered that names `EXP-006-THETA-INIT`, `EXP-007-THETA-DROP`, or describes a formal experiment transition from `0.8` to `0.6` under those identifiers. The successful `0.6` Carrier setting belongs to the later `telic-engine-refactor` experiment lineage and its recorded measurements.

## Effect on the Carrier programme

### What remains valid

- The Carrier runs executed committed, hashed sources on frozen checkpoint pairs.
- Activation counts, sham rotations, changed decisions, recovery estimates, and artifact receipts remain measurements of those exact runs.
- The private V4 source corroborates the historical threshold, persistence, smoothed-duality, and compound-predicate architecture recorded in V3.
- No alternate private runtime was found that was silently substituted into the Carrier executions.

### What requires correction

- Earlier statements that account-wide archaeology was closed before authenticated private-repository inspection were premature.
- Public-only verification was insufficient for claims about the origin and completeness of V3.
- The `EXP-001`–`EXP-008` mapping has no recovered repository evidence.
- The supplied uploaded copy ends mid-sentence. A separate complete 9,401-line V3 source was recovered from stored evidence and committed in `2bc1512`; it continues through Part III and section 37.

## Scientific finding

The three days of Carrier testing were not computationally wasted: their causal measurements remain attached to exact executed sources. The provenance review surrounding those tests was incomplete, and some explanatory claims were stated more confidently than the available public-only evidence allowed. The private audit repairs that documentary gap and narrows the claims without changing the numerical Carrier results.
