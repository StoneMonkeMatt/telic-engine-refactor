# Mathematics Ledger: The Compass of Emergent Causality

> **The mathematics defines the causal claim; the experiment earns the right to make it.**

Date established: 17 July 2026  
Last updated: 17 July 2026 — after EMERGE-CARRIER-003  
Status: canonical live mathematics ledger  
Experiment bench: `experiments/emerge-ko-001/`  
Branch: `agent/emerge-ko-001-sandbox`

This document is the canonical mathematical source of truth for the `emerge-ko-001` bench. Runners are executable implementations. Dated result documents are immutable scientific records. GitHub Actions artifacts contain raw selectors, receipts, traces and executed sources. This ledger states what the evidence currently permits us to claim.

---

## 0. Record-Keeping Doctrine

1. **Evidence remains chronological.** Earlier findings are not rewritten after later discoveries.
2. **Invalid, null, inconclusive, directional, mechanistic and established results remain distinct.**
3. **Reachability precedes efficacy.** A mechanism that receives zero candidate exposure cannot test usefulness.
4. **Influence is not usefulness.** A state or history may alter decisions without improving repair.
5. **Timing causality is not timing utility.** Chronology may change trajectories without the true order outperforming a sham.
6. **The matched checkpoint pair is the unit of generalisation.** Replicates improve precision but do not create independent substrates.
7. **Experimental changes are staged.** Neutral plumbing precedes active coupling; active coupling precedes timing controls; sham robustness precedes held-out generalisation.
8. **The ledger advances with the bench.** Every completed experiment updates the evidence ladder, claim boundary, active queue and receipt index.

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

Let \(\mathcal B(S_t)\) be the multiset of registered bridge signatures activated by \(S_t\). A multiset is required because one signature may occur more than once.

For checkpoint \(j\), the frozen target wound is:

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

Timing treatment:

\[
Q_t\in\{real,sham\}.
\]

- `real`: bounded EMA anchors are exposed in chronological order;
- `sham`: the same anchor multiset, duration, total exposure and terminal anchor are preserved while temporal alignment changes.

### 1.5 Reachable action alphabet

The equal-wound substrate exposed the operative decision surface:

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

Carrier-001 and later zero-coupling gates verified this boundary under exact twin conditions.

### 2.2 Active state-carrying kernel

\[
P(S_{t+1},M_{t+1}\mid S_t,M_t,Z_t,A_t=1).
\]

Carrier-002C established that this is an executable experimental kernel: changing the active carrier while holding the paired pre-state fixed changed exact winners, admissions and accepted transitions.

This establishes a functioning state carrier under the implemented intervention. It does not establish that the true history is useful, adaptive or superior to a sham.

### 2.3 Timing-conditioned kernel

Carrier-003 introduced a bounded timing schedule \(H^{Q}_{1:16}\):

\[
P(S_{t+1},M_{t+1}
\mid
S_t,M_t,Z_t,A_t=1,H^{Q}_{1:16}).
\]

For the first sixteen decisions, candidate continuity was anchored to the scheduled EMA value. After step sixteen, both treatments returned to endogenous Carrier-002C capsule evolution.

The real and sham treatments preserved:

\[
\operatorname{multiset}(H^{real}_{1:16})
=
\operatorname{multiset}(H^{sham}_{1:16}),
\]

with equal duration, equal total exposure and an identical terminal checkpoint anchor.

### 2.4 Proposal and admission decomposition

At each step:

\[
\mathcal C_t=\mathcal F(S_t,\xi_t).
\]

Candidates are ranked, exact ties are resolved deterministically, and the selected candidate passes through the frozen stochastic admission law.

Every carrier or timing experiment must report separately:

1. candidate exposures;
2. non-zero score adjustments;
3. changed exact winners;
4. changed admission decisions;
5. accepted induced transitions;
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
- no coefficient sweep in Carrier-002C or Carrier-003;
- identical wounds, targets, microstates, seeds, proposal frontier and admission law.

### 3.3 Carrier-003 timing schedule

For each capsule, let the normalised bounded history be:

\[
H^{real}=(h_1,h_2,\ldots,h_{15},h_{16}),
\qquad
h_{16}=D_0^{\mathrm{EMA}}.
\]

The preregistered sham rotated the first fifteen entries left by seven positions while preserving \(h_{16}\):

\[
H^{sham}
=
\operatorname{rotate}_{7}(h_1,\ldots,h_{15})\oplus h_{16}.
\]

Thus the intervention altered order, not the available values.

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

Inference uses the eight matched-pair effects:

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

### 5.3 State-by-carrier-by-feedback interaction

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

