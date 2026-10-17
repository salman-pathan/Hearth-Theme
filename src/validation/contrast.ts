import { getContrast } from "../core/contrast.js";
import type { SemanticRole } from "../tokens/type.js";
import type { ValidationIssue } from "./types.js";

const TEXT_ROLES = [
  "editor.foreground",
  "ui.foreground",
  "ui.foregroundMuted",
  "syntax.keyword",
  "syntax.function",
  "syntax.method",
  "syntax.type",
  "syntax.string",
  "syntax.number",
  "syntax.comment",
  "syntax.variable",
  "syntax.parameter",
  "syntax.property",
  "syntax.namespace",
  "diagnostic.error",
  "diagnostic.warning",
  "diagnostic.info",
  "diagnostic.success",
] as const satisfies readonly SemanticRole[];

export function validateContrast(
  theme: Partial<Record<SemanticRole, string>>,
  minimum = 4.5,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const background = theme["editor.background"];

  if (!background) {
    return [
      {
        severity: "error",
        code: "MISSING_BACKGROUND",
        message: "Cannot validate contrast without editor.background",
        tokens: ["editor.background"],
      },
    ];
  }

  for (const role of TEXT_ROLES) {
    const foreground = theme[role];

    if (!foreground) {
      issues.push({
        severity: "error",
        code: "MISSING_COLOR",
        message: `Missing color for ${role}`,
        tokens: [role],
      });

      continue;
    }

    const ratio = getContrast(foreground, background);

    if (ratio < minimum) {
      issues.push({
        severity: "error",
        code: "LOW_CONTRAST",
        message:
          `${role} has contrast ${ratio.toFixed(2)}:1; ` +
          `minimum is ${minimum}:1`,
        tokens: [role, "editor.background"],
        actual: ratio,
        expected: minimum,
      });
    }
  }

  return issues;
}
