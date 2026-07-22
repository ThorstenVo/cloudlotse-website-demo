# Readable Chapter Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the sticky chapter-navigation typography and contrast for comfortable reading.

**Architecture:** Keep the existing React structure and localized content. Add stable class hooks to the chapter number and title, define their desktop/mobile typography in the responsive stylesheet, and rebuild the existing chapter bundle.

**Tech Stack:** React, CSS, Node test runner, existing static build pipeline

## Global Constraints

- Desktop titles 17 px and numbers 11 px.
- Navigation items at least 88 px high.
- Mobile titles 15 px at widths up to 860 px; numbers remain 11 px.
- Improve inactive text contrast without changing the active orange treatment.
- Preserve three columns, semantics, keyboard behavior and localized copy.

---

### Task 1: Readable chapter typography

**Files:**
- Modify: `tests/site-structure.test.mjs`
- Modify: `ui_kits/website/Chapters.jsx`
- Modify: `mobile.css`

**Interfaces:**
- Consumes: existing `ChapterNav`
- Produces: `.cl-chapter-link`, `.cl-chapter-number`, `.cl-chapter-title`

- [ ] Add a failing regression test for the three class hooks, 88 px height, 17/11 px desktop sizes, 15 px mobile title and improved inactive colors.
- [ ] Run the focused test and confirm it fails because the typography is still inline at 11/8 px.
- [ ] Add the class hooks, move sizing and inactive colors into CSS, and retain active inline colors/background.
- [ ] Run the focused test, full suite, build check and `git diff --check`.
- [ ] Commit as `fix: improve chapter navigation readability`.

### Task 2: Visual verification and deployment

**Files:**
- Deploy: `mobile.css`
- Deploy: `ui_kits/website/dist/Chapters.js`

**Interfaces:**
- Consumes: verified production artifacts
- Produces: readable live navigation in EN and DE

- [ ] Verify 1440×900 and 375×812 for EN/DE, including text size, item height, wrapping, clipping and overflow.
- [ ] Merge into `main` and rerun all tests.
- [ ] Deploy both production files through `$HOME/bin/ftp-deploy.sh`.
- [ ] Confirm byte-identical live artifacts and repeat the browser checks with cache bypass.
- [ ] Push `main` and remove the feature worktree and branch.
