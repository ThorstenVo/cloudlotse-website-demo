# Canonical eazy.cloud Logo Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every active website logo and favicon reference with the approved eazy.cloud dark lockup and dark signet.

**Architecture:** Store immutable canonical copies in `assets/`, reference the lockup from all branded dark headers and footers, and reference the signet from every favicon template and static page. Existing build scripts remain the single source for generated localized HTML and bundles.

**Tech Stack:** Static SVG assets, React 18 JSX, HTML templates, esbuild, Node.js test runner, jsdom prerendering.

## Global Constraints

- Source assets only from the approved Logo System manifest.
- Use the complete dark lockup on dark website surfaces and the dark symbol as favicon.
- Do not alter SVG colors, geometry, effects, or individual parts.
- Do not delete legacy files.
- Add no dependencies and do not deploy.

## File Map

- `assets/eazycloud-logo-dark.svg`: exact local copy of `brands.eazyCloud.dark.lockup`.
- `assets/eazycloud-signet-dark.svg`: exact local copy of `brands.eazyCloud.dark.symbol`.
- `ui_kits/website/Chrome.jsx`: header lockup reference.
- `ui_kits/website/Closing.jsx`: footer lockup reference.
- `ui_kits/website/page-template.html`, `root-template.html`, `index.html`: favicon references for generated and preview pages.
- `legal/index.html`, `privacy/index.html`: static header lockup and favicon references.
- `tests/site-structure.test.mjs`: source/reference regression coverage and canonical byte checks.
- Generated `ui_kits/website/dist/{Chrome,Closing}.js`, `index.html`, `en/index.html`, and `de/index.html`: rebuilt outputs.

---

### Task 1: Add Canonical Assets and Failing Reference Tests

**Files:**
- Create: `assets/eazycloud-logo-dark.svg`
- Create: `assets/eazycloud-signet-dark.svg`
- Modify: `tests/site-structure.test.mjs`

**Interfaces:**
- Produces exact canonical asset filenames consumed by all source templates and components.

- [ ] **Step 1: Write failing tests**

Add a test that reads the two canonical source files and the two project asset files, asserts content equality while ignoring only trailing whitespace introduced by patch serialization, then scans active source files:

```js
test("active pages use content-identical canonical eazy.cloud logo assets", async () => {
  const canonicalRoot = new URL("../../../../../../Ressourcen/Design System CloudLotse + eazy.cloud/", import.meta.url);
  const [sourceLockup, sourceSignet, localLockup, localSignet] = await Promise.all([
    readFile(new URL("eazy.cloud LOGO Files/eazycloud-logo-dark.svg", canonicalRoot), "utf8"),
    readFile(new URL("eazy.cloud LOGO Files/eazycloud-signet-dark.svg", canonicalRoot), "utf8"),
    readFile(new URL("../assets/eazycloud-logo-dark.svg", import.meta.url), "utf8"),
    readFile(new URL("../assets/eazycloud-signet-dark.svg", import.meta.url), "utf8"),
  ]);
  assert.equal(localLockup.trimEnd(), sourceLockup.trimEnd());
  assert.equal(localSignet.trimEnd(), sourceSignet.trimEnd());
});

test("all active brand and favicon sources reference canonical filenames", async () => {
  const activeFiles = [
    "../ui_kits/website/Chrome.jsx", "../ui_kits/website/Closing.jsx",
    "../ui_kits/website/page-template.html", "../ui_kits/website/root-template.html",
    "../ui_kits/website/index.html", "../legal/index.html", "../privacy/index.html",
  ];
  const sources = await Promise.all(activeFiles.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  const joined = sources.join("\n");
  assert.doesNotMatch(joined, /eazycloud_logo_white\.svg|eazycloud_logo\.svg|eazycloud_signet\.svg|eazycloud\.ico/);
  assert.equal((joined.match(/eazycloud-logo-dark\.svg/g) || []).length, 4);
  assert.equal((joined.match(/eazycloud-signet-dark\.svg/g) || []).length, 5);
});
```

