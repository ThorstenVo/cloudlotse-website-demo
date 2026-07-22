# Chapter Number Balance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase chapter navigation numbers to 13 px while preserving the existing 17 px desktop titles and all layout dimensions.

**Architecture:** Keep the change within the existing responsive stylesheet. Update the shared page-template asset revision so generated English and German pages fetch the matching CSS immediately.

**Tech Stack:** CSS, static HTML prerendering, Node.js test runner

## Global Constraints

- Chapter numbers are exactly 13 px on desktop and mobile.
- Chapter titles remain 17 px on desktop and 15 px at widths up to 860 px.
- Navigation height, spacing, colors, semantics, and localized copy remain unchanged.

---

### Task 1: Rebalance chapter numbers and publish a coherent asset revision

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `mobile.css`
- Modify: `ui_kits/website/page-template.html`
- Generated: `en/index.html`
- Generated: `de/index.html`

**Interfaces:**
- Consumes: `.cl-chapter-number` and the versioned `/mobile.css?v=...` page-shell link.
- Produces: 13 px chapter numbers and a new shared CSS/component asset revision.

- [x] **Step 1: Write the failing test**

Change the chapter typography assertion to require:

```js
assert.match(css, /\.cl-chapter-number\s*\{[^}]*font-size:\s*13px[^}]*color:\s*#8f9892/s);
```

- [x] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern='chapter navigation uses readable responsive typography' tests/site-structure.test.mjs`

Expected: FAIL because `mobile.css` still declares `font-size: 11px`.

- [x] **Step 3: Implement the minimal CSS and cache revision change**

Set `.cl-chapter-number` to `font-size: 13px` in `mobile.css`. Change both `mobile.css` and `Chapters.js` query revisions in `ui_kits/website/page-template.html` from `20260722-2` to `20260722-3` so the generated localized pages load a coherent asset pair.

- [x] **Step 4: Run the complete verification suite**

Run: `npm test`

Expected: 44 tests pass and the built-site check succeeds.

- [x] **Step 5: Deploy and verify production**

Upload `mobile.css`, `ui_kits/website/dist/Chapters.js`, `en/index.html`, and `de/index.html` with the approved deployment wrapper. Fetch the live versioned URLs and verify `font-size: 13px` plus matching `20260722-3` revisions.

- [x] **Step 6: Commit and push**

```bash
git add tests/site-structure.test.mjs mobile.css ui_kits/website/page-template.html en/index.html de/index.html docs/superpowers/plans/2026-07-22-chapter-number-balance.md
git commit -m "fix: rebalance chapter navigation numbers"
git push origin main
```
