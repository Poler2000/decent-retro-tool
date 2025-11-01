import type { ColorPair } from "./Colour";

const colorSequence: ColorPair[] = [
  {background: "var(--primary-accent-colour)", text: "var(--primary-text-colour)"},
  {background: "var(--secondary-accent-colour)", text: "var(--primary-text-colour)"},
  {background: "var(--tertiary-accent-colour)", text: "var(--primary-text-colour)"},
]

export const getColorPair = (index: number): ColorPair => {
  return colorSequence[index % colorSequence.length];
}