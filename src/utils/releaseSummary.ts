/**
 * Turns the markdown body of a GitHub release into safe HTML for the landing
 * page: images are dropped, inline markdown markers are stripped, all text is
 * HTML-escaped, and links (markdown links, `<autolinks>` and bare URLs) become
 * anchors, but only when they point to an http(s) URL. Anything else is
 * rendered as plain text.
 */

// The destination may contain one level of balanced parentheses, like
// wikipedia URLs do, but not whitespace or angle brackets.
const MARKDOWN_LINK =
  /\[([^\]]*)\]\(\s*<?((?:[^\s<>()]|\([^\s<>()]*\))+)>?(?:\s+"[^"]*")?\s*\)/y;
const AUTOLINK = /<(https?:\/\/[^\s<>]+)>/y;
const BARE_URL = /https?:\/\/[^\s<>()[\]]+/y;
const LINK_START = /\[|<https?:\/\/|https?:\/\//g;

const IMAGE = /!\[[^\]]*\]\([^)]*\)/g;
// Underscores inside a word (like `node_modules`) aren't emphasis, so we only
// strip them at word edges.
const INLINE_MARKERS = /[`*]|~~|(?<!\w)_+|_+(?!\w)/g;
const TRAILING_PUNCTUATION = /[.,;:!?]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isSafeHref(href: string): boolean {
  try {
    const { protocol } = new URL(href);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

function plainText(markdown: string): string {
  return escapeHtml(markdown.replace(INLINE_MARKERS, ""));
}

interface RenderOptions {
  /** When false, links are rendered as their label only. Defaults to true. */
  links?: boolean;
}

function anchor(text: string, href: string, options: RenderOptions): string {
  const label = plainText(text === "" ? href : text);

  if (options.links === false || !isSafeHref(href)) {
    return label;
  }

  return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

interface LinkMatch {
  text: string;
  href: string;
  end: number;
}

function matchLinkAt(source: string, index: number): LinkMatch | undefined {
  MARKDOWN_LINK.lastIndex = index;
  const markdownLink = MARKDOWN_LINK.exec(source);
  if (markdownLink !== null) {
    return {
      text: markdownLink[1] ?? "",
      href: markdownLink[2] ?? "",
      end: index + markdownLink[0].length,
    };
  }

  AUTOLINK.lastIndex = index;
  const autolink = AUTOLINK.exec(source);
  if (autolink !== null) {
    const href = autolink[1] ?? "";
    return { text: href, href, end: index + autolink[0].length };
  }

  BARE_URL.lastIndex = index;
  const bareUrl = BARE_URL.exec(source);
  if (bareUrl !== null) {
    // Trailing punctuation is almost always part of the sentence, not the URL.
    const href = bareUrl[0].replace(TRAILING_PUNCTUATION, "");
    return { text: href, href, end: index + href.length };
  }

  return undefined;
}

function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph !== "");
}

/**
 * Renders a single markdown paragraph as one line of inline HTML.
 */
function releaseParagraphHtml(
  paragraph: string,
  options: RenderOptions = {},
): string {
  const source = paragraph.replace(IMAGE, "").replace(/\s+/g, " ");

  let html = "";
  let cursor = 0;

  LINK_START.lastIndex = 0;
  let start: RegExpExecArray | null;
  while ((start = LINK_START.exec(source)) !== null) {
    if (start.index < cursor) {
      continue;
    }

    const link = matchLinkAt(source, start.index);
    if (link === undefined) {
      continue;
    }

    html += plainText(source.slice(cursor, start.index));
    html += anchor(link.text, link.href, options);
    cursor = link.end;
    LINK_START.lastIndex = cursor;
  }

  html += plainText(source.slice(cursor));

  return html.trim();
}

/**
 * Renders only the first paragraph, as one line of inline HTML.
 */
export function releaseSummaryHtml(body: string): string {
  return releaseParagraphHtml(splitParagraphs(body)[0] ?? "");
}

/**
 * Renders every paragraph of the body, each wrapped in a `<p>`.
 */
export function releaseBodyHtml(
  body: string,
  options: RenderOptions = {},
): string {
  return splitParagraphs(body)
    .map((paragraph) => releaseParagraphHtml(paragraph, options))
    .filter((html) => html !== "")
    .map((html) => `<p>${html}</p>`)
    .join("");
}
