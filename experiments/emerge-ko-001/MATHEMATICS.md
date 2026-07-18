# Mathematics Ledger: The Compass of Emergent Causality

> **The mathematics defines the causal claim; the experiment earns the right to make it.**

Date established: 17 July 2026  
Last updated: 17 July 2026 — after EMERGE-CARRIER-003D  
Status: canonical live mathematics ledger  
Experiment bench: `experiments/emerge-ko-001/`  
Branch: `agent/emerge-ko-001-sandbox`

This document is the canonical mathematical source of truth for the `emerge-ko-001` bench. Runners are executable implementations. Dated result documents are immutable scientific records. GitHub Actions artifacts contain raw selectors, receipts, traces and executed sources. This ledger states what the evidence currently permits us to claim.

---

## 0. Record-Keeping Doctrine

1. **Evidence remains chronological.** Earlier findings are not rewritten after later discoveries.
2. **Invalid, null, inconclusive, directional, mechanistic and established results remain distinct.**
3. **Reachability precedes efficacy.** A mechanism with zero exposure cannot test usefulness.
4. **Influence is not usefulness.** A state or history may alter decisions without improving repair.
5. **Timing causality is not timing utility.** Chronology may change trajectories without the true order outperforming a sham.
6. **Directional exposure is not directional utility.** A signed slope may change choices without improving repair.
7. **Sham choice is a nuisance variable.** One convenient counterfeit timeline cannot define a general timing claim.
8. **The matched checkpoint pair is the unit of generalisation.** Replicates and sham rotations improve measurement but do not create independent scientific substrates.
9. **Experimental changes are staged.** Neutral plumbing precedes active coupling; active coupling precedes timing controls; complete sham robustness precedes held-out generalisation.
10. **Closed claims remain closed.** A mechanism that fails its complete sham-robustness test is not rescued by selecting a favourable sham, coefficient or subgroup.
11. **The ledger advances with the bench.** Every completed experiment updates the evidence ladder, claim boundary, active queue and receipt index.



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
- `A=1`: a preregistered component of the capsule enters ranking or admission.

Timing treatment:

\[
Q_t\in\{real,sham_r\}.
\]

- `real`: bounded EMA anchors are exposed in chronological order;
- `sham_r`: the same anchor multiset, duration, total exposure and terminal anchor are preserved while the first fifteen positions are cyclically rotated by \(r\in\{1,\ldots,14\}\).

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

These labels remain experiment-local and are not promoted into the broader canonical needle-action inventory.

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

Carrier-002C established an executable carrier: changing the active retained EMA state while holding the paired pre-state fixed changed exact winners, admissions and accepted transitions.

This establishes influence under the implemented carrier. It does not establish usefulness.

### 2.3 Timing-conditioned kernel

Carrier-003 introduced a bounded timing schedule \(H^Q_{1:16}\):

\[
P(S_{t+1},M_{t+1}
\mid
S_t,M_t,Z_t,A_t=1,H^Q_{1:16}).
\]

For the first sixteen decisions, candidate continuity is anchored to the scheduled EMA value. After step sixteen, treatments return to endogenous Carrier-002C capsule evolution.

Carrier-003B used the complete cyclic ensemble:

\[
H^{sham_r}
=
\operatorname{rotate}_r(h_1,\ldots,h_{15})\oplus h_{16},
\qquad
r=1,\ldots,14,
\]

with:

\[
h_{16}=D_0^{\mathrm{EMA}}.
\]

For every \(r\):

\[
\operatorname{multiset}(H^{real})
=
\operatorname{multiset}(H^{sham_r}),
\]

with equal duration, total exposure and terminal checkpoint anchor.

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

For insertion candidates, the carrier replaces the existing raw-duality loss with the carried continuity loss. For reachable non-insertion candidates:

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
- no coefficient sweep;
- identical wounds, targets, microstates, seeds, proposal frontier and admission law.

### 3.3 Native Telos target and signed candidate slope

Carrier-003C exposes the direction already latent in the existing Telos update. For candidate \(c\):

\[
F(c)=\lambda C(c)+\eta N(c)+\epsilon,
\]

with:

\[
\lambda=0.618,
\qquad
\eta=0.3,
\qquad
\epsilon=0.05.
\]

The native target is:

\[
T_D(c)
=
\min\left(1,
\widehat D(c)[1+0.2F(c)]
\right).
\]

The candidate-projected state and signed velocity are:

\[
D_{t+1}^{EMA}(c)
=
\operatorname{clamp}_{[0,1]}
\left(
D_t^{EMA}+0.2[T_D(c)-D_t^{EMA}]
\right),
\]

\[
v_t(c)=D_{t+1}^{EMA}(c)-D_t^{EMA}.
\]

For reachable non-insertion candidates:

\[
R_t^{A=1}(c)=R_t^{A=0}(c)+0.5v_t(c).
\]

For insertion candidates, the baseline raw-duality loss is removed before the same signed velocity term is applied:

\[
R_t^{A=1}(c)
=
R_t^{A=0}(c)+0.5[L_{raw}(c)+v_t(c)].
\]

Carrier-003C verified that the pure projection reproduces the engine-native update exactly across 6,400 seeded comparisons.

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

Inference uses eight matched-pair effects:

\[
\overline\Gamma_h
=
\frac1{8}\sum_{j=1}^{8}\Gamma_{h,j}.
\]

### 5.2 Carrier interaction

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

\[
\Gamma_{M\times A\times Z}
=
\Gamma_{A,Z=1}-\Gamma_{A,Z=0}.
\]

### 5.3 Mechanistic reachability

