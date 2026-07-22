# Visible Process Line Loop Design

**Date:** 2026-07-22  
**Status:** Approved in conversation  
**Scope:** eazy.cloud Nordwerk process line

## Goal

Keep the progress motion visible when visitors reach the process line. Replace the once-only completed state with a loop that begins at zero whenever the line enters the viewport.

## Behavior

- Use `IntersectionObserver` to add `is-active` while the process line is visible and remove it when it leaves.
- Begin each visible session at zero rather than continuing an off-screen animation.
- Run a roughly 3-second loop while visible: fill for about 1.8 seconds, hold the completed state briefly, then reset quickly and unobtrusively.
- Fill left to right on desktop and top to bottom on mobile.
- Activate markers 01–03 sequentially during every cycle.
- Stop and reset the animation outside the viewport.
- If `IntersectionObserver` is unavailable, keep the loop active so the visual remains useful.

## Accessibility

- Preserve the semantic ordered list, localized label and reading order.
- Under `prefers-reduced-motion: reduce`, disable the loop and show the fully completed orange state.

## Technical approach

- Replace the once-only `processComplete` state with a visibility-driven `processActive` state in `ui_kits/website/Chapters.jsx`.
- Use CSS keyframes for the line and marker loops; JavaScript only controls visibility.
- Preserve the existing prerender guard so no active animation class is baked into static HTML.
- Verify desktop, mobile, English, German, off-screen reset and reduced motion before deployment.
