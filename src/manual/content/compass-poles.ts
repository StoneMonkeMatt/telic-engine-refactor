import { CompassPole } from "../manual.types";

/**
 * The 7 canonical poles of the Compass navigational ontology.
 */
export const COMPASS_POLES: CompassPole[] = [
  { pole: 'North', name: 'Eternal_Banquet', symbols: ["🐋", "🌿", "⚓"], mod97: 28 },
  { pole: 'East', name: 'Lion_at_the_Helm', symbols: ["🦁", "🐱", "🐋", "⚓"], mod97: 17 },
  { pole: 'South', name: 'Whispers_and_Waves', symbols: ["🦜", "🐋", "🌊", "⚓", "🌿", "🏮", "⛓️"], mod97: 32 },
  { pole: 'West', name: 'Skulls_o_Bravery', symbols: ["💀", "🌩️", "🕯️", "🐋", "🦁"], mod97: 48 },
  { pole: 'Center', name: 'Gale_of_the_Nexus', symbols: ["🌪️", "🐋", "🌿", "🦁", "🎯"], mod97: 48 },
  { pole: 'Zenith', name: 'Flame_of_Abandonment', symbols: ["🔥", "🧹", "🧭"], mod97: 84 },
  { pole: 'Nadir', name: 'Diamond_of_Surprise', symbols: ["💠", "⚡", "🧘"], mod97: 93 }
];
