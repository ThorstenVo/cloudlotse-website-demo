import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { assertLocalizedMetadata, assertNoExternalAssets } from "../scripts/check-built-site.mjs";

test("source design preview loads the complete localized bundle chain in order", async () => {
  const html = await readFile(new URL("../ui_kits/website/index.html", import.meta.url), "utf8");
  const sources = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(sources.slice(-9), [
    "dist/vendor.js",
    "../../_ds_bundle.js",
    "dist/i18n.js",
    "dist/LocaleSwitch.js",
    "dist/Chrome.js",
    "dist/Hero.js",
    "dist/Chapters.js",
    "dist/Closing.js",
    "dist/app.js",
  ]);
});

test("README describes the root-hosted live production site and functional locale switch", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /https:\/\/eazy\.cloud\//);
  assert.doesNotMatch(readme, /thorstenvo\.github\.io\/cloudlotse-website-demo/);
  assert.match(readme, /prerendered language routes/i);
  assert.match(readme, /persists? (the )?(chosen )?language|stores? (the )?(chosen )?language/i);
  assert.match(readme, /DE\/EN controls link between prerendered \/de\/ and \/en\//i);
  assert.match(readme, /locale comes from document lang/i);
  assert.match(readme, /shared copy comes from the validated catalog/i);
  assert.doesNotMatch(readme, /DE\/EN toggle is visual only/i);
  assert.doesNotMatch(readme, /(?:language\s+)?copy\s+swapp?(?:ing)?\s+(?:is\s+)?not built|copy swap not built/i);
  assert.doesNotMatch(readme, /`lang`,\s*`activeChapter`|lang state/i);
  assert.doesNotMatch(readme, /wire copy through i18n/i);
});

test("package test script rebuilds before generated-page assertions", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.match(pkg.scripts.test, /^npm run build && node --test tests\/\*\.test\.mjs && npm run check:site$/);
});

test("external stylesheet detection rejects href before rel", () => {
  assert.throws(
    () => assertNoExternalAssets('<link href="https://cdn.example/site.css" rel="stylesheet">'),
    /external stylesheet/i,
  );
});

test("built-site metadata validator rejects an incorrect localized description", () => {
  const html = '<html lang="de"><head><title>wrong</title><meta name="description" content="wrong"><link rel="canonical" href="https://eazy.cloud/de/"><link rel="alternate" hreflang="en" href="https://eazy.cloud/en/"><link rel="alternate" hreflang="de" href="https://eazy.cloud/de/"><link rel="alternate" hreflang="x-default" href="https://eazy.cloud/"></head></html>';
  assert.throws(() => assertLocalizedMetadata(html, "de"), /title/i);
});

test("localized homepages load only local scripts and stylesheets", async () => {
  for (const locale of ["en", "de"]) {
    const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");
    assert.doesNotMatch(html, /<script[^>]+src=["']https?:\/\//i);
    assert.doesNotMatch(html, /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']https?:\/\/)[^>]*>/i);
    assert.doesNotMatch(html, /type=["']text\/babel["']/i);
    assert.match(html, /\/ui_kits\/website\/dist\/i18n\.js/);
    assert.match(html, /\/ui_kits\/website\/dist\/app\.js/);
  }
});

test("privacy page contains the approved layered disclosures", async () => {
  const html = await readFile(new URL("../privacy/index.html", import.meta.url), "utf8");
  for (const heading of [
    "Privacy at a glance", "Controller", "Hosting and server logs", "Email contact",
    "Consent management", "Google Tag Manager and Google Analytics 4",
    "Cookies and similar technologies", "Your GDPR rights", "Policy updates",
  ]) assert.match(html, new RegExp(heading, "i"));
  assert.match(html, /eazy\.cloud/);
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
  assert.match(closing, /href="\/privacy\/"/);
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
