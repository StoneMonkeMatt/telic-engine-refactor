# Mathematics Ledger: The Compass of Emergent Causality

> **The mathematics defines the causal claim; the experiment earns the right to make it.**

Date established: 17 July 2026  
Last updated: 17 July 2026 — after EMERGE-CARRIER-002C  
Status: canonical live mathematics ledger  
Experiment bench: `experiments/emerge-ko-001/`  
Branch: `agent/emerge-ko-001-sandbox`

This document is the canonical mathematical source of truth for the `emerge-ko-001` bench. The runners are executable implementations. Dated result documents are immutable scientific records. Actions artifacts contain raw selectors, receipts and traces. This ledger states what the evidence currently permits us to claim.

---

## 0. Record-Keeping Doctrine

1. **Evidence remains chronological.** Earlier findings are not rewritten after later discoveries.
2. **Invalid, null, inconclusive, directional, mechanistic and established results remain distinct.**
3. **Reachability precedes efficacy.** A mechanism that receives zero candidate exposure cannot test causal usefulness.
4. **Influence is not usefulness.** A state may alter decisions without improving the scientific outcome.
5. **The matched checkpoint pair is the unit of generalisation.** Replicates improve precision but do not create independent substrates.
6. **Experimental changes are staged.** Neutral plumbing precedes active coupling; active coupling precedes timing controls; timing controls precede held-out generalisation.
7. **The ledger advances with the bench.** Every completed experiment updates the evidence ladder, claim boundary, active queue and receipt index.

---

## 1. Core Mathematical Objects

### 1.1 Symbolic microstate

\[
S_t=[s_{t,1},s_{t,2},\ldots,s_{t,n}],
\qquad
s_{t,i}\in\mathcal L_{\mathrm{CODEX}}.
\]

Order matters because bridge activation, transition coherence, proposal generation and repair depend on adjacency.

### 1.2 Bridge multiset and target wound

Let \(\mathcal B(S_t)\) be the multiset of registered bridge signatures activated by \(S_t\). A multiset is required because a signature may occur more than once.

For checkpoint \(j\), the frozen wound target is:

\[
\mathcal T_j\subseteq\mathcal B(S_j),
\qquad
|\mathcal T_j|=k=2.
\]

The lesion operator produces:

\[
\widetilde S_{j,r}=\mathcal P_2(S_j;\xi_r),
\]

where \(r\) is the replicate and \(\xi_r\) is the frozen lesion/permutation receipt. Every valid lesion begins with:

\[
Y_0=0.
\]

### 1.3 Macro-history state capsule

\[
M_t=
\left(
D_t^{\mathrm{EMA}},
 p_t,
 \mathcal E_t,
 I_t,
 H_t^D
\right).
\]

where:

- \(D_t^{\mathrm{EMA}}\) is exponentially smoothed duality;
- \(p_t\in\mathbb N_{\ge0}\) is consecutive threshold persistence;
- \(\mathcal E_t\in\{0,1\}\) is the declared observer/emergence state;
- \(I_t\in\{0,1\}\) records a qualifying inventory change;
- \(H_t^D\) is a bounded ordered receipt of recent duality values.

Provenance fields authenticate the capsule but are not causal variables unless explicitly introduced into a transition law.

### 1.4 Interventions

Repair feedback:

\[
Z_t\in\{0,1\},
\qquad
\kappa=0.25.
\]

Carrier activation:

\[
A_t\in\{0,1\}.
\]

- `A=0`: the capsule is carried and updated but cannot alter candidate evaluation;
- `A=1`: a preregistered component of the capsule enters ranking and admission.

### 1.5 Reachable action alphabet

The equal-wound substrate exposed the operative surface:

\[
\mathcal A_{\mathrm{reachable}}=
\{\texttt{none},\texttt{swap}\}.
\]

At the experimental repair layer:

\[
\text{🪡}_{hold}
\quad\text{and}\quad
\text{🪡}_{swap}.
\]

These labels remain experiment-local and are not yet promoted into the broader canonical needle-action inventory.

### 1.6 Recovery outcome

\[
Y_{j,r,h}
=
\frac{
\operatorname{multiset\_match}
\left(
\mathcal T_j,
\mathcal B(S_{j,r,h}^{\mathrm{final}})
\right)
}{k}.
\]

For \(k=2\):

\[
Y\in\left\{0,\frac12,1\right\}.
\]

This measures recovery of the selected destroyed bridges, not every bridge in the pre-wound sequence.

