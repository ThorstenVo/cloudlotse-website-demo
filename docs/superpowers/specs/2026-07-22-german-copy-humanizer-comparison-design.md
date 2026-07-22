# German website copy Humanizer comparison design

**Date:** 2026-07-22  
**Status:** Approved in brainstorming; awaiting written-spec review

## Goal

Create a Markdown decision document that compares the current German eazy.cloud website copy with a distinctly more human Humanizer rewrite. Thorsten must be able to select one complete version per website section with compact choices such as `1A, 2B, 3A`.

## Source of truth

The current German copy comes from `ui_kits/website/translations.mjs` at the revision used by the live deployment. The comparison must not modify the translation catalog, generated pages, GitHub remote, or live website.

## Editorial scope

Include:

- SEO title and meta description;
- all visible German main-page marketing copy;
- navigation labels and visible calls to action where they belong to a section;
- chapter labels, example content, trust content, closing call to action, and footer copy.

Exclude:

- accessibility-only labels;
- the email subject line;
- image alternative text;
- legal and privacy page copy, because those pages remain English and are outside the main-page localization scope.

## Humanizer direction

The Humanizer version is deliberately more human, direct, and characterful rather than conservative. It must still:

- remain professional for a B2B audience;
- avoid both `du` and `Sie`;
- preserve every factual statement, example, figure, product claim, and intended meaning;
- avoid introducing promises or technical capabilities that the current page does not make;
- remain concise enough for the existing website layout.

The edit should reduce abstract advertising language, passive or subjectless phrasing, repeated em dashes, artificial three-part rhythms, generic AI vocabulary, and overly polished sentence patterns. It should add natural rhythm and specific wording without becoming casual or gimmicky.

After drafting, perform the Humanizer anti-AI pass:

1. Identify what still makes the rewrite sound obviously AI-generated.
2. Revise those remaining patterns.
3. Confirm that the final version still preserves the original meaning and neutral form of address.

## Decision granularity

Each numbered website section is one indivisible decision package. Its heading, label, body copy, CTA, and other included strings stay together so the selected version remains internally consistent.

- `A` always means the current original copy.
- `B` always means the Humanizer rewrite.
- A valid response is a comma-separated list such as `1B, 2A, 3B, 4A`.
- The document must never reverse or vary the meaning of A and B.

## Document structure

The result is a Markdown note in the CloudLotse Website project area, outside the deployable website repository:

`03 Bereiche/CloudLotse/Projekte/CloudLotse Website/2026-07-22 Deutscher Webseitentext Original vs Humanizer.md`

It starts with a short instruction block and a blank decision line that can be copied and completed.

Every section follows this exact heading sequence:

```markdown
## 1 · Section name

### 1A · Original

> Current text

### 1B · Humanizer

> Rewritten text

### Redaktioneller Unterschied

A short, concrete explanation of the relevant editorial changes.

**Auswahl:** `1A` oder `1B`
```

Use separate blockquotes or short labelled lines inside A and B where one section contains a label, heading, paragraph, and CTA. Do not use a wide Markdown table because long website copy becomes difficult to compare on smaller screens.

## Section map

Use stable consecutive numbers for these decision packages:

1. SEO title and description
2. Header navigation and primary CTA
3. Hero
4. Intro and three possibility rows
5. Chapter 01: task preparation
6. Nordwerk case study
7. Chapter 02: knowledge
8. Aventa knowledge example
9. Chapter 03: connected workflows
10. Customer-service system handoff
11. Trust, control, and operating models
12. Closing call to action
13. Footer

## Editorial explanation

Each `Redaktioneller Unterschied` section should name only the most relevant changes, for example: less abstract wording, active sentence construction, reduced slogan rhythm, or more concrete phrasing. It should not argue that B is automatically better. A may be the stronger choice where the original is clearer or better suited to the visual design.

## Summary

After section 13, include:

- a blank consolidated selection line covering `1` through `13`;
- a short overall assessment of which original passages already sound natural;
- the areas where Humanizer materially improves the copy;
- any B versions that may be too informal or too long for the current design.

## Quality checks

Before delivery, verify:

- all 13 sections are present and numbered once;
- every section contains both `nA` and `nB` with A as original and B as Humanizer;
- every original string matches the production German catalog;
- every B version remains neutral without `du` or `Sie`;
- numbers, examples, names, and technical claims are unchanged;
- no section is missing its choice prompt or editorial difference;
- the document contains no placeholders and does not alter production files.

## Acceptance criteria

The document is complete when Thorsten can read each original immediately beside its rewrite and return a single unambiguous list such as `1A, 2B, 3B, 4A, 5A, 6B, 7A, 8B, 9B, 10A, 11B, 12A, 13B` without editing or explaining the document structure.
