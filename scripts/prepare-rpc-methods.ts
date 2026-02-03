import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Generates the JSON-RPC methods documentation page.
 *
 * Supported methods are auto-fetched from EDR and listed by name only.
 * To add a description or examples for a method, create:
 *   src/content/rpc/<method>.md
 *
 * To add an unsupported method, add it to:
 *   src/content/rpc/unsupported-methods.json
 */

const EDR_METHODS_URL =
  "https://raw.githubusercontent.com/NomicFoundation/edr/main/crates/edr_provider/src/requests/methods.rs";

const RPC_CONTENT_PATH = path.resolve(
  import.meta.dirname,
  "../src/content/rpc",
);

const UNSUPPORTED_PATH = path.join(RPC_CONTENT_PATH, "unsupported-methods.json");

const OUTPUT_PATH = path.resolve(
  import.meta.dirname,
  "../src/content/docs/docs/reference/json-rpc-methods.md",
);

// Standard methods: eth_, debug_, net_, web3_, personal_
// Special testing/debugging methods: hardhat_, evm_
const STANDARD_PREFIXES = ["eth", "debug", "net", "web3", "personal"];
const SPECIAL_PREFIXES = ["hardhat", "evm"];

async function fetchMethodsFromEdr(): Promise<string[]> {
  const response = await fetch(EDR_METHODS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch EDR methods: ${response.status}`);
  }

  const rustCode = await response.text();
  const methods: string[] = [];
  const methodRegex = /rename\s*=\s*"([^"]+)"/g;
  let match;

  while ((match = methodRegex.exec(rustCode)) !== null) {
    const name = match[1]!;
    if (/^(eth|debug|hardhat|evm|net|web3|personal)_/.test(name)) {
      methods.push(name);
    }
  }

  return [...new Set(methods)].sort();
}

function groupByPrefix(methods: string[]): Map<string, string[]> {
  const grouped = new Map<string, string[]>();
  for (const method of methods) {
    const prefix = method.split("_")[0]!;
    if (!grouped.has(prefix)) {
      grouped.set(prefix, []);
    }
    grouped.get(prefix)!.push(method);
  }
  return grouped;
}

async function readFile_(filepath: string): Promise<string | null> {
  try {
    return (await readFile(filepath, "utf-8")).trim();
  } catch {
    return null;
  }
}

async function renderMethods(methods: string[]): Promise<string> {
  let md = "";
  for (const method of methods) {
    md += `###### \`${method}\`\n`;

    // Read additional info (description + examples) from markdown file
    const infoFile = path.join(RPC_CONTENT_PATH, `${method}.md`);
    const info = await readFile_(infoFile);
    if (info) {
      md += `\n${info}\n`;
    }
  }
  return md;
}

async function main() {
  const methods = await fetchMethodsFromEdr();
  const grouped = groupByPrefix(methods);
  const unsupported = JSON.parse(await readFile(UNSUPPORTED_PATH, "utf-8"));

  // Collect methods by section
  const standardMethods: string[] = [];
  const specialMethods: string[] = [];

  for (const prefix of STANDARD_PREFIXES) {
    standardMethods.push(...(grouped.get(prefix) || []));
  }
  for (const prefix of SPECIAL_PREFIXES) {
    specialMethods.push(...(grouped.get(prefix) || []));
  }

  let md = `---
title: JSON-RPC Methods
description: Reference of JSON-RPC methods supported by Hardhat's simulated networks
sidebar:
  label: JSON-RPC Methods
  order: 6
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
editUrl: false
---

## Standard Methods

${await renderMethods(standardMethods)}
## Special Testing/Debugging Methods

${await renderMethods(specialMethods)}
## Unsupported Methods

`;

  for (const method of unsupported.unsupported || []) {
    md += `###### \`${method}\`\n`;
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, md, "utf-8");
}

main();
