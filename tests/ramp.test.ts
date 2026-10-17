import test from "node:test";
import assert from "node:assert/strict";

import { generateRamp } from "../src/core/ramp.js";
import { amberRamp } from "../src/palettes/ramp.js";

test("generates the expected number of stops", () => {
  const ramp = generateRamp({
    hue: 70,
    stops: [
      { name: "100", lightness: 0.3, chroma: 0.03 },
      { name: "200", lightness: 0.5, chroma: 0.07 },
      { name: "300", lightness: 0.7, chroma: 0.07 },
    ],
  });

  assert.equal(Object.keys(ramp).length, 3);
  assert.equal(ramp["200"]?.l, 0.5);
});

test("rejects invalid lightness", () => {
  assert.throws(
    () =>
      generateRamp({
        hue: 70,
        stops: [{ name: "100", lightness: 1.5, chroma: 0.05 }],
      }),
    RangeError,
  );
});

test("does not mutate the definition", () => {
  const definition = {
    hue: 70,
    stops: [{ name: "100", lightness: 0.5, chroma: 0.05 }],
  };

  generateRamp(definition);
  assert.equal(definition.stops[0]?.lightness, 0.5);
});

test("amber ramp maintains intended lightness", () => {
  assert.equal(amberRamp["400"]?.l, 0.73);
  assert.equal(amberRamp["500"]?.l, 0.85);
});

test("amber ramp lightness increases across stops", () => {
  const stops = ["100", "200", "300", "400", "500"];

  for (let i = 1; i < stops.length; i++) {
    const previous = amberRamp[stops[i - 1]!];
    const current = amberRamp[stops[i]!];

    assert.ok(previous && current);
    assert.ok(current.l > previous.l);
  }
});
