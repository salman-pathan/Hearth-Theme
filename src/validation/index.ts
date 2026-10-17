import type { ColorRegistry } from "../tokens/registry.js";
import type { ResolvedTheme } from "../tokens/type.js";
import { validateCompleteness } from "./completeness.js";
import { validateContrast } from "./contrast.js";
import { validateDistinguishability } from "./distinguishability.js";
import { validateGamut } from "./gamut.js";
import type { ValidationReport } from "./types.js";

export function validateTheme(
  theme: ResolvedTheme,
  registry: ColorRegistry,
): ValidationReport {
  const issues = [
    ...validateCompleteness(theme),
    ...validateContrast(theme),
    ...validateDistinguishability(theme),
    ...validateGamut(registry),
  ];

  return {
    valid: !issues.some((issue) => issue.severity === "error"),
    issues,
  };
}
