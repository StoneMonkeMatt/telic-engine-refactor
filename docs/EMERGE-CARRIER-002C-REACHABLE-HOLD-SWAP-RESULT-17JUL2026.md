# EMERGE-CARRIER-002C — Reachable Hold/Swap Continuity Carrier

Date: 17 July 2026
Status: completed mechanistic carrier experiment
Branch: `agent/emerge-ko-001-sandbox`
Summary: **The system remembered what it had become, and that memory changed whether it held or moved.**

## Question

Does the retained macro-history capsule change any reachable `hold ↔ swap` winner or admission decision when the native EMA continuity loss is applied without an emergence check, feedback-strength change, forced mutation, or coefficient sweep?

The preregistered mechanistic endpoint was:

\[
N_{carrier\ decisions}>0.
\]

No directional recovery sign was preregistered.

## Frozen boundary

V2.2 selector SHA-256:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Carrier capsule selector SHA-256:

```text
be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5
```

The carrier used:

\[
D_{t+1}^{EMA}(c)
=
D_t^{EMA}
+
0.2\left(\widehat D(c)-D_t^{EMA}\right),
\]

\[
L_D(c;M_t)
=
\max\left(0,D_t^{EMA}-D_{t+1}^{EMA}(c)\right),
\]

with the fixed coefficient:

\[
w_D=0.5.
\]

For insertion candidates the carried loss replaced the existing raw-duality loss. For reachable non-insertion candidates it entered as the same continuity penalty. The repair feedback formula remained fixed at:

\[
\kappa=0.25.
\]

## Scale and neutrality

- matched checkpoint pairs: **8**;
- symbolic microstates: **16**;
- frozen exact two-bridge lesions: **512**;
- zero-coupling comparisons: **2,048**;
- zero-coupling mismatches: **0**;
- total branch executions: **4,096**;
- active-carrier branches: **2,048**;
- accepted active-transition receipts: **39,052**.

Thus the passive carrier boundary remained exact:

\[
N_{neutral}=2048,
\qquad
N_{mismatch}=0.
\]

## Mechanistic result

The carrier was fully exposed to the reachable frontier:

| Action | Candidate exposures | Non-zero carrier adjustments |
|---|---:|---:|
| hold | 204,800 | 72,812 |
| delete | 204,800 | 79,698 |
| swap | 204,800 | 156,139 |
| combine | 204,800 | 120,460 |

Total non-zero candidate adjustments:

\[
N_{adjusted}=429109.
\]

Maximum absolute candidate adjustment:

\[
\max |\Delta R_{carrier}|=0.03280407396.
\]

Across exact paired comparisons while both branches still shared the same pre-state:

- comparable pre-state decisions: **18,963**;
- carrier-changed exact winners: **1,992**;
- carrier-changed admission decisions: **1,275**;
- accepted carrier-induced actions: **1,603**;
- `hold → swap`: **576**;
- `swap → hold`: **492**;
- `swap → different swap`: **924**;
- other winner changes: **0**;
- active branches with state divergence: **1,930**;
- active branches that reconverged: **49**;
- reconvergence events: **63**.

Therefore:

\[
\boxed{N_{carrier\ decisions}>0}
\]

and the preregistered mechanistic endpoint passed decisively.

## Recovery cells

| Capsule | Carrier | Feedback | n | Mean target recovery | Mean coherence |
|---|---:|---:|---:|---:|---:|
| M0 unlatched | 0 | 0 | 512 | 0.3544921875 | 0.6838381410 |
| M0 unlatched | 1 | 0 | 512 | 0.3642578125 | 0.6833433494 |
| M1 latched | 0 | 0 | 512 | 0.3544921875 | 0.6838381410 |
| M1 latched | 1 | 0 | 512 | 0.3662109375 | 0.6843589744 |
| M0 unlatched | 0 | 1 | 512 | 0.7861328125 | 0.6817548077 |
| M0 unlatched | 1 | 1 | 512 | 0.8017578125 | 0.6771454327 |
| M1 latched | 0 | 1 | 512 | 0.7861328125 | 0.6817548077 |
| M1 latched | 1 | 1 | 512 | 0.7929687500 | 0.6781610577 |

## Recovery estimators

\[
\Gamma_{A,Z=0}=+0.001953125,
\]

with pair-level 95% interval:

\[
[-0.0284370694,\ 0.0323433194].
\]

\[
\Gamma_{A,Z=1}=-0.0087890625,
\]

with pair-level 95% interval:

\[
[-0.0357088996,\ 0.0181307746].
\]

The three-way interaction was:

\[
\Gamma_{M\times A\times Z}=-0.0107421875,
\]

with pair-level 95% interval:

\[
[-0.0322490230,\ 0.0107646480].
\]

Every recovery interval crosses zero.

## Pair effects

| Pair | \(\Gamma_{A,Z=0}\) | \(\Gamma_{A,Z=1}\) | Three-way interaction |
|---|---:|---:|---:|
| pair-01 | +0.046875 | +0.015625 | -0.031250 |
| pair-02 | 0 | 0 | 0 |
| pair-03 | +0.031250 | -0.015625 | -0.046875 |
| pair-04 | +0.0234375 | -0.0078125 | -0.031250 |
| pair-05 | +0.0078125 | 0 | -0.0078125 |
| pair-06 | -0.0390625 | -0.015625 | +0.0234375 |
| pair-07 | +0.0078125 | +0.031250 | +0.0234375 |
| pair-08 | -0.062500 | -0.078125 | -0.015625 |

## Scientific conclusion

\[
\boxed{
\text{Retained macro-history is now an executable and reachable causal state in the experimental transition kernel.}
}
\]

Carrier-002C establishes that the remembered EMA state changes reachable proposal rankings, admissions, accepted actions, and subsequent trajectories. This is a mechanistic causal result under the implemented carrier intervention.

It does **not** establish that the `M1` history improves repair more than `M0`, nor that feedback selectively amplifies a history-specific recovery benefit. The recovery interactions remain small and their matched-pair intervals cross zero.

The correct result is:

\[
\boxed{
\text{functioning macro-history carrier established; state-specific recovery efficacy not established.}
}
\]

This distinction is essential. The experiment has crossed from descriptive memory to executable memory, but it has not yet shown that the true temporal history is useful rather than merely influential.

## Next experiment

The next supported test is:

# EMERGE-CARRIER-003 — Real History vs Equal-Distribution Sham

Compare the true ordered capsule trajectory against a sham trajectory with:

- the same marginal capsule values;
- the same duration;
- the same total exposure;
- the same microstate, wound, targets, feedback and random stream;
- only temporal alignment changed.

The key question becomes:

\[
\boxed{
\text{Does the timing of remembered history contain useful control information?}
}
\]

## Artifact receipt

GitHub Actions workflow run: `29572723082`
Workflow artifact: `EMERGE-CARRIER-002C-results`
Artifact SHA-256:

```text
4cf869f339b49822c61a4c2378f552dcbe8a7e5e2e54ff0052a0225098e44e49
```
