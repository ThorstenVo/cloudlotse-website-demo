# Sticky Navigation and Process Line Design

Date: 2026-07-22
Status: approved for implementation

## Goal

Address two findings from external user feedback without changing the established eazy.cloud visual language:

1. Keep the primary navigation reachable while scrolling.
2. Replace the three white process-step boxes below the Nordwerk case study with a visualization that cannot be mistaken for form inputs.

## Navigation

The existing top bar remains transparent over the hero at the top of the page. After the page begins scrolling, it changes to a compact fixed state with:

- a near-black opaque background that matches the site's dark sections;
- a fine lower divider;
- reduced height and restrained transition;
- the existing logo, desktop navigation, locale switch, and CTA;
- the existing hamburger interaction on mobile.

The header must remain above the sticky chapter navigation. Anchor navigation must not hide section headings behind the fixed header. Motion must be reduced or omitted when `prefers-reduced-motion` is enabled.

## Process Steps

Replace the three separate white bordered rectangles for `Recognise`, `Connect`, and `Prepare` with an open process line:

- three numbered stations (`01`, `02`, `03`);
- a continuous horizontal rail on desktop;
- the first station highlighted with the existing signal color and the remaining stations using the existing dark ink color;
- each station contains its existing localized title and concise supporting copy;
- no white field surfaces, input-like borders, hover affordance, focus affordance, or text cursor;
- a vertical rail on narrow screens while preserving the same order and content.

The component remains informational and uses semantic list markup.

## Technical Scope

- Extend the existing `Chrome.jsx` component and stylesheet hooks for the scrolled header state.
- Extend the existing `CaseStudy` output in `Chapters.jsx` for the process line.
- Add localized supporting copy to the existing translation catalog if needed.
- Rebuild the checked-in distribution bundles through the existing build pipeline.
- Do not add dependencies or refactor unrelated sections.

## Verification

Automated checks must cover:

- a scroll-aware header state and fixed/sticky navigation styling;
- semantic process-list markup and three ordered stations;
- localized step content in English and German;
- preservation of the mobile hamburger and existing navigation behavior;
- successful full build and existing test suite.

Visual verification must inspect at least one desktop and one mobile viewport and confirm:

- the compact header remains readable and does not cover content;
- the chapter navigation stacks correctly below it;
- the process line reads as a sequence rather than as editable fields;
- the mobile process line becomes vertical without overflow.

## Deployment

Implementation and local verification do not authorize deployment by themselves. Deploy only after the verified result has been presented and deployment is explicitly confirmed or otherwise clearly requested.
