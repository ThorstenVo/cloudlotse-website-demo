# Bilingual German/English Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish complete German and English versions of the eazy.cloud main page at `/de/` and `/en/`, with a persistent language selector, browser-language routing at `/`, and fully prerendered localized HTML.

**Architecture:** A pure locale core owns routing and validation, while one translation catalog owns all localized copy. Shared React components render a locale supplied by each prerendered document; the build emits two localized pages plus a small root language router. Language controls remain ordinary links and enhance clicks to persist preference and retain known section hashes.

**Tech Stack:** React 18.3.1, ReactDOM hydration, esbuild 0.25.6, Node.js test runner, jsdom 26.1.0, static HTML/CSS, XML sitemap

## Global Constraints

- German copy must be idiomatic B2B marketing German and avoid direct address (`du` and `Sie`) wherever possible.
- Preserve the English page's meaning, examples, numerical claims, section order, visual identity, and consent behavior.
- Publish only `de` and `en`; do not add an i18n dependency or CMS.
- Translate only the main page. `/legal/` and `/privacy/` remain English in this iteration.
- `/` chooses a stored explicit preference first, then German for a German browser language, otherwise English.
- `/de/` and `/en/` derive locale only from the generated document and never rerun browser-language detection.
- Language switching retains only these hashes: `#possibilities`, `#tasks`, `#knowledge`, `#workflows`, `#approach`, `#contact`.
- Missing, extra, unsupported, or empty required translations fail the build; mixed-language fallback is forbidden.
- Both localized pages must be fully readable without JavaScript and hydrate without markup mismatch.
- Do not deploy during implementation. Live deployment remains a separate explicitly authorized action through `~/bin/` wrappers.

---

## File map

- Create `ui_kits/website/locale-core.mjs`: pure locale normalization, browser selection, alternate-path generation, storage constants, hash allowlist, and translation-shape validation.
- Create `ui_kits/website/translations.mjs`: complete `en` and `de` main-page copy and document metadata.
- Create `ui_kits/website/i18n-entry.js`: exposes locale core and translations to the existing non-module browser bundles as `window.EazyCloudI18n`.
- Create `ui_kits/website/root-router-entry.js`: small root-only browser entry that selects and redirects to a localized URL.
- Create `ui_kits/website/LocaleSwitch.jsx`: shared accessible DE/EN control for header, mobile menu, and footer.
- Create `ui_kits/website/page-template.html`: localized-page shell with metadata tokens, empty `#root`, and root-absolute shared resources.
- Create `ui_kits/website/root-template.html`: non-content language entry page with a no-JavaScript language chooser.
- Modify `ui_kits/website/{app,Chrome,Hero,Chapters,Closing}.jsx`: consume localized copy and replace hard-coded strings.
- Modify `scripts/build.mjs`: compile the two new entries and `LocaleSwitch.jsx`.
- Modify `scripts/prerender.mjs`: validate translations and emit `de/index.html`, `en/index.html`, and root `index.html`.
- Modify `scripts/check-built-site.mjs`: validate both generated localized documents and local-only assets.
- Modify `tests/site-structure.test.mjs`: update root-path expectations.
- Create `tests/i18n.test.mjs`: locale selection, routing, catalog validation, and localized build assertions.
- Modify `sitemap.xml`: list localized canonical URLs and alternates.
- Modify `README.md`: document localized build outputs and local verification.

---

### Task 1: Locale core and complete translation catalog

**Files:**
- Create: `ui_kits/website/locale-core.mjs`
- Create: `ui_kits/website/translations.mjs`
- Create: `tests/i18n.test.mjs`

**Interfaces:**
- Produces: `SUPPORTED_LOCALES`, `LANGUAGE_PREFERENCE_KEY`, `KNOWN_HASHES`, `normalizeLocale(value)`, `chooseLocale(stored, browserLanguages)`, `alternateLocale(locale)`, `localizedPath(locale, hash)`, `validateTranslations(catalog)`.
- Produces: `TRANSLATIONS.en` and `TRANSLATIONS.de` with identical nested shapes.
- Consumes: no application files; all helpers are pure and importable by Node tests.

- [ ] **Step 1: Write failing locale-core tests**

Create `tests/i18n.test.mjs` with these initial tests:

```js
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
```

- [ ] **Step 2: Run the tests and confirm the imports fail**

Run: `node --test tests/i18n.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `locale-core.mjs`.

- [ ] **Step 3: Implement the pure locale core**

Create `ui_kits/website/locale-core.mjs`:

```js
export const SUPPORTED_LOCALES = Object.freeze(["en", "de"]);
export const LANGUAGE_PREFERENCE_KEY = "eazycloud_language_v1";
export const KNOWN_HASHES = Object.freeze([
  "#possibilities", "#tasks", "#knowledge", "#workflows", "#approach", "#contact",
]);

export function normalizeLocale(value) {
  if (typeof value !== "string") return null;
  const locale = value.trim().toLowerCase().split("-")[0];
  return SUPPORTED_LOCALES.includes(locale) ? locale : null;
}

