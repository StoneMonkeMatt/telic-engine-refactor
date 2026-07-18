# EMERGE-CARRIER-003F — Dark Boundary-Transition Audit

Date: 18 July 2026
Status: full-trajectory dark density and co-occurrence audit completed locally; no active ranking law preregistered
Branch: `agent/emerge-ko-001-sandbox`

## Audit question

Can the existing pure duality projection expose a candidate-specific discrete boundary event without changing ranking, admission, persistence, inventory logic or observer declaration?

The projected event is:

\[
b_t(c)
=
\mathbf 1[D_t<\theta\le D_{t+1}(c)]
-
\mathbf 1[D_{t+1}(c)<\theta\le D_t].
\]

Its meanings are limited to the numerical boundary:

- (+1): below to at-or-above threshold;
- (0): no boundary crossing;
- (-1): at-or-above to below threshold.

It does not project the compound observer-emergence declaration.

## Implementation boundary

`projectDualityBoundaryTransition` was added to `src/logic/dualityProjection.ts` as a pure wrapper around `projectDualityUpdate`.

The threshold is an explicit required argument. The production module does not hard-code either audit value. There are no production call sites and no score, delta score, admission or state mutation is changed.

The verification harness is:

```text
experiments/emerge-ko-001/verify-duality-boundary-transition.ts
```

## Threshold discrepancy caught by the first gate

The proposed audit value was:

\[
\theta_{proposed}=0.65.
\]

The frozen V2.2 panel and all sixteen Carrier-002 capsules instead contain:

\[
\theta_{frozen}=0.6.
\]

Therefore, (0.65) cannot be described as the native threshold for this substrate. The harness was run dark at both values rather than silently changing either the proposal or the frozen configuration.

## Exact algebra verification

Both threshold audits reused the same frozen selectors:

- V2.2 selector: `4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790`;
- capsule selector: `be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5`.

For each audit:

- boundary truth-table comparisons: **6**;
- history transitions: **229**;
- candidate/history comparisons: **15,114**;
- maximum projection error: **0**;
- ternary classification mismatches: **0**.

The current EMA range was:

\[
[0.3393516834,\ 0.6317618313],
\]

and the projected next-duality range was:

\[
[0.3577940687,\ 0.6460650041].
\]

## Proposed threshold result: \(\theta=0.65\)

The proposed threshold failed the reachability gate:

- history exits: **0**;
- history entries: **0**;
- history no-crossings: **15,114**;
- initial frozen frontiers: **1,024**;
- competing candidates: **4,096**;
- candidate-divergent frontiers: **0**;
- crossing candidates: **0**.

The largest projected candidate value in the frontier audit was:

\[
0.6478076526<0.65.
\]

Thus the proposed (0.65) boundary is not merely low-density; it is unreachable in this frozen audit.

\[
\boxed{N_{boundary\ decisions}(0.65)=0}
\]

No active Carrier-003F experiment is admissible at (0.65) on this substrate.

## Frozen native threshold result: \(\theta=0.6\)

At the threshold actually carried by the panel and capsules, the event channel is live.

Across the history algebra:

- exits: **102**;
- entries: **1,212**;
- no-crossings: **13,800**.

These are algebra exposures over frozen history values and candidate sequences. They are not accepted timeline events and have no row-wise temporal join to the transition trace. Accepted events are classified independently below.

Across exact step-one candidate frontiers for every frozen lesion and both capsules:

- frontiers: **1,024**;
- candidates: **4,096**;
- candidate-divergent frontiers: **252**;
- divergent-frontier fraction: **0.24609375**;
- crossing candidates: **2,895**;
- crossing-candidate fraction: **0.706787109375**;
- frontiers with an entry option: **839**;
- frontiers with an exit option: **0**.

At a fixed current state all candidates begin on the same side of the threshold. A single frontier therefore cannot contain both (+1) and (-1). The valid control-density test is crossing versus no crossing: ({-1,0}) or ({+1,0}).

