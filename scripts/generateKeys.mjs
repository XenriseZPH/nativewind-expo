import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

const envFilePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.convex");

const upsertEnvVar = (content, key, value) => {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");

  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }

  const normalizedContent = content.endsWith("\n") ? content : `${content}\n`;
  return `${normalizedContent}${line}\n`;
};

const keys = await generateKeyPair("RS256", {
  extractable: true,
});
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwtPrivateKey = `"${privateKey.trimEnd().replace(/\n/g, " ")}"`;
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

const envFile = await readFile(envFilePath, "utf8");
const updatedEnvFile = upsertEnvVar(
  upsertEnvVar(envFile, "JWT_PRIVATE_KEY", jwtPrivateKey),
  "JWKS",
  jwks,
);

await writeFile(envFilePath, updatedEnvFile);

process.stdout.write(`Updated JWT_PRIVATE_KEY and JWKS in ${envFilePath}\n`);