export function chooseLocale(stored, browserLanguages = []) {
  const explicit = normalizeLocale(stored);
  if (explicit) return explicit;
  for (const candidate of browserLanguages) {
    const locale = normalizeLocale(candidate);
    if (locale) return locale;
  }
  return "en";
}

export function alternateLocale(locale) {
  const normalized = normalizeLocale(locale);
  if (!normalized) throw new Error(`Unsupported locale: ${locale}`);
  return normalized === "en" ? "de" : "en";
}

export function localizedPath(locale, hash = "") {
  const normalized = normalizeLocale(locale);
  if (!normalized) throw new Error(`Unsupported locale: ${locale}`);
  const safeHash = KNOWN_HASHES.includes(hash) ? hash : "";
  return `/${normalized}/${safeHash}`;
}

function compareShape(reference, candidate, path) {
  if (typeof reference === "string") {
    if (typeof candidate !== "string" || candidate.trim() === "") {
      throw new Error(`Invalid translation at ${path}`);
    }
    return;
  }
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || candidate.length !== reference.length) {
      throw new Error(`Translation array mismatch at ${path}`);
    }
    reference.forEach((value, index) => compareShape(value, candidate[index], `${path}.${index}`));
    return;
  }
  const referenceKeys = Object.keys(reference).sort();
  const candidateKeys = candidate && typeof candidate === "object" ? Object.keys(candidate).sort() : [];
  if (referenceKeys.join("|") !== candidateKeys.join("|")) {
    const allKeys = new Set([...referenceKeys, ...candidateKeys]);
    const mismatched = [...allKeys].find((key) => !referenceKeys.includes(key) || !candidateKeys.includes(key));
    throw new Error(`Translation shape mismatch at ${path}.${mismatched}`);
  }
  for (const key of referenceKeys) compareShape(reference[key], candidate[key], `${path}.${key}`);
}

