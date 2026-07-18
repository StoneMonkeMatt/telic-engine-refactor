# EMERGE-CARRIER-003C — Native Projected Signed-Slope Verification

Date: 17 July 2026
Status: preregistered before outcome execution
Branch: `agent/emerge-ko-001-sandbox`
Summary: **A remembered level becomes directional control only when each possible move is judged by where it would carry the system next.**

## Question

Does the model-native, candidate-projected signed duality velocity change any reachable `hold ↔ swap` winner or admission decision while preserving the exact passive trajectory boundary?

Carrier-003B established that temporal order changes decisions across every cyclic sham, but the existing EMA-level continuity carrier did not convert true chronology into a pair-generalised repair advantage. Carrier-003C changes the carrier mechanism, not the substrate: it exposes the direction already latent in the native Telos duality update.

## Frozen substrate

Carrier-003C inherits without refitting:

- the frozen V2.2 matched panel;
- 8 independent matched checkpoint pairs;
- 16 symbolic microstates;
- 512 exact two-bridge wounds;
- the Carrier-002 macro-history capsules;
- the same proposal frontier, tie resolver, admission formula, lesions and branch random streams;
- repair feedback `kappa = 0.25`;
- duality weight `w_D = 0.5`;
- no emergence declaration bonus;
- no forced mutation;
- no coefficient sweep.

## Native projected duality formula

For candidate sequence `c`, the existing Telos force is:

\[
F(c)=\lambda C(c)+\eta N(c)+\epsilon,
\]

with the frozen native parameters:

\[
\lambda=0.618,
\qquad
\eta=0.3,
\qquad
\epsilon=0.05.
\]

The native target duality is:

\[
T_D(c)
=
\min\left(1,
\widehat D(c)\left[1+0.2F(c)\right]
\right).
\]

The candidate-projected next smoothed duality is:

\[
D_{t+1}^{EMA}(c)
=
\operatorname{clamp}_{[0,1]}
\left(
D_t^{EMA}+0.2[T_D(c)-D_t^{EMA}]
\right).
\]

The signed candidate velocity is:

\[
v_t(c)=D_{t+1}^{EMA}(c)-D_t^{EMA}.
\]

Positive velocity moves candidate state upward relative to the carried structural state; negative velocity moves it downward.

## Ranking intervention

The existing duality coefficient remains:

\[
w_D=0.5.
\]

For reachable non-insertion candidates:

\[
R_t^{A=1}(c)
=
R_t^{A=0}(c)+w_Dv_t(c).
\]

The baseline insert score already contains the raw-duality penalty:

\[
-w_D L_{raw}(c),
\qquad
L_{raw}(c)=\max(0,\widehat D(S_t)-\widehat D(c)).
\]

For insert candidates, Carrier-003C removes that raw-level term before applying signed native velocity:

\[
R_t^{A=1}(c)
=
R_t^{A=0}(c)+w_D[L_{raw}(c)+v_t(c)].
\]

Thus the experiment replaces raw static duality control rather than double-counting it.

## Capsule evolution

After every accepted transition, both active and knockout branches update the capsule through the same native projected duality formula. Carrier activation changes ranking only. Capsule carriage and evolution are therefore matched across the intervention arms until their symbolic trajectories diverge.

## Integrity checks

Before an active result is admitted:

1. the pure `projectDualityUpdate` implementation must exactly reproduce the engine's native `updateDuality` outputs across seeded accepted and held trajectories;
2. the frozen V2.2 selector and Carrier-002 capsule receipts must verify;
3. Carrier-001 must reproduce;
4. with slope activation disabled, all 2,048 capsule-bearing projections must reproduce Carrier-001 byte-for-byte;
5. exact tie-resolved winners must agree with the selector output.

Any failed check aborts interpretation.

## Primary mechanistic endpoint

Carrier-003C passes reachability only if:

\[
N_{slope\ decisions}>0,
\]

where a slope decision is an exact paired change in winner, admission, or an accepted non-hold action while active and knockout branches still share the same pre-state.

The run reports:

- candidate exposure by action;
- non-zero slope adjustments by action;
- maximum absolute adjustment;
- changed exact winners;
- changed admissions;
- accepted slope-induced actions;
- `hold → swap`, `swap → hold`, and different-swap changes;
- first divergence and reconvergence;
- recovery and coherence.

## Recovery boundary

No directional recovery sign is preregistered. Recovery estimators remain secondary:

\[
\Gamma_{A,Z=0},
\qquad
\Gamma_{A,Z=1},
\qquad
\Gamma_{M\times A\times Z}.
\]

A mechanistic pass does not establish usefulness.

## Decision rule

- **Projection mismatch:** implementation rejected.
- **Neutrality mismatch:** experiment rejected.
- **No changed reachable decision:** slope carrier not mechanically expressed; no sham sweep.
- **Changed reachable decisions:** native signed-slope carrier established as executable; Carrier-003D complete-sham slope timing control becomes supported.
- **Recovery interval excluding zero:** recorded according to its sign, but still requires complete-sham timing control before any usefulness claim.

## Next check

Only a passing Carrier-003C opens:

# EMERGE-CARRIER-003D — Complete-Sham Native Slope Audit

Carrier-003D will compare true signed historical direction against all fourteen cyclic sham schedules, averaging sham choice within each of the eight independent matched pairs.

## Executable receipts

Base Carrier-002C runner SHA-256:

```text
f2169f7a1f03ef599cdbfffd0f99d8dae3f532bea80fcb842ec60240beb46592
```

Pure projection source SHA-256:

```text
c518ad57997f38752a3782f93bce9117b487ad3c431033ac5e50490da70c9983
```

Projection-equivalence verifier SHA-256:

```text
b1e4dcb280b7a427c631d948d77bba2844e528e883a2233178b5fa0072a6c1ec
```

Deterministic Carrier-003C assembler SHA-256:

```text
af09a2cd969d78cd2a0e5c1b1fbbaeac14a0bf9aa2fad958ecebfeaa156ddbaa
```
