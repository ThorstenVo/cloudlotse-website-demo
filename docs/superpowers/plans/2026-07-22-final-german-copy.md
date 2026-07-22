# Final German Website Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Thorsten's approved German mixed copy with corrected wording and the unified CTA “Arbeitsablauf besprechen”.

**Architecture:** The localized website already renders all visible content from `TRANSLATIONS`. Add an exact regression test for the approved changed fields, update only the German catalog entries, and let the existing build regenerate the German HTML and localized JavaScript. Deployment uploads only repository files produced or changed by this work.

**Tech Stack:** Node.js test runner, React 18, esbuild, jsdom prerendering, static HTML, guarded FTP wrapper scripts.

## Global Constraints

- The approved source is `/Users/thorsten/Library/Mobile Documents/com~apple~TextEdit/Documents/Deutscher Webseitentext - TV.txt` with the corrections in the design spec.
- Every visible German CTA button and the footer CTA link must read `Arbeitsablauf besprechen`.
- Keep the internal email subject `eazy.cloud Workflow-Prüfung` unchanged.
- Keep English copy, accessibility labels, legal-page content and image alt text unchanged.
- Do not change components or layout.
- Use only `$HOME/bin/ftp-deploy.sh eazycloud <local> /eazy.cloud/<remote>` for deployment; never read the secrets file.

---

### Task 1: Lock the approved German copy in a failing regression test

**Files:**
- Modify: `tests/i18n.test.mjs`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: `TRANSLATIONS.de` from `ui_kits/website/translations.mjs`.
- Produces: An exact catalog contract for the German fields that differ from the current live copy.

- [x] **Step 1: Add the failing catalog assertion**

Add this test after the translation completeness test:

```js
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
```

- [x] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/i18n.test.mjs`

Expected: FAIL only for `German catalog contains Thorsten's approved final copy`, showing the old German catalog values.

---

### Task 2: Apply the approved copy and regenerate the localized site

**Files:**
- Modify: `ui_kits/website/translations.mjs`
- Generated: `ui_kits/website/dist/i18n.js`
- Generated: `de/index.html`
- Potentially regenerated without content change: `en/index.html`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: The exact German catalog contract from Task 1.
- Produces: Updated `TRANSLATIONS.de` values consumed by every existing page component and the prerenderer.

- [x] **Step 1: Replace only the approved German catalog fields**

Set the following exact values in `TRANSLATIONS.de`:

```js
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
```

Also set:

```js
de.intro.rows[2].copy = "Eine prüfbare Grundlage entsteht. Die Entscheidung bleibt beim Team. Langes Suchen entfällt.";
de.chapters[2].copy = "Informationen fließen vollständig zwischen den beteiligten Systemen — und bleiben beim richtigen Kunden oder Projekt für das gesamte Team verfügbar.";
de.knowledge.answerLabel = "Aus den Aventa-Unterlagen";
de.footer.processing = "EU-Datenverarbeitung in Vorbereitung";
```

These assignments describe the exact catalog values; edit the existing object literal rather than adding runtime assignments.

- [x] **Step 2: Run the focused test and verify GREEN**

Run: `node --test tests/i18n.test.mjs`

Expected: all i18n tests pass.

- [x] **Step 3: Run the build**

Run: `npm run build`

Expected: esbuild completes and prerenders `/en/` and `/de/` without errors.

---

### Task 3: Verify, commit, push and deploy

**Files:**
- Verify: `ui_kits/website/translations.mjs`
- Verify/generated: `ui_kits/website/dist/i18n.js`
- Verify/generated: `de/index.html`
- Verify/generated: `en/index.html`
- Verify: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: The updated catalog and generated static output from Task 2.
- Produces: A tested git commit, pushed `main`, and the matching live German site.

- [x] **Step 1: Run the full verification suite**

Run: `npm test`

Expected: build, all Node tests and `check:site` pass with zero failures.

- [x] **Step 2: Verify required output and English isolation**

Run:

```bash
rg -F 'eazy.cloud — Intelligente Workflows. Finden statt suchen.' de/index.html
rg -F 'Intelligente Workflows verbinden Informationen, Wissen und Geschäftssysteme. So entstehen Workflows, die im Alltag funktionieren. Dabei bleibt unter Kontrolle, wo die Daten verarbeitet werden.' de/index.html
rg -F 'Arbeitsablauf besprechen' de/index.html
rg -F 'Eine prüfbare Grundlage entsteht. Die Entscheidung bleibt beim Team. Langes Suchen entfällt.' de/index.html
rg -F 'Aus den Aventa-Unterlagen' de/index.html
rg -F 'Informationen fließen vollständig zwischen den beteiligten Systemen — und bleiben beim richtigen Kunden oder Projekt für das gesamte Team verfügbar.' de/index.html
git diff bbb365e -- en/index.html
git diff bbb365e -- ui_kits/website/translations.mjs | sed -n '/  en: {/,/  de: {/p'
```

Expected: every German string is present; English copy is unchanged.

- [x] **Step 3: Review and commit the implementation**

Run: `git diff --check && git status --short && git diff --stat && git diff`

Expected: only the test, German catalog and build-generated localized artifacts differ.

Commit:

```bash
git add tests/i18n.test.mjs ui_kits/website/translations.mjs ui_kits/website/dist/i18n.js de/index.html en/index.html
git commit -m "feat: publish final German website copy"
```

If `en/index.html` is byte-identical and not listed by Git, omit it from `git add`.

- [x] **Step 4: Push the committed main branch**

Run: `git push origin main`

Expected: remote `main` advances to the implementation commit, including the three already-local documentation commits.

- [x] **Step 5: Upload only changed production files**

Use separate wrapper calls for each changed production file:

```bash
$HOME/bin/ftp-deploy.sh eazycloud ui_kits/website/dist/i18n.js /eazy.cloud/ui_kits/website/dist/i18n.js
$HOME/bin/ftp-deploy.sh eazycloud de/index.html /eazy.cloud/de/index.html
```

If the build changes any additional production bundle referenced by `de/index.html`, upload that explicit file with the same wrapper. Do not upload tests or documentation.

- [x] **Step 6: Verify the public deployment**

Fetch `https://eazy.cloud/de/` with a cache-busting query and verify HTTP 200 plus the new title, description and visible German CTA. Fetch `https://eazy.cloud/en/` and verify its current English title and CTA remain present. Confirm `/de/` links to `/en/` and `/en/` links to `/de/`.

Expected: both locales return HTTP 200, German serves the approved copy, English remains unchanged, and both language links are reciprocal.