Before recovery efficacy is interpreted:

\[
N_{carrier\ decisions}>0.
\]

Carrier-002C passed this endpoint.

### 5.4 Single-sham timing effect

\[
\Delta_Z
=
Y(real,Z)-Y(sham,Z).
\]

\[
\Delta_{timing\times feedback}
=
\Delta_{Z=1}-\Delta_{Z=0}.
\]

State-specific timing:

\[
\Theta_Z
=
\left[Y(M_1,real,Z)-Y(M_1,sham,Z)\right]
-
\left[Y(M_0,real,Z)-Y(M_0,sham,Z)\right].
\]

### 5.5 Complete-sham ensemble estimator

For pair \(j\), feedback \(Z\), and rotation \(r\):

\[
\Delta_{j,Z}^{(r)}
=
Y_j(real,Z)-Y_j(sham_r,Z).
\]

Average sham choice inside each independent pair:

\[
\overline\Delta_{j,Z}
=
\frac1{14}\sum_{r=1}^{14}\Delta_{j,Z}^{(r)}.
\]

The ensemble estimand is:

\[
\overline\Delta_Z
=
\frac1{8}\sum_{j=1}^{8}\overline\Delta_{j,Z}.
\]

The ensemble timing-by-feedback interaction is:

\[
\overline\Delta_{T\times Z}
=
\overline\Delta_{Z=1}-\overline\Delta_{Z=0}.
\]

Rotations are nuisance-control constructions. The eight matched pairs remain the inferential unit.

### 5.6 Mechanistic timing endpoint

\[
N_{timing\ decisions}>0.
\]

Carrier-003, all fourteen Carrier-003B rotations and all fourteen Carrier-003D signed-slope rotations passed their corresponding timing endpoint.

---

## 6. Evidence Ladder

| Test | Primary result | Scientific status | Earned finding |
|---|---:|---|---|
| **V1** | \(\Gamma_h=+0.2083\) | **Invalidated** | Shared checkpoints and discarded history allowed seed offsets to masquerade as class differences. No scientific claim retained. |
| **V2** | \(\Gamma_h=-0.0677083\) | **Inconclusive** | Strict checkpoint and seed handling removed the V1 defect. Unequal target counts left the recovery scale unmatched. |
| **V2.1 audit** | same aggregate as V2 | **Mechanism audit** | Feedback genuinely changed sparse decisions. The principal turning surface was `none ↔ swap`; normalization and topology exposure were material hazards. |
| **V2.2 equal wound** | \(\Gamma_h=+0.07421875\) | **Directional positive; not established** | Eight pairs, 512 lesions and 1,024 branches. Pair interval crosses zero; five pairs positive; median \(+0.1328125\). |
| **Carrier-001** | \(\Gamma_{carrier}=0\) | **Architectural null established** | 1,024 exact history twins produced zero mismatches. Macro-history was metadata, not executable state. |
| **Carrier-002A** | \(\Gamma_{002A}=0\) | **Passive carrier neutrality established** | 2,048 zero-coupling projections reproduced Carrier-001 exactly. Capsule carriage and updates introduced no observer effect. |
| **Carrier-002B** | all interactions \(=0\) | **Unreachable-path null** | The insertion-only path received zero insert proposals. All 39,102 accepted transitions were swaps. No efficacy inference. |
| **Carrier-002C** | 1,992 changed winners; 1,275 changed admissions; 1,603 accepted actions | **Functioning carrier established** | Retained EMA history changed reachable decisions and trajectories. Recovery interactions remained small and all pair intervals crossed zero. |
| **Carrier-003** | \(\Delta_{Z=1}=-0.0161133\), CI \([-0.0375980,0.0053714]\) | **Timing causality established; positive primary unsupported** | One equal-distribution sham changed 1,615 winners, 1,280 admissions and 1,260 accepted actions. A secondary negative timing×feedback interval excluded zero under rotation 7 only. |
| **Carrier-003B** | \(\overline\Delta_{Z=1}=-0.0157645\), CI \([-0.0338455,0.0023164]\) | **Complete-sham timing robustness completed** | All 14 rotations changed decisions; all 14 recovery point estimates were negative; the eight-pair ensemble interval crossed zero. The rotation-7 feedback-interference signal did not survive the complete ensemble. Positive timing usefulness is closed for the current carrier. |
| **Carrier-003C** | 1,325 changed winners; 802 changed admissions; 1,042 accepted actions | **Native directional carrier established** | Candidate-projected signed Telos slope changed reachable hold/swap decisions while 2,048 zero-activation projections remained exact. Recovery estimates were slightly positive, but every matched-pair interval crossed zero. |
| **Carrier-003D** | \(\overline\Delta_{Z=1}=-0.0055106\), CI \([-0.0193342,0.0083130]\) | **Complete-sham signed-slope robustness completed** | All 14 rotations changed reachable decisions. Twelve of fourteen recovery point estimates were negative, but every rotation interval and the eight-pair ensemble interval crossed zero. True signed-slope chronology did not establish repair usefulness; Carrier-004 remains gated. |
| **Carrier-003E** | \(\overline\Delta_{Z=1}=-0.0089634\), CI \([-0.0256051,0.0076782]\) | **Complete-sham acceleration robustness completed** | Acceleration changed reachable decisions and all 14 prior-slope shams were active. The complete-ensemble interval crossed zero; true acceleration chronology did not establish repair usefulness. |
| **Carrier-003F** | \(\overline\Delta_{Z=1}=+0.0018834\), CI \([-0.0054898,0.0092565]\) | **Complete-sham native-boundary robustness completed** | The fixed \(w_b=0.01\) law changed 501 winners and 407 admissions. All 14 equal-exposure candidate-label shams were active and exact. The eight-pair interval crossed zero; true native boundary assignment did not establish repair usefulness. |

