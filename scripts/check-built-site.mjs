import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { TRANSLATIONS } from "../ui_kits/website/translations.mjs";

const required = ["vendor", "i18n", "LocaleSwitch", "Chrome", "Hero", "Chapters", "Closing", "app"];
const productionUrl = "https://eazy.cloud";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function assertNoExternalAssets(html) {
  assert.doesNotMatch(html, /<script\b(?=[^>]*\bsrc=["']https?:\/\/)[^>]*>/i, "external script detected");
  assert.doesNotMatch(
    html,
    /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']https?:\/\/)[^>]*>/i,
    "external stylesheet detected",
  );
}

export function assertLocalizedMetadata(html, locale) {
  const copy = TRANSLATIONS[locale];
  assert.ok(copy, `unsupported locale ${locale}`);
  assert.match(html, new RegExp(`<title>${escapeRegex(copy.meta.title)}</title>`), `${locale} title must match the translation catalog`);
  assert.match(html, new RegExp(`<meta name="description" content="${escapeRegex(copy.meta.description)}">`), `${locale} description must match the translation catalog`);
  assert.match(html, new RegExp(`<link rel="canonical" href="${productionUrl}/${locale}/">`), `${locale} canonical must be self-referencing`);
  for (const [alternate, href] of Object.entries({ en: `${productionUrl}/en/`, de: `${productionUrl}/de/`, "x-default": `${productionUrl}/` })) {
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="${alternate}" href="${escapeRegex(href)}">`), `${locale} must publish its ${alternate} alternate`);
  }
}

export async function checkBuiltSite() {
  for (const name of required) {
    await access(new URL(`../ui_kits/website/dist/${name}.js`, import.meta.url));
  }

  for (const locale of ["en", "de"]) {
    const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");

    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assertLocalizedMetadata(html, locale);
    assertNoExternalAssets(html);
    assert.ok((html.match(/<section/g) || []).length >= 10, `${locale} must prerender at least ten sections`);
    for (const name of required) assert.match(html, new RegExp(`/ui_kits/website/dist/${name}\\.js`));
    assert.match(html, new RegExp(escapeRegex(TRANSLATIONS[locale].cta.label)));
    assert.doesNotMatch(html, new RegExp(escapeRegex(TRANSLATIONS[locale === "en" ? "de" : "en"].cta.label)));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkBuiltSite();
  console.log("Built localized sites use local scripts and localized copy only.");
}
