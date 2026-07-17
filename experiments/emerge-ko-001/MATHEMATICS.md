# Mathematics Ledger: The Compass of Emergent Causality

> **The mathematics defines the causal claim; the experiment earns the right to make it.**

Date established: 17 July 2026  
Status: canonical live mathematics ledger  
Experiment bench: `experiments/emerge-ko-001/`  
Branch: `agent/emerge-ko-001-sandbox`

This document is the canonical mathematical source of truth for the `emerge-ko-001` experiment bench. It defines the formal objects, transition kernels, causal estimators, evidence status, claim boundaries, and next admissible experiments.

The runners are executable implementations. The dated result documents are immutable historical records. The workflow artifacts contain the raw receipts and traces. This ledger records what the mathematics currently permits us to claim.

---

## 0. Record-Keeping Doctrine

1. **Evidence rows are chronological.** Earlier results are not rewritten to look cleaner after later discoveries.
2. **Invalid, null, inconclusive, directional, architectural, and established results remain distinct.**
3. **A mechanism must be reachable before its efficacy can be tested.** A null from a path with zero candidate exposure is a reachability result, not evidence of no causal effect.
4. **The independent matched checkpoint pair is the unit of generalisation.** Stochastic replicates within one pair increase measurement precision but do not create new independent substrates.
5. **Experimental changes are staged.** Plumbing neutrality precedes active coupling; active coupling precedes timing tests; timing tests precede held-out generalisation.
6. **The ledger advances with the bench.** Every completed experiment must update the evidence ladder, claim boundary, active queue, and receipt index.

---

## 1. Core Mathematical Objects

### 1.1 Symbolic microstate

The system microstate at execution step `t` is an ordered symbolic sequence:

\[
S_t=[s_{t,1},s_{t,2},\ldots,s_{t,n}],
\qquad
s_{t,i}\in\mathcal L_{\mathrm{CODEX}}.
\]

Order matters because bridge activation, transition coherence, proposal generation, and repair outcomes depend on symbol adjacency.

### 1.2 Bridge multiset

Let:

\[
\mathcal B(S_t)
\]

be the multiset of registered bridge signatures activated by `S_t`.

A multiset is required rather than an ordinary set because the same bridge signature can occur more than once. Experimental wounds use uniquely identifiable target signatures so every lesion begins with exact target recovery:

\[
Y_0=0.
\]

### 1.3 Target wound

For checkpoint `j`, let:

\[
\mathcal T_j\subseteq\mathcal B(S_j)
\]

be the frozen multiset of target bridges selected for destruction.

The equal-wound bench fixes:

\[
|\mathcal T_j|=k=2
\]

for every compared checkpoint.

The wound operator produces:

\[
\widetilde S_{j,r}=\mathcal P_2(S_j;\xi_r),
\]

where `r` is the replicate and `\xi_r` is the preregistered lesion seed and permutation receipt.

### 1.4 Macro-history state capsule

The retained macro-history state is:

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
- \(I_t\in\{0,1\}\) records whether a qualifying inventory change has occurred;
- \(H_t^D\) is a bounded ordered receipt of recent duality values.

The executable capsule also carries provenance fields such as source pair, source seed, source step, source sequence hash, raw duality, threshold, and reconstruction verification. Those fields authenticate the state but are not independent causal variables unless explicitly introduced into a transition law.

### 1.5 Repair feedback intervention

The repair feedback condition is an interventional variable:

\[
Z_t\in\{0,1\}.
\]

`Z=0` removes the recovery augmentation. `Z=1` applies the fixed recovery feedback law with:

\[
\kappa=0.25.
\]

### 1.6 State-carrier activation

The architectural carrier intervention is:

\[
A_t\in\{0,1\}.
\]

- `A=0`: the capsule is carried and updated but does not alter candidate evaluation;
- `A=1`: an explicitly preregistered component of `M_t` enters candidate evaluation or admission.

### 1.7 Reachable action alphabet

The current equal-wound substrate has empirically remained on the decision surface:

\[
\mathcal A_{\mathrm{reachable}}=\{\texttt{none},\texttt{swap}\}.
\]

At the mathematical repair layer these are provisionally interpreted as:

\[
\text{🪡}_{hold}
\quad\text{and}\quad
\text{🪡}_{swap}.
\]

