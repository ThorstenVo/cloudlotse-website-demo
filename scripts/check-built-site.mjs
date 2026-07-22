import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const required = ["vendor", "i18n", "LocaleSwitch", "Chrome", "Hero", "Chapters", "Closing", "app"];
const localizedCta = {
  en: "Review a workflow",
  de: "Workflow prüfen lassen",
};

export function assertNoExternalAssets(html) {
  assert.doesNotMatch(html, /<script\b(?=[^>]*\bsrc=["']https?:\/\/)[^>]*>/i, "external script detected");
  assert.doesNotMatch(
    html,
    /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']https?:\/\/)[^>]*>/i,
    "external stylesheet detected",
  );
}

export async function checkBuiltSite() {
  for (const name of required) {
    await access(new URL(`../ui_kits/website/dist/${name}.js`, import.meta.url));
  }

  for (const locale of ["en", "de"]) {
    const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");

    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assertNoExternalAssets(html);
    assert.ok((html.match(/<section/g) || []).length >= 10, `${locale} must prerender at least ten sections`);
    for (const name of required) assert.match(html, new RegExp(`/ui_kits/website/dist/${name}\\.js`));
    assert.match(html, new RegExp(localizedCta[locale]));
    assert.doesNotMatch(html, new RegExp(localizedCta[locale === "en" ? "de" : "en"]));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkBuiltSite();
  console.log("Built localized sites use local scripts and localized copy only.");
}
