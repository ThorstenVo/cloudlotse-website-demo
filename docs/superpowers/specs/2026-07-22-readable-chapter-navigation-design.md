# Readable Chapter Navigation Design

**Date:** 2026-07-22  
**Status:** Approved in conversation

## Goal

Improve the readability of the three-part sticky chapter navigation without changing its structure or visual identity.

## Design

- Increase chapter titles from 11 px to 17 px on desktop.
- Increase chapter numbers from 8 px to 13 px so they remain clearly subordinate to, but visually balanced with, the 17 px titles.
- Increase each navigation item from a 74 px to an 88 px minimum height and adjust vertical padding to keep the larger type balanced.
- Use a 1.3 title line height and preserve the existing font weight.
- Raise the contrast of inactive title and number colors while keeping the active orange treatment unchanged.
- At widths up to 860 px, reduce chapter titles to 15 px while retaining 13 px numbers and the three-column layout.
- Preserve keyboard behavior, semantic navigation, sticky positioning and all localized copy.

## Verification

- Add regression coverage for desktop and mobile font sizes, height and inactive colors.
- Verify English and German at 1440×900 and 375×812 with no clipping or horizontal overflow.
- Deploy only the rebuilt chapter bundle and any responsive stylesheet changed by the implementation.