---

## 7. Carrier-002C Result Boundary

Across 2,048 active branches:

- non-zero candidate adjustments: **429,109**;
- comparable paired pre-state decisions: **18,963**;
- changed exact winners: **1,992**;
- changed admissions: **1,275**;
- accepted carrier-induced actions: **1,603**;
- divergent active branches: **1,930**;
- reconvergent active branches: **49**.

\[
\boxed{
\text{retained macro-history is an executable and reachable causal state}
}
\]

Recovery interactions:

\[
\Gamma_{A,Z=0}=+0.001953125,
\qquad
95\%=[-0.0284371,0.0323433],
\]

\[
\Gamma_{A,Z=1}=-0.0087890625,
\qquad
95\%=[-0.0357089,0.0181308],
\]

\[
\Gamma_{M\times A\times Z}=-0.0107421875,
\qquad
95\%=[-0.0322490,0.0107646].
\]

\[
\boxed{
\text{functioning carrier established; state-specific recovery efficacy not established}
}
\]

---

## 8. Carrier-003 Result Boundary

- neutrality comparisons: **4,096**;
- neutrality mismatches: **0**;
- active timing branches: **4,096**;
- changed exact winners: **1,615**;
- changed admissions: **1,280**;
- accepted timing-induced actions: **1,260**.

\[
\Delta_{Z=1}=-0.01611328125,
\qquad
95\%=[-0.0375980,0.0053714].
\]

\[
\Delta_{Z=0}=+0.0068359375,
\qquad
95\%=[-0.0189858,0.0326577].
\]

\[
\Delta_{T\times Z}=-0.02294921875,
\qquad
95\%=[-0.0453371,-0.0005614].
\]

The primary positive true-history hypothesis was unsupported. The negative interaction was retained only as a bounded secondary signal pending complete-sham testing.

---

## 9. Carrier-003B Result Boundary

### 9.1 Integrity and scale

- schedule-neutrality comparisons: **4,096**;
- mismatches: **0**;
- sham rotations: **14**;
- active branch executions: **57,344**;
- accepted trace records: **1,089,484**;
- rotation-7 exact reproduction gate: **passed**;
- repeated real-history receipt identity gate: **passed**;
- distinct sham-receipt gate: **passed**.

### 9.2 Mechanistic robustness

Across all rotations:

- rotations with timing mechanism: **14/14**;
- comparable pre-state decisions: **1,047,371**;
- changed exact winners: **20,823**;
- changed admissions: **16,537**;
- accepted timing-induced actions: **16,165**.

\[
\boxed{
\text{temporal ordering is a robust causal input across the complete cyclic-sham ensemble}
}
\]

### 9.3 Primary usefulness result

\[
\overline\Delta_{Z=1}=-0.01576450893,
\]

\[
95\%=[-0.03384545473,0.00231643687].
\]

All fourteen rotation-specific point estimates were negative, ranging from:

\[
-0.03173828125
\quad\text{to}\quad
-0.0078125.
\]

Only one individual rotation interval excluded zero. The pair-level complete-ensemble interval crosses zero.

\[
\boxed{
\text{true chronology did not establish a repair advantage or a general repair disadvantage}
}
\]

### 9.4 No-feedback and interaction results

\[
\overline\Delta_{Z=0}=+0.00034877232,
\qquad
95\%=[-0.02091618559,0.02161373024].
\]

\[
\overline\Delta_{T\times Z}=-0.01611328125,
\qquad
95\%=[-0.03986550634,0.00763894384].
\]

All fourteen interaction point estimates were negative, but the complete-ensemble interval crosses zero. The Carrier-003 rotation-7 interference signal is therefore not rotation-robust.

### 9.5 State-specific results

\[
\overline\Theta_{Z=0}=-0.01715959821,
\qquad
95\%=[-0.06245879186,0.02813959543],
\]

\[
\overline\Theta_{Z=1}=-0.00906808036,
\qquad
95\%=[-0.04336061558,0.02522445486],
\]

\[
\overline\Theta_{Z=1}-\overline\Theta_{Z=0}=+0.00809151786,
\qquad
95\%=[-0.04062652723,0.05680956295].
\]

All state-specific intervals cross zero.

### 9.6 Verdict

\[
\boxed{
\text{timing influence robustly established; positive timing usefulness closed for the current carrier; no stable feedback interaction established}
}
\]

---

## 10. Carrier-003C Result Boundary

### 10.1 Projection and neutrality

- native projection comparisons: **6,400**;
- projection mismatches: **0**;
- maximum projection error: **0**;
- zero-activation comparisons: **2,048**;
- zero-activation mismatches: **0**.

### 10.2 Mechanistic result

Across 2,048 active slope branches:

- candidate adjustments: **819,200**;
- comparable pre-state decisions: **80,379**;
- changed exact winners: **1,325**;
- changed admissions: **802**;
- accepted slope-induced actions: **1,042**;
- divergent active branches: **1,298**;
- reconvergent active branches: **28**.

\[
\boxed{
\text{candidate-projected signed native duality slope is an executable and reachable causal control signal}
}
\]

### 10.3 Recovery result

\[
\Gamma_{A,Z=0}=+0.0068359375,
\qquad
95\%=[-0.0127420,0.0264138],
\]

\[
\Gamma_{A,Z=1}=+0.0078125,
\qquad
95\%=[-0.0078030,0.0234280],
\]

