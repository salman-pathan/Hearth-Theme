import { themeOutputs } from "./config/outputs.js";
import { hearthTokens } from "./tokens/hearth.js";
import { createColorRegistry } from "./tokens/registry.js";
import { resolveTokens } from "./tokens/resolver.js";
import { validateTheme } from "./validation/index.js";

import { writeJson } from "./utils/write-json.js";
import { writeOutput } from "./utils/write-output.js";

async function main() {
  const registry = createColorRegistry();
  const theme = resolveTokens(hearthTokens, registry);

  const report = validateTheme(theme, registry);

  for (const issue of report.issues) {
    const prefix =
      issue.severity === "error"
        ? "ERROR"
        : issue.severity === "warning"
          ? "WARN"
          : "INFO";

    console.log(`[${prefix}] ${issue.code}: ${issue.message}`);
  }

  if (!report.valid) {
    throw new Error("Theme validation failed");
  }

  // Generate editor-specific themes
  await Promise.all(
    themeOutputs.map(({ path, generate }) =>
      writeOutput(path, generate(theme)),
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
