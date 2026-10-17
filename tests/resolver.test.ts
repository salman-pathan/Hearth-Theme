import test from "node:test";
import { createColorRegistry } from "../src/tokens/registry.js";
import { resolveTokens } from "../src/tokens/resolver.js";
import { hearthTokens } from "../src/tokens/hearth.js";
import assert from "node:assert/strict";
import { semanticRoles } from "../src/tokens/type.js";

test("resolve all Hearth semantic roles", () => {
  const registry = createColorRegistry();
  const resolved = resolveTokens(hearthTokens, registry);

  assert.equal(Object.keys(resolved).length, semanticRoles.length);

  for (const role of semanticRoles) {
    assert.match(resolved[role], /^#[0-9a-f]{6}$/i);
  }
});

test("rejects unknown color references", () => {
  const definitions = {
    ...hearthTokens,
    "syntax.function": "unknown.999",
  };

  assert.throws(
    () => resolveTokens(definitions, createColorRegistry()),
    /Unknown color reference/,
  );
});
