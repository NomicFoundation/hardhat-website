import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { generateMarkdown } from "../../src/utils/generateMarkdown.ts";
import { globalConfig } from "../../src/config.ts";

/** Splits an .mdx file into frontmatter fields and body. */
function parseMdx(filePath: string) {
  const raw = readFileSync(filePath, "utf-8");
  const [, frontmatter, ...rest] = raw.split("---\n");
  const body = rest.join("---\n").trimStart();
  assert.ok(frontmatter !== undefined, "MDX file should have frontmatter");
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1] ?? "";
  const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1] ?? "";
  return { title, description, body };
}

describe("generateMarkdown", () => {
  it("generates basic output for .md file without MDX metadata", () => {
    const result = generateMarkdown({
      title: "My Title",
      description: "My description",
      body: "Hello world",
      filePath: "docs/guide.md",
    });

    assert.ok(result.includes("# My Title"));
    assert.ok(result.includes("Description: My description"));
    assert.ok(result.includes("Hello world"));
    assert.ok(!result.includes("MDX"));
    assert.ok(!result.includes("Source:"));
  });

  it("includes MDX note and source URL for .mdx file", () => {
    const result = generateMarkdown({
      title: "MDX Doc",
      description: "An MDX doc",
      body: "Some content",
      filePath: "src/content/docs/guide.mdx",
    });

    assert.ok(result.includes("Note: This document was authored using MDX"));
    const expectedUrl = `${globalConfig.baseGitHubDeploymentBranchViewUrl}/src/content/docs/guide.mdx`;
    assert.ok(result.includes(`Source: ${expectedUrl}`));
    assert.ok(result.includes("Some content"));
  });

  it("includes glossary preamble for .mdx with glossary-triggering content", () => {
    const result = generateMarkdown({
      title: "Tabs Doc",
      description: "Doc with tabs",
      body: "<Tabs><TabItem label='a'>content</TabItem></Tabs>",
      filePath: "docs/tabs.mdx",
    });

    assert.ok(result.includes("Components used in this page:"));
    assert.ok(result.includes("<Tabs>"));
  });

  it("omits glossary block for .mdx with no glossary matches", () => {
    const result = generateMarkdown({
      title: "Plain MDX",
      description: "No special components",
      body: "Just plain text content here.",
      filePath: "docs/plain.mdx",
    });

    assert.ok(result.includes("Note: This document was authored using MDX"));
    assert.ok(!result.includes("Components used in this page:"));
  });

  it("handles real .mdx with components (migrate-to-esm)", () => {
    const filePath =
      "src/content/docs/docs/migrate-from-hardhat2/guides/migrate-to-esm.mdx";
    const { title, description, body } = parseMdx(filePath);
    const result = generateMarkdown({ title, description, body, filePath });

    assert.ok(result.includes("# Migrate your project to ESM"));
    assert.ok(result.includes("Note: This document was authored using MDX"));
    assert.ok(
      result.includes(
        `Source: ${globalConfig.baseGitHubDeploymentBranchViewUrl}/${filePath}`,
      ),
    );
    // This file uses <Tabs>, <TabItem>, and <Code> — glossary should be present
    assert.ok(result.includes("Components used in this page:"));
    assert.ok(result.includes("<Tabs>"));
  });

  it("handles real .mdx with simple components (cookbook/debug-logs)", () => {
    const filePath = "src/content/docs/docs/cookbook/debug-logs.mdx";
    const { title, description, body } = parseMdx(filePath);
    const result = generateMarkdown({ title, description, body, filePath });

    assert.ok(result.includes("# Running Hardhat with debug logs"));
    assert.ok(result.includes("Note: This document was authored using MDX"));
    // This file uses <Run> — glossary should include it
    assert.ok(result.includes("Components used in this page:"));
    assert.ok(result.includes('<Run cmd="..."/>'));
  });
});