The initial frozen-lesion frontier contains meaningful entry-versus-no-entry discrimination at (0.6), but no exit option. Exit reachability must be audited on later dynamic frontiers before any symmetric boundary law can be claimed.

## Darkness and baseline neutrality

Attaching the dark event receipt produced:

- ranked candidate comparisons: **4,096**;
- ranked frontier mismatches: **0**;
- production call sites outside the projection module: **0**.

The complete sealed Carrier-003C reference was then regenerated and replayed:

- generated source SHA-256: `b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a`;
- activation-off comparisons: **2,048**;
- activation-off mismatches: **0**;
- \(\Gamma_{A,Z=0}=0.0068359375\);
- \(\Gamma_{A,Z=1}=0.0078125\);
- triple interaction: `0.0009765625`;
- changed winners: **1,325**;
- changed admissions: **802**;
- accepted slope-induced actions: **1,042**.

These are the sealed Carrier-003C values. Production behavior remains unchanged while the boundary projector is dark.

## Full-trajectory dark frontier audit

The exact sealed Carrier-003C run was replayed with the boundary projector attached at coefficient zero to every active candidate. The audit covered:

- active decision frontiers: **204,800**;
- candidate projections: **819,200**;
- no-crossing candidates: **761,925**;
- exit candidates: **27,291**;
- entry candidates: **29,984**;
- crossing-candidate fraction: **0.069915771484375**;
- candidate-divergent frontiers: **28,359**;
- divergent-frontier fraction: **0.1384716796875**;
- crossing-versus-no-crossing frontiers: **28,359**;
- bidirectional frontiers: **0**.

The later exit channel is reachable:

- frontiers with an exit option: **13,423**;
- exit-option fraction: **0.0655419921875**;
- exits available at step one: **0**;
- exits available after step one: **13,423**;
- frontiers with an entry option: **18,378**;
- entries available at step one: **1,678**;
- entries available after step one: **16,700**.

The step-one counts exactly reproduce twice the frozen-frontier audit because the dynamic replay has two feedback cells: \(252\times2=504\) divergent frontiers, \(839\times2=1{,}678\) entry-option frontiers and zero exit-option frontiers.

The selector chose an exit candidate **8,128** times and an entry candidate **3,231** times. Of these, **1,716** exits and **1,509** entries were admitted; **6,412** selected exits and **1,722** selected entries were rejected. This is a dark observation only: the boundary event did not contribute to selection or admission.

## Accepted-event inventory and persistence co-occurrence

The sealed accepted trace contains **39,580** transitions. Every selected projection reproduced the recorded post-step EMA exactly:

- exact comparisons: **39,580**;
- mismatches: **0**;
- accepted exits: **1,716**;
- accepted entries: **1,509**;
- accepted no-crossings: **36,355**.

All **3,225** accepted crossings were swaps. None changed inventory at that step. All occurred with `qualifyingInventoryChangeSeen=true`, so the engine already remembered an earlier qualifying inventory change.

| Accepted event | Persistence transition | Count | Declaration transition |
|---|---:|---:|---:|
| Exit, undeclared | \(0\to1\) | 866 | \(0\to0\) |
| Exit, latched | \(2\to2\) | 850 | \(1\to1\) |
| Entry, undeclared | \(1\to0\) | 634 | \(0\to0\) |
| Entry, latched | \(2\to2\) | 875 | \(1\to1\) |

Crossing the boundary did not itself declare observer state. The **987** declarations in the accepted trace occurred on no-crossing transitions from persistence \(1\to2\), after the state was already at or above threshold.

The accepted exits also cannot be called structural recoveries without qualification. Their recorded post-step target recovery was:

| Post-step target recovery | Accepted exits |
|---:|---:|
| 0 | 614 |
| 0.5 | 719 |
| 1 | 383 |