This notation is experimental and has not been promoted into the broader canonical needle-action inventory.

### 1.8 Wound recovery performance

The primary outcome is target-bridge multiset recall:

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

For the current bench:

\[
Y\in\left\{0,\frac12,1\right\}.
\]

This metric measures recovery of the selected destroyed bridges, not recovery of every bridge present in the pre-wound sequence.

---

## 2. Transition Kernels

### 2.1 Passive-history kernel

When the carrier is inactive, retained history is authenticated metadata and updated state, but it has no causal input into the sequence transition:

\[
P(S_{t+1}\mid S_t,Z_t,M_t,A_t=0)
=
P(S_{t+1}\mid S_t,Z_t).
\]

Carrier-001 verified this boundary under exact history twins.

### 2.2 Joint state-carrying kernel

Once a carrier pathway is active, sequence and macro-history evolve jointly:

\[
P(S_{t+1},M_{t+1}\mid S_t,M_t,Z_t,A_t=1).
\]

This expression defines the architectural form required for a genuine retained-state causal test. It does not itself establish downward causation; that claim requires an active, reachable, experimentally distinguished pathway.

### 2.3 Proposal and admission decomposition

At each step, the engine constructs a proposal frontier:

\[
\mathcal C_t=\mathcal F(S_t,\xi_t),
\]

ranks candidates, resolves exact score ties deterministically, and applies stochastic admission using the frozen random stream.

A valid carrier experiment must therefore report separately:

1. carrier-adjusted candidates;
2. carrier-changed exact winners;
3. carrier-changed admission decisions;
4. accepted carrier-induced transitions;
5. first state divergence;
6. reconvergence;
7. final recovery and coherence.

---

## 3. Duality Memory and Carrier Loss

### 3.1 Native EMA propagation

For candidate sequence `c`, the projected carried duality is:

\[
D_{t+1}^{\mathrm{EMA}}(c)
=
D_t^{\mathrm{EMA}}
+
\alpha
\left(
\widehat D(c)-D_t^{\mathrm{EMA}}
\right),
\qquad
\alpha=0.2.
\]

Here \(\widehat D(c)\) is the candidate's raw duality under the current Telos implementation.

### 3.2 Reachable continuity loss

The candidate's loss against retained duality is:

\[
L_D(c;M_t)
=
\max\left(
0,
D_t^{\mathrm{EMA}}-D_{t+1}^{\mathrm{EMA}}(c)
\right).
\]

The existing duality-loss coefficient is retained:

\[
w_D=0.5.
\]

### 3.3 Carrier-002B implementation boundary

Carrier-002B applied the EMA replacement only to insertion candidates because the original ranker applied its raw-duality loss only to harmful insertions.

The equal-wound substrate generated:

\[
N_{insert}=0.
\]

Therefore the mechanism received zero exposure and Carrier-002B is classified as an **unreachable-path null**, not an efficacy null.

### 3.4 Carrier-002C preregistered extension

Carrier-002C will apply the same native continuity loss to every reachable candidate action, including `none` and `swap`, without changing its coefficient:

\[
R_t^{A=1}(c)
=
R_t^{A=0}(c)-w_D L_D(c;M_t).
\]

No coefficient sweep is permitted on the confirmatory run.

The carrier remains a continuity loss rather than an emergence declaration bonus:

- no `if E=1` gate;
- no change to \(\kappa\);
- no forced mutation;
- no threshold-triggered action;
- same wounds, targets, microstates, seeds, proposal frontier, and admission law.

---

## 4. Repair Feedback Law

For candidate `c`, let:

\[
\Delta\Phi(c)
=
\Phi(c)-\Phi(S_t),
\]

\[
\Delta B(c)
=
B(c)-B(S_t),
\]

and:

\[
L_{\mathcal T}(c)=1-Y(c).
\]

The current recovery term is:

\[
R_{repair}(c)
=
0.4\Delta\Phi(c)
+
0.4\Delta B(c)
-
0.2L_{\mathcal T}(c).
\]

The feedback-augmented proposal score is:

\[
R_t^Z(c)
=
R_t(c)+\kappa Z_tR_{repair}(c),
\qquad
\kappa=0.25.
\]

Carrier experiments must preserve this feedback law unless a later separately preregistered experiment explicitly intervenes on it.

---

## 5. Causal Estimators

### 5.1 Equal-wound repair interaction

