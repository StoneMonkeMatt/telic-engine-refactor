# Blue Whale / Intelligent Notes — Mathematics and Algorithms V3

> **Restored discovery source of truth — updated 14 July 2026.** V3 preserves the complete V2 mathematical body and adds verified discoveries, corrections, implementation findings, and live open questions without pruning mathematical architecture merely because an implementation has not been found.
>
> **Authority boundary:** Matthew Shaw rules on mathematical architecture. Claude and other workers provide evidence and proposed patches only. ChatGPT maintains the canonical V3 document. Repository evidence determines implementation status; it does not by itself determine whether a mathematical object belongs in the discovery landscape.
>
> **Governing law:**
>
> \[
> \boxed{\text{Preserve discovery. Correct error. Record implementation separately.}}
> \]
>
> A mathematical object may be **Established**, **Candidate**, **Open**, **Conflict**, or **Rejected**. Independently, its implementation may be **Implemented**, **Partially implemented**, **Specified but not implemented**, or **No implementation found**. Lack of implementation is not a deletion rule.

## V3 document architecture

1. **Part I — Complete V2 mathematical body:** preserved in full as the baseline discovery corpus.
2. **Part II — V3 additive discoveries and corrections:** verified additions, corrected boundaries, and implementation comparisons.
3. **Part III — Live discovery programme:** the questions still worth resolving, without reopening settled archaeology.

---

# Part I — Complete V2 mathematical body

> The following body is preserved from V2. Status refinements and verified additions appear in Part II. Where Part II corrects a scope, type, or implementation claim, it supersedes that claim without deleting the mathematical family from the discovery record.

## 1. System spine

\[
\boxed{
\sqsubseteq,\;
L,\;
\sigma_e \sqsubseteq \sigma_{\mathrm{session}},\;
\Omega,\;
H_{97},\;
S(\pi),\;
\Delta S,\;
\texttt{bridges.scope},\;
R(t)\to T\to S\to A\to C\to V\to\Sigma\to H(X)\to E(S,t)
}
\]

\[
N_{\mathrm{symbol\ rows}}=718,\qquad
N_{\mathrm{glyphs}}=592,\qquad
N_{\mathrm{domains}}=77,\qquad
N_{\mathrm{bridges}}=140
\]

\[
N_{\mathrm{bridges}}
=
116_{\mathrm{universal}}
+
11_{\mathrm{intelligent\_notes}}
+
13_{\mathrm{lab}}
\]

\[
N_{\mathrm{anchors}}=102,\qquad
N_{\mathrm{compass}}=9,\qquad
N_{\mathrm{canonical\ bearings}}=7,\qquad
N_{\mathrm{proposed\ bearings}}=2,\qquad
N_{\mathrm{encode\ exceptions}}=5
\]

---

## 1.1 Mathematical fingerprint

\[
\sqsubseteq
\]

\[
L = (S, \sqsubseteq, \sqcup, \sqcap, \top, \bot)
\]

\[
\sigma_e \sqsubseteq \sigma_{session}
\]

\[
\Omega = \begin{cases}
1 & \sigma_e \sqsubseteq \sigma_{session} \\
2 & \sigma_e \not\sqsubseteq \sigma_{session}
\end{cases}
\]

\[
H(S) \bmod 97
\]

\[
S(\pi)
\]

\[
\Delta S > 0
\]

\[
\texttt{bridges.scope} \in
\{
\texttt{universal},
\texttt{intelligent\_notes},
\texttt{project\_navigation},
\texttt{lab}
\}
\]

\[
R(t) \to T \to S \to A \to C \to V \to \Sigma \to H(X) \to E(S,t)
\]

\[
116,\;97,\;280,\;19,\;20,\;718,\;77,\;140
\]

\[
\texttt{a734304}
\]

---

## 2. Notation

| Symbol | Definition |
|---|---|
| \(G=(V,E,w,\ell)\) | weighted labelled directed ontology graph |
| \(V\) | domains |
| \(E\) | directed bridges |
| \(w(s)\) | symbol weight |
| \(\ell(e)\) | bridge label/function |
| \(\sigma_e\) | edge scope |
| \(\sigma_{\mathrm{session}}\) | active session scope |
| \(\pi\) | directed path |
| \(H_{97}\) | mod97 invariant |
| \(S(\pi)\) | semantic path strain |
| \(R_{\mathrm{reality}}(t)\) | evolving reality state |
| \(T_{\mathrm{telic}}\) | telic optimisation functional |
| \(H_{\mathrm{Shannon}}\) | Shannon entropy |
| \(R_{\mathrm{readiness}}\) | retrieval-readiness score |

### 2.1 Symbol identity

\[
\operatorname{SymbolKey}(s)
=
\operatorname{glyph}(s)
::
\operatorname{domain}(s)
\]

### 2.2 Weight set

\[
w(s)\in\{0,20,40,60,80,100\}
\]

### 2.2.1 Weight semantics [Confirmed / Open]

Source: Ch 12, V6 survival depth scale. The meanings of 100, 80, 60 and 40 are confirmed in the notebook; the production meanings of 20 and 0 remain open:

```
weight 100  invariant core — never pruned in future convergence
weight  80  strong signal
weight  60  moderate modifier
weight  40  weak modifier / conflict signal
weight  20  [OPEN]
weight   0  [OPEN: inactive / retired behaviour appears elsewhere, but the full scale meaning is not yet settled]
```

### 2.3 Invariant symbols

\[
\mathcal I
=
\{s\in\mathcal S_{\mathrm{symbols}}:w(s)\ge80\}
\]

---

## 3. Whole-system architecture

### 3.1 Reality layer

\[
R_{\mathrm{reality}}(t)
=
F(
\{\mathrm{Laws}\},
\{\mathrm{Constants}\},
\{\mathrm{InitialConditions}\}
)
\]

### 3.2 Telic optimisation

\[
T_{\mathrm{telic}}
=
\alpha I+\gamma\Phi+\delta E-\beta K
\]

Alternative source form:

\[
\mathcal T
=
\alpha I(S)-\beta K(\Gamma)+\gamma\Phi(S)
\]

### 3.3 Representation chain

\[
S\longrightarrow A\longrightarrow C\longrightarrow V\longrightarrow\Sigma
\]

### 3.4 Shannon information

\[
H_{\mathrm{Shannon}}(X)
=
-\sum_x p(x)\log p(x)
\]

### 3.5 Emergence composition

\[
E(S,t)
=
T_{\mathrm{telic}}
\left(
\Sigma(V(C(S))),
R_{\mathrm{reality}}(t)
\right)
\]

### 3.6 Full chain

\[
R(t)
\to T
\to S
\to A
\to C
\to V
\to\Sigma
\to H(X)
\to E(S,t)
\]


### 3.7 Codex assembly mechanics

Let:

\[
S=(s_1,s_2,\ldots,s_m)
\]

and let \(\mathcal L_{AA}\) be the legal character lookup set.

\[
I_S
=
\left\{
k\in\{1,\ldots,m\}
:
s_k\in\mathcal L_{AA}
\right\}
\]

\[
A=(s_k)_{k\in I_S}
\]

\[
C
=
\operatorname{Concat}
\left(
f_{\mathrm{symbol}}(a)
\;\middle|\;
a\in\operatorname{Sort}(A)
\right)
\]

For:

\[
C=(u_1,u_2,\ldots,u_n)
\]

\[
V
=
\left(
f_{\mathrm{value}}(u_1),
f_{\mathrm{value}}(u_2),
\ldots,
f_{\mathrm{value}}(u_n)
\right)
\]

For \(n>0\):

\[
\Sigma(V)
=
\begin{pmatrix}
\operatorname{Sum}(V)\\
\operatorname{Average}(V)\\
\operatorname{Min}(V)\\
\operatorname{Max}(V)
\end{pmatrix}
=
\begin{pmatrix}
\displaystyle\sum_{i=1}^{n}v_i\\[2mm]
\displaystyle\frac{1}{n}\sum_{i=1}^{n}v_i\\[2mm]
\displaystyle\min_{1\le i\le n}v_i\\[2mm]
\displaystyle\max_{1\le i\le n}v_i
\end{pmatrix}
\]

### 3.8 Codex assembly algorithm

```text
INPUT: sequence S
OUTPUT: symbolic state C, numeric vector V, accumulator Σ

retain characters from S that belong to LAA
preserve repeated characters
sort the retained sequence
map each character through fsymbol
concatenate mapped symbols to produce C
map each symbol through fvalue to produce V
calculate sum, average, minimum and maximum to produce Σ
```

---

## 4. Scope algebra

### 4.1 Bounded lattice

\[
L
=
(
\mathcal S_{\mathrm{scope}},
\sqsubseteq,
\sqcup,
\sqcap,
\top,
\bot
)
\]

\[
\bot
\sqsubseteq
\mathrm{core}
\sqsubseteq
\mathrm{app}
\sqsubseteq
\mathrm{intelligent\_notes}
\sqsubseteq
\mathrm{scientific}
\sqsubseteq
\mathrm{lab}
\sqsubseteq
\top
\]

### 4.2 Product scopes

\[
\begin{aligned}
\mathrm{Free}&:\sigma=\mathrm{core}\\
\mathrm{Author}&:\sigma=\mathrm{app}\\
\mathrm{Scientific}&:\sigma=\mathrm{scientific}\\
\mathrm{Lab}&:\sigma=\mathrm{lab}
\end{aligned}
\]

### 4.3 Bridge scope labels

\[
\texttt{bridges.scope}
\in
\{
\texttt{universal},
\texttt{intelligent\_notes},
\texttt{project\_navigation},
\texttt{lab}
\}
\]

### 4.4 Edge compilation

For:

\[
e=(u,v,\sigma_e)
\]

\[
\operatorname{compile}(e,\sigma_{\mathrm{session}})
=
\mathbf 1[
\sigma_e\sqsubseteq\sigma_{\mathrm{session}}
]
\]

\[
e\in E_{\sigma_{\mathrm{session}}}
\iff
\sigma_e\sqsubseteq\sigma_{\mathrm{session}}
\]

\[
E_{\sigma_{\mathrm{session}}}
=
\{
e\in E:
\sigma_e\sqsubseteq\sigma_{\mathrm{session}}
\}
\]

\[
G_{\sigma_{\mathrm{session}}}
=
(V,E_{\sigma_{\mathrm{session}}},w,\ell)
\]

### 4.5 Scope penalty

\[
\Omega(e,\sigma_{\mathrm{session}})
=
\begin{cases}
1,&\sigma_e\sqsubseteq\sigma_{\mathrm{session}}\\
2,&\sigma_e\not\sqsubseteq\sigma_{\mathrm{session}}
\end{cases}
\]

### 4.6 Compilation algorithm

```text
INPUT: graph G, session scope σsession
OUTPUT: compiled graph Gσ

Eσ ← ∅

for each edge e in E:
    if σe ⊑ σsession:
        Eσ ← Eσ ∪ {e}

return (V, Eσ, w, ℓ)
```

---

## 5. Semantic path strain

Let:

\[
\pi=(v_0,e_1,v_1,\ldots,e_k,v_k)
\]

with active edge symbols:

\[
s_0,s_1,\ldots,s_k
\]

and hop constant:

\[
c_h=10
\]

### 5.1 Strain

\[
S(\pi)
=
\sum_{i=1}^{k}
\left(
c_h+
|w(s_{i-1})-w(s_i)|
\right)
\Omega(e_i,\sigma_{\mathrm{session}})
\]

### 5.2 Minimum-strain route

\[
\pi^*
=
\arg\min_{\pi\in\Pi(u,v)}
S(\pi)
\]

### 5.3 Repair gain

\[
\Delta S
=
S_{\mathrm{pre}}-S_{\mathrm{post}}
\]

\[
\Delta S>0
\iff
S_{\mathrm{post}}<S_{\mathrm{pre}}
\]

### 5.4 Measured repair

\[
S_{\mathrm{pre}}=80
\]

\[
S_{\mathrm{post}}
=
(10+0)+(10+|100-80|)
=
40
\]

\[
\Delta S=80-40=40>0
\]

### 5.5 Routing algorithm

```text
INPUT: compiled graph Gσ, source u, target v
OUTPUT: path π* with minimum strain

for each edge transition:
    transition_cost =
        (ch + abs(previous_symbol_weight - current_symbol_weight))
        × scope_penalty

run weighted shortest-path search using transition_cost

return minimum-cost path
```

---

## 6. mod97 conservation

### 6.1 Character recurrence

For canonical string:

\[
x=c_1c_2\cdots c_n
\]

\[
a_0=0
\]

\[
a_j
=
(31a_{j-1}+\operatorname{codepoint}(c_j))
\bmod97
\]

\[
H_{97}(x)=a_n
\]

### 6.2 Compass canonicalisation

\[
\operatorname{canonical}(b)
=
\operatorname{name}(b)
\;|\;
\operatorname{concat}(\operatorname{sequence}(b))
\]

\[
H_{97}(b)
=
H_{97}(\operatorname{canonical}(b))
\]

### 6.3 Verified residues and live ontology status [Confirmed]

The rolling-hash residues below are mathematically verified. Ontology status remains a separate field: seven bearings are canonical and two are proposed.

| Bearing | Named sequence | mod97 | Ontology status |
|---|---|---:|---|
| Center | Gale_of_the_Nexus | 0 | canonical |
| South | Whispers_and_Waves | 13 | canonical |
| North | Eternal_Banquet | 26 | canonical |
| Meridian | Scales_of_Veritas | 61 | proposed |
| West | Skulls_o_Bravery | 53 | canonical |
| Nadir | Diamond_of_Surprise | 60 | canonical |
| Temporal Trust | Tide_of_the_Living_Ledger | 51 | proposed |
| Zenith | Flame_of_Abandonment | 77 | canonical |
| East | Lion_at_the_Helm | 85 | canonical |


The governing distinction is:

```text
mathematically verified ≠ ontologically canonical
```

### 6.4 Collision constraint

\[
b_i\ne b_j
\implies
H_{97}(b_i)\ne H_{97}(b_j)
\]

### 6.5 Invariant preservation

\[
\Delta H_{97}
=
H_{97}(S_{\mathrm{post}})
-
H_{97}(S_{\mathrm{pre}})
\]

\[
\Delta H_{97}=0
\]

### 6.6 Dual-engine acceptance

\[
\boxed{
\Delta S>0
\land
\Delta H_{97}=0
}
\]

### 6.6.1 Domain restriction [Conflict]

The unconditional form in §6.6 and the restricted notebook form below are both preserved until the wider document search is complete. Source: Ch 13, Needle-Action Inventory (filed 5 July 2026), verbatim in substance:

The dual-equation constraint does NOT bind simple, additive atomic steps like a baseline insertion or a fence. It is strictly restricted to REPAIR and HEALING route changes where a disrupted or broken path is actively reconstructed.

- Without a net reduction in route strain (\(\Delta S>0\)), a healing sequence cannot execute.
- Without conserving the canonical polynomial identity residue (\(\Delta H=0\)), the system heals into structural nonsense.

Conflict: §6.6 states the rule unconditionally; the notebook restricts it to repair and healing. No choice is made here.

### 6.7 Needle-Action transition algebra [Open]

Source: Ch 13, "The Needle-Action Inventory — Candidate Operator Grammar for §6", verbatim structure.

Transition expression:

\[
C_n \;\xrightarrow{\;N_i\;}\; C_{n+1}
\]

Operator entry schema:

```
OPERATOR_ID:   name
SYMBOL:        needle operator symbol
PRECONDITION:  state conditions required on Cₙ
POSTCONDITION: state conditions forced on Cₙ₊₁
BEARING (i):   compass route index (default [OPEN])
RECEIPT:       required provenance token / P4 validity receipt
STRAIN EFFECT: quantitative effect on S(π) (default [OPEN])
```

Core operator set (all [Open]):

| Operator | Symbol | Precondition on \(C_n\) | Postcondition on \(C_{n+1}\) | Strain effect |
|---|---|---|---|---|
| Birth / Insert | 🪡_birth | target row-state absent in domain context | valid row-state \(r=(g,d,m,w,\sigma,\omega,v)\) initialized | [OPEN] |
| Promote | 🪡_prom | row has \(w<100\) or restrictive scope in \(L\) | upward shift in \(w \in W\) or scope escalation in \(L\) | modifies \(\lvert w(s_{i-1})-w(s_i)\rvert\) on affected edge |
| Backfill | 🪡_back | high-weight relation lacks supporting rows | supporting/historical rows appended | [OPEN] |
| Fence | 🪡_fence | row/relation exists without strict scope boundary | \(\sigma_e\) bound; compiles only where \(\sigma_e \sqsubseteq \sigma_{\mathrm{session}}\) | out-of-scope detour scales via \(\Omega(e_i)=2\) |
| Oppose | 🪡_opp | standard structural path active | designed opposition relation logged (valid layout, not error) | [OPEN] |
| Retire / Void | 🪡_void | active row slated for decommissioning | forced to \(w=0\); inactive/frozen | removes bridge from routing space; downstream rerouting |

Composition rules:

