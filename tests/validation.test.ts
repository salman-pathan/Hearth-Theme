import test from "node:test";
import assert from "node:assert/strict";

import { oklabDistance } from "../src/validation/difference.js";
import { validateCompleteness } from "../src/validation/completeness.js";
import { validateContrast } from "../src/validation/contrast.js";

import { createColorRegistry } from "../src/tokens/registry.js";
import { hearthTokens } from "../src/tokens/hearth.js";
import { resolveTokens } from "../src/tokens/resolver.js";

test("identical colors have zero distance", () => {
  assert.equal(oklabDistance("#A6B68A", "#A6B68A"), 0);
});

test("detects missing semantic tokens", () => {
  const issues = validateCompleteness({
    "editor.background": "#211F1B",
  });

  assert.ok(issues.some((issue) => issue.code === "MISSING_TOKEN"));
});

test("detects low contrast", () => {
  const registry = createColorRegistry();

  const validTheme = resolveTokens(hearthTokens, registry);

  const theme = {
    ...validTheme,
    "editor.foreground": "#292929",
  };

  const issues = validateContrast(theme);

  assert.ok(
    issues.some(
      (issue) =>
        issue.code === "LOW_CONTRAST" &&
        issue.tokens.includes("editor.foreground"),
    ),
  );
});

test("reports missing colors without throwing", () => {
  const issues = validateContrast({
    "editor.background": "#211F1B",
  });

  assert.ok(
    issues.some(
      (issue) =>
        issue.code === "MISSING_COLOR" &&
        issue.tokens.includes("syntax.function"),
    ),
  );
});
