import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const htmlPath = new URL("../ui_kits/website/index.html", import.meta.url);
const html = await readFile(htmlPath, "utf8");
const required = ["vendor", "Chrome", "Hero", "Chapters", "Closing", "app"];

assert.doesNotMatch(html, /<(?:script|link)[^>]+(?:src|href)=["']https?:\/\//i);
for (const name of required) {
  await access(new URL(`../ui_kits/website/dist/${name}.js`, import.meta.url));
  assert.match(html, new RegExp(`dist/${name}\\.js`));
}
console.log("Built site uses local scripts only.");
