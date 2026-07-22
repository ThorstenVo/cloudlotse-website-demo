export const SUPPORTED_LOCALES = Object.freeze(["en", "de"]);
export const LANGUAGE_PREFERENCE_KEY = "eazycloud_language_v1";
export const KNOWN_HASHES = Object.freeze([
  "#possibilities", "#tasks", "#knowledge", "#workflows", "#approach", "#contact",
]);

export function normalizeLocale(value) {
  if (typeof value !== "string") return null;
  const locale = value.trim().toLowerCase().split("-")[0];
  return SUPPORTED_LOCALES.includes(locale) ? locale : null;
}

export function chooseLocale(stored, browserLanguages = []) {
  const explicit = normalizeLocale(stored);
  if (explicit) return explicit;
  for (const candidate of browserLanguages) {
    const locale = normalizeLocale(candidate);
    if (locale) return locale;
  }
  return "en";
}

export function alternateLocale(locale) {
  const normalized = normalizeLocale(locale);
  if (!normalized) throw new Error(`Unsupported locale: ${locale}`);
  return normalized === "en" ? "de" : "en";
}

export function localizedPath(locale, hash = "") {
  const normalized = normalizeLocale(locale);
  if (!normalized) throw new Error(`Unsupported locale: ${locale}`);
  const safeHash = KNOWN_HASHES.includes(hash) ? hash : "";
  return `/${normalized}/${safeHash}`;
}

function compareShape(reference, candidate, path) {
  if (typeof reference === "string") {
    if (typeof candidate !== "string" || (reference.trim() !== "" && candidate.trim() === "")) {
      throw new Error(`Invalid translation at ${path}`);
    }
    return;
  }
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || candidate.length !== reference.length) {
      throw new Error(`Translation array mismatch at ${path}`);
    }
    reference.forEach((value, index) => compareShape(value, candidate[index], `${path}.${index}`));
    return;
  }
  const referenceKeys = Object.keys(reference).sort();
  const candidateKeys = candidate && typeof candidate === "object" ? Object.keys(candidate).sort() : [];
  if (referenceKeys.join("|") !== candidateKeys.join("|")) {
    const allKeys = new Set([...referenceKeys, ...candidateKeys]);
    const mismatched = [...allKeys].find((key) => !referenceKeys.includes(key) || !candidateKeys.includes(key));
    throw new Error(`Translation shape mismatch at ${path}.${mismatched}`);
  }
  for (const key of referenceKeys) compareShape(reference[key], candidate[key], `${path}.${key}`);
}

export function validateTranslations(catalog) {
  const locales = Object.keys(catalog).sort();
  if (locales.join("|") !== [...SUPPORTED_LOCALES].sort().join("|")) {
    throw new Error(`Unsupported translation locales: ${locales.join(", ")}`);
  }
  compareShape(catalog.en, catalog.de, "de");
  return true;
}
