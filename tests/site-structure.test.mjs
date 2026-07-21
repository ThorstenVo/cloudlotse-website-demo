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

test("privacy page contains the approved layered disclosures", async () => {
  const html = await readFile(new URL("../privacy/index.html", import.meta.url), "utf8");
  for (const heading of [
    "Privacy at a glance", "Controller", "Hosting and server logs", "Email contact",
    "Consent management", "Google Tag Manager and Google Analytics 4",
    "Cookies and similar technologies", "Your GDPR rights", "Policy updates",
  ]) assert.match(html, new RegExp(heading, "i"));
  assert.match(html, /cloudlotse OÜ/);
  assert.match(html, /Sepapaja tn 6/);
  assert.match(html, /voigt@eazy\.cloud/);
  assert.match(html, /seven days/i);
  assert.match(html, /12 months/i);
  assert.match(html, /two months/i);
  assert.match(html, /data-privacy-settings/);
});

test("homepage and legal pages expose working privacy navigation", async () => {
  const closing = await readFile(new URL("../ui_kits/website/Closing.jsx", import.meta.url), "utf8");
  const legal = await readFile(new URL("../legal/index.html", import.meta.url), "utf8");
  assert.match(closing, /href="\.\.\/\.\.\/privacy\/"/);
  assert.match(closing, /data-privacy-settings/);
  assert.match(legal, /href="\.\.\/privacy\/"/);
  assert.match(legal, /data-privacy-settings/);
});

test("README documents privacy-sensitive launch configuration", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /Analytics launch checklist/);
  assert.match(readme, /two months/i);
  assert.match(readme, /basic consent mode/i);
  assert.match(readme, /no GTM script, consent ping, or analytics request/i);
});
