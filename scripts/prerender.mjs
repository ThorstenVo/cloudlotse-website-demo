/* Build-time prerender: run the shipped client bundles in jsdom, render the
   React app, and inline the resulting #root markup into index.html so crawlers
   and the first paint get full HTML. The browser then hydrates the same markup. */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";

const root = process.cwd();
const indexPath = path.join(root, "index.html");

// App bundles only, in load order. Privacy/consent scripts are runtime-only and
// deliberately excluded — the consent modal must not be baked into the HTML.
const bundles = [
  "ui_kits/website/dist/vendor.js",
  "_ds_bundle.js",
  "ui_kits/website/dist/Chrome.js",
  "ui_kits/website/dist/Hero.js",
  "ui_kits/website/dist/Chapters.js",
  "ui_kits/website/dist/Closing.js",
  "ui_kits/website/dist/app.js",
];

const code = [];
for (const b of bundles) code.push(await readFile(path.join(root, b), "utf8"));

const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (e) => { throw e; });

const dom = new JSDOM(
  `<!doctype html><html><head></head><body><div id="root"></div></body></html>`,
  { runScripts: "dangerously", pretendToBeVisual: true, virtualConsole }
);
const { window } = dom;

for (const src of code) {
  const el = window.document.createElement("script");
  el.textContent = src;
  window.document.body.appendChild(el);
}

// Let React flush the initial (synchronous) render + effects.
await new Promise((r) => setTimeout(r, 100));

const markup = window.document.getElementById("root").innerHTML;
dom.window.close();

if (!markup || markup.length < 2000) {
  throw new Error(`Prerender produced too little markup (${markup ? markup.length : 0} chars) — aborting.`);
}

const html = await readFile(indexPath, "utf8");
// Idempotent: replace everything from <div id="root"> to the </div> right
// before the first <script (the root container's own close tag). Works whether
// the container is currently empty or already holds a previous prerender.
const target = /<div id="root">[\s\S]*?<\/div>\s*<script/.test(html)
  ? /<div id="root">[\s\S]*<\/div>(\s*<script)/
  : null;
if (!target) {
  throw new Error("Could not locate #root container in index.html to inject prerender.");
}
const replaced = html.replace(target, `<div id="root">${markup}</div>$1`);
await writeFile(indexPath, replaced, "utf8");
console.log(`Prerendered ${markup.length} chars into index.html`);
