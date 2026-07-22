import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  LANGUAGE_PREFERENCE_KEY,
  alternateLocale,
  chooseLocale,
  localizedPath,
  validateTranslations,
} from "../ui_kits/website/locale-core.mjs";
import { TRANSLATIONS } from "../ui_kits/website/translations.mjs";

test("stored language preference wins over browser language", () => {
  assert.equal(chooseLocale("en", ["de-DE"]), "en");
  assert.equal(chooseLocale("de", ["en-GB"]), "de");
});

test("browser languages choose German only when German is preferred before English", () => {
  assert.equal(chooseLocale(null, ["de-DE", "en-US"]), "de");
  assert.equal(chooseLocale(null, ["fr-FR", "de-DE", "en-US"]), "de");
  assert.equal(chooseLocale(null, ["fr-FR", "en-GB", "de-DE"]), "en");
  assert.equal(chooseLocale(null, []), "en");
});

test("locale helpers alternate languages and preserve only known hashes", () => {
  assert.equal(alternateLocale("en"), "de");
  assert.equal(alternateLocale("de"), "en");
  assert.equal(localizedPath("de", "#knowledge"), "/de/#knowledge");
  assert.equal(localizedPath("en", "#unknown"), "/en/");
  assert.equal(localizedPath("en", ""), "/en/");
  assert.throws(() => localizedPath("fr", ""), /Unsupported locale/);
});

test("translation catalog is complete and uses a versioned preference key", () => {
  assert.match(LANGUAGE_PREFERENCE_KEY, /_v1$/);
  assert.doesNotThrow(() => validateTranslations(TRANSLATIONS));
  const broken = structuredClone(TRANSLATIONS);
  delete broken.de.hero.copy;
  assert.throws(() => validateTranslations(broken), /de\.hero\.copy/);
});

test("translation catalog rejects empty required English strings", () => {
  const broken = structuredClone(TRANSLATIONS);
  broken.en.hero.copy = "";
  assert.throws(() => validateTranslations(broken), /en\.hero\.copy/);
});

test("page components consume localized copy instead of owning English UI strings", async () => {
  const files = ["Chrome.jsx", "Hero.jsx", "Chapters.jsx", "Closing.jsx"];
  for (const file of files) {
    const source = await readFile(new URL(`../ui_kits/website/${file}`, import.meta.url), "utf8");
    assert.match(source, /copy/);
    assert.doesNotMatch(source, /Review a workflow|What becomes possible|Trust & control|A useful first step/);
  }
});

test("chapter navigation uses a catalog-backed localized label instead of the design-system label", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chapters.jsx", import.meta.url), "utf8");
  assert.equal(TRANSLATIONS.en.a11y.chapters, "Chapters");
  assert.equal(TRANSLATIONS.de.a11y.chapters, "Kapitel");
  assert.doesNotMatch(source, /const\s*\{[^}]*\bChapterNav\b[^}]*\}\s*=\s*window\.CloudLotseDesignSystem_b0c356/);
  assert.match(source, /function ChapterNav\(/);
  assert.match(source, /aria-label=\{ariaLabel\}/);
  assert.match(source, /ariaLabel=\{copy\.a11y\.chapters\}/);
});
