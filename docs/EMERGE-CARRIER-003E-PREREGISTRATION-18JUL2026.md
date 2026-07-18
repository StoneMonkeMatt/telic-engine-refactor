# EMERGE-CARRIER-003E — Candidate-Projected Duality Acceleration Preregistration

Date: 18 July 2026
Status: preregistered before outcome execution
Branch: `agent/emerge-ko-001-sandbox`

> **Carrier-003E asks whether change in model-native directional history carries useful repair information beyond the frozen first-order signed-slope formula.**

## 1. Background

Carrier-003C established a pure candidate projection of the native Telos EMA update:

\[
v_t(c)=D_{t+1}^{EMA}(c)-D_t^{EMA}.
\]

Carrier-003D established that the temporal order of this directional channel is causally active, but true signed-slope chronology did not outperform the complete fourteen-rotation sham family under fixed \(w_v=0.5\).

Carrier-003E keeps that first-order formula fixed and adds its next discrete difference:

\[
v_{t-1}=D_t^{EMA}-D_{t-1}^{EMA},
\]

\[
a_t(c)=v_t(c)-v_{t-1}.
\]

The helper `projectDualityAcceleration` is pure. It adds no persistent state and does not alter production behaviour unless the isolated experimental coefficient is active.

## 2. Frozen substrate

Carrier-003E inherits without modification:

- 8 independent matched checkpoint pairs;
- 16 symbolic microstates;
- 512 frozen exact two-bridge lesions;
- the V2.2 selector and wounds;
- Carrier-002 macro-history capsules;
- identical proposal frontiers;
- exact deterministic tie resolution;
- identical admission formula;
- identical branch random streams;
- repair feedback coefficient \(\kappa=0.25\);
- native EMA coefficient \(\alpha=0.2\);
- signed-slope ranking weight \(w_v=0.5\);
- no declaration-state bonus;
- no forced mutation;
- no feedback-strength change;
- no coefficient sweep.

The matched checkpoint pair remains the inferential unit. Replicates and sham rotations improve measurement but are not independent scientific substrates.

## 3. Candidate acceleration formula

For candidate \(c\) at native current anchor \(D_t^{EMA}\):

\[
F(c)=0.618C(c)+0.3N(c)+0.05,
\]

\[
T_D(c)=\min\left(1,\widehat D(c)[1+0.2F(c)]\right),
\]

\[
D_{t+1}^{EMA}(c)
=
\operatorname{clamp}_{[0,1]}
\left(D_t^{EMA}+0.2[T_D(c)-D_t^{EMA}]\right),
\]

\[
v_t(c)=D_{t+1}^{EMA}(c)-D_t^{EMA},
\]

\[
a_t(c)=v_t(c)-[D_t^{EMA}-D_{t-1}^{EMA}].
\]

The frozen Carrier-003C score is the base formula. Carrier-003E adds one preregistered term:

\[
R_t^{003E}(c)=R_t^{003C}(c)+0.5a_t(c).
\]

For insertion candidates, Carrier-003C's existing raw-duality-loss replacement remains inside \(R_t^{003C}\). Carrier-003E adds the same \(0.5a_t(c)\) term to every reachable candidate. No other score, feedback or admission term changes.

The coefficient is fixed once at:

\[
\boxed{w_a=0.5}.
\]

It is chosen by continuity with the frozen signed-slope coefficient, not by an outcome sweep.

## 4. Real and sham prior-slope schedules

Each frozen capsule supplies a normalized sixteen-value EMA history:

\[
H=(D_1^{EMA},D_2^{EMA},\ldots,D_{16}^{EMA}),
\qquad
D_{16}^{EMA}=D_0^{EMA}.
\]

Short histories are left-padded with their earliest available value. The fifteen realised slopes are derived upstream:

\[
V=(D_2-D_1,D_3-D_2,\ldots,D_{16}-D_{15}).
\]

The real arm receives \(V\) in recorded order. For every non-zero cyclic rotation:

\[
r\in\{1,2,\ldots,14\},
\]

the sham arm receives:

\[
V^{(r)}=\operatorname{rotate}(V,r).
\]

Thus every real/sham comparison preserves exactly:

- the same fifteen prior-slope values;
- the same slope multiset;
- fifteen exposure steps;
- the same capsule and native current EMA anchor;
- the same microstate, wound, targets and random stream;
- the same signed-slope base formula, feedback and admission formula.

Only prior-slope chronology changes. Candidate acceleration is derived after the chronology intervention:

