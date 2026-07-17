# EMERGE-CARRIER-003C — Native Projected Signed-Slope Verification

Date: 17 July 2026  
Status: completed mechanistic verification experiment  
Branch: `agent/emerge-ko-001-sandbox`  
Crown line: **The engine can now judge a possible move by the direction it would carry the system, not only by the level it would occupy.**

## Question

Does the model-native, candidate-projected signed duality velocity change reachable `hold ↔ swap` decisions while preserving the exact passive trajectory boundary?

Carrier-003B established that temporal order changes behaviour across all cyclic shams, but the frozen EMA-level carrier did not convert true chronology into demonstrated repair usefulness. Carrier-003C exposed the direction already latent in the existing Telos update:

\[
v_t(c)=D_{t+1}^{EMA}(c)-D_t^{EMA}.
\]

No emergence declaration gate, feedback-strength change, forced mutation or coefficient sweep was introduced.

## Preregistered boundary

The experiment was committed before outcome execution in:

```text
 docs/EMERGE-CARRIER-003C-PREREGISTRATION-17JUL2026.md
```

It inherited:

- the frozen V2.2 matched panel;
- 8 independent matched checkpoint pairs;
- 16 symbolic microstates;
- 512 exact two-bridge wounds;
- Carrier-002 macro-history capsules;
- identical proposal, tie-breaking, admission, lesion and branch random streams;
- repair feedback `kappa = 0.25`;
- duality coefficient `w_D = 0.5`.

No directional recovery sign was preregistered.

## Native projected law

For candidate `c`:

\[
F(c)=0.618C(c)+0.3N(c)+0.05,
\]

\[
T_D(c)
=
\min\left(1,
\widehat D(c)[1+0.2F(c)]
\right),
\]

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

For non-insertion candidates:

\[
R_t^{A=1}(c)=R_t^{A=0}(c)+0.5v_t(c).
\]

For insertion candidates, the baseline raw-duality loss was removed before applying the same signed velocity term:

\[
R_t^{A=1}(c)
=
R_t^{A=0}(c)+0.5[L_{raw}(c)+v_t(c)].
\]

Both active and knockout branches updated their capsules through the native projected law after accepted transitions. Carrier activation changed ranking only.

## Integrity gates

Every preregistered gate passed.

### Projection equivalence

The pure public projection was checked against the engine's existing private update across seeded accepted and held trajectories:

- comparisons: **6,400**;
- mismatches: **0**;
- maximum absolute error: **0**.

Thus the exposed projection is exactly the already-existing Telos update under the frozen native parameters.

### Source and substrate integrity

- all preregistered source SHA-256 receipts matched;
- repository type-check passed;
- frozen V2.2 selector reproduced;
- Carrier-001 architectural null reproduced;
- Carrier-002 capsules froze and verified;
- deterministic Carrier-003C assembly passed.

Generated runner SHA-256:

```text
b4d0ff5407735b2f01c7c0dd1d15a27b8dcb93342359cb787147741858764c0a
```

### Passive neutrality

- capsule-bearing zero-activation comparisons: **2,048**;
- mismatches against Carrier-001: **0**.

Therefore:

\[
N_{neutral}=2048,
\qquad
N_{mismatch}=0.
\]

## Scale

- panel pairs: **8**;
- symbolic microstates: **16**;
- frozen exact two-bridge lesions: **512**;
- total branch executions: **4,096**;
- active slope branches: **2,048**;
- accepted active-transition receipts: **39,580**.

## Mechanistic result

The signed slope was exposed to every candidate class:

| Action | Candidate exposures | Non-zero slope adjustments |
|---|---:|---:|
| hold | 204,800 | 204,800 |
| delete | 204,800 | 204,800 |
| swap | 204,800 | 204,800 |
| combine | 204,800 | 204,800 |

Total adjusted candidates:

\[
N_{adjusted}=819200.
\]

Maximum absolute ranking adjustment:

\[
\max|\Delta R_{slope}|=0.02771943835.
\]

Across exact comparisons while active and knockout branches still shared the same pre-state:

- comparable decisions: **80,379**;
- changed exact winners: **1,325**;
- changed admission decisions: **802**;
- accepted slope-induced actions: **1,042**;
- `hold → swap`: **386**;
- `swap → hold`: **330**;
- `swap → different swap`: **609**;
- other winner changes: **0**;
- active branches that diverged: **1,298**;
- active branches that reconverged: **28**;
- reconvergence events: **34**.

Therefore:

\[
\boxed{N_{slope\ decisions}>0}
\]

and the preregistered reachability endpoint passed decisively.