\[
\Gamma_{M\times A\times Z}=+0.0009765625,
\qquad
95\%=[-0.0209513,0.0229045].
\]

Every interval crosses zero.

\[
\boxed{
\text{native directional carrier established; recovery usefulness not established; complete-sham slope audit admissible}
}
\]

---

## 11. Carrier-003D Result Boundary

### 11.1 Integrity and scale

- schedule-neutrality comparisons: **4,096**;
- schedule-neutrality mismatches: **0**;
- cyclic sham rotations: **14**;
- active branch executions: **57,344**;
- accepted transition receipts: **1,094,532**;
- independent rotation-7 reproduction: **passed**;
- repeated real-history receipt identity: **passed**;
- distinct sham-receipt set: **passed**.

### 11.2 Mechanistic robustness

Across all rotations:

- rotations with signed-slope timing mechanism: **14/14**;
- comparable shared-pre-state decisions: **1,967,069**;
- changed exact winners: **9,813**;
- changed admissions: **6,090**;
- accepted timing-induced actions: **7,309**.

\[
\boxed{
\text{signed-slope temporal ordering is a robust causal input across all fourteen cyclic shams}
}
\]

### 11.3 Primary usefulness result

\[
\overline\Delta_{Z=1}=-0.00551060268,
\qquad
95\%=[-0.01933417573,0.00831297037].
\]

Twelve of fourteen rotation-specific point estimates were negative and two were positive. All fourteen rotation-specific intervals crossed zero. Across the eight independent matched pairs, four effects were positive and four were negative.

\[
\boxed{
\text{true signed-slope chronology established neither a repair advantage nor a general repair disadvantage}
}
\]

### 11.4 Secondary results

\[
\overline\Delta_{Z=0}=+0.00111607143,
\qquad
95\%=[-0.00983243761,0.01206458047],
\]

\[
\overline\Delta_{T\times Z}=-0.00662667411,
\qquad
95\%=[-0.02901175614,0.01575840793],
\]

\[
\overline\Theta_{Z=0}=+0.01241629464,
\qquad
95\%=[-0.00485209402,0.02968468330],
\]

\[
\overline\Theta_{Z=1}=-0.00823102679,
\qquad
95\%=[-0.02754018924,0.01107813566],
\]

\[
\overline\Theta_{T\times Z}=-0.02064732143,
\qquad
95\%=[-0.05178066212,0.01048601926].
\]

Every ensemble interval crosses zero. No stable feedback synergy, feedback interference or state-specific timing effect was established.

### 11.5 Verdict

\[
\boxed{
\text{directional timing causality established; true-slope usefulness not established; Carrier-004 remains gated}
}
\]

No retrospective adjustment of \(w_v=0.5\) is admissible as a rescue of this result.

---

## 12. Current Claim Boundary

### Established

- Exact twin determinism under Carrier-001 conditions.
- No hidden macro-history leakage in the passive kernel.
- Full capsule carriage and updates are neutral at zero coupling.
- Unequal target wounds materially changed earlier interpretation.
- The insertion-only carrier path is unreachable on the fixed-length substrate.
- The EMA continuity carrier changes reachable winners, admissions, accepted actions and trajectories.
- Temporal ordering changes decisions and trajectories across all fourteen cyclic sham rotations.
- Rotation 7 was not a privileged or necessary sham for the timing-causality finding.
- The pure candidate projection exactly reproduces the native Telos duality update.
- Candidate-projected signed Telos slope changes reachable winners, admissions, accepted actions and trajectories.
- Signed-slope temporal ordering changes reachable decisions across every non-zero cyclic sham while value multiset, exposure and terminal anchor remain fixed.

### Directionally supported

- V2.2 produced \(\Gamma_h=+0.07421875\), with five of eight pairs positive and median pair effect \(+0.1328125\).
- Under Carrier-003B feedback, all fourteen real-minus-sham point estimates were negative.
- Carrier-003C produced small positive state-specific recovery point estimates with and without feedback.
- Under Carrier-003D feedback, twelve of fourteen true-minus-sham point estimates were negative.
- Carrier-003D pair effects were split four positive and four negative.
- None of these directional patterns has a pair-generalised interval excluding zero.

### Mechanistically demonstrated

- Repair trajectories depend on sparse topological turning points.
- The operative surface is hold/swap.
- Retained EMA level can causally alter reachable decisions through a model-native continuity loss.
- Bounded EMA-history order can causally alter decisions independent of its value multiset.
- The native Telos force, target and EMA update can be projected before selection to create a signed candidate velocity.
- The order of signed candidate velocity can alter decisions independently of its value multiset and exposure.
- Active and comparison trajectories can diverge and reconverge.

### Closed for the current carrier

- The claim that true EMA-level chronology improves repair relative to equal-distribution cyclic shams.
- The claim that true signed-slope chronology improves repair relative to the complete cyclic-sham family under the fixed \(w_v=0.5\) law.
- The claim that the Carrier-003 negative timing×feedback interaction is robust across sham choice.
- Direct progression of either completed timing carrier to held-out generalisation.

### Still untested

- Whether bounded-history curvature or acceleration carries useful repair information beyond first-order slope.
- Whether persistence-state transition direction, threshold-crossing direction or inventory-event timing yields positive complete-sham-controlled usefulness.
- Held-out generalisation of any mechanism that first clears the complete-sham usefulness gate.

### Invalidated or rejected

- V1's positive estimate is inadmissible evidence.
- A raw checkpoint-class difference is not proof of retained-history causation.
- A zero result from zero mechanism exposure is not evidence of inefficacy.
- Influence alone is not proof of adaptive value.
- One selected sham cannot establish a general timing effect.
- \(\mathcal E_t\) must not become an arbitrary bonus, forced mutation or feedback-strength switch.

