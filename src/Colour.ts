type RGB = `rgb(${number}, ${number}, ${number})`;
type ColorVar = `var(--${string}-${string}-colour)`;


export type Color = RGB | ColorVar