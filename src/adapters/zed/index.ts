import type { ResolvedTheme } from "../../tokens/type.js";
import { createTerminalPalette } from "../../tokens/terminal.js";

type ZedSyntaxStyle = {
  color: string;
  font_style?: "normal" | "italic";
  font_weight?: number;
};

type ZedTheme = {
  name: string;
  appearance: "dark" | "light";
  style: Record<string, unknown> & {
    syntax: Record<string, ZedSyntaxStyle>;
  };
};

type ZedThemeFamily = {
  $schema: string;
  name: string;
  author: string;
  themes: ZedTheme[];
};

export function createZedTheme(theme: ResolvedTheme): ZedThemeFamily {
  const syntaxColor = (color: string): ZedSyntaxStyle => ({
    color,
  });

  const terminal = createTerminalPalette(theme);

  return {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Hearth",
    author: "Hearth Theme Contributors",
    themes: [
      {
        name: "Hearth",
        appearance: "dark",
        style: {
          // Main UI
          background: theme["ui.background"],
          foreground: theme["ui.foreground"],
          accent: theme["ui.focus"],

          border: theme["ui.border"],
          "border.focused": theme["ui.focus"],

          "surface.background": theme["ui.surface"],
          "elevated_surface.background": theme["ui.surfaceElevated"],

          "element.background": theme["ui.surface"],
          "element.hover": theme["ui.surfaceElevated"],
          "element.selected": theme["editor.selection"],

          text: theme["ui.foreground"],
          "text.muted": theme["ui.foregroundMuted"],
          "text.accent": theme["ui.focus"],

          // Editor
          "editor.background": theme["editor.background"],
          "editor.foreground": theme["editor.foreground"],
          "editor.gutter.background": theme["editor.background"],
          "editor.line_number": theme["ui.foregroundMuted"],
          "editor.active_line_number": theme["editor.foreground"],
          "editor.active_line.background": theme["editor.lineHighlight"],

          // Terminal

          "terminal.ansi.black": terminal.black,
          "terminal.ansi.red": terminal.red,
          "terminal.ansi.green": terminal.green,
          "terminal.ansi.yellow": terminal.yellow,
          "terminal.ansi.blue": terminal.blue,
          "terminal.ansi.magenta": terminal.magenta,
          "terminal.ansi.cyan": terminal.cyan,
          "terminal.ansi.white": terminal.white,

          "terminal.ansi.bright_black": terminal.brightBlack,
          "terminal.ansi.bright_red": terminal.brightRed,
          "terminal.ansi.bright_green": terminal.brightGreen,
          "terminal.ansi.bright_yellow": terminal.brightYellow,
          "terminal.ansi.bright_blue": terminal.brightBlue,
          "terminal.ansi.bright_magenta": terminal.brightMagenta,
          "terminal.ansi.bright_cyan": terminal.brightCyan,
          "terminal.ansi.bright_white": terminal.brightWhite,

          "terminal.background": terminal.background,
          "terminal.foreground": terminal.foreground,

          // Syntax highlighting
          syntax: {
            keyword: syntaxColor(theme["syntax.keyword"]),
            function: syntaxColor(theme["syntax.function"]),
            "function.method": syntaxColor(theme["syntax.method"]),

            type: syntaxColor(theme["syntax.type"]),
            "type.builtin": syntaxColor(theme["syntax.type"]),

            string: syntaxColor(theme["syntax.string"]),
            number: syntaxColor(theme["syntax.number"]),

            comment: {
              color: theme["syntax.comment"],
              font_style: "italic",
            },

            variable: syntaxColor(theme["syntax.variable"]),
            "variable.parameter": syntaxColor(theme["syntax.parameter"]),

            property: syntaxColor(theme["syntax.property"]),
            namespace: syntaxColor(theme["syntax.namespace"]),
          },
        },
      },
    ],
  };
}
