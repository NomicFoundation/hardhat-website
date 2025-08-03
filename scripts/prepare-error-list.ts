import * as fs from "fs";
import * as path from "path";

const HARDHAT_ERRORS_TAG = "next";
const ERROR_DESCRIPTORS_URL = `https://unpkg.com/@nomicfoundation/hardhat-errors@${HARDHAT_ERRORS_TAG}/dist/src/descriptors.js`;
const ERROR_DESCRIPTORS_FILE = path.join(
  __dirname,
  "../temp/error-descriptors.js"
);

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

interface ErrorDescriptor {
  number: number;
  websiteTitle: string;
  websiteDescription: string;
}

interface ErrorCategories {
  [packageName: string]: {
    min: number;
    max: number;
    pluginId: string | undefined;
    websiteTitle: string;
    CATEGORIES: {
      [categoryName: string]: {
        min: number;
        max: number;
        websiteSubTitle: string;
      };
    };
  };
}

interface ErrorsDescriptors {
  [packageName: string]: {
    [categoryName: string]: {
      [errorName: string]: ErrorDescriptor;
    };
  };
}

async function downloadErrorDescriptors() {
  const res = await fetch(ERROR_DESCRIPTORS_URL, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to download error descriptors`);
  }

  const content = await res.text();

  fs.writeFileSync(ERROR_DESCRIPTORS_FILE, content, "utf-8");
}

async function loadErrorDescriptors(): Promise<{
  ERROR_CATEGORIES: ErrorCategories;
  ERRORS: ErrorsDescriptors;
}> {
  return await import(ERROR_DESCRIPTORS_FILE);
}

async function main() {
  console.log("Downloading error descriptors...");
  await downloadErrorDescriptors();
  const { ERROR_CATEGORIES, ERRORS } = await loadErrorDescriptors();

  console.log("Preparing errors markdown and redirects...");

  let content = `# Hardhat errors

This section contains a list of all the possible errors you may encounter when
using Hardhat and an explanation of each of them.`;

  const errorRedirects: Redirect[] = [];

  for (const [packageName, packageCategories] of Object.entries(
    ERROR_CATEGORIES
  )) {
    content += `

## ${packageCategories.websiteTitle} errors`;

    for (const [rangeName, range] of Object.entries(
      packageCategories.CATEGORIES
    )) {
      content += `

### ${range.websiteSubTitle}
`;

      for (const errorDescriptor of Object.values<ErrorDescriptor>(
        ERRORS[packageName][rangeName]
      )) {
        const errorCode = `hhe${errorDescriptor.number}`;
        const title = `${errorCode}: ${errorDescriptor.websiteTitle}`;

        content += `
#### [${title}](#${errorCode})
${errorDescriptor.websiteDescription}
`;

        const shortLink = errorCode;
        const anchor = shortLink;

        errorRedirects.push({
          source: `/${shortLink}`,
          destination: `/errors/#${anchor}`,
          permanent: false,
        });
        errorRedirects.push({
          source: `/${shortLink.toLowerCase()}`,
          destination: `/errors/#${anchor}`,
          permanent: false,
        });
      }
    }
  }

  // The error list has some problems, so we fixed it manually and saved it here
  content = fs.readFileSync(
    path.join(__dirname, "temporary-error-list.md"),
    "utf-8"
  );

  fs.writeFileSync(
    path.join(__dirname, "../src/content/docs/errors/index.md"),
    content,
    "utf-8"
  );
  fs.writeFileSync(
    path.join(__dirname, "../temp/error-redirects.json"),
    JSON.stringify(errorRedirects, undefined, 2),
    "utf-8"
  );
  console.log();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