Thus an exit is a numerical threshold event, not a proxy for complete target repair. It is also not an immediate inventory reset. In an undeclared state it seeds the native persistence counter; an entry resets that counter. Once latched, the existing update law leaves persistence unchanged.

## Exact replay preservation

The dynamic audit preserved the sealed run at two independent levels:

- activation-off comparisons: **2,048/2,048**;
- activation-off mismatches: **0**;
- baseline replay receipt: `5712f6d7b257fe7d369c4dd4e70251a281f43995203659b1790e78eec7aa5bd3`;
- dark dynamic replay receipt: `5712f6d7b257fe7d369c4dd4e70251a281f43995203659b1790e78eec7aa5bd3`;
- baseline accepted-trace SHA-256: `aadb038e3371273421a3b2f7c988300510b793ae22fe1b84fc3115da50bdec69`;
- dark dynamic accepted-trace SHA-256: `aadb038e3371273421a3b2f7c988300510b793ae22fe1b84fc3115da50bdec69`.

The base projections, estimators, uncertainty, paired diagnostics and accepted trace therefore remain exact while the boundary feature is dark.

## Decision boundary

Carrier-003F has not yet opened an active experiment.

The earned conclusions are:

\[
\boxed{\theta=0.65\text{ is non-native and fails reachability on the frozen substrate}}
\]

\[
\boxed{\theta=0.6\text{ is exact, dark-neutral and candidate-discriminating}}
\]

\[
\boxed{N_{exit-option,\ step>1}=13{,}423>0}
\]

\[
\boxed{N_{candidate-divergent\ frontiers}=28{,}359>0}
\]

The full-trajectory reachability and co-occurrence gate is passed. Carrier-003F has still not established usefulness: no boundary coefficient has been activated and no sham schedule has been run. The next admissible work is to preregister one fixed active ranking coefficient and a complete-sham event schedule, then require positive eight-pair usefulness before opening Carrier-004.

## Local receipts

Pure projection source SHA-256:

```text
a947df45d5c5777e4226b2e5e6fffd4fd5bed44c61512497e8e98219752a2270
```

Boundary verification source SHA-256:

```text
d575cea7f655b86d1f1cb5613821e006e1632d9f78feb9161f4179f9c62b2819
```

Proposed-threshold audit SHA-256:

```text
93c59f79a3cab71991cd3fced4b8ddcfef54fd90efdccf32b5d38d7254a06b43
```

Frozen-threshold audit SHA-256:

```text
190858155d4fa84999e8a25d03c069ba1612a7f3dcb56c92be78f6f7263b80ed
```

Carrier-003C darkness summary SHA-256:

```text
25d822e78bd143b9e96e7fc6d65403a0017f483854effa2537d1eda325ddfcfa
```

Dynamic assembly source SHA-256:

```text
46539affe9c39f00ac9d2a5e1c6b892cff0e1410fd2adcda39cb9eb710ae1fe2
```

Accepted co-occurrence source SHA-256:

```text
4e03d609b3c94c8067e161fee354c2630488b7ad30e0562728c51765fd8ff0f6
```

Dynamic finalizer source SHA-256:

```text
4f84004a144b40c5d3793d227b0fe645640d33751385c90f2bfce5ed49cc7e47
```

Generated dynamic runner SHA-256:

```text
edf72cbdba0a07b842edde47a9a4b05dd715c56706212749c0e1f9640fb855f1
```

Accepted co-occurrence result SHA-256:

```text
39a48247d2ebe5d18f7eb9d2bc02f7af3c62a3d94868e682e3a72e9a437e7364
```

Consolidated dark dynamic result SHA-256:

```text
e75be896e45618ea93ff3a0027928a772def834b7b3e701c7c13d6706372dbf9
```

> **The proposed boundary is dead. The native boundary is live on both later exit and entry frontiers, but usefulness remains untested until an active law defeats its complete shams.**
