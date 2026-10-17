import { semanticRoles } from "../tokens/type.js";
import type { ValidationIssue } from "./types.js";

export function validateCompleteness(
  theme: Record<string, string>,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const role of semanticRoles) {
    if (!Object.hasOwn(theme, role)) {
      issues.push({
        severity: "error",
        code: "MISSING_TOKEN",
        message: "Missing semantic token: ${role}",
        tokens: [role],
      });
    }
  }

  return issues;
}
