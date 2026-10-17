import type { OklchColor } from "./color.js";

export interface RampStop {
  name: string;
  lightness: number;
  chroma: number;
}

export interface RampDefinition {
  hue: number;
  stops: readonly RampStop[];
}

export type ColorRamp = Record<string, OklchColor>;

export function generateRamp(definition: RampDefinition): ColorRamp {
  const result: ColorRamp = {};

  for (const stop of definition.stops) {
    if (
      !Number.isFinite(stop.lightness) ||
      stop.lightness < 0 ||
      stop.lightness > 1
    ) {
      throw new RangeError(`Invalid lightness for stop ${stop.name}`);
    }

    if (!Number.isFinite(stop.chroma) || stop.chroma < 0) {
      throw new RangeError(`Invalid chroma for stop ${stop.name}`);
    }

    result[stop.name] = {
      l: stop.lightness,
      c: stop.chroma,
      h: definition.hue,
    };
  }
  return result;
}
