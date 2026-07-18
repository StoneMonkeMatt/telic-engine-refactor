# EMERGE-CARRIER-002 — Capsule Neutrality and Native-Path Reachability

Date: 17 July 2026
Status: completed staged carrier experiment
Branch: `agent/emerge-ko-001-sandbox`
Summary: **A memory channel can be perfectly wired and still remain silent when the dynamics never visit its doorway.**

## Experimental sequence

Carrier-002 was executed in two locked stages on the frozen V2.2 equal-wound substrate:

1. `Carrier-002A`: explicit state capsule with zero coupling;
2. `Carrier-002B`: active EMA-continuity carrier through the existing insertion duality-loss path.

The macro-history capsule was:

\[
M_t=(D_t^{EMA},p_t,\mathcal E_t,I_t,H_t^D).
\]

All capsules were reconstructed from their source trajectories and frozen before either stage ran.

V2.2 selector SHA-256:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Carrier capsule selector SHA-256:

```text
be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5
```

## Scale

- matched checkpoint pairs: **8**;
- symbolic microstates: **16**;
- frozen exact two-bridge lesions: **512**;
- zero-coupling comparisons against Carrier-001: **2,048**;
- total branch executions: **4,096**;
- active-carrier branches: **2,048**;
- accepted active-carrier transition receipts: **39,102**.

## Carrier-002A — passive carrier neutrality

Every zero-coupling capsule branch reproduced the corresponding Carrier-001 projection exactly:

\[
N_{neutral}=2048,
\qquad
N_{mismatch}=0.
\]

Therefore:

\[
\boxed{\Gamma_{002A}=0}.
\]

The explicit state capsule, its reconstruction, bounded history, updates and receipts introduced no dynamical observer effect.

## Carrier-002B — native insertion continuity path

The active carrier used the model-native EMA update:

\[
D_{t+1}^{EMA}(c)
=
D_t^{EMA}
+
0.2\left(\widehat D(c)-D_t^{EMA}\right).
\]

For insertion candidates only, the experiment replaced the memoryless raw-duality loss with the carried EMA-continuity loss. The replacement differential was applied equally to proposal score and admission delta so both selection and admission could observe the carrier.

The emergence declaration itself did not check the mechanism, and feedback strength remained:

\[
\kappa=0.25.
\]

## Result

All active and knockout cells were identical.

| Capsule | Active carrier | Feedback | n | Mean final target recovery |
|---|---:|---:|---:|---:|
| M0 unlatched | 0 | 0 | 512 | 0.3544921875 |
| M0 unlatched | 1 | 0 | 512 | 0.3544921875 |
| M1 latched | 0 | 0 | 512 | 0.3544921875 |
| M1 latched | 1 | 0 | 512 | 0.3544921875 |
| M0 unlatched | 0 | 1 | 512 | 0.7861328125 |
| M0 unlatched | 1 | 1 | 512 | 0.7861328125 |
| M1 latched | 0 | 1 | 512 | 0.7861328125 |
| M1 latched | 1 | 1 | 512 | 0.7861328125 |

The estimators were:

\[
\Gamma_{A,Z=0}=0,
\qquad
\Gamma_{A,Z=1}=0,
\qquad
\Gamma_{M\times A\times Z}=0.
\]

Every pair-level effect was exactly zero, giving intervals `[0,0]`.

## Reachability diagnosis

The active mechanism did not receive a single opportunity to act:

- insertion candidates generated: **0**;
- carrier-adjusted candidates: **0**;
- carrier-changed winners: **0**;
- accepted carrier-induced decisions: **0**;
- active/knockout state divergences: **0**.

All **39,102** accepted active-branch transitions were:

```text
swap
```

The length-10 equal-wound substrate remained on the `none ↔ swap` surface. It never entered the shorter-sequence states in which insertion proposals become available.

Thus the exact null does not test whether retained history can influence reachable repair decisions. It establishes:

\[
\boxed{
\text{The state capsule is neutral, but the chosen insertion-only carrier path is unreachable on this substrate.}
}
\]

This agrees with the V2.1 trajectory audit, which found that the causal action boundary was `none ↔ swap`, not insertion.

## Scientific classification

Carrier-002 supports four statements:

1. full capsule plumbing is passive and deterministic at zero coupling;
2. reconstructed macro-history can be carried and updated without disturbing the baseline;
3. the existing insertion-only duality-loss path is structurally silent in the equal-wound experiment;
4. no inference about history efficacy follows from an active mechanism that received zero candidate exposure.

The correct result is:

\[
\boxed{
\text{carrier interface validated; insertion carrier unreachable; macro-history efficacy still untested.}
}
\]

# Bench plan

## EMERGE-CARRIER-002C — Reachable Hold/Swap Continuity Carrier

Extend the same native continuity loss to every reachable candidate action rather than insertion alone:

\[
L_D(c;M_t)
=
\max\left(0,
D_t^{EMA}-D_{t+1}^{EMA}(c)
\right).
\]

Use the existing duality-loss coefficient:

\[
w_D=0.5.
\]

No coefficient sweep is permitted on the confirmatory run.

The carrier remains a loss of duality continuity, not an emergence declaration bonus:

- no `if E=1` check;
- no change to \(\kappa\);
- no forced mutation;
- same two-bridge wounds;
- same microstates, targets and random streams.

### Primary mechanistic endpoint

Does the active carrier change any exact tie-resolved `none ↔ swap` winner or admission decision?

\[
N_{carrier\ decisions}>0.
\]

No directional recovery sign is preregistered.

### Recovery estimators

For each feedback state:

\[
\Gamma_{A,Z}
=
[Y(M_1,A_1,Z)-Y(M_1,A_0,Z)]
-
[Y(M_0,A_1,Z)-Y(M_0,A_0,Z)].
\]

The feedback-specific interaction is:

\[
\Gamma_{M\times A\times Z}
=
\Gamma_{A,Z=1}-\Gamma_{A,Z=0}.
\]

The unit of generalisation remains the matched checkpoint pair.

## EMERGE-CARRIER-003 — Real History vs Equal-Distribution Sham

Proceed only if 002C demonstrates a reachable, functioning carrier.

- real history: true ordered capsule trajectory;
- sham history: the same capsule values yoked or permuted across time;
- equal marginal distribution;
- equal duration and total exposure;
- only temporal alignment differs.

Primary timing test:

\[
Y_{real\ history}>Y_{sham\ history}.
\]

## EMERGE-CARRIER-004 — Held-Out Generalisation

A successful real-vs-sham mechanism must then replicate across unseen seeds, fresh microstates, fresh lesions, held-out inventories and ontology perturbation profiles.

## Ordered sequence

\[
\boxed{
\text{002A neutral capsule}
\rightarrow
\text{002B unreachable insertion path}
\rightarrow
\text{002C reachable hold/swap carrier}
\rightarrow
\text{003 real vs sham timing}
\rightarrow
\text{004 held-out generalisation}
}
\]

## Artifact receipt

GitHub Actions workflow run: `29568090469`
Workflow artifact: `EMERGE-CARRIER-002-results`
Artifact SHA-256:

```text
f1dcbfd628ffc0e3a2f24c0324e0c37655c3dd66e9bd2ac03cf98a4b78e32ab3
```

The artifact contains:

- frozen reconstructed capsules;
- the exact executed Carrier-002 source;
- full branch summary;
- compressed accepted-transition trace;
- manifest and checksums.
