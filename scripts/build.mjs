import { build, transform } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "ui_kits", "website");
const outDir = path.join(sourceDir, "dist");
const jsxSources = ["Chrome.jsx", "Hero.jsx", "Chapters.jsx", "Closing.jsx", "tweaks-panel.jsx", "app.jsx"];

await mkdir(outDir, { recursive: true });
await build({
  entryPoints: [path.join(sourceDir, "vendor-entry.js")],
  outfile: path.join(outDir, "vendor.js"),
  bundle: true,
  minify: true,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
});

for (const filename of jsxSources) {
  const source = await readFile(path.join(sourceDir, filename), "utf8");
  const compiled = await transform(source, {
    loader: "jsx",
    jsx: "transform",
    format: "iife",
    minify: true,
    target: "es2020",
  });
  await writeFile(path.join(outDir, filename.replace(/\.jsx$/, ".js")), compiled.code);
}
