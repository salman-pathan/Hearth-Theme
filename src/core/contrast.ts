import Color from "colorjs.io";

export function getContrast(foreground: string, background: string): number {
  const fg = new Color(foreground);
  const bg = new Color(background);

  return fg.contrast(bg, "WCAG21");
}

export function getOklch(hex: string) {
  const color = new Color(hex);
  const [lightness, chroma, hue] = color.to("oklch").coords;

  return { lightness, chroma, hue };
}
