import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getErrors } from "../src/content/hardhat-errors.ts";

const ERROR_LIST_MD_PATH = path.resolve(
  import.meta.dirname,
  "../src/content/docs/docs/reference/errors.md",
);

const MANUALLY_FIXED_LIST_MD_PATH = path.resolve(
  import.meta.dirname,
  "manually-fixed.md",
);

async function generateErrorListMarkdown(): Promise<string> {
  // First try to read the manually fixed list of errors
  try {
    const manuallyFixedList = await readFile(
      MANUALLY_FIXED_LIST_MD_PATH,
      "utf8",
    );

    console.warn();
    console.warn("WARNING: USING MANUALLY FIXED ERROR LIST");
    console.warn(
      "TO SWITCH TO THE GENERATED ERROR LIST, RENAME scripts/manually-fixed.md TO scripts/manually-fixed.ignore.md",
    );
    console.warn();

    return manuallyFixedList;
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const errors = await getErrors();

  let content = `---
title: Hardhat 3 errors
description: This section contains a list of all the possible errors you may encounter when using Hardhat and an explanation of each of them
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
editUrl: false
next: false
prev: false
---

This section contains a list of all the possible errors you may encounter when
using Hardhat and an explanation of each of them.`;

  for (const packageErrors of errors) {
    content += `

## ${packageErrors.subtitle}
`;

    for (const category of packageErrors.categories) {
      content += `

### ${category.subtitle}
`;

      for (const error of category.errors) {
        content += `
#### ${error.title}
${error.description}
`;
      }
    }
  }

  return content;
}

await mkdir(path.dirname(ERROR_LIST_MD_PATH), { recursive: true });
await writeFile(ERROR_LIST_MD_PATH, await generateErrorListMarkdown(), "utf8");