For measured checkpoint class \(\widetilde{\mathcal E}\in\{0,1\}\):

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

The matched-pair estimator is:

\[
\overline\Gamma_h
=
\frac1J\sum_{j=1}^{J}\Gamma_{h,j},
\qquad
J=8.
\]

Inference is based on independent matched-pair effects, not the 32 within-pair lesion replicates treated as independent scientific substrates.

### 5.2 Carrier interaction at fixed feedback

For retained-history capsules `M0` and `M1`:

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

This asks whether activating the carrier changes recovery differently for the two retained histories at a fixed feedback state.

### 5.3 Three-way interaction

\[
\Gamma_{M\times A\times Z}
=
\Gamma_{A,Z=1}-\Gamma_{A,Z=0}.
\]

This asks whether any history-specific carrier effect itself changes under active repair feedback.

### 5.4 Mechanistic reachability endpoint

Before interpreting recovery efficacy, an active carrier must satisfy:

\[
N_{carrier\ decisions}>0.
\]

Required component counts include:

\[
N_{adjusted\ candidates},
\quad
N_{changed\ winners},
\quad
N_{changed\ admissions},
\quad
N_{accepted\ carrier\ transitions}.
\]

A result with all four counts equal to zero is a reachability null.

### 5.5 Timing-specific history test

Carrier-003 is admissible only after a reachable active carrier is demonstrated.

It compares:

\[
M_t^{real}
\]

against a sham history with the same marginal values, duration, and total exposure but altered temporal alignment:

\[
M_t^{sham}.
\]

The timing hypothesis is:

\[
Y_{real\ history}>Y_{sham\ history}.
\]

A non-directional mechanistic timing endpoint may be retained alongside this directional recovery hypothesis.

---

## 6. Evidence Ladder

| Test | Primary result | Scientific status | Earned finding |
|---|---:|---|---|
| **V1** | \(\Gamma_h=+0.2083\) | **Invalidated** | Shared checkpoint sequences and discarded history allowed seed offsets to masquerade as class differences. No scientific claim retained. |
| **V2** | \(\Gamma_h=-0.0677083\) | **Inconclusive** | Strict checkpoint and seed handling removed the V1 defect. Unequal target-bridge counts left the recovery scale structurally unmatched. |
| **V2.1 audit** | same aggregate as V2 | **Mechanism audit** | Feedback genuinely changed sparse decisions. The principal turning surface was `none ↔ swap`. Unequal normalization and topology exposure were identified as material interpretation hazards. |
| **V2.2 equal wound** | \(\Gamma_h=+0.07421875\) | **Directional positive; not established** | Eight matched pairs, two target bridges each, 512 lesions, and 1,024 branches. Pair interval \([-0.0667975,0.2152350]\) crosses zero. Five of eight pairs were positive; median pair effect \(+0.1328125\). |
| **Carrier-001** | \(\Gamma_{carrier}=0\) | **Architectural null established** | 2,048 branches and 1,024 exact history-twin comparisons produced zero mismatches. Retained macro-history was descriptive metadata, not an executable state. |
| **Carrier-002A** | \(\Gamma_{002A}=0\) | **Passive carrier neutrality established** | 2,048 zero-coupling projections reproduced Carrier-001 exactly. Full capsule reconstruction, carriage, update, and receipts introduced no dynamical observer effect. |
| **Carrier-002B** | all carrier interactions \(=0\) | **Unreachable-path null** | The insertion-only native carrier generated zero adjusted candidates and zero carrier decisions because the substrate produced no insert proposals. All 39,102 accepted active transitions were swaps. Macro-history efficacy remains untested. |
| **Carrier-002C** | pending | **Next preregistered experiment** | Extend the unchanged native continuity loss to the reachable `none ↔ swap` surface and require non-zero carrier decision exposure before efficacy interpretation. |

---

## 7. Current Claim Boundary

### Established

- The experimental runner is deterministic under the exact twin conditions tested by Carrier-001.
- No hidden macro-history leakage was detected in Carrier-001.
- A complete reconstructed history capsule can be carried and updated at zero coupling without changing baseline trajectories.
- Equalizing target wounds changed the estimated interaction from negative to positive, demonstrating that the unequal-wound design materially affected interpretation.
- The insertion-only carrier path is unreachable on the current length-10 equal-wound substrate.

