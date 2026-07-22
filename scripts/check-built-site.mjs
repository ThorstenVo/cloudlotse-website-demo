import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const required = ["vendor", "i18n", "LocaleSwitch", "Chrome", "Hero", "Chapters", "Closing", "app"];
const localizedCta = {
  en: "Review a workflow",
  de: "Workflow prüfen lassen",
};

for (const name of required) {
  await access(new URL(`../ui_kits/website/dist/${name}.js`, import.meta.url));
}

for (const locale of ["en", "de"]) {
  const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");

  assert.match(html, new RegExp(`<html lang="${locale}">`));
  assert.doesNotMatch(html, /<script[^>]+src=["']https?:\/\//i);
  assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i);
  assert.ok((html.match(/<section/g) || []).length >= 10, `${locale} must prerender at least ten sections`);
  for (const name of required) assert.match(html, new RegExp(`/ui_kits/website/dist/${name}\\.js`));
  assert.match(html, new RegExp(localizedCta[locale]));
  assert.doesNotMatch(html, new RegExp(localizedCta[locale === "en" ? "de" : "en"]));
}

console.log("Built localized sites use local scripts and localized copy only.");
