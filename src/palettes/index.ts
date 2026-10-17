import { fromHex, type OklchColor } from "../core/color.js";

export type ColorRole =
  | "background"
  | "surface"
  | "foreground"
  | "muted"
  | "function"
  | "keyword"
  | "type"
  | "string"
  | "number"
  | "error";

export interface Palette {
  name: string;
  mode: "dark" | "light";
  colors: Record<ColorRole, OklchColor>;
}

export const hearth: Palette = {
  name: "Hearth",
  mode: "dark",
  colors: {
    background: fromHex("#211F1B"),
    surface: fromHex("#2B2924"),
    foreground: fromHex("#E2D7C3"),
    muted: fromHex("#A99E8C"),
    function: fromHex("#D8AD79"),
    keyword: fromHex("#C0A2B8"),
    type: fromHex("#9DAEAD"),
    string: fromHex("#A6B68A"),
    number: fromHex("#E0B28C"),
    error: fromHex("#E7A29A"),
  },
};
