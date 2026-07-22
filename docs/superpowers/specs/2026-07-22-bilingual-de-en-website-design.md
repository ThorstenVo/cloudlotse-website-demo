# Bilingual German/English Website Design

**Date:** 2026-07-22  
**Status:** Approved in brainstorming; awaiting written-spec review  
**Scope:** eazy.cloud public main page

## Goal

Make the existing DE/EN control functional by publishing complete, independently addressable German and English versions of the eazy.cloud main page. Both versions must be statically prerendered, indexable, accessible without JavaScript, and generated from the same React components.

## Confirmed product decisions

- German copy is idiomatic marketing German, not a literal translation.
- German copy avoids direct address (`du` and `Sie`) wherever possible.
- On a first visit to `/`, German is selected for a German browser language and English otherwise.
- A manual language choice is stored and takes precedence on later visits to `/`.
- Public language URLs are `/de/` and `/en/`.
- Switching language keeps the current section hash, for example `/en/#workflows` becomes `/de/#workflows`.
- This iteration translates only the main page. The legal notice and privacy policy remain English.

## Non-goals

- Translating or restructuring the legal notice and privacy policy.
- Adding a CMS or third-party i18n framework.
- Changing the page's positioning, examples, numerical claims, section order, visual identity, or consent behavior.
- Adding more languages.
- Conversion tracking for the email CTA.

## Architecture

### Shared translation model

One structured translation module contains every language-dependent value used by the main page. Its two top-level locales are `en` and `de`. It covers:

- document title and meta description;
- navigation and chapter labels;
- hero, intro, stage, case-study, knowledge, workflow, trust, CTA, and footer copy;
- CTA email subject;
- meaningful image alternative text;
- accessible labels such as main navigation, language selection, and mobile-menu open/close labels.

The locale objects must have identical shapes. A build-time validation fails on missing keys, extra keys, unsupported locales, or empty required values. There is no silent per-key fallback, because mixed-language output would be a publishing defect.

React components remain shared. They receive the selected locale's copy object and render the same structure for both languages. Repeated structured content, such as intro rows, chapters, flow steps, and trust cards, remains represented as arrays in the translation model.

### Locale source of truth

On `/de/` and `/en/`, the locale encoded in the generated document is the only source of truth. The client app reads that locale during hydration. It must not re-run browser-language detection, which could cause the hydrated output to disagree with the prerendered HTML.

The existing transient `lang` React state is removed as the authority for the page language. Language controls become real links to the alternate locale URL. Their click handler only stores the explicit choice before normal navigation.

### Static generation

The build compiles the shared JavaScript bundles once and prerenders the app once per supported locale. It writes:

- `en/index.html` with `<html lang="en">` and English prerendered markup;
- `de/index.html` with `<html lang="de">` and German prerendered markup;
- a small root `index.html` that performs language selection and does not duplicate the main-page content.

Shared scripts, styles, privacy resources, images, and legal pages remain at the web root. References needed by the nested locale pages use root-absolute paths so direct visits and hash navigation resolve consistently. This path normalization is limited to what the locale structure requires.

Each localized page hydrates its own prerendered markup. The existing rule remains: prerendered markup uses `hydrateRoot`; an empty root uses `createRoot` as a development fallback.

## Root language selection

The root page `/` uses this order:

1. Read the stored explicit choice if it is exactly `de` or `en`.
2. Otherwise inspect the browser language list. Select German if the first matching supported language begins with `de`; select English otherwise.
3. Preserve any recognized section hash when redirecting.

The storage key is versioned and dedicated to language preference. Storage access is wrapped so privacy settings or browser restrictions cannot prevent navigation. If storage is unavailable, browser detection still works and explicit language links still navigate; only persistence is lost.

Without JavaScript, `/` displays a minimal language chooser with links to `/de/` and `/en/`, with English presented first as the international fallback. The localized pages themselves remain fully readable without JavaScript.

## Language switch behavior

All header, mobile-menu, and footer language controls use the same link-generation helper.

