import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  releaseBodyHtml,
  releaseSummaryHtml,
} from "../../src/utils/releaseSummary.ts";

const ATTRS = 'target="_blank" rel="noopener noreferrer"';

describe("releaseSummaryHtml", () => {
  it("keeps only the first paragraph and collapses whitespace", () => {
    const body = "First   line\ncontinues.\n\nSecond paragraph.";
    assert.equal(releaseSummaryHtml(body), "First line continues.");
  });

  it("strips images and inline markdown markers", () => {
    const body =
      "Adds `foo` and **bar** ![img](https://x.com/i.png) _baz_ ~~qux~~ __x__";
    assert.equal(releaseSummaryHtml(body), "Adds foo and bar baz qux x");
  });

  it("keeps underscores inside words", () => {
    assert.equal(
      releaseSummaryHtml("Shrinks `node_modules` and _my_var_"),
      "Shrinks node_modules and my_var",
    );
  });

  it("turns markdown links into anchors", () => {
    const body =
      "Read the [announcement](https://blog.nomic.foundation/post/) now.";
    assert.equal(
      releaseSummaryHtml(body),
      `Read the <a href="https://blog.nomic.foundation/post/" ${ATTRS}>announcement</a> now.`,
    );
  });

  it("handles several links, titles and angle-bracket destinations", () => {
    const body =
      'See [a](<https://a.com> "Title") and [b]( https://b.com/x?y=1&z=2 ).';
    assert.equal(
      releaseSummaryHtml(body),
      `See <a href="https://a.com" ${ATTRS}>a</a> and <a href="https://b.com/x?y=1&amp;z=2" ${ATTRS}>b</a>.`,
    );
  });

  it("turns autolinks and bare URLs into anchors", () => {
    const body = "Docs: <https://hardhat.org/docs>, or https://hardhat.org.";
    assert.equal(
      releaseSummaryHtml(body),
      `Docs: <a href="https://hardhat.org/docs" ${ATTRS}>https://hardhat.org/docs</a>, or <a href="https://hardhat.org" ${ATTRS}>https://hardhat.org</a>.`,
    );
  });

  it("uses the URL as label when the link text is empty", () => {
    assert.equal(
      releaseSummaryHtml("[](https://hardhat.org)"),
      `<a href="https://hardhat.org" ${ATTRS}>https://hardhat.org</a>`,
    );
  });

  it("renders links with unsafe or relative destinations as plain text", () => {
    assert.equal(
      releaseSummaryHtml(
        "[click](javascript:alert(1)) [rel](/docs) [m](mailto:a@b.c) [d](data:text/html,x)",
      ),
      "click rel m d",
    );
  });

  it("escapes HTML in text, link labels and hrefs", () => {
    const body =
      '<img src=x onerror=alert(1)> [<b>x</b>](https://a.com/?q="onmouseover="alert(1))';
    assert.equal(
      releaseSummaryHtml(body),
      `&lt;img src=x onerror=alert(1)&gt; <a href="https://a.com/?q=&quot;onmouseover=&quot;alert(1)" ${ATTRS}>&lt;b&gt;x&lt;/b&gt;</a>`,
    );
  });

  it("does not treat stray brackets as links", () => {
    assert.equal(
      releaseSummaryHtml("Fixes [#123] and array[0] (see notes)"),
      "Fixes [#123] and array[0] (see notes)",
    );
  });

  it("returns an empty string for an empty body", () => {
    assert.equal(releaseSummaryHtml(""), "");
  });
});

describe("releaseBodyHtml", () => {
  it("wraps every paragraph in a <p> and renders links in each", () => {
    const body =
      "First, see [a](https://a.com).\n\n\nSecond   line\ncontinues.\n\n";
    assert.equal(
      releaseBodyHtml(body),
      `<p>First, see <a href="https://a.com" ${ATTRS}>a</a>.</p><p>Second line continues.</p>`,
    );
  });

  it("renders links as their label only when links are disabled", () => {
    const body = "See [a](https://a.com), <https://b.com> and https://c.com.";
    assert.equal(
      releaseBodyHtml(body, { links: false }),
      "<p>See a, https://b.com and https://c.com.</p>",
    );
  });

  it("drops paragraphs that end up empty, and returns nothing for an empty body", () => {
    assert.equal(
      releaseBodyHtml("![i](https://x.com/i.png)\n\nText"),
      "<p>Text</p>",
    );
    assert.equal(releaseBodyHtml(""), "");
  });
});
