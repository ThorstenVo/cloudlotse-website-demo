# Final Whole-Branch Review Fix Report

Date: 2026-07-22

## Scope

Implemented the complete final-review fix set without deploying or pushing:

- Replaced the incompatible GitHub Pages project-path preview claim with the
  root-hosted production context for `https://eazy.cloud/`.
- Restored the source-preview bundle order: `vendor`, `_ds_bundle`, `i18n`,
  `LocaleSwitch`, `Chrome`, `Hero`, `Chapters`, `Closing`, `app`.
- Localized the accessible home label, including `eazy.cloud Startseite` in
  German output.
- Made `npm test` build before generated-page tests and strengthened the
  post-build site check with catalog-driven, exact SEO metadata assertions.
- Documented functional, persistent prerendered locale routing in the README.
- Added a catalog guard for stable `tasks`, `knowledge`, and `workflows`
  chapter IDs.

## RED evidence

New regression tests were added before the implementation, then run with:

```sh
node --test tests/i18n.test.mjs tests/site-structure.test.mjs
```

Expected failures occurred because the required production guards did not yet
exist:

```text
SyntaxError: The requested module '../ui_kits/website/locale-core.mjs'
does not provide an export named 'CHAPTER_IDS'

SyntaxError: The requested module '../scripts/check-built-site.mjs'
does not provide an export named 'assertLocalizedMetadata'
```

The first post-implementation focused run also correctly caught stale generated
German output: `German generated page uses its localized home label` failed
while `de/index.html` still contained `aria-label="eazy.cloud home"`. Running
the build regenerated the page and made the assertion pass.

## GREEN evidence

Focused build and checks:

```sh
npm run build && node --test tests/i18n.test.mjs tests/site-structure.test.mjs && npm run check:site
```

Output summary:

```text
Prerendered 45220 chars into en/index.html
Prerendered 45694 chars into de/index.html
# tests 23
# pass 23
# fail 0
Built localized sites use local scripts and localized copy only.
```

Final full suite (after all implementation changes):

```sh
npm test
```

Output summary:

```text
> test
> npm run build && node --test tests/*.test.mjs && npm run check:site

Prerendered 45220 chars into en/index.html
Prerendered 45694 chars into de/index.html
# tests 31
# pass 31
# fail 0
Built localized sites use local scripts and localized copy only.
```

`git diff --check` produced no output.

## Local HTTP smoke evidence

Started a local server from the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Used a Playwright browser check that waited for network idle, then inspected
the hydrated root, browser console errors, and page exceptions:

```text
/de/                 status 200, rootChars 45694, consoleErrors [], pageErrors []
/en/                 status 200, rootChars 45220, consoleErrors [], pageErrors []
/ui_kits/website/    status 200, rootChars 45581, consoleErrors [], pageErrors []
```

This confirms the localized production paths and retained source-preview path
load successfully without console or hydration errors.

## Files changed

- `README.md`
- `package.json`
- `scripts/check-built-site.mjs`
- `tests/i18n.test.mjs`
- `tests/site-structure.test.mjs`
- `ui_kits/website/Chrome.jsx`
- `ui_kits/website/index.html`
- `ui_kits/website/locale-core.mjs`
- `ui_kits/website/translations.mjs`
- regenerated `de/index.html`
- regenerated browser bundles: `ui_kits/website/dist/Chrome.js`,
  `ui_kits/website/dist/i18n.js`, `ui_kits/website/dist/root-router.js`

## Self-review

- The README no longer advertises a GitHub Pages project-path preview; it names
  the root-hosted production URL and explicitly avoids project-subpath use.
- The source preview loads its dependencies in the same required order as the
  prerenderer; a structural test locks this down.
- Both translation catalogs have identical `a11y.home` keys; Chrome consumes
  the catalog value, and generated German HTML is regression-tested.
- `check:site` imports the catalog instead of duplicating title, description,
  or CTA expectations; it validates exact title, description, self-canonical,
  and all three alternates after a fresh build.
- Stable chapter IDs are explicitly validated for each locale, so a translated
  ID cannot silently break anchors, scrolling, or locale-hash navigation.
- No deployment or push was performed.

## Concerns

None identified. The local server is only a temporary verification process and
does not alter or deploy project state.