- Atomic: one operator, one row-state, one provenance receipt.
- Composed: multi-symbol transformations as a route curve
\[
\pi = \big(C_0 \xrightarrow{N_1} C_1 \xrightarrow{N_2} \cdots \xrightarrow{N_k} C_k\big)
\]
- Thread axiom, verbatim: **No thread ⇒ no transition.**
- [OPEN]: whether a composed sequence requires \(k\) atomic receipts or one unified transaction receipt.

### 6.8 Live mod97Compass() algorithm [Confirmed]

Source: Ch 13 SOP, live source form, verbatim.

Input format:

```
Name|glyphs

Name   = bearing name string
|      = literal pipe character
glyphs = all glyphs in the sequence joined with no separator between them
```

Rolling hash implementation:

```javascript
let acc = 0;
for (const char of input) {
  acc = (acc * 31 + char.codePointAt(0)) % 97;
}
return acc;
```

Prohibition, verbatim: do not use alternatives such as concatenated codepoint digits mod 97 — that was crack C3 and produced wrong values for all proposed bearings.

Canonicality conditions — all seven required before a bearing is declared canonical, verbatim:

```
1. Name is stable.
2. Glyph sequence is stable.
3. Input string uses Name|glyphs format with no separator between glyphs.
4. mod97 is computed with the rolling hash above.
5. No collision exists with any existing bearing.
6. Meaning is documented.
7. canonical field value matches the convention of existing live rows.
```

Verification law, verbatim:

```
mathematically verified ≠ ontologically canonical
```

Live residue register with names and statuses, verbatim:

```
Center          Gale_of_the_Nexus           mod97:  0   canonical
South           Whispers_and_Waves          mod97: 13   canonical
North           Eternal_Banquet             mod97: 26   canonical
meridian        Scales_of_Veritas           mod97: 61   proposed
West            Skulls_o_Bravery            mod97: 53   canonical
Nadir           Diamond_of_Surprise         mod97: 60   canonical
temporal_trust  Tide_of_the_Living_Ledger   mod97: 51   proposed
Zenith          Flame_of_Abandonment        mod97: 77   canonical
East            Lion_at_the_Helm            mod97: 85   canonical
```

Superseded candidate values: 39 for meridian, 74 for temporal_trust — do not reuse.

### 6.9 mod97 operational role [Confirmed / Conflict]

Confirmed operational role: the invariant is used as a fast consistency, transaction-validation and corruption-detection gate before deeper comparison. On mismatch, processing freezes.

Conflict in wording: source notes describe this as verifying string equality. A matching mod97 residue supports consistency but cannot alone prove equality because collisions are possible. The stronger wording remains open for correction against the wider source set.

---

## 7. Symbol-library algorithms

### 7.1 Domain validation

\[
\operatorname{validateDomain}(x)
=
\begin{cases}
x,&x\in\mathcal D\\
\mathrm{Wisdom},&x\notin\mathcal D
\end{cases}
\]

### 7.2 Clamp

\[
\operatorname{clamp}(x;a,b)
=
\max(a,\min(b,x))
\]

### 7.3 Scope filter

\[
\operatorname{SymbolsByScope}(Q)
=
\{
s:
\operatorname{scope}(s)\cap Q\ne\varnothing
\}
\]

### 7.4 Domain palette

