# Process Line Progress Animation Design

**Date:** 2026-07-22  
**Status:** Approved in conversation  
**Scope:** eazy.cloud Nordwerk process line on the localized homepage

## Goal

Animate the existing process line once when it first enters the viewport. The motion should clarify the sequence from recognition through connection to preparation without changing the section layout or adding decorative effects.

## Visual behavior

- Keep the current neutral line visible as the inactive track.
- Add a 2 px orange progress line above it.
- On desktop, fill the progress line from left to right over approximately 1.5 seconds.
- On mobile, fill the vertical progress line from top to bottom over the same duration.
- Change markers 01, 02 and 03 from dark to orange as the progress reaches each station.
- Do not add pulsing, bouncing, text movement or looping.
- After the animation completes, keep the line and all three markers in their active orange state.

## Trigger and state

- Use `IntersectionObserver` to start the animation when the process line first becomes meaningfully visible.
- Trigger only once during the page lifetime.
- Apply a state class to the existing semantic `<ol>`; CSS owns the animation and visual states.
- If `IntersectionObserver` is unavailable, show the completed state immediately so the section never appears unfinished.

## Accessibility

- Preserve the existing semantic ordered list and localized accessible label.
- The animation communicates progression but does not hide content or change reading order.
- Under `prefers-reduced-motion: reduce`, skip the transition and render the completed orange state immediately.

## Technical scope

- Extend the existing `CaseStudy` component in `ui_kits/website/Chapters.jsx` with one observer-driven state.
- Extend the existing process-line rules in `mobile.css` with an orange overlay and active marker transitions.
- Rebuild localized output and generated bundles using the existing build pipeline.
- Add regression coverage for the observer trigger, once-only state and reduced-motion fallback.

## Verification and deployment

- Run the complete automated test suite and built-site check.
- Visually verify desktop at 1440×900 and mobile at 375×812.
- Confirm horizontal desktop progress, vertical mobile progress, no overflow and a persistent completed state.
- Deploy only after the implementation passes all checks, then verify the public English and German pages with cache-busting.