---

## 13. Active Bench Queue

### Completed: EMERGE-CARRIER-003E — Candidate-Projected Duality Acceleration

Status: **completed 18 July 2026; acceleration causal, positive usefulness not established**.

The first-order signed-slope carrier completed:

\[
\text{native projection equivalence}
\rightarrow
\text{zero-activation neutrality}
\rightarrow
\text{reachable influence}
\rightarrow
\text{complete-sham robustness}.
\]

It established robust causal sensitivity to directional timing but did not establish useful repair control.

The architecture audit selected bounded-history candidate acceleration because the native EMA history, current anchor and pure candidate projection already exist at the ranking boundary:

\[
a_t(c)
=
\left[D_{t+1}^{EMA}(c)-D_t^{EMA}\right]
-
\left[D_t^{EMA}-D_{t-1}^{EMA}\right].
\]

Carrier-003E freezes the Carrier-003C signed-slope coefficient at \(w_v=0.5\) and preregisters one additive acceleration coefficient \(w_a=0.5\). Fifteen realised slopes are derived from each normalized sixteen-value EMA history. The complete sham family cyclically rotates those same fifteen slopes before candidate acceleration is derived, preserving slope multiset, exposure, capsule, current EMA anchor, wounds, random streams, feedback and admission.

The preregistered sequence passed its integrity and mechanism gates:

1. acceleration projection algebra was exact across 15,114 comparisons;
2. 4,096 acceleration-off comparisons reproduced Carrier-003C with zero mismatches;
3. acceleration changed 1,790 exact winners, 1,344 admissions and 1,388 accepted actions;
4. prior-slope chronology changed reachable decisions in all fourteen rotations;
5. positive pair-generalised usefulness did not pass.

The primary complete-sham estimate was:

\[
\overline{\Delta}_{Z=1}=-0.008963448660714,
\qquad
95\%=[-0.025605123673539,\ 0.007678226352111].
\]

The point estimate was negative, the interval crossed zero, and six of eight pair effects were negative. Candidate acceleration and its temporal ordering are causal inputs, but the true chronology was not established as a useful repair signal.

One unadjusted secondary state-specific timing-by-feedback contrast was positive:

\[
\overline{\Theta}_{T\times Z}=0.036760602678571,
\qquad
95\%=[0.005759976944496,\ 0.067761228412647].
\]

It is recorded as a bounded secondary signal and cannot substitute for the failed direct usefulness endpoint.

Permanent records:

- `docs/EMERGE-CARRIER-003E-PREREGISTRATION-18JUL2026.md`
- `docs/EMERGE-CARRIER-003E-COMPLETE-SHAM-CANDIDATE-ACCELERATION-RESULT-18JUL2026.md`

No retrospective adjustment of (w_v=0.5) or (w_a=0.5) is admissible as a rescue. The next architecture audit may examine persistence-transition direction, threshold-crossing direction or inventory-event timing. Carrier-004 remains gated.

### Completed: EMERGE-CARRIER-003F — Native Boundary Assignment

Status: **completed 18 July 2026; native boundary assignment causal, positive usefulness not established**.

The dark audit identified the frozen native threshold as \(\theta=0.6\) and defined:

\[
b_t(c)
=
\mathbf 1[D_t^{EMA}<0.6\le D_{t+1}^{EMA}(c)]
-
\mathbf 1[D_{t+1}^{EMA}(c)<0.6\le D_t^{EMA}].
\]

At coefficient zero, the projector was exact and baseline-neutral across 204,800 active Carrier-003C frontiers and 819,200 candidates. It exposed 28,359 candidate-divergent frontiers, including 13,423 later frontiers with exit options. The accepted trace contained 1,716 exits and 1,509 entries; every accepted crossing was an inventory-stable swap and no crossing directly declared observer state.

Carrier-003F keeps the Carrier-003C signed-slope law fixed and preregisters one active event term:

\[
R_t^{003F}(c)=R_t^{003C}(c)+w_b b_t(c),
\qquad
\boxed{w_b=0.01}.
\]

The one-percentage-point event perturbation is below the maximum absolute signed-slope adjustment observed on the same substrate, \(0.02771943834567009\). The coefficient is fixed before active boundary outcomes, with no sweep or retrospective rescue.

The fourteen geometry-safe shams do not rotate EMA history. At each realized frontier they apply a deterministic SHA-256-derived bijection to the valid native ternary labels among the four canonical candidate slots:

\[
b_{r,f}^{sham}(c_i)=b_f(c_{\pi_{r,f}(i)}),
\qquad r\in\{1,\ldots,14\}.
\]

Therefore every sham preserves the exact per-frontier multiset of \(+1\), \(0\) and \(-1\), the native boundary side, event timing, candidates, state and random stream. Only candidate ownership of the event label changes. The fourteen fixed salts are `01` through `14`.

Carrier-003F requires:

1. exact native projection and boundary algebra;
2. boundary-off reproduction of sealed Carrier-003C;
3. exact per-frontier sham exposure equality and fourteen distinct assignment receipts;
4. non-zero true-law decision influence;
5. non-zero true-versus-sham decision influence for all fourteen schedules;
6. exact independent schedule-7 reproduction;
7. positive complete-ensemble eight-pair usefulness under feedback before Carrier-004.

For matched pair \(j\), feedback state \(Z\), and sham schedule \(r\):

\[
\Delta_{j,Z}^{(r)}
=
Y_j(true\ boundary\ assignment,Z)-Y_j(sham_r\ assignment,Z).
\]