### 5.5 Real-minus-sham timing effect

For each feedback state:

\[
\Delta_Z
=
Y(real,Z)-Y(sham,Z).
\]

Carrier-003 preregistered:

\[
\boxed{\Delta_{Z=1}>0}.
\]

The feedback-specific timing interaction is:

\[
\Delta_{timing\times feedback}
=
\Delta_{Z=1}-\Delta_{Z=0}.
\]

### 5.6 State-specific timing interaction

\[
\Theta_Z
=
\left[Y(M_1,real,Z)-Y(M_1,sham,Z)\right]
-
\left[Y(M_0,real,Z)-Y(M_0,sham,Z)\right].
\]

The state-by-timing-by-feedback interaction is:

\[
\Theta_{Z=1}-\Theta_{Z=0}.
\]

### 5.7 Mechanistic timing endpoint

Temporal order must be functionally expressed before usefulness is interpreted:

\[
N_{timing\ decisions}>0.
\]

Carrier-003 passed this endpoint. Its preregistered directional recovery endpoint did not pass.

---

## 6. Evidence Ladder

| Test | Primary result | Scientific status | Earned finding |
|---|---:|---|---|
| **V1** | \(\Gamma_h=+0.2083\) | **Invalidated** | Shared checkpoints and discarded history allowed seed offsets to masquerade as class differences. No scientific claim retained. |
| **V2** | \(\Gamma_h=-0.0677083\) | **Inconclusive** | Strict checkpoint/seed handling removed the V1 defect. Unequal target counts left the recovery scale unmatched. |
| **V2.1 audit** | same aggregate as V2 | **Mechanism audit** | Feedback genuinely changed sparse decisions. The principal turning surface was `none ↔ swap`; normalization and topology exposure were material hazards. |
| **V2.2 equal wound** | \(\Gamma_h=+0.07421875\) | **Directional positive; not established** | Eight pairs, 512 lesions and 1,024 branches. Pair interval crosses zero; five pairs positive; median \(+0.1328125\). |
| **Carrier-001** | \(\Gamma_{carrier}=0\) | **Architectural null established** | 1,024 exact history twins produced zero mismatches. Macro-history was metadata, not executable state. |
| **Carrier-002A** | \(\Gamma_{002A}=0\) | **Passive carrier neutrality established** | 2,048 zero-coupling projections reproduced Carrier-001 exactly. Capsule carriage and updates introduced no observer effect. |
| **Carrier-002B** | all interactions \(=0\) | **Unreachable-path null** | The insertion-only path received zero insert proposals. All 39,102 accepted transitions were swaps. No efficacy inference. |
| **Carrier-002C** | 1,992 changed winners; 1,275 changed admissions; 1,603 accepted induced actions | **Functioning carrier established** | Retained EMA history changed reachable hold/swap decisions and trajectories. Recovery interactions remained small and all pair intervals crossed zero. |
| **Carrier-003** | \(\Delta_{Z=1}=-0.0161133\), CI \([-0.0375980,0.0053714]\) | **Timing causality established; positive primary unsupported** | Real versus equal-distribution sham changed 1,615 winners, 1,280 admissions and 1,260 accepted actions. True chronology did not establish a repair advantage. A secondary timing×feedback interaction was negative with CI excluding zero. |
| **Carrier-003B** | pending | **Next preregistered robustness audit** | Replace the single rotation-7 sham with the complete non-zero cyclic-rotation ensemble before any held-out generalisation. |

---

## 7. Carrier-002C Result Boundary

Across 2,048 active branches:

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

Recovery interactions:

\[
\Gamma_{A,Z=0}=+0.001953125,
\qquad
95\%\ \mathrm{CI}=[-0.0284371,0.0323433],
\]

\[
\Gamma_{A,Z=1}=-0.0087890625,
\qquad
95\%\ \mathrm{CI}=[-0.0357089,0.0181308],
\]

\[
\Gamma_{M\times A\times Z}=-0.0107421875,
\qquad
95\%\ \mathrm{CI}=[-0.0322490,0.0107646].
\]

Thus:

\[
\boxed{
\text{functioning macro-history carrier established; state-specific recovery efficacy not established}
}
\]

---

## 8. Carrier-003 Result Boundary

### 8.1 Neutral timing plumbing

- neutrality comparisons: **4,096**;
- neutrality mismatches: **0**;
- total branch executions: **8,192**;
- active real/sham timing branches: **4,096**;
- accepted timing trace records: **77,395**.

Both schedule payloads reproduced the active Carrier-002C reference exactly when timing exposure was disabled.

### 8.2 Mechanistic timing result

Across shared pre-state comparisons:

