type RGB = `rgb(${number}, ${number}, ${number})`;
type ColorVar = `var(--${string}-${string}-colour)` | `var(--${string}-${string}-colour-highlight)`;
type Transparent = "transparent"

export type Color = RGB | ColorVar | Transparent
export type ColorPair = {background: Color, text: Color};

export const DEFAULT_COLORS: ColorPair = {
  background: "var(--primary-background-colour)",
  text: "var(--primary-text-colour)",
};