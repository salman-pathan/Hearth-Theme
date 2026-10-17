import type { ResolvedTheme } from "./type.js";

export interface TerminalPalette {
  background: string;
  foreground: string;
  cursor: string;
  selection: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
}

export function createTerminalPalette(theme: ResolvedTheme): TerminalPalette {
  return {
    background: theme["editor.background"],
    foreground: theme["editor.foreground"],
    cursor: theme["ui.cursor"],
    selection: theme["editor.selection"],

    black: theme["ui.background"],
    red: theme["diagnostic.error"],
    green: theme["diagnostic.success"],
    yellow: theme["diagnostic.warning"],
    blue: theme["diagnostic.info"],
    magenta: theme["syntax.keyword"],
    cyan: theme["syntax.type"],
    white: theme["ui.foreground"],

    brightBlack: theme["ui.foregroundMuted"],
    brightRed: theme["diagnostic.error"],
    brightGreen: theme["diagnostic.success"],
    brightYellow: theme["diagnostic.warning"],
    brightBlue: theme["diagnostic.info"],
    brightMagenta: theme["syntax.keyword"],
    brightCyan: theme["syntax.type"],
    brightWhite: theme["editor.foreground"],
  };
}
