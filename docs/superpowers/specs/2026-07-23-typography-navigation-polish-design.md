# Typography and Navigation Polish Design

**Date:** 2026-07-23  
**Status:** Approved in conversation — Variant B

## Goal

Improve reading hierarchy and navigation affordance across eazy.cloud while preserving the established visual system. The change combines Sergio's three approved observations: larger lead copy, clearer chapter interaction, and more breathing room around the header logo.

## Lead/Subhead Typography

- Establish 18 px with a 1.55 line height as the shared lead-copy style.
- Apply it to the hero explanation, each of the three chapter-introduction paragraphs, the trust-section introduction, and the final CTA explanation.
- Keep headings, card copy, process descriptions, navigation labels, legal text, and footer copy unchanged.
- Use the same 18 px size on desktop and mobile; existing width constraints continue to control readable line length.
- Implement the style through one shared class so all lead instances remain synchronized.

## Header Logo Spacing

- Increase the unscrolled top bar from 76 px to 92 px.
- Keep the existing 148 px logo width; the perceived improvement comes from vertical space, not a larger mark.
- Preserve the compact scrolled state at 60 px.
- Move the closed mobile menu's top edge from 76 px to 92 px; when scrolled, it continues to start below the 60 px compact header.
- Do not alter the logo asset, horizontal page gutters, navigation spacing, or hero composition.

## Chapter Navigation Interaction

- Preserve the currently selected chapter as a persistent orange tile.
- On pointer devices, preview the same orange tile treatment when a non-selected chapter is hovered.
- Give keyboard users the same orange treatment on `:focus-visible`, plus a clearly visible inset focus outline.
- Orange states use dark title text and the existing dark-orange number color, matching the current selected state.
- Do not introduce hover-dependent behavior on touch devices; taps continue to select and scroll to the chapter.
- Keep the existing 180 ms color/background transition. Disable it under `prefers-reduced-motion` together with the other navigation transitions.

## Asset Coherence

- Rebuild the affected React bundles and localized prerendered pages.
- Advance `mobile.css` and `Chapters.js` to the same new cache-busting revision in `page-template.html`.
- Deploy the affected CSS, bundles, and generated EN/DE pages as one coherent set.

## Verification

- Add regression coverage for the 18 px shared lead style and all intended component hooks.
- Add regression coverage for 92 px default header, 60 px compact header, and matching mobile-menu offsets.
- Add regression coverage for selected, hover, and `:focus-visible` chapter states, including reduced motion.
- Run the complete build/test/site-check suite.
- Verify EN and DE at desktop and mobile widths, including hover, keyboard focus, scroll compaction, mobile menu geometry, wrapping, and horizontal overflow.
- Verify the live site loads matching cache-revision URLs and the expected CSS rules.