---

## 2. Transition Kernels

### 2.1 Passive-history kernel

\[
P(S_{t+1}\mid S_t,Z_t,M_t,A_t=0)
=
P(S_{t+1}\mid S_t,Z_t).
\]

Carrier-001 and the later zero-coupling gates verified this boundary under exact twin conditions.

### 2.2 Active state-carrying kernel

\[
P(S_{t+1},M_{t+1}\mid S_t,M_t,Z_t,A_t=1).
\]

Carrier-002C established that this is now an executable experimental kernel: changing \(A\) while holding the paired pre-state fixed changed exact winners, admissions and accepted transitions.

This establishes a functioning state carrier under the implemented intervention. It does not establish that the true history is useful, adaptive or superior to a sham history.

### 2.3 Proposal and admission decomposition

At each step:

\[
\mathcal C_t=\mathcal F(S_t,\xi_t).
\]

Candidates are ranked, exact ties are resolved deterministically, and the selected candidate passes through the frozen stochastic admission law.

Every carrier experiment must report separately:

1. candidate exposures;
2. non-zero carrier adjustments;
3. changed exact winners;
4. changed admission decisions;
5. accepted carrier-induced transitions;
6. first state divergence;
7. reconvergence;
8. final recovery and coherence.

---

## 3. Duality Memory and Carrier Loss

### 3.1 Native EMA propagation

\[
D_{t+1}^{\mathrm{EMA}}(c)
=
D_t^{\mathrm{EMA}}
+
\alpha\left(\widehat D(c)-D_t^{\mathrm{EMA}}\right),
\qquad
\alpha=0.2.
\]

### 3.2 Continuity loss

\[
L_D(c;M_t)
=
\max\left(
0,
D_t^{\mathrm{EMA}}-D_{t+1}^{\mathrm{EMA}}(c)
\right).
\]

The fixed coefficient is:

\[
w_D=0.5.
\]

For insertion candidates, the active carrier replaces the existing raw-duality loss with the carried continuity loss. For reachable non-insertion candidates, it applies the same continuity penalty:

\[
R_t^{A=1}(c)
=
R_t^{A=0}(c)-w_D L_D(c;M_t).
\]

The carrier remains a continuity loss rather than an emergence declaration bonus:

- no `if E=1` gate;
- no change to \(\kappa\);
- no forced mutation;
- no threshold-triggered action;
- no coefficient sweep in Carrier-002C;
- same wounds, targets, microstates, seeds, proposal frontier and admission law.

---

## 4. Repair Feedback Law

For candidate \(c\):

\[
\Delta\Phi(c)=\Phi(c)-\Phi(S_t),
\]

\[
\Delta B(c)=B(c)-B(S_t),
\]

\[
L_{\mathcal T}(c)=1-Y(c).
\]

The fixed repair term is:

\[
R_{repair}(c)
=
0.4\Delta\Phi(c)
+
0.4\Delta B(c)
-
0.2L_{\mathcal T}(c).
\]

The feedback-augmented score is:

\[
R_t^Z(c)
=
R_t(c)+\kappa Z_tR_{repair}(c),
\qquad
\kappa=0.25.
\]

---

## 5. Causal Estimators

### 5.1 Equal-wound repair interaction

\[
\Gamma_h
=
\left[
Y_h(\widetilde{\mathcal E}=1,Z=1)
-
Y_h(\widetilde{\mathcal E}=1,Z=0)
\right]
-
\left[
Y_h(\widetilde{\mathcal E}=0,Z=1)
-
Y_h(\widetilde{\mathcal E}=0,Z=0)
\right].
\]

Inference is based on the eight matched-pair effects:

\[
\overline\Gamma_h
=
\frac1{8}\sum_{j=1}^{8}\Gamma_{h,j}.
\]

### 5.2 Carrier interaction at fixed feedback

\[
\Gamma_{A,Z}
=
\left[
Y(M_1,A=1,Z)-Y(M_1,A=0,Z)
\right]
-
\left[
Y(M_0,A=1,Z)-Y(M_0,A=0,Z)
\right].
\]

### 5.3 Three-way interaction

\[
\Gamma_{M\times A\times Z}
=
\Gamma_{A,Z=1}-\Gamma_{A,Z=0}.
\]

### 5.4 Mechanistic reachability

Before recovery efficacy is interpreted:

\[
N_{carrier\ decisions}>0.
\]

Carrier-002C passed this endpoint through changed exact winners, changed admissions and accepted carrier-induced actions.