\[
\operatorname{Palette}(D')
=
\{
s:
\operatorname{domain}(s)\in D'
\}
\]

### 7.5 Symbol expansion

\[
\operatorname{expand}(g)
=
g\;[\operatorname{meaning}(g)]
\]

Applied by ordered replacement over the symbol library.

### 7.6 Library validity

\[
\operatorname{ValidLibrary}
=
C_1\land C_2\land C_3\land C_4\land C_5\land C_6\land C_7
\]

where:

\[
\begin{aligned}
C_1&:\text{all composite keys are unique}\\
C_2&:\text{all opposites reference existing keys}\\
C_3&:\text{all navigation glyphs exist}\\
C_4&:\text{all compass glyphs exist}\\
C_5&:\text{all compass mod97 values are unique}\\
C_6&:\text{all bridge endpoints are valid domains}\\
C_7&:\text{all weights are valid and every symbol has scope}
\end{aligned}
\]

### 7.7 Keyword coverage

\[
\mathcal U_{\mathrm{keywords}}
=
\mathcal G_{\mathrm{app}}
\setminus
\mathcal G_{\mathrm{keyworded}}
\]

### 7.8 Derived statistics

\[
\begin{aligned}
N_{\mathrm{symbols}}&=|\mathcal S_{\mathrm{symbols}}|\\
N_{\mathrm{glyphs}}&=|\{\operatorname{glyph}(s)\}|\\
N_{\mathrm{domains}}&=|\{\operatorname{domain}(s)\}|\\
N_{\mathrm{bridges}}&=|E|\\
N_{\mathrm{compass}}&=|\mathcal B|\\
N_{\mathrm{app}}&=|\mathcal S_{\mathrm{app}}|\\
N_{\mathrm{invariant}}&=|\mathcal I|
\end{aligned}
\]

### 7.9 Library validation algorithm

```text
errors ← []
warnings ← []

check duplicate SymbolKey values
check every opposite resolves
check every navigation glyph exists
check every compass glyph exists
check compass mod97 uniqueness
check every bridge endpoint is a valid domain
check every weight ∈ {0,20,40,60,80,100}
check every symbol has at least one scope
compute app glyphs without keyword entries

return {
    passed: len(errors) = 0,
    errors,
    warnings
}
```

---

## 8. Trust-gated retrieval

### 8.1 Similarity

\[
\operatorname{Sim}(q,d_i)
=
\frac{
\phi(q)\cdot\phi(d_i)
}{
\|\phi(q)\|\|\phi(d_i)\|
}
\]

### 8.2 Ledger state

\[
s_i(t)
=
[v_i,c_i,p_i,m_i]^T
\]

### 8.3 Hard-gate vector

\[
h_i(t)
=
[
h_{\mathrm{superseded}},
h_{\mathrm{deleted}},
h_{\mathrm{corrupted}},
h_{\mathrm{provenanceBroken}},
h_{\mathrm{notAuthorised}}
]^T
\]

### 8.4 Gate product

\[
G(h_i)
=
\prod_{j\in\mathrm{HardGates}}h_{i,j}
\]

### 8.5 Trust

\[
T_{\mathrm{raw}}(d_i)
=
w^Ts_i(t)
\]

\[
T_{\mathrm{final}}(d_i)
=
T_{\mathrm{raw}}(d_i)G(h_i)
\]

### 8.6 Permission

\[
\mathcal P(d_i)
=
\begin{cases}
\mathrm{GREEN},&T_{\mathrm{final}}\ge75\\
\mathrm{AMBER},&50\le T_{\mathrm{final}}<75\\
\mathrm{RED},&T_{\mathrm{final}}<50\;\lor\;G(h_i)=0
\end{cases}
\]

### 8.7 Rank

\[
\operatorname{Rank}(d_i)
=
(
\operatorname{ordinal}(\mathcal P(d_i)),
\operatorname{Sim}(q,d_i)
)
\]

### 8.8 Gated context

\[
X_{\mathrm{gated}}
=
\{
d_i\in C_k:
\mathcal P(d_i)\ne\mathrm{RED}
\}
\]

\[
\operatorname{Answer}
=
f_{\mathrm{LLM}}(q,X_{\mathrm{gated}})
\]

### 8.9 Retrieval algorithm

```text
INPUT: query q, candidate documents C
OUTPUT: ranked permitted context

for each document d:
    compute ledger state s(d)
    compute hard gates h(d)
    trust_raw ← wᵀs(d)
    trust_final ← trust_raw × product(h(d))
    assign permission band
    compute semantic similarity

remove RED documents
sort first by permission band, then by similarity
return ranked context
```

### 8.10 Candidate-set definition [Confirmed]

Source: Ch 20, "Trust-Gated RAG: Relevance vs Permission", verbatim:

\[
C_k(q) = \arg\max_{\substack{C \subseteq D \\ |C|=k}} \sum_{d_i \in C} \operatorname{Sim}(q, d_i)
\]

### 8.11 Ledger signal semantics [Confirmed]

Source: same note, verbatim:

- \(v_i\) = version status signal (1 = active, 0 = superseded)
- \(c_i\) = crown sovereignty signal (1 = author-crowned, 0 = uncrowned)
- \(p_i\) = provenance integrity signal (1 = intact, 0 = broken)
- \(m_i\) = structural checksum integrity signal, where applicable (1 = mod97 verified, 0 = corrupted)

Sovereignty distinction: \(c_i = 0\) (uncrowned) does not mean untrusted; uncrowned is a neutral state, not a negative one.

Named thresholds: \(\tau_{\mathrm{green}} = 75\), \(\tau_{\mathrm{amber}} = 50\). Implementation fact: `superseded_by` is the primary hard gate in the current implementation.

### 8.12 Separation law, outranking condition, and band-isolation guarantee [Confirmed]

Separation law, verbatim in substance: fusing \(\operatorname{Sim}(q,d_i)\) into \(T_{\mathrm{raw}}\) would be a leaky abstraction — a note's trust profile is an unyielding operational state; similarity is a dynamic situational filter. Computed separately, composed only at the ranking step.

Outranking condition, verbatim:

\[
d_A \succ d_B
\iff
\operatorname{ordinal}(\mathcal P(d_A)) > \operatorname{ordinal}(\mathcal P(d_B))
\;\lor\;
\Big( \mathcal P(d_A) = \mathcal P(d_B) \land \operatorname{Sim}(q,d_A) > \operatorname{Sim}(q,d_B) \Big)
\]

Band-isolation guarantee, verbatim in substance: this structure guarantees band isolation — an AMBER note with similarity 0.99 cannot outrank a GREEN note with similarity 0.71; the band ordinal is the primary sort key and similarity never overrides it. This eliminates the similarity-bypass vulnerability of fused models, where a superseded note with a hyper-inflated similarity score could override a weak negative trust weight.

### 8.13 Temporal trust extension [Open]

Source: Ch 13, Telic Observer / Temporal Trust notes (19 June 2026), all verbatim.

Trust decay:

```
trust_decay = e^(-λΔt)

where:
λ = domain volatility
Δt = time since last verification
```

Layer goodness score and win threshold:

\[
G(y) = \frac{1}{m}\sum_j (y_j)^2,
\qquad
\sigma\big(G(y) - \theta\big)
\]

State boundary mapping: DB_VERSIONS `confirmed → superseded` = win vs crack = \(x_{\mathrm{pos}}\) vs \(x_{\mathrm{neg}}\); the trust endpoint's `verified → weight 100`, `superseded → weight 0` is the same algebra as inspectable rule-based signals.

Unified state equation (source-flagged `prompt_present, not live_verified`):

\[
S_{t+1} = S_t + \alpha \cdot \operatorname{Var}\!\left( \mathcal{E}\Big(q \;\big\|\; \mathcal{R}(q, \mathcal{D}_t)\Big) + \mathbf{s}_{[i^*]} \right)
\]

Signal hierarchy:

```
live_verified    → stronger signal
retrieved_source → useful signal
prompt_present   → weaker signal
model_inference  → weakest signal
```

Law: score not only content but the signal path by which the content was reached.

Audit route as trust loop:

```
🕯️ → 🪡 → 📍 → Δ_bel → 👑 → H_c → 🔏
```

Build-order law, verbatim: "Do not build the brain first. Build the trust ledger first."

Construction path: rule-based trust scoring → ledger-backed trust history → learned observer layer.

### 8.14 Retrieval scorers — three surfaced forms [Conflict]

The notebook holds three scorer forms. All remain visible. Form C is the live production implementation; the relationship between the three forms remains unresolved.

**Form A — Ch 5 conceptual, verbatim pseudocode:**

```
scoreNote(note, queryContext) →
  average(weight(symbol) for symbol in note.symbols ∩ queryContext.symbols)
  × confidence_modifier(note.confidence)
  × retrievalReadiness_modifier(note.retrievalReadiness)
  × goldenKey_boost(note.goldenKey)
```

Design law: average, not sum — depth of attractor alignment, not breadth of keyword coverage. Measured claim: 37.5× cold-start retrieval improvement over unindexed semantic search.

**Form B — Ch 11 documented search scorer, verbatim:**

Additive tiers: title exact +10 · title substring +6 · keyword exact +5 per keyword · keyword contains +3 per keyword · symbol vocabulary +4 · domain vocabulary +2.

```
final_score = (title_score + keyword_score + symbol_score + domain_score) × confidence_weight + golden_key_bonus
```

Confidence weights: verified 1.00 · tested 0.85 · reasoned 0.70 · proposed 0.55 · abandoned 0.40 · unknown 0.25. Golden key bonus: flat +3, applied after the multiplier. Measured effect: verified scores 82% higher than proposed at equal relevance. No-query sort: current golden keys → confidence descending → most recent. Scope law: search operates on title, keywords, symbol vocabulary, domain vocabulary only — body text is not tokenised.

**Form C — live production source (`codex-v9.1.ts`), verbatim:**

```typescript
export function scoreNote(params: {
  scores:     RetrievalScores;
  confidence: ConfidenceLevel;
  governance: NoteGovernance;
  searchMode: SearchMode;
}): number {
  const { scores, confidence, governance, searchMode } = params;

  // Average the four field scores — each field is 0–1
  const baseScore = clamp(
    (scores.titleScore + scores.keywordScore + scores.symbolScore + scores.domainScore) / 4,
  );

  const weighted = baseScore * CONFIDENCE_WEIGHTS[confidence];

  const goldenAdjusted =
    governance.goldenKey === "current"
      ? weighted + RETRIEVAL_RULES.goldenKeyBonus
      : weighted;

  const supersededAdjusted =
    governance.goldenKey === "superseded" && searchMode === "normal"
      ? goldenAdjusted + RETRIEVAL_RULES.normalSearchSupersededPenalty
      : goldenAdjusted;

  return clamp(supersededAdjusted, 0, RETRIEVAL_RULES.maxScoreCap);
}

export const RETRIEVAL_RULES = {
  goldenKeyBonus:                 0.25,
  normalSearchSupersededPenalty: -0.15,
  lineageSearchSupersededPenalty: 0.0,
  maxScoreCap:                    1.0,
} as const;
```

V9 bug-fix theorem, verbatim source comment: "V9 bug fixed: fields are AVERAGED (each 0–1), not summed then clamped. Summing four 0–1 fields then clamping to 1.0 destroyed differentiation — any note with >1 field matching scored 1.0 before the confidence weight."

Retrieval pipeline: Vectorize (semantic narrow, topK 20, cosine, 1536 dims, metadata pre-filter) → D1 (candidate fetch) → scoreNote() (in-memory rank) → descending sort. Fallback: D1 full-scan → scoreNote() on everything.

Lineage form (V1 app layer), verbatim: `score += (CONFIDENCE_WEIGHTS[note.confidence] ?? 0.25) * 25;`

---

## 9. Retrieval readiness and version distance

### 9.1 Retrieval readiness

\[
R_{\mathrm{readiness}}(N)
=
\frac{
w_dD(N)
+
w_s\Sigma_N(N)
+
w_bB(N)
+
w_cC(N)
+
w_kK(N)
}{
w_d+w_s+w_b+w_c+w_k
}
\]

where:

\[
\begin{aligned}
D(N)&=\text{domain coverage}\\
\Sigma_N(N)&=\text{symbol density}\\
B(N)&=\text{bridge activation}\\
C(N)&=\text{confidence}\\
K(N)&=\text{golden-key state}
\end{aligned}
\]

### 9.2 Structured-note readiness

\[
R_{\mathrm{raw}}
=
0.20D
+
0.20B
+
0.15S
+
0.15C
+
0.10L
+
0.20V
-
0.15U
-
0.30E
\]

\[
R_{\mathrm{structured}}
=
\max
\left(
0,
\min(1,R_{\mathrm{raw}})
\right)
\]

\[
\operatorname{Readiness}(R)
=
\begin{cases}
\mathrm{excellent},&0.85\le R\le1\\
\mathrm{good},&0.65\le R<0.85\\
\mathrm{partial},&0.45\le R<0.65\\
\mathrm{poor},&0\le R<0.45
\end{cases}
\]

where:

\[
\begin{aligned}
D&=\text{domain clarity}\\
B&=\text{bridge completeness}\\
S&=\text{symbol alignment}\\
C&=\text{confidence quality}\\
L&=\text{lineage clarity}\\
V&=\text{validation completeness}\\
U&=\text{unresolved mappings}\\
E&=\text{blocking errors}
\end{aligned}
\]

### 9.3 Version distance

\[
\Delta V
=
w_v\Delta|V|
+
w_e\Delta|E|
+
w_s\sum\Delta w(s)
+
w_m\Delta H_{97}
\]

---

## 10. Structured memory and note processing

### 10.1 Structured memory equation

\[
M(N)
=
F+D+S+B+L+V-(U+E)
\]

where:

\[
\begin{aligned}
F&=\text{preserved facts}\\
D&=\text{domain clarity}\\
S&=\text{symbol alignment}\\
B&=\text{bridge completeness}\\
L&=\text{lineage clarity}\\
V&=\text{validation completeness}\\
U&=\text{unresolved mappings}\\
E&=\text{blocking errors}
\end{aligned}
\]

\[
E>0
\implies
\operatorname{deliveryState}(N)=\mathrm{blocked}
\]

### 10.2 Structured-note composition

\[
N_{\mathrm{structured}}
=
\mathcal F(\mathrm{rawCapture})
=
\mathrm{Header}
+
\mathrm{Body}
+
\mathrm{Graph}
+
\mathrm{Delivery}
\]

### 10.3 Note-processing lifecycle

\[
\begin{aligned}
\mathrm{rawCapture}
&\to\mathrm{expandMacros}
\to\mathrm{detectNoteType}
\to\mathrm{extractFacts}\\
&\to\mathrm{identifyDomains}
\to\mathrm{assignSymbols}
\to\mathrm{assignPackLabels}\\
&\to\mathrm{assignBridges}
\to\mathrm{assignStatus}
\to\mathrm{assignConfidence}\\
&\to\mathrm{validateStructure}
\to\mathrm{generateNote}
\to\mathrm{generateDeliveryCheck}
\end{aligned}
\]

### 10.4 Note-processing algorithm

```text
INPUT: raw capture
OUTPUT: structured note and delivery check

expand macros
detect note type
extract explicit facts
identify ontology domains
assign ontology symbols
assign pack labels
assign graph bridges
assign lifecycle status
assign confidence state
validate required structure
generate structured note
generate delivery check
```

### 10.5 Temporal encodings

\[
\text{“14:45”}
\longrightarrow
\text{“🕒1445”}
\]

\[
\text{“3 days”}
\longrightarrow
\text{“📅3d”}
\]

\[
\operatorname{Duration}(Y,Z)
=
\text{“⏱️YhZm”}
\]

### 10.6 Delivery state

\[
\operatorname{DeliveryState}(N)
=
\begin{cases}
\mathrm{clean},
& M(N)\text{ high}\land W=0\land E=0\\
\mathrm{usableWithCaution},
& M(N)\text{ high}\land W>0\land E=0\\
\mathrm{partial},
& M(N)\text{ partial}\land(\mathrm{missingFields}\lor U>0)\\
\mathrm{blocked},
& E>0
\end{cases}
\]

### 10.7 Integrity chain

For phase \(i\):

\[
\operatorname{ChallengeScore}_i
=
\left(
\sum_{j=1}^{M_i}
V_{\mathrm{symbol}}(i,j)
\right)
\mu_i
\]

\[
\operatorname{TotalIntegrity}
=
\sum_{i=1}^{N}
\operatorname{ChallengeScore}_i
\]

\[
\operatorname{Coherence}
=
\frac{
\operatorname{TotalIntegrity}
}{
\operatorname{MaxPossibleIntegrity}
}
\times100\%
\]

### 10.8 Quality verification

\[
\mathcal Q
=
0.40S_{\mathrm{semantic}}
+
0.30A_{\mathrm{data}}
+
0.20C_{\mathrm{coherence}}
+
0.10H_{\mathrm{comprehension}}
\]

\[
A_{\mathrm{data}}
=
1-
\frac{
E_{\mathrm{data}}
}{
N_{\mathrm{data}}
},
\qquad
N_{\mathrm{data}}>0
\]

\[
E_{\mathrm{token}}
=
\frac{
L_{\mathrm{original}}
-
L_{\mathrm{compressed}}
}{
L_{\mathrm{original}}
},
\qquad
L_{\mathrm{original}}>0
\]

\[
\operatorname{Integrity}
=
\frac{
S_{\mathrm{preservation}}
+
A_{\mathrm{data}}
+
E_{\mathrm{token}}
}{3}
\]

### 10.9 Processing ceilings

\[
\begin{aligned}
\operatorname{Latency}_{\mathrm{IoT}}&<10\mathrm{ms}\\
\operatorname{Latency}_{\mathrm{financial}}&<50\mathrm{ms}\\
\operatorname{Latency}_{\mathrm{medical}}&<100\mathrm{ms}\\
\operatorname{Latency}_{\mathrm{legal}}&<500\mathrm{ms}
\end{aligned}
\]

### 10.10 Quality thresholds

\[
\begin{aligned}
\mathrm{medicalGrade}
&\iff
\mathcal Q\ge0.98\\
\mathrm{financialGrade}
&\iff
\mathcal Q\ge0.95\\
\mathrm{generalPurpose}
&\iff
\mathcal Q\ge0.85
\end{aligned}
\]

---

## 11. Compression

### 11.1 Hybrid representation

\[
\operatorname{Hybrid}
=
\operatorname{SymbolicSkeleton}
+
\operatorname{PlainLanguagePayload}
+
\operatorname{OntologyGapReport}
\]

### 11.2 Token-reduction ratio

\[
C_r
=
1-
\frac{
T_{\mathrm{hybrid}}
}{
T_{\mathrm{source}}
}
\]

Measured instance:

\[
C_r
=
1-\frac{134}{373}
\approx0.64
\]

### 11.3 Lossy ratio

\[
C_{\mathrm{lossy}}
=
1-\frac{30}{373}
\approx0.92
\]

### 11.4 Orientation-overhead proxy

\[
T_{\mathrm{orientation}}
=
T_{\mathrm{source}}-T_{\mathrm{hybrid}}
\]

\[
T_{\mathrm{orientation}}
=
373-134
=
239
\]

### 11.5 Structural routing compression

\[
R_{\mathrm{route}}
=
\frac{
T_{\mathrm{raw}}
}{
T_{\mathrm{routed}}
}
\]

\[
R_{\mathrm{route,noGK}}
=
\frac{418567}{4552}
\approx91
\]

\[
R_{\mathrm{route,GK}}
=
\frac{418567}{3832}
\approx109
\]

### 11.6 Context capacity

\[
N_{\mathrm{nav}}
=
\frac{
W_{\mathrm{ctx}}
}{
T_{\mathrm{routed}}
}
\]

At:

\[
W_{\mathrm{ctx}}=200000
\]

\[
N_{\mathrm{nav,noGK}}\approx44
\]

\[
N_{\mathrm{nav,GK}}\approx52
\]

### 11.7 Golden-key contribution

\[
\Delta T_{\mathrm{GK}}
=
4552-3832
=
720
\]

\[
\Delta N_{\mathrm{nav}}
=
52-44
=
8
\]

### 11.8 Compression algorithm

```text
INPUT: source text, allowed domains, ontology
OUTPUT: hybrid representation, token counts, gap set

classify source domains
retrieve permitted symbols
replace exactly covered concepts with symbols
retain uncovered meaning in plain language
collect uncovered concepts into gap report
count source, hybrid and symbol-only tokens
return hybrid, ratios, gap report
```

---

## 12. Website and interface mathematics

### 12.1 State

\[
x_t=
[p_t,\sigma_t,\theta_t]^T
\]

### 12.2 Role word limits

\[
K(r)
=
10\delta_{r,1}
+
35\delta_{r,2}
+
20\delta_{r,3}
\]

### 12.3 Heaviside gate

\[
\mathcal H(x)
=
\begin{cases}
0,&x\le0\\
1,&x>0
\end{cases}
\]

### 12.4 Static content compiler

For section state:

\[
s=
[V_s,\omega_s,W_s,r_s]^T
\]

\[
\mathcal V(P)
=
\sum_{s=1}^{n}
\left(
\frac{V_s\omega_s}{W_s}
+
\mathcal H(V_s-K(r_s))\cdot\infty
\right)
\]

### 12.5 Runtime state transition

\[
x_{t+1}
=
A(u_t)x_t
\]

### 12.6 Progressive disclosure

\[
M_{\mathrm{visible}}
=
\left[
(1-\theta_t)\widehat P_{\mathrm{truncated}}
+
\theta_t\widehat P_{\mathrm{extended}}
\right]
M_{\mathrm{technical}}
+
\theta_t\mathrm{CTA}_{\mathrm{contextual}}
\]

\[
\widehat P(\theta)
=
\begin{cases}
\le20\text{ words},&\theta=\mathrm{passive}\\
\infty,&\theta=\mathrm{click/bot}
\end{cases}
\]

### 12.7 Exit telemetry

\[
v(t)
=
\frac{dr}{dt}
=
\begin{bmatrix}
dx/dt\\
dy/dt
\end{bmatrix}
\]

\[
S_{\mathrm{exit}}
=
\mathcal H(y_{\mathrm{threshold}}-y(t))
\mathcal H(-dy/dt-v_{\mathrm{escape}})
\delta(\sigma_t,\mathrm{unconverted})
\]

### 12.8 Latency quality

\[
Q
=
1-
\mathcal H(
\mathcal L(\Delta x)-100\mathrm{ms}
)
\gamma(\mathcal L(\Delta x))
\]

### 12.9 Unified state equation

\[
x_{t+1}
=
\left[
1-\mathcal H(\mathcal V(P)-\infty)
\right]
\left(
A(u_t)x_t
+
\theta_t
\begin{bmatrix}
0\\
\mathrm{CTA}_{\mathrm{ctx}}
\end{bmatrix}
+
S_{\mathrm{exit}}\mathrm{CTA}_{\mathrm{soft}}
\right)
\left[
1-
\mathcal H(\mathcal L(\Delta x)-100)\gamma
\right]
\]

### 12.10 System efficiency

\[
E_{\mathrm{sys}}
=
\frac{
\left(\prod_{p=1}^{3}\mathcal A_p\right)
\mathcal I_{\mathrm{back}}
}{
C_{\mathrm{front}}
+
\sum_{k=1}^{4}\Delta\mu_k
}
\]

### 12.11 Cognitive load

\[
C_s
=
\frac{V_s\omega_s}{\operatorname{Whitespace}_s}
+
\mathcal H(V_s-K_s)\cdot\infty
\]

### 12.12 Transition friction

\[
\Delta\mu
=
\frac{
\Delta t_{\mathrm{render}}
}{
\sigma_{\mathrm{state}}
}
\]

\[
\Delta\mu
\to
\frac{<100\mathrm{ms}}{1}
\approx0
\]

### 12.13 Contractive conversion

\[
d(f(x),f(y))
\le
k\,d(x,y),
\qquad
0\le k<1
\]

---

## 13. Plugin transformation mathematics

### 13.1 Universal route

\[
\begin{aligned}
\mathrm{Capture}
&\to\mathrm{Clarify}
\to\mathrm{Structure}
\to\mathrm{GainMeasure}
\to\mathrm{Attenuated}\\
&\to\mathrm{Unresolved}
\to\mathrm{NeedsTest}
\to\mathrm{Resolved}
\to\mathrm{Robust}\\
&\to\mathrm{Emergent}
\to\mathrm{NextAction}
\to\mathrm{Save}
\end{aligned}
\]

### 13.2 Knowledge-state update

\[
K(t+1)
=
K(t)+\operatorname{UniverseState}(t)
\]

### 13.3 Entropy growth

\[
\Delta S_{\mathrm{entropy}}\ge0
\]

### 13.4 Holographic entropy

\[
S_{\mathrm{BH}}
=
\frac{A}{4\ell_P^2}
\]

### 13.5 Emergence function

\[
P(M,F,W)
=
\sqrt{\frac{F}{M}}
e^{-0.5W}
\]

### 13.6 Telic bias

\[
O_{\mathrm{new}}
=
O_{\mathrm{prev}}(1+\tau)
\]

### 13.7 Emergence trace

\[
\operatorname{signalType}
\in
\{
\mathrm{repetition},
\mathrm{cluster},
\mathrm{contradiction},
\mathrm{phaseShift},
\mathrm{newModule},
\mathrm{risk},
\mathrm{attractor},
\mathrm{goldenKeyCandidate}
\}
\]

\[
\operatorname{strength}
\in
\{
\mathrm{none},
\mathrm{weak},
\mathrm{growing},
\mathrm{clear},
\mathrm{strong},
\mathrm{phaseTransition}
\}
\]

### 13.8 Cross-session emergence

```text
for each completed plugin session:
    detect local emergence
    write EmergenceTrace
    persist trace

group compatible traces across sessions
surface repeated clusters, contradictions, attractors and phase shifts
send surfaced patterns to Event Horizon synthesis
```

---

## 14. Agent-agnostic recursive triangulation

### 14.1 Agent outputs

\[
s_i
=
A_i(\mathcal S_t),
\qquad
i\in\{1,\ldots,N\}
\]

### 14.2 Consistency relation

\[
s_i\sim_\tau s_j
\iff
d(s_i,s_j)\le\tau
\]

### 14.3 Triangulation operator

\[
\mathcal T_\tau
\left(
\{s_i\}_{i=1}^{N}
\right)
=
\left\{
s_k:
\left|
\left\{
i:
d(s_i,s_k)\le\tau
\right\}
\right|
\ge2
\right\}
\]

### 14.4 Constraint set

\[
\mathcal K
=
\bigcap_{j=1}^{M}
\left\{
s:
\mathcal C_j(s)=1
\right\}
\]

### 14.5 Constraint filter

\[
\mathcal F(S,\{\mathcal C_j\})
=
\begin{cases}
\operatorname{Project}_{\mathcal K}(S),
&\mathcal K\ne\varnothing\\
\mathrm{infeasible},
&\mathcal K=\varnothing
\end{cases}
\]

### 14.6 Recursive feed

\[
R(S)=S
\]

### 14.7 Recursive update

\[
\mathcal S_{t+1}
=
R
\left(
\mathcal F
\left(
\mathcal T_\tau
\left(
\{A_i(\mathcal S_t)\}_{i=1}^{N}
\right),
\{\mathcal C_j\}_{j=1}^{M}
\right)
\right)
\]

### 14.8 Convergence

\[
d(\mathcal S_{t+1},\mathcal S_t)
<
\epsilon
\]

### 14.9 Triangulation algorithm

```text
INPUT: current state S, agents A1...AN, constraints C1...CM
OUTPUT: next state, infeasible, or converged

collect one output from each available agent
group outputs whose pairwise distance is at most τ
retain groups supported by at least two agents
apply all active constraints
if no feasible state remains:
    return infeasible
feed the filtered state into the next iteration
stop when distance between successive states is below ε
```

---

## 15. Image fingerprint algorithm

### 15.1 Output state

\[
F_{\mathrm{image}}
=
(
D,
A,
c,
k,
s,
t,
r,
\operatorname{caption}
)
\]

where:

\[
\begin{aligned}
D&=\text{ontology domains}\\
A&=\text{attractors}\\
c&=\text{change signal}\\
k&=\text{contradiction signal}\\
s&=\text{stability signal}\\
t&=\text{trust signal}\\
r&=\text{risk level}
\end{aligned}
\]

### 15.2 Embedding text

\[
x_{\mathrm{embed}}
=
\operatorname{title}
+
\operatorname{caption}
+
\operatorname{domains}
\]

### 15.3 Vectorisation

\[
z
=
\phi_{\mathrm{BGE}}(x_{\mathrm{embed}})
\]

### 15.4 Pipeline

```text
INPUT: image bytes, file metadata, chapter context
OUTPUT: image fingerprint, vector, D1 record

describe image with vision model
classify description against ontology
generate caption
build embedding text
embed text
upsert vector with fingerprint metadata
write fingerprint to D1
```

### 15.5 Search predicates

\[
\operatorname{ContradictionOpen}(i)
=
[k_i=1]\land[s_i=0]
\]

\[
\operatorname{DomainRisk}(i,d,r)
=
[d\in D_i]\land[r_i=r]
\]

---

## 16. Document embedding algorithm

### 16.1 Chunk identity

\[
\operatorname{chunkId}
=
\texttt{messy:file\_id:chunk\_index}
\]

### 16.2 Chunk embedding

\[
x_j
=
\operatorname{title}
+
\operatorname{chunkText}_j
\]

\[
z_j
=
\phi_{\mathrm{BGE}}(x_j)
\]

### 16.3 Pipeline

```text
INPUT: active file manifest from D1
OUTPUT: searchable vectors

for each active file:
    fetch content from R2
    chunk into approximately 500–1000 token windows

    for each chunk:
        build title + chunk text
        generate embedding
        upsert vector with file and chunk metadata

write seed event and counts
```

---

## 17. Triage and reply algorithms

### 17.1 Triage state

\[
T_{\mathrm{ticket}}
=
(
\operatorname{intent},
\operatorname{action},
\operatorname{confidence},
\operatorname{replyType},
\operatorname{urgency},
\operatorname{ontologyDomain}
)
\]

\[
\operatorname{action}
\in
\{
\mathrm{AUTO\_REPLY},
\mathrm{ESCALATE},
\mathrm{REFER}
\}
\]

### 17.2 Auto-reply threshold

\[
\operatorname{confidence}<0.85
\implies
\operatorname{action}\ne\mathrm{AUTO\_REPLY}
\]

### 17.3 Refund threshold

\[
\operatorname{RefundAction}(x)
=
\begin{cases}
\mathrm{AUTO\_APPROVE},&x\le10\\
\mathrm{HUMAN\_REVIEW},&10<x\le50\\
\mathrm{HUMAN\_REQUIRED},&x>50
\end{cases}
\]

### 17.4 Mandatory-human operations

\[
\operatorname{HumanRequired}(a)
=
1
\]

for:

\[
a\in
\{
\mathrm{accountDeletion},
\mathrm{emailAllAuthors},
\mathrm{schemaChange}
\}
\]

### 17.5 Triage pipeline

```text
INPUT: ticket
OUTPUT: triage record

load ticket
apply hard escalation rules
classify intent, action, confidence, reply type, urgency and ontology domain
if confidence < 0.85 and action = AUTO_REPLY:
    action ← ESCALATE
write triage record
return record
```

### 17.6 Reply pipeline

```text
INPUT: triaged ticket, key information, actor
OUTPUT: sent message identifier

use approved draft or author a reply
apply standard footer
send through email transport
update ticket state
append ledger event
return message identifier
```

### 17.7 Author lifecycle

\[
\mathrm{Discovered}
\to
\mathrm{Trialing}
\to
\mathrm{Active}
\to
\mathrm{PowerUser}
\to
\mathrm{Champion}
\]

with:

\[
\mathrm{Trialing}
\to
\mathrm{Churning}
\to
\mathrm{Churned}
\to
\mathrm{Recovered}
\]

---

## 18. Classifier cost mathematics

### 18.1 Unit cost

\[
C_{\mathrm{classification}}
=
C_{\mathrm{AI}}
+
C_{\mathrm{R2write}}
+
C_{\mathrm{storage}}
+
C_{\mathrm{worker}}
\]

\[
C_{\mathrm{classification}}
=
0.000150
+
0.000005
+
0.000001
+
0.000001
=
0.000157
\]

\[
C_{\mathrm{classification}}
\approx\$0.00016
\]

### 18.2 Volume cost

\[
C(n)
=
nC_{\mathrm{classification}}
\]

\[
C(1000)\approx\$0.16
\]

\[
C(100000)\approx\$16
\]

### 18.3 Acquisition cost

\[
\operatorname{CAC}
=
\frac{
C_{\mathrm{campaign}}
}{
N_{\mathrm{converted}}
}
\]

Measured example:

\[
\operatorname{CAC}
=
\frac{7.54}{500}
\approx0.015
\]

---

## 19. Epistemic utility

For memory objects \(M_i\):

\[
U(t)
=
\sum_i
\left[
\frac{
S(M_i)\Phi_i
}{
C_{k,i}
}
e^{-\gamma_i\Delta t_i}
\right]
-
\sum_jD_j(t)
\]

where:

\[
\begin{aligned}
S(M_i)&=\text{support}\\
\Phi_i&=\text{integration}\\
C_{k,i}&=\text{cost to kill}\\
\gamma_i&=\text{decay rate}\\
\Delta t_i&=\text{evidence age}\\
D_j(t)&=\text{active contradiction penalty}
\end{aligned}
\]

---

## 20. Research equations

### 20.1 Variational free energy

\[
F
=
\mathbb E_{q(\psi)}
[
\log q(\psi)-\log p(\phi,\psi)
]
\]

### 20.2 Chomsky–Schützenberger form

\[
L
=
h(D_n\cap R)
\]

System mapping:

\[
D_n
\leftrightarrow
\mathrm{kernel}
\]

\[
R
\leftrightarrow
\mathrm{bridgeLanguage}
\]

\[
h
\leftrightarrow
\mathrm{bridgeFunctionMap}
\]

### 20.3 Contractive symbolic state

\[
\mathcal S_{\mathrm{state}}
=
\Sigma^*\times\mathbb N
\]

\[
d(S_i,S_j)
=
\alpha\operatorname{EditDistance}(S_i,S_j)
+
(1-\alpha)
\left(
1-\operatorname{Jaccard}(S_i,S_j)
\right)
\]

\[
d(T(S_i),T(S_j))
\le
\lambda d(S_i,S_j),
\qquad
0<\lambda<1
\]

### 20.4 Structural information density

\[
\Phi(S)
=
\frac{
|\operatorname{Invariant}(S)|
}{
|\operatorname{Total}(S)|
}
\]

\[
\Phi(S_{t+1})\ge\Phi(S_t)
\]

### 20.5 Relaxation equation

\[
\frac{d\mu}{dt}
=
-\kappa(\mu-\lambda)
\]

\[
\mu(t)
=
\lambda
+
(\mu_0-\lambda)e^{-\kappa t}
\]

---

## 21. Remaining open definitions and conflicts

### 21.1 Open mathematics

\[
E(S,t)
\]

Complete operational emergence function.

\[
\iota:
\{
\texttt{universal},
\texttt{intelligent\_notes},
\texttt{project\_navigation},
\texttt{lab}
\}
\to
\mathcal S_{\mathrm{scope}}
\]

Bridge-label to scope-lattice mapping.

\[
f_{\mathrm{symbol}},
\qquad
f_{\mathrm{value}}
\]

Complete production mappings for Codex assembly.

\[
\beta:
\operatorname{glyphseq}(q)
\longrightarrow
\mathrm{Bearings}_9
\]

Actual glyph-sequence-to-bearing mapping.

\[
w_{\mathrm{eff}}(s,u)=f(w(s),\delta_u(s))
\]

Subscriber calibration function that changes personal weighting without changing ontology truth.

Other open items: weight meanings for 20 and 0; missing Needle-Action strain effects; composed receipt rule; trust-vector coefficients; and the final meaning of the fingerprint sequence \(280,19,20\).

**Surfaced candidate for \(280,19,20\):** the sequence appears to be a Chapter 0 v13 sweep fingerprint in which \(280\) denotes notes and \(19\) denotes chapters. The \(20\) has two surviving readings: the Chapter 9 note count at that sweep, or a reference to Chapter 20. This connection is preserved as evidence, not settled as canon.

### 21.2 Conflicts still preserved

- **Dual-engine acceptance:** unconditional for all changes versus restricted to repair and healing.
- **Retrieval scoring:** conceptual Form A, documented Form B and live production Form C.
- **Notation:** \(S\) and \(\Phi\) each carry more than one mathematical role.
- **mod97 wording:** fast consistency gate versus proof of string equality.
- **Lineage:** the relationship between the COMPLETE document and stack-spec commit `8725797` remains unresolved.

No decision is forced before the Google Workspace mathematics search.

---

## 22. Additional mathematics surfaced from the local notebook

The local notebook sweep covered 21 chapters and 361 notes. The material below was absent from the original V2. Confirmed, Conflict and Open labels retain its current standing without forcing early decisions.

### 22.1 Contractive-engine primitives [Open]

Structural density (per-node):

\[
\Phi_{\mathrm{node}} \in (0,\,1)
\]

Monotonic; higher = stable fixed-point structure. Operational law: sort results by \(\Phi\) descending.

Contractive attractor core:

\[
S^{*}(\mathrm{node})
=
T^{k}(\mathrm{context}(\mathrm{node})),
\qquad
k \le N,\quad N = 6
\]

Claimed token reduction 80–95%.

Global attractor:

\[
S^{*}_{\mathrm{global}}
=
T^{\infty}\!\left(
\operatorname{Concat}\big(S^{*}(n_1), \ldots, S^{*}(n_m)\big)
\right),
\qquad
\epsilon = 0.001
\]

Identity criterion, verbatim in substance:

\[
\mathcal R_1 \equiv \mathcal R_2
\iff
S^{*}_{\mathrm{global}}(\mathcal R_1) = S^{*}_{\mathrm{global}}(\mathcal R_2)
\]

Measured node ledger (Φ, mod97), verbatim: (0.96, 42) · (0.94, 17) · (0.93, 84) · (0.91, 61) · (0.89, 28) · (0.88, 53) · (0.87, 79) · (0.86, 36) · (0.85, 44) · (0.84, 62) · (0.84, 73) · (0.83, 18) · (0.82, 91).

**Conflict:** this \(\Phi\) conflicts with §20.4's \(\Phi(S)=\lvert\mathrm{Invariant}\rvert/\lvert\mathrm{Total}\rvert\). Same defect class as the S overload; resolution reserved.

### 22.2 Basin dynamics [Open]

Golden key = fixed point of its chapter; basin = region of knowledge space resolving to that fixed point; limit cycles = recurring unresolved questions; retrieval = following the attractor gradient.

\[
\operatorname{gk}(\mathrm{Ch}) = \text{unique current golden key};
\qquad
\mathcal B(\operatorname{gk}) = \{\, q : \text{resolution}(q) \to \operatorname{gk} \,\}
\]

Uniqueness enforced by the Ch 0 health law (one current key per chapter).

### 22.3 Bearing function [Open]

\[
\beta:
\operatorname{glyphseq}(q) \longrightarrow \mathrm{Bearings}_9,
\qquad
\beta(q) \text{ valid} \iff H_{97}(\beta(q)) \in \mathrm{VerifiedResidues}
\]

Verbatim law: "A compass bearing that fails mod97 validation is not a bearing — it is noise." Principle: orientation before generation. The map \(\beta\) itself is undefined — open function, sibling of \(\iota\).

### 22.4 Subscriber calibration layer [Open]

Verbatim principle: V9.1 = the shared instrument; subscriber memory = the personal calibration; "personal weighting only — not ontology truth."

\[
w_{\mathrm{eff}}(s, u) = f\big(w(s),\, \delta_u(s)\big),
\qquad
\delta_u \not\rightarrow \mathrm{DB\_ONTOLOGY}
\]

The combining function \(f\) remains open.

### 22.5 MTB Local Sufficiency Theorem [Confirmed — local theorem]

Claim as tested: within V9.1, Core_Kernel symbols directly represent seven of nine primary telic operations; integration carried by ◇::Core_Kernel at w=100, not 💠::Wisdom; route resolution carried by 🎯::V8_2 at w=80, not 🧲. All nine operations representable using only Core_Kernel and the V8_2 navigational layer. No expansion-domain symbol required.

Boundary, verbatim: a local theorem, not a universal theorem. It does not prove that invariant pressure causes stratification across all symbolic systems. It proves that within V9.1, the MTB claim holds after correction — and that V9.1 is precise enough as a live ontology instrument to detect where a draft paper was wrong.

### 22.6 V6 survival scoring laws [Confirmed]

- Survival floor: a `current` Golden Key note is never pruned regardless of its telic score.
- A `superseded` note receives a reduced survival weight.
- Sovereignty law: author judgment overrides algorithmic scoring.
- Compatibility law: confidence weights (1.00 → 0.25) map directly to V6 TelicScore multipliers.

### 22.7 Chapter 0 instrument mathematics [Confirmed]

Health conservation law (GREEN condition): \(\lvert\mathrm{compasses}\rvert = \lvert\mathrm{chapters}\rvert = \lvert\mathrm{golden\ keys}\rvert\), gap flags = 0, exactly one current golden key per chapter. Sweep-correction vectors (e.g. v12→v13: 228→280 with per-chapter deltas) are measured instances of §9.3 version distance applied to the notebook itself. Chapter signature encoding: chapter → glyph³ (nineteen 3-glyph clusters, fixed block length); uniqueness property untested.

### 22.8 Qubit/cubit direction [Open]

Qubit/cubit pathway (Ch 13 wish list): V9 symbolic sequences as compressed state spaces, potentially encodable as quantum-style feature states. Terminology split recorded: qubit = technical quantum unit; cubit = symbolic ark/window marker. No maths yet — direction marker only.

---

## 23. Held items

These are retained without treating them as missing work. The reason is kept with each item so intentional absence is not mistaken for forgetting:

- Telic Canopy Operators — held for lower-machinery testing.
- Rosetta \(\Omega_R\) formalisation — held as near-term formalisation.
- proposed \(S(\pi)\to\Psi(\pi)\) rename — held for Matt's notation ruling.
- Candle–Needle bench harness — held as a test gap.
- Nine-Point Compass Geometry companion — held. Its recorded observations remain qualified: Nadir \(60\) / Meridian \(61\) adjacency is **Conjecture**; spectral uniformity is observational; the bearings are **Measured, not Proven**; and stored Meridian residue \(61\) is a proposal, not a reserved arithmetic slot.
- `bm-004` runner — implementation gap, not theory gap.
- `bridge_kind` — runtime-computed receipt work outside the mathematics specification.

The audit also records six objects patched into stack-spec commit `8725797`: Minimal Telic Basis, \(\theta/\widehat P(\theta)\), section characteristic vector \(s=[V_s,\omega_s,W_s,r_s]^{\mathsf T}\), full weight distribution, bearing glyph-sequence appendix and three-block Engine Algebra. Their relationship to this COMPLETE line remains open.

---

## 24. Google Workspace search list

Use this compact list to surface remaining mathematics without turning the search into a separate research programme:

- `maths`, `mathematics`, `equation`, `formula`, `algebra`, `algorithm`, `pseudocode`, `theorem`, `proof`, `invariant`, `operator`
- `mod97`, `rolling hash`, `compass`, `bearing`, `residue`, `canonical`, `proposed`, `collision`
- `strain`, `repair`, `healing`, `Needle Action`, `Birth`, `Promote`, `Backfill`, `Fence`, `Oppose`, `Retire`
- `scoreNote`, `retrieval score`, `trust score`, `permission band`, `confidence weight`, `golden key bonus`, `superseded penalty`
- `telic`, `emergence`, `attractor`, `basin`, `fixed point`, `contractive`, `convergence`, `survival score`
- `f_symbol`, `f_value`, `Codex`, `legal character lookup`, `scope lattice`, `bridge scope`, `subscriber calibration`
- `weight 100`, `weight 80`, `weight 60`, `weight 40`, `weight 20`, `weight 0`
- `Minimal Telic Basis`, `Engine Algebra`, `8725797`, `280 19 20`, `captain ruling`, `superseded`, `conflict`, `held`

Search Google Docs, Sheets formulas and hidden tabs, Slides speaker notes, PDFs, comments, suggestions and relevant email attachments.

---

## 25. Version note

This is the updated **V2 working source of truth**. It preserves the original V2 architecture and incorporates the useful findings surfaced by specimen V3. Confirmed material is included, conflicts remain visible, open items remain searchable, and no outstanding mathematical choice has been silently decided.

*Matt crowns. Science verifies. Repo records. Audit seals. AI assists.*

---

# Part II — V3 additive discoveries and corrections

## 26. Dual-status doctrine

Every mathematical object carries two independent statuses.

### 26.1 Mathematical discovery status

- **Established:** accepted mathematical form.
- **Candidate:** coherent surfaced mathematics requiring further derivation, testing, or ruling.
- **Open:** a required definition, theorem, parameter, or relationship remains unresolved.
- **Conflict:** materially different forms remain preserved.
- **Rejected:** mathematically false, internally inconsistent, or disproved.

### 26.2 Implementation status

- **Implemented:** executable source recovered.
- **Partially implemented:** a smaller or bounded subsystem exists.
- **Specified but not implemented:** mathematical or design specification exists without runtime execution.
- **No implementation found:** repository search found no executable mechanism.


a lack of implementation does not erase candidate or open mathematics:

\[
\boxed{
\text{No implementation found}
\;\not\Rightarrow\;
\text{remove the mathematics}
}
\]

## 27. CODEX assembly functions recovered

### 27.1 Accepted alphabet and symbol map

The CODEX subsystem uses the accepted alphabet

\[
\mathcal L_{\mathrm{CODEX}}
=
\{A,B,C,D,E,F,G,H,I,K,L,M,N,P,Q,R,S,T,V,W,X,Y,Z\}
=
\{A,\ldots,Z\}\setminus\{J,O,U\}.
\]

The input is uppercased. Non-matching characters are omitted. SQL `IN` semantics deduplicate matched letters, and `ORDER BY aa_code` alphabetises them before glyph concatenation:

\[
A(S)
=
\operatorname{Sort}
\left(
\operatorname{Unique}
\left(
\{\operatorname{Upper}(s_k):1\le k\le m\}
\cap
\mathcal L_{\mathrm{CODEX}}
\right)
\right).
\]

\[
C(S)
=
\operatorname{Concat}
\left(
 f_{\mathrm{symbol}}(a)
\right)_{a\in A(S)}.
\]

The complete recovered map is:

| Code | Glyph | Code | Glyph | Code | Glyph |
|---|---|---|---|---|---|
| A | 🔷 | I | 🔸 | S | 🔘 |
| B | ⚪ | K | ➕ | T | 🎲 |
| C | 🔗 | L | 🔺 | V | 🔻 |
| D | ⚡ | M | 💎 | W | 🟣 |
| E | 🎯 | N | 🔲 | X | ❓ |
| F | 🔶 | P | 🔄 | Y | 🟡 |
| G | ◇ | Q | 🔳 | Z | ⚫ |
| H | 🔵 | R | ➡️ |  |  |

**Mathematical status:** Established for the CODEX subsystem.

**Implementation status:** Implemented in the recovered CODEX worker and seed. Live-database parity is a separate deployment question.

The CODEX mapping is typed separately from V9.1 ontology mappings. A shared letter or glyph across subsystems does not make the functions identical.

### 27.2 Decimal glyph function and totalised lookup

The recovered decimal register is:

\[
\begin{aligned}
 g_{\mathrm{digit}}=\
\{&🔹\mapsto0,\;🔺\mapsto1,\;🔸\mapsto2,\;◆\mapsto3,\;◇\mapsto4,\\
   &⬟\mapsto5,\;🟢\mapsto6,\;🟡\mapsto7,\;🔴\mapsto8,\;⚫\mapsto9\}.
\end{aligned}
\]

Let

\[
m(u)=
\begin{cases}
1,&u\in\operatorname{dom}(g_{\mathrm{digit}}),\\
0,&u\notin\operatorname{dom}(g_{\mathrm{digit}}).
\end{cases}
\]

The implemented scalar lookup is the extension by zero:

\[
\boxed{
 f_{\mathrm{value}}(u)
 =
 \begin{cases}
 g_{\mathrm{digit}}(u),&m(u)=1,\\
 0,&m(u)=0.
 \end{cases}
}
\]

The typed output is:

\[
\boxed{F(u)=\big(f_{\mathrm{value}}(u),m(u)\big)}.
\]

This preserves the essential distinction:

\[
(0,1)\neq(0,0),
\]

where a stored zero differs from a missing lookup.

### 27.3 Unicode unit and multiplicity

The recovered handler iterates strings by Unicode code point:

\[
\tau=\tau_{\mathrm{codepoint}}.
\]

It maps directly over the ordered code-point sequence without a `Set`, sorting, or deduplication. Therefore multiplicity is preserved at the numeric-vector stage.

Seed-level predictions include:

\[
V(◇◇)=(4,4),
\qquad
\Sigma=(8,4,4,4),
\]

\[
V(🔸🔸)=(2,2),
\qquad
\Sigma=(4,2,2,2),
\]

and

\[
\tau_{\mathrm{codepoint}}(➡️)
=(\mathrm{U{+}27A1},\mathrm{U{+}FE0F}),
\qquad
V(➡️)=(0,0)
\]

under the recovered seed table.

## 28. Finite survival filtration and state identity

### 28.1 Carried state

The finite survival engine carries activated objects of the form

\[
s=(\operatorname{glyph},\operatorname{meaning},\operatorname{domain},\operatorname{weight}).
\]

The authoritative identity is:

\[
\boxed{
\operatorname{SymbolKey}(s)
=
\operatorname{glyph}(s)::\operatorname{domain}(s)
}
\]

and for a state $A$:

\[
K(A)=\{\operatorname{SymbolKey}(s):s\in A\}.
\]

### 28.2 Survival schedule and closed form

\[
D(w)=
\begin{cases}
\infty,&w\in\{80,100\},\\
2,&w=60,\\
1,&w=40,\\
0,&w=20,\\
-1,&w=0.
\end{cases}
\]

\[
A_t=\{s\in A_0:D(w(s))\ge t\}.
\]

Hence:

\[
A_{t+1}\subseteq A_t,
\]

and the input-conditioned fixed state is:

\[
\boxed{
A^*(A_0)=\{s\in A_0:w(s)\ge80\}.
}
\]

This process is a finite deterministic filtration. It contracts cardinality but is not generally a Banach contraction under Jaccard distance.

### 28.3 Authoritative distance and discovered type break

The authoritative state distance is keyed Jaccard:

\[
\boxed{
 d_{\mathrm{state}}(A,B)
 =
 1-
 \frac{|K(A)\cap K(B)|}{|K(A)\cup K(B)|}
}
\]

which is a metric on finite full-identity states.

The inspected implementation projected to bare glyph sets before calculating distance:

\[
P(A)=\{\operatorname{glyph}(s):s\in A\},
\]

\[
 d_{\mathrm{glyph}}(A,B)
 =
 1-
 \frac{|P(A)\cap P(B)|}{|P(A)\cup P(B)|}.
\]

Because the glyph projection is non-injective, $d_{\mathrm{glyph}}$ is a pseudometric on full states and a metric only on quotient classes:

\[
A\sim B
\iff
P(A)=P(B).
\]

This is recorded as an implementation type break, not a reason to remove the full-identity mathematics.

### 28.4 Exact equality threshold

For a finite universe of at most 718 identities, distinct keyed states satisfy

\[
d_{\mathrm{state}}(A,B)\ge\frac1{718}>0.001.
\]

Therefore:

\[
\boxed{
 d_{\mathrm{state}}(A,B)<0.001
 \iff
 A=B.
}
\]

The threshold is effectively an equality test on keyed states.

### 28.5 Fixed-point family and density

Let

\[
\mathcal I=\{s:w(s)\ge80\}.
\]

Then:

\[
\operatorname{Fix}(T)=\mathcal P(\mathcal I),
\]

and the fixed point is unique only conditional on the input $A_0$.

For non-empty $A$:

\[
\Phi(A)
=
\frac{|\{s\in A:w(s)\ge80\}|}{|A|},
\]

with $\Phi(\varnothing)=0$. Under the filtration:

\[
\Phi(A_{t+1})\ge\Phi(A_t),
\]

and for non-empty $A^*$:

\[
\Phi(A^*)=1.
\]

## 29. Scope-label embedding

The active stored bridge-label set is:

\[
\mathcal B_{\mathrm{active}}
=
\{\texttt{universal},\texttt{intelligent\_notes},\texttt{lab}\}.
\]

The mathematical embedding is:

\[
\boxed{
\iota(\texttt{universal})=\bot,
\qquad
\iota(\texttt{intelligent\_notes})=\mathrm{intelligent\_notes},
\qquad
\iota(\texttt{lab})=\mathrm{lab}.
}
\]

Here $\bot$ means no minimum edition requirement. The typed compilation specification is:

\[
\operatorname{compile}(e,\sigma_{\mathrm{session}})
=
\mathbf 1
\left[
\iota(\operatorname{scope}(e))
\sqsubseteq
\sigma_{\mathrm{session}}
\right].
\]

The scope penalty uses the same embedded comparison:

\[
\Omega(e,\sigma_{\mathrm{session}})
=
\begin{cases}
1,&\iota(\operatorname{scope}(e))\sqsubseteq\sigma_{\mathrm{session}},\\
2,&\text{otherwise}.
\end{cases}
\]

For the live bridge counts this yields:

\[
116_{\mathrm{Free}}
\le
116_{\mathrm{Author}}
\le
127_{\mathrm{Scientific}}
\le
140_{\mathrm{Lab}}.
\]

**Mathematical status:** Established by ruling and verified order consistency.

**Implementation status:** Specified but not implemented in the inspected runtime. The stale seed constraint and runtime filtering remain code tasks.

The surfaced `project_navigation` label is preserved in Part I as discovery history. It has no live bridge rows and is not embedded into the edition chain. If revived, it requires a separate capability dimension rather than forced placement in this lattice.

## 30. Compass bearing records and candidate bearing function

The nine stored bearing records, canonicalisation, statuses, collision checks, and rolling mod97 validation remain established.

Repository evidence found no implemented general function

\[
\beta:\operatorname{glyphseq}(q)\to\mathrm{Bearings}_9.
\]

This establishes only the implementation boundary:

- stored, named, and validated bearing records exist;
- keyed and random retrieval exist;
- no automatic query-to-bearing classifier was recovered.

The candidate $\beta$ mathematics from Part I is therefore preserved as a **Candidate/Open design object**, with implementation status **No implementation found**. It is not silently equated with the Compass checksum.

Any future definition must state the input representation, decision rule, eligible statuses, tie handling, and unmatched-input behaviour.

## 31. Emergence and reality-layer discovery objects

The surfaced objects

\[
R_{\mathrm{reality}}(t)
=
F(\{\mathrm{Laws}\},\{\mathrm{Constants}\},\{\mathrm{InitialConditions}\})
\]

and

\[
E(S,t)
=
T_{\mathrm{telic}}
\left(
\Sigma(V(C(S))),
R_{\mathrm{reality}}(t)
\right)
\]

remain preserved as mathematical discovery architecture.

**Mathematical status:** Candidate/Open. Their domain, codomain, computable reality state, combination rule, recurrence, and relationship to the scalar telic score require further mathematical work.

**Implementation status:** No implementation found for these exact objects. The implemented Event Horizon prose synthesis is a separate object and is not evidence that this equation is executable.

The absence of an implementation does not remove these equations from V3.


### 31.1 Emergence type distinctions recovered without closure

The symbols used by the emergence expression are overloaded across the discovery corpus. At minimum, the following state-like objects remain distinct:

\[
S_{\mathrm{CODEX}}
=
(s_1,\ldots,s_m)
\in
\mathcal A^*,
\]

from the character-sequence mechanics of §3.7;

\[
S_{\mathrm{symbols}}
\in
\mathcal S_{\mathrm{symbols}},
\]

from the ontology notation of §2; and

\[
A_{\mathrm{MRE},t},
\]

from the memory-filtration system of §22.1.

The local sequence of §§3.3–3.7 strongly supports a CODEX reading of the inner expression in §3.5. Under that reading, and only when the retained sequence is non-empty,

\[
S=S_{\mathrm{CODEX}}
\quad\Longrightarrow\quad
\Sigma_{\mathrm{CODEX}}
\left(
V_{\mathrm{CODEX}}
\left(
C_{\mathrm{CODEX}}(S)
\right)
\right)
\in
\mathbb R^4.
\]

No recovered source yet states explicitly that the \(S\) in §3.5 is identical to the §3.7 CODEX input. The equation therefore has a **conditional CODEX typing**, not a settled state identity. It must not be silently read as consuming \(S_{\mathrm{symbols}}\) or \(A_{\mathrm{MRE},t}\).

The telic notation also names at least three distinct objects:

\[
T_{\mathrm{telic}}^{\mathrm{global}}
=
\alpha I+\gamma\Phi+\delta E-\beta K,
\]

\[
\mathcal T_{\mathrm{alternative}}
=
\alpha I(S)-\beta K(\Gamma)+\gamma\Phi(S),
\]

and the implemented MRE note-ranking score. No recovered source supplies an equality or typed bridge among these objects. The implemented score therefore does not type or replace the global telic functional.

Recovered provenance now distinguishes two telic layers. The earliest currently recovered form in the searched corpus is the three-term expression

\[
\mathcal T
=
\alpha I(S)-\beta K(\Gamma)+\gamma\Phi(S),
\]

which contains no \(\delta E\) term. Its UIA source connects CFI with integration, but does not bind CFI to a telic \(E\) term. A later recovered CH20 source contains the four-term expression and explicitly glosses \(E\) as integration validated through CFI. Therefore the telic \(E\) has a later recovered gloss, but the source or derivation that introduced the fourth term and transferred the CFI/integration role from \(\Phi\) to \(E\) remains unrecovered.

The \(E\) in \(\delta E\) is still not established as energy, evidence, or the emergence map \(E(S,t)\). Consequently, the possible circularity between §3.2 and §3.5 remains open. Neither recovered telic form is privileged as canonical by provenance alone.

Even under the conditional CODEX reading, the outer emergence expression retains three exact type boundaries:

1. no recovered source defines a two-argument form of \(T_{\mathrm{telic}}\);
2. \(R_{\mathrm{reality}}(t)\) has no declared state space or codomain;
3. \(E(S,t)\) has no declared codomain.

These are discovery boundaries. No replacement tuple, scalar, attractor, field, or combination operator is asserted.

### 31.2 Recovered telic provenance layers

The provenance search has recovered distinct historical layers without resolving their mathematical relationship:

1. **UIA layer — earliest currently recovered in the searched corpus.**

   \[
   \mathcal T_3
   =
   \alpha I(S)-\beta K(\Gamma)+\gamma\Phi(S).
   \]

   The recovered UIA text glosses information retention, complexity reduction/compression, and integration fidelity. It also names CFI as validating integration elsewhere in the same source. No \(\delta E\) term was found in the inspected UIA file.

2. **Key Formulas Markdown layer.** `docs/Key_Formulas.md` contains a three-component telic description combining mutual information, negative compression, and connectedness. It does not supply the four-term transition. The relationship between this Markdown file and the named but currently inaccessible `Key_Formulas.pdf` remains unresolved.

3. **CH20 layer — later recovered four-term form.**

   \[
   \mathcal T_4
   =
   \alpha I+\gamma\Phi+\delta E-\beta K.
   \]

   The librarian recovery identified this equation and the gloss \(E=\) integration validated through CFI together in the initially recovered CH20 file version of 29 June 2026 (`69a826967`). They entered that visible file history together rather than through a recovered incremental derivation.

4. **Named but inaccessible lineage material.** `Key_Formulas.pdf` and `The_purpose_(1).txt` are referenced by recovered documents but were not located in the searched repository corpus. Their absence from that search is not evidence that they never existed.

The exact transition

\[
\mathcal T_3
\longrightarrow
\mathcal T_4
\]

remains a live discovery gap. In particular, V3 does not yet know which source or derivation introduced \(\delta E\), why CFI/integration moved from the \(\Phi\)-role to the \(E\)-role, or whether the two equations describe successive refinements, alternative objectives, or distinct subsystems. Both remain preserved.


### 31.3 V6 operational three-term interpretation and local contraction theorem

A multi-repository search recovered one executable three-term telic scorer in `StoneMonkeMatt/bluewhalememory`, under `versions/v6`. No corresponding telic scorer was recovered in the inspected `StoneMonkeMatt/Unicode` / CODEX repository. This is an implementation discovery, not a canonical-selection rule.

The V6 runtime computes

\[
T_{\mathrm{V6}}(A_t)
=
0.40\,I_{\mathrm{code}}(A_t)
+
0.25\,C_{\mathrm{code}}(A_t)
+
0.35\,\Phi_{\mathrm{code}}(A_t),
\]

with final clamping to \([0,1]\), where the active state is represented by

\[
A_t
=
\texttt{activatedSymbols}_t.
\]

The implemented components are

\[
I_{\mathrm{code}}(A_t)
=
\frac{
|\{a\in A_t:w(a)=100\}|
}{52},
\]

\[
C_{\mathrm{code}}(A_t)
=
1-
\frac{|A_t|}{305},
\]

and

\[
\Phi_{\mathrm{code}}(A_t)
=
\begin{cases}
0,&|A_t|=0,\\[1mm]
\displaystyle
\frac{|\{a\in A_t:w(a)\ge80\}|}{|A_t|},&|A_t|>0.
\end{cases}
\]

The source comment explicitly associates this scorer with the three-term Formula Tree expression

\[
\mathcal T_3
=
\alpha I(S)-\beta K(\Gamma)+\gamma\Phi(S),
\]

but the recovered code supplies its own operational proxies for the prose-level terms. Therefore the present relationship is:

\[
\boxed{
T_{\mathrm{V6}}
\text{ is an explicit operational interpretation of }\mathcal T_3;
\text{ exact source-level identity remains unproved.}
}
\]

In particular:

- \(I_{\mathrm{code}}\) is a weight-100 activation fraction, not a recovered mutual-information calculation;
- \(C_{\mathrm{code}}\) is an inverted active-cardinality score and remains an implementation proxy for \(-K(\Gamma)\);
- \(\Gamma\) is not explicitly typed in the recovered implementation;
- the coefficient values \(0.40,0.25,0.35\) are implemented and sum to one, but the claimed calibration procedure was not recovered independently;
- no executable \(\delta E\) term, \(E\)-component, \(\delta\)-coefficient, or CFI computation was recovered for \(\mathcal T_4\).

#### 31.3.1 Active-state typing of \(\Phi\)

The V6 code defines the invariant subset of the current activated state as

\[
\operatorname{Invariant}(A_t)
=
\{a\in A_t:w(a)\ge80\}.
\]

Accordingly,

\[
\Phi_{\mathrm{code}}(A_t)
=
\frac{|\operatorname{Invariant}(A_t)|}{|A_t|}
\qquad (|A_t|>0).
\]

This is an exact implementation of the structural-density form

\[
\Phi(S)
=
\frac{|\operatorname{Invariant}(S)|}{|\operatorname{Total}(S)|}
\]

under the active-state typing

\[
S=A_t,
\qquad
\operatorname{Total}(S)=A_t.
\]

The code establishes that typing locally for V6. It does not by itself prove that every earlier source intended `Total(S)` to mean the active subset rather than another universe. The correspondence is therefore **exact within the recovered V6 state model** and **source-intent open outside it**.

#### 31.3.2 Contraction invariants

The V6 contraction operator is a pure filter:

\[
A_{t+1}
=
\{a\in A_t:\operatorname{survivalDepth}(w(a))\ge d_{t+1}\}.
\]

The recovered survival-depth map is

\[
100\mapsto\infty,
\quad
80\mapsto\infty,
\quad
60\mapsto2,
\quad
40\mapsto1,
\quad
20\mapsto0,
\quad
0\mapsto-1.
\]

Hence the implementation proves the local invariants

\[
A_{t+1}\subseteq A_t,
\]

\[
\{a\in A_t:w(a)\ge80\}
\subseteq
A_{t+1},
\]

\[
\{a\in A_t:w(a)=100\}
\subseteq
A_{t+1},
\]

and

\[
|A_{t+1}|\le |A_t|.
\]

The encoded string, mod97 value, and mathematical spine are carried unchanged through the inspected contraction path. This is a local implementation theorem; it does not automatically generalise to other engines or future transitions that can insert, mutate, or reweight symbols.

#### 31.3.3 Component and telic monotonicity

Within one valid V6 contraction chain:

\[
I_{\mathrm{code}}(A_{t+1})
=
I_{\mathrm{code}}(A_t),
\]

because weight-100 symbols are never pruned and the denominator \(52\) is fixed;

\[
C_{\mathrm{code}}(A_{t+1})
\ge
C_{\mathrm{code}}(A_t),
\]

because active cardinality cannot increase; and

\[
\Phi_{\mathrm{code}}(A_{t+1})
\ge
\Phi_{\mathrm{code}}(A_t),
\]

because the weight-\(\ge80\) numerator is preserved while the active-set denominator is non-increasing. The \(\Phi\) inequality is also supported by an inspected V6 test.

Since all three coefficients are non-negative,

\[
\boxed{
T_{\mathrm{V6}}(A_{t+1})
\ge
T_{\mathrm{V6}}(A_t)
}
\]

for every transition satisfying the recovered V6 contraction rules. This full-score inequality is derived from code invariants; no direct test of the complete weighted sum was recovered.

The theorem is local and conditional on the inspected rules. It does not establish monotonicity for \(\mathcal T_3\) under every possible mathematical transformation, nor for the four-term \(\mathcal T_4\).

#### 31.3.4 Runtime and evidence boundary

Recovered evidence supports:

- executable source for the V6 scorer;
- a call path from the V6 memory loop;
- tests covering \(\Phi\) behaviour and basic score validity;
- guarded empty-state behaviour for \(\Phi\).

No deployed-runtime receipt was recovered for this versioned engine. The V6 implementation therefore has status **Implemented in recovered source with call path; deployed execution not established**.

The mathematical discovery remains open around:

- the intended source-level definition of \(I(S)\);
- the type of \(\Gamma\) and exact definition of \(K(\Gamma)\);
- the origin and calibration of the implemented coefficients;
- the relationship between the V6 three-term interpretation and the later four-term form;
- any operational definition of CFI and \(E\) in \(\delta E\).


### 31.4 Operational information retention, mutual-information correction, and new compression leads

The V6 information component can now be written exactly as a retained-core measure. Let

\[
\mathcal I_{100}
=
\{s\in\mathcal S_{\mathrm{library}}:w(s)=100\}
\]

and let \(A\) be the active-symbol state. The implementation computes

\[
I_{\mathrm{V6}}(A)
=
\frac{|\mathcal I_{100}\cap A|}{|\mathcal I_{100}|}.
\]

Equivalently, define invariant-core loss by

\[
L_{100}(A)
=
\frac{|\mathcal I_{100}\setminus A|}{|\mathcal I_{100}|}.
\]

Then

\[
\boxed{
I_{\mathrm{V6}}(A)=1-L_{100}(A)
}
\]

and, when an active symbol is sampled uniformly from the weight-100 library layer,

\[
I_{\mathrm{V6}}(A)
=
\Pr(s\in A\mid w(s)=100).
\]

This gives the implemented quantity a precise mathematical meaning: it is the retained fraction of the invariant core. Within a V6 contraction chain, every weight-100 symbol survives, so

\[
I_{\mathrm{V6}}(A_{t+1})
=
I_{\mathrm{V6}}(A_t).
\]

The quantity can vary between different initial active states and may change under future non-contraction operators such as insertion, promotion, or backfill.

#### 31.4.1 Separation from mutual information

Recovered prose sources use the phrases “information retention” and “mutual information \(I_S\)” around the telic information term. The inspected May 2026 research dossier explicitly corrects an earlier “Shannon Mutual Info” label, stating that the associated code calculated an entropy-like token quantity rather than mutual information and should be renamed **Token Entropy Score**.

Accordingly, V3 now separates at least three information objects:

\[
I_{\mathrm{V6}}(A)
=
\frac{|\mathcal I_{100}\cap A|}{|\mathcal I_{100}|}
\qquad
\text{(invariant-core retention)},
\]

\[
H_{\mathrm{token}}
\qquad
\text{(entropy-like token score; formula not yet recovered here)},
\]

and

\[
I(X;Y)
=
\sum_{x,y}p(x,y)
\log\frac{p(x,y)}{p(x)p(y)}
\qquad
\text{(true mutual information)}.
\]

No implementation of the third expression was recovered in the inspected repositories. Therefore the CH20/Key-Formulas wording that joins “information retained” directly to “mutual information \(I_S\)” is a live notation and definition conflict. The V6 implementation realises the retention reading, not a mutual-information estimator.

The source-level relationship remains

\[
I_{\mathcal T_3}(S)
\longleftrightarrow
I_{\mathrm{V6}}(A)
\]

as an implementation interpretation rather than an explicitly recovered source identity.

#### 31.4.2 Nested invariant layers in V6

The V6 information and density terms use nested weight layers:

\[
\mathcal I_{100}
=
\{s:w(s)=100\},
\qquad
\mathcal I_{80}
=
\{s:w(s)\ge80\},
\qquad
\mathcal I_{100}\subseteq\mathcal I_{80}.
\]

The two implemented components are therefore

\[
I_{\mathrm{V6}}(A)
=
\frac{|\mathcal I_{100}\cap A|}{|\mathcal I_{100}|},
\]

and

\[
\Phi_{\mathrm{V6}}(A)
=
\frac{|\mathcal I_{80}\cap A|}{|A|}
\qquad (|A|>0).
\]

Thus, within V6, \(I\) measures retention of the immutable weight-100 core while \(\Phi\) measures the density of the wider weight-80-or-higher invariant layer inside the current active state. This distinction follows from the recovered definitions even though no recovered prose source explains why the thresholds 100 and 80 were chosen for the two roles.

#### 31.4.3 Additional weighted-\(\Phi\) candidate

The May 2026 dossier also contains the distinct expression

\[
\Phi_{\mathrm{weighted}}(S)
=
\sum_i w_i\sigma_i.
\]

The meanings, scales, and normalisation of \(w_i\) and \(\sigma_i\) were not recovered in the inspected passage. This expression is preserved as a separate candidate \(\Phi\)-family member. It is not silently identified with

\[
\Phi_{\mathrm{V6}}(A)
=
\frac{|\mathcal I_{80}\cap A|}{|A|},
\]

with the structural-density form of §20.4, with \(\Phi_{\mathrm{node}}\), or with the telic glosses “integration fidelity” and “connectedness.”

#### 31.4.4 Compression-distance lead for \(K(\Gamma)\)

The same dossier contains an executable gzip-based, symmetrised normalised compression distance. With compressed length \(C(x)\), define

\[
C_{\mathrm{sym}}(x,y)
=
\frac{C(xy)+C(yx)}{2},
\]

and

\[
D_{\mathrm{NCD}}(x,y)
=
\operatorname{clip}_{[0,1]}
\left(
\frac{
C_{\mathrm{sym}}(x,y)-\min\{C(x),C(y)\}
}{
\max\{C(x),C(y)\}
}
\right).
\]

This is an explicit compression-family metric. Subsequent repository recovery places it in a separate pairwise coherence-sieve subsystem rather than in the telic complexity term. It remains relevant to the wider compression mathematics, but it is not identified with the one-object \(K(\Gamma)\) used by the V6 telic scorer.

### 31.5 Operational complexity term, Gamma typing, and reward shift

The V6 scorer supplies an executable interpretation of the complexity component in the three-term telic form. Let

\[
N_{\mathrm{lib}}=305
\]

be the live library symbol count and let \(A_t\) be the current activated-symbol state. The implementation computes

\[
C_{\mathrm{V6}}(A_t)
=
1-\frac{|A_t|}{N_{\mathrm{lib}}}.
\]

The source comment states that each contraction pass reduces \( |\Gamma| \), while the executable operand is `activatedSymbols`. Within the V6 implementation, this gives the operational typing

\[
\Gamma_{\mathrm{V6}}=A_t
\]

and the normalized active-density quantity

\[
K_{\mathrm{density}}(A_t)
=
\frac{|A_t|}{N_{\mathrm{lib}}}.
\]

Therefore

\[
\boxed{
C_{\mathrm{V6}}(A_t)
=
1-K_{\mathrm{density}}(A_t)
}
\]

is an exact code-level identity. The source-level prose \(K(\Gamma)\) remains less fully typed, so the relationship

\[
K_{\mathcal T_3}(\Gamma)
\longleftrightarrow
K_{\mathrm{density}}(A_t)
\]

is recorded as the V6 operational interpretation rather than silently replacing every wider meaning of complexity.

#### 31.5.1 Monotonicity under contraction

The recovered contraction operator is a pure filter:

\[
A_{t+1}\subseteq A_t.
\]

Hence

\[
|A_{t+1}|\le |A_t|
\]

and therefore

\[
K_{\mathrm{density}}(A_{t+1})
\le
K_{\mathrm{density}}(A_t),
\]

while

\[
\boxed{
C_{\mathrm{V6}}(A_{t+1})
\ge
C_{\mathrm{V6}}(A_t)
}.
\]

Thus the V6 complexity component is a sparsity or simplicity reward that is non-decreasing under the inspected contraction rules.

For valid active states with \(0\le |A_t|\le N_{\mathrm{lib}}\),

\[
0\le C_{\mathrm{V6}}(A_t)\le1.
\]

Its maximum is \(1\) at the empty active state and its minimum is \(0\) when the active state contains the full library. The current activation route draws library rows, so no active state larger than the live denominator was recovered.

#### 31.5.2 Cost form versus reward form

The source expression uses the cost form

\[
-\beta K(\Gamma),
\]

whereas V6 uses

\[
+\beta C_{\mathrm{V6}}(A)
=
+\beta\left(1-K_{\mathrm{density}}(A)\right).
\]

Therefore

\[
\beta\left(1-K_{\mathrm{density}}(A)\right)
=
\beta-\beta K_{\mathrm{density}}(A).
\]

The V6 reward form differs from the literal normalized cost form by the additive constant \(\beta\). With the recovered value \(\beta=0.25\),

\[
T_{\mathrm{V6,raw}}
=
T_{\mathrm{cost,raw}}+0.25
\]

before clamping, when all other terms are held equal and \(K=K_{\mathrm{density}}\).

This constant shift preserves un-clamped ranking and pairwise score differences:

\[
T_i>T_j
\iff
(T_i+\beta)>(T_j+\beta).
\]

It does not preserve absolute interpretation under every operation. It can affect:

- an absolute acceptance threshold;
- proximity to the \([0,1]\) clamp boundaries;
- the meaning of zero and one on the reported telic scale.

The code therefore implements a reward-normalized version of the complexity term, not a literally identical absolute-value transcription of \(-\beta K(\Gamma)\).

#### 31.5.3 Separation from gzip/NCD complexity

The May 2026 dossier's symmetrized normalized compression distance acts on a pair of serialized plugin outputs:

\[
D_{\mathrm{NCD}}(x,y)
=
\operatorname{clip}_{[0,1]}
\left(
\frac{
C_{\mathrm{sym}}(x,y)-\min\{C(x),C(y)\}
}{
\max\{C(x),C(y)\}
}
\right),
\]

where

\[
C_{\mathrm{sym}}(x,y)
=
\frac{C(xy)+C(yx)}{2}.
\]

Recovered context assigns this pairwise distance to an NCD coherence sieve and review/readiness machinery. It is not wired to the V6 telic scorer and is not identified with the one-object cardinality quantity \(K_{\mathrm{density}}(A)\).

V3 therefore preserves three distinct complexity families:

\[
K_{\mathrm{density}}(A)
=
\frac{|A|}{305}
\qquad
\text{(V6 active-state density)},
\]

\[
C_{\mathrm{gzip}}(x)
\qquad
\text{(compressed length)},
\]

and

\[
D_{\mathrm{NCD}}(x,y)
\qquad
\text{(pairwise compression distance)}.
\]

Their shared compression theme does not make them the same mathematical object.

#### 31.5.4 Gamma overload

A separate collation passage uses \(\Gamma\) as the target alphabet of a routing-string homomorphism. This is not the V6 active-state operand. V3 now distinguishes

\[
\Gamma_{\mathrm{telic,V6}}=A_t
\]

from

\[
\Gamma_{\mathrm{routing}}
=
\text{target alphabet of serialized notebook actions and routes}.
\]

The repeated letter is a notation overload, not an identity.

The remaining open questions around the complexity term are narrower:

- whether the source author intended the normalized active density later used by V6;
- whether the additive reward shift was an intentional normalization choice;
- whether any other implementation gives \(K(\Gamma)\) a graph, description-length, or encoding-based definition;
- how absolute thresholds should be interpreted after the \(+\beta\) shift.


### 31.6 Two executable four-term telic engines

Full-history inspection of `telic-engine` and `telic-engine-refactor` recovered two mathematically distinct four-term systems. They share the same signed four-term scalar skeleton but act on different state spaces, use different component functions, and evolve by different transition laws.

#### 31.6.1 Agent-population telic functional

For an agent state and candidate move, `telic-engine` computes

\[
T_{\mathrm{agent}}
=
\gamma_s I
+
\delta_s\Phi
-
\alpha_s K
+
\beta_s E.
\]

Its implemented term dictionary is

\[
I\in[0,1]
\quad\text{(agent information scalar)},
\]

\[
\Phi\in[0,1]
\quad\text{(one selected member of a seven-operator family)},
\]

\[
K(a)=|N(a)|
\quad\text{(raw neighbour-count coordination cost)},
\]

\[
E(a)=\text{raw agent energy}.
\]

Candidate moves are evaluated by this functional and selected either by an argmax rule or a Boltzmann policy. The score itself is not clamped.

The default coefficients recovered from the engine are

\[
\alpha_s=0.6,
\qquad
\gamma_s=1,
\qquad
\delta_s=1,
\qquad
\beta_s=1.
\]

The engine therefore supplies an executable energy-valued four-term dictionary, but it is not the only recovered four-term dictionary in V3.

#### 31.6.2 Seven agent-engine \(\Phi\) operators

The selectable agent-engine operators are:

\[
\Phi_{\mathrm{none}}=0,
\]

\[
\Phi_{\mathrm{random}}\sim U[0,1),
\]

\[
\Phi_{\mathrm{spatial}}
=
\frac{L}{\binom{g}{2}},
\]

where \(L\) is the number of linked pairs inside the local vision group of size \(g\);

\[
\Phi_{\mathrm{information}}
=
\frac{H(X)}{\log_2|\mathcal S|},
\qquad
H(X)=-\sum_xp(x)\log_2p(x),
\]

\[
\Phi_{\mathrm{conditional}}
=
1-
\left[
 p_{\mathrm{match}}H_{\mathrm{match}}
 +(1-p_{\mathrm{match}})H_{\mathrm{nonmatch}}
\right],
\]

and

\[
\Phi_{\mathrm{triplet}}
=
\frac{N_{\mathrm{all\ same}}}{\binom{n}{2}}.
\]

The remaining operator is labelled `MUTUAL_INFO`. Its implemented form is

\[
\Phi_{\mathrm{MI-code}}
=
\frac{1}{\log_2|\mathcal S|}
\sum_y
p(x_0,y)
\log_2
\frac{p(x_0,y)}{p_Y(y)},
\]

where the self-symbol \(x_0\) is fixed throughout the local sample. Because

\[
p(x_0,y)=p_Y(y),
\]

for every represented neighbour symbol \(y\), each summand satisfies

\[
\log_2\frac{p(x_0,y)}{p_Y(y)}
=
\log_2(1)
=
0.
\]

Hence

\[
\boxed{
\Phi_{\mathrm{MI-code}}\equiv0
}
\]

for every valid input. Execution over perfect-dependence, independence, constant, one-agent, two-agent, and mixed cases confirmed the zero result. The operator is therefore rejected as a mutual-information computation in its recovered form.

The operator family also lacks a common directional semantics: `INFORMATION` rewards higher entropy, while `COND_ENTROPY` and `TRIPLET` reward agreement or homophily. Selection of a \(\Phi\) operator therefore changes not only the measurement but also the meaning of “higher is better.”

#### 31.6.3 Scale and commensurability of the agent functional

The agent functional combines two normalised terms with two raw-scale terms:

\[
I,\Phi\in[0,1],
\]

\[
K=|N(a)|,
\]

\[
E\in[5,12]\ \text{initially, with no recovered upper clip after gains}.
\]

Under the default coefficients,

\[
\gamma_sI\in[0,1],
\qquad
\delta_s\Phi\in[0,1],
\]

while

\[
-\alpha_sK=-0.6|N(a)|
\]

and

\[
\beta_sE=E.
\]

Thus the raw energy term can dominate the two normalised information terms purely through scale, while dense neighbourhoods can produce a comparably large negative coordination term. The recovered functional is mathematically evaluable but not dimensionally or numerically commensurate by construction.

The energy term is current absolute energy evaluated before the candidate move's gain. Energy is depleted per step, increased by environmental gain and consumption, and used in extinction dynamics. No normalised energy term was recovered.

#### 31.6.4 Agent decision policy and coefficient evolution

The stable softmax implementation is

\[
P(a')
=
\frac{
\exp\left((T(a')-T_{\max})/\tau\right)
}{
\sum_b\exp\left((T(b)-T_{\max})/\tau\right)
}.
\]

Subtracting \(T_{\max}\) protects the exponential calculation. As usual,

\[
\tau\to0
\implies
P\ \text{concentrates on argmax moves},
\]

and

\[
\tau\to\infty
\implies
P\ \text{approaches uniform selection}.
\]

The recovered implementation also adapts temperature to the score spread and allows negative scores.

Each coefficient evolves by multiplicative Gaussian mutation:

\[
\theta_{t+1}
=
\begin{cases}
\theta_t(1+\varepsilon_t),&\text{with probability }p_{\mathrm{mut}},\\
\theta_t,&\text{otherwise},
\end{cases}
\]

with

\[
\varepsilon_t\sim\mathcal N(0,\sigma_{\mathrm{mut}}^2),
\qquad
\theta\in\{\alpha_s,\beta_s,\gamma_s,\delta_s\}.
\]

No clipping, reflection, non-negativity constraint, or simplex normalisation was recovered. Coefficients can therefore become negative and their sum is unconstrained. This is evolutionary parameter search under survival selection, not a recovered statistical calibration law.

#### 31.6.5 Sequence state and complete telic functional

`telic-engine-refactor` contains a second telic system acting on an ordered sequence

\[
s=(s_1,\ldots,s_n)
\]

of ontology symbol identifiers. Order is significant, repeated identifiers are permitted, and symbol weights and bridge relations are resolved through the CODEX library.

The executable score is not merely the displayed four-term skeleton. It is

\[
\boxed{
T_{\mathrm{seq}}(s)
=
\alpha_q I_q(s)
+
\gamma_q\Phi_q(s)
+
\delta_qE_q(s)
-
\beta_q\widetilde K_q(s)
+
c_{I\Phi}I_q(s)\Phi_q(s)
}
\]

with recovered defaults

\[
\alpha_q=0.5,
\qquad
\beta_q=0.1,
\qquad
\gamma_q=0.3,
\qquad
\delta_q=0.2,
\qquad
c_{I\Phi}=0.2.
\]

The coupling term

\[
c_{I\Phi}I_q\Phi_q
\]

and the nonlinear complexity penalty are part of the executable functional even though they are omitted from the shorter four-term description.

The information term is a weighted entropy blend:

\[
I_q(s)
=
0.7H_1(s)+0.3H_2(s),
\]

where

\[
H_1(s)
=
-\sum_x p_1(x)\ln\bigl(p_1(x)+\varepsilon\bigr)
\]

is unigram entropy and

\[
H_2(s)
=
-\sum_{x,y}p_2(x,y)\ln\bigl(p_2(x,y)+\varepsilon\bigr)
\]

is adjacent-bigram entropy, with

\[
\varepsilon=10^{-9}.
\]

The additive epsilon appears inside the logarithm without renormalising the probabilities. It is therefore an epsilon regularisation of the logarithm, not a recovered Laplace-smoothed probability model.

The sequence coherence term is

\[
\Phi_q(s)
=
0.4\Phi_{\mathrm{inventory}}(s)
+
0.6\Phi_{\mathrm{transition}}(s),
\]

with

\[
\Phi_{\mathrm{inventory}}(s)
=
1-
\frac{
|\operatorname{Distinct}(s)|
}{
N_{\mathrm{library}}
},
\]

and, for \(n>1\),

\[
\Phi_{\mathrm{transition}}(s)
=
\frac{1}{n-1}
\sum_{j=1}^{n-1}
q(s_j,s_{j+1}),
\]

where

\[
q(x,y)
=
\begin{cases}
1,&\operatorname{domain}(x)=\operatorname{domain}(y),\\
0.8,&x\text{ and }y\text{ are joined by a recovered cross-domain bridge},\\
0,&\text{otherwise}.
\end{cases}
\]

Thus \(\Phi_q\) blends inventory concentration with bridge-aware adjacent connectedness. It is the closest recovered executable quantity to the connectedness/structural-density gloss, but it is not the V6 invariant-density ratio.

The sequence energy is a weighted sum with geometric attenuation of repeated symbols. Writing \(r_j\) for the occurrence index of \(s_j\) among earlier copies of the same symbol, the recovered rule is

\[
E_q(s)
=
\sum_{j=1}^{n}
 w(s_j)\rho^{r_j-1},
\qquad
\rho=0.8.
\]

For a symbol \(x\) occurring \(m_x\) times, its total contribution is therefore

\[
E_x(m_x)
=
w(x)
\sum_{r=0}^{m_x-1}\rho^r
=
\frac{w(x)(1-\rho^{m_x})}{1-\rho}.
\]

With \(\rho=0.8\),

\[
E_x(m_x)<5w(x).
\]

Hence, for a finite library of non-negative symbol weights,

\[
E_q(s)
<
5\sum_{x\in\mathcal S_{\mathrm{library}}}w(x).
\]

The energy term is not unbounded under the recovered geometric rule, but it remains on a raw ontology-weight scale that can exceed the information and coherence contributions by orders of magnitude.

The raw complexity is sequence length:

\[
K_q(s)=|s|.
\]

The executed penalty is piecewise:

\[
\widetilde K_q(s)
=
\begin{cases}
|s|,&|s|\le10,\\
10+(|s|-10)^2,&|s|>10.
\end{cases}
\]

This is a linear length cost with a quadratic tail. It is distinct from V6 active-density complexity, agent neighbour-count complexity, path strain, and NCD.

#### 31.6.6 Sequence coherence is not Ollivier–Ricci curvature

The refactor labels its coherence quantity as Ollivier–Ricci-style curvature, but the recovered implementation contains no:

- neighbourhood probability measures;
- graph metric \(d(x,y)\);
- Wasserstein transport cost;
- optimal transport calculation;
- edge curvature of the form

\[
1-
\frac{W_1(m_x,m_y)}{d(x,y)}.
\]

The executable function is exactly the inventory-and-transition quantity \(\Phi_q(s)\) above. Its mathematical classification is therefore

\[
\boxed{
\kappa_{\mathrm{seq}}(s)
:=
\Phi_q(s)
}
\]

as a bridge-aware sequence-coherence score. The code label `kappa_Ollivier` is rejected as a literal Ollivier–Ricci identification.

#### 31.6.7 Telic curvature recovered as coherence-modulated score velocity

The sequence engine defines

\[
\mathcal C_t
=
\kappa_{\mathrm{seq}}(s_t)
\left[
1+\lambda\Delta T_t
\right],
\]

where

\[
\Delta T_t
=
T_{\mathrm{seq}}(s_t)
-
T_{\mathrm{seq}}(s_{t-1})
\]

and the recovered default is

\[
\lambda=0.618.
\]

This is not a second finite difference. It is sequence coherence modulated by first-order telic change.

For the recovered positive default \(\lambda>0\) and \(\kappa_{\mathrm{seq}}>0\),

\[
\mathcal C_t>0
\iff
\Delta T_t>-\lambda^{-1},
\]

\[
\mathcal C_t=0
\iff
\Delta T_t=-\lambda^{-1},
\]

and

\[
\mathcal C_t<0
\iff
\Delta T_t<-\lambda^{-1}.
\]

Numerically,

\[
-\lambda^{-1}\approx-1.618.
\]

If \(\kappa_{\mathrm{seq}}=0\), then \(\mathcal C_t=0\) independently of \(\Delta T_t\). No universal bound follows because the score difference can be large. The dimensional status is unresolved because the functional combines heterogeneous unnormalised scales.

#### 31.6.8 Sequence invariance properties

Several invariance claims can now be stated more precisely.

Unigram entropy, symbol-count energy, and length complexity are invariant under arbitrary permutation of a fixed multiset. Bigram entropy is not invariant under arbitrary permutation, but it is invariant under complete reversal. If

\[
s^{\mathrm{rev}}=(s_n,\ldots,s_1),
\]

then reversal maps each bigram \((x,y)\) bijectively to \((y,x)\) with the same multiplicity, so

\[
H_2(s^{\mathrm{rev}})=H_2(s).
\]

The recovered bridge predicate checks both stored directions:

\[
\operatorname{bridge}(x,y)
\iff
\bigl[(x,y)\in\mathcal B\bigr]
\lor
\bigl[(y,x)\in\mathcal B\bigr].
\]

It is therefore symmetric even when stored bridge records use `from` and `to` fields. Reversal preserves unigram entropy, bigram entropy, the symbol multiset, sequence energy, length complexity, inventory coherence, and transition coherence. Hence the complete recovered sequence score satisfies

\[
\boxed{
T_{\mathrm{seq}}(s^{\mathrm{rev}})
=
T_{\mathrm{seq}}(s)
}
\]

for every valid sequence. This is an exact invariance of the recovered implementation, not merely a two-symbol observation.

The score is not generally invariant under:

- arbitrary permutation, because adjacent-transition structure changes;
- duplication, because energy, entropy, and the piecewise length penalty change;
- insertion of a weight-zero symbol, because length and adjacency change;
- cyclic rotation of an open sequence, because endpoint adjacencies change;
- uniform scaling of symbol weights, because \(E_q\) scales;
- relabelling that fails to preserve weights, domains, and bridge relations.

#### 31.6.9 Explicit proposal and acceptance dynamics

The sequence engine evolves through a finite edit frontier generated from the operator family

\[
\mathfrak P
=
\left\{
P_{\mathrm{ins}},
P_{\mathrm{del}},
P_{\mathrm{comb}},
P_{\mathrm{swap}},
P_{\mathrm{id}}
\right\}.
\]

The recovered operators are:

\[
P_{\mathrm{ins}}:
(s_1,\ldots,s_n)
\mapsto
(s_1,\ldots,s_j,x,s_{j+1},\ldots,s_n),
\]

subject to the configured maximum length;

\[
P_{\mathrm{del}}:
(s_1,\ldots,s_j,\ldots,s_n)
\mapsto
(s_1,\ldots,s_{j-1},s_{j+1},\ldots,s_n),
\]

subject to \(n>1\);

\[
P_{\mathrm{comb}}:
(\ldots,s_j,s_{j+1},\ldots)
\mapsto
(\ldots,\operatorname{combine}(s_j,s_{j+1}),\ldots),
\]

and

\[
P_{\mathrm{swap}}:
(\ldots,s_i,\ldots,s_j,\ldots)
\mapsto
(\ldots,s_j,\ldots,s_i,\ldots).
\]

The identity proposal \(P_{\mathrm{id}}(s)=s\) is generated as `none` but is ineligible for acceptance.

Two proposal strategies were recovered:

- a flat generator that permits ordinary glyph choices and positions;
- a stratified generator with Preserver, Catalyst, Synthesizer, and System roles, including kernel-preserving insertion and deletion restrictions.

Each proposal performs one edit. No multi-edit composition inside a single proposal was recovered. Insertion and deletion are inverse operator types, while swap is self-inverse, so cycles are structurally possible.

For a candidate \(p\), define

\[
\Delta T(p)
=
T_{\mathrm{seq}}(p)-T_{\mathrm{seq}}(s_t).
\]

Candidates are evaluated with two different quantities that must remain separate.

The raw ranking score is

\[
S(c)=T_{\mathrm{seq}}(\operatorname{sequence}(c)).
\]

The acceptance delta is an adjusted quantity

\[
\delta(c)
=
S(c)-T_{\mathrm{seq}}(s_t)-Q(c)+B(c),
\]

where the recovered insert-quality penalty is

\[
Q(c)
=
\mathbf 1_{\{\operatorname{type}(c)=\mathrm{insert}\}}
\left[
0.5\max\{0,R(s_t)-R(c)\}
+
0.3\max\{0,\Phi_q(s_t)-\Phi_q(c)\}
\right],
\]

and the proposal bonuses are

\[
B(c)=
\begin{cases}
0.01,&\operatorname{type}(c)=\mathrm{none},\\
0.005,&\operatorname{type}(c)=\mathrm{swap},\\
0,&\text{otherwise}.
\end{cases}
\]

Selection maximises the raw score \(S(c)\), not the adjusted delta \(\delta(c)\). Let the frontier be the list \(F_t\), including the identity record

\[
c_0=(\mathrm{none},s_t).
\]

Then

\[
M_t
=
\left\{
c\in F_t:
S(c)=\max_{d\in F_t}S(d)
\right\}.
\]

The implementation retains candidate records as a list rather than deduplicating them by sequence. A stable sort is applied to \(M_t\), followed by the deterministic seeded index

\[
j_t
=
(\mathrm{seed}+t)\bmod |M_t|.
\]

The chosen candidate \(c_t^*\) is then admitted by the adjusted Metropolis-shaped gate

\[
A(c_t^*)
=
\mathbf 1_{\{\operatorname{type}(c_t^*)\neq\mathrm{none}\}}
\mathbf 1\!\left[
\delta(c_t^*)>0
\;\lor\;
\ln U<\frac{\delta(c_t^*)}{\tau_t+10^{-6}}
\right],
\]

where \(U\sim U(0,1)\).

This is not a standard Metropolis or Metropolis--Hastings transition. The candidate is first obtained by greedy raw-score maximisation, the tie rule is deterministic for fixed seed and step, the gate uses the adjusted delta \(\delta\) rather than the raw score difference, and no Hastings proposal-ratio correction appears.

Because the identity candidate is always present,

\[
\max_{c\in F_t}S(c)
\ge
S(c_0)
=
T_{\mathrm{seq}}(s_t).
\]

If the chosen candidate is rejected, the state remains \(s_t\). If it is accepted, its raw score equals the frontier maximum. Therefore the correct local invariant is

\[
\boxed{
T_{\mathrm{seq}}(s_{t+1})
\ge
T_{\mathrm{seq}}(s_t)
}
\]

for every recovered sequence-engine transition.

The stochastic gate can reject, or probabilistically admit, a raw-score-maximising insert whose duality/coherence penalty makes \(\delta<0\). It cannot admit a raw telic regression, because no candidate with raw score below the identity candidate can enter the maximum-score set.

The transition law is

\[
s_{t+1}
=
\begin{cases}
\operatorname{sequence}(c_t^*),&A(c_t^*)=1,\\
s_t,&A(c_t^*)=0.
\end{cases}
\]

Curvature is calculated after the score transition as a diagnostic. It does not participate in proposal generation, ranking, selection, acceptance, or temperature control.

#### 31.6.10 Numerical sequence example and current consequences

For three distinct same-domain symbols with weights

\[
100,
\quad
80,
\quad
60,
\]

using a library size of \(300\), the recovered calculation gives approximately

\[
I_q=0.977,
\qquad
\Phi_q=0.996,
\qquad
E_q=240,
\qquad
\widetilde K_q=3.
\]

Therefore

\[
\begin{aligned}
T_{\mathrm{seq}}
&=
0.5(0.977)
+0.3(0.996)
+0.2(240)
-0.1(3)
+0.2(0.977)(0.996)\\
&\approx48.68.
\end{aligned}
\]

With previous score zero and \(\lambda=0.618\),

\[
\mathcal C_t
=
0.996
\left[
1+0.618(48.68)
\right]
\approx30.98.
\]

The example demonstrates a severe default scale imbalance: the energy contribution

\[
\delta_qE_q=48
\]

is roughly two orders of magnitude larger than the information and coherence contributions. The geometric attenuation bounds repeated-symbol energy, but does not make the four component scales commensurate.

The combined three-engine discovery now establishes:

- V6: a monotone three-term contraction score over active symbol sets;
- agent engine: a non-monotone four-term population decision score;
- sequence engine: a five-contribution proposal-ranking functional over ordered symbol paths;
- three incompatible operational information terms;
- three incompatible operational complexity terms;
- multiple energy dictionaries;
- multiple executable \(\Phi\) families;
- a proven zero mutual-information operator in the agent engine;
- a bridge-aware sequence coherence score mislabelled as Ollivier–Ricci curvature;
- a coherence-modulated telic velocity rather than second-order curvature;
- significant scale imbalance in both four-term engines.

The remaining sequence-engine questions are now focused on:

- the exact `codex.combine` merge algebra and whether it preserves weight, domain, bridge, kernel, or semantic invariants;
- the annealing schedule and whether the Metropolis-style kernel has any stationary or detailed-balance interpretation despite max-frontier selection and asymmetric proposal generators;
- the exact defaults and roles of \(\eta\), \(\varepsilon\), observer persistence, and the path-integral state;
- whether `getInventoryKey` deduplicates proposals, suppresses revisits, or changes cycle structure;
- whether library size is fixed or live in \(\Phi_{\mathrm{inventory}}\);
- whether any normalised energy or complexity variants exist elsewhere in the refactor history;
- whether the coupling coefficient \(c_{I\Phi}=0.2\) and the golden-ratio parameter \(\lambda=0.618\) have derivations or are chosen design constants.


#### 31.6.11 Component deltas and the quadratic marginal cost

For any candidate, the score difference decomposes as

\[
\Delta T
=
\alpha_q\Delta I_q
+
\gamma_q\Delta\Phi_q
+
\delta_q\Delta E_q
-
\beta_q\Delta\widetilde K_q
+
c_{I\Phi}\Delta(I_q\Phi_q),
\]

with

\[
\Delta(I_q\Phi_q)
=
I_q\Delta\Phi_q
+
\Phi_q\Delta I_q
+
\Delta I_q\Delta\Phi_q.
\]

The operator-level signs are only partially determined:

- insertion has \(\Delta E_q\ge0\) and \(\Delta\widetilde K_q>0\), while its information and coherence effects depend on the inserted symbol and position;
- deletion has \(\Delta E_q\le0\) and \(\Delta\widetilde K_q<0\), while its information and coherence effects remain state-dependent;
- swap preserves the multiset, so \(\Delta E_q=0\), \(\Delta\widetilde K_q=0\), and inventory coherence is unchanged; only bigram entropy and transition coherence can change;
- combine reduces length by one, but the signs of its energy, information, and coherence changes depend on the unrecovered `codex.combine` result.

No proposal operator has a universally determined sign for \(\Delta T\).

For insertion from length \(n\) to \(n+1\), the marginal complexity cost is

\[
\Delta\widetilde K_q(n)
=
\widetilde K_q(n+1)-\widetilde K_q(n).
\]

Thus

\[
\Delta\widetilde K_q(n)=1
\qquad(n<10),
\]

and for \(n\ge10\),

\[
\begin{aligned}
\Delta\widetilde K_q(n)
&=
\left[10+(n-9)^2\right]
-
\left[10+(n-10)^2\right]\\
&=
2(n-10)+1.
\end{aligned}
\]

The post-threshold marginal costs are therefore

\[
1,3,5,7,\ldots
\]

for insertions \(10\to11,11\to12,12\to13,13\to14,\ldots\). This produces a progressively stronger soft length ceiling rather than a hard truncation.

#### 31.6.12 Bounded duality dynamics

The refactor maintains a parallel scalar duality state

\[
D_t\in[0,1].
\]

The older additive description was replaced by a bounded exponential moving average. The recovered force is

\[
F_t
=
\lambda\Phi_q(s_t)
+
\eta I_q(s_t)
+
\varepsilon,
\]

with

\[
\lambda=0.618.
\]

Let \(R_t\) denote the recovered raw-duality product, constructed from an average-weight energy factor, a normalised diversity factor, and a coherence factor. The target is

\[
Z_t
=
\min\left\{
1,
R_t\left(1+0.2F_t\right)
\right\},
\]

and the state update is

\[
\boxed{
D_{t+1}
=
D_t+0.2(Z_t-D_t)
=
0.8D_t+0.2Z_t
}
\]

followed by clamping to \([0,1]\). The epsilon term is a configured constant in the recovered implementation, not a random variable.

Iterating gives

\[
D_t
=
0.8^tD_0
+
0.2
\sum_{k=0}^{t-1}
0.8^{t-1-k}Z_k.
\]

Consequently:

- the influence of \(D_0\) decays geometrically;
- \(D_t\) is bounded by construction;
- if \(Z_t\to Z^*\), then \(D_t\to Z^*\);
- arbitrary time-varying forcing need not converge, but cannot make the clamped duality state diverge.

The recovered telic-curvature metric \(\mathcal C_t\) is not used in this update. Duality uses the raw coherence and information functions directly. Thus no curvature-feedback path into later sequence transitions has been recovered.

#### 31.6.13 Reachability, cycles, and process type

The sequence alphabet is finite and the configured maximum length is finite. The sequence coordinate alone therefore has a finite state space. Reversible edit types permit

\[
s\longrightarrow s'\longrightarrow s,
\]

so the proposal graph is cyclic rather than acyclic.

The complete runtime state is richer than the sequence coordinate. It includes at least

\[
X_t
=
\langle
s_t,D_t,\tau_t,\mathcal H_t
\rangle,
\]

where \(D_t\) and \(\tau_t\) are real-valued and \(\mathcal H_t\) is a growing history. The complete state space is therefore not a finite Markov chain merely because the sequence set is finite.

More precise classifications are:

- conditional on a fixed temperature and a transition rule depending only on the current sequence, the sequence coordinate defines a finite-state stochastic transition process;
- with an annealing schedule, the sequence process is generally time-inhomogeneous unless temperature is included in the state;
- with duality and history included, the recovered system is a stochastic dynamical system on a mixed discrete--continuous state;
- fixing the pseudorandom seed produces a reproducible deterministic trajectory through that stochastic model.

No detailed-balance proof, stationary distribution, irreducibility proof, or aperiodicity proof has yet been recovered. Repeated-state suppression and the operational effect of `getInventoryKey` also remain open.


#### 31.6.14 Exact frontier law, temperature, and kernel boundary

The flat generator produces one randomly instantiated candidate for each available operator type. The stratified generator produces one candidate for each available role-specific branch. It does not enumerate every possible insertion, deletion, merge, or swap. Thus the frontier itself is random:

\[
F_t\sim\mathsf G(\,\cdot\mid s_t,\text{mode},\text{RNG}\,).
\]

Conditional on a realised frontier and fixed seed/step, winner selection is deterministic. The unconditional sequence-transition kernel must therefore integrate over random frontier construction and the acceptance draw:

\[
P_t(s,s')
=
\sum_F
\Pr(F\mid s)
\mathbf 1\!\left[
\operatorname{sequence}(h_{\mathrm{seed},t}(M(F)))=s'
\right]
A_F(s,s')
\]

for \(s'\neq s\), where \(h_{\mathrm{seed},t}\) is the stable-sort seeded-index selector. The self-loop probability contains rejected candidates and selected identity records.

A simple factor

\[
P_t(s,s')=\frac{1}{|M_t|}A_t(s,s')
\]

is not the recovered runtime law. Tie selection is not random-uniform for a fixed run, duplicate candidate records are not removed, and their multiplicity changes the sorted pool and seeded index.

The temperature schedule is

\[
\tau_t
=
\tau_0(0.95)^t,
\]

so the adjusted acceptance gate becomes increasingly strict. The additional stochastic stop

\[
U>\tau_t
\]

is checked only after the sequence has already collapsed to the singleton terminal state \(\{\text{Light}\}\) or \(\{\text{Void}\}\). It is not a general temperature-based stopping rule.

The inventory key is

\[
\operatorname{InvKey}(s)
=
\operatorname{sort}
\left(
\{x:\operatorname{count}_s(x)
\}
\right),
\]

an order-insensitive, multiplicity-sensitive multiset representation. In the recovered call path it is used to report whether accepted evolution changed inventory rather than only order. It does not deduplicate the frontier or suppress revisits.

The merge operator is a deterministic, many-to-one map

\[
\operatorname{combine}:\mathcal A\times\mathcal A\to\mathcal A
\]

with Void/Light special cases, same-domain weight dominance, undirected bridge resolution, and default weight dominance. It is idempotent:

\[
\operatorname{combine}(a,a)=a.
\]

It is not generally commutative because equal-weight and missing-symbol branches select the first argument. Its associativity has not yet been established by a complete executable counterexample. Although the merge itself loses information, non-invertibility of this single operator does not by itself prove that the full proposal process lacks a reverse path, because insertion and other edits may reach the same predecessor state.

The monotone raw-score theorem has structural consequences on the finite sequence coordinate:

- strict raw-score decreases are unreachable;
- recurrent movement can occur only within an equal-score level set;
- a state whose identity candidate is the unique raw-score maximiser of its realised frontier self-loops;
- cycles, when present, must preserve raw telic score at every accepted edge.

The previously reported six-state transition matrix is not integrated as authoritative mathematics. It was generated with assumptions of unique-state deduplication and uniform tie selection that differ from the recovered list-valued frontier and deterministic tie policy. A corrected finite enumeration must reproduce the actual random frontier generator, candidate multiplicity, stable sort, seeded index, adjusted delta, and terminal rules before stationary-distribution claims are promoted.


## 32. Needle-Action transition grammar

The six surfaced operators remain preserved as candidate transition mathematics:

\[
N_i\in
\{N_{\mathrm{birth}},N_{\mathrm{prom}},N_{\mathrm{back}},N_{\mathrm{fence}},N_{\mathrm{opp}},N_{\mathrm{void}}\}.
\]

**Mathematical status:** Candidate design grammar.

**Implementation status:** No executable operator layer was found; current ontology changes use guarded SQL. The ontology glyph 🪡 and the operator grammar are distinct typed objects.

The dual acceptance condition is scoped to repair and healing:

\[
\boxed{
N_i\in\mathcal N_{\mathrm{repair}}
\implies
\left(\Delta S>0\land\Delta H_{97}=0\right).
}
\]

It is not a universal gate on additive insertion or administrative changes.

Strain laws for Birth, Backfill, and Oppose remain open mathematical questions. Receipt composition remains open:

\[
\rho(N_1\circ\cdots\circ N_k)
\in
\{(\rho_1,\ldots,\rho_k),\rho_{\mathrm{tx}}\}
\]

until a transaction model is defined. These are preserved discovery questions, not deleted because the operators are unimplemented.

## 33. Scientific knowledge-state mathematics

### 33.1 Implemented guarded record transition

A smaller operational research-state object exists:

\[
R_t
=
\langle s_t,c_t,z_t,p_t,h_t\rangle,
\]

where

\[
s_t\in\{1,2,3\},
\qquad
c_t\in\{0,\ldots,100\},
\]

\[
z_t\in
\{\text{open},\text{testing},\text{supported},\text{constrained},\text{resolved},\text{superseded},\text{parked}\},
\]

$p_t$ is an evidence pointer or null, and each history element is exactly

\[
\langle
\text{from\_stratum},
\text{to\_stratum},
\text{evidence\_pointer},
\text{changed\_at},
\text{changed\_by}
\rangle.
\]

A stratum move is guarded by an evidence pointer:

\[
s'\neq s_t\land p_{\mathrm{provided}}
\implies
h_{t+1}
=
h_t\frown
\langle s_t,s',p,\mathrm{now},\mathrm{actor}\rangle.
\]

\[
s'\neq s_t\land\neg p_{\mathrm{provided}}
\implies
R_{t+1}=R_t.
\]

The system permits upward and downward stratum changes. It records caller-supplied scientific standing; it does not automatically derive validity, confidence, status, or stratum from evidence.

\[
\boxed{
\text{guarded research-state mutation}
\neq
\text{automated scientific adjudication}
}
\]

**Implementation status:** Source-verified; not unit-test verified.

### 33.2 Richer scientific-state discovery architecture

The richer surfaced mathematics remains preserved:

\[
M
=
\langle\mathbf v,\mathbf b,c_k,\mathbf e^+,\mathbf e^-\rangle,
\]

\[
\Phi_-(M)
=
\frac{\|\mathbf e^-\|}{\|\mathbf e^+\|+\|\mathbf e^-\|},
\]

\[
F_i(t)=e^{-\gamma_i\Delta t_i},
\]

\[
G_1=H(\mathcal S(M)-\mathcal S_{\min}),
\qquad
G_2=H(C_{\max}-c_k),
\]

\[
\Delta\mathbf e^-
=
\operatorname{RetrieveVerifiedCounterEvidence}(M),
\]

\[
\mathcal D(M,\mathbf K_t)
=
\sum_i\|\mathbf T(M,M_i)\|,
\]

and

\[
\mathbf K_{t+1}
=
\begin{cases}
\mathbf K_t\cup\{M'\},&G_1G_2=1,\\
\mathbf K_t,&G_1G_2=0.
\end{cases}
\]

**Mathematical status:** Candidate/Open scientific architecture.

**Implementation status:** No implementation found for the evidence-polarity vectors, contradiction tensor, freshness decay, structure/admissibility gates, counter-evidence retrieval, or set-level update law.

These objects are not equated with the flat `research_state` columns. In particular:

- live `confidence` is not automatically $\mathcal S(M)$;
- `claim_type=counter_evidence` is not $\mathbf e^-$;
- `stratum_history` is not $\mathbf K_t$;
- free-text findings are not a tensor $\mathbf T$.

The richer mathematics remains in V3 as discovery, not as a claim about the deployed worker.

## 34. Additional discovery families preserved

The following V2 and gap-hunt families remain active mathematical discovery areas unless separately disproved:

- basin dynamics and convergence geometry;
- subscriber calibration and personal parameter learning;
- user-symbol lifecycle and adaptive forge;
- ontology curvature and graph-geometric bridge discovery;
- qubit/cubit direction;
- temporal trust and learned observer layers;
- retrieval scorer conflicts;
- compression, emergence-trace, triangulation, image, embedding, triage, classifier-cost, and epistemic-utility mathematics;
- conventional research equations retained in Part I with their original status boundaries.

No family is removed merely because a matching implementation has not been recovered.

---

# Part III — Live discovery programme

## 35. Current mathematical discovery targets

The following are live discovery questions, not deletion candidates.

### 35.1 Emergence composition

Define the state types and computable relationship among

\[
R_{\mathrm{reality}}(t),
\qquad
T_{\mathrm{telic}},
\qquad
\Sigma(V(C(S))),
\qquad
E(S,t).
\]

A valid closure requires a domain, codomain, combination rule, and non-circular relationship to the scalar telic score.

Current evidence establishes only a conditional typing of the inner representation chain: if §3.5 reuses the §3.7 CODEX input, then \(S=S_{\mathrm{CODEX}}\) and \(\Sigma_{\mathrm{CODEX}}(V_{\mathrm{CODEX}}(C_{\mathrm{CODEX}}(S)))\in\mathbb R^4\) for non-empty retained input. The source identity itself remains to be proved rather than assumed.

The current discovery sequence is:

1. preserve the three recovered operational telic systems as distinct typed objects: the V6 three-term symbol-contraction score, the agent-population four-term score, and the sequence-based proposal-ranking score;
2. derive the exact random-frontier transition kernel from operator-level generation probabilities, candidate multiplicity, stable sorting, seeded tie selection, and the adjusted acceptance delta;
3. characterise the monotone raw-telic dynamics: equal-score cycles, strict local frontier maxima, terminal singleton stopping, and the conditions under which the finite sequence coordinate reaches an absorbing score level;
4. complete the duality-side mathematics by recovering \(\eta\), \(\varepsilon\), observer persistence, path-integral dynamics, and any feedback into proposal generation;
5. test whether any normalised sequence-energy or complexity variants exist and recover the origins of \(c_{I\Phi}=0.2\) and \(\lambda=0.618\);
6. repair the agent-engine mutual-information gap mathematically by locating any corrected implementation or source formula, while preserving the proof that the recovered operator is identically zero;
7. resolve the enlarged \(\Phi\)-family: active-state invariant density, weighted readiness, node density, connectedness, integration fidelity, entropy, agreement, spatial density, triplet homophily, and sequence coherence;
8. determine whether \(E_{\mathrm{energy}}\), \(E_{\mathrm{seq}}\), and \(E_{\mathrm{CFI}}\) are historical revisions, alternative objectives, or subsystem-specific dictionaries;
9. recover an operational definition of CFI and test whether the CFI/integration term can be evaluated independently of the energy-valued terms;
10. test whether the V6 \(+\beta\) reward shift was an intentional normalization and whether any absolute telic thresholds were designed around it;
11. locate an explicit source binding—or separating—the \(S,A,C,V,\Sigma\) of §3.5 from the CODEX chain of §3.7;
12. recover a state space and trajectory type for \(R_{\mathrm{reality}}(t)\), identify any downstream consumer of \(E(S,t)\), and only then derive or test a wider combination rule.

No candidate closure is privileged before those source and type questions are answered.

### 35.2 Bearing selection

Decide whether a general $\beta$ is required. If it is retained, define its distance or decision rule, eligibility set, tie handling, and unmatched-input behaviour. If it is not required operationally, retain it as optional design mathematics rather than deleting the Compass architecture.

### 35.3 Needle transition laws

Derive or test strain effects for Birth, Backfill, and Oppose, and specify receipt composition only when a transaction model exists.

### 35.4 Rich scientific-state system

Decide whether the richer $M$-tuple architecture is the target evolution of `research_state`. If yes, define the contradiction tensor, evidence polarity, freshness rates, gate semantics, and set-level update law. If not, preserve it as a historical candidate rather than presenting it as deployed.

### 35.5 Parameter calibration

Separate chosen design coefficients from derived or empirically calibrated values. No coefficient becomes a theorem merely because it appears in code.

### 35.6 Graph-geometric bridge discovery

Resolve the relationship between Jaccard overlap, path strain, and any Ollivier–Ricci curvature proposal without conflating distinct geometries.

## 36. Search discipline

\[
\boxed{
\text{Discover}
\to
\text{test}
\to
\text{integrate additively}
\to
\text{return to discovery}
}
\]

Workers return evidence and minimal proposed patches. They do not regenerate V3 or make architectural rulings.

The old Gap Hunting document is a historical investigation record. New work starts from this live discovery programme, while the full V2 mathematical body remains preserved above.

## 37. Restoration note

This restored V3 supersedes the pruned audit fork created during implementation-focused review. That fork is retained separately for audit history but is not mathematical authority.

The V2 body above is preserved in full. V3 additions are additive, and implementation findings are recorded as a separate axis rather than used as a pruning rule. The 14 July information, complexity, and telic-engine updates add the invariant-core retention identity, the mutual-information correction, the weighted-\(\Phi\) candidate, the V6 active-density complexity definition, the \( +\beta\) reward shift, the separation of telic complexity from the gzip/NCD coherence subsystem, two executable four-term telic systems, the proof that the recovered agent `MUTUAL_INFO` operator is identically zero, the agent-engine scale analysis, the stable Boltzmann policy, multiplicative coefficient evolution, the complete sequence-engine score with its coupling and piecewise complexity terms, the proof that its coherence is not Ollivier–Ricci curvature, the corrected geometric energy bound, the coherence-modulated telic-velocity definition, the four-operator proposal family, the corrected greedy-frontier selection law with adjusted Metropolis-shaped gating, the proof of raw telic non-decrease, the exact list-valued tie policy and random-frontier kernel boundary, the geometric temperature schedule, the quadratic marginal length cost, the bounded duality EMA, exact reversal invariance, and the mixed discrete--continuous process classification.
