# German Website Copy Humanizer Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Markdown decision document comparing all current visible German eazy.cloud main-page copy with a distinctly humanized alternative using unambiguous `1A`/`1B` choices.

**Architecture:** Treat `TRANSLATIONS.de` as the immutable source for every A version. Write one comparison note outside the deployable repository, group the copy into 13 stable sections, apply Humanizer only to B versions, then validate structure, meaning, neutrality, and completeness.

**Tech Stack:** Markdown, Obsidian-compatible notes, JavaScript locale catalog, `rg`, Humanizer 2.5.1

## Global Constraints

- Output: `/Users/thorsten/tv.eazy.cloud/Project Workfolder/03 Bereiche/CloudLotse/Projekte/CloudLotse Website/2026-07-22 Deutscher Webseitentext Original vs Humanizer.md`.
- Source: `ui_kits/website/translations.mjs` in `design-handoff-demo`.
- A always means current production copy; B always means Humanizer copy.
- Use exactly 13 indivisible packages from the approved design.
- B must be distinctly more human and characterful, professional, and neutral without `du` or `Sie`.
- Preserve facts, names, figures, examples, claims, and intended meanings.
- Include SEO plus visible main-page copy; exclude accessibility-only labels, email subject, image alt text, and legal/privacy copy.
- Do not modify the catalog, generated HTML, GitHub remote, or live website.
- Complete the Humanizer anti-AI pass before delivery.

---

### Task 1: Create and verify the decision document

**Files:**
- Read: `ui_kits/website/translations.mjs`
- Create: `/Users/thorsten/tv.eazy.cloud/Project Workfolder/03 Bereiche/CloudLotse/Projekte/CloudLotse Website/2026-07-22 Deutscher Webseitentext Original vs Humanizer.md`
- Verify against: `docs/superpowers/specs/2026-07-22-german-copy-humanizer-comparison-design.md`

**Interfaces:**
- Consumes: `TRANSLATIONS.de` and the approved 13-section map.
- Produces: one note with `1A` through `13A`, `1B` through `13B`, 13 difference notes, 13 prompts, and a consolidated selection line.

- [ ] **Step 1: Protect an existing result**

Run:

```bash
test ! -e '/Users/thorsten/tv.eazy.cloud/Project Workfolder/03 Bereiche/CloudLotse/Projekte/CloudLotse Website/2026-07-22 Deutscher Webseitentext Original vs Humanizer.md'
```

Expected: exit 0. If it exists, stop because vault rules forbid overwriting without approval.

- [ ] **Step 2: Map source copy into 13 packages**

Use this exact mapping:

1. `meta`
2. `nav` plus visible `cta.label`
3. `hero`
4. `intro`
5. `chapters[0]`
6. `caseStudy`
7. `chapters[1]`
8. `knowledge`
9. `chapters[2]`
10. `systems`
11. `trust`
12. `final` plus visible `cta.label`
13. `footer`

Exclude `a11y`, `cta.subject`, and chapter `alt`. Preserve every A value exactly, including punctuation and capitalization.

- [ ] **Step 3: Write frontmatter and instructions**

Use frontmatter tags `cloudlotse`, `website`, `copywriting`, and `humanizer`; set `status: active` and `date: 2026-07-22`.

Title the note `# Deutscher Webseitentext: Original vs. Humanizer`. Explain that A is live and B is proposed. Include the example `1B, 2A, 3B, 4A, 5A, 6B, 7A, 8B, 9B, 10A, 11B, 12A, 13B` and this copyable line:

```text
Auswahl: 1_, 2_, 3_, 4_, 5_, 6_, 7_, 8_, 9_, 10_, 11_, 12_, 13_
```

- [ ] **Step 4: Write all A blocks verbatim**

For each package use `## n · Bereich`, `### nA · Original`, labelled blockquote lines, then no editorial changes. Arrays appear as separate labelled lines within the same package.

- [ ] **Step 5: Write all B blocks with Humanizer**

For each package scan A for promotional abstraction, passive or subjectless construction, em-dash overuse, forced three-part rhythms, generic AI words, and too-perfect cadence. Rewrite the complete package under `### nB · Humanizer` so its labels, headline, body, and CTA remain coherent.

Keep `eazy.cloud`, `Nordwerk`, `Aventa`, `130`, `25`, `−81%`, `35`, and `2026` unchanged. Do not add capabilities or promises.

- [ ] **Step 6: Add difference and choice controls**

After every B block add `### Redaktioneller Unterschied`, one to three concrete sentences, and `**Auswahl:** nA oder nB` with each option formatted as inline code. Mention when B is longer, less formal, or potentially harder to fit.

- [ ] **Step 7: Run the Humanizer anti-AI pass**

Read all B versions together and answer internally: `Was macht diese Fassung noch offensichtlich KI-generiert?` Remove repeated sentence shapes, slogan fragments, hidden three-item formulas, filler, and repeated em dashes. Re-read for factual equivalence and neutral address.

- [ ] **Step 8: Add the closing assessment**

Repeat the copyable selection line. Add `## Gesamteinschätzung` covering originals that already sound natural, sections where B materially improves clarity or rhythm, and B versions that may be too informal or long for the live layout.

- [ ] **Step 9: Verify structure**

Using the exact output path as `comparison`, run counts for:

- `^## [0-9]+ · ` → exactly 13
- `^### [0-9]+A · Original$` → exactly 13
- `^### [0-9]+B · Humanizer$` → exactly 13
- `^### Redaktioneller Unterschied$` → exactly 13
- `^\*\*Auswahl:\*\*` → exactly 13

Use `rg -c` and `test` so any wrong count exits non-zero.

- [ ] **Step 10: Verify editorial constraints**

Search the completed note for `du`, `dein`, `deine`, `Sie`, `Ihr`, `Ihre`, and `Ihnen`. Expected: no matches in B. The current A catalog also contains none.

Search for `130`, `25`, `−81%`, `35`, `Nordwerk`, `Aventa`, and `eazy.cloud`. Confirm every protected fact or name appears in the relevant A and B package.

Compare each A line once more with `TRANSLATIONS.de`. Fix any mismatch in A without cleaning up the original.

- [ ] **Step 11: Verify isolation**

From `design-handoff-demo`, run `git status --short` and `git diff -- ui_kits/website/translations.mjs de/index.html en/index.html index.html`.

Expected: no production-file changes. The comparison note is outside the repository and nothing is pushed or deployed.

---

## Completion evidence

Report the clickable absolute output path, 13 A/B packages, structural counts, neutrality result, protected-fact check, and explicit confirmation that the live site was not changed or redeployed.
