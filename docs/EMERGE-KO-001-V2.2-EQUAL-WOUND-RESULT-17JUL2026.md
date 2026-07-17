# EMERGE-KO-001 V2.2 — Equal Wound / Needle Repair

Date: 17 July 2026  
Status: completed matched-panel causal experiment  
Branch: `agent/emerge-ko-001-sandbox`  
Crown line: **Same wound. Same needle. Different state. Measure which one heals.**

## Experimental boundary

V2.2 retained the constant feedback law:

\[
Q_t^{\mathrm{fb}}(c)=Q_t(c)+\kappa ZR_t(c),\qquad \kappa=0.25.
\]

No emergence threshold gate was introduced.

The selector executed before either treatment condition. It froze:

- eight matched emergent/non-emergent checkpoint pairs;
- two uniquely identifiable target bridges per checkpoint;
- 32 exact lesions per checkpoint;
- all perturbation and branch seeds;
- a SHA-256 receipt over the frozen panel.

Selector SHA-256:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Every lesion began with:

\[
Y_0=0,
\]

and the primary endpoint was:

\[
Y_h=\frac{\text{two target bridge signatures restored at }h=100}{2}.
\]

Thus every cell used the same outcome scale:

\[
Y\in\left\{0,\frac12,1\right\}.
\]

The panel contained 512 frozen lesions and the treatment stage executed 1,024 counterfactual branches.

## Aggregate cells

| Measured state | Feedback | n | Mean final target recovery | Full-recovery rate |
|---|---:|---:|---:|---:|
| Non-emergent | 0 | 256 | 0.34765625 | 0.37890625 |
| Non-emergent | 1 | 256 | 0.74218750 | 0.61328125 |
| Emergent | 0 | 256 | 0.361328125 | 0.33593750 |
| Emergent | 1 | 256 | 0.830078125 | 0.61328125 |

The feedback effects were:

\[
\Delta Y_{\widetilde{\mathcal E}=0}
=0.7421875-0.34765625
=0.39453125,
\]

\[
\Delta Y_{\widetilde{\mathcal E}=1}
=0.830078125-0.361328125
=0.46875.
\]

Therefore:

\[
\Gamma_h
=0.46875-0.39453125
=\boxed{0.07421875}.
\]

## Pair-level uncertainty

The matched checkpoint pair was treated as the unit of generalisation.

\[
SE_{\mathrm{pair}}=0.0596263184.
\]

Using a two-sided 95% t interval with seven degrees of freedom:

\[
95\%\ \text{interval}
=[-0.0667975,\ 0.2152350].
\]

The interval crosses zero. Equal-wound state-specific causal efficacy is not established.

## Pair effects

| Pair | Match tier | Mean \(\Gamma_{h,j}\) |
|---|---|---:|
| pair-01 | same bridge count | -0.187500 |
| pair-02 | same bridge count | -0.140625 |
| pair-03 | same bridge count | +0.234375 |
| pair-04 | same bridge count | +0.140625 |
| pair-05 | same bridge count | +0.250000 |
| pair-06 | same bridge count | -0.015625 |
| pair-07 | same bridge count | +0.125000 |
| pair-08 | same bridge count | +0.187500 |

Five of eight pairs were positive. Three were negative. The median pair effect was positive:

\[
\operatorname{median}(\Gamma_{h,j})=0.1328125.
\]

These values are descriptive and do not replace the preregistered pair-level interval.

## What changed from V2.1

V2.1 used unequal target sizes and returned:

\[
\Gamma_h=-0.0677083.
\]

V2.2 removed that unequal target normalization and returned:

\[
\Gamma_h=+0.07421875.
\]

The sign reversal supports the V2.1 diagnosis that the earlier negative interaction was materially influenced by unequal recovery leverage. It does not by itself establish a positive macro-state effect.

## Additional dynamics

Feedback changed the selected winner on average:

\[
1.78515625
\]

times per non-emergent branch and:

\[
2.6015625
\]

times per emergent branch.

The emergent checkpoint class therefore exposed more decisions to feedback steering under the equal-wound design. Sparse path-dependent interventions remained the operative mechanism.

## Important classification detail

A non-emergent checkpoint means that the executable persistence declaration had not fired. Several non-emergent checkpoints had instantaneous duality above \(\theta=0.6\), but had not satisfied the required persistence history. V2.2 therefore compares declared macro-state classes, not merely one-step values above and below the scalar threshold.

## Scientific conclusion

V2.2 supports four statements:

1. The exact-wound selector and treatment boundary worked as designed.
2. Feedback strongly improved target-bridge recovery in both measured states.
3. Removing unequal target normalization changed the interaction from negative to positive.
4. The positive panel mean remains uncertain because the pair-level interval crosses zero.

The correct verdict is:

\[
\boxed{\text{directional positive evidence; state-specific efficacy not yet established.}}
\]

## Next experiment

The clean next test is the retained-macro-history twin:

\[
S_t^{(0)}=S_t^{(1)},
\qquad
M_t^{(0)}\ne M_t^{(1)}.
\]

It should preserve the same symbolic microstate, lesion, target bridges and random stream while retaining different EMA/persistence histories. That experiment removes the remaining microstate mismatch from the causal comparison.

## Artifact receipt

GitHub Actions workflow run: `29563428289`  
Workflow artifact: `EMERGE-KO-001-v2.2-results`  
Artifact SHA-256:

```text
3431b6c0ec66846819ac73e410a8d2ad5878c3f3bf0ae43cc8a9e0fb0975d043
```
