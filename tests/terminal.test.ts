import test from "node:test";
import assert from "node:assert/strict";

import { createColorRegistry } from "../src/tokens/registry.js";
import { hearthTokens } from "../src/tokens/hearth.js";
import { resolveTokens } from "../src/tokens/resolver.js";

import { createTerminalPalette } from "../src/tokens/terminal.js";
import { createVSCodeTheme } from "../src/adapters/vscode/index.js";
import { createZedTheme } from "../src/adapters/zed/index.js";
import { createNeovimTheme } from "../src/adapters/neovim/index.js";

const theme = resolveTokens(hearthTokens, createColorRegistry());

test("all editors share the same background", () => {
  const vscode = createVSCodeTheme(theme);
  const zed = createZedTheme(theme);
  const neovim = createNeovimTheme(theme);

  assert.equal(vscode.colors["editor.background"], theme["editor.background"]);

  assert.equal(
    zed.themes[0].style["editor.background"],
    theme["editor.background"],
  );

  assert.ok(neovim.includes(theme["editor.background"]));
});

test("VS Code and Zed share ANSI colors", () => {
  const terminal = createTerminalPalette(theme);

  const vscode = createVSCodeTheme(theme);
  const zed = createZedTheme(theme);

  assert.equal(vscode.colors["terminal.ansiRed"], terminal.red);

  assert.equal(zed.themes[0].style["terminal.ansi.red"], terminal.red);
});

test("Neovim generates all 16 ANSI colors", () => {
  const lua = createNeovimTheme(theme);

  for (let index = 0; index < 16; index++) {
    assert.match(
      lua,
      new RegExp(`vim\\.g\\.terminal_color_${index} = "#[0-9a-f]{6}"`, "i"),
    );
  }
});