The primary endpoint is the mean of the fourteen within-pair sham contrasts under feedback:

\[
\overline\Delta_{Z=1}
=
\frac{1}{8}\sum_{j=1}^{8}
\left[
\frac{1}{14}\sum_{r=1}^{14}\Delta_{j,Z=1}^{(r)}
\right].
\]

Useful native boundary information is established only if its point estimate is positive and its two-sided 95% interval across the eight matched-pair ensemble effects lies entirely above zero. No individual sham, pair, capsule or secondary contrast can substitute for this gate.

Permanent preregistration:

- `docs/EMERGE-CARRIER-003F-PREREGISTRATION-18JUL2026.md`

All fourteen active schedules passed their integrity and mechanism gates:

1. 28,672 Carrier-001 neutrality comparisons had zero mismatches;
2. 28,672 Carrier-003C boundary-off comparisons had zero mismatches;
3. 2,867,200 sham frontiers preserved their exact native ternary multiset with zero mismatches;
4. the fixed true law changed 501 winners, 407 admissions and 399 accepted actions;
5. all fourteen shams changed reachable decisions;
6. true-versus-sham assignment changed 10,504 winners, 14,905 admissions and 8,232 accepted actions across the complete ensemble;
7. all fourteen sham assignment and projection receipts were distinct;
8. independent schedule 7 reproduced exactly.

The primary complete-sham estimate was:

\[
\overline\Delta_{Z=1}=0.001883370535714,
\qquad
95\%=[-0.005489800554499, 0.009256541625927].
\]

The point estimate favored the true native assignment by approximately 0.188 percentage points, but the eight-pair interval crossed zero. Five pair effects were positive and three were negative. Eight of fourteen schedule point estimates were positive, three were zero and three were negative. Schedule 13 had an individually positive interval, but no individual sham can substitute for the preregistered complete-ensemble endpoint.

No secondary ensemble interval excluded zero. The fixed native boundary law and candidate assignment are causal inputs, but positive repair usefulness is not established. No retrospective adjustment of \(w_b=0.01\), sham salt, subgroup, capsule, action family or feedback cell is admissible as a rescue. Carrier-004 remains gated.

Permanent result:

- `docs/EMERGE-CARRIER-003F-COMPLETE-SHAM-NATIVE-BOUNDARY-RESULT-18JUL2026.md`

### Carrier-004 — held-out generalisation

Status: **gated**.

Carrier-004 becomes admissible only after a model-native mechanism establishes a positive pair-generalised benefit against its complete sham family.

## 14. Evidence and Receipt Index

### Permanent scientific records

- `docs/EMERGE-KO-001-V2.2-EQUAL-WOUND-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-001-ARCHITECTURAL-NULL-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002-NEUTRALITY-AND-REACHABILITY-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-002C-REACHABLE-HOLD-SWAP-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-003-PREREGISTRATION-17JUL2026.md`
- `docs/EMERGE-CARRIER-003-REAL-VS-SHAM-TIMING-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-003B-PREREGISTRATION-17JUL2026.md`
- `docs/EMERGE-CARRIER-003B-ROTATION-COMPLETE-SHAM-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-003C-PREREGISTRATION-17JUL2026.md`
- `docs/EMERGE-CARRIER-003C-NATIVE-PROJECTED-SLOPE-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-003D-PREREGISTRATION-17JUL2026.md`
- `docs/EMERGE-CARRIER-003D-COMPLETE-SHAM-NATIVE-SLOPE-RESULT-17JUL2026.md`
- `docs/EMERGE-CARRIER-003E-PREREGISTRATION-18JUL2026.md`
- `docs/EMERGE-CARRIER-003E-COMPLETE-SHAM-CANDIDATE-ACCELERATION-RESULT-18JUL2026.md`
- `docs/EMERGE-CARRIER-003F-DARK-BOUNDARY-TRANSITION-AUDIT-18JUL2026.md`
- `docs/EMERGE-CARRIER-003F-PREREGISTRATION-18JUL2026.md`
- `docs/EMERGE-CARRIER-003F-COMPLETE-SHAM-NATIVE-BOUNDARY-RESULT-18JUL2026.md`

### Executable experiment files

- `experiments/emerge-ko-001/run-v2.ts`
- `experiments/emerge-ko-001/run-v2-1.ts`
- `experiments/emerge-ko-001/select-v2-2.ts`
- `experiments/emerge-ko-001/run-v2-2.ts`
- `experiments/emerge-ko-001/run-carrier-null.ts`
- `experiments/emerge-ko-001/freeze-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002.ts`
- `experiments/emerge-ko-001/run-carrier-002c.ts`
- `experiments/emerge-ko-001/carrier-003.patch.part00` through `part03`
- `experiments/emerge-ko-001/carrier-003b-runner.part00` through `part05`
- `experiments/emerge-ko-001/carrier-003b-aggregate.part00` through `part02`
- `src/logic/dualityProjection.ts`
- `experiments/emerge-ko-001/verify-duality-projection.ts`
- `experiments/emerge-ko-001/assemble-carrier-003c.ts`
- `.github/workflows/emerge-carrier-003c.yml`
- `.github/scripts/emerge-carrier-003d-runner.ts`
- `.github/scripts/emerge-carrier-003d-aggregate.ts`
- `.github/workflows/emerge-carrier-003d.yml`
- `src/logic/dualityProjection.ts` (`projectDualityAcceleration`)
- `experiments/emerge-ko-001/verify-duality-acceleration.ts`
- `.github/scripts/emerge-carrier-003e-runner.ts`
- `.github/scripts/emerge-carrier-003e-aggregate.ts`
- `.github/workflows/emerge-carrier-003e.yml`
- `experiments/emerge-ko-001/verify-duality-boundary-transition.ts`
- `experiments/emerge-ko-001/assemble-carrier-003f-dark-dynamic.ts`
- `experiments/emerge-ko-001/audit-carrier-003f-accepted-boundary-cooccurrence.ts`
- `experiments/emerge-ko-001/finalize-carrier-003f-dark-boundary-audit.ts`
- `experiments/emerge-ko-001/assemble-carrier-003f-active-runner.ts`
- `experiments/emerge-ko-001/run-carrier-003f-complete-shams.sh`
- `experiments/emerge-ko-001/aggregate-carrier-003f-complete-shams.ts`

