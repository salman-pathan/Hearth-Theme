import test from "node:test";
import assert from "node:assert/strict";

import {
  fromHex,
  toHex,
  withLightness,
  withChroma,
} from "../src/core/color.js";

test("converts hex to OKLCH and back", () => {
  const original = "#D8AD79";
  const converted = toHex(fromHex(original));

  assert.equal(converted.toLowerCase(), original.toLowerCase());
});

test("changing lightness does not mutate original", () => {
  const original = fromHex("#D8AD79");
  const modified = withLightness(original, 0.5);

  assert.notEqual(modified.l, original.l);
  assert.equal(modified.c, original.c);
  assert.equal(modified.h, original.h);
});

test("rejects invalid lightness", () => {
  const color = fromHex("#D8AD79");

  assert.throws(() => withLightness(color, 1.5), RangeError);
});

test("rejects negative chroma", () => {
  const color = fromHex("#D8AD79");

  assert.throws(() => withChroma(color, -0.1), RangeError);
});
