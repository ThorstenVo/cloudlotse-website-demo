# Canonical eazy.cloud Logo Rollout Design

Date: 2026-07-22
Status: approved for implementation

## Goal

Replace every active website reference to legacy or non-canonical eazy.cloud logo artwork with the approved assets from the CloudLotse Logo System manifest.

## Canonical Source

The only permitted source is:

`03 Bereiche/CloudLotse/Ressourcen/Design System CloudLotse + eazy.cloud/Logo System/manifest.json`

The manifest is approved with schema version 1. Assets must be used as supplied without recoloring, redrawing, effects, geometry changes, or recombination.

## Asset Selection

- Dark website surfaces use the complete eazy.cloud dark lockup from `brands.eazyCloud.dark.lockup`.
- Compact browser identity uses the eazy.cloud dark symbol from `brands.eazyCloud.dark.symbol`.
- SVG is used throughout because all target surfaces support it.

The complete brand name must remain visible in the main header, footer, legal page, and privacy page. The symbol is reserved for the favicon/browser icon.

## Replacement Scope

Replace all active references in:

- the React header;
- the React footer;
- legal notice navigation;
- privacy navigation;
- root and localized page favicon metadata;
- any website source template that regenerates those pages.

Generated distribution bundles and prerendered localized pages must be rebuilt through the existing build command.

## File Policy

Copy the approved SVGs into the website's `assets/` directory under explicit canonical names. Existing legacy and historical files remain untouched and unreferenced; no asset is deleted in this change.

## Verification

Automated tests must confirm:

- all active logo references use the new canonical filenames;
- the old `eazycloud_logo_white.svg`, `eazycloud_logo.svg`, and `eazycloud_signet.svg` filenames are absent from active HTML and React sources;
- header, footer, legal, and privacy pages use the lockup;
- favicon metadata uses the signet;
- the complete build and existing test suite pass.

Visual verification must inspect desktop and mobile header/footer plus the legal and privacy page headers. Logos must be sharp, proportional, readable on dark backgrounds, and free of clipping or layout shift.

## Deployment

The logo rollout remains local until the full feature branch is integrated and a separate deployment decision is made.