- comparable decisions: **63,791**;
- changed exact winners: **1,615**;
- changed admissions: **1,280**;
- accepted timing-induced actions: **1,260**;
- sham hold → real swap: **456**;
- sham swap → real hold: **522**;
- sham swap → different real swap: **637**;
- divergent real branches: **1,533**;
- reconvergent branches: **89**.

Therefore:

\[
\boxed{
\text{bounded temporal ordering is causally influential under the Carrier-003 replay intervention}
}
\]

### 8.3 Preregistered recovery result

\[
\Delta_{Z=1}=-0.01611328125,
\qquad
95\%\ \mathrm{CI}=[-0.0375980,0.0053714].
\]

The interval crosses zero and the point estimate is negative. The preregistered positive true-history hypothesis was not supported.

Without feedback:

\[
\Delta_{Z=0}=+0.0068359375,
\qquad
95\%\ \mathrm{CI}=[-0.0189858,0.0326577].
\]

Secondary timing×feedback interaction:

\[
\Delta_{Z=1}-\Delta_{Z=0}=-0.02294921875,
\]

\[
95\%\ \mathrm{CI}=[-0.0453371,-0.0005614].
\]

Seven of eight pair-level timing×feedback effects were negative. This is a **bounded secondary interference signal** under a single rotation-7 sham, not an established general law.

State-specific timing interactions all crossed zero:

\[
\Theta_{Z=0}=-0.009765625,
\qquad
\Theta_{Z=1}=-0.0048828125,
\]

\[
\Theta_{Z=1}-\Theta_{Z=0}=+0.0048828125.
\]

Thus:

\[
\boxed{
\text{timing causality established; true-history usefulness not established; feedback interference signal detected}
}
\]

Carrier-003 is a bounded EMA-history replay test. It is not evidence of consciousness, subjective recollection or a complete autobiographical memory system.

---

## 9. Current Claim Boundary

### Established

- Exact twin determinism under Carrier-001 conditions.
- No hidden macro-history leakage in the passive kernel.
- Full capsule carriage and updates are neutral at zero coupling.
- Unequal target wounds materially changed earlier interpretation.
- The insertion-only carrier path is unreachable on the fixed-length substrate.
- The EMA continuity carrier changes reachable exact winners, admissions, accepted actions and trajectories.
- Under the bounded Carrier-003 replay, changing only EMA-history order changed decisions and trajectories.

### Directionally supported

- V2.2 produced \(\Gamma_h=+0.07421875\), with five of eight pairs positive and median pair effect \(+0.1328125\).
- The V2.2 interval crosses zero; state-specific repair efficacy is not established.

### Mechanistically demonstrated

- Repair trajectories depend on sparse topological turning points.
- The decisive surface is hold/swap.
- Retained EMA history can alter decisions through a model-native continuity loss.
- Active and knockout trajectories can diverge and occasionally reconverge.
- The temporal arrangement of the same bounded EMA values can alter exact rankings, admissions and accepted transitions.

### Secondary signal requiring robustness

- Carrier-003 produced a negative timing×feedback interaction:

\[
-0.02294921875,
\qquad
95\%\ \mathrm{CI}=[-0.0453371,-0.0005614].
\]

- This may reflect genuine interference or the chosen single sham rotation. Rotation-complete testing is required.

### Still untested

- Whether the Carrier-003 timing result is robust across all admissible cyclic sham rotations.
- Whether true chronology has useful repair information under a sham-ensemble comparison.
- Whether any timing-specific mechanism generalises to unseen seeds, microstates, lesions, inventories and ontology perturbations.

### Invalidated, unsupported or rejected

- V1's positive estimate is inadmissible evidence.
- A raw checkpoint-class difference is not proof of retained-history causation.
- A zero result from zero mechanism exposure is not evidence of inefficacy.
- Influence alone is not proof of adaptive value.
- Carrier-003 did not support the claim that true chronology improves repair relative to its preregistered rotation-7 sham.
- Carrier-003 did not establish a distinct timing advantage for latched `M1` history.
- \(\mathcal E_t\) must not become an arbitrary bonus, forced mutation or feedback-strength switch.

---

## 10. Active Bench Queue

### EMERGE-CARRIER-003B — Rotation-Complete Sham Robustness Audit

Hold fixed:

- V2.2 panel and lesions;
- state capsules;
- Carrier-002C carrier law;
- \(\alpha=0.2\);
- \(w_D=0.5\);
- \(\kappa=0.25\);
- sixteen-step exposure window;
- terminal checkpoint anchor;
- microstates, wounds, targets and random streams.

