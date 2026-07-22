import { LANGUAGE_PREFERENCE_KEY, chooseLocale, localizedPath } from "./locale-core.mjs";

let stored = null;
try { stored = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY); } catch (_) {}
const languages = Array.isArray(window.navigator.languages)
  ? window.navigator.languages
  : [window.navigator.language].filter(Boolean);
const locale = chooseLocale(stored, languages);
window.location.replace(localizedPath(locale, window.location.hash));
