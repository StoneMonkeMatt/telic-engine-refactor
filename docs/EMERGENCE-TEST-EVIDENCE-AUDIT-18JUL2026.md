# Emergence Test Evidence Audit — 18 July 2026

## Scope

This inventory was reconstructed from committed runners, result documents, workflow records, hashes, and the preservation manifest. It does not rely on conversational memory. Proposed experiments and attempts that stopped before producing outcomes are excluded.

The repository contains 13 named executed phases: V1, V2, V2.1, V2.2, Carrier-001, Carrier-002, Carrier-002C, Carrier-003, Carrier-003B, Carrier-003C, Carrier-003D, Carrier-003E, and Carrier-003F. Those phases contain the following separately measured test units.

## Evidence-backed test units

### V1, V2, and V2.1

- **1 — V1 state-specific recovery:** reported `Gamma=+0.2083`; invalidated because shared checkpoints and discarded history allowed seed offsets to appear as class differences.
- **2 — V2 corrected state comparison:** reported `Gamma=-0.0677083`, interval `[-0.241792, 0.106375]`; state-specific efficacy was not established.
- **3 — V2.1 exact V2 replay:** checkpoint selection, all four cells, every final sequence, every recovery outcome, replicate gamma values, aggregate gamma, standard error, and interval reproduced exactly.
- **4 — V2.1 trace completeness:** recorded 128 branches, 64 paired comparisons, and 12,800 steps; trace SHA-256 was recorded.
- **5 — V2.1 opportunity exposure:** emergent checkpoints had more overlap-improving candidates but fewer candidates scored as positive recovery actions.
- **6 — V2.1 first divergence:** 61/64 feedback pairs diverged; every first divergence was `none` versus `swap`.
- **7 — V2.1 admission effect:** feedback changed 106 non-emergent and 135 emergent exact winners, but only 23 and 26 respectively were admitted.
- **8 — V2.1 path persistence:** only 9/64 pairs reconverged at least once; sparse decisions produced persistent trajectory separation.
- **9 — V2.1 outcome-scale sensitivity:** absolute-count `Gamma=+0.1875` and damage-normalized `Gamma=-0.03125`; both intervals crossed zero, showing the sign was not stable across reasonable scales.

Evidence: `experiments/emerge-ko-001/TRAJECTORY-AUDIT-V2.1.md` and `experiments/emerge-ko-001/MATHEMATICS.md`.

### V2.2 equal-wound experiment

- **10 — Equal target-wound execution:** ran eight matched pairs, 512 exact lesions, and 1,024 outcome branches with two identifiable target bridges per checkpoint.
- **11 — State-specific recovery estimate:** `Gamma=+0.07421875`; the eight-pair interval crossed zero, so efficacy was not established.
- **12 — Pair direction:** five of eight pair effects were positive, three negative; the median was positive but did not replace the pair-level interval.
- **13 — Feedback main effect:** feedback increased mean recovery in both measured-state classes; this demonstrated a general feedback effect, not state-specific emergence control.
- **14 — Declaration-class interpretation:** the comparison was between persistence-declared and undeclared checkpoints, not simply values above and below `theta=0.6`.

Evidence: `docs/EMERGE-KO-001-V2.2-EQUAL-WOUND-RESULT-17JUL2026.md`; workflow run `29563428289`.

### Carrier-001 macro-history twins

- **15 — Exact retained-history twins:** 1,024 byte-level twin comparisons produced zero differences.
- **16 — Cell identity:** unlatched and latched history receipts produced identical recovery means within each feedback condition.
- **17 — Architectural reachability:** the current transition function had no macro-history input, so retained history was metadata rather than executable state.

Evidence: `docs/EMERGE-CARRIER-001-ARCHITECTURAL-NULL-RESULT-17JUL2026.md`; workflow run `29565733958`.

### Carrier-002 passive capsule and insertion path

- **18 — Passive capsule neutrality:** 2,048 zero-coupling comparisons reproduced Carrier-001 exactly.
- **19 — Capsule update neutrality:** carrying and updating the capsule changed no measured outcome while its coefficient was zero.
- **20 — Insertion-path exposure:** insertion candidates generated: `0`; carrier-adjusted candidates: `0`.
- **21 — Accepted-transition classification:** all 39,102 accepted active transitions were swaps, leaving the intended insertion-only carrier unreachable.
- **22 — Recovery result:** every active/passive and latched/unlatched interaction was exactly zero; this was an unreachable-path result, not evidence against history-sensitive repair generally.

Evidence: `docs/EMERGE-CARRIER-002-NEUTRALITY-AND-REACHABILITY-RESULT-17JUL2026.md`; workflow run `29568090469`.

### Carrier-002C reachable continuity

- **23 — Zero-coupling reproduction:** 2,048 comparisons produced zero mismatches.
- **24 — Candidate exposure:** hold, delete, swap, and combine candidates all received measurable continuity adjustments.
- **25 — Winner reachability:** 1,992 exact winners changed across 18,963 comparable pre-state decisions.
- **26 — Admission reachability:** 1,275 admission decisions changed.
- **27 — Accepted causal actions:** 1,603 continuity-induced actions were accepted, including 576 `hold→swap`, 492 `swap→hold`, and 924 different-swap changes.
- **28 — Trajectory divergence:** 1,930 active branches diverged; 49 later reconverged.
- **29 — Recovery usefulness:** all recovery intervals crossed zero; reachable causal influence was established, repair advantage was not.

