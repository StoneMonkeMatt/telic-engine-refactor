# V3 O2 Compound Emergence — Audit Extract

   #### Generation \(O_2\): compound high-duality persistence

   In `Observer-Fix` and the downstream Compass lineage, the EMA duality remains, but the qualification signal is expanded into a six-term conjunction.

   Let

   \[
   \kappa_t
   =
   \frac{\#\{\text{kernel-token occurrences in }s_t\}}{|s_t|}
   \]

   be kernel purity. The invariant-leakage flag is

   \[
   L_t^{\mathrm{inv}}
   =
   \mathbf 1[\kappa_t<0.3].
   \]

   Let bridge activation be

   \[
   B_t
   =
   \frac{
   \#\{
   i:
   s_{t,i},s_{t,i+1}
   \text{ form a recognised cross-domain bridge}
   \}
   }{|s_t|-1}
   \]

   for \(|s_t|\ge2\), with \(B_t=0\) otherwise.

   Kernel divergence is

   \[
   \Delta\kappa_t=1-\kappa_t.
   \]

   The so-called consensus proxy is

   \[
   C_t^{\mathrm{proxy}}
   =
   T_q(s_t)
   \left(
   1-\frac{\Delta\kappa_t}{2}
   \right)
   =
   T_q(s_t)
   \left(
   \frac{1+\kappa_t}{2}
   \right).
   \]

   Let the observer-class token set in the active implementation be

   \[
   \mathcal O_{\mathrm{tok}}
   =
   \{\text{👁️},\text{🧠},\texttt{qualia},\text{🌟}\},
   \]

   and define occurrence count

   \[
   N_{\mathcal O}(s_t)
   =
   \sum_{x\in s_t}
   \mathbf 1[x\in\mathcal O_{\mathrm{tok}}].
   \]

   Repeated occurrences count separately.

   The current step predicate is

   \[
   \boxed{
   H_t
   =
   [\kappa_t\ge0.3]
   \land
   [|s_t|\ge8]
   \land
   [D_t^{(1)}\ge\theta_D]
   \land
   [B_t\ge0.15]
   \land
   [C_t^{\mathrm{proxy}}\ge50]
   \land
   [N_{\mathcal O}(s_t)\ge2].
   }
   \]

   For

   \[
   p_H
   =
   \max
   \left(
   1,
   \left\lfloor
   \texttt{highDualityPersistenceSteps}
   \right\rfloor
   \right),
   \]

   the counter is

   \[
   R_t
   =
   \begin{cases}
   R_{t-1}+1,&H_t=1,\\
   0,&H_t=0.
   \end{cases}
   \]

   The run-level declaration is

   \[
   \boxed{
   \mathcal H_t
   =
   \mathbf 1[R_t\ge p_H].
   }
   \]

   The first recorded `highDualityStep` is the final step of the first successful persistence window.

   This predicate is evaluated on the post-selection next state. A rejected proposal leaves the sequence unchanged, so the same stay-put state can accumulate consecutive passing steps.

   **Generation-\(O_2\) algorithm**

   ```text
   INPUT:
       post-selection sequence s
       smoothed duality D
       telic score T
       persistence length pH

   kernel_purity ← kernel-token count / sequence length
   invariant_pass ← kernel_purity ≥ 0.3

   length_pass ← length(s) ≥ 8
   duality_pass ← D ≥ configured threshold

   bridge_activation ← recognised cross-domain adjacent bridges / adjacency count
   bridge_pass ← bridge_activation ≥ 0.15

   kernel_divergence ← 1 - kernel_purity
   consensus_proxy ← T × (1 - kernel_divergence / 2)
   consensus_pass ← consensus_proxy ≥ 50

   observer_count ← occurrences of observer-class tokens
   observer_pass ← observer_count ≥ 2

   H ← invariant_pass
        AND length_pass
        AND duality_pass
        AND bridge_pass
        AND consensus_pass
        AND observer_pass

   if H:
       persistence_counter ← persistence_counter + 1
   else:
       persistence_counter ← 0

   if persistence_counter ≥ pH and declaration has not latched:
       high_duality_persistence ← true
       high_duality_step ← current step
   ```

## Closure receipt

The complete O2 equation set and executable algorithm are present above.
