import type { ResolvedTheme } from "../../tokens/type.js";
import { createTerminalPalette } from "../../tokens/terminal.js";

type HighlightStyle = {
  fg?: string;
  bg?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  undercurl?: boolean;
  sp?: string;
  link?: string;
};

type HighlightMap = Record<string, HighlightStyle>;

export function createNeovimHighlights(theme: ResolvedTheme): HighlightMap {
  const t = theme;

  return {
    // Neo-tree file explorer
    NeoTreeNormal: {
      fg: t["ui.foreground"],
      bg: t["ui.background"],
    },
    NeoTreeNormalNC: {
      fg: t["ui.foreground"],
      bg: t["ui.background"],
    },
    NeoTreeEndOfBuffer: {
      fg: t["ui.background"],
      bg: t["ui.background"],
    },
    NeoTreeWinSeparator: {
      fg: t["ui.border"],
      bg: t["ui.background"],
    },

    NeoTreeDirectoryName: {
      fg: t["ui.foreground"],
    },
    NeoTreeDirectoryIcon: {
      fg: t["syntax.type"],
    },
    NeoTreeRootName: {
      fg: t["syntax.function"],
      bold: true,
    },
    NeoTreeFileName: {
      fg: t["ui.foreground"],
    },
    NeoTreeFileNameOpened: {
      fg: t["syntax.function"],
      bold: true,
    },

    NeoTreeGitAdded: {
      fg: t["diagnostic.success"],
    },
    NeoTreeGitModified: {
      fg: t["diagnostic.warning"],
    },
    NeoTreeGitDeleted: {
      fg: t["diagnostic.error"],
    },
    NeoTreeGitUntracked: {
      fg: t["diagnostic.info"],
    },
    NeoTreeGitIgnored: {
      fg: t["ui.foregroundMuted"],
    },

    NeoTreeDimText: {
      fg: t["ui.foregroundMuted"],
    },
    NeoTreeIndentMarker: {
      fg: t["ui.border"],
    },
    NeoTreeExpander: {
      fg: t["ui.foregroundMuted"],
    },
    NeoTreeCursorLine: {
      bg: t["ui.surface"],
    },

    SignColumn: {
      fg: t["ui.foregroundMuted"],
      bg: t["editor.background"],
    },
    FoldColumn: {
      fg: t["ui.foregroundMuted"],
      bg: t["editor.background"],
    },
    EndOfBuffer: {
      fg: t["editor.background"],
      bg: t["editor.background"],
    },
    Directory: {
      fg: t["syntax.type"],
    },
    NonText: {
      fg: t["ui.foregroundMuted"],
    },
    CursorLineSign: {
      bg: t["editor.lineHighlight"],
    },

    // Editor UI
    Normal: {
      fg: t["editor.foreground"],
      bg: t["editor.background"],
    },
    NormalNC: {
      fg: t["editor.foreground"],
      bg: t["editor.background"],
    },
    NormalFloat: {
      fg: t["ui.foreground"],
      bg: t["ui.surfaceElevated"],
    },
    FloatBorder: {
      fg: t["ui.border"],
      bg: t["ui.surfaceElevated"],
    },
    CursorLine: {
      bg: t["editor.lineHighlight"],
    },
    CursorLineNr: {
      fg: t["ui.focus"],
      bold: true,
    },
    LineNr: {
      fg: t["ui.foregroundMuted"],
    },
    Visual: {
      bg: t["editor.selection"],
    },
    Search: {
      fg: t["editor.background"],
      bg: t["ui.focus"],
    },
    IncSearch: {
      fg: t["editor.background"],
      bg: t["ui.cursor"],
    },
    Pmenu: {
      fg: t["ui.foreground"],
      bg: t["ui.surface"],
    },
    PmenuSel: {
      fg: t["ui.foreground"],
      bg: t["ui.surfaceElevated"],
    },
    StatusLine: {
      fg: t["ui.foreground"],
      bg: t["ui.surface"],
    },
    StatusLineNC: {
      fg: t["ui.foregroundMuted"],
      bg: t["ui.surface"],
    },
    WinSeparator: {
      fg: t["ui.border"],
    },
    Comment: {
      fg: t["syntax.comment"],
      italic: true,
    },

    // Traditional syntax groups
    Keyword: { fg: t["syntax.keyword"] },
    Statement: { fg: t["syntax.keyword"] },
    Conditional: { fg: t["syntax.keyword"] },
    Repeat: { fg: t["syntax.keyword"] },
    Function: { fg: t["syntax.function"] },
    Type: { fg: t["syntax.type"] },
    Structure: { fg: t["syntax.type"] },
    String: { fg: t["syntax.string"] },
    Number: { fg: t["syntax.number"] },
    Boolean: { fg: t["syntax.number"] },
    Identifier: { fg: t["syntax.variable"] },
    Constant: { fg: t["syntax.number"] },

    // Tree-sitter captures
    "@keyword": { link: "Keyword" },
    "@keyword.function": { link: "Keyword" },
    "@function": { link: "Function" },
    "@function.call": { link: "Function" },
    "@function.method": { fg: t["syntax.method"] },
    "@function.method.call": { fg: t["syntax.method"] },
    "@type": { link: "Type" },
    "@type.builtin": { link: "Type" },
    "@string": { link: "String" },
    "@number": { link: "Number" },
    "@boolean": { link: "Boolean" },
    "@comment": { link: "Comment" },
    "@variable": { fg: t["syntax.variable"] },
    "@variable.parameter": { fg: t["syntax.parameter"] },
    "@variable.member": { fg: t["syntax.property"] },
    "@module": { fg: t["syntax.namespace"] },

    // LSP semantic tokens
    "@lsp.type.function": { link: "Function" },
    "@lsp.type.method": { fg: t["syntax.method"] },
    "@lsp.type.class": { link: "Type" },
    "@lsp.type.interface": { link: "Type" },
    "@lsp.type.struct": { link: "Type" },
    "@lsp.type.enum": { link: "Type" },
    "@lsp.type.typeParameter": { link: "Type" },
    "@lsp.type.parameter": { fg: t["syntax.parameter"] },
    "@lsp.type.property": { fg: t["syntax.property"] },
    "@lsp.type.variable": { fg: t["syntax.variable"] },
    "@lsp.type.namespace": { fg: t["syntax.namespace"] },

    // Diagnostics
    DiagnosticError: { fg: t["diagnostic.error"] },
    DiagnosticWarn: { fg: t["diagnostic.warning"] },
    DiagnosticInfo: { fg: t["diagnostic.info"] },
    DiagnosticHint: { fg: t["diagnostic.success"] },
    DiagnosticUnderlineError: {
      undercurl: true,
      sp: t["diagnostic.error"],
    },
    DiagnosticUnderlineWarn: {
      undercurl: true,
      sp: t["diagnostic.warning"],
    },
  };
}