- [ ] **Step 2: Verify RED**

Run `node --test --test-name-pattern="canonical eazy.cloud|canonical filenames" tests/site-structure.test.mjs`.

Expected: failures because the canonical local files and references do not exist.

- [ ] **Step 3: Add exact canonical SVG files**

Copy the manifest-resolved SVG contents unchanged into the two explicit `assets/` filenames. The test permits only an added trailing line ending from patch serialization.

- [ ] **Step 4: Keep the reference test red until Task 2**

Run the focused command again. Expected: byte-identity test passes; active-reference test still fails.

---

### Task 2: Replace All Active Logo References

**Files:**
- Modify: `ui_kits/website/Chrome.jsx`
- Modify: `ui_kits/website/Closing.jsx`
- Modify: `ui_kits/website/page-template.html`
- Modify: `ui_kits/website/root-template.html`
- Modify: `ui_kits/website/index.html`
- Modify: `legal/index.html`
- Modify: `privacy/index.html`
- Generate: `ui_kits/website/dist/Chrome.js`
- Generate: `ui_kits/website/dist/Closing.js`
- Generate: `index.html`, `en/index.html`, `de/index.html`

**Interfaces:**
- Consumes: `/assets/eazycloud-logo-dark.svg` and `/assets/eazycloud-signet-dark.svg`.

- [ ] **Step 1: Replace lockup references**

Use `eazycloud-logo-dark.svg` in `Chrome.jsx`, `Closing.jsx`, `legal/index.html`, and `privacy/index.html`. Preserve existing `alt="eazy.cloud"`, sizing, and link semantics.

- [ ] **Step 2: Replace favicon references**

Use `eazycloud-signet-dark.svg` in `page-template.html`, `root-template.html`, `ui_kits/website/index.html`, `legal/index.html`, and `privacy/index.html`, preserving each file's existing relative/absolute path style.

- [ ] **Step 3: Verify GREEN on focused tests**

Run `node --test --test-name-pattern="canonical eazy.cloud|canonical filenames" tests/site-structure.test.mjs`.

Expected: 2 passing tests, 0 failures.

- [ ] **Step 4: Build and run full verification**

Run `npm test && git diff --check`.

Expected: all tests, build, and built-site checks pass with no whitespace errors.

- [ ] **Step 5: Commit**

```bash
git add assets/eazycloud-logo-dark.svg assets/eazycloud-signet-dark.svg tests/site-structure.test.mjs ui_kits/website/Chrome.jsx ui_kits/website/Closing.jsx ui_kits/website/page-template.html ui_kits/website/root-template.html ui_kits/website/index.html legal/index.html privacy/index.html ui_kits/website/dist/Chrome.js ui_kits/website/dist/Closing.js index.html en/index.html de/index.html
git commit -m "feat: apply canonical eazy.cloud logo system"
```

---

### Task 3: Visual Verification and Documentation

**Files:**
- Inspect: `/en/`, `/de/`, `/legal/`, `/privacy/`
- Modify only for scoped sizing defects: existing logo width styles in the owning source file
- Update: `../2026-07-21 eazy.cloud Website Review Befunde.md`

- [ ] **Step 1: Serve the built site locally and inspect at 1440×900**

Confirm header, footer, legal header, and privacy header show the complete approved lockup with no clipping or distortion.

- [ ] **Step 2: Inspect homepage, legal, and privacy at 375×812**

Confirm the lockup fits the compact header, does not collide with the hamburger/back link, and remains legible.

- [ ] **Step 3: Verify browser identity**

Confirm all four page types expose `/assets/eazycloud-signet-dark.svg` as their favicon href.

- [ ] **Step 4: Re-run tests after any sizing correction**

Run `npm test && git diff --check`; commit a correction only if visual verification required one.

- [ ] **Step 5: Document verified logo rollout**

Append the canonical asset names, page coverage, test count, visual viewports, and non-deployed status to the CloudLotse website review note.