### Directionally supported

- Under equal two-bridge wounds, the measured emergent checkpoint class received a larger mean feedback benefit:

\[
\Gamma_h=+0.07421875.
\]

- Five of eight matched pairs were positive and the median matched-pair effect was:

\[
+0.1328125.
\]

- The uncertainty interval still crosses zero, so state-specific efficacy is not established.

### Architecturally demonstrated

- Repair trajectories are path-dependent on sparse topological turning points.
- The current reachable decision surface is dominated by `none ↔ swap` choices.
- A state channel may be correctly implemented yet experimentally silent when the dynamics never expose the action class to which it is connected.

### Still untested

- Whether retained macro-history changes reachable `none ↔ swap` winners or admissions.
- Whether any active carrier effect differs between `M0` and `M1`.
- Whether temporal ordering of true history contains causal information beyond an equal-distribution sham.
- Whether any successful mechanism generalises to fresh seeds, microstates, lesions, inventories, and ontology perturbations.

### Invalidated or rejected

- V1's positive estimate is not admissible evidence.
- A raw difference between checkpoint classes is not proof of retained-history causation.
- A zero estimate from a mechanism with zero candidate exposure is not evidence of causal inefficacy.
- The emergence declaration \(\mathcal E_t\) must not be converted into an arbitrary score bonus, forced mutation, or feedback-strength switch.

---

## 8. Active Bench Queue

### EMERGE-CARRIER-002C — Reachable Hold/Swap Continuity Carrier

Primary mechanistic question:

\[
N_{carrier\ decisions}>0\;?
\]

Secondary recovery questions:

\[
\Gamma_{A,Z=0},
\qquad
\Gamma_{A,Z=1},
\qquad
\Gamma_{M\times A\times Z}.
\]

No directional recovery sign is preregistered for the first reachable-carrier run.

Required diagnostics:

- candidate exposures by action class;
- exact carrier adjustment per candidate;
- baseline and active exact winners;
- baseline and active admission decisions;
- accepted carrier-induced actions;
- first divergence step;
- `hold → swap` and `swap → hold` counts;
- reconvergence rate;
- target recovery and coherence;
- capsule before and after accepted transitions.

### EMERGE-CARRIER-003 — Real History vs Equal-Distribution Sham

Proceed only after Carrier-002C demonstrates a reachable functioning carrier.

### EMERGE-CARRIER-004 — Held-Out Generalisation

Proceed only after a preregistered Carrier-003 mechanism survives the timing control.

Ordered sequence:

\[
\boxed{
\text{002C reachable carrier}
\rightarrow
\text{003 real vs sham timing}
\rightarrow
\text{004 held-out generalisation}
}
\]

---

## 9. Evidence and Receipt Index

### Permanent scientific records

- `docs/EMERGE-KO-001-V2.2-EQUAL-WOUND-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-001-ARCHITECTURAL-NULL-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002-NEUTRALITY-AND-REACHABILITY-RESULT-17JUL2026.md`

### Executable experiment files

- `experiments/emerge-ko-001/run-v2.ts`
- `experiments/emerge-ko-001/run-v2-1.ts`
- `experiments/emerge-ko-001/select-v2-2.ts`
- `experiments/emerge-ko-001/run-v2-2.ts`
- `experiments/emerge-ko-001/run-carrier-null.ts`
- `experiments/emerge-ko-001/select-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002.ts`

### Frozen selectors and artifact receipts

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

Carrier-002 capsule selector:

```text
be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5
```

Carrier-002 artifact:

```text
f1dcbfd628ffc0e3a2f24c0324e0c37655c3dd66e9bd2ac03cf98a4b78e32ab3
```

---

## 10. Change Log

### 17 July 2026 — Ledger established

- Defined the canonical objects, kernels, recovery metric, feedback law, carrier loss, and causal estimators.
- Corrected the target-recovery definition to use the frozen destroyed-bridge multiset rather than all pre-wound bridges.
- Recorded V1 through Carrier-002B without promoting null, directional, or unreachable-path findings beyond their evidence.
- Marked Carrier-002A as completed and neutral.
- Marked Carrier-002B as completed and unreachable on the current substrate.
- Fixed Carrier-002C as the next admissible experiment.

---

## Crown

> **The mathematics is preserved here; the tests must answer to it, and every claim must answer to the tests.**
