# Responsive Gutters and Mobile Language Switch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add balanced responsive page gutters and make both mobile locale controls navigate reliably in either direction.

**Architecture:** Keep the existing shared-component design. Replace only `window.shellStyle` with a serialization-safe box-model container, and make `LocaleSwitch` rely on native anchor navigation while JavaScript only stores the preference and optionally preserves a known hash.

**Tech Stack:** React 18, Node.js test runner, esbuild, jsdom prerendering, static HTML, guarded FTP wrapper scripts.

## Global Constraints

- Use `width: 100%`, `maxWidth: 1800`, `paddingInline: "clamp(28px, 5vw, 96px)"`, `boxSizing: "border-box"`, and centered margins for the shared shell.
- Keep full-bleed images and backgrounds unchanged.
- Locale links must work without hydration or JavaScript.
- JavaScript may store the locale and preserve a known hash, but must not cancel native navigation.
- Do not change copy, typography, section structure or image positioning.
- Apply the same layout and locale behavior to English and German.
- Deploy credentials are available only through `$HOME/bin/ftp-deploy.sh`; never read the secrets file.

---

### Task 1: Add failing regression tests for both defects

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Test: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: Source text from `Chrome.jsx` and `LocaleSwitch.jsx`.
- Produces: Regression contracts for the shared shell and progressive-enhancement locale navigation.

- [ ] **Step 1: Add the shell serialization test**

```js
test("shared page shell uses serialization-safe balanced gutters", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chrome.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /min\(1400px, calc\(/);
  assert.match(source, /width: "100%"/);
  assert.match(source, /maxWidth: 1800/);
  assert.match(source, /paddingInline: "clamp\(28px, 5vw, 96px\)"/);
  assert.match(source, /boxSizing: "border-box"/);
  assert.match(source, /margin: "0 auto"/);
});
```

- [ ] **Step 2: Add the native locale-navigation test**

```js
test("locale switch keeps native links as the navigation mechanism", async () => {
  const source = await readFile(new URL("../ui_kits/website/LocaleSwitch.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /preventDefault\(|window\.location\.assign/);
  assert.match(source, /const href = localizedPath\(other\)/);
  assert.match(source, /saveLocale\(other\)/);
  assert.match(source, /event\.currentTarget\.href = localizedPath\(other, window\.location\.hash\)/);
  assert.match(source, /<a href=\{href\} onClick=\{switchLanguage\}/);
});
```

- [ ] **Step 3: Run the focused tests and verify RED**

Run: `node --test tests/site-structure.test.mjs`

Expected: the two new tests fail on the old nested shell formula and imperative locale navigation; existing tests remain green.

---

### Task 2: Implement the shared fixes and regenerate both locales

**Files:**
- Modify: `ui_kits/website/Chrome.jsx`
- Modify: `ui_kits/website/LocaleSwitch.jsx`
- Generated: `ui_kits/website/dist/Chrome.js`
- Generated: `ui_kits/website/dist/LocaleSwitch.js`
- Generated: `de/index.html`
- Generated: `en/index.html`
- Test: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: Existing `shellStyle`, `saveLocale`, `localizedPath`, and `LocaleSwitch` consumers.
- Produces: The same global component interfaces with corrected layout and navigation behavior.

- [ ] **Step 1: Replace the shared shell object**

Use this exact object in `Chrome.jsx`:

```js
const shellStyle = {
  width: "100%",
  maxWidth: 1800,
  margin: "0 auto",
  paddingInline: "clamp(28px, 5vw, 96px)",
  boxSizing: "border-box",
};
```

- [ ] **Step 2: Restore native anchor navigation**

Use this behavior in `LocaleSwitch.jsx`:

```js
const href = localizedPath(other);
const switchLanguage = (event) => {
  saveLocale(other);
  event.currentTarget.href = localizedPath(other, window.location.hash);
};
```

Render the inactive language with `href={href}` and `onClick={switchLanguage}`. Do not call `preventDefault()` or any imperative location API.

- [ ] **Step 3: Run focused tests and verify GREEN**

Run: `node --test tests/site-structure.test.mjs`

Expected: all site-structure tests pass.

- [ ] **Step 4: Build both localized pages**

Run: `npm run build`

Expected: esbuild completes and prerenders `/en/` and `/de/` without errors.

---

### Task 3: Verify layout, behavior and deployment

**Files:**
- Verify: `ui_kits/website/Chrome.jsx`
- Verify: `ui_kits/website/LocaleSwitch.jsx`
- Verify/generated: `ui_kits/website/dist/Chrome.js`
- Verify/generated: `ui_kits/website/dist/LocaleSwitch.js`
- Verify/generated: `de/index.html`
- Verify/generated: `en/index.html`
- Verify: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: Generated localized site from Task 2.
- Produces: Tested, pushed and deployed production files.

- [ ] **Step 1: Run the full verification suite**

Run: `npm test`

Expected: build, all Node tests and `check:site` pass with zero failures.

- [ ] **Step 2: Inspect generated CSS and locale anchors**

Run:

```bash
rg -F 'max-width: 1800px' de/index.html en/index.html
rg -F 'padding-inline: clamp(28px, 5vw, 96px)' de/index.html en/index.html
rg -F 'box-sizing: border-box' de/index.html en/index.html
rg -F 'href="/de/"' en/index.html
rg -F 'href="/en/"' de/index.html
rg -F 'preventDefault' ui_kits/website/dist/LocaleSwitch.js
```

Expected: valid shell properties and reciprocal anchors are present in both pages; the final command returns no matches.

- [ ] **Step 3: Run visual and interaction checks**

Serve the built repository locally and inspect `/de/` and `/en/` at desktop, tablet and mobile widths. Verify balanced gutters, unchanged full-bleed backgrounds, and English → German plus German → English navigation from both the hamburger menu and footer.

Expected: no text touches a viewport edge and all four mobile switch interactions reach the opposite locale.

- [ ] **Step 4: Review and commit**

Run: `git diff --check && git status --short && git diff --stat && git diff`.

Commit source, tests, generated bundles and both localized pages with:

```bash
git add tests/site-structure.test.mjs ui_kits/website/Chrome.jsx ui_kits/website/LocaleSwitch.jsx ui_kits/website/dist/Chrome.js ui_kits/website/dist/LocaleSwitch.js de/index.html en/index.html docs/superpowers/plans/2026-07-22-responsive-gutters-mobile-language-switch.md
git commit -m "fix: add page gutters and reliable locale links"
```

- [ ] **Step 5: Push and deploy explicit production files**

Run `git push origin main`, then upload these files with separate wrapper calls:

```bash
$HOME/bin/ftp-deploy.sh eazycloud ui_kits/website/dist/Chrome.js /eazy.cloud/ui_kits/website/dist/Chrome.js
$HOME/bin/ftp-deploy.sh eazycloud ui_kits/website/dist/LocaleSwitch.js /eazy.cloud/ui_kits/website/dist/LocaleSwitch.js
$HOME/bin/ftp-deploy.sh eazycloud de/index.html /eazy.cloud/de/index.html
$HOME/bin/ftp-deploy.sh eazycloud en/index.html /eazy.cloud/en/index.html
```

- [ ] **Step 6: Verify production**

Fetch both locale pages and both updated bundles with cache-busting query parameters. Confirm HTTP 200, valid gutter styles, reciprocal anchors and absence of `preventDefault` in the live locale bundle. Use a mobile browser viewport to click both directions from the menu and footer.

Expected: the public site matches the approved spacing and both mobile locale controls work in both directions.
