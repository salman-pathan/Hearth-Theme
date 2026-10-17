import Color from "colorjs.io";
import type { ColorRegistry } from "../tokens/registry.js";
import type { ValidationIssue } from "./types.js";

export function validateGamut(registry: ColorRegistry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const [name, value] of Object.entries(registry)) {
    const color = new Color("oklch", [value.l, value.c, value.h]);

    if (!color.inGamut("srgb")) {
      issues.push({
        severity: "warning",
        code: "OUT_OF_GAMUT",
        message: `${name} cannot be represented exactly in sRGB`,
        tokens: [name],
      });
    }
  }

  return issues;
}