### 5.5 Timing-specific history test

Carrier-003 compares:

\[
M_t^{real}
\quad\text{against}\quad
M_t^{sham},
\]

where the sham preserves the same marginal capsule values, duration and total exposure but alters temporal alignment.

Directional recovery hypothesis:

\[
Y_{real\ history}>Y_{sham\ history}.
\]

A separate non-directional mechanistic endpoint will test whether real and sham histories produce different decisions before recovery direction is interpreted.

---

## 6. Evidence Ladder

| Test | Primary result | Scientific status | Earned finding |
|---|---:|---|---|
| **V1** | \(\Gamma_h=+0.2083\) | **Invalidated** | Shared checkpoints and discarded history allowed seed offsets to masquerade as class differences. No scientific claim retained. |
| **V2** | \(\Gamma_h=-0.0677083\) | **Inconclusive** | Strict checkpoint/seed handling removed the V1 defect. Unequal target counts left the recovery scale unmatched. |
| **V2.1 audit** | same aggregate as V2 | **Mechanism audit** | Feedback genuinely changed sparse decisions. The principal turning surface was `none ↔ swap`; normalization and topology exposure were material hazards. |
| **V2.2 equal wound** | \(\Gamma_h=+0.07421875\) | **Directional positive; not established** | Eight pairs, 512 lesions and 1,024 branches. Pair interval \([-0.0667975,0.2152350]\) crosses zero; five pairs positive; median \(+0.1328125\). |
| **Carrier-001** | \(\Gamma_{carrier}=0\) | **Architectural null established** | 1,024 exact twins produced zero mismatches. Macro-history was metadata, not executable state. |
| **Carrier-002A** | \(\Gamma_{002A}=0\) | **Passive carrier neutrality established** | 2,048 zero-coupling projections reproduced Carrier-001 exactly. Capsule carriage and updates introduced no observer effect. |
| **Carrier-002B** | all interactions \(=0\) | **Unreachable-path null** | The insertion-only path received zero insert proposals. All 39,102 accepted transitions were swaps. No efficacy inference. |
| **Carrier-002C** | 1,992 changed winners; 1,275 changed admissions; 1,603 accepted induced actions | **Functioning carrier established** | The retained EMA history changed reachable hold/swap decisions and trajectories. Recovery interactions remained small and all pair intervals crossed zero. |
| **Carrier-003** | pending | **Next preregistered experiment** | Test true ordered history against an equal-distribution sham to determine whether timing carries useful control information. |

---

## 7. Carrier-002C Result Boundary

### Mechanistic result

Across 2,048 active branches:

- candidate exposures: 204,800 each for hold, delete, swap and combine;
- non-zero candidate adjustments: **429,109**;
- comparable paired pre-state decisions: **18,963**;
- changed exact winners: **1,992**;
- changed admissions: **1,275**;
- accepted carrier-induced actions: **1,603**;
- `hold → swap`: **576**;
- `swap → hold`: **492**;
- `swap → different swap`: **924**;
- divergent active branches: **1,930**;
- reconvergent active branches: **49**.

Therefore:

\[
\boxed{
\text{retained macro-history is an executable and reachable causal state in the experimental kernel}
}
\]

### Recovery result

\[
\Gamma_{A,Z=0}=+0.001953125,
\]

\[
95\%\ \mathrm{CI}=
[-0.0284370694,0.0323433194].
\]

\[
\Gamma_{A,Z=1}=-0.0087890625,
\]

\[
95\%\ \mathrm{CI}=
[-0.0357088996,0.0181307746].
\]

\[
\Gamma_{M\times A\times Z}=-0.0107421875,
\]

\[
95\%\ \mathrm{CI}=
[-0.0322490230,0.0107646480].
\]

Thus:

\[
\boxed{
\text{functioning macro-history carrier established; state-specific recovery efficacy not established}
}
\]

---

## 8. Current Claim Boundary

### Established

- Exact twin determinism under Carrier-001 conditions.
- No hidden macro-history leakage in the passive kernel.
- Full capsule carriage and updates are neutral at zero coupling.
- Unequal target wounds materially distorted earlier interpretation.
- The insertion-only carrier path is unreachable on the fixed-length substrate.
- The EMA continuity carrier changes reachable exact winners, admissions, accepted actions and trajectories.

### Directionally supported

- V2.2 produced \(\Gamma_h=+0.07421875\), with five of eight pairs positive and median pair effect \(+0.1328125\).
- The V2.2 uncertainty interval crosses zero; state-specific repair efficacy is not established.