Evidence: `docs/EMERGE-CARRIER-002C-REACHABLE-HOLD-SWAP-RESULT-17JUL2026.md`; workflow run `29572723082`.

### Carrier-003 one real-history versus sham schedule

- **30 — Schedule neutrality:** 4,096 activation-off comparisons produced zero mismatches.
- **31 — Timing reachability:** 1,615 winners and 1,280 admissions changed across 63,791 comparable decisions.
- **32 — Accepted timing actions:** 1,260 timing-induced actions were accepted.
- **33 — Primary repair comparison:** under feedback, real-minus-sham recovery was `-0.0161133`, interval `[-0.0375980, 0.0053714]`; positive usefulness was not established.
- **34 — Timing-by-feedback contrast:** the rotation-7 secondary interval was negative and excluded zero, but was specific to one sham construction.
- **35 — State-specific timing:** every state-specific timing interval crossed zero; latched history showed no distinct advantage.

Evidence: `docs/EMERGE-CARRIER-003-REAL-VS-SHAM-TIMING-RESULT-17JUL2026.md`; workflow run `29575934765`.

### Carrier-003B complete cyclic sham family

- **36 — Fourteen-schedule integrity:** every non-zero rotation was unique, preserved the value multiset and terminal anchor, and rotation 7 reproduced Carrier-003.
- **37 — Timing mechanism replication:** all 14/14 rotations changed behaviour; totals were 20,823 winners, 16,537 admissions, and 16,165 accepted actions.
- **38 — Ensemble repair comparison:** mean real-minus-sham recovery under feedback was `-0.0157645`, interval `[-0.0338455, 0.0023164]`; positive usefulness was not established.
- **39 — Rotation direction:** all 14 point estimates were negative, but 13/14 individual intervals and the eight-pair ensemble interval crossed zero.
- **40 — Secondary replication:** the negative timing-by-feedback result from rotation 7 did not survive the complete sham family.
- **41 — Leave-one-out stability:** removing any one rotation retained a negative point estimate with an interval crossing zero.

Evidence: `docs/EMERGE-CARRIER-003B-ROTATION-COMPLETE-SHAM-RESULT-17JUL2026.md`; workflow run `29579962999`.

### Carrier-003C candidate-projected slope

- **42 — Projection equivalence:** 6,400 comparisons reproduced the engine update with zero error.
- **43 — Activation-off neutrality:** 2,048 comparisons reproduced Carrier-001 with zero mismatches.
- **44 — Candidate coverage:** 819,200 hold/delete/swap/combine candidates received non-zero slope adjustments.
- **45 — Slope reachability:** 1,325 winners, 802 admissions, and 1,042 accepted actions changed.
- **46 — Slope trajectory effect:** 1,298 branches diverged; 28 later reconverged.
- **47 — Slope recovery usefulness:** estimates were slightly positive, but every matched-pair interval crossed zero.

Evidence: `docs/EMERGE-CARRIER-003C-NATIVE-PROJECTED-SLOPE-RESULT-17JUL2026.md`; workflow run `29610229475`.

### Carrier-003D complete slope sham family

- **48 — Activation-off reproduction:** 4,096 comparisons produced zero mismatches and the Carrier-003C active reference reproduced.
- **49 — Slope-order mechanism:** all 14/14 rotations were active, changing 9,813 winners, 6,090 admissions, and 7,309 accepted actions.
- **50 — Slope chronology usefulness:** mean true-minus-sham recovery was `-0.0055106`, interval `[-0.0193342, 0.0083130]`; no advantage or harm was established.
- **51 — Rotation direction:** 12/14 point estimates were negative and 2/14 positive; all 14 intervals crossed zero.
- **52 — Pair heterogeneity:** four pair effects were positive and four negative under feedback.

Evidence: `docs/EMERGE-CARRIER-003D-COMPLETE-SHAM-NATIVE-SLOPE-RESULT-17JUL2026.md`; workflow run `29614750232`.

### Carrier-003E candidate-projected acceleration

- **53 — Acceleration algebra:** 15,114 comparisons produced maximum projection error `0`.
- **54 — Acceleration-off reproduction:** 4,096 comparisons reproduced Carrier-003C with zero mismatches.
- **55 — Acceleration reachability:** 1,790 winners, 1,344 admissions, and 1,388 accepted actions changed.
- **56 — Prior-slope order mechanism:** all 14/14 shams were active, changing 17,515 winners, 15,169 admissions, and 13,710 accepted actions.
- **57 — Acceleration chronology usefulness:** mean true-minus-sham recovery was `-0.0089634`, interval `[-0.0256051, 0.0076782]`; no advantage or harm was established.
- **58 — Rotation direction:** 12/14 point estimates were negative, 2/14 positive, and 13/14 intervals crossed zero.
- **59 — Secondary contrast:** one unadjusted state-specific timing-by-feedback interval was positive, but it did not satisfy the direct usefulness criterion.