## Recovery cells

| Capsule | Slope active | Feedback | n | Mean target recovery | Mean coherence |
|---|---:|---:|---:|---:|---:|
| M0 unlatched | 0 | 0 | 512 | 0.3544921875 | 0.6838381410 |
| M0 unlatched | 1 | 0 | 512 | 0.3554687500 | 0.6829787660 |
| M1 latched | 0 | 0 | 512 | 0.3544921875 | 0.6838381410 |
| M1 latched | 1 | 0 | 512 | 0.3623046875 | 0.6834214744 |
| M0 unlatched | 0 | 1 | 512 | 0.7861328125 | 0.6817548077 |
| M0 unlatched | 1 | 1 | 512 | 0.7998046875 | 0.6798798077 |
| M1 latched | 0 | 1 | 512 | 0.7861328125 | 0.6817548077 |
| M1 latched | 1 | 1 | 512 | 0.8076171875 | 0.6805829327 |

## Recovery estimators

Without repair feedback:

\[
\Gamma_{A,Z=0}=+0.0068359375,
\]

with matched-pair 95% interval:

\[
[-0.0127419650,\ 0.0264138400].
\]

With repair feedback:

\[
\Gamma_{A,Z=1}=+0.0078125,
\]

with matched-pair 95% interval:

\[
[-0.0078030454,\ 0.0234280454].
\]

The state-by-slope-by-feedback interaction was:

\[
\Gamma_{M\times A\times Z}=+0.0009765625,
\]

with matched-pair 95% interval:

\[
[-0.0209513277,\ 0.0229044527].
\]

Every recovery interval crosses zero.

## Pair effects

| Pair | \(\Gamma_{A,Z=0}\) | \(\Gamma_{A,Z=1}\) | Three-way interaction |
|---|---:|---:|---:|
| pair-01 | +0.0234375 | +0.0390625 | +0.0156250 |
| pair-02 | +0.0156250 | -0.0078125 | -0.0234375 |
| pair-03 | -0.0390625 | +0.0078125 | +0.0468750 |
| pair-04 | +0.0390625 | +0.0156250 | -0.0234375 |
| pair-05 | -0.0078125 | 0 | +0.0078125 |
| pair-06 | 0 | +0.0156250 | +0.0156250 |
| pair-07 | +0.0156250 | +0.0156250 | 0 |
| pair-08 | +0.0078125 | -0.0234375 | -0.0312500 |

## Scientific conclusion

Carrier-003C establishes:

\[
\boxed{
\text{candidate-projected signed native duality slope is an executable and reachable causal control signal}
}
\]

The result is stronger than a diagnostic observation. The slope entered pre-selection ranking and changed exact winners, admissions, accepted actions and subsequent trajectories while the zero-activation branches remained byte-identical to Carrier-001.

Carrier-003C does **not** establish:

- that signed slope improves repair;
- that the latched `M1` history benefits more than `M0`;
- that repair feedback amplifies a slope-specific benefit;
- that true chronological slope outperforms equal-distribution sham slopes;
- that held-out generalisation is warranted.

The honest verdict is:

\[
\boxed{
\text{native directional carrier established; recovery usefulness not established; complete-sham slope audit now admissible}
}
\]

## Next experiment

# EMERGE-CARRIER-003D — Complete-Sham Native Slope Audit

Carrier-003D will compare true signed historical direction against all fourteen non-zero cyclic sham schedules while preserving:

- the exact history-value multiset;
- schedule length and exposure;
- terminal checkpoint anchor;
- capsule identity;
- symbolic microstate;
- wound and target bridges;
- feedback state;
- branch random stream.

Sham choice will be averaged inside each of the eight independent matched pairs. The primary question is whether true chronological slope produces a positive pair-generalised repair advantage over the complete sham ensemble.

## Receipts

GitHub Actions workflow run:

```text
29610229475
```

V2.2 selector SHA-256:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

Capsule selector SHA-256:

```text
be18af79000ad1aa65515402528d3dfeeb28d6c7ffa681a659f2510fa060c3b5
```

Summary SHA-256:

```text
a085f78c80e6ea6f7b5f6eb9878517a4bb646c1a7496505ebd3468b3e27e2644
```

Trace SHA-256:

```text
aadb038e3371273421a3b2f7c988300510b793ae22fe1b84fc3115da50bdec69
```

Workflow artifact:

```text
EMERGE-CARRIER-003C-results
```

Artifact SHA-256:

```text
fd051cfcc4ca427ec6a043744eb1eb031cf50ea101f23a9f5a4a8abe5c8395b9
```
