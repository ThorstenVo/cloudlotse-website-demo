# Handoff: eazy.cloud Marketing Website

## Live production site

The root-hosted production site is published at [https://eazy.cloud/](https://eazy.cloud/).
The generated paths use root-absolute asset references, so preview it from the
repository root rather than from a project subpath.

## Local production build

Run `npm install`, `npm test`, and `npm run build`. Serve the repository root
through HTTP and verify `/`, `/en/`, and `/de/`. These are the generated
production outputs; they load only local scripts and stylesheets. Do not
restore runtime Babel or CDN dependencies.

## Source preview (design reference only)

`/ui_kits/website/` is a separate source-preview reference for the design
handoff. It is not the generated production output and must not be used to
verify locale routing.

## Bilingual site build

`npm run build` generates the root language selector as well as the localized
`/en/` and `/de/` pages. All localized copy lives in
`ui_kits/website/translations.mjs`; a missing required translation key stops
the build. The DE/EN toggle navigates between these prerendered language routes,
keeps a recognized section hash, and stores the chosen language for later visits
to `/`.

For local verification, serve the repository through HTTP and open `/`, `/en/`,
and `/de/` rather than opening files with `file://`. Deployment artifacts include
the root selector, both locale directories, updated shared bundles, and
`sitemap.xml`. The legal notice and privacy pages remain English by product
decision.

## Analytics launch checklist

Analytics is intentionally disabled while `privacy/analytics-config.js`
contains `gtmContainerId: null`.

Before enabling analytics:

1. Replace `null` with the verified eazy.cloud `GTM-...` container ID.
2. Publish only one GA4 Google tag in that container; do not add advertising
   or unapproved third-party tags.
3. Set GA4 user and event data retention to two months.
4. Use basic consent mode: no GTM script, consent ping, or analytics request
   may reach Google before acceptance.
5. Confirm rejection leaves the website fully functional.
6. Confirm `Privacy settings` reopens the choices and withdrawal reloads the
   page without Google.
7. Compare the final GTM/GA4 configuration with the Privacy page and obtain
   legal review before launch.

This repository is a review prototype, not production code. The inert `.txt`
suffixes from the original handoff archive were removed so the source preview
can load its React bundles directly over local HTTP.

## Overview
Single-page, long-scroll marketing site for **eazy.cloud** — "intelligent workflows that bring order to the daily data chaos." Order: hero → 3-step value prop → chapter nav + 3 service chapters (each a split "stage" + a proof/detail block) → data-sovereignty trust section → final CTA → footer. Complete English and German copy is generated from one validated catalog.

## About the design files
These are **design references** (an HTML + React-via-Babel prototype), not production code. Recreate them in the target codebase's environment (React/Next, Astro, Vue…) using its patterns and build. Styling uses inline styles referencing CSS custom properties in `styles.css`/`tokens/` — map them to your styling system. `_ds_bundle.js` is a **generated** bundle of the primitives; rebuild those as your component set, don't ship it.

## Fidelity
**High-fidelity.** Exact colours, type, spacing and interactions are below and in the files.

## Screens (scroll order)
1. **Header (dark, ~76px):** eazy.cloud logo; nav Possibilities/Approach/Contact → `#possibilities`/`#approach`/`#contact`; DE/EN toggle (active orange); outline CTA "Review a workflow" → `mailto:support@eazy.cloud?subject=eazy.cloud%20workflow%20review`.
2. **Hero "document stream" (dark):** copy left, animated doc stack right — four cards scatter→align on an 8s loop (`cl-docmove`, .4s stagger, top card orange border). Kicker "Intelligence for everyday work"; H1 "Intelligent / workflows. / Clear paths." (`clamp(58px,7.5vw,112px)`,800,uppercase,lh.88); sub-copy "Scattered information becomes an ordered flow — eazy.cloud brings order to the daily data chaos." + primary CTA.
3. **"What becomes possible" — process triad (paper):** left Label + H2 "From chaos to clarity."; right 3 rows (number / verb head / description) with an orange marker bar cycling the active row every 1800ms.
4. **Chapter nav (sticky dark, 3 tabs):** 01 Take over tasks · 02 Make knowledge available · 03 Connect workflows; active tab orange; IntersectionObserver scroll-spy (`rootMargin: -34% 0px -52% 0px`); click smooth-scrolls.
5. **Stages ×3 (split-panel, min-h 620):** grid `.82fr/1.18fr` — left ink panel (giant orange number, kicker, white uppercase title, sub-copy), right photo (`saturate(.82) contrast(1.03)`, left scrim). Images 01 `tasks-digital-workflow.jpg` · 02 `knowledge-digital-brain.jpg` · 03 `clear-route.jpg`. (03 copy also covers collaboration.)
6. **Detail after 01 — time-centric (paper):** H3 "From 130 minutes of manual work to a 25-minute review."; before/after `130 min`(grey) vs `25 min`(orange, 19% track); "−81%"; chips Recognise/Connect/Prepare.
7. **Detail after 02 — evidence spotlight (dark):** question + H3 "An evidence-based answer — built only from the project's own sources."; 3 source docs pinned with orange number badges; ink answer card (orange top border) with sources line.
8. **Detail after 03 — payload handoff (dark):** 4 stage cards joined by orange `→`, each with a payload list; outcome line.
9. **Trust — deployment options / sovereignty (white):** H2 "Your customer data stays where it belongs."; 3-column matrix — **Private cloud** (EU·managed), **Self-hosted** (on-prem), **Connected services** (opt-in per workflow); foundation line "Open source & auditable · EU-based · no customer data used for training." Keep honest (no blanket privacy claims).
10. **Final CTA — route flare (dark, `clear-route.jpg`):** a screen-blended copy with a centre-focused radial mask pulses so the route flares up/fades on a loop. Tweakable via `:root` vars `--cl-flare-peak` (def .85) and `--cl-flare-dur` (def 8s), keyframes `cl-flare`. H2 "Which workflow costs your team unnecessary time every day?" + primary CTA.
11. **Footer (near-black, big brand):** mark + tagline; columns Navigation / Contact (mailto) / Legal (incl. "EU data processing"); bottom bar © + DE/EN.

## Interactions
Chapter scroll-spy + click-scroll; DE/EN controls link between prerendered /de/ and /en/ routes, retain recognized section hashes, and persist an explicit language selection; hero `cl-docmove` loop (freeze under `prefers-reduced-motion`); intro marker 1800ms; final flare `cl-flare` driven by the two CSS vars (exposed as Tweaks "Strength" 0.3–1 and "Cycle" 4–16s). Buttons: primary orange/ink, uppercase 11px/800, square, hover `#ff805b` + `translateY(-2px)` ~180ms; outline = white 72% border on dark; all CTAs are `mailto:`. Motion 150–180ms ease, no bounce/parallax.

## State
Locale comes from document lang on each prerendered route; shared copy comes from the validated catalog. Runtime state is `activeChapter` (tasks/knowledge/workflows), intro `activeRow` (0–2), and Tweaks `flareStrength`/`flareSeconds`.

## Design tokens
**Colours** Ink `#101411` · Paper `#f3f4f0` · White `#fff` · Signal `#ff6a3b` (hover `#ff805b`, ink-on-signal `#6b2a18`) · Muted `#68716b` · Line `#b8c0ba` · Darks `#070807`/`#050605`/`#0a0c0a` · Dark hairlines `#343a36`/`#303531`/`#26302a` · Text greys `#4d5650`/`#555e58`/`#59625c`/`#6c756f` · Success `#1e7350` · Logo greens `#1e7350`/`#35a06a`/`#8fd14f`, on-dark `#3fbf7a`/`#5fd08f`/`#b6ed6f`.
**Type** `"Helvetica Neue", Helvetica, Arial, sans-serif` (no webfont); identity = 800 + UPPERCASE + lh .88–.9. Body 16 / 15 / 14; UI 11 / meta 10 / label 9 / micro 8.
**Spacing** px 2 4 8 10 12 14 18 24 28 34 40 50 60 84; section padding ~104–120.
**Layout** centered shell `min(1400px, 100% - 72px)`; asymmetric ~0.4/1.6 grids; ink top+bottom frames.
**Radius 0** everywhere (only proof-step dots + logo badge use 50%); hairline 1px borders; doc shadow `0 18px 46px rgba(12,16,13,.16)` light / `rgba(0,0,0,.55)` dark.

## Assets (`assets/`)
`logo.svg` + `logo-dark.svg` + `logo/` (mark + lockup, light/dark, SVG+PNG); wordmark is single-colour (ink on light, white on dark) — recreate the mark from `logo.svg`, don't redraw. `clear-route.jpg` (hero-adjacent, stage 03, final CTA), `tasks-digital-workflow.jpg` (stage 01), `knowledge-digital-brain.jpg` (stage 02), `tender.png`/`datasheet.png`/`visit-note.png` (doc specimens), `cloudlotse-symbol.png` (legacy, reference only). Photos are placeholders — replace with licensed imagery. Source: https://github.com/ThorstenVo/cloudlotse-website-demo.

## Files
`ui_kits/website/index.html` (entry, scroll-spy, flare Tweaks), `Chrome.jsx` (top bar), `Hero.jsx` (hero + intro), `Chapters.jsx` (nav + 3 stages + 3 detail blocks), `Closing.jsx` (Trust, Final flare, Footer), `tweaks-panel.jsx` (prototype only). `styles.css` + `tokens/` (design tokens). `components/` (primitives to rebuild, each with `.d.ts` + `.prompt.md`). `_ds_bundle.js` (generated, don't ship). `assets/`. Preview: serve the folder, open `ui_kits/website/index.html`.

## Note on file extensions
So this reference copy stays inert inside the CloudLotse design-system project, source files here carry a trailing `.txt` (e.g. `Hero.jsx.txt`, `Brand.d.ts.txt`) and the `@dsCard`/`@startingPoint` markers are disabled. **To run or build: strip the `.txt` suffix** from those files. For a ready-to-run static copy (no renaming needed), use the separate `site_export` package instead — this handoff is optimised for reading and rebuilding.
