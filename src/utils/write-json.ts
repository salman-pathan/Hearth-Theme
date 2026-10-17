import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export async function writeJson(
  filePath: string,
  data: unknown,
): Promise<void> {
  const outputPath = resolve(filePath);

  await mkdir(dirname(outputPath), { recursive: true });

  await writeFile(outputPath, JSON.stringify(data, null, 2) + "\n", "utf8");

  console.log(`Generated ${outputPath}`);
}
