# Responsive Gutters and Mobile Language Switch Design

**Date:** 2026-07-22

## Goal

Give all text and controls a reliable horizontal safety zone across the website and restore dependable English-to-German and German-to-English switching on mobile.

## Problem 1: Page content reaches the viewport edge

The shared container currently uses a nested inline CSS expression combining `min()`, `calc()` and `clamp()`. The prerendered HTML serializes that expression incorrectly, so the browser can lose the intended container width. This is visible in the hero and repeats across most sections that consume `window.shellStyle`.

## Approved spacing direction

Thorsten selected option B, “Ausgewogen”. Replace the fragile width expression with a shared box-model container:

- `width: 100%`
- centered `max-width` for very wide screens
- `padding-inline: clamp(28px, 5vw, 96px)`
- `box-sizing: border-box`

The maximum width will be `1800px`. At common desktop sizes the content receives roughly 72–96 px of inner spacing. Tablet spacing scales fluidly, and mobile keeps at least 28 px. Full-bleed backgrounds and images stay full width; text, controls and content grids move inward.

The change applies through the existing shared `shellStyle` to the top bar, hero, intro, case studies, knowledge section, system flow, trust section, closing CTA and footer. Existing intentional full-bleed chapter media remains unchanged.

## Problem 2: Mobile language switching fails in both locations

The mobile menu and footer share `LocaleSwitch`. Its click handler currently cancels native anchor navigation with `preventDefault()` and replaces it with `window.location.assign()`. Both failing placements therefore share the same avoidable JavaScript navigation dependency.

## Approved language-switch behavior

Keep DE and EN as native links with real `/de/` and `/en/` fallback destinations. The click handler will no longer call `preventDefault()` or `window.location.assign()`.

On click, JavaScript may:

1. store the chosen locale in `localStorage`; and
2. update the anchor destination to retain a known current section hash.

The browser then performs normal link navigation. If JavaScript or hydration is unavailable, the original anchor still navigates to the other language. The same component behavior applies to desktop, the open mobile menu and the footer.

## Scope

- Modify the shared page-container definition in `ui_kits/website/Chrome.jsx`.
- Modify the shared navigation behavior in `ui_kits/website/LocaleSwitch.jsx`.
- Do not change copy, typography, section structure, full-bleed backgrounds or image positioning.
- Apply identical layout behavior to German and English.
- Preserve the stored language preference and known section hashes when JavaScript runs.

## Testing and verification

- Add a regression test that rejects the fragile nested shell-width expression and requires the approved box-model properties.
- Add a regression test that requires native locale anchors and rejects `preventDefault()` and `window.location.assign()` in `LocaleSwitch`.
- Run the complete build and test suite.
- Inspect generated German and English HTML to confirm that the new shell style serializes as valid CSS.
- Test desktop, tablet and mobile widths visually.
- On mobile, verify both English → German and German → English from the hamburger menu and footer.
- After deployment, verify both locale pages return HTTP 200 and expose reciprocal native links.
