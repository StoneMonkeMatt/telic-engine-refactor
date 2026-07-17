# EMERGE-CARRIER-001 — Macro-History Architectural Null

Date: 17 July 2026  
Status: completed architectural null experiment  
Branch: `agent/emerge-ko-001-sandbox`  
Crown line: **A remembered state cannot cause anything until the transition kernel can carry it.**

## Question

Does the current equal-wound recovery kernel consume retained emergence macro-history as an executable causal state?

The tested twin condition was:

\[
S_t^{(0)}=S_t^{(1)},
\qquad
W_t^{(0)}=W_t^{(1)},
\qquad
Z_t^{(0)}=Z_t^{(1)},
\qquad
\xi_t^{(0)}=\xi_t^{(1)},
\]

with only the retained macro-history receipt changed:

\[
M_t^{(0)}\ne M_t^{(1)}.
\]

The preregistered expectation was an exact null because the current recovery transition kernel has no macro-history input.

## Experimental boundary

The experiment reused the frozen V2.2 panel with selector SHA-256:

```text
4e6c4bc03c0747d55f9d169c5951a3db6a56dc4e481fc567fb3f7699835ff790
```

For every frozen lesion, the harness executed two history twins:

- `M0-unlatched`: source checkpoint had not fired the persistence declaration;
- `M1-latched`: source checkpoint had fired the emergence declaration.

The capsule was retained as a complete receipt but deliberately not consumed by proposal generation, ranking, feedback augmentation, admission, or state transition. Any difference between the twins would therefore indicate undocumented state leakage or nondeterminism.

## Scale

- matched checkpoint pairs: **8**;
- symbolic microstates tested: **16**;
- frozen exact two-bridge lesions: **512**;
- feedback conditions per lesion: **2**;
- history twins per condition: **2**;
- branch executions: **2,048**;
- byte-level twin comparisons: **1,024**.

## Result

All twin comparisons were byte-identical after projecting away receipt-only capsule labels:

\[
N_{\mathrm{identical}}=1024,
\qquad
N_{\mathrm{mismatch}}=0.
\]

The cell means were:

| Retained history receipt | Feedback | n | Mean final target recovery |
|---|---:|---:|---:|
| `M0-unlatched` | 0 | 512 | 0.3544921875 |
| `M0-unlatched` | 1 | 512 | 0.7861328125 |
| `M1-latched` | 0 | 512 | 0.3544921875 |
| `M1-latched` | 1 | 512 | 0.7861328125 |

Therefore:

\[
\Gamma_{\mathrm{carrier}}
=
[(0.7861328125-0.3544921875)
-
(0.7861328125-0.3544921875)]
=
\boxed{0}.
\]

Comparison-receipt SHA-256:

```text
32a5124793268792eb9ee3651ce4d9e6ddd27b96e6f6f4059fc6ded28faa0c81
```

## Scientific conclusion

\[
\boxed{
\text{The retained emergence macro-history is currently descriptive metadata, not an executable causal state in the recovery kernel.}
}
\]

This is a positive architectural result. It confirms:

1. the current kernel is deterministic under exact twin conditions;
2. there is no hidden history leak;
3. V2.2 measured different recovery efficacy across checkpoint classes, but did not transmit the class history into the post-lesion dynamics;
4. the next experiment must create an explicit state carrier before an identical-microstate macro-history test can be meaningful.

It does not refute emergence-specific causal efficacy. It establishes that the current code has no pathway through which retained macro-history could exercise it.

## Existing mathematical opening

The Telos model already contains a stateful duality update:

\[
D_{t+1}^{EMA}
=
D_t^{EMA}
+
\alpha\left(\widehat D(S_{t+1})-D_t^{EMA}\right),
\qquad \alpha=0.2.
\]

The proposal ranker also already contains a duality-loss penalty for harmful insertions. The narrowest non-arbitrary carrier design is therefore to carry `D_EMA` forward and let it replace the memoryless raw-duality comparison inside that existing penalty, rather than adding an emergence threshold gate or increasing feedback strength by declaration.

# Bench roadmap

## EMERGE-CARRIER-002A — State Capsule Interface / Zero-Coupling Neutrality

Add an explicit experimental capsule:

\[
M_t=
(D_t^{EMA},p_t,\mathcal E_t,I_t,H_t^D),
\]

where:

- `D_EMA` is the carried smoothed duality;
- `p_t` is the persistence counter;
- `E_t` is the declaration state;
- `I_t` records the qualifying inventory-change history;
- `H_t^D` is the bounded duality history required for receipts.

First set the carrier coupling to zero. The new interface must reproduce EMERGE-CARRIER-001 byte-for-byte. This proves that adding the state object does not itself alter the experiment.

Preregistered expectation:

\[
\Gamma_{002A}=0.
\]

## EMERGE-CARRIER-002B — Native Duality-Continuity Carrier

Activate only the model-native continuity path:

\[
D_{t+1}^{EMA}(c)
=
D_t^{EMA}
+
0.2\left(\widehat D(c)-D_t^{EMA}\right).
\]

Use this carried value inside the ranker's already-existing duality-loss comparison for insertion candidates. Keep:

- `kappa = 0.25`;
- the equal two-bridge wounds;
- identical microstates;
- identical target bridges;
- identical random streams;
- the same feedback and admission laws.

Compare:

\[
A=1\quad\text{active state carrier}
\]

against:

\[
A=0\quad\text{capsule knockout}.
\]

Primary estimator:

\[
\Gamma_A
=
[Y(M_1,A_1)-Y(M_1,A_0)]
-
[Y(M_0,A_1)-Y(M_0,A_0)].
\]

No directional sign is preregistered. The first question is whether retained history changes any candidate rankings or trajectories through a model-native pathway.

Required diagnostics:

- candidate ranks changed by active carrier;
- accepted carrier-induced decisions;
- first divergence step;
- insert / hold / swap action class;
- reconvergence rate;
- target recovery and coherence;
- capsule state before and after every accepted transition.

## EMERGE-CARRIER-003 — Real History vs Equal-Distribution Sham

Only after 002B demonstrates a functioning carrier:

- real history: the capsule follows the checkpoint's true duality trajectory;
- sham history: the same capsule values are yoked or permuted across time;
- equal marginal distribution, equal duration, equal total state exposure;
- only temporal alignment differs.

Test:

\[
Y_{\mathrm{real\ history}}
>
Y_{\mathrm{sham\ history}}.
\]

This asks whether the timing of the remembered state contains useful control information.

## EMERGE-CARRIER-004 — Held-Out Generalisation

Replicate the winning preregistered design across:

- unseen baseline seeds;
- fresh matched microstates;
- alternative exact lesion pairs;
- held-out symbol inventories;
- ontology perturbation profiles.

The unit of generalisation remains the independent matched microstate/history pair, not the number of stochastic replicates inside one pair.

## Ordered bench sequence

\[
\boxed{
\text{Carrier null}
\rightarrow
\text{zero-coupling capsule}
\rightarrow
\text{native active carrier}
\rightarrow
\text{real vs sham timing}
\rightarrow
\text{held-out generalisation}
}
\]

## Artifact receipt

GitHub Actions workflow run: `29565733958`  
Workflow artifact: `EMERGE-CARRIER-001-results`  
Artifact SHA-256:

```text
cb9792a72f09ad0c8881b041fc66dfba05a9ae393c6a294ad7c684df87231865
```
