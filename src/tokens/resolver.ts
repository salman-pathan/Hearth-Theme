import { toHex } from "../core/color.js";
import type { ColorRegistry } from "./registry.js";
import type { ResolvedTheme, TokenDefinitions } from "./type.js";

export function resolveTokens(
  definitions: TokenDefinitions,
  registry: ColorRegistry,
): ResolvedTheme {
  const result = {} as ResolvedTheme;

  for (const [role, reference] of Object.entries(definitions)) {
    const color = registry[reference];

    if (!color) {
      throw new Error(`Unknown color reference "${reference}" for "${role}"`);
    }

    result[role as keyof ResolvedTheme] = toHex(color);
  }

  return result;
}
