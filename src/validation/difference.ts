import Color from "colorjs.io";

export function oklabDistance(first: string, second: string): number {
  const a = new Color(first).to("oklab").coords;
  const b = new Color(second).to("oklab").coords;

  if (
    a.some((v) => v === null || !Number.isFinite(v)) ||
    b.some((v) => v === null || !Number.isFinite(v))
  ) {
    throw new Error("Invalid OKLab coordinates");
  }

  const [l1, a1, b1] = a as number[];
  const [l2, a2, b2] = b as number[];

  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}
