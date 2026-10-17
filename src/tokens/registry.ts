import type { OklchColor } from "../core/color.js";
import {
  amberRamp,
  sageRamp,
  plumRamp,
  stoneRamp,
  neutralRamp,
  coralRamp,
} from "../palettes/ramp.js";

export type ColorRegistry = Record<string, OklchColor>;

export function createColorRegistry(): ColorRegistry {
  const registry: ColorRegistry = {};

  const ramps = {
    amber: amberRamp,
    sage: sageRamp,
    plum: plumRamp,
    stone: stoneRamp,
    neutral: neutralRamp,
    coral: coralRamp,
  };

  for (const [family, ramp] of Object.entries(ramps)) {
    for (const [stop, color] of Object.entries(ramp)) {
      registry[`${family}.${stop}`] = color;
    }
  }

  return registry;
}
