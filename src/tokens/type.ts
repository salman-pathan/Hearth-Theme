export const semanticRoles = [
  // Editor surfaces
  "editor.background",
  "editor.foreground",
  "editor.selection",
  "editor.lineHighlight",

  // UI surfaces
  "ui.background",
  "ui.surface",
  "ui.surfaceElevated",
  "ui.border",
  "ui.foreground",
  "ui.foregroundMuted",
  "ui.focus",
  "ui.cursor",

  // Syntax
  "syntax.keyword",
  "syntax.function",
  "syntax.method",
  "syntax.type",
  "syntax.string",
  "syntax.number",
  "syntax.comment",
  "syntax.variable",
  "syntax.parameter",
  "syntax.property",
  "syntax.namespace",

  // Diagnostics
  "diagnostic.error",
  "diagnostic.warning",
  "diagnostic.info",
  "diagnostic.success",
] as const;

export type SemanticRole = (typeof semanticRoles)[number];

export type TokenDefinitions = Record<SemanticRole, string>;
export type ResolvedTheme = Record<SemanticRole, string>;
