# EMERGE-KO-001 V2.1 Trajectory Audit

Date: 17 July 2026  
Status: completed diagnostic audit  
Branch: `agent/emerge-ko-001-sandbox`  
Causal dynamics: unchanged from audited v2

## Validity receipt

The V2.1 harness reran the 32-replicate v2 experiment and captured every decision frontier without changing the causal process.

CI verified exact equality between v2 and v2.1 for:

- checkpoint selection;
- all four aggregate cells;
- every branch's final sequence and recovery outcome;
- replicate-level gamma values;
- gamma, standard error, and descriptive interval.

The trace contains 128 branches, 64 paired feedback comparisons, and 12,800 step records.

| receipt field | value |
|---|---:|
| Uncompressed trace | 40,604,406 bytes |
| Compressed JSONL | 1,245,940 bytes |
| Compression ratio | 0.0306848 |
| Trace SHA-256 | `756bd2496a6ec98f31c2909c226053cf6b2afda7e7af02a9be376f80c65dabe8` |
| Workflow artifact SHA-256 | `7a0cf95ad87a52f9bc465acf633f0fc591965ec5a1a07f856eccbd28132137a1` |

## Preregistered v2 outcome remains unchanged

\[
\Gamma_h=-0.0677083
\]

\[
95\%\text{ descriptive interval}=[-0.241792,\ 0.106375].
\]

The interval crosses zero. State-specific macro-state causal efficacy is not established.

## Finding 1 — unequal target normalization is active inside the controller

The non-emergent checkpoint has two target bridges. The emergent checkpoint has three.

Before the paired branches first diverged, the emergent frontier actually contained more proposals that improved target overlap:

| pre-divergence frontier measure | non-emergent | emergent |
|---|---:|---:|
| Overlap-improving proposals per step | 0.04762 | 0.07491 |
| Overlap-improving proposal rate | 1.190% | 1.873% |
| Positive-\(R_t\) proposals per step | 0.08608 | 0.03870 |
| Positive-\(R_t\) proposal rate | 2.152% | 0.968% |

Thus the emergent state did not simply lack bridge-repair opportunities. It had more overlap-improving candidates, but fewer were scored as positive recovery actions.

The cause is the fractional loss term:

\[
L_t(c)=1-Y_t(c).
\]

One recovered bridge changes overlap by \(1/2\) in the two-bridge target but only \(1/3\) in the three-bridge target. The controller therefore assigns less marginal recovery leverage to the same one-bridge repair in the emergent condition.

At the first state divergence, the mean recovery-score advantage of the feedback winner was:

\[
0.10809\quad\text{non-emergent},
\]

\[
0.06789\quad\text{emergent}.
\]

With \(\kappa=0.25\), these became mean feedback-selection margins of approximately \(0.02494\) and \(0.01666\), respectively.

## Finding 2 — the first causal act is a timing decision

Sixty-one of the 64 paired comparisons diverged:

| measured state | diverged pairs | median first divergence | range |
|---|---:|---:|---:|
| Non-emergent | 29/32 | step 23 | 5–97 |
| Emergent | 32/32 | step 19.5 | 1–81 |

Every first divergence was a switch between `none` and `swap`.

No first divergence involved two different accepted mutations. Exactly one branch moved while the other held:

- feedback moved while control held: 15 non-emergent, 14 emergent;
- feedback held while control moved: 14 non-emergent, 18 emergent.

The feedback channel's first functional role is therefore not direct bridge construction. It alters the timing of whether a swap is taken. That single hold-or-move decision then redirects the later trajectory.

## Finding 3 — path dependence is strong and reconvergence is rare

The exact tie-resolved feedback winner differed from the raw winner 106 times in the non-emergent cells and 135 times in the emergent cells. Only 23 and 26 of those changed winners were admitted.

| state | exact winner changes | accepted changed winners | accepted per branch |
|---|---:|---:|---:|
| Non-emergent | 106 | 23 | 0.71875 |
| Emergent | 135 | 26 | 0.81250 |

Most steering attempts are neutralized by the admission layer. Nevertheless, one accepted or prevented swap is often enough to cause persistent trajectory separation.

Reconvergence was uncommon:

- four reconvergence events across non-emergent pairs;
- six reconvergence events across emergent pairs;
- only nine of 64 pairs reconverged at least once.

This supports the topological-turning-point hypothesis: sparse decisions have long downstream reach.

## Finding 4 — the sign is not robust to the outcome scale

The preregistered fractional-overlap estimator remains the authoritative v2 result. Two post-hoc diagnostics expose the normalization sensitivity:

### Absolute recovered-bridge count

\[
\Gamma_h^{\mathrm{count}}=+0.1875\text{ bridges}
\]

\[
95\%\text{ descriptive interval}=[-0.22937,\ 0.60437].
\]

### Recovery normalized by bridges actually available to repair

\[
\Gamma_h^{\mathrm{damage}}=-0.03125
\]

\[
95\%\text{ descriptive interval}=[-0.21471,\ 0.15221].
\]

Both intervals cross zero. These diagnostics do not replace the preregistered endpoint, but they show that the small negative sign is not stable under reasonable difficulty corrections.

## Scientific conclusion

V2.1 supports three statements:

1. The feedback mechanism is genuinely causal at sparse topological turning points.
2. The current recovery functional and outcome normalization favour the two-bridge target.
3. Topological rigidity is not yet established as the explanation for the emergent state's lower fractional-overlap gain.

The clean next experiment is a preregistered difficulty-matched design with equal target-bridge counts and an outcome normalized by the number of bridges actually destroyed by the lesion. The constant \(\kappa\) feedback law should remain unchanged for that test.

The retained-macro-history twin experiment follows after the difficulty-matched result.
