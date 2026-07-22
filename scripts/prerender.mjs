/* Build-time prerender: run the shipped client bundles in jsdom, render the
   React app, and inline the resulting #root markup into index.html so crawlers
   and the first paint get full HTML. The browser then hydrates the same markup. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";
import { TRANSLATIONS } from "../ui_kits/website/translations.mjs";
import { validateTranslations } from "../ui_kits/website/locale-core.mjs";

const root = process.cwd();
const sourceDir = path.join(root, "ui_kits", "website");
const locales = ["en", "de"];

// App bundles only, in load order. Privacy/consent scripts are runtime-only and
// deliberately excluded — the consent modal must not be baked into the HTML.
const bundles = [
  "ui_kits/website/dist/vendor.js",
  "_ds_bundle.js",
  "ui_kits/website/dist/i18n.js",
  "ui_kits/website/dist/LocaleSwitch.js",
  "ui_kits/website/dist/Chrome.js",
  "ui_kits/website/dist/Hero.js",
  "ui_kits/website/dist/Chapters.js",
  "ui_kits/website/dist/Closing.js",
  "ui_kits/website/dist/app.js",
];

const code = [];
for (const b of bundles) code.push(await readFile(path.join(root, b), "utf8"));

function replaceToken(html, token, value) {
  const marker = `%%${token}%%`;
  if (!html.includes(marker)) throw new Error(`Missing template token ${marker}`);
  return html.split(marker).join(value);
}

validateTranslations(TRANSLATIONS);

for (const locale of locales) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => { throw error; });
  const dom = new JSDOM(
    `<!doctype html><html lang="${locale}"><head></head><body><div id="root"></div></body></html>`,
    { runScripts: "dangerously", pretendToBeVisual: true, virtualConsole }
  );
  const { window } = dom;
  window.__EAZYCLOUD_PRERENDER__ = true;

  for (const src of code) {
    const el = window.document.createElement("script");
    el.textContent = src;
    window.document.body.appendChild(el);
  }

  // Let React flush the initial (synchronous) render + effects.
  await new Promise((resolve) => setTimeout(resolve, 100));

  const markup = window.document.getElementById("root").innerHTML;
  dom.window.close();

  if (!markup || markup.length < 2000) {
    throw new Error(`Prerender produced too little markup for ${locale} (${markup ? markup.length : 0} chars) — aborting.`);
  }

  let html = await readFile(path.join(sourceDir, "page-template.html"), "utf8");
  html = replaceToken(html, "LANG", locale);
  html = replaceToken(html, "TITLE", TRANSLATIONS[locale].meta.title);
  html = replaceToken(html, "DESCRIPTION", TRANSLATIONS[locale].meta.description);
  html = replaceToken(html, "CANONICAL", `https://eazy.cloud/${locale}/`);
  html = replaceToken(html, "ROOT_MARKUP", markup);

  const outputDir = path.join(root, locale);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), html, "utf8");
  console.log(`Prerendered ${markup.length} chars into ${locale}/index.html`);
}

await writeFile(
  path.join(root, "index.html"),
  await readFile(path.join(sourceDir, "root-template.html"), "utf8"),
  "utf8"
);
