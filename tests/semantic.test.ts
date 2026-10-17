import test from "node:test";
import assert from "node:assert/strict";

import { semanticRoles } from "../src/tokens/type.js";
import { hearthTokens } from "../src/tokens/hearth.js";
import { createColorRegistry } from "../src/tokens/registry.js";
import { resolveTokens } from "../src/tokens/resolver.js";

test("all semantic roles have definitions", () => {
  assert.deepEqual(Object.keys(hearthTokens).sort(), [...semanticRoles].sort());
});

test("all semantic references resolve", () => {
  const registry = createColorRegistry();

  for (const reference of Object.values(hearthTokens)) {
    assert.ok(registry[reference], `Missing primitive color: ${reference}`);
  }
});

test("UI cursor and syntax function are independent roles", () => {
  assert.ok("ui.cursor" in hearthTokens);
  assert.ok("syntax.function" in hearthTokens);

  const theme = resolveTokens(hearthTokens, createColorRegistry());

  assert.match(theme["ui.cursor"], /^#[0-9a-f]{6}$/i);
  assert.match(theme["syntax.function"], /^#[0-9a-f]{6}$/i);
});
