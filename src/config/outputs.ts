import type { ResolvedTheme } from "../tokens/type.js";
import { createVSCodeTheme } from "../adapters/vscode/index.js";
import { createZedTheme } from "../adapters/zed/index.js";
import { createNeovimTheme } from "../adapters/neovim/index.js";

interface ThemeOutputDefinition {
  path: string;
  generate: (theme: ResolvedTheme) => string;
}

function json(data: unknown): string {
  return JSON.stringify(data, null, 2) + "\n";
}

export const themeOutputs = [
  {
    path: "extensions/vscode/themes/hearth-color-theme.json",
    generate: (theme) => json(createVSCodeTheme(theme)),
  },
  {
    path: "extensions/zed/themes/hearth.json",
    generate: (theme) => json(createZedTheme(theme)),
  },
  {
    path: "extensions/neovim/lua/hearth/theme.lua",
    generate: (theme) => createNeovimTheme(theme),
  },
  {
    path: "generated/hearth.json",
    generate: (theme) => json(theme),
  },
] as const satisfies readonly ThemeOutputDefinition[];
