# EMERGE-KO-001 — Emergence Feedback Knockout Sandbox

Status: isolated research sandbox. Production simulation paths are unchanged.

## Research question

Does the measured emergence macro-state provide state-specific causal control over later structural recovery, rather than acting as a generic software switch?

The experiment separates the frozen measured state

\[
\widetilde{\mathcal E}\in\{0,1\}
\]

from the intervention switch

\[
Z\in\{0,1\}.
\]

It runs the four counterfactual cells:

| measured state | feedback | role |
|---:|---:|---|
| 0 | 0 | non-emergent control |
| 0 | 1 | forced-feedback control |
| 1 | 0 | emergence-feedback knockout |
| 1 | 1 | complete causal loop |

The primary difference-in-differences estimator is

\[
\Gamma_h=
\left[Y_h(\widetilde{\mathcal E}=1,Z=1)-Y_h(\widetilde{\mathcal E}=1,Z=0)\right]
-
\left[Y_h(\widetilde{\mathcal E}=0,Z=1)-Y_h(\widetilde{\mathcal E}=0,Z=0)\right].
\]

The current primary outcome is final recovery of the pre-lesion bridge multiset. A positive result means feedback is more effective in the measured-emergent checkpoint than in the non-emergent checkpoint.

## Relational lesion

`critical_bridge_permutation` is a seeded constrained permutation. It preserves:

\[
\Delta E_n=0,\qquad
\Delta H_1=0,\qquad
\Delta |S|=0,\qquad
\Delta N_{\mathcal O}=0,
\]

while requiring a relative bridge-rate reduction of at least \(\rho\).

The operator:

1. identifies active recognised cross-domain adjacencies;
2. ranks them by a fixed local criticality heuristic;
3. targets the top \(\lceil\rho |\mathcal B(S)|\rceil\);
4. shuffles the existing symbol indices;
5. rejects permutations that preserve any targeted glyph adjacency;
6. rejects permutations whose total bridge reduction is below \(\rho\);
7. emits a complete perturbation receipt.

No symbol is inserted, deleted, or replaced.

## Feedback channel

For candidate \(c\), the existing raw telic score is augmented only for winner selection:

\[
Q_t^{\mathrm{fb}}(c)=Q_t(c)+\kappa ZR_t(c),
\]

with

\[
R_t(c)=
a\Delta\Phi_t(c)
+b\Delta B_t(c)
-dL_t(c).
\]

Structural loss is measured against the exact pre-lesion bridge-signature multiset:

\[
L_t(c)=1-
\frac{|\mathcal B(c)\cap_m\mathcal B(S_{\mathrm{pre}})|}
{|\mathcal B(S_{\mathrm{pre}})|}.
\]

The existing proposal generator, raw telic scorer, deterministic tie-breaker, and Metropolis-like admission check are imported from the repository. The feedback term changes candidate selection only; admission still consumes the original `deltaScore`. This isolates macro-state steering from a generic acceptance boost.

## Paired randomness

For each checkpoint and replicate:

- both feedback branches receive the identical perturbed sequence;
- both branches begin from the same post-lesion seed;
- the only intended branch-level intervention is \(Z\).

The common random stream is exact at branch start. Once feedback changes a winning proposal, the symbolic states can diverge; state-dependent proposal paths may then consume random numbers differently. The receipt therefore records paired initial conditions and seeds rather than claiming permanent draw-for-draw identity after divergence.

## Checkpoints

The runner searches seeded baseline trajectories using:

\[
\theta=0.6,\qquad p=2.
\]

It selects:

- an emergent checkpoint at the recorded first `observerStep`;
- a non-emergent checkpoint before that latch from the same seeded trajectory;
- checkpoints with at least one active bridge, so the relational lesion is defined.

The observer result is frozen as the treatment-class label. The post-lesion feedback switch is independently intervened upon.

## Run

From the repository root:

```bash
npx tsx experiments/emerge-ko-001/run.ts
```

With explicit config and output paths:

```bash
npx tsx experiments/emerge-ko-001/run.ts \
  experiments/emerge-ko-001/config.example.json \
  experiments/emerge-ko-001/results/EMERGE-KO-001.json
```

The output contains:

- exact configuration;
- source checkpoint seeds, steps, sequences, dualities, coherence, and bridge rates;
- perturbation receipts;
- all four counterfactual cells;
- branch-level final states and recovery times;
- the computed \(\Gamma_h\).

## Interpretation

\[
\Gamma_h=0
\]

supports a state-independent or trivial switch at the measured resolution.

\[
\Gamma_h<0
\]

means feedback helps the non-emergent state more, or harms the emergent state: a macro-state mismatch.

\[
\Gamma_h>0
\]

means feedback has greater recovery efficacy in the measured-emergent state. Replication across held-out seeds and perturbation profiles is required before treating this as macro-state causal efficacy.

## Claim boundary

A successful run can support:

> The measured emergence macro-state has state-specific causal influence over subsequent symbolic structural recovery.

It does not, by itself, prove phenomenal consciousness, subjective experience, sentience, or a dynamical bifurcation.
