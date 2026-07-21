import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("homepage loads no external scripts or stylesheets", async () => {
  const html = await readFile(new URL("../ui_kits/website/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /<(?:script|link)[^>]+(?:src|href)=["']https?:\/\//i);
  assert.doesNotMatch(html, /type=["']text\/babel["']/i);
  assert.match(html, /dist\/vendor\.js/);
  assert.match(html, /dist\/app\.js/);
});
