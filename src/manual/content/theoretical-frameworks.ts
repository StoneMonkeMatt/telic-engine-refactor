
/**
 * Theoretical layers for the Five-Layer Pyramid.
 */
export const PYRAMID_LAYERS = [
  { label: 'Verification', color: 'bg-cyan-500 text-ocean-950 shadow-[0_0_30px_rgba(34,211,238,0.3)]' },
  { label: 'Measurement', color: 'bg-cyan-600 text-white' },
  { label: 'Information', color: 'bg-ocean-800 text-white/80' },
  { label: 'Systems', color: 'bg-ocean-900 text-white/60' },
  { label: 'Reality', color: 'bg-ocean-950 text-white/40 border border-white/5' },
];

/**
 * Speculative formalisms and their descriptions.
 */
export const SPECULATIVE_FORMALISMS = [
  {
    title: "Reverse Evolution Path Integral",
    formula: "P(S₀|Sₜ) ∝ Σ exp(Σ T(Sᵢ))",
    description: "A theoretical method for inferring past states from current observations by weighting paths according to telic utility."
  },
  {
    title: "Telic Curvature Bridge",
    formula: "κ_telic = κ_Ollivier (1 + λΔT)",
    description: "A formulation linking system geometry with telic gradients, currently used as a descriptive overlay for curvature κ."
  }
];