Replace the single rotation-7 sham with all non-zero cyclic rotations of the first fifteen history positions:

\[
\mathcal R=\{1,2,\ldots,14\}.
\]

Treat rotation as a preregistered nuisance/control dimension rather than selecting one favourable sham.

Primary robustness questions:

1. Does real chronology continue to change decisions relative to the sham ensemble?
2. Is the negative timing×feedback interaction stable across rotations or rotation-7-specific?
3. Does the ensemble-mean real-minus-sham recovery effect remain near zero?
4. Is between-rotation variation larger than the estimated true-history effect?

No coefficient tuning or retrospective rotation selection is permitted.

### EMERGE-CARRIER-004 — Held-Out Generalisation

Proceed only after a preregistered timing mechanism survives the sham-ensemble robustness boundary.

Ordered sequence:

\[
\boxed{
\text{003B rotation-complete sham audit}
\rightarrow
\text{004 held-out generalisation}
}
\]

---

## 11. Evidence and Receipt Index

### Permanent scientific records

- `docs/EMERGE-KO-001-V2.2-EQUAL-WOUND-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-001-ARCHITECTURAL-NULL-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002-NEUTRALITY-AND-REACHABILITY-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002C-REACHABLE-HOLD-SWAP-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-003-PREREGISTRATION-17JUL2026.md`
- `docs/EMERGE-CARRIER-003-REAL-VS-SHAM-TIMING-RESULT-17JUL2026.md`

### Executable experiment files

- `experiments/emerge-ko-001/run-v2.ts`
- `experiments/emerge-ko-001/run-v2-1.ts`
- `experiments/emerge-ko-001/select-v2-2.ts`
- `experiments/emerge-ko-001/run-v2-2.ts`
- `experiments/emerge-ko-001/run-carrier-null.ts`
- `experiments/emerge-ko-001/freeze-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002c.ts`
- `experiments/emerge-ko-001/carrier-003.patch.part00`
- `experiments/emerge-ko-001/carrier-003.patch.boundary`
- `experiments/emerge-ko-001/carrier-003.patch.part01`
- `experiments/emerge-ko-001/carrier-003.patch.part02`
- `experiments/emerge-ko-001/carrier-003.patch.part03`
- `.github/workflows/emerge-carrier-003.yml`

### Selector, executable and artifact receipts

V2.2 panel selector:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Carrier-001 comparison receipt:

```text
32a5124793268792eb9ee3651ce4d9e6ddd27b96e6f6f4059fc6ded28faa0c81
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

Carrier-003 generated executable:

```text
aef813848ee7fcdc70e0fd3d328ade8c038aaf7f6ccb2218ca6c619266222dd3
```

Carrier-003 summary object:

```text
5b4543ffb3e6c39e0cdb4ad63c247c88f786d71e5759093b4e7bfc32a1b4b710
```

Carrier-003 trace:

```text
f231bd8e2e9d6994dadd18cc4e3931f26ecc1f2792c1bd01e5c1cb994d2b790d
```

Carrier-003 artifact:

```text
cc701497c87f5b0ec18b36593a1cbcd0c4bdad537c738c4ac736a8ffa835ba6e
```

---

## 12. Change Log

### 17 July 2026 — Ledger established

- Defined canonical objects, kernels, outcomes, feedback law, carrier loss and estimators.
- Recorded V1 through Carrier-002B without promoting findings beyond their evidence.
- Fixed Carrier-002C as the next admissible experiment.

### 17 July 2026 — Carrier-002C completed

- Recorded 2,048/2,048 neutral zero-coupling comparisons.
- Recorded 429,109 non-zero candidate adjustments.
- Recorded 1,992 changed winners, 1,275 changed admissions and 1,603 accepted carrier-induced actions.
- Promoted executable macro-history carriage from untested to mechanistically established.
- Preserved the null recovery conclusion: every matched-pair interval crossed zero.
- Advanced the active queue to Carrier-003.

### 17 July 2026 — Carrier-003 completed

- Recorded 4,096/4,096 neutral timing-payload comparisons.
- Recorded 1,615 timing-changed winners, 1,280 timing-changed admissions and 1,260 accepted timing-induced actions.
- Promoted bounded temporal-order causality from untested to mechanistically established.
- Recorded that the preregistered positive true-history recovery endpoint was unsupported.
- Recorded the secondary negative timing×feedback interaction as a bounded interference signal.
- Advanced the active queue to Carrier-003B rotation-complete sham robustness.
- Kept Carrier-004 closed until the sham-robustness boundary is crossed.

---

## Crown

> **The mathematics is preserved here; the tests must answer to it, and every claim must answer to the tests.**
