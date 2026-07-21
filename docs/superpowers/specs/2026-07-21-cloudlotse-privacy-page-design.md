# CloudLotse Privacy Page and Consent Design

**Date:** 2026-07-21  
**Status:** Approved design  
**Language for first release:** English

## Objective

Add a readable, layered Privacy page for the public CloudLotse website and define consent handling for Google Analytics 4. The page covers website visitors and email enquiries only. Service-specific contractual processing belongs on the separate EU Data Processing page.

This document records the product and technical design. The final legal copy should be reviewed by qualified counsel before the website is treated as production-ready.

## Controller

- Company: cloudlotse OÜ
- Address: Sepapaja tn 6, Tallinn 15551, Estonia
- Representative: Thorsten Voigt
- Privacy contact: voigt@eazy.cloud
- No formally appointed Data Protection Officer

## Confirmed Scope

- Production hosting: standard ALL-INKL webhosting in Germany
- Contact method: email links only; no contact form
- Mail hosting for `voigt@eazy.cloud`: ALL-INKL
- Audience: business users and professionals; not directed at children
- No newsletter
- No embedded videos, maps, scheduling tools, social feeds, or chat widgets
- Fonts, scripts, and other website assets are hosted locally
- No external CDN dependencies in the production build
- Analytics: Google Analytics 4 via Google Tag Manager
- No Google Ads conversion tracking, LinkedIn tag, Meta Pixel, or other marketing trackers in the first release

## Information Architecture

The page uses a layered format rather than a continuous legal-text block:

1. **Privacy at a glance** — concise explanation of the processing relevant to an ordinary visitor.
2. **Controller** — company identity, address, representative, and privacy contact.
3. **Hosting and server logs** — ALL-INKL hosting, technical access data, purposes, legal basis, recipients, and retention.
4. **Email contact** — data submitted voluntarily by email, purposes, legal bases, recipients, and retention.
5. **Consent management** — how consent is requested, stored, changed, and withdrawn.
6. **Google Tag Manager and Google Analytics 4** — conditional activation, data categories, purposes, recipients, transfers, safeguards, and retention.
7. **Cookies and similar technologies** — necessary consent storage versus optional analytics technologies.
8. **Data-subject rights** — access, correction, deletion, restriction, portability, objection, consent withdrawal, and supervisory-authority complaint.
9. **Policy updates** — effective date and change notice.

A short statement clarifies that the page applies to the public website. Contractual data processing for CloudLotse services is addressed separately under EU Data Processing.

## Hosting and Server Logs

The policy describes the technical information generated when the site is delivered, including IP address, access time, requested resource, response status, transferred volume, referrer, browser, operating system, interface, and browser language/version where available.

The purposes are website delivery, reliability, fault diagnosis, and protection against misuse or attacks. The proposed legal basis is legitimate interests under Article 6(1)(f) GDPR. According to ALL-INKL's published privacy information, ordinary web-server logs are deleted after no more than seven days, with longer retention possible in an individual security incident.

Reference: [ALL-INKL Data Privacy Information](https://all-inkl.com/en/privacy-policy/), especially section 14. The implementation should verify that the contracted hosting configuration follows the stated standard period.

## Email Enquiries

The website provides email links only. Clicking a link opens the visitor's own email client; the website itself does not collect form data.

Email content and metadata are processed to answer enquiries and, where applicable, to take pre-contractual steps. The final copy should distinguish Article 6(1)(b) GDPR from legitimate-interest processing under Article 6(1)(f), according to the nature of the enquiry.

Ordinary enquiries that do not lead to a contract are deleted after 12 months. Contractual records and records subject to statutory retention obligations follow their applicable periods.

## Consent Model

The site uses a lightweight, self-hosted consent interface styled to match the CloudLotse website. It must work on desktop and mobile.

Initial state:

- Optional analytics is disabled.
- No request to Google Tag Manager or Google Analytics is made before affirmative consent.
- Rejecting optional processing leaves the complete website usable.

First-layer actions:

- **Accept analytics**
- **Reject optional cookies**
- **Customize settings**

Accept and reject must be equally accessible and visually comparable. The settings view contains:

- **Necessary** — always active; used only to remember the consent decision and deliver the site.
- **Analytics** — optional; controls Google Tag Manager and Google Analytics 4.

A permanent **Privacy settings** footer link lets visitors change or withdraw their decision at any time. The consent choice is stored locally to prevent the banner from appearing on every page. The stored record should contain only what is necessary to retain the choice, its version, and its timestamp.

## Analytics Data Flow

Before consent, the browser communicates only with the CloudLotse website hosted by ALL-INKL, apart from actions explicitly initiated by the visitor such as opening an email application or following a link.

After analytics consent:

1. Google Tag Manager is loaded.
2. Google Analytics 4 is activated through the approved tag configuration.
3. Usage and event data, device/browser information, approximate location, referrer information, and similar analytics data may be transmitted to Google.

Google Analytics user-level event-data retention is configured to two months. The Privacy page must distinguish this from aggregate reporting that may remain available for longer.

The copy must identify the relevant Google entity, explain potential processing or transfers outside the EEA, state the applicable safeguards based on the configuration current at launch, and link to authoritative Google privacy information. These details must be reverified during implementation because vendor terms and transfer mechanisms can change.

## Production Asset Requirements

- Replace the prototype's externally loaded React, ReactDOM, Babel, fonts, and other CDN resources with locally served production assets.
- Do not load Google Tag Manager, Google Analytics, or any Google endpoint until analytics consent exists.
- Do not add unapproved tracking through the tag container.
- Treat a future change to embeds, forms, newsletters, advertising tags, hosting, or third-party assets as requiring a Privacy page and consent review.

## Presentation

- Follow the existing dark CloudLotse visual system.
- Use restrained typography, clear numbered headings, generous spacing, and short paragraphs.
- Show a compact **Last updated** line near the top.
- Provide direct links to privacy settings and relevant third-party privacy information.
- Do not use decorative stock imagery on legal pages.
- Keep the footer links: **Legal notice**, **Privacy**, and **EU data processing**.

## Acceptance Criteria

- The Privacy page is available in English and linked from the site footer.
- Its content matches the confirmed processing scope and contains all sections above.
- Analytics is inactive and makes no Google request before consent.
- Accept, reject, and customize actions work with keyboard, pointer, and touch input.
- The visitor can reopen privacy settings and withdraw consent.
- With analytics rejected, the website retains full functionality.
- GA4 user-level event retention is configured to two months.
- All ordinary website assets load locally in production.
- The implementation is checked for unexpected third-party requests.
- Hosting-log wording and Google disclosures are verified against the live configuration and current official vendor information before release.

