import { hearth } from "./palettes/index.js";
import { toHex } from "./core/color.js";
import { getContrast, getOklch } from "./core/contrast.js";
import { amberRamp } from "./palettes/ramp.js";

const background = toHex(hearth.colors.background);

console.log(`\n${hearth.name} Palette Report`);
console.log("=".repeat(75));

for (const [role, color] of Object.entries(hearth.colors)) {
  const hex = toHex(color);
  const contrast = getContrast(hex, background);
  const oklch = getOklch(hex);

  console.log(
    `${role.padEnd(12)} ${hex} ` +
      `Contrast: ${contrast.toFixed(2)} ` +
      `L: ${oklch.lightness?.toFixed(3)} ` +
      `C: ${oklch.chroma?.toFixed(3)} ` +
      `H: ${oklch.hue?.toFixed(1)}`,
  );
}

console.log("\nHearth - Amber Ramp");
console.log("=".repeat(55));

for (const [stop, color] of Object.entries(amberRamp)) {
  console.log(
    `${stop.padEnd(5)} ` +
      `${toHex(color)} ` +
      `L=${color.l.toFixed(3)} ` +
      `C=${color.c.toFixed(3)} ` +
      `H=${color.h.toFixed(1)}`,
  );
}