- The active locale is marked with `aria-current="page"` and is not treated as a navigation target.
- The alternate locale link points to the equivalent localized URL.
- Only known content hashes are retained: `#possibilities`, `#tasks`, `#knowledge`, `#workflows`, `#approach`, and `#contact`.
- Unknown hashes are discarded rather than copied to a broken target.
- A language switch closes the mobile menu through normal page navigation.
- The explicit selection is saved before navigation when storage is available.

## German editorial direction

The translation preserves the English page's meaning, examples, figures, and information hierarchy while using natural German phrasing. Direct address is replaced with neutral constructions.

Representative choices:

- `Intelligent workflows. Clear paths.` → `Intelligente Workflows. Klare Wege.`
- `Review a workflow` → `Workflow prüfen lassen`
- `Your team reviews and decides.` → `Prüfung und Entscheidung bleiben beim Team.`
- `Your customer data stays where it belongs.` → `Kundendaten bleiben dort, wo sie hingehören.`

German headings should stay close enough to the English visual length to preserve the design. Copy quality takes precedence over forced brevity. If a strong German phrase wraps differently, only targeted responsive typography or spacing may be adjusted; the shared layout must not fork by locale.

In the German footer, legal links are labelled `Impressum` and `Datenschutz` but point to the existing English `/legal/` and `/privacy/` pages. Translating those destinations and adding language controls there is explicitly deferred.

## SEO and document metadata

Each localized page has:

- a locale-specific title and meta description;
- a self-referencing canonical URL;
- alternate links for `de`, `en`, and `x-default`;
- a correct `<html lang>` value.

`x-default` points to `/`, the language-selection entry point. The sitemap includes `/de/` and `/en/` and their alternate-language relationship. The root selector is not intended to compete with localized pages for content indexing.

## Error handling

- Build-time translation validation stops the build on schema mismatch or missing required copy.
- An unsupported document locale stops prerendering instead of falling back silently.
- Failed or blocked `localStorage` access is ignored after preserving navigation behavior.
- If root browser-language inspection is unavailable, the selector chooses English.
- Language links are valid ordinary anchors, so switching works even if the React click handler fails; only preference persistence may be skipped.

## Testing and verification

### Automated checks

- Translation objects have identical keys and valid required values.
- Both locale builds complete and produce substantial prerendered markup.
- English content is present in `en/index.html`; German content is present in `de/index.html`.
- Each document has the expected `lang`, canonical, alternate, title, and description values.
- The root selector follows stored preference before browser language and defaults to English when no German preference applies.
- Language URL generation preserves recognized hashes and drops unknown hashes.
- Sitemap entries include both localized URLs.
- Existing unit tests, build checks, and consent tests remain green.

### Browser verification

- First visit with German and non-German browser languages.
- Stored choice overriding browser language on a later root visit.
- DE to EN and EN to DE switching from the top and from each named section.
- Header, mobile menu, and footer controls on desktop and mobile widths.
- No hydration warnings or console errors on either locale.
- No horizontal overflow or broken heading layout in German at current responsive breakpoints.
- Images, styles, scripts, consent UI, legal links, and privacy links load from both locale paths.
- Both localized pages display full content with JavaScript disabled.

## Acceptance criteria

The feature is complete when:

1. `/de/` and `/en/` serve complete, correct, prerendered versions of the main page.
2. Every visible and accessible main-page string is localized, with no unintended mixed-language output.
3. `/` selects the expected locale from stored preference and browser language.
4. Every language control switches to the corresponding locale and retains the current recognized section.
5. Both locale pages expose correct language and SEO metadata.
6. The German page uses approved neutral, idiomatic B2B copy and remains visually sound on desktop and mobile.
7. Existing consent behavior and all automated tests continue to pass.

## Deployment note

Deployment includes the root selector, both locale directories, updated shared bundles, sitemap, and any path-adjusted shared files. Live verification must use hard reloads because static assets currently have a 15-minute cache lifetime. Deployment itself requires explicit execution through the existing credential-safe FTP wrappers and is not implied merely by completing the implementation.
