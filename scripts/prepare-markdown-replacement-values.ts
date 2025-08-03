import fs from "fs";
import path from "path";

const HARDHAT3_NPM_TAG = "next";

const REAPLACEMENT_VALUES_JSON = path.join(
  __dirname,
  "../temp/markdown-replacement-values.json"
);

async function getHardhatVersion(): Promise<string> {
  const res = await fetch(
    `https://registry.npmjs.org/hardhat/${HARDHAT3_NPM_TAG}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch latest hardhat version`);
  }

  const json = (await res.json()) as { version: string };

  return json.version;
}

async function getRecommendedSolcVersion(): Promise<string> {
  return "0.8.28";
}

async function main() {
  const hardhatVersion = await getHardhatVersion();
  const recommendedSolcVersion = await getRecommendedSolcVersion();

  const replacementValues = {
    HARDHAT_VERSION: hardhatVersion,
    RECOMMENDED_SOLC_VERSION: recommendedSolcVersion,
  };

  const json = JSON.stringify(replacementValues, undefined, 2);

  console.log("Writing markdown replacement values:");
  console.log(
    json
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n")
  );

  fs.writeFileSync(REAPLACEMENT_VALUES_JSON, json, "utf-8");
  console.log();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