### Selector and artifact receipts

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

Carrier-002C artifact:

```text
4cf869f339b49822c61a4c2378f552dcbe8a7e5e2e54ff0052a0225098e44e49
```

Carrier-003 artifact:

```text
cc701497c87f5b0ec18b36593a1cbcd0c4bdad537c738c4ac736a8ffa835ba6e
```

Carrier-003B workflow run:

```text
29579962999
```

Carrier-003B aggregate summary:

```text
f6cd2a599cb34a359a66d842407873bff858ceccdf1581b8d37152daf5c940a1
```

Carrier-003B rotation-summary set:

```text
df5e51bca0605e2f75a375a2dd2b0ca4004d2fca02ce6976508eeb52374d42b6
```

Carrier-003B repeated real-history receipt:

```text
ef3c9b60da80ca11d3ab9ab319575b49d07ddbbd9df55d3808e5e5b5fae08125
```

Carrier-003B sham-receipt set:

```text
49bc2d8adce5037cebc29d233e9ffef8fb83f10ac4c0942e5125b84410fccf7e
```

Carrier-003B artifact:

```text
a86c473f5a17dbc53fa693662f9665f485c7b969159f6cf0ffb435210136ba88
```

Carrier-003C workflow run:

```text
29610229475
```

Carrier-003C generated runner:

```text
b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a
```

Carrier-003C summary:

```text
a085f78c80e6ea6f7b5f6eb9878517a4bb646c1a7496505ebd3468b3e27e2644
```

Carrier-003C artifact:

```text
fd051cfcc4ca427ec6a043744eb1eb031cf50ea101f23a9f5a4a8abe5c8395b9
```

Carrier-003D workflow run:

~~~text
29614750232
~~~

Carrier-003D generated rotation runner:

~~~text
4a89285d5fdf9dc1510f381bc17be9194d09a562c4cea3078c4962d253d205ff
~~~

Carrier-003D generated aggregate analyser:

~~~text
07faa44920f6c1cbba306e409c4b63f38fe741c3487835c4ae1f2fbf410688a2
~~~

Carrier-003D aggregate summary:

~~~text
ebacbd8ad2b144d81411f2cf5b60d83ee8256a753f3a580bf468f5d068000903
~~~

Carrier-003D rotation-summary set:

~~~text
387c165f5fecbdc3b00d1ecaa657d0b843419fd93ca3c1ec6c80028ac42bfcb1
~~~

Carrier-003D real projection receipt:

~~~text
098d391a186544af26d616051788249605cc1304246e35aa1e823e51275810f3
~~~

Carrier-003D sham projection receipt set:

~~~text
b36d1d4386c63f06f61dd875115b854a57d0668ceb7b7de9a39bddef47cb017a
~~~

Carrier-003D artifact:

~~~text
f96822d106a73d510ad6a0e89343cee1492b982fe31ed2af9d8be689fa15155c
~~~

Carrier-003E aggregate summary:

~~~text
f928b05e70a562c6b6c1302537fda37c05621ec06e973cc1234859dd821c1758
~~~

Carrier-003E rotation-summary set:

~~~text
a82f906280f8a09b5864c2581d02963fef2f068ff0e9aaf4ce6bb8327181ee2a
~~~

Carrier-003E real projection receipt:

~~~text
b4bde416de4212a727ee13d5ede6d4bd2cc331398dea17346308e58fe5bb3e07
~~~

Carrier-003E acceleration mechanism receipt:

~~~text
34afb6aacf90cd2d1732e338a74ed1bd88643572c76c6ea465541ce46bc7b8cd
~~~

Carrier-003E sham projection receipt set:

~~~text
c9c972850b037c12dffba7d47e1d84d24cd1c9b16b785d38de9e2f29bf35fd2c
~~~

Carrier-003E artifact:

~~~text
ce15b5a7d93e296d9c5a4975778ceeef94dd06baecf34966a6f1105838b70711
~~~

---

## 15. Change Log

### 17 July 2026 — Ledger established

- Defined canonical objects, kernels, outcomes, feedback law, carrier loss and estimators.
- Recorded V1 through Carrier-002B without promoting findings beyond their evidence.

### 17 July 2026 — Carrier-002C completed

- Established executable and reachable macro-history influence.
- Preserved the null state-specific recovery conclusion.

### 17 July 2026 — Carrier-003 completed

- Established bounded temporal-order causality under one equal-distribution sham.
- Rejected the preregistered positive repair claim.
- Recorded one bounded negative timing×feedback signal.

### 17 July 2026 — Carrier-003B completed