### Mechanistically demonstrated

- Repair trajectories depend on sparse topological turning points.
- The decisive surface is hold/swap.
- Retained EMA history can causally alter decisions through a model-native continuity loss.
- Active and knockout trajectories can diverge and occasionally reconverge.

### Still untested

- Whether true temporal ordering is more informative than an equal-distribution sham.
- Whether real history improves repair rather than merely changing behaviour.
- Whether any timing-specific effect generalises to unseen seeds, microstates, lesions, inventories and ontology perturbations.

### Invalidated or rejected

- V1's positive estimate is inadmissible evidence.
- A raw checkpoint-class difference is not proof of retained-history causation.
- A zero result from zero mechanism exposure is not evidence of inefficacy.
- Influence alone is not proof of adaptive value.
- \(\mathcal E_t\) must not become an arbitrary bonus, forced mutation or feedback-strength switch.

---

## 9. Active Bench Queue

### EMERGE-CARRIER-003 — Real History vs Equal-Distribution Sham

Prerequisite satisfied: Carrier-002C demonstrated a reachable functioning carrier.

Freeze paired capsule treatments:

- **real history:** true ordered capsule trajectory;
- **sham history:** same values and exposure, temporally permuted or yoked;
- equal marginal distribution;
- equal duration;
- equal total exposure;
- same microstate, wound, target bridges, feedback and random stream.

Primary mechanistic question:

\[
N_{real\neq sham\ decisions}>0\;?
\]

Directional recovery question:

\[
Y_{real\ history}>Y_{sham\ history}\;?
\]

The directional endpoint is interpreted only after the mechanistic timing endpoint is reached.

### EMERGE-CARRIER-004 — Held-Out Generalisation

Proceed only after a preregistered Carrier-003 timing mechanism survives its sham control.

Ordered sequence:

\[
\boxed{
\text{003 real vs sham timing}
\rightarrow
\text{004 held-out generalisation}
}
\]

---

## 10. Evidence and Receipt Index

### Permanent scientific records

- `docs/EMERGE-KO-001-V2.2-EQUAL-WOUND-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-001-ARCHITECTURAL-NULL-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002-NEUTRALITY-AND-REACHABILITY-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002C-REACHABLE-HOLD-SWAP-RESULT-17JUL2026.md`

### Executable experiment files

- `experiments/emerge-ko-001/run-v2.ts`
- `experiments/emerge-ko-001/run-v2-1.ts`
- `experiments/emerge-ko-001/select-v2-2.ts`
- `experiments/emerge-ko-001/run-v2-2.ts`
- `experiments/emerge-ko-001/run-carrier-null.ts`
- `experiments/emerge-ko-001/freeze-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002c.ts`

### Selector and artifact receipts

V2.2 panel selector:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Carrier-001 comparison receipt:

```text
32a5124793268792eb9ee3651ce4d9e6ddd27b96e6f6f4059fc6ded28faa0c81
```

Carrier-001 artifact:

```text
cb9792a72f09ad0c8881b041fc66dfba05a9ae393c6a294ad7c684df87231865
```

Carrier capsule selector:

```text
be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5
```

Carrier-002 artifact:

```text
f1dcbfd628ffc0e3a2f24c0324e0c37655c3dd66e9bd2ac03cf98a4b78e32ab3
```

Carrier-002C artifact:

```text
4cf869f339b49822c61a4c2378f552dcbe8a7e5e2e54ff0052a0225098e44e49
```

---

## 11. Change Log

### 17 July 2026 — Ledger established

- Defined the canonical objects, kernels, outcomes, feedback law, carrier loss and estimators.
- Recorded V1 through Carrier-002B without promoting findings beyond their evidence.
- Fixed Carrier-002C as the next admissible experiment.

### 17 July 2026 — Carrier-002C completed

- Recorded 2,048/2,048 neutral zero-coupling comparisons.
- Recorded 429,109 non-zero candidate adjustments.
- Recorded 1,992 changed winners, 1,275 changed admissions and 1,603 accepted carrier-induced actions.
- Promoted executable macro-history carriage from untested to mechanistically established.
- Preserved the null recovery conclusion: every matched-pair interval crosses zero.
- Advanced the active queue to Carrier-003 real-history versus equal-distribution sham.

---

## Crown

> **The mathematics is preserved here; the tests must answer to it, and every claim must answer to the tests.**
