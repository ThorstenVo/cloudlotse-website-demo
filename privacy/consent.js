(() => {
  "use strict";

  const STORAGE_KEY = "cloudlotse_privacy_consent_v1";
  const CONSENT_VERSION = 1;
  let settingsOpener = null;

  function getConsent() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (
        parsed?.version !== CONSENT_VERSION ||
        typeof parsed.analytics !== "boolean" ||
        Number.isNaN(Date.parse(parsed.decidedAt))
      ) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function loadGtm() {
    const id = window.CloudLotseAnalyticsConfig?.gtmContainerId;
    if (!/^GTM-[A-Z0-9]+$/.test(id || "")) return;
    if (document.querySelector(`script[data-cloudlotse-gtm="${id}"]`)) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cloudlotseGtm = id;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
  }

  function setAnalyticsConsent(allowed) {
    const decision = {
      version: CONSENT_VERSION,
      analytics: Boolean(allowed),
      decidedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(decision));
    closeDialog();
    if (decision.analytics) loadGtm();
  }

  function closeDialog() {
    document.querySelectorAll(".privacy-dialog-backdrop").forEach((backdrop) => backdrop.remove());
    document.body.classList.remove("privacy-dialog-open");
    if (settingsOpener?.isConnected) settingsOpener.focus();
    settingsOpener = null;
  }

  function button(label, action, className = "") {
    const element = document.createElement("button");
    element.type = "button";
    element.textContent = label;
    element.dataset.consentAction = action;
    element.className = className;
    return element;
  }

  function dialogShell(id, titleId, descriptionId) {
    const backdrop = document.createElement("div");
    backdrop.className = "privacy-dialog-backdrop";
    const dialog = document.createElement("section");
    dialog.id = id;
    dialog.className = "privacy-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", titleId);
    dialog.setAttribute("aria-describedby", descriptionId);
    backdrop.append(dialog);
    document.body.append(backdrop);
    document.body.classList.add("privacy-dialog-open");
    return { backdrop, dialog };
  }

  function renderFirstLayer() {
    if (getConsent() || document.querySelector("#privacy-consent-dialog")) return;
    const { dialog } = dialogShell("privacy-consent-dialog", "privacy-consent-title", "privacy-consent-description");
    dialog.innerHTML = `
      <p class="privacy-dialog__kicker">Your privacy</p>
      <h2 id="privacy-consent-title">Choose how we measure this website.</h2>
      <p id="privacy-consent-description">We use necessary local storage to remember your choice. With your permission, Google Analytics helps us understand how the website is used. No analytics data is sent before you consent.</p>
      <div class="privacy-dialog__actions"></div>`;
    const actions = dialog.querySelector(".privacy-dialog__actions");
    actions.append(
      button("Accept analytics", "accept"),
      button("Reject optional cookies", "reject"),
      button("Customize settings", "customize", "privacy-dialog__text-action"),
    );
    dialog.addEventListener("click", handleAction);
    dialog.querySelector("button")?.focus();
  }

  function openSettings(opener = document.activeElement) {
    settingsOpener = opener;
    document.querySelectorAll(".privacy-dialog-backdrop").forEach((backdrop) => backdrop.remove());
    const current = getConsent();
    const { dialog } = dialogShell("privacy-settings-panel", "privacy-settings-title", "privacy-settings-description");
    dialog.innerHTML = `
      <p class="privacy-dialog__kicker">Privacy settings</p>
      <h2 id="privacy-settings-title">Choose optional analytics.</h2>
      <p id="privacy-settings-description">Necessary storage remembers this selection. Analytics remains optional and the website works without it.</p>
      <div class="privacy-setting"><div><strong>Necessary</strong><span>Consent choice, version and timestamp</span></div><span class="privacy-setting__status">Always active</span></div>
      <label class="privacy-setting"><span><strong>Analytics</strong><span>Google Tag Manager and Google Analytics 4</span></span><input type="checkbox" data-analytics-choice ${current?.analytics ? "checked" : ""}></label>
      <div class="privacy-dialog__actions"></div>`;
    const actions = dialog.querySelector(".privacy-dialog__actions");
    actions.append(button("Save settings", "save"));
    if (current) actions.append(button("Withdraw consent", "withdraw", "privacy-dialog__secondary"));
    actions.append(button("Close", "close", "privacy-dialog__text-action"));
    dialog.addEventListener("click", handleAction);
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDialog();
    });
    dialog.querySelector("button")?.focus();
  }

  function withdrawConsent() {
    window.localStorage.removeItem(STORAGE_KEY);
    closeDialog();
    if (document.querySelector('script[src*="googletagmanager.com"]')) window.location.reload();
    else renderFirstLayer();
  }

  function handleAction(event) {
    const action = event.target.closest("[data-consent-action]")?.dataset.consentAction;
    if (!action) return;
    if (action === "accept") setAnalyticsConsent(true);
    if (action === "reject") setAnalyticsConsent(false);
    if (action === "customize") openSettings(event.target);
    if (action === "save") setAnalyticsConsent(Boolean(document.querySelector("[data-analytics-choice]")?.checked));
    if (action === "withdraw") withdrawConsent();
    if (action === "close") closeDialog();
  }

  function init() {
    document.addEventListener("click", (event) => {
      const opener = event.target.closest("[data-privacy-settings]");
      if (!opener) return;
      event.preventDefault();
      openSettings(opener);
    });
    const consent = getConsent();
    if (consent?.analytics) loadGtm();
    if (!consent) renderFirstLayer();
  }

  window.CloudLotsePrivacy = Object.freeze({ getConsent, setAnalyticsConsent, openSettings, withdrawConsent });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
