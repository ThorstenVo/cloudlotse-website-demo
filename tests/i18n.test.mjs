import test from "node:test";
import assert from "node:assert/strict";
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
