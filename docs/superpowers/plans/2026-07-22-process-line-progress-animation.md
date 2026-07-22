# Process Line Progress Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the Nordwerk process line once from start to finish when it first enters the viewport.

**Architecture:** The existing React `CaseStudy` component observes its semantic process list and adds one completed-state class when it becomes visible. Existing CSS owns the horizontal and vertical progress tracks, sequential marker activation and reduced-motion fallback; the build pipeline regenerates localized bundles and pages.

**Tech Stack:** React, CSS, IntersectionObserver, Node test runner, existing static build/prerender pipeline

## Global Constraints

- Trigger once when the process line first becomes meaningfully visible.
- Fill left to right on desktop and top to bottom on mobile in approximately 1.5 seconds.
- Keep the completed state after the animation.
- Do not add looping, pulsing, bouncing or text movement.
- Under `prefers-reduced-motion: reduce`, show the completed state immediately.
- If `IntersectionObserver` is unavailable, show the completed state immediately.
- Preserve the semantic ordered list, localized label and current layout.

---

### Task 1: Observer-driven completion state

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `ui_kits/website/Chapters.jsx`

**Interfaces:**
- Consumes: existing `CaseStudy({ copy, shell })` and `.cl-process-line`
- Produces: `processRef`, `processComplete`, and `.is-complete` on the existing `<ol>`

- [ ] **Step 1: Write the failing regression test**

Add assertions requiring a ref-backed once-only observer, `unobserve`, the `.is-complete` class and an immediate fallback when `IntersectionObserver` is absent.

- [ ] **Step 2: Verify the test fails**

Run: `node --test --test-name-pattern="process line animates" tests/site-structure.test.mjs`  
Expected: FAIL because the observer state does not yet exist.

- [ ] **Step 3: Implement the minimal observer state**

Inside `CaseStudy`, add a ref and boolean state. Observe the list at a threshold near 0.35, set completion once, unobserve the element and clean up with `disconnect`. If the observer API is unavailable, set completion immediately.

- [ ] **Step 4: Verify the focused test passes**

Run: `node --test --test-name-pattern="process line animates" tests/site-structure.test.mjs`  
Expected: PASS.

### Task 2: Progress track and sequential marker animation

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `mobile.css`

**Interfaces:**
- Consumes: `.cl-process-line.is-complete` from Task 1
- Produces: `.cl-process-line::after` progress overlay and delayed active marker states

- [ ] **Step 1: Write the failing CSS regression test**

Require an orange `::after` overlay, horizontal `scaleX` growth, mobile `scaleY` growth, three delayed marker transitions and a reduced-motion completed-state rule.

- [ ] **Step 2: Verify the CSS test fails**

Run: `node --test --test-name-pattern="process line animates" tests/site-structure.test.mjs`  
Expected: FAIL because the progress overlay is absent.

- [ ] **Step 3: Implement the minimal CSS**

Layer an orange 2 px `::after` track over the neutral `::before` track. Transition its transform for 1.5 seconds from the start edge. Transition marker background/color with delays aligned to 0 s, 0.75 s and 1.45 s. Switch the transform axis and origin inside the existing mobile breakpoint. Disable transitions and show the end state in the existing reduced-motion block.

- [ ] **Step 4: Run the focused and complete tests**

Run: `node --test tests/site-structure.test.mjs && npm test && git diff --check`  
Expected: all tests and the built-site check pass.

- [ ] **Step 5: Commit implementation**

Commit `tests/site-structure.test.mjs`, `ui_kits/website/Chapters.jsx`, `mobile.css`, rebuilt `ui_kits/website/dist/Chapters.js`, `en/index.html` and `de/index.html` with message `feat: animate process line progress`.

### Task 3: Visual and live verification

**Files:**
- Deploy: `mobile.css`
- Deploy: `ui_kits/website/dist/Chapters.js`
- Deploy: `en/index.html`
- Deploy: `de/index.html`

**Interfaces:**
- Consumes: verified production artifacts from Tasks 1 and 2
- Produces: deployed animation at `https://eazy.cloud/en/` and `https://eazy.cloud/de/`

- [ ] **Step 1: Verify locally in a browser**

At 1440×900 confirm the orange overlay grows left to right and markers activate in order. At 375×812 confirm the overlay grows top to bottom, no horizontal overflow appears, and the final state persists after scrolling away and back.

- [ ] **Step 2: Deploy through the credential-safe wrapper**

Upload only the four production files with `$HOME/bin/ftp-deploy.sh eazycloud <local> /eazy.cloud/<remote>`.

- [ ] **Step 3: Verify public deployment**

Use cache-busting queries to confirm HTTP 200, byte-identical production artifacts, correct horizontal/vertical animation and no console errors on English and German pages.

- [ ] **Step 4: Push `main`**

Run `git push origin main` after the live verification succeeds.
