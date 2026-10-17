import Color from "colorjs.io";

export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

export function fromHex(hex: string): OklchColor {
  const color = new Color(hex).to("oklch");
  const [l, c, h] = color.coords;

  if (l === null || c === null || !Number.isFinite(l) || !Number.isFinite(c)) {
    throw new Error(`Invalid OKLCH coordinates for ${hex}`);
  }

  const hue = h === null || !Number.isFinite(h) ? 0 : h;
  return { l, c, h: hue };
}

export function toHex(value: OklchColor): string {
  const color = new Color("oklch", [value.l, value.c, value.h]);

  const srgb = color
    .toGamut({
      space: "srgb",
      method: "oklch.c",
    })
    .to("srgb");

  return srgb.toString({
    format: "hex",
    collapse: false,
  });
}

export function withLightness(
  color: OklchColor,
  lightness: number,
): OklchColor {
  if (lightness < 0 || lightness > 1) {
    throw new RangeError("Lightness must be between 0 and 1");
  }

  return { ...color, l: lightness };
}

export function withChroma(color: OklchColor, chroma: number): OklchColor {
  if (!Number.isFinite(chroma) || chroma < 0) {
    throw new RangeError("Chroma must be a finite, non-negative number");
  }

  return { ...color, c: chroma };
}
