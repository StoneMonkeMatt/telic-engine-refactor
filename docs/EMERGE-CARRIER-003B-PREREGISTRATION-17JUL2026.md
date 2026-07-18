# EMERGE-CARRIER-003B — Rotation-Complete Sham Robustness Audit

Date: 17 July 2026
Status: preregistered before outcome execution
Branch: `agent/emerge-ko-001-sandbox`
Summary: **A true timeline earns its claim only against every equally weighted cyclic alternative, not one chosen counterfeit.**

## Question

Carrier-003 proved that changing the order of the same retained EMA values changes reachable decisions and trajectories. Its preregistered positive repair hypothesis did not pass, while a secondary negative timing-by-feedback interaction excluded zero under one fixed sham rotation.

Carrier-003B asks whether those findings survive the complete predetermined cyclic-sham ensemble rather than depending on rotation 7.

## Frozen substrate

Carrier-003B inherits without refitting:

- the frozen V2.2 matched panel;
- 8 independent matched checkpoint pairs;
- 16 symbolic microstates;
- 512 exact two-bridge wounds;
- the Carrier-002 macro-history capsules;
- the reachable Carrier-002C continuity carrier;
- EMA coefficient `alpha = 0.2`;
- continuity coefficient `w_D = 0.5`;
- repair feedback `kappa = 0.25`;
- the same proposal, tie-breaking, admission, lesion, and branch random streams;
- the 16-step bounded EMA-history replay used by Carrier-003.

No coefficient, exposure-window, carrier, feedback-formula, wound, or panel adjustment is permitted.

## Rotation-complete sham ensemble

For each capsule, construct the same 16-value EMA schedule used in Carrier-003:

1. take the final 16 values of `boundedDualityHistory`;
2. left-pad shorter histories with their earliest available value;
3. preserve the terminal checkpoint `dEma` in position 16.

The real arm exposes the first 15 values in chronological order.

The sham ensemble contains every non-zero cyclic left rotation of the first 15 positions:

\[
r\in\{1,2,\ldots,14\}.
\]

For each rotation, position 16 remains the terminal checkpoint anchor. Every real/sham comparison therefore preserves:

- the exact value multiset;
- schedule length and exposure count;
- terminal anchor;
- capsule identity;
- symbolic microstate;
- wound and target bridges;
- feedback condition;
- branch random stream.

Only temporal alignment changes. Rotation 7 receives no analytical privilege.

## Integrity checks

Before active outcomes are admitted:

1. schedule construction must produce 14 unique, non-identity shams for every capsule;
2. all shams must preserve the real value multiset, duration, exposure and terminal anchor;
3. with timing exposure disabled, real and sham payloads must reproduce the active Carrier-002C reference exactly;
4. every matrix job must produce the same real-history projection receipt;
5. all 14 sham projection receipts must be distinct;
6. rotation 7 must exactly reproduce the hash-recorded Carrier-003 estimators and mechanistic counts.

Any failed check aborts aggregation.

## Execution design

The active sweep contains one predetermined job for each rotation `1..14`.

Each job runs:

- the true chronological schedule;
- that rotation's sham schedule;
- both feedback conditions;
- both retained-history capsules;
- all frozen lesions and matched microstates.

Per rotation:

\[
4096\ \text{active branch executions}.
\]

Across the full sweep:

\[
57344\ \text{active branch executions}.
\]

The repeated real branches are an execution invariant and must have identical projection receipts across rotations.

## Primary ensemble estimand

For matched pair `j`, feedback state `Z`, and sham rotation `r`, define:

\[
\Delta_{j,Z}^{(r)}
=
Y_j(real,Z)-Y_j(sham_r,Z).
\]

Average sham choice within each independent pair:

\[
\overline\Delta_{j,Z}
=
\frac1{14}\sum_{r=1}^{14}\Delta_{j,Z}^{(r)}.
\]

The primary recovery estimand is:

\[
\overline\Delta_{Z=1}
=
\frac1{8}\sum_{j=1}^{8}\overline\Delta_{j,Z=1}.
\]

Inference uses the eight pair-level ensemble effects. Rotations are controlled sham constructions, not independent scientific substrates.

A true-history repair advantage is established only if the pair-level 95% interval for `mean(Delta_Z=1)` lies entirely above zero.

## Timing-by-feedback robustness estimand

For each pair:

\[
\overline\Delta_{j,T\times Z}
=
\overline\Delta_{j,Z=1}-\overline\Delta_{j,Z=0}.
\]

The Carrier-003 negative interference signal is rotation-robust only if the pair-level ensemble interval for this interaction lies entirely below zero.

Rotation-level signs, intervals and ranges are descriptive sensitivity diagnostics. They do not replace pair-level ensemble inference.

## State-specific timing estimands

For each feedback state and rotation:

\[
\Theta_Z^{(r)}
=
[Y(M_1,real,Z)-Y(M_1,sham_r,Z)]
-
[Y(M_0,real,Z)-Y(M_0,sham_r,Z)].
\]

The aggregate reports the ensemble means for `Theta_Z=0`, `Theta_Z=1`, and their feedback interaction.

## Mechanistic endpoint

Each rotation reports:

- changed exact winners while real and sham share a pre-state;
- changed admission decisions;
- accepted timing-induced actions;
- hold/swap direction changes;
- state divergence and reconvergence.

The aggregate records how many of the 14 rotations functionally express temporal order and the total descriptive decision counts.

## Rotation-selection sensitivity

The audit reports:

- every rotation-specific point estimate and interval;
- minimum and maximum effects across rotations;
- positive, negative and zero sign counts;
- leave-one-rotation-out ensemble intervals;
- the exact rank and behaviour of rotation 7 inside the complete ensemble.

No rotation may be selected after inspection.

## Claim boundary

Carrier-003B may establish one of four outcomes:

1. **True-history advantage:** ensemble `Delta_Z=1` interval entirely above zero.
2. **True-history disadvantage:** ensemble `Delta_Z=1` interval entirely below zero.
3. **Feedback interference robustness:** direct advantage unestablished, but ensemble timing-by-feedback interval entirely below zero.
4. **Timing influence without stable usefulness:** mechanistic effects persist but recovery and interaction intervals cross zero.

Carrier-004 held-out generalisation is supported only after a positive true-history advantage survives the complete sham ensemble.

A robust negative timing-by-feedback interaction routes next to a separately preregistered feedback-mechanism decomposition rather than directly to held-out generalisation.

## Executable receipts

Rotation runner SHA-256:

```text
5c1f2fe37979ed500db7eb482d30a43b0a6121b791df051db7e42a73e55689ea
```

Aggregate analyser SHA-256:

```text
df10a6501be5156fa6466f96e778388ece75f4b49b23ad2a79bdb76e6c8413b6
```
