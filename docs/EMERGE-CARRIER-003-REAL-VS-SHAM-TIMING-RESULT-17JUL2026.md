# EMERGE-CARRIER-003 — Real History vs Equal-Distribution Sham

Date: 17 July 2026  
Status: completed timing-causality experiment  
Branch: `agent/emerge-ko-001-sandbox`  
Crown line: **The order of memory changed the path, but the true order did not yet prove itself the better guide.**

## Question

Does the true chronological ordering of retained EMA history improve structural repair relative to a sham history containing the exact same values, duration, exposure, and terminal checkpoint anchor?

Carrier-002C established that retained macro-history can change reachable decisions. Carrier-003 tested whether the chronology of that history carries useful control information.

## Preregistration and frozen boundary

The design was committed before outcome execution in:

```text
EMERGE-CARRIER-003-PREREGISTRATION-17JUL2026.md
```

The experiment inherited without refitting:

- the frozen V2.2 matched panel;
- 8 independent matched checkpoint pairs;
- 16 symbolic microstates;
- 512 exact two-bridge wounds;
- the Carrier-002 state capsules;
- the reachable Carrier-002C continuity carrier;
- EMA coefficient `alpha = 0.2`;
- continuity coefficient `w_D = 0.5`;
- repair feedback `kappa = 0.25`;
- identical proposal, tie-breaking, admission, lesion, and branch random streams.

V2.2 selector SHA-256:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Carrier capsule selector SHA-256:

```text
be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5
```

Carrier-002C active-reference receipt SHA-256:

```text
aba963c5e89b630d9c34933e3a6a19455e8adb1d90e6cfdfae3e8a2096d3b49f
```

## Timing intervention

Each capsule supplied a 16-value EMA-history schedule.

- **Real:** values exposed in chronological order.
- **Sham:** first 15 positions rotated left by exactly 7 positions.
- The terminal checkpoint `dEma` remained fixed in position 16.
- Histories shorter than 16 were left-padded with their earliest available value.

Real and sham therefore preserved exactly:

- the value multiset;
- schedule duration;
- total exposure;
- terminal anchor;
- capsule identity;
- microstate, wound, targets, feedback, and random stream.

Only temporal alignment changed.

The schedule was consulted for the first 16 decisions. Thereafter each branch continued with the endogenous Carrier-002C capsule update produced by its own accepted trajectory.

## Scale and neutrality

- schedule-neutrality comparisons: **4,096**;
- schedule-neutrality mismatches: **0**;
- total branch executions: **8,192**;
- active timing branches: **4,096**;
- accepted transition receipts: **77,395**.

Both real and sham payloads reproduced the corresponding Carrier-002C active projection exactly when timing exposure was disabled:

\[
N_{neutral}=4096,
\qquad
N_{mismatch}=0.
\]

## Mechanistic timing result

Across comparisons where real and sham still shared the same pre-state:

- comparable decisions: **63,791**;
- timing-changed exact winners: **1,615**;
- timing-changed admissions: **1,280**;
- accepted timing-induced actions: **1,260**;
- sham hold → real swap: **456**;
- sham swap → real hold: **522**;
- sham swap → different real swap: **637**;
- other winner changes: **0**;
- real branches with state divergence: **1,533**;
- branches that later reconverged: **89**;
- reconvergence events: **103**.

Therefore:

\[
\boxed{N_{timing\ decisions}>0}.
\]

The order manipulation was functionally expressed. Temporal ordering changed exact rankings, admissions, accepted actions, and subsequent trajectories.

## Active timing cells

| Capsule | Timing | Feedback | n | Mean target recovery | Mean coherence |
|---|---|---:|---:|---:|---:|
| M0 unlatched | real | 0 | 512 | 0.36328125 | 0.6828745994 |
| M0 unlatched | sham | 0 | 512 | 0.35156250 | 0.6844110577 |
| M1 latched | real | 0 | 512 | 0.3544921875 | 0.6845152244 |
| M1 latched | sham | 0 | 512 | 0.3525390625 | 0.6822495994 |
| M0 unlatched | real | 1 | 512 | 0.7763671875 | 0.6786558494 |
| M0 unlatched | sham | 1 | 512 | 0.7900390625 | 0.6799839744 |
| M1 latched | real | 1 | 512 | 0.7783203125 | 0.6786298077 |
| M1 latched | sham | 1 | 512 | 0.7968750000 | 0.6784995994 |

## Preregistered primary endpoint

The primary directional estimator was:

\[
\Delta_{Z=1}
=
Y(real,Z=1)-Y(sham,Z=1).
\]

Observed:

\[
\Delta_{Z=1}=-0.01611328125.
\]

Matched-pair 95% interval:

\[
[-0.0375979608,\ 0.0053713983].
\]

The interval crosses zero and the point estimate is negative. The preregistered positive hypothesis was **not supported**.

The correct primary conclusion is:

