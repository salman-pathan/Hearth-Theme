import test from "node:test";
import assert from "node:assert/strict";

import { createZedTheme } from "../src/adapters/zed/index.js";
import { createColorRegistry } from "../src/tokens/registry.js";
import { hearthTokens } from "../src/tokens/hearth.js";
import { resolveTokens } from "../src/tokens/resolver.js";

const theme = resolveTokens(hearthTokens, createColorRegistry());

test("generates a Zed theme family", () => {
  const result = createZedTheme(theme);

  assert.equal(result.name, "Hearth");
  assert.equal(result.themes.length, 1);
  assert.equal(result.themes[0].appearance, "dark");
});

test("uses semantic tokens for editor colors", () => {
  const result = createZedTheme(theme);
  const style = result.themes[0].style;

  assert.equal(style["editor.background"], theme["editor.background"]);

  assert.equal(style["editor.foreground"], theme["editor.foreground"]);
});

test("maps syntax highlighting correctly", () => {
  const result = createZedTheme(theme);
  const syntax = result.themes[0].style.syntax;

  assert.equal(syntax.keyword.color, theme["syntax.keyword"]);

  assert.equal(syntax.string.color, theme["syntax.string"]);

  assert.equal(syntax.comment.color, theme["syntax.comment"]);
});

test("produces serializable JSON", () => {
  const result = createZedTheme(theme);

  assert.doesNotThrow(() => {
    JSON.parse(JSON.stringify(result));
  });
});
