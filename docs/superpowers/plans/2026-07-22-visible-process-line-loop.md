# Visible Process Line Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the once-only process-line fill with a loop that starts at zero and runs only while the line is visible.

**Architecture:** `IntersectionObserver` toggles one `is-active` state on every visibility change. CSS keyframes own the repeating horizontal/vertical fill and sequential markers; reduced motion renders the completed state without animation.

**Tech Stack:** React, CSS keyframes, IntersectionObserver, Node test runner, existing build/prerender pipeline

## Global Constraints

- Start at zero whenever the process line enters the viewport.
- Loop for roughly 3 seconds while visible and reset outside the viewport.
- Fill left to right on desktop and top to bottom on mobile.
- Animate markers 01–03 sequentially in every cycle.
- Under `prefers-reduced-motion: reduce`, show the completed state without motion.
- Preserve semantic HTML, localized labels and the prerender guard.

---

### Task 1: Visibility-driven active state

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `ui_kits/website/Chapters.jsx`

**Interfaces:**
- Consumes: `.cl-process-line` and the existing prerender guard
- Produces: `processActive` and `.is-active`

- [ ] Write a failing source regression test requiring `setProcessActive(entry.isIntersecting)`, no `unobserve`, and `.is-active`.
- [ ] Run the focused test and confirm it fails because once-only state remains.
- [ ] Replace `processComplete` with visibility state; keep observing until cleanup and activate immediately only when the API is unavailable.
- [ ] Run the focused test and confirm it passes.

### Task 2: CSS loop

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `mobile.css`

**Interfaces:**
- Consumes: `.cl-process-line.is-active`
- Produces: `cl-process-progress` and `cl-process-marker` keyframes

- [ ] Write failing assertions for 3-second infinite animations, desktop `scaleX`, mobile `scaleY`, sequential marker timing and reduced-motion overrides.
- [ ] Run the focused test and confirm it fails because transitions are still once-only.
- [ ] Replace transitions with keyframes active only under `.is-active`; use a completed hold and a quick reset at the cycle boundary.
- [ ] Run `node --test tests/site-structure.test.mjs && npm test && git diff --check` and require all checks to pass.
- [ ] Commit source, tests and rebuilt bundle as `fix: loop process line while visible`.

### Task 3: Verify and deploy

**Files:**
- Deploy: `mobile.css`
- Deploy: `ui_kits/website/dist/Chapters.js`

**Interfaces:**
- Consumes: verified build artifacts
- Produces: public loop on English and German pages

- [ ] At 1440×900 and 375×812 verify zero state before entry, repeating progress while visible, reset after exit, correct axis and no overflow.
- [ ] Upload both production files through `$HOME/bin/ftp-deploy.sh`.
- [ ] Confirm byte-identical live artifacts and repeat browser verification with cache bypass.
- [ ] Merge into `main`, push GitHub, and remove the feature worktree and branch.
