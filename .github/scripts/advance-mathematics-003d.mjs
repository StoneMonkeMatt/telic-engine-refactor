import { readFileSync, writeFileSync } from 'node:fs';

const path = process.argv[2] ?? 'experiments/emerge-ko-001/MATHEMATICS.md';
let text = readFileSync(path, 'utf8');

function replaceOnce(label, search, replacement) {
  const first = text.indexOf(search);
  if (first < 0) throw new Error(`Ledger transform missing: ${label}.`);
  if (text.indexOf(search, first + search.length) >= 0) {
    throw new Error(`Ledger transform ambiguous: ${label}.`);
  }
  text = text.slice(0, first) + replacement + text.slice(first + search.length);
}

function insertBefore(label, marker, insertion) {
  const index = text.indexOf(marker);
  if (index < 0) throw new Error(`Ledger insertion marker missing: ${label}.`);
  text = text.slice(0, index) + insertion + text.slice(index);
}

function appendAfterLine(label, lineStart, addition) {
  const start = text.indexOf(lineStart);
  if (start < 0) throw new Error(`Ledger line missing: ${label}.`);
  const end = text.indexOf('\n', start);
  if (end < 0) throw new Error(`Ledger line end missing: ${label}.`);
  text = text.slice(0, end + 1) + addition + text.slice(end + 1);
}

function replaceSection(label, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker);
  if (start < 0) throw new Error(`Ledger section start missing: ${label}.`);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end < 0) throw new Error(`Ledger section end missing: ${label}.`);
  text = text.slice(0, start) + replacement + '\n\n' + text.slice(end);
}

replaceOnce(
  'last updated',
  'Last updated: 17 July 2026 — after EMERGE-CARRIER-003C',
  'Last updated: 17 July 2026 — after EMERGE-CARRIER-003D',
);

replaceOnce(
  'timing endpoint history',
  'Carrier-003 and all fourteen Carrier-003B rotations passed this endpoint.',
  'Carrier-003, all fourteen Carrier-003B rotations and all fourteen Carrier-003D signed-slope rotations passed their corresponding timing endpoint.',
);

appendAfterLine(
  'evidence ladder Carrier-003D row',
  '| **Carrier-003C** |',
  String.raw`| **Carrier-003D** | \(\overline\Delta_{Z=1}=-0.0055106\), CI \([-0.0193342,0.0083130]\) | **Complete-sham signed-slope robustness completed** | All 14 rotations changed reachable decisions. Twelve of fourteen recovery point estimates were negative, but every rotation interval and the eight-pair ensemble interval crossed zero. True signed-slope chronology did not establish repair usefulness; Carrier-004 remains gated. |
`,
);

insertBefore(
  'Carrier-003D result boundary',
  '## 11. Current Claim Boundary',
  String.raw`## 11. Carrier-003D Result Boundary

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

`,
);

replaceOnce('current claim heading', '## 11. Current Claim Boundary', '## 12. Current Claim Boundary');

appendAfterLine(
  'established Carrier-003D claim',
  '- Candidate-projected signed Telos slope changes reachable winners, admissions, accepted actions and trajectories.',
  '- Signed-slope temporal ordering changes reachable decisions across every non-zero cyclic sham while value multiset, exposure and terminal anchor remain fixed.\n',
);

replaceOnce(
  'directional support block',
  String.raw`- Carrier-003C produced small positive state-specific recovery point estimates with and without feedback.
- None of these directional patterns has a pair-generalised interval excluding zero.`,
  String.raw`- Carrier-003C produced small positive state-specific recovery point estimates with and without feedback.
- Under Carrier-003D feedback, twelve of fourteen true-minus-sham point estimates were negative.
- Carrier-003D pair effects were split four positive and four negative.
- None of these directional patterns has a pair-generalised interval excluding zero.`,
);

appendAfterLine(
  'mechanistic signed chronology claim',
  '- The native Telos force, target and EMA update can be projected before selection to create a signed candidate velocity.',
  '- The order of signed candidate velocity can alter decisions independently of its value multiset and exposure.\n',
);