function toLuaValue(value: unknown): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value).map(
      ([key, item]) => `[${JSON.stringify(key)}] = ${toLuaValue(item)}`,
    );

    return `{ ${entries.join(", ")} }`;
  }

  throw new Error(`Unsupported Lua value: ${String(value)}`);
}

export function createNeovimTheme(theme: ResolvedTheme): string {
  const highlights = createNeovimHighlights(theme);
  const terminal = createTerminalPalette(theme);

  const ansi = [
    terminal.black,
    terminal.red,
    terminal.green,
    terminal.yellow,
    terminal.blue,
    terminal.magenta,
    terminal.cyan,
    terminal.white,
    terminal.brightBlack,
    terminal.brightRed,
    terminal.brightGreen,
    terminal.brightYellow,
    terminal.brightBlue,
    terminal.brightMagenta,
    terminal.brightCyan,
    terminal.brightWhite,
  ];

  const terminalAssignments = ansi
    .map(
      (color, index) =>
        `  vim.g.terminal_color_${index} = ${JSON.stringify(color)}`,
    )
    .join("\n");

  return `-- Generated by Hearth Theme. Do not edit manually.
local M = {}

local highlights = ${toLuaValue(highlights)}

function M.setup()
  vim.o.termguicolors = true
  vim.o.background = "dark"

${terminalAssignments}

  for group, style in pairs(highlights) do
    vim.api.nvim_set_hl(0, group, style)
  end
end

return M
`;
}
