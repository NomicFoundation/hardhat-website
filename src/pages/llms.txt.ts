import { getCollection } from "astro:content";
import type { StarlightSidebarTopicsUserConfig } from "starlight-sidebar-topics";
import type { StarlightUserConfig } from "@astrojs/starlight/types";
import { sidebarTopics } from "../sidebar";

type SidebarTopic = StarlightSidebarTopicsUserConfig[number];

// Sidebar items are a recursive union — Starlight types them via z.any(),
// so we narrow with property checks at runtime.
type SidebarItem = NonNullable<StarlightUserConfig["sidebar"]>[number];

interface DocEntry {
  id: string;
  data: { title: string; description: string; sidebar?: { order?: number } };
}

/**
 * Resolve a single sidebar item into an ordered list of doc entries.
 * - slug items  → look up by id
 * - autogenerate → find all docs in that directory, sorted by sidebar order then id
 * - group items → recurse into children
 * - link items  → skip (external / custom pages)
 */
function resolveItem(item: SidebarItem, docs: DocEntry[]): DocEntry[] {
  // String shorthand — treated as a slug
  if (typeof item === "string") {
    const entry = docs.find((d) => d.id === item);
    return entry ? [entry] : [];
  }

  if ("slug" in item) {
    const entry = docs.find((d) => d.id === item.slug);
    return entry ? [entry] : [];
  }

  if ("autogenerate" in item) {
    const dir = item.autogenerate.directory.replace(/^\//, "");
    return docs
      .filter((d) => d.id === dir || d.id.startsWith(dir + "/"))
      .sort((a, b) => {
        const orderA = a.data.sidebar?.order ?? Infinity;
        const orderB = b.data.sidebar?.order ?? Infinity;
        if (orderA !== orderB) return orderA - orderB;
        return a.id.localeCompare(b.id);
      });
  }

  if ("items" in item) {
    return item.items.flatMap((sub: SidebarItem) => resolveItem(sub, docs));
  }

  // link items — not in the docs collection
  return [];
}

function formatEntry(entry: DocEntry): string {
  const url = `https://hardhat.org/${entry.id}.md`;
  return `- [${entry.data.title}](${url}): ${entry.data.description}`;
}

/** Markdown heading prefix for a given depth (## for 0, ### for 1, etc.) */
function heading(depth: number): string {
  return "#".repeat(depth + 2);
}

/**
 * Recursively render sidebar items into markdown lines.
 * Named groups become headings; slug/autogenerate items become list entries.
 */
function renderItems(
  items: SidebarItem[],
  docs: DocEntry[],
  depth: number,
  lines: string[],
): void {
  // Partition: render leaf items (slugs) first, then sub-groups after,
  // so that sub-category headings don't split up the parent's direct entries.
  const leafItems: SidebarItem[] = [];
  const groupItems: SidebarItem[] = [];

  for (const item of items) {
    if (typeof item === "string" || "slug" in item) {
      leafItems.push(item);
    } else if ("label" in item && ("items" in item || "autogenerate" in item)) {
      groupItems.push(item);
    }
    // link items are silently skipped
  }

  for (const item of leafItems) {
    for (const entry of resolveItem(item, docs)) {
      lines.push(formatEntry(entry));
    }
  }

  for (const item of groupItems) {
    if (typeof item === "string" || !("label" in item)) continue;

    if ("autogenerate" in item) {
      const entries = resolveItem(item, docs);
      if (entries.length > 0) {
        lines.push("", `${heading(depth)} ${item.label}`, "");
        for (const entry of entries) {
          lines.push(formatEntry(entry));
        }
      }
    } else if ("items" in item) {
      lines.push("", `${heading(depth)} ${item.label}`, "");
      renderItems(item.items as SidebarItem[], docs, depth + 1, lines);
    }
  }
}

function renderTopic(topic: SidebarTopic, docs: DocEntry[]): string {
  if (!("items" in topic)) return "";

  const lines: string[] = [`## ${topic.label}`];
  renderItems(topic.items as SidebarItem[], docs, 1, lines);
  return lines.join("\n");
}

export async function GET() {
  const docs = (await getCollection("docs")) as DocEntry[];
  const plugins = await getCollection("officialPlugins");
  const communityPlugins = await getCollection("communityPlugins");

  const preamble = `# Hardhat 3

> Hardhat is a development environment for Ethereum and EVM-compatible blockchains.
> It helps developers compile, deploy, test, and debug Solidity smart contracts.
> Solidity is the primary programming language for writing smart contracts on Ethereum.
>
> This documentation covers Hardhat 3, the latest major version.
> The docs are organized into sections: core Hardhat usage, Hardhat Ignition
> (a declarative deployment system), migration guides from Hardhat 2,
> and a plugin development guide.
`;

  const sectionBlocks = sidebarTopics
    // We filter out the "Plugins" topic because they are custom pages,
    // and we list the plugins at the end of the file anyways
    .filter((topic) => topic.label !== "Plugins")
    .map((topic) => renderTopic(topic, docs));

  const pluginLines = plugins.map((p) => {
    const url = `https://hardhat.org/docs/plugins/${p.data.slug}.md`;
    return `- [${p.data.shortName}](${url}): ${p.data.description}`;
  });
  const pluginsSection = `## Official Plugins\n\n${pluginLines.join("\n")}`;

  const communityLines = communityPlugins.map((p) => {
    return `- [${p.data.name}](${p.data.website}): ${p.data.description}`;
  });
  const communitySection = `## Community Plugins\n\n${communityLines.join("\n")}`;

  const body = [
    preamble,
    ...sectionBlocks,
    pluginsSection,
    communitySection,
    "",
  ].join("\n\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
