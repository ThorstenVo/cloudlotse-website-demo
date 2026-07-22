import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  CHAPTER_IDS,
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

test("case-study process steps provide localized titles and supporting copy", () => {
  for (const locale of ["en", "de"]) {
    const steps = TRANSLATIONS[locale].caseStudy.steps;
    assert.equal(steps.length, 3);
    for (const step of steps) {
      assert.equal(typeof step.title, "string");
      assert.ok(step.title.length > 0);
      assert.equal(typeof step.copy, "string");
      assert.ok(step.copy.length > 0);
    }
  }
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

test("German catalog contains Thorsten's approved final copy", () => {
  const de = TRANSLATIONS.de;
  assert.deepEqual(
    {
      meta: de.meta,
      cta: de.cta,
      hero: de.hero,
      introThirdCopy: de.intro.rows[2].copy,
      chapterThreeCopy: de.chapters[2].copy,
      answerLabel: de.knowledge.answerLabel,
      footerProcessing: de.footer.processing,
    },
    {
      meta: {
        title: "eazy.cloud — Intelligente Workflows. Finden statt suchen.",
        description: "Intelligente Workflows verbinden Informationen, Wissen und Geschäftssysteme. So entstehen Workflows, die im Alltag funktionieren. Dabei bleibt unter Kontrolle, wo die Daten verarbeitet werden.",
      },
      cta: { label: "Arbeitsablauf besprechen", subject: "eazy.cloud Workflow-Prüfung" },
      hero: {
        kicker: "Ordnung für den Arbeitsalltag",
        lines: ["Weniger", "suchen.", "Schneller finden."],
        copy: "Verstreute Informationen werden zu einem geordneten Ablauf — eazy.cloud bringt Struktur in das tägliche Datenchaos.",
        noteTitle: "Alles am richtigen Platz zur richtigen Zeit",
        noteCopy: "Informationen bleiben auffindbar und gehören zum richtigen Vorgang.",
      },
      introThirdCopy: "Eine prüfbare Grundlage entsteht. Die Entscheidung bleibt beim Team. Langes Suchen entfällt.",
      chapterThreeCopy: "Informationen fließen vollständig zwischen den beteiligten Systemen — und bleiben beim richtigen Kunden oder Projekt für das gesamte Team verfügbar.",
      answerLabel: "Aus den Aventa-Unterlagen",
      footerProcessing: "EU-Datenverarbeitung in Vorbereitung",
    },
  );
});

test("translation catalog rejects empty required English strings", () => {
  const broken = structuredClone(TRANSLATIONS);
  broken.en.hero.copy = "";
  assert.throws(() => validateTranslations(broken), /en\.hero\.copy/);
});

test("translation catalog keeps the stable scroll chapter IDs in every locale", () => {
  assert.deepEqual(CHAPTER_IDS, ["tasks", "knowledge", "workflows"]);
  assert.doesNotThrow(() => validateTranslations(TRANSLATIONS));
  const broken = structuredClone(TRANSLATIONS);
  broken.de.chapters[1].id = "wissen";
  assert.throws(() => validateTranslations(broken), /de\.chapters\.1\.id/);
});

test("localized home link uses the catalogued accessible label", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chrome.jsx", import.meta.url), "utf8");
  assert.equal(TRANSLATIONS.en.a11y.home, "eazy.cloud home");
  assert.equal(TRANSLATIONS.de.a11y.home, "eazy.cloud Startseite");
  assert.match(source, /aria-label=\{copy\.a11y\.home\}/);
  assert.doesNotMatch(source, /aria-label="eazy\.cloud home"/);
});

test("German generated page uses its localized home label", async () => {
  const html = await readFile(new URL("../de/index.html", import.meta.url), "utf8");
  assert.match(html, /aria-label="eazy\.cloud Startseite"/);
  assert.doesNotMatch(html, /aria-label="eazy\.cloud home"/);
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

test("localized build outputs contain matching language and copy", async () => {
  const en = await readFile(new URL("../en/index.html", import.meta.url), "utf8");
  const de = await readFile(new URL("../de/index.html", import.meta.url), "utf8");
  assert.match(en, /<html lang="en">/);
  assert.match(en, /Intelligent workflows/);
  assert.match(de, /<html lang="de">/);
  assert.match(de, /Intelligente Workflows/);
  assert.doesNotMatch(de, /Review a workflow/);
  assert.ok((en.match(/<section/g) || []).length >= 10);
  assert.ok((de.match(/<section/g) || []).length >= 10);
});

test("root document is a language selector rather than duplicated page content", async () => {
  const root = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(root, /dist\/root-router\.js/);
  assert.match(root, /href="\/de\/"/);
  assert.match(root, /href="\/en\/"/);
  assert.doesNotMatch(root, /id="possibilities"/);
});

test("localized pages publish canonical and alternate metadata", async () => {
  for (const locale of ["en", "de"]) {
    const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");
    assert.match(html, new RegExp(`<link rel="canonical" href="https://eazy\\.cloud/${locale}/">`));
    assert.match(html, /hreflang="en" href="https:\/\/eazy\.cloud\/en\//);
    assert.match(html, /hreflang="de" href="https:\/\/eazy\.cloud\/de\//);
    assert.match(html, /hreflang="x-default" href="https:\/\/eazy\.cloud\//);
  }
});

test("each localized sitemap record contains the complete reciprocal alternate set", async () => {
  const xml = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  assert.match(xml, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  const records = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);

  for (const locale of ["en", "de"]) {
    const record = records.find((value) => value.includes(`<loc>https://eazy.cloud/${locale}/</loc>`));
    assert.ok(record, `missing ${locale} sitemap record`);
    assert.match(record, /<xhtml:link rel="alternate" hreflang="en" href="https:\/\/eazy\.cloud\/en\/" \/>/);
    assert.match(record, /<xhtml:link rel="alternate" hreflang="de" href="https:\/\/eazy\.cloud\/de\/" \/>/);
    assert.match(record, /<xhtml:link rel="alternate" hreflang="x-default" href="https:\/\/eazy\.cloud\/" \/>/);
  }
});
