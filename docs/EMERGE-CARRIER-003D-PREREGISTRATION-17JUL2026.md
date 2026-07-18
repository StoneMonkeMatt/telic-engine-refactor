# EMERGE-CARRIER-003D — Complete-Sham Native Slope Audit Preregistration

Date: 17 July 2026
Status: preregistered before outcome execution
Branch: `agent/emerge-ko-001-sandbox`

> **Carrier-003D asks whether the true ordering of model-native directional history contains useful repair information, not merely whether directional history can alter behaviour.**

## 1. Background

Carrier-003C established that the existing Telos duality formula can be projected before selection and used as a signed candidate velocity:

\[
v_t(c;h_t)
=
D_{t+1}^{EMA}(c;h_t)-h_t.
\]

At fixed coefficient \(w_v=0.5\), that signal changed reachable winners, admissions, accepted actions and trajectories while activation-off branches reproduced the passive reference exactly.

Carrier-003C did not establish recovery usefulness. Carrier-003D is the complete cyclic-sham control required before held-out generalisation.

## 2. Frozen substrate

Carrier-003D inherits without modification:

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
- no coefficient sweep.

The matched checkpoint pair remains the inferential unit. Replicates and rotations improve measurement but are not treated as independent scientific substrates.

## 3. Native directional formula

For candidate \(c\) and the active history anchor \(h_t\):

\[
F(c)=0.618C(c)+0.3N(c)+0.05,
\]

\[
T_D(c)
=
\min\left(
1,
\widehat D(c)[1+0.2F(c)]
\right),
\]

\[
D_{t+1}^{EMA}(c;h_t)
=
\operatorname{clamp}_{[0,1]}
\left(
h_t+0.2[T_D(c)-h_t]
\right),
\]

\[
v_t(c;h_t)
=
D_{t+1}^{EMA}(c;h_t)-h_t.
\]

For reachable non-insertion candidates:

\[
R_t^{active}(c)
=
R_t^{base}(c)+0.5v_t(c;h_t).
\]

For insertion candidates, the existing raw-duality loss is removed before the same signed velocity term is applied:

\[
R_t^{active}(c)
=
R_t^{base}(c)
+
0.5[L_{raw}(c)+v_t(c;h_t)].
\]

No other score, feedback or admission term changes.

## 4. Real and sham schedules

For each frozen capsule, define a normalized sixteen-value history:

\[
H=(h_1,h_2,\ldots,h_{15},h_{16}),
\qquad
h_{16}=D_0^{EMA}.
\]

Short histories are left-padded with their earliest available value.

The real arm receives \(H\) in its recorded order.

For every non-zero cyclic rotation:

\[
r\in\{1,2,\ldots,14\},
\]

the sham arm receives:

\[
H^{(r)}
=
(h_{1+r},\ldots,h_{15},h_1,\ldots,h_r,h_{16}),
\]

with indices taken over the first fifteen values only.

Thus real and sham preserve exactly:

- the same history-value multiset;
- sixteen exposure steps;
- the same terminal anchor;
- the same capsule identity;
- the same microstate, wound, targets and random stream.

Only temporal ordering changes.

During steps \(1\) through \(16\), \(h_t\) is supplied by the real or sham schedule. After step \(16\), both arms use their endogenous Carrier-003C capsule state.

## 5. Integrity checks

The active rotation sweep is unsupported unless all checks pass:

1. the assembled Carrier-003B base runner has SHA-256
   `5c1f2fe37979ed500db7eb482d30a43b0a6121b791df051db7e42a73e55689ea`;
2. the assembled Carrier-003B aggregate base has SHA-256
   `df10a6501be5156fa6466f96e778388ece75f4b49b23ad2a79bdb76e6c8413b6`;
3. the Carrier-003C generated runner reproduces SHA-256
   `b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a`;
4. the committed Carrier-003D runner assembler has Git blob SHA
   `dca6a31d4271b40982f29cf985dd9fd490ae73cd`;
5. the committed Carrier-003D aggregate assembler has Git blob SHA
   `9c18198e2639d85aec13c863d18bda3dff969925`;
6. the committed pure duality projection has Git blob SHA
   `2e92f8018678c5f838fbfe717a58c7605a83bf7c`;
7. repository type-checking passes after deterministic assembly;
8. the pure duality projection still reproduces the native engine update exactly;
9. Carrier-001 and the frozen capsule selector reproduce;
10. activation-off real and sham schedules reproduce the active Carrier-003C reference exactly;
11. all fourteen shams preserve multiset, duration and terminal anchor and are unique non-identity schedules;
12. an independently executed rotation-7 reference is reproduced exactly by rotation 7 inside the sweep;
13. the real-history projection receipt is identical across all fourteen rotations;
14. all fourteen sham projection receipts are distinct.

Any failed check stops interpretation.

## 6. Primary estimand

For matched pair \(j\), feedback state \(Z\), and rotation \(r\):

\[
\Delta_{j,Z}^{(r)}
=
Y_j(real,Z)-Y_j(sham_r,Z).
\]

Sham choice is averaged within each matched pair:

\[
\overline{\Delta}_{j,Z}
=
\frac{1}{14}
\sum_{r=1}^{14}
\Delta_{j,Z}^{(r)}.
\]

The primary estimand is:

\[
\overline{\Delta}_{Z=1}
=
\frac{1}{8}
\sum_{j=1}^{8}
\overline{\Delta}_{j,Z=1}.
\]

### Preregistered positive-usefulness criterion

True signed-slope chronology establishes useful repair information only if:

\[
\boxed{
\overline{\Delta}_{Z=1}>0
}
\]

and the two-sided 95% interval across the eight matched-pair ensemble effects lies entirely above zero.

No rotation-specific result can substitute for this criterion.

## 7. Secondary estimands

Carrier-003D also records:

\[
\overline{\Delta}_{Z=0},
\]

\[
\overline{\Delta}_{T\times Z}
=
\overline{\Delta}_{Z=1}
-
\overline{\Delta}_{Z=0},
\]

and state-specific timing contrasts between `M1-latched` and `M0-unlatched`.

These are secondary. Their signs are not preregistered.

## 8. Mechanistic endpoint

Each rotation must record exact real-versus-sham differences while branches share the same pre-state:

- changed winner;
- changed admission;
- accepted timing-induced action;
- `hold → swap`;
- `swap → hold`;
- `swap → different swap`;
- first divergence;
- reconvergence.

The mechanistic endpoint is:

\[
N_{\mathrm{slope\ timing\ decisions}}>0.
\]

Mechanistic influence does not by itself establish usefulness.

## 9. Decision rule

- Positive primary interval: Carrier-004 held-out generalisation becomes supported.
- Negative primary interval: positive true-slope chronology usefulness is closed for this fixed formula.
- Interval crossing zero: usefulness remains unestablished; no retrospective coefficient rescue is permitted.
- Any failed integrity or reachability check: no efficacy interpretation.

## 10. Claim boundary

Carrier-003D may establish that true signed-slope chronology has pair-generalised repair value against the complete cyclic-sham family.

It cannot establish consciousness, subjective memory, general intelligence, universal emergence, or held-out generalisation.