\[
a_t^{(r)}(c)=v_t(c)-v_{t-1}^{(r)}.
\]

Precomputed acceleration values are not rotated.

During steps 1 through 15, \(v_{t-1}\) comes from the real or sham schedule. Afterwards both arms use the endogenous previous velocity from their evolving capsule histories.

## 5. Integrity checks

The outcome sweep is unsupported unless all checks pass:

1. the hash-recorded Carrier-003B runner and aggregate sources reproduce their recorded hashes;
2. the Carrier-003D assemblers reproduce generated runner SHA-256 `4a89285d5fdf9dc1510f381bc17be9194d09a562c4cea3078c4962d253d205ff` and aggregate SHA-256 `07faa44920f6c1cbba306e409c4b63f38fe741c3487835c4ae1f2fbf410688a2`;
3. repository type-checking passes after deterministic Carrier-003E assembly;
4. the original pure duality projection still reproduces the native engine update exactly;
5. `projectDualityAcceleration` reproduces
   \(a_t(c)=[D_{t+1}(c)-D_t]-[D_t-D_{t-1}]\)
   exactly across the frozen histories and candidate sequences;
6. Carrier-001 and the frozen capsule selector reproduce;
7. Carrier-003C active reference branches reproduce;
8. acceleration-off real and sham executions reproduce Carrier-003C exactly;
9. all fourteen shams preserve the fifteen-value slope multiset and exposure duration and are unique non-identity schedules;
10. candidate acceleration changes at least one exact reachable winner or admission decision relative to acceleration-off;
11. an independently executed rotation-7 reference is reproduced exactly inside the sweep;
12. the real-history projection receipt is identical across all fourteen rotations;
13. all fourteen sham projection receipts are distinct;
14. acceleration-on versus acceleration-off mechanistic receipts are identical across rotations.

Any failed check stops efficacy interpretation.

## 6. Mechanistic endpoints

### 6.1 Acceleration reachability

For the true schedule, compare the fixed Carrier-003C formula with acceleration off against the fixed Carrier-003E formula with acceleration on while pre-states match.

The preregistered reachability endpoint is:

\[
\boxed{N_{\mathrm{acceleration\ decisions}}>0}.
\]

The receipt records changed winners, changed admissions, accepted acceleration-induced actions, first divergence and reconvergence.

### 6.2 Chronology expression

For each rotation, compare true and sham acceleration branches while pre-states match. Every rotation records changed winners, changed admissions and accepted timing-induced actions.

Mechanistic influence does not establish usefulness.

## 7. Primary estimand

For matched pair \(j\), feedback state \(Z\), and rotation \(r\):

\[
\Delta_{j,Z}^{(r)}=Y_j(real,Z)-Y_j(sham_r,Z).
\]

Sham choice is averaged within each matched pair:

\[
\overline{\Delta}_{j,Z}
=
\frac{1}{14}\sum_{r=1}^{14}\Delta_{j,Z}^{(r)}.
\]

The primary estimand is:

\[
\overline{\Delta}_{Z=1}
=
\frac{1}{8}\sum_{j=1}^{8}\overline{\Delta}_{j,Z=1}.
\]

### Preregistered positive-usefulness criterion

Candidate-projected acceleration establishes useful repair information only if:

\[
\boxed{\overline{\Delta}_{Z=1}>0}
\]

and the two-sided 95% interval across the eight matched-pair ensemble effects lies entirely above zero.

No rotation-specific result can substitute for this criterion.

## 8. Secondary estimands

Carrier-003E also records:

\[
\overline{\Delta}_{Z=0},
\]

\[
\overline{\Delta}_{A\times Z}
=
\overline{\Delta}_{Z=1}-\overline{\Delta}_{Z=0},
\]

and state-specific contrasts between `M1-latched` and `M0-unlatched`.

These are secondary. Their signs are not preregistered.

## 9. Decision rule

- Positive primary interval with both mechanistic checks passed: Carrier-004 held-out generalisation becomes supported for this fixed acceleration formula.
- Negative primary interval: positive true-acceleration chronology usefulness closes for this fixed formula.
- Interval crossing zero: usefulness remains unestablished; no retrospective adjustment of \(w_v\) or \(w_a\) is permitted.
- Failed projection, neutrality or reachability check: no efficacy interpretation.

## 10. Claim boundary

Carrier-003E may establish that candidate-projected duality acceleration is reachable and that true prior-slope chronology has pair-generalised repair value against the complete cyclic-sham family.

It cannot establish consciousness, subjective memory, general intelligence, universal emergence or held-out generalisation.
