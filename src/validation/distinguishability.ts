import type { ResolvedTheme, SemanticRole } from "../tokens/type.js";
import { oklabDistance } from "./difference.js";
import type { ValidationIssue } from "./types.js";

const IMPORTANT_PAIRS = [
  ["syntax.keyword", "syntax.function"],
  ["syntax.function", "syntax.type"],
  ["syntax.string", "syntax.number"],
  ["diagnostic.error", "syntax.keyword"],
] as const satisfies readonly (readonly [SemanticRole, SemanticRole])[];

export function validateDistinguishability(
  theme: ResolvedTheme,
  threshold: number = 0.06,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const [first, second] of IMPORTANT_PAIRS) {
    const distance = oklabDistance(theme[first], theme[second]);

    if (distance < threshold) {
      issues.push({
        severity: "warning",
        code: "SIMILAR_COLORS",
        message:
          `${first} and ${second} may be difficult ` +
          `to distinguish (distance: ${distance.toFixed(3)})`,
        tokens: [first, second],
        actual: distance,
        expected: threshold,
      });
    }
  }

  return issues;
}