Evidence: `docs/EMERGE-CARRIER-003E-COMPLETE-SHAM-CANDIDATE-ACCELERATION-RESULT-18JUL2026.md`; workflow run `29621108507`.

### Carrier-003F dark boundary audit

- **60 — Boundary algebra:** six truth-table cases, 229 history transitions, and 15,114 candidate/history comparisons produced zero classification error.
- **61 — Proposed `theta=0.65`:** 15,114 no-crossings, zero exits, zero entries, and zero divergent frontiers; the channel was unreachable on this substrate.
- **62 — Recorded `theta=0.6` initial frontier:** 102 exits, 1,212 entries, and 252 candidate-divergent frontiers were found in frozen histories/frontiers.
- **63 — Dark neutrality:** 2,048 activation-off comparisons and 204,800 dynamic frontiers preserved the Carrier-003C result exactly.
- **64 — Full-trajectory reachability:** 819,200 candidate projections exposed 27,291 exits, 29,984 entries, and 28,359 divergent frontiers.
- **65 — Later exit availability:** zero exit options existed at step one; 13,423 exit-option frontiers appeared later.
- **66 — Accepted crossing replay:** 39,580 accepted comparisons produced zero mismatches, including 1,716 exits and 1,509 entries.
- **67 — Inventory co-occurrence:** every accepted crossing was an inventory-stable swap.
- **68 — Exit outcome distribution:** 383/1,716 accepted exits immediately produced full target recovery; exits were informative but not equivalent to complete repair.

Evidence: `docs/EMERGE-CARRIER-003F-DARK-BOUNDARY-TRANSITION-AUDIT-18JUL2026.md`.

### Carrier-003F active boundary assignment

- **69 — Baseline reproduction:** 28,672 Carrier-001 and 28,672 Carrier-003C boundary-off comparisons produced zero mismatches.
- **70 — Equal-exposure reassignment:** 2,867,200 sham frontier-multiset comparisons produced zero mismatches while 624,370 candidate labels changed.
- **71 — Fixed boundary formula reachability:** 501 winners, 407 admissions, and 399 accepted actions changed relative to boundary-off.
- **72 — Assignment timing mechanism:** all 14/14 shams were active, changing 10,504 winners, 14,905 admissions, and 8,232 accepted actions.
- **73 — Boundary usefulness:** mean true-minus-sham recovery was `+0.0018834`, interval `[-0.0054898, 0.0092565]`; positive usefulness was not established.
- **74 — Rotation pattern:** 8/14 point estimates were positive, 3/14 zero, and 3/14 negative; only schedule 13 had an individually positive interval.
- **75 — Secondary outcomes:** every secondary ensemble interval crossed zero.

Evidence: `docs/EMERGE-CARRIER-003F-COMPLETE-SHAM-NATIVE-BOUNDARY-RESULT-18JUL2026.md` and committed result JSON; complete local evidence archived under the Carrier-003F checkpoint.

## What the wider repository audit changes

- **76 — Numerical execution status:** the later 39-repository audit found no private runtime that contradicted the frozen Carrier executions. The recorded numerical outputs therefore remain evidence of what the frozen harnesses did.
- **77 — Source-history completeness:** the earlier experiment sequence was designed before the full private-repository history was inspected. `bluewhalememory` added 3,147 commits of private provenance, and `Observer-Fix` contained a six-commit design sequence, including five recorded persistence changes, that should have informed experiment selection earlier.
- **78 — Interpretation limit:** the experiments do not establish that level, slope, acceleration, or boundary information is generally useless. They tested fixed linear coefficients and specific frozen substrates.
- **79 — Missing original outputs:** V1, V2, and V2.1 have committed source and reports but no separately recovered original raw-output archives. Claims from those phases have weaker preservation than V2.2 through Carrier-003F.
- **80 — Unsupported experiment-name mapping:** no `EXP-001-BASE` through `EXP-008-LOOP` identifiers were found across the audited repository refs; those labels must not be treated as recovered source provenance.

Evidence: `docs/mathematics-recovery/CARRIER-39-REPOSITORY-MISSED-EVIDENCE-AUDIT-18JUL2026.md`, `docs/mathematics-recovery/BLUE-WHALE-V3-PUBLIC-PRIVATE-REPOSITORY-AUDIT-18JUL2026.md`, and `docs/research-preservation/EMERGE-KO-001-PRESERVATION-AUDIT-18JUL2026.md`.

## Evidence summary

- **75 separately measured test units** are documented across **13 executed phases**, followed by **5 findings** from the later repository audit.
- The strongest repeated result is mechanistic: history level, timing, slope, acceleration, and boundary assignment can all change reachable decisions when exposed to ranking.
- No tested history formula established positive eight-pair usefulness against its complete sham family.
- The private-repository omission did not alter the recorded branch outputs, but it made the research selection and provenance analysis incomplete.
- Carrier-004 held-out testing has not been executed.
