# Typography and Navigation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved 18 px lead-copy scale, 92 px unscrolled header, and accessible orange chapter hover/focus treatment without disturbing the existing compact scroll state or content hierarchy.

**Architecture:** Reuse the existing shared `mobile.css` layer for visual states and add focused class hooks to the React source components. Keep selected, hover, and keyboard-focus behavior CSS-driven so the same design tokens stay synchronized; then rebuild localized static output and advance the coupled CSS/Chapters cache revision together.

**Tech Stack:** React 18 JSX bundles, CSS, esbuild, jsdom prerendering, Node.js test runner

## Global Constraints

- Lead copy is exactly 18 px with a 1.55 line height on desktop and mobile.
- The unscrolled top bar is exactly 92 px and the compact scrolled state remains exactly 60 px.
- Logo width remains 148 px initially and becomes 120 px inside the 60 px compact header; headings, cards, process copy, navigation typography, legal copy, footer copy, colors, and horizontal gutters remain unchanged.
- Selected, pointer hover, and `:focus-visible` chapter states use the existing orange/dark selected palette.
- Touch interaction remains selection-based and `prefers-reduced-motion` disables navigation transitions.
- `/mobile.css` and `/ui_kits/website/dist/Chapters.js` use the same new cache revision.

---

### Task 1: Shared 18 px lead-copy scale

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `ui_kits/website/Hero.jsx`
- Modify: `ui_kits/website/Chapters.jsx`
- Modify: `ui_kits/website/Closing.jsx`
- Modify: `mobile.css`

**Interfaces:**
- Consumes: hero `copy.hero.copy`, chapter `copy`, trust `copy.trust.copy`, and final CTA `copy.final.copy`.
- Produces: shared `cl-lead-copy` class with one 18 px/1.55 style contract.

- [x] **Step 1: Write the failing regression test**

Add a test that reads all three component sources and `mobile.css`, requires one `cl-lead-copy` hook in `Hero.jsx`, one in the reusable `Stage` paragraph in `Chapters.jsx`, two in `Closing.jsx`, and requires:

```js
assert.match(css, /\.cl-lead-copy\s*\{[^}]*font-size:\s*18px[^}]*line-height:\s*1\.55/s);
```

- [x] **Step 2: Verify the test fails for the missing shared class**

Run:

```bash
node --test --test-name-pattern='shared lead copy uses the approved typography scale' tests/site-structure.test.mjs
```

Expected: FAIL because `cl-lead-copy` and its CSS rule do not exist.

- [x] **Step 3: Add the minimal component hooks and shared CSS rule**

Add `className="cl-lead-copy"` to the hero explanation, reusable chapter `Stage` paragraph, trust introduction, and final CTA explanation. Add:

```css
.cl-lead-copy { font-size: 18px !important; line-height: 1.55 !important; }
```

Do not change their existing width, margin, or color declarations.

- [x] **Step 4: Verify the focused test passes**

Run the command from Step 2. Expected: PASS.

---

### Task 2: Header breathing room and accessible chapter interaction

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `ui_kits/website/Chapters.jsx`
- Modify: `mobile.css`

**Interfaces:**
- Consumes: `.cl-topbar`, `.cl-mobile-menu`, `.cl-chapter-link`, `selected`, and existing selected palette tokens.
- Produces: `is-selected` chapter class, 92 px default top bar/mobile-menu offset, hover-capable pointer preview, and `:focus-visible` treatment.

- [x] **Step 1: Write failing header and interaction tests**

Require `height: 92px` on `.cl-topbar`, `top: 92px` on `.cl-mobile-menu`, retained 60 px scrolled height, an `is-selected` class hook in `Chapters.jsx`, and CSS selectors for:

```css
.cl-chapter-link.is-selected
@media (hover: hover) and (pointer: fine)
.cl-chapter-link:hover
.cl-chapter-link:focus-visible
```

Also require `prefers-reduced-motion` to include `.cl-chapter-link` in its transition suppression.

