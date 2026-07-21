import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const source = await readFile(new URL("../privacy/consent.js", import.meta.url), "utf8");

function boot(config = { gtmContainerId: "GTM-TEST123" }) {
  const dom = new JSDOM("<!doctype html><head></head><body></body>", { runScripts: "outside-only", url: "https://eazy.cloud/" });
  dom.window.EazyCloudAnalyticsConfig = config;
  dom.window.eval(source);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));
  return dom.window;
}

test("defaults to undecided and does not load Google", () => {
  const window = boot();
  assert.equal(window.EazyCloudPrivacy.getConsent(), null);
  assert.equal(window.document.querySelector('script[src*="googletagmanager.com"]'), null);
});

test("rejection persists without loading Google", () => {
  const window = boot();
  window.EazyCloudPrivacy.setAnalyticsConsent(false);
  assert.equal(window.EazyCloudPrivacy.getConsent().analytics, false);
  assert.equal(window.document.querySelector('script[src*="googletagmanager.com"]'), null);
});

test("acceptance loads the configured GTM container exactly once", () => {
  const window = boot();
  window.EazyCloudPrivacy.setAnalyticsConsent(true);
  window.EazyCloudPrivacy.setAnalyticsConsent(true);
  assert.equal(window.document.querySelectorAll('script[src="https://www.googletagmanager.com/gtm.js?id=GTM-TEST123"]').length, 1);
  assert.equal(window.dataLayer[0]["gtm.start"] > 0, true);
});

test("missing configuration remains fail-closed after acceptance", () => {
  const window = boot({ gtmContainerId: null });
  window.EazyCloudPrivacy.setAnalyticsConsent(true);
  assert.equal(window.document.querySelector('script[src*="googletagmanager.com"]'), null);
});

test("withdrawal removes the stored choice", () => {
  const window = boot({ gtmContainerId: null });
  window.EazyCloudPrivacy.setAnalyticsConsent(true);
  window.EazyCloudPrivacy.withdrawConsent();
  assert.equal(window.EazyCloudPrivacy.getConsent(), null);
  assert.equal(window.document.querySelector('script[src*="googletagmanager.com"]'), null);
});

test("undecided visitors receive a labelled modal with all choices", () => {
  const window = boot({ gtmContainerId: null });
  const dialog = window.document.querySelector("#privacy-consent-dialog");
  assert.equal(dialog?.getAttribute("role"), "dialog");
  assert.equal(dialog?.getAttribute("aria-modal"), "true");
  assert.equal(dialog?.getAttribute("aria-labelledby"), "privacy-consent-title");
  assert.ok(dialog.querySelector('[data-consent-action="accept"]'));
  assert.ok(dialog.querySelector('[data-consent-action="reject"]'));
  assert.ok(dialog.querySelector('[data-consent-action="customize"]'));
});

test("accept and reject controls persist the choice and close the dialog", () => {
  const acceptWindow = boot({ gtmContainerId: null });
  acceptWindow.document.querySelector('[data-consent-action="accept"]').click();
  assert.equal(acceptWindow.EazyCloudPrivacy.getConsent().analytics, true);
  assert.equal(acceptWindow.document.querySelector("#privacy-consent-dialog"), null);
  const rejectWindow = boot({ gtmContainerId: null });
  rejectWindow.document.querySelector('[data-consent-action="reject"]').click();
  assert.equal(rejectWindow.EazyCloudPrivacy.getConsent().analytics, false);
  assert.equal(rejectWindow.document.querySelector("#privacy-consent-dialog"), null);
  assert.equal(rejectWindow.document.querySelector(".privacy-dialog-backdrop"), null);
});

test("privacy settings API reopens the settings interface", () => {
  const window = boot({ gtmContainerId: null });
  window.EazyCloudPrivacy.setAnalyticsConsent(false);
  window.EazyCloudPrivacy.openSettings();
  assert.ok(window.document.querySelector("#privacy-settings-panel"));
});