- Validated 4,096 neutral timing comparisons with zero mismatches.
- Completed all fourteen non-zero cyclic sham rotations across 57,344 active branches.
- Established timing causality across 14/14 rotations.
- Recorded 20,823 changed winners, 16,537 changed admissions and 16,165 accepted timing-induced actions.
- Recorded uniformly negative feedback recovery point estimates across all rotations while preserving the eight-pair interval crossing zero.
- Removed rotation-7 privilege and closed the feedback-interference claim as non-robust.
- Closed positive timing usefulness for the current EMA-level continuity carrier.
- Gated held-out generalisation pending a new model-native mechanism that earns positive complete-sham-controlled usefulness.

### 17 July 2026 — Carrier-003C completed

- Exposed a pure candidate projection of the existing Telos force, target and EMA update.
- Verified 6,400 native projection comparisons with zero error.
- Verified 2,048 zero-activation comparisons with zero mismatches.
- Established reachable signed-slope influence through 1,325 changed winners, 802 changed admissions and 1,042 accepted induced actions.
- Preserved the recovery-usefulness boundary because all matched-pair intervals crossed zero.
- Opened Carrier-003D complete-sham native slope testing while keeping Carrier-004 gated.

### 17 July 2026 — Carrier-003D completed

- Reproduced Carrier-003C, the frozen panel, Carrier-001 and all capsule receipts.
- Verified 4,096 schedule-neutrality comparisons with zero mismatches.
- Completed all fourteen cyclic signed-slope sham rotations across 57,344 active branches.
- Established signed-slope timing causality through 9,813 changed winners, 6,090 changed admissions and 7,309 accepted timing-induced actions.
- Recorded a primary real-minus-mean-sham estimate of \(-0.0055106\) with eight-pair interval crossing zero.
- Preserved the boundary that twelve negative rotation point estimates do not establish general harm.
- Closed positive true-slope chronology usefulness for the fixed first-order law and kept Carrier-004 gated.
- Opened a higher-order model-native directional law audit without retrospective coefficient tuning.

### 18 July 2026 — Carrier-003E preregistered

- Selected candidate-projected duality acceleration as the cleanest higher-order native law.
- Defined \(a_t(c)=v_t(c)-v_{t-1}\) using the existing pure candidate projection and frozen EMA histories.
- Kept the signed-slope coefficient fixed at \(w_v=0.5\) and preregistered \(w_a=0.5\) without a sweep.
- Defined fourteen cyclic shams over the same fifteen realised slope values, deriving acceleration only after the chronology intervention.
- Required exact projection algebra, acceleration-off neutrality, reachable acceleration decisions, complete-sham timing causality and positive eight-pair usefulness before Carrier-004.

### 18 July 2026 — Carrier-003E completed

- Verified 15,114 candidate acceleration projections with zero error.
- Verified 4,096 acceleration-off Carrier-003C comparisons with zero mismatches.
- Established reachable acceleration through 1,790 changed winners, 1,344 changed admissions and 1,388 accepted acceleration-induced actions.
- Completed all fourteen cyclic prior-slope sham rotations across 57,344 active branches.
- Established prior-slope chronology causality in 14/14 rotations through 17,515 changed winners, 15,169 changed admissions and 13,710 accepted chronology-induced actions.
- Recorded a primary true-minus-mean-sham estimate of \(-0.00896345\) with the eight-pair interval crossing zero.
- Preserved one positive secondary state-specific timing-by-feedback contrast without promoting it into the failed direct usefulness claim.
- Closed positive true-history usefulness for the fixed acceleration law and kept Carrier-004 gated.

### 18 July 2026 — Carrier-003F dark audit completed and active law preregistered

- Rejected the proposed \(0.65\) boundary as non-native and unreachable on the frozen substrate.
- Verified exact native \(\theta=0.6\) boundary algebra across 15,114 comparisons.
- Preserved Carrier-003C exactly across 2,048 activation-off comparisons and a byte-identical 39,580-record accepted trace.
- Audited 204,800 active frontiers and 819,200 candidates at coefficient zero.
- Established 28,359 crossing-versus-no-crossing frontiers and 13,423 later exit-option frontiers.
- Established that all 3,225 accepted crossings were inventory-stable swaps following a previously remembered qualifying inventory change.
- Preregistered the fixed law \(R^{003F}=R^{003C}+0.01b_t(c)\) without a sweep.
- Defined fourteen SHA-256-derived within-frontier candidate-label permutations preserving the exact native ternary multiset at every evaluated frontier.
- Kept Carrier-004 gated pending non-zero mechanism expression and positive complete-sham eight-pair usefulness.

### 18 July 2026 — Carrier-003F completed

- Completed 57,344 active Needle branch runs across all fourteen equal-exposure sham schedules.
- Verified 28,672 Carrier-001 neutrality comparisons and 28,672 sealed Carrier-003C boundary-off comparisons with zero mismatches.
- Preserved the exact native ternary multiset across 2,867,200 sham frontiers with zero mismatches.
- Reassigned 624,370 candidate event labels while retaining fourteen distinct sham assignment and projection receipts.
- Established fixed-law reachability through 501 changed winners, 407 changed admissions and 399 accepted boundary-induced actions.
- Established candidate-assignment causality in 14/14 shams through 10,504 changed winners, 14,905 changed admissions and 8,232 accepted assignment-induced actions.
- Reproduced independent schedule 7 exactly.
- Recorded a primary true-minus-mean-sham estimate of \(+0.00188337\) with eight-pair interval \([-0.00548980,0.00925654]\).
- Preserved the boundary that one individually positive sham comparison cannot substitute for the failed complete-ensemble gate.
- Closed positive native-boundary usefulness for the fixed \(w_b=0.01\) law and kept Carrier-004 gated.

---

## Crown

> **The mathematics is preserved here; the tests must answer to it, and every claim must answer to the tests.**
