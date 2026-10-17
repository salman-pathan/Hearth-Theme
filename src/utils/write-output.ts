import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export async function writeOutput(
  filePath: string,
  content: string,
): Promise<void> {
  const outputPath = resolve(filePath);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, "utf8");

  console.log(`Generated ${outputPath}`);
}