replaceOnce(
  'closed carrier claims',
  String.raw`- The claim that true EMA chronology improves repair relative to equal-distribution cyclic shams.
- The claim that the Carrier-003 negative timing×feedback interaction is robust across sham choice.
- Direct progression of the current timing carrier to held-out generalisation.`,
  String.raw`- The claim that true EMA-level chronology improves repair relative to equal-distribution cyclic shams.
- The claim that true signed-slope chronology improves repair relative to the complete cyclic-sham family under the fixed \(w_v=0.5\) law.
- The claim that the Carrier-003 negative timing×feedback interaction is robust across sham choice.
- Direct progression of either completed timing carrier to held-out generalisation.`,
);

replaceSection(
  'still untested claims',
  '- Whether true chronological signed slope outperforms the complete fourteen-rotation sham family.',
  '### Invalidated or rejected',
  String.raw`- Whether bounded-history curvature or acceleration carries useful repair information beyond first-order slope.
- Whether persistence-state transition direction, threshold-crossing direction or inventory-event timing yields positive complete-sham-controlled usefulness.
- Held-out generalisation of any mechanism that first clears the complete-sham usefulness gate.`,
);

replaceSection(
  'active bench queue',
  '## 12. Active Bench Queue',
  '## 13. Evidence and Receipt Index',
  String.raw`## 13. Active Bench Queue

### Next: EMERGE-CARRIER-003E — Higher-Order Directional Law Audit

Status: **architecture and mathematics audit required before preregistration**.

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

The next audit must identify the cleanest model-native feature not reducible to current level or first-order slope. Candidate families are:

1. bounded-history curvature or acceleration;
2. persistence-state transition direction;
3. threshold-crossing direction;
4. inventory-event timing.

Selection must follow existing Telos variables and equations rather than a retrospective attempt to rescue Carrier-003D. Any selected mechanism must again pass:

1. projection validity;
2. zero-coupling neutrality;
3. reachable decision influence;
4. complete-sham temporal control;
5. positive pair-generalised usefulness.

### Carrier-004 — held-out generalisation

Status: **gated**.

Carrier-004 becomes admissible only after a higher-order model-native mechanism establishes a positive pair-generalised benefit against its complete sham family.`,
);

replaceOnce('evidence index heading', '## 13. Evidence and Receipt Index', '## 14. Evidence and Receipt Index');

appendAfterLine(
  'result records index',
  '- `docs/EMERGE-CARRIER-003C-NATIVE-PROJECTED-SLOPE-RESULT-17JUL2026.md`',
  '- `docs/EMERGE-CARRIER-003D-PREREGISTRATION-17JUL2026.md`\n- `docs/EMERGE-CARRIER-003D-COMPLETE-SHAM-NATIVE-SLOPE-RESULT-17JUL2026.md`\n',
);

appendAfterLine(
  'executable index',
  '- `.github/workflows/emerge-carrier-003c.yml`',
  '- `.github/scripts/emerge-carrier-003d-runner.ts`\n- `.github/scripts/emerge-carrier-003d-aggregate.ts`\n- `.github/workflows/emerge-carrier-003d.yml`\n',
);

insertBefore(
  'Carrier-003D receipts',
  '\n---\n\n## 14. Change Log',
  String.raw`
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
`,
);

replaceOnce('change log heading', '## 14. Change Log', '## 15. Change Log');

insertBefore(
  'Carrier-003D change log',
  '\n---\n\n## Crown',
  String.raw`
### 17 July 2026 — Carrier-003D completed

- Reproduced Carrier-003C, the frozen panel, Carrier-001 and all capsule receipts.
- Verified 4,096 schedule-neutrality comparisons with zero mismatches.
- Completed all fourteen cyclic signed-slope sham rotations across 57,344 active branches.
- Established signed-slope timing causality through 9,813 changed winners, 6,090 changed admissions and 7,309 accepted timing-induced actions.
- Recorded a primary real-minus-mean-sham estimate of \(-0.0055106\) with eight-pair interval crossing zero.
- Preserved the boundary that twelve negative rotation point estimates do not establish general harm.
- Closed positive true-slope chronology usefulness for the fixed first-order law and kept Carrier-004 gated.
- Opened a higher-order model-native directional law audit without retrospective coefficient tuning.
`,
);

writeFileSync(path, text, 'utf8');
console.log(`Advanced ${path} through EMERGE-CARRIER-003D.`);