export function validateTranslations(catalog) {
  const locales = Object.keys(catalog).sort();
  if (locales.join("|") !== [...SUPPORTED_LOCALES].sort().join("|")) {
    throw new Error(`Unsupported translation locales: ${locales.join(", ")}`);
  }
  compareShape(catalog.en, catalog.de, "de");
  return true;
}
```

- [ ] **Step 4: Create the complete catalog**

Create `ui_kits/website/translations.mjs`. Use the following exact schema and approved German copy. Preserve JSX emphasis by storing headings as `before`/`emphasis`/`after` segments instead of markup strings.

```js
export const TRANSLATIONS = Object.freeze({
  en: {
    meta: { title: "eazy.cloud — Intelligent workflows. Clear paths.", description: "Intelligent workflows that connect information, knowledge and business systems — with control over where data is processed." },
    a11y: { mainNav: "Main navigation", mobileNav: "Mobile navigation", language: "Language", openMenu: "Open menu", closeMenu: "Close menu" },
    nav: { possibilities: "Possibilities", approach: "Approach", contact: "Contact" },
    cta: { label: "Review a workflow", subject: "eazy.cloud workflow review" },
    hero: { kicker: "Intelligence for everyday work", lines: ["Intelligent", "workflows.", "Clear paths."], copy: "Scattered information becomes an ordered flow — eazy.cloud brings order to the daily data chaos.", noteTitle: "From clutter to clarity", noteCopy: "Links, PDFs, photos and notes find their place." },
    intro: { label: "What becomes possible", heading: { before: "From chaos to ", emphasis: "clarity.", after: "" }, rows: [
      { title: { before: "Recognise ", emphasis: "information", after: "" }, copy: "Requirements, sources and context are captured automatically — nothing has to be searched twice." },
      { title: { before: "Connect knowledge", emphasis: "", after: "" }, copy: "Links, PDFs, photos and notes are linked to the right project and made usable." },
      { title: { before: "Prepare work", emphasis: "", after: "" }, copy: "A review-ready foundation is assembled. Your team decides — it no longer searches." },
    ] },
    chapters: [
      { id: "tasks", no: "01", title: "Take over tasks", small: "Hand over recurring preparation", copy: "The workflow recognises, organises and prepares. Your team reviews, decides and moves the work forward.", alt: "Automated digital workflow preparing tasks" },
      { id: "knowledge", no: "02", title: "Make knowledge available", small: "Answers from the right context", copy: "Links, PDFs, photos and notes become useful exactly where the team needs a reliable answer.", alt: "Connected project knowledge base" },
      { id: "workflows", no: "03", title: "Connect workflows", small: "Handoffs without duplicate work", copy: "Information moves completely between the systems involved — and stays with the right customer or project, available to the whole team.", alt: "Workflow performance growth dashboard" },
    ],
    caseStudy: { label: "Example / Nordwerk", heading: { before: "From 130 minutes of manual work to a ", emphasis: "25-minute review.", after: "" }, beforeLabel: "Before · by hand", beforeCopy: "Search sources, transfer figures and assemble the proposal foundation manually.", bridge: "With flow", afterLabel: "With eazy.cloud", afterCopy: "The workflow prepares the foundation. Your team reviews and decides.", saving: "less time on search & transfer per enquiry", steps: ["Recognise", "Connect", "Prepare"] },
    knowledge: { questionLabel: "Question", question: "What needs to be included in the proposal, and which points are still open?", heading: { before: "An ", emphasis: "evidence-based answer", after: " — built only from the project's own sources." }, answerLabel: "Answer from the Aventa opportunity", answer: "The proposal should include onboarding for 35 users, migration of the existing document archive and two training sessions. The final licence count and preferred launch date still need confirmation.", sources: "Sources: Discovery call ¹ · Requirements email ² · Meeting notes ³" },
    systems: { label: "Example / Customer service", heading: { before: "Every handoff carries ", emphasis: "everything the next step needs.", after: "" }, steps: [
      { no: "01 / Input", title: "Customer enquiry", points: ["Request details", "Attachments"] },
      { no: "02 / Context", title: "Customer & project knowledge", points: ["Linked project", "History"] },
      { no: "03 / Processing", title: "Business system", points: ["Status", "Documents"] },
      { no: "04 / Next", title: "Next task", points: ["Owner", "Everything attached"] },
    ], outcomeLabel: "Outcome", outcome: "The handoff contains everything the next step needs. Your team controls the process, not the data transfer." },
    trust: { label: "Trust & control", heading: { before: "Your customer data stays ", emphasis: "where it belongs.", after: "" }, copy: "The operating model fits the task — not the other way around. Choose how and where each workflow runs, based on the data, risk and level of control you need.", cards: [
      { loc: "EU · managed", title: "Private cloud", points: ["Runs in a dedicated EU environment", "Data isolated per customer", "No shared multi-tenant models"] },
      { loc: "On-prem · your infra", title: "Self-hosted", points: ["Runs inside your own infrastructure", "Nothing leaves your network", "Open-source foundation you can audit"] },
      { loc: "Opt-in · per workflow", title: "Connected services", points: ["Use external models where it's the right call", "A conscious, transparent decision each time", "Visible — never a blanket upload"] },
    ], foundationLabel: "Foundation", foundation: "Open source & auditable · EU-based · no customer data used for training." },
    final: { label: "A useful first step", heading: { before: "Which workflow costs your team ", emphasis: "unnecessary time", after: " every day?" }, copy: "We look at the specific bottleneck, review the data and systems involved and show what a working workflow could look like." },
    footer: { claim: "Intelligent workflows that bring order to the daily data chaos.", navigation: "Navigation", contact: "Contact", legal: "Legal", legalNotice: "Legal notice", privacy: "Privacy", processing: "EU data processing — in preparation", privacySettings: "Privacy settings", copyright: "© 2026 eazy.cloud · Intelligent workflows for business" },
  },
  de: {
    meta: { title: "eazy.cloud — Intelligente Workflows. Klare Wege.", description: "Intelligente Workflows verbinden Informationen, Wissen und Geschäftssysteme — mit Kontrolle darüber, wo Daten verarbeitet werden." },
    a11y: { mainNav: "Hauptnavigation", mobileNav: "Mobile Navigation", language: "Sprache", openMenu: "Menü öffnen", closeMenu: "Menü schließen" },
    nav: { possibilities: "Möglichkeiten", approach: "Ansatz", contact: "Kontakt" },
    cta: { label: "Workflow prüfen lassen", subject: "eazy.cloud Workflow-Prüfung" },
    hero: { kicker: "Intelligenz für den Arbeitsalltag", lines: ["Intelligente", "Workflows.", "Klare Wege."], copy: "Verstreute Informationen werden zu einem geordneten Ablauf — eazy.cloud bringt Struktur in das tägliche Datenchaos.", noteTitle: "Vom Durcheinander zur Klarheit", noteCopy: "Links, PDFs, Fotos und Notizen finden ihren Platz." },
    intro: { label: "Was möglich wird", heading: { before: "Vom Chaos zur ", emphasis: "Klarheit.", after: "" }, rows: [
      { title: { before: "Informationen ", emphasis: "erkennen", after: "" }, copy: "Anforderungen, Quellen und Zusammenhänge werden automatisch erfasst — nichts muss zweimal gesucht werden." },
      { title: { before: "Wissen verknüpfen", emphasis: "", after: "" }, copy: "Links, PDFs, Fotos und Notizen werden dem richtigen Projekt zugeordnet und nutzbar gemacht." },
      { title: { before: "Arbeit vorbereiten", emphasis: "", after: "" }, copy: "Eine prüfungsreife Grundlage entsteht. Die Entscheidung bleibt beim Team — die Suche entfällt." },
    ] },
    chapters: [
      { id: "tasks", no: "01", title: "Aufgaben übernehmen", small: "Wiederkehrende Vorbereitung übergeben", copy: "Der Workflow erkennt, ordnet und bereitet vor. Prüfung und Entscheidung bleiben beim Team, die Arbeit kommt schneller voran.", alt: "Automatisierter digitaler Workflow zur Vorbereitung von Aufgaben" },
      { id: "knowledge", no: "02", title: "Wissen verfügbar machen", small: "Antworten aus dem richtigen Kontext", copy: "Links, PDFs, Fotos und Notizen werden genau dort nutzbar, wo eine verlässliche Antwort gebraucht wird.", alt: "Vernetzte Wissensbasis für Projektinformationen" },
      { id: "workflows", no: "03", title: "Abläufe verbinden", small: "Übergaben ohne doppelte Arbeit", copy: "Informationen fließen vollständig zwischen den beteiligten Systemen — und bleiben beim richtigen Kunden oder Projekt für das gesamte Team verfügbar.", alt: "Dashboard zur Leistung vernetzter Workflows" },
    ],
    caseStudy: { label: "Beispiel / Nordwerk", heading: { before: "Von 130 Minuten Handarbeit zu einer ", emphasis: "25-minütigen Prüfung.", after: "" }, beforeLabel: "Vorher · von Hand", beforeCopy: "Quellen suchen, Zahlen übertragen und die Angebotsgrundlage manuell zusammenstellen.", bridge: "Mit Workflow", afterLabel: "Mit eazy.cloud", afterCopy: "Der Workflow bereitet die Grundlage vor. Prüfung und Entscheidung bleiben beim Team.", saving: "weniger Zeit für Suche und Übertragung pro Anfrage", steps: ["Erkennen", "Verknüpfen", "Vorbereiten"] },
    knowledge: { questionLabel: "Frage", question: "Was muss in das Angebot aufgenommen werden und welche Punkte sind noch offen?", heading: { before: "Eine ", emphasis: "belegbare Antwort", after: " — ausschließlich aus den eigenen Projektquellen." }, answerLabel: "Antwort aus der Verkaufschance Aventa", answer: "Das Angebot sollte das Onboarding für 35 Nutzer, die Migration des bestehenden Dokumentenarchivs und zwei Schulungen enthalten. Die endgültige Lizenzanzahl und der bevorzugte Starttermin müssen noch bestätigt werden.", sources: "Quellen: Erstgespräch ¹ · Anforderungs-E-Mail ² · Besprechungsnotizen ³" },
    systems: { label: "Beispiel / Kundenservice", heading: { before: "Jede Übergabe enthält ", emphasis: "alles für den nächsten Schritt.", after: "" }, steps: [
      { no: "01 / Eingang", title: "Kundenanfrage", points: ["Anfragedetails", "Anhänge"] },
      { no: "02 / Kontext", title: "Kunden- und Projektwissen", points: ["Verknüpftes Projekt", "Verlauf"] },
      { no: "03 / Verarbeitung", title: "Geschäftssystem", points: ["Status", "Dokumente"] },
      { no: "04 / Weiter", title: "Nächste Aufgabe", points: ["Verantwortung", "Alle Informationen angehängt"] },
    ], outcomeLabel: "Ergebnis", outcome: "Die Übergabe enthält alles, was der nächste Schritt braucht. Das Team steuert den Prozess — nicht den Datentransfer." },
    trust: { label: "Vertrauen & Kontrolle", heading: { before: "Kundendaten bleiben ", emphasis: "dort, wo sie hingehören.", after: "" }, copy: "Das Betriebsmodell richtet sich nach der Aufgabe — nicht umgekehrt. Wo ein Workflow läuft, entscheidet sich nach Daten, Risiko und dem erforderlichen Maß an Kontrolle.", cards: [
      { loc: "EU · verwaltet", title: "Private Cloud", points: ["Betrieb in einer dedizierten EU-Umgebung", "Getrennte Datenhaltung je Kunde", "Keine gemeinsam genutzten Multi-Tenant-Modelle"] },
      { loc: "On-Prem · eigene Infrastruktur", title: "Self-Hosted", points: ["Betrieb in der eigenen Infrastruktur", "Keine Daten verlassen das eigene Netzwerk", "Prüfbare Open-Source-Grundlage"] },
      { loc: "Opt-in · je Workflow", title: "Verbundene Dienste", points: ["Externe Modelle nur, wenn sie die richtige Wahl sind", "Jedes Mal eine bewusste und transparente Entscheidung", "Sichtbar und gezielt — kein pauschaler Upload"] },
    ], foundationLabel: "Grundlage", foundation: "Open Source & prüfbar · EU-basiert · keine Kundendaten für das Training." },
    final: { label: "Ein sinnvoller erster Schritt", heading: { before: "Welcher Workflow kostet im Alltag ", emphasis: "unnötig Zeit", after: "?" }, copy: "Der konkrete Engpass, die beteiligten Daten und Systeme werden gemeinsam betrachtet. Daraus entsteht ein klares Bild, wie ein funktionierender Workflow aussehen kann." },
    footer: { claim: "Intelligente Workflows bringen Struktur in das tägliche Datenchaos.", navigation: "Navigation", contact: "Kontakt", legal: "Rechtliches", legalNotice: "Impressum", privacy: "Datenschutz", processing: "EU-Datenverarbeitung — in Vorbereitung", privacySettings: "Datenschutzeinstellungen", copyright: "© 2026 eazy.cloud · Intelligente Workflows für Unternehmen" },
  },
});
```

- [ ] **Step 5: Run locale tests and review copy mechanically**

Run: `node --test tests/i18n.test.mjs`

Expected: 4 tests PASS.

Run: `rg -n '\b(du|dein|Sie|Ihr|Ihnen)\b' ui_kits/website/translations.mjs`

Expected: no matches in German copy.

- [ ] **Step 6: Commit the locale core and catalog**

```bash
git add ui_kits/website/locale-core.mjs ui_kits/website/translations.mjs tests/i18n.test.mjs
git commit -m "feat: add validated German and English content"
```

---

### Task 2: Localized React components and accessible language controls

**Files:**
- Create: `ui_kits/website/i18n-entry.js`
- Create: `ui_kits/website/LocaleSwitch.jsx`
- Modify: `ui_kits/website/app.jsx`
- Modify: `ui_kits/website/Chrome.jsx`
- Modify: `ui_kits/website/Hero.jsx`
- Modify: `ui_kits/website/Chapters.jsx`
- Modify: `ui_kits/website/Closing.jsx`
- Modify: `scripts/build.mjs`
- Modify: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: Task 1 exports through `window.EazyCloudI18n`.
- Produces: `LocaleSwitch({ locale, compact })`, `Site` locale derived from `document.documentElement.lang`, and all page components accepting a `copy` prop.
- Produces: browser bundles `ui_kits/website/dist/i18n.js` and `ui_kits/website/dist/LocaleSwitch.js`.

- [ ] **Step 1: Add a failing component-source localization test**

Append to `tests/i18n.test.mjs`:

```js
import { readFile } from "node:fs/promises";