- [x] **Step 2: Verify the focused tests fail**

Run:

```bash
node --test --test-name-pattern='top bar exposes|chapter navigation provides' tests/site-structure.test.mjs
```

Expected: FAIL on the current 76 px height/offset and missing interaction selectors.

- [x] **Step 3: Implement the approved CSS-driven states**

Change the default top bar height and mobile-menu top offset to 92 px. Keep `.cl-topbar.is-scrolled` at 60 px. Build the chapter class as:

```jsx
className={"cl-chapter-link" + (selected ? " is-selected" : "")}
```

Remove the selected background/color inline overrides from the link and children. In CSS, give `.is-selected`, hover inside the hover-capable media query, and `:focus-visible` the orange background/dark text palette. Add an inset focus outline for `:focus-visible`; keep the existing 180 ms transition and suppress it under reduced motion.

- [x] **Step 4: Verify the focused tests pass**

Run the command from Step 2. Expected: PASS.

---

### Task 3: Cache-coherent build, live deployment, and final verification

**Files:**
- Modify: `ui_kits/website/page-template.html`
- Generated: `ui_kits/website/dist/Hero.js`
- Generated: `ui_kits/website/dist/Chapters.js`
- Generated: `ui_kits/website/dist/Closing.js`
- Modify: `ui_kits/website/app.jsx`
- Generated: `ui_kits/website/dist/app.js`
- Generated: `en/index.html`
- Generated: `de/index.html`
- Track: `docs/superpowers/plans/2026-07-23-typography-navigation-polish.md`

**Interfaces:**
- Consumes: source changes from Tasks 1–2 and the page-shell cache-coherence test.
- Produces: localized production pages that request matching `mobile.css`, `Chapters.js`, and sticky-layout `app.js` revision `20260723-1`.

- [x] **Step 1: Advance the coupled asset revision**

Change the page-template references to the shared `20260723-1` revision:

```html
<link rel="stylesheet" href="/mobile.css?v=20260723-1">
<script src="/ui_kits/website/dist/Chapters.js?v=20260723-1"></script>
<script src="/ui_kits/website/dist/app.js?v=20260723-1"></script>
```

- [x] **Step 2: Run the complete build and test suite**

Run:

```bash
npm test
```

Expected: all tests pass and `check-built-site.mjs` reports only local scripts and localized copy.

- [x] **Step 3: Verify rendered behavior before deployment**

Check EN and DE at desktop and mobile widths. Confirm 18 px lead copy, 92→60 px header transition, logo breathing room, full orange pointer hover, orange keyboard focus with inset outline, correct mobile-menu top/bottom geometry, clean wrapping, and no horizontal overflow.

- [x] **Step 4: Deploy the coherent file set**

Upload `mobile.css`, the three rebuilt visual component bundles, rebuilt `app.js`, and generated `en/index.html`/`de/index.html` only through:

```bash
/Users/thorsten/bin/ftp-deploy.sh eazycloud <localfile> /eazy.cloud/<remotepath>
```

- [x] **Step 5: Verify production delivery**

Fetch `https://eazy.cloud/en/` and `https://eazy.cloud/de/`, confirm both `20260723-1` asset references, fetch the versioned CSS and verify the 18 px lead, 92 px header, and chapter interaction rules. Repeat the visual interaction checks against production.

- [x] **Step 6: Commit and push**

```bash
git add tests/site-structure.test.mjs mobile.css ui_kits/website/Hero.jsx ui_kits/website/Chapters.jsx ui_kits/website/Closing.jsx ui_kits/website/app.jsx ui_kits/website/page-template.html ui_kits/website/dist/Hero.js ui_kits/website/dist/Chapters.js ui_kits/website/dist/Closing.js ui_kits/website/dist/app.js en/index.html de/index.html docs/superpowers/plans/2026-07-23-typography-navigation-polish.md
git commit -m "feat: polish typography and navigation feedback"
git push origin main
```
