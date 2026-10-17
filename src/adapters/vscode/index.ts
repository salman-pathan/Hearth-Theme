import type { ResolvedTheme } from "../../tokens/type.js";
import { createTerminalPalette } from "../../tokens/terminal.js";

interface TextMateRule {
  name: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

export interface VSCodeTheme {
  name: string;
  type: "dark" | "light";
  semanticHighlighting: boolean;
  colors: Record<string, string>;
  tokenColors: TextMateRule[];
  semanticTokenColors: Record<string, string>;
}

export function createVSCodeTheme(theme: ResolvedTheme): VSCodeTheme {
  const terminal = createTerminalPalette(theme);
  return {
    name: "Hearth",
    type: "dark",
    semanticHighlighting: true,

    colors: {
      "editor.background": theme["editor.background"],
      "editor.foreground": theme["editor.foreground"],
      "editor.selectionBackground": theme["editor.selection"],
      "editor.lineHighlightBackground": theme["editor.lineHighlight"],

      "editorCursor.foreground": theme["ui.cursor"],
      "editorLineNumber.foreground": theme["ui.foregroundMuted"],
      "editorLineNumber.activeForeground": theme["editor.foreground"],

      "editorError.foreground": theme["diagnostic.error"],
      "editorWarning.foreground": theme["diagnostic.warning"],

      "sideBar.background": theme["ui.background"],
      "sideBar.foreground": theme["ui.foreground"],

      "activityBar.background": theme["ui.surface"],
      "activityBar.foreground": theme["ui.foreground"],

      "statusBar.background": theme["ui.surface"],
      "statusBar.foreground": theme["ui.foreground"],

      "titleBar.activeBackground": theme["ui.background"],
      "titleBar.activeForeground": theme["ui.foreground"],

      "editorGroupHeader.tabsBackground": theme["ui.surface"],

      "tab.activeBackground": theme["editor.background"],
      "tab.inactiveBackground": theme["ui.surface"],
      "tab.activeForeground": theme["ui.foreground"],
      "tab.inactiveForeground": theme["ui.foregroundMuted"],

      "panel.background": theme["ui.background"],
      "panel.border": theme["ui.border"],

      "input.background": theme["ui.surface"],
      "input.foreground": theme["ui.foreground"],

      "list.activeSelectionBackground": theme["ui.surfaceElevated"],
      "list.activeSelectionForeground": theme["ui.foreground"],
      "list.hoverBackground": theme["ui.surface"],
      focusBorder: theme["ui.focus"],

      "terminal.ansiBlack": terminal.black,
      "terminal.ansiRed": terminal.red,
      "terminal.ansiGreen": terminal.green,
      "terminal.ansiYellow": terminal.yellow,
      "terminal.ansiBlue": terminal.blue,
      "terminal.ansiMagenta": terminal.magenta,
      "terminal.ansiCyan": terminal.cyan,
      "terminal.ansiWhite": terminal.white,

      "terminal.ansiBrightBlack": terminal.brightBlack,
      "terminal.ansiBrightRed": terminal.brightRed,
      "terminal.ansiBrightGreen": terminal.brightGreen,
      "terminal.ansiBrightYellow": terminal.brightYellow,
      "terminal.ansiBrightBlue": terminal.brightBlue,
      "terminal.ansiBrightMagenta": terminal.brightMagenta,
      "terminal.ansiBrightCyan": terminal.brightCyan,
      "terminal.ansiBrightWhite": terminal.brightWhite,

      "terminal.background": terminal.background,
      "terminal.foreground": terminal.foreground,
      "terminalCursor.foreground": terminal.cursor,
      "terminal.selectionBackground": terminal.selection,
    },

    tokenColors: [
      {
        name: "Keywords",
        scope: ["keyword", "storage.type", "storage.modifier"],
        settings: {
          foreground: theme["syntax.keyword"],
        },
      },
      {
        name: "Functions",
        scope: ["entity.name.function", "support.function"],
        settings: {
          foreground: theme["syntax.function"],
        },
      },
      {
        name: "Types",
        scope: ["entity.name.type", "entity.name.class", "support.type"],
        settings: {
          foreground: theme["syntax.type"],
        },
      },
      {
        name: "Strings",
        scope: ["string"],
        settings: {
          foreground: theme["syntax.string"],
        },
      },
      {
        name: "Numbers",
        scope: ["constant.numeric"],
        settings: {
          foreground: theme["syntax.number"],
        },
      },
      {
        name: "Comments",
        scope: ["comment"],
        settings: {
          foreground: theme["syntax.comment"],
          fontStyle: "italic",
        },
      },
      {
        name: "Variables and parameters",
        scope: ["variable.other", "variable.parameter"],
        settings: {
          foreground: theme["editor.foreground"],
        },
      },
      {
        name: "Properties",
        scope: ["variable.other.property", "support.variable.property"],
        settings: {
          foreground: theme["editor.foreground"],
        },
      },
      {
        name: "Namespaces",
        scope: ["entity.name.namespace"],
        settings: {
          foreground: theme["syntax.type"],
        },
      },
      {
        name: "Constants",
        scope: ["constant.language", "constant.character"],
        settings: {
          foreground: theme["syntax.number"],
        },
      },
      {
        name: "Operators",
        scope: ["keyword.operator"],
        settings: {
          foreground: theme["editor.foreground"],
        },
      },
    ],

    semanticTokenColors: {
      // Functions and callable symbols
      function: theme["syntax.function"],
      method: theme["syntax.method"],

      // Type declarations
      class: theme["syntax.type"],
      interface: theme["syntax.type"],
      struct: theme["syntax.type"],
      enum: theme["syntax.type"],
      type: theme["syntax.type"],
      typeParameter: theme["syntax.type"],

      // Variables and members
      variable: theme["syntax.variable"],
      parameter: theme["syntax.parameter"],
      property: theme["syntax.property"],
      enumMember: theme["syntax.number"],

      // Language constructs
      namespace: theme["syntax.namespace"],
      keyword: theme["syntax.keyword"],

      // Literals
      string: theme["syntax.string"],
      number: theme["syntax.number"],

      // Comments
      comment: theme["syntax.comment"],
    },
  };
}
