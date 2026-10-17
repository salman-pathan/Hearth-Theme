import test from "node:test";
import assert from "node:assert/strict";

import { createColorRegistry } from "../src/tokens/registry.js";
import { hearthTokens } from "../src/tokens/hearth.js";
import { resolveTokens } from "../src/tokens/resolver.js";
import { createVSCodeTheme } from "../src/adapters/vscode/index.js";

test("generates a valid VS Code theme structure", () => {
  const registry = createColorRegistry();
  const resolved = resolveTokens(hearthTokens, registry);

  const vscodeTheme = createVSCodeTheme(resolved);

  assert.equal(vscodeTheme.name, "Hearth");
  assert.equal(vscodeTheme.type, "dark");
  assert.equal(vscodeTheme.semanticHighlighting, true);

  assert.equal(
    vscodeTheme.colors["editor.background"],
    resolved["editor.background"],
  );

  assert.ok(vscodeTheme.tokenColors.length > 0);
  assert.ok(Object.keys(vscodeTheme.semanticTokenColors).length > 0);
});
