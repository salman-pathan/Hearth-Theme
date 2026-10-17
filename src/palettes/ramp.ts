import { generateRamp, type RampDefinition } from "../core/ramp.js";

export const amberRamp = generateRamp({
  hue: 70,
  stops: [
    { name: "100", lightness: 0.35, chroma: 0.035 },
    { name: "200", lightness: 0.45, chroma: 0.055 },
    { name: "300", lightness: 0.58, chroma: 0.075 },
    { name: "400", lightness: 0.73, chroma: 0.085 },
    { name: "500", lightness: 0.85, chroma: 0.055 },
  ],
});

export const sageRamp = generateRamp({
  hue: 135,
  stops: [
    { name: "100", lightness: 0.35, chroma: 0.025 },
    { name: "200", lightness: 0.47, chroma: 0.045 },
    { name: "300", lightness: 0.6, chroma: 0.06 },
    { name: "400", lightness: 0.75, chroma: 0.07 },
    { name: "500", lightness: 0.86, chroma: 0.045 },
  ],
});

export const plumRamp = generateRamp({
  hue: 315,
  stops: [
    { name: "100", lightness: 0.35, chroma: 0.025 },
    { name: "200", lightness: 0.47, chroma: 0.045 },
    { name: "300", lightness: 0.6, chroma: 0.06 },
    { name: "400", lightness: 0.75, chroma: 0.045 },
    { name: "500", lightness: 0.86, chroma: 0.045 },
  ],
});

export const stoneRamp = generateRamp({
  hue: 190,
  stops: [
    { name: "100", lightness: 0.35, chroma: 0.025 },
    { name: "200", lightness: 0.47, chroma: 0.045 },
    { name: "300", lightness: 0.6, chroma: 0.06 },
    { name: "400", lightness: 0.75, chroma: 0.04 },
    { name: "500", lightness: 0.86, chroma: 0.025 },
  ],
});

export const neutralRamp = generateRamp({
  hue: 75,
  stops: [
    { name: "100", lightness: 0.24, chroma: 0.012 },
    { name: "200", lightness: 0.29, chroma: 0.014 },
    { name: "300", lightness: 0.36, chroma: 0.015 },
    { name: "400", lightness: 0.57, chroma: 0.018 },
    { name: "500", lightness: 0.72, chroma: 0.02 },
    { name: "600", lightness: 0.88, chroma: 0.02 },
  ],
});

export const coralRamp = generateRamp({
  hue: 25,
  stops: [
    { name: "100", lightness: 0.38, chroma: 0.055 },
    { name: "200", lightness: 0.5, chroma: 0.075 },
    { name: "300", lightness: 0.63, chroma: 0.09 },
    { name: "400", lightness: 0.75, chroma: 0.095 },
    { name: "500", lightness: 0.86, chroma: 0.065 },
  ],
});
