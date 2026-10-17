import Ajv from "ajv";
import { readFile } from "node:fs/promises";

const schema = JSON.parse(
  await readFile(
    new URL("../schemas/zed-theme-v0.2.0.json", import.meta.url),
    "utf8",
  ),
);

const theme = JSON.parse(
  await readFile(
    new URL("../extensions/zed/themes/hearth.json", import.meta.url),
    "utf8",
  ),
);

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

if (!validate(theme)) {
  console.error(validate.errors);
  process.exitCode = 1;
} else {
  console.log("Zed theme schema validation passed.");
}