test("page components consume localized copy instead of owning English UI strings", async () => {
  const files = ["Chrome.jsx", "Hero.jsx", "Chapters.jsx", "Closing.jsx"];
  for (const file of files) {
    const source = await readFile(new URL(`../ui_kits/website/${file}`, import.meta.url), "utf8");
    assert.match(source, /copy/);
    assert.doesNotMatch(source, /Review a workflow|What becomes possible|Trust & control|A useful first step/);
  }
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `node --test --test-name-pattern="page components" tests/i18n.test.mjs`

Expected: FAIL because current components contain hard-coded English strings.

- [ ] **Step 3: Expose the locale API to browser bundles**

Create `ui_kits/website/i18n-entry.js`:

```js
import * as core from "./locale-core.mjs";
import { TRANSLATIONS } from "./translations.mjs";

core.validateTranslations(TRANSLATIONS);
window.EazyCloudI18n = Object.freeze({ ...core, TRANSLATIONS });
```

- [ ] **Step 4: Implement one shared progressive-enhancement language control**

Create `ui_kits/website/LocaleSwitch.jsx`:

```jsx
(() => {
const { LANGUAGE_PREFERENCE_KEY, alternateLocale, localizedPath } = window.EazyCloudI18n;

function saveLocale(locale) {
  try { window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, locale); } catch (_) {}
}

function LocaleSwitch({ locale, compact = false }) {
  const other = alternateLocale(locale);
  const baseStyle = { padding: compact ? "7px 9px" : "9px 8px", minWidth: compact ? undefined : 34, fontSize: 9, fontWeight: 800, lineHeight: 1, textAlign: "center", textDecoration: "none" };
  const activeStyle = { ...baseStyle, color: "var(--ink)", background: "var(--signal)" };
  const linkStyle = { ...baseStyle, color: compact ? "#aeb6af" : "var(--white)", background: "transparent" };
  const switchLanguage = (event) => {
    event.preventDefault();
    saveLocale(other);
    window.location.assign(localizedPath(other, window.location.hash));
  };
  return (
    <span style={{ display: "inline-flex", border: "1px solid rgb(255 255 255 / 35%)" }} aria-label={window.EazyCloudI18n.TRANSLATIONS[locale].a11y.language}>
      {locale === "de"
        ? <><span aria-current="page" style={activeStyle}>DE</span><a href="/en/" onClick={switchLanguage} style={linkStyle}>EN</a></>
        : <><a href="/de/" onClick={switchLanguage} style={linkStyle}>DE</a><span aria-current="page" style={activeStyle}>EN</span></>}
    </span>
  );
}

Object.assign(window, { LocaleSwitch });
})();
```

The server-rendered `href` deliberately omits the current hash. The click enhancement reads the live hash after hydration, preventing a server/client `href` mismatch while still preserving the section during normal interactive switching.

- [ ] **Step 5: Make `Site` derive and distribute locale copy**

Change the start of `Site` in `ui_kits/website/app.jsx` to:

```jsx
function Site() {
  const { TopBar, Hero, Intro, Chapters, Trust, Final, Footer } = window;
  const { normalizeLocale, TRANSLATIONS } = window.EazyCloudI18n;
  const locale = normalizeLocale(document.documentElement.lang);
  if (!locale) throw new Error(`Unsupported document locale: ${document.documentElement.lang}`);
  const copy = TRANSLATIONS[locale];
  const [active, setActive] = React.useState("tasks");
```

Replace the render calls with:

```jsx
<TopBar locale={locale} copy={copy} />
<Hero copy={copy} />
<Intro copy={copy} />
<Chapters copy={copy} active={active} setActive={setActive} />
<Trust copy={copy} />
<Final copy={copy} />
<Footer locale={locale} copy={copy} />
```

Remove the old `lang` state and `setLang` props completely.

- [ ] **Step 6: Replace hard-coded strings in `Chrome.jsx` and `Hero.jsx`**

In `Chrome.jsx`, remove `LanguageToggle` from the design-system destructuring. Build navigation from stable IDs and localized labels:

```jsx
const NAV_IDS = ["possibilities", "approach", "contact"];

function TopBar({ locale, copy }) {
  const [open, setOpen] = React.useState(false);
  const nav = NAV_IDS.map((id) => ({ id, label: copy.nav[id] }));
  const mailto = `mailto:voigt@eazy.cloud?subject=${encodeURIComponent(copy.cta.subject)}`;
```

Render `nav` with `href={"#" + item.id}`, use `copy.a11y.mainNav`, `copy.a11y.mobileNav`, `copy.a11y.openMenu`, and `copy.a11y.closeMenu`, render `<LocaleSwitch locale={locale} />` in both action areas, and use `copy.cta.label` for both CTA buttons.

Change `Hero` and `Intro` to `Hero({ copy })` and `Intro({ copy })`. Map `copy.hero.lines`; use `copy.hero.kicker`, `copy.hero.copy`, `copy.hero.noteTitle`, `copy.hero.noteCopy`, `copy.cta`, `copy.intro.label`, `copy.intro.heading`, and `copy.intro.rows`. Render every segmented heading with this explicit pattern:

```jsx
{heading.before}{heading.emphasis && <em style={{ color: "var(--signal)", fontStyle: "normal" }}>{heading.emphasis}</em>}{heading.after}
```

- [ ] **Step 7: Replace hard-coded strings in `Chapters.jsx` and `Closing.jsx`**

In `Chapters.jsx`, remove the module-level `CH`. Change `Chapters` to accept `copy` and pass `copy.chapters` to `ChapterNav`. Feed each stage from `copy.chapters[index]`; use `copy.caseStudy`, `copy.knowledge`, and `copy.systems` in their respective detail components. Keep IDs, numbers, image sources, time figures, CSS classes, and layout styles unchanged.

In `Closing.jsx`, change `Trust`, `Final`, and `Footer` to accept `copy`; `Footer` also accepts `locale`. Replace the three trust-card literals with `copy.trust.cards`, final strings with `copy.final`, and footer strings with `copy.footer`. Build footer navigation from the same stable `possibilities`, `approach`, and `contact` IDs. Render `<LocaleSwitch locale={locale} compact />` in the footer. Use root-absolute `href="/legal/"` and `href="/privacy/"`; German labels come from the catalog while destinations remain English.

- [ ] **Step 8: Compile the new browser entries in the correct order**

In `scripts/build.mjs`, add `LocaleSwitch.jsx` to `jsxSources`, then add this bundle call before the JSX transform loop:

```js
await build({
  entryPoints: [path.join(sourceDir, "i18n-entry.js")],
  outfile: path.join(outDir, "i18n.js"),
  bundle: true,
  minify: true,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
});
```

The localized template created in Task 3 must load scripts in this order: `vendor.js`, `_ds_bundle.js`, `i18n.js`, `LocaleSwitch.js`, `Chrome.js`, `Hero.js`, `Chapters.js`, `Closing.js`, `app.js`.

- [ ] **Step 9: Run tests and compile bundles**

Run: `node --test tests/i18n.test.mjs && node scripts/build.mjs`

Expected: all i18n tests PASS; build exits 0 and creates `dist/i18n.js` and `dist/LocaleSwitch.js`.

- [ ] **Step 10: Commit localized components**

```bash
git add ui_kits/website scripts/build.mjs tests/i18n.test.mjs
git commit -m "feat: render shared components from localized copy"
```

---

### Task 3: Localized prerendering and root language routing

**Files:**
- Create: `ui_kits/website/page-template.html`
- Create: `ui_kits/website/root-template.html`
- Create: `ui_kits/website/root-router-entry.js`
- Modify: `scripts/build.mjs`
- Modify: `scripts/prerender.mjs`
- Modify: `tests/i18n.test.mjs`
- Generated: `de/index.html`
- Generated: `en/index.html`
- Generated: `index.html`

**Interfaces:**
- Consumes: Task 1 `chooseLocale`, `localizedPath`, `validateTranslations`; Task 2 browser bundles and localized components.
- Produces: static locale documents and root selector; `npm run build` becomes the single generation command.

- [ ] **Step 1: Add failing routing and generated-document tests**

Append to `tests/i18n.test.mjs`:

```js
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
```

- [ ] **Step 2: Run generated-document tests and confirm failure**

Run: `node --test --test-name-pattern="localized build|root document" tests/i18n.test.mjs`

Expected: FAIL because `/de/` and `/en/` have not been generated and root still contains the English page.

- [ ] **Step 3: Create the root router entry**

Create `ui_kits/website/root-router-entry.js`:

```js
import { LANGUAGE_PREFERENCE_KEY, chooseLocale, localizedPath } from "./locale-core.mjs";

let stored = null;
try { stored = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY); } catch (_) {}
const languages = Array.isArray(window.navigator.languages)
  ? window.navigator.languages
  : [window.navigator.language].filter(Boolean);
const locale = chooseLocale(stored, languages);
window.location.replace(localizedPath(locale, window.location.hash));
```

Add this second bundle call to `scripts/build.mjs` immediately after the `i18n-entry.js` bundle call:

```js
await build({
  entryPoints: [path.join(sourceDir, "root-router-entry.js")],
  outfile: path.join(outDir, "root-router.js"),
  bundle: true,
  minify: true,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
});
```

- [ ] **Step 4: Create exact HTML templates**

Create `ui_kits/website/page-template.html` with tokens `%%LANG%%`, `%%TITLE%%`, `%%DESCRIPTION%%`, `%%CANONICAL%%`, and `%%ROOT_MARKUP%%`. Its head must contain:

```html
<html lang="%%LANG%%">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>%%TITLE%%</title>
<meta name="description" content="%%DESCRIPTION%%">
<link rel="canonical" href="%%CANONICAL%%">
<link rel="alternate" hreflang="en" href="https://eazy.cloud/en/">
<link rel="alternate" hreflang="de" href="https://eazy.cloud/de/">
<link rel="alternate" hreflang="x-default" href="https://eazy.cloud/">
<link rel="icon" href="/assets/eazycloud.ico">
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/mobile.css">
<link rel="stylesheet" href="/privacy/consent.css">
<style>*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#070807;color:var(--ink);font-family:var(--font-sans)}img{display:block;max-width:100%}</style>
</head>
```

Its body must contain `<div id="root">%%ROOT_MARKUP%%</div>` followed by root-absolute scripts in the load order documented in Task 2, with privacy scripts first as today.

Create `ui_kits/website/root-template.html` as a compact neutral page with links to `/en/` and `/de/`, `<meta name="robots" content="noindex,follow">`, the three alternate links above, and `<script src="/ui_kits/website/dist/root-router.js"></script>`. The visible fallback heading is `Choose language / Sprache wählen`; no main-page marketing copy is included.

- [ ] **Step 5: Rewrite prerendering as a locale loop**

Modify `scripts/prerender.mjs` to import `mkdir`, `TRANSLATIONS`, and `validateTranslations`, validate once, and loop over `["en", "de"]`. For each locale:

1. Create jsdom with `<html lang="${locale}">` and an empty `#root`.
2. Evaluate bundles in the documented order, including `dist/i18n.js` and `dist/LocaleSwitch.js`.
3. Require at least 2,000 characters of markup.
4. Read `page-template.html` fresh.
5. Replace every metadata token and `%%ROOT_MARKUP%%`.
6. Create the locale directory and write `<locale>/index.html`.

Use this exact token replacement helper:

```js
function replaceToken(html, token, value) {
  const marker = `%%${token}%%`;
  if (!html.includes(marker)) throw new Error(`Missing template token ${marker}`);
  return html.split(marker).join(value);
}
```

After the loop, copy `root-template.html` to root `index.html`. Do not prerender main-page markup into root.

- [ ] **Step 6: Build and run routing tests**

Run: `npm run build && node --test tests/i18n.test.mjs`

Expected: build reports substantial markup for `en` and `de`; all i18n tests PASS.

- [ ] **Step 7: Verify prerender output is stable across repeated builds**

Run:

```bash
npm run build
shasum en/index.html de/index.html > /tmp/eazycloud-locale-sha-before
npm run build
shasum en/index.html de/index.html > /tmp/eazycloud-locale-sha-after
diff -u /tmp/eazycloud-locale-sha-before /tmp/eazycloud-locale-sha-after
```

Expected: both builds exit 0 and `diff` has no output. Interactive hydration warnings are checked in a real browser in Task 4 Step 7, where root-absolute HTTP resources behave exactly as deployed.

- [ ] **Step 8: Commit localized generation and routing**

```bash
git add ui_kits/website scripts/build.mjs scripts/prerender.mjs tests/i18n.test.mjs index.html de/index.html en/index.html
git commit -m "feat: prerender German and English site routes"
```

---

### Task 4: SEO, structural checks, documentation, and final verification

**Files:**
- Modify: `sitemap.xml`
- Modify: `scripts/check-built-site.mjs`
- Modify: `tests/site-structure.test.mjs`
- Modify: `README.md`
- Modify: localized CSS only if verified German wrapping requires a targeted shared rule.

**Interfaces:**
- Consumes: generated localized documents from Task 3.
- Produces: complete automated acceptance suite and documented build/deploy artifact list.

- [ ] **Step 1: Add failing SEO assertions**

Append to `tests/i18n.test.mjs`:

```js
test("localized pages publish canonical and alternate metadata", async () => {
  for (const locale of ["en", "de"]) {
    const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");
    assert.match(html, new RegExp(`<link rel="canonical" href="https://eazy\\.cloud/${locale}/">`));
    assert.match(html, /hreflang="en" href="https:\/\/eazy\.cloud\/en\/"/);
    assert.match(html, /hreflang="de" href="https:\/\/eazy\.cloud\/de\/"/);
    assert.match(html, /hreflang="x-default" href="https:\/\/eazy\.cloud\/"/);
  }
});

test("sitemap lists both language URLs with alternates", async () => {
  const xml = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  assert.match(xml, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.match(xml, /https:\/\/eazy\.cloud\/en\//);
  assert.match(xml, /https:\/\/eazy\.cloud\/de\//);
  assert.match(xml, /hreflang="de"/);
  assert.match(xml, /hreflang="en"/);
});
```

- [ ] **Step 2: Run SEO tests and confirm sitemap failure**

Run: `node --test --test-name-pattern="canonical|sitemap" tests/i18n.test.mjs`

Expected: metadata test PASS after Task 3; sitemap test FAIL because the sitemap still lists only root.

- [ ] **Step 3: Update the sitemap**

Add `xmlns:xhtml="http://www.w3.org/1999/xhtml"` to `<urlset>`. Replace the root marketing URL entry with separate `/en/` and `/de/` entries. Each entry includes alternate links for `en`, `de`, and `x-default`; retain `/legal/` and `/privacy/` as English-only URLs. Use `<lastmod>2026-07-22</lastmod>` for the two localized pages.

- [ ] **Step 4: Update structural and built-site checks**

Change `tests/site-structure.test.mjs` so the homepage local-resource test reads both `en/index.html` and `de/index.html`, rejects external scripts/styles for both, and expects `/ui_kits/website/dist/i18n.js` plus `/ui_kits/website/dist/app.js`. Change the privacy-navigation assertion to expect `href="/privacy/"` in `Closing.jsx`.

Rewrite `scripts/check-built-site.mjs` to read both generated documents and verify access to `vendor`, `i18n`, `LocaleSwitch`, `Chrome`, `Hero`, `Chapters`, `Closing`, and `app` bundles. Assert at least ten sections, correct `lang`, no external scripts/styles, and no opposite-locale CTA text in either document.

- [ ] **Step 5: Document localized build outputs**

Add a `Bilingual site build` section to `README.md` documenting:

- `npm run build` generates root selector plus `/en/` and `/de/`;
- all copy lives in `ui_kits/website/translations.mjs`;
- missing translation keys stop the build;
- local verification must open `/`, `/en/`, and `/de/` through HTTP rather than `file://`;
- deployment artifacts include both locale directories, root selector, updated shared bundles, and sitemap;
- legal and privacy pages remain English by product decision.

- [ ] **Step 6: Run the full automated suite**

Run: `npm test`

Expected: consent tests, structure tests, i18n tests, dual-locale build, and built-site checks all PASS.

- [ ] **Step 7: Run a local HTTP browser verification**

Start the existing project preview server if documented. If no server command exists, run `python3 -m http.server 4173 --bind 127.0.0.1` from the repository root and verify:

- `http://127.0.0.1:4173/en/` at desktop width;
- `http://127.0.0.1:4173/de/` at desktop width;
- both URLs at 375px width;
- `/` with German browser language and with non-German browser language;
- switching from every known hash in both directions;
- mobile-menu switch and footer switch;
- consent banner/settings on both locales;
- browser console has no errors or hydration warnings;
- no horizontal overflow and no clipped German headline.

Record any required shared responsive adjustment in `mobile.css`; do not add locale-specific layout forks.

- [ ] **Step 8: Inspect the final diff and generated artifacts**

Run:

```bash
git diff --check
git status --short
git diff --stat
rg -n "Review a workflow|What becomes possible|Trust & control|A useful first step" de/index.html
rg -n "Workflow prüfen lassen|Was möglich wird|Vertrauen & Kontrolle|Ein sinnvoller erster Schritt" en/index.html
```

Expected: `git diff --check` has no output; the two `rg` commands have no output; only planned source, generated, test, sitemap, README, and any verified shared CSS changes appear.

- [ ] **Step 9: Commit the completed bilingual site**

```bash
git add README.md sitemap.xml scripts/check-built-site.mjs tests/site-structure.test.mjs tests/i18n.test.mjs mobile.css
git add index.html de/index.html en/index.html ui_kits/website/dist
git commit -m "test: verify bilingual site generation"
```

If `mobile.css` did not change, omit it from `git add`. Do not push or deploy without a separate explicit request.

---

## Completion evidence

Before reporting implementation complete, provide:

- the final `npm test` summary;
- browser checks performed for desktop and 375px mobile;
- confirmation that `/de/` and `/en/` contain prerendered localized HTML;
- confirmation that root preference order and hash retention work;
- the commits created;
- an explicit statement that no deployment occurred unless separately authorized.
