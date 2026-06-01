import { spawnSync } from "child_process";
import fs from "fs";

const inputPath = process.argv[2] ?? ".env.convex";
const isDryRun = process.argv.includes("--dry-run");

if (!fs.existsSync(inputPath)) {
  console.error(`Env file not found: ${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf8");
const lines = raw.split(/\r?\n/);
const entries = [];

for (const [index, line] of lines.entries()) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    continue;
  }

  const equalsIndex = trimmed.indexOf("=");
  if (equalsIndex === -1) {
    console.warn(`Skipping line ${index + 1}: missing '='`);
    continue;
  }

  const key = trimmed.slice(0, equalsIndex).trim();
  let value = trimmed.slice(equalsIndex + 1).trim();

  if (!key) {
    console.warn(`Skipping line ${index + 1}: missing key`);
    continue;
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  if (!value) {
    console.warn(`Skipping ${key}: empty value`);
    continue;
  }

  entries.push({ key, value });
}

for (const { key, value } of entries) {
  const args = ["convex", "env", "set", key, "--", `${value}`];
  if (isDryRun) {
    console.log(`npx ${args.join(" ")}`);
    continue;
  }

  const result = spawnSync("npx", args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
