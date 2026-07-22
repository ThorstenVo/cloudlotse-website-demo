# Final German Website Copy Design

**Date:** 2026-07-22

## Goal

Replace the current German website copy with Thorsten's selected and edited wording while leaving the English site unchanged. Correct the language errors found during review and use one clear German call to action throughout the page.

## Approved German call to action

Every visible German CTA button and the matching footer link will read:

> Arbeitsablauf besprechen

The existing internal email subject remains `eazy.cloud Workflow-Prüfung`. It is not visible as website copy and stays unchanged.

## Approved copy source

The source of truth is:

`/Users/thorsten/Library/Mobile Documents/com~apple~TextEdit/Documents/Deutscher Webseitentext - TV.txt`

The mixed A/B wording in that file is intentional. The implementation applies these review corrections:

- SEO description: replace the dash and fragment with three complete sentences ending in “Dabei bleibt unter Kontrolle, wo die Daten verarbeitet werden.”
- Intro item 03: use “prüfbare Grundlage” instead of “prüfungsreife Grundlage”.
- Intro item 03: capitalize “Suchen” in “Langes Suchen entfällt.”
- Chapter 03: restore the missing final period.
- Use “Arbeitsablauf besprechen” instead of either “Workflow prüfen lassen” or “Workflow gemeinsam prüfen”.

## Scope

- Update only the German translation catalog and generated German build output.
- Keep English copy, accessibility labels, email subject, legal-page content and image alt text unchanged.
- Regenerate the localized static pages through the existing build process.
- Do not introduce new components or change the page layout.

## Verification

- Add exact catalog assertions for the approved German copy before implementation and confirm that they fail against the old text.
- Run the complete test and build suite after implementation.
- Confirm that the German generated page contains the new SEO title, description, hero copy, corrected intro copy and CTA.
- Confirm that the English translation catalog and generated English page are unchanged.
- Check the locale links in both generated pages.