\[
\boxed{
\text{True chronological ordering did not establish a repair advantage over the equal-distribution sham.}
}
\]

## Secondary estimators

Without repair feedback:

\[
\Delta_{Z=0}=+0.0068359375,
\]

with 95% interval:

\[
[-0.0189858436,\ 0.0326577186].
\]

The feedback-specific timing interaction was:

\[
\Delta_{Z=1}-\Delta_{Z=0}=-0.02294921875,
\]

with 95% interval:

\[
[-0.0453370795,\ -0.0005613580].
\]

This secondary interval excludes zero. On this frozen panel, activating repair feedback shifted the real-minus-sham timing effect in a negative direction.

This is classified as a **secondary bounded interference signal**. It does not establish that true chronology is generally harmful. It may reflect an interaction between the fixed 16-step history replay, the single rotation-7 sham, and the existing repair-feedback landscape. It requires a preregistered sham-robustness audit before interpretation beyond this experiment.

State-specific timing estimates were:

\[
\Theta_{Z=0}=-0.009765625,
\qquad
95\%=[-0.0537601899,\ 0.0342289399],
\]

\[
\Theta_{Z=1}=-0.0048828125,
\qquad
95\%=[-0.0598638928,\ 0.0500982678],
\]

and:

\[
\Theta_{Z=1}-\Theta_{Z=0}=+0.0048828125,
\qquad
95\%=[-0.0621856824,\ 0.0719513074].
\]

All state-specific timing intervals cross zero. The latched `M1` history did not show a distinct timing advantage over `M0`.

## Pair effects

| Pair | \(\Delta_{Z=0}\) | \(\Delta_{Z=1}\) | Timing × feedback |
|---|---:|---:|---:|
| pair-01 | +0.01953125 | 0 | -0.01953125 |
| pair-02 | +0.04296875 | -0.03515625 | -0.07812500 |
| pair-03 | +0.00781250 | -0.02734375 | -0.03515625 |
| pair-04 | -0.01171875 | -0.04296875 | -0.03125000 |
| pair-05 | -0.05078125 | -0.03906250 | +0.01171875 |
| pair-06 | -0.01171875 | -0.02343750 | -0.01171875 |
| pair-07 | +0.01953125 | +0.01562500 | -0.00390625 |
| pair-08 | +0.03906250 | +0.02343750 | -0.01562500 |

Seven of eight pair-level timing × feedback effects were negative.

## Scientific conclusion

Carrier-003 establishes:

\[
\boxed{
\text{The temporal ordering of retained EMA history is causally influential under the bounded replay intervention.}
}
\]

It does **not** establish:

- that the true chronology improves structural repair;
- that latched history benefits more than unlatched history;
- that active repair feedback unlocks useful timing information;
- that the observed negative timing × feedback interaction generalises beyond the chosen sham construction and frozen panel.

The honest verdict is:

\[
\boxed{
\text{timing causality established; true-history usefulness not established; feedback interference signal detected.}
}
\]

This experiment used a bounded 16-step replay of EMA anchors. It is not evidence of consciousness, subjective recollection, or a complete autobiographical memory system.

## Next admissible experiment

# EMERGE-CARRIER-003B — Rotation-Complete Sham Robustness Audit

The next test should hold the carrier, coefficient, wounds, panel, and feedback law fixed while replacing the single rotation-7 sham with a preregistered ensemble of all non-zero cyclic rotations of the first 15 history positions, preserving the terminal anchor.

The central questions are:

1. Does real chronology continue to change decisions relative to the sham ensemble?
2. Is the negative timing × feedback interaction stable across sham rotations or specific to rotation 7?
3. Does the mean real-minus-sham recovery effect remain near zero when sham choice is treated as a nuisance variable rather than a selected control?

Carrier-004 held-out generalisation remains premature because the preregistered positive primary endpoint did not clear zero.

## Execution record

The first workflow attempt failed before outcome execution because one whitespace byte was absent at a split patch boundary. The source patch was rejected by its SHA-256 gate, and no Carrier-003 outcomes were generated. The boundary byte was restored and the authoritative run completed under the unchanged preregistration.

Authoritative GitHub Actions workflow run:

```text
29575934765
```

Generated executable SHA-256:

```text
aef813848ee7fcdc70e0fd3d328ade8c038aaf7f6ccb2218ca6c619266222dd3
```

Summary object receipt SHA-256:

```text
5b4543ffb3e6c39e0cdb4ad63c247c88f786d71e5759093b4e7bfc32a1b4b710
```

Trace SHA-256:

```text
f231bd8e2e9d6994dadd18cc4e3931f26ecc1f2792c1bd01e5c1cb994d2b790d
```

Workflow artifact:

```text
EMERGE-CARRIER-003-results
```

Artifact SHA-256:

```text
cc701497c87f5b0ec18b36593a1cbcd0c4bdad537c738c4ac736a8ffa835ba6e
```
