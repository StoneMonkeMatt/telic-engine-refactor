import { readFileSync, writeFileSync } from 'node:fs';

const path =
  process.argv[2] ?? 'experiments/emerge-ko-001/MATHEMATICS.md';
let text = readFileSync(path, 'utf8');

function replaceOnce(label: string, search: string, replacement: string): void {
  const first = text.indexOf(search);
  if (first < 0) throw new Error(`Ledger transform missing: ${label}.`);
  if (text.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Ledger transform ambiguous: ${label}.`);
  }
  text = text.slice(0, first) + replacement + text.slice(first + search.length);
}

function replaceSection(
  label: string,
  startMarker: string,
  endMarker: string,
  replacement: string,
): void {
  const start = text.indexOf(startMarker);
  if (start < 0) throw new Error(`Ledger section start missing: ${label}.`);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end < 0) throw new Error(`Ledger section end missing: ${label}.`);
  text = text.slice(0, start) + replacement + '\n\n' + text.slice(end);
}

replaceOnce(
  'last-updated marker',
  'Last updated: 17 July 2026 — after EMERGE-CARRIER-003B',
  'Last updated: 17 July 2026 — after EMERGE-CARRIER-003C',
);

replaceOnce(
  'record-keeping doctrine',
  `5. **Timing causality is not timing utility.** Chronology may change trajectories without the true order outperforming a sham.
6. **Sham choice is a nuisance variable.** One convenient counterfeit timeline cannot define a general timing claim.
7. **The matched checkpoint pair is the unit of generalisation.** Replicates and sham rotations improve measurement but do not create independent scientific substrates.
8. **Experimental changes are staged.** Neutral plumbing precedes active coupling; active coupling precedes timing controls; complete sham robustness precedes held-out generalisation.
9. **Closed claims remain closed.** A mechanism that fails its complete sham-robustness test is not rescued by selecting a favourable sham, coefficient or subgroup.
10. **The ledger advances with the bench.** Every completed experiment updates the evidence ladder, claim boundary, active queue and receipt index.`,
  `5. **Timing causality is not timing utility.** Chronology may change trajectories without the true order outperforming a sham.
6. **Directional exposure is not directional utility.** A signed slope may change choices without improving repair.
7. **Sham choice is a nuisance variable.** One convenient counterfeit timeline cannot define a general timing claim.
8. **The matched checkpoint pair is the unit of generalisation.** Replicates and sham rotations improve measurement but do not create independent scientific substrates.
9. **Experimental changes are staged.** Neutral plumbing precedes active coupling; active coupling precedes timing controls; complete sham robustness precedes held-out generalisation.
10. **Closed claims remain closed.** A mechanism that fails its complete sham-robustness test is not rescued by selecting a favourable sham, coefficient or subgroup.
11. **The ledger advances with the bench.** Every completed experiment updates the evidence ladder, claim boundary, active queue and receipt index.`,
);

replaceOnce(
  'native slope mathematics',
  `- identical wounds, targets, microstates, seeds, proposal frontier and admission law.

---

## 4. Repair Feedback Law`,
  `- identical wounds, targets, microstates, seeds, proposal frontier and admission law.

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

## 4. Repair Feedback Law`,
);

replaceOnce(
  'evidence ladder Carrier-003C row',
  `| **Carrier-003B** | \(\overline\Delta_{Z=1}=-0.0157645\), CI \([-0.0338455,0.0023164]\) | **Complete-sham timing robustness completed** | All 14 rotations changed decisions; all 14 recovery point estimates were negative; the eight-pair ensemble interval crossed zero. The rotation-7 feedback-interference signal did not survive the complete ensemble. Positive timing usefulness is closed for the current carrier. |`,
  `| **Carrier-003B** | \(\overline\Delta_{Z=1}=-0.0157645\), CI \([-0.0338455,0.0023164]\) | **Complete-sham timing robustness completed** | All 14 rotations changed decisions; all 14 recovery point estimates were negative; the eight-pair ensemble interval crossed zero. The rotation-7 feedback-interference signal did not survive the complete ensemble. Positive timing usefulness is closed for the current carrier. |
| **Carrier-003C** | 1,325 changed winners; 802 changed admissions; 1,042 accepted actions | **Native directional carrier established** | Candidate-projected signed Telos slope changed reachable hold/swap decisions while 2,048 zero-activation projections remained exact. Recovery estimates were slightly positive, but every matched-pair interval crossed zero. |`,
);

replaceOnce(
  'Carrier-003C result boundary insertion',
  `## 10. Current Claim Boundary`,
  `## 10. Carrier-003C Result Boundary

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

## 11. Current Claim Boundary`,
);

replaceOnce(
  'established claim slope',
  `- Rotation 7 was not a privileged or necessary sham for the timing-causality finding.`,
  `- Rotation 7 was not a privileged or necessary sham for the timing-causality finding.
- The pure candidate projection exactly reproduces the native Telos duality update.
- Candidate-projected signed Telos slope changes reachable winners, admissions, accepted actions and trajectories.`,
);

replaceOnce(
  'directional claim slope',
  `- Neither directional pattern has a pair-generalised interval excluding zero.`,
  `- Carrier-003C produced small positive state-specific recovery point estimates with and without feedback.
- None of these directional patterns has a pair-generalised interval excluding zero.`,
);

replaceOnce(
  'mechanistic claim slope',
  `- Bounded EMA-history order can causally alter decisions independent of its value multiset.`,
  `- Bounded EMA-history order can causally alter decisions independent of its value multiset.
- The native Telos force, target and EMA update can be projected before selection to create a signed candidate velocity.`,
);

replaceOnce(
  'still-untested claims',
  `- Whether an existing Telos law based on historical direction, slope, persistence transition or inventory-event timing can use ordered history beneficially.
- Whether a new model-native carrier passes neutrality, reachability, complete-sham timing control and positive pair-generalised usefulness.
- Held-out generalisation of any mechanism that first clears those gates.`,
  `- Whether true chronological signed slope outperforms the complete fourteen-rotation sham family.
- Whether the native slope carrier establishes positive pair-generalised repair usefulness.
- Whether persistence transition, threshold direction, inventory-event timing or curvature can add value beyond signed slope.
- Held-out generalisation of any mechanism that first clears the complete-sham usefulness gate.`,
);

replaceSection(
  'active bench queue',
  `## 11. Active Bench Queue`,
  `## 12. Evidence and Receipt Index`,
  `## 12. Active Bench Queue

### Next: EMERGE-CARRIER-003D — Complete-Sham Native Slope Audit

Status: **admissible; not yet run**.

Carrier-003C completed:

\[
\text{native projection equivalence}
\rightarrow
\text{zero-activation neutrality}
\rightarrow
\text{reachable signed-slope influence}.
\]

Carrier-003D must now compare true signed historical direction against every non-zero cyclic rotation:

\[
r\in\{1,2,\ldots,14\}.
\]

For each pair and feedback state:

\[
\Delta_{j,Z}^{(r)}
=
Y_j(real\ slope,Z)-Y_j(sham_{r}\ slope,Z).
\]

Sham choice is averaged within each independent pair:

\[
\overline\Delta_{j,Z}
=
\frac1{14}\sum_{r=1}^{14}\Delta_{j,Z}^{(r)}.
\]

The primary usefulness endpoint is:

\[
\overline\Delta_{Z=1}>0
\]

with the eight-pair 95% interval entirely above zero.

Carrier-003D must preserve the frozen panel, wounds, capsules, coefficient, feedback law, random streams, value multiset, exposure count and terminal anchor. Rotation-specific results remain sensitivity diagnostics rather than independent substrates.

### Carrier-004 — held-out generalisation

Status: **gated**.

Carrier-004 becomes admissible only after the native slope mechanism establishes a positive pair-generalised benefit against the complete sham family.`,
);

replaceOnce(
  'evidence index heading',
  `## 12. Evidence and Receipt Index`,
  `## 13. Evidence and Receipt Index`,
);

replaceOnce(
  'result records index',
  `- \`docs/EMERGE-CARRIER-003B-ROTATION-COMPLETE-SHAM-RESULT-17JUL2026.md\``,
  `- \`docs/EMERGE-CARRIER-003B-ROTATION-COMPLETE-SHAM-RESULT-17JUL2026.md\`
- \`docs/EMERGE-CARRIER-003C-PREREGISTRATION-17JUL2026.md\`
- \`docs/EMERGE-CARRIER-003C-NATIVE-PROJECTED-SLOPE-RESULT-17JUL2026.md\``,
);

replaceOnce(
  'executable index',
  `- \`experiments/emerge-ko-001/carrier-003b-aggregate.part00\` through \`part02\``,
  `- \`experiments/emerge-ko-001/carrier-003b-aggregate.part00\` through \`part02\`
- \`src/logic/dualityProjection.ts\`
- \`experiments/emerge-ko-001/verify-duality-projection.ts\`
- \`experiments/emerge-ko-001/assemble-carrier-003c.ts\`
- \`.github/workflows/emerge-carrier-003c.yml\``,
);

replaceOnce(
  'Carrier-003C receipts',
  `Carrier-003B artifact:

\`\`\`text
a86c473f5a17dbc53fa693662f9665f485c7b969159f6cf0ffb435210136ba88
\`\`\``,
  `Carrier-003B artifact:

\`\`\`text
a86c473f5a17dbc53fa693662f9665f485c7b969159f6cf0ffb435210136ba88
\`\`\`

Carrier-003C workflow run:

\`\`\`text
29610229475
\`\`\`

Carrier-003C generated runner:

\`\`\`text
b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a
\`\`\`

Carrier-003C summary:

\`\`\`text
a085f78c80e6ea6f7b5f6eb9878517a4bb646c1a7496505ebd3468b3e27e2644
\`\`\`

Carrier-003C artifact:

\`\`\`text
fd051cfcc4ca427ec6a043744eb1eb031cf50ea101f23a9f5a4a8abe5c8395b9
\`\`\``,
);

replaceOnce(
  'change log heading',
  `## 13. Change Log`,
  `## 14. Change Log`,
);

replaceOnce(
  'Carrier-003C change log',
  `- Gated held-out generalisation pending a new model-native mechanism that earns positive complete-sham-controlled usefulness.

---

## Crown`,
  `- Gated held-out generalisation pending a new model-native mechanism that earns positive complete-sham-controlled usefulness.

### 17 July 2026 — Carrier-003C completed

- Exposed a pure candidate projection of the existing Telos force, target and EMA update.
- Verified 6,400 native projection comparisons with zero error.
- Verified 2,048 zero-activation comparisons with zero mismatches.
- Established reachable signed-slope influence through 1,325 changed winners, 802 changed admissions and 1,042 accepted induced actions.
- Preserved the recovery-usefulness boundary because all matched-pair intervals crossed zero.
- Opened Carrier-003D complete-sham native slope testing while keeping Carrier-004 gated.

---

## Crown`,
);

writeFileSync(path, text, 'utf8');
console.log(`Advanced ${path} through EMERGE-CARRIER-003C.`);
