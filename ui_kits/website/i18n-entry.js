import * as core from "./locale-core.mjs";
import { TRANSLATIONS } from "./translations.mjs";

core.validateTranslations(TRANSLATIONS);
window.EazyCloudI18n = Object.freeze({ ...core, TRANSLATIONS });
