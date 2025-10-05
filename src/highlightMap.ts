// interface ColorDict {
//   [key: Color]: Color;
// };

import type { Color } from "./Colour"

export const highlightMap: Record<Color, Color> = {
  "var(--primary-accent-colour)": "var(--primary-accent-colour-highlight)",
  "var(--secondary-accent-colour)": "var(--secondary-accent-colour-highlight)",
  "var(--tertiary-accent-colour)": "var(--tertiary-accent-colour-highlight)",
  "var(--primary-background-colour)": "var(--primary-accent-colour-highlight)",
  transparent: "transparent"
};