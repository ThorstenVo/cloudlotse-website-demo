import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { assertLocalizedMetadata, assertNoExternalAssets } from "../scripts/check-built-site.mjs";

async function findCanonicalLogoRoot() {
  let current = dirname(fileURLToPath(import.meta.url));
  const relativeRoot = join("Ressourcen", "Design System CloudLotse + eazy.cloud", "eazy.cloud LOGO Files");

  while (current !== parse(current).root) {
    const candidate = join(current, relativeRoot);
    try {
      await readFile(join(candidate, "eazycloud-logo-dark.svg"), "utf8");
      return candidate;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    current = dirname(current);
  }

  throw new Error("Canonical eazy.cloud logo directory not found in any parent workspace");
}

test("source design preview loads the complete localized bundle chain in order", async () => {
  const html = await readFile(new URL("../ui_kits/website/index.html", import.meta.url), "utf8");
  const sources = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(sources.slice(-9), [
    "dist/vendor.js",
    "../../_ds_bundle.js",
    "dist/i18n.js",
    "dist/LocaleSwitch.js",
    "dist/Chrome.js",
    "dist/Hero.js",
    "dist/Chapters.js",
    "dist/Closing.js",
    "dist/app.js",
  ]);
});

test("shared page shell uses serialization-safe balanced gutters", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chrome.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /min\(1400px, calc\(/);
  assert.match(source, /width: "100%"/);
  assert.match(source, /maxWidth: 1800/);
  assert.match(source, /paddingInline: "clamp\(28px, 5vw, 96px\)"/);
  assert.match(source, /boxSizing: "border-box"/);
  assert.match(source, /margin: "0 auto"/);
});

test("top bar exposes a compact fixed state after scrolling", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chrome.jsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../mobile.css", import.meta.url), "utf8");
  assert.match(source, /const \[scrolled, setScrolled\] = React\.useState\(false\)/);
  assert.match(source, /window\.addEventListener\("scroll", onScroll, \{ passive: true \}\)/);
  assert.match(source, /className=\{"cl-topbar" \+ \(scrolled \? " is-scrolled" : ""\)\}/);
  assert.match(css, /\.cl-topbar\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.cl-topbar\.is-scrolled\s*\{[^}]*--topbar-height:\s*60px/s);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(css, /backdrop-filter/, "a filtered header clips its fixed mobile-menu descendant");
});

test("sticky chapter navigation sits below the compact top bar", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chapters.jsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../mobile.css", import.meta.url), "utf8");
  assert.match(source, /className="cl-chapter-nav"/);
  assert.match(css, /\.cl-chapter-nav\s*\{[^}]*top:\s*var\(--topbar-height\)/s);
  assert.match(css, /\[id\]\s*\{[^}]*scroll-margin-top:/s);
});

test("chapter navigation uses readable responsive typography", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chapters.jsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../mobile.css", import.meta.url), "utf8");
  assert.match(source, /className="cl-chapter-link"/);
  assert.match(source, /className="cl-chapter-number"/);
  assert.match(source, /className="cl-chapter-title"/);
  assert.match(css, /\.cl-chapter-link\s*\{[^}]*min-height:\s*88px/s);
  assert.match(css, /\.cl-chapter-number\s*\{[^}]*font-size:\s*13px[^}]*color:\s*#8f9892/s);
  assert.match(css, /\.cl-chapter-title\s*\{[^}]*font-size:\s*17px[^}]*line-height:\s*1\.3[^}]*color:\s*#c4cbc6/s);
  assert.match(css, /@media\s*\(max-width:\s*860px\)[\s\S]*\.cl-chapter-title\s*\{[^}]*font-size:\s*15px/s);
});

test("page shell cache-busts chapter markup and its stylesheet with one revision", async () => {
  const files = [
    "../ui_kits/website/page-template.html",
    "../en/index.html",
    "../de/index.html",
  ];

  for (const file of files) {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const cssRevision = html.match(/href="\/mobile\.css\?v=([^"]+)"/)?.[1];
    const chapterRevision = html.match(/src="\/ui_kits\/website\/dist\/Chapters\.js\?v=([^"]+)"/)?.[1];
    assert.ok(cssRevision, `${file} must version mobile.css`);
    assert.equal(chapterRevision, cssRevision, `${file} must load matching chapter CSS and markup`);
  }
});

test("case-study steps render as a semantic non-interactive process line", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chapters.jsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../mobile.css", import.meta.url), "utf8");
  assert.match(source, /<ol[^>]+cl-process-line/);
  assert.match(source, /<li key=\{step\.title\} className="cl-process-step"/);
  assert.match(source, /step\.copy/);
  assert.doesNotMatch(source, /cl-process-step[^\n]+onClick=/);
  assert.match(css, /\.cl-process-line::before/);
  assert.match(css, /\.cl-process-marker/);
});

test("process line loops only while it is visible", async () => {
  const source = await readFile(new URL("../ui_kits/website/Chapters.jsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../mobile.css", import.meta.url), "utf8");
  const prerender = await readFile(new URL("../scripts/prerender.mjs", import.meta.url), "utf8");
  assert.match(source, /const processRef = React\.useRef\(null\)/);
  assert.match(source, /const \[processActive, setProcessActive\] = React\.useState\(false\)/);
  assert.match(source, /typeof IntersectionObserver === "undefined"/);
  assert.match(source, /if \(window\.__EAZYCLOUD_PRERENDER__\) return undefined/);
  assert.match(source, /new IntersectionObserver/);
  assert.match(source, /threshold: 0\.35/);
  assert.match(source, /setProcessActive\(entry\.isIntersecting\)/);
  assert.doesNotMatch(source, /observer\.unobserve\(processLine\)/);
  assert.match(source, /observer\.disconnect\(\)/);
  assert.match(source, /className=\{"cl-process-line" \+ \(processActive \? " is-active" : ""\)\}/);
  assert.match(source, /ref=\{processRef\}/);
  assert.match(css, /@keyframes cl-process-progress-x/);
  assert.match(css, /@keyframes cl-process-progress-y/);
  assert.match(css, /@keyframes cl-process-marker-1/);
  assert.match(css, /@keyframes cl-process-marker-2/);
  assert.match(css, /@keyframes cl-process-marker-3/);
  assert.match(css, /\.cl-process-line\.is-active::after\s*\{[^}]*animation:\s*cl-process-progress-x 3s linear infinite/s);
  assert.match(css, /\.cl-process-line\.is-active \.cl-process-step:nth-child\(1\) \.cl-process-marker\s*\{[^}]*animation:\s*cl-process-marker-1 3s linear infinite/s);
  assert.match(css, /\.cl-process-line\.is-active \.cl-process-step:nth-child\(2\) \.cl-process-marker\s*\{[^}]*animation:\s*cl-process-marker-2 3s linear infinite/s);
  assert.match(css, /\.cl-process-line\.is-active \.cl-process-step:nth-child\(3\) \.cl-process-marker\s*\{[^}]*animation:\s*cl-process-marker-3 3s linear infinite/s);
  assert.match(css, /@media\s*\(max-width:\s*860px\)[\s\S]*\.cl-process-line::after\s*\{[^}]*transform:\s*scaleY\(0\)[^}]*transform-origin:\s*center top/s);
  assert.match(css, /@media\s*\(max-width:\s*860px\)[\s\S]*\.cl-process-line\.is-active::after\s*\{[^}]*animation-name:\s*cl-process-progress-y/s);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.cl-process-line::after\s*\{[^}]*animation:\s*none[^}]*transform:\s*scaleX\(1\)/s);
  assert.match(prerender, /window\.__EAZYCLOUD_PRERENDER__ = true/);
});

test("active pages use content-identical canonical eazy.cloud logo assets", async () => {
  const canonicalRoot = await findCanonicalLogoRoot();
  const [sourceLockup, sourceSignet, localLockup, localSignet] = await Promise.all([
    readFile(join(canonicalRoot, "eazycloud-logo-dark.svg"), "utf8"),
    readFile(join(canonicalRoot, "eazycloud-signet-dark.svg"), "utf8"),
    readFile(new URL("../assets/eazycloud-logo-dark.svg", import.meta.url), "utf8"),
    readFile(new URL("../assets/eazycloud-signet-dark.svg", import.meta.url), "utf8"),
  ]);
  assert.equal(localLockup.trimEnd(), sourceLockup.trimEnd());
  assert.equal(localSignet.trimEnd(), sourceSignet.trimEnd());
});

test("all active brand and favicon sources reference canonical filenames", async () => {
  const activeFiles = [
    "../ui_kits/website/Chrome.jsx", "../ui_kits/website/Closing.jsx",
    "../ui_kits/website/page-template.html", "../ui_kits/website/root-template.html",
    "../ui_kits/website/index.html", "../legal/index.html", "../privacy/index.html",
  ];
  const sources = await Promise.all(activeFiles.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  const joined = sources.join("\n");
  assert.doesNotMatch(joined, /eazycloud_logo_white\.svg|eazycloud_logo\.svg|eazycloud_signet\.svg|eazycloud\.ico/);
  assert.equal((joined.match(/eazycloud-logo-dark\.svg/g) || []).length, 4);
  assert.equal((joined.match(/eazycloud-signet-dark\.svg/g) || []).length, 5);
});

test("locale switch keeps native links as the navigation mechanism", async () => {
  const source = await readFile(new URL("../ui_kits/website/LocaleSwitch.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /preventDefault\(|window\.location\.assign/);
  assert.match(source, /const href = localizedPath\(other\)/);
  assert.match(source, /saveLocale\(other\)/);
  assert.match(source, /event\.currentTarget\.href = localizedPath\(other, window\.location\.hash\)/);
  assert.match(source, /<a href=\{href\} onClick=\{switchLanguage\}/);
});

test("absolute hero copy honors the shared responsive gutter", async () => {
  const source = await readFile(new URL("../ui_kits/website/Hero.jsx", import.meta.url), "utf8");
  assert.match(source, /className="cl-hero-content"[^\n]+left: shell\.paddingInline/);
  assert.match(source, /className="cl-hero-note"[^\n]+right: shell\.paddingInline/);
});

test("README describes the root-hosted live production site and functional locale switch", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /https:\/\/eazy\.cloud\//);
  assert.doesNotMatch(readme, /thorstenvo\.github\.io\/cloudlotse-website-demo/);
  assert.match(readme, /prerendered language routes/i);
  assert.match(readme, /persists? (the )?(chosen )?language|stores? (the )?(chosen )?language/i);
  assert.match(readme, /DE\/EN controls link between prerendered \/de\/ and \/en\//i);
  assert.match(readme, /locale comes from document lang/i);
  assert.match(readme, /shared copy comes from the validated catalog/i);
  assert.doesNotMatch(readme, /DE\/EN toggle is visual only/i);
  assert.doesNotMatch(readme, /(?:language\s+)?copy\s+swapp?(?:ing)?\s+(?:is\s+)?not built|copy swap not built/i);
  assert.doesNotMatch(readme, /`lang`,\s*`activeChapter`|lang state/i);
  assert.doesNotMatch(readme, /wire copy through i18n/i);
});

test("package test script rebuilds before generated-page assertions", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.match(pkg.scripts.test, /^npm run build && node --test tests\/\*\.test\.mjs && npm run check:site$/);
});

test("external stylesheet detection rejects href before rel", () => {
  assert.throws(
    () => assertNoExternalAssets('<link href="https://cdn.example/site.css" rel="stylesheet">'),
    /external stylesheet/i,
  );
});

test("built-site metadata validator rejects an incorrect localized description", () => {
  const html = '<html lang="de"><head><title>wrong</title><meta name="description" content="wrong"><link rel="canonical" href="https://eazy.cloud/de/"><link rel="alternate" hreflang="en" href="https://eazy.cloud/en/"><link rel="alternate" hreflang="de" href="https://eazy.cloud/de/"><link rel="alternate" hreflang="x-default" href="https://eazy.cloud/"></head></html>';
  assert.throws(() => assertLocalizedMetadata(html, "de"), /title/i);
});

test("localized homepages load only local scripts and stylesheets", async () => {
  for (const locale of ["en", "de"]) {
    const html = await readFile(new URL(`../${locale}/index.html`, import.meta.url), "utf8");
    assert.doesNotMatch(html, /<script[^>]+src=["']https?:\/\//i);
    assert.doesNotMatch(html, /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']https?:\/\/)[^>]*>/i);
    assert.doesNotMatch(html, /type=["']text\/babel["']/i);
    assert.match(html, /\/ui_kits\/website\/dist\/i18n\.js/);
    assert.match(html, /\/ui_kits\/website\/dist\/app\.js/);
  }
});

test("privacy page contains the approved layered disclosures", async () => {
  const html = await readFile(new URL("../privacy/index.html", import.meta.url), "utf8");
  for (const heading of [
    "Privacy at a glance", "Controller", "Hosting and server logs", "Email contact",
    "Consent management", "Google Tag Manager and Google Analytics 4",
    "Cookies and similar technologies", "Your GDPR rights", "Policy updates",
  ]) assert.match(html, new RegExp(heading, "i"));
  assert.match(html, /eazy\.cloud/);
  assert.match(html, /Sepapaja tn 6/);
  assert.match(html, /voigt@eazy\.cloud/);
  assert.match(html, /seven days/i);
  assert.match(html, /12 months/i);
  assert.match(html, /two months/i);
  assert.match(html, /data-privacy-settings/);
});

test("homepage and legal pages expose working privacy navigation", async () => {
  const closing = await readFile(new URL("../ui_kits/website/Closing.jsx", import.meta.url), "utf8");
  const legal = await readFile(new URL("../legal/index.html", import.meta.url), "utf8");
  assert.match(closing, /href="\/privacy\/"/);
  assert.match(closing, /data-privacy-settings/);
  assert.match(legal, /href="\.\.\/privacy\/"/);
  assert.match(legal, /data-privacy-settings/);
});

test("README documents privacy-sensitive launch configuration", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /Analytics launch checklist/);
  assert.match(readme, /two months/i);
  assert.match(readme, /basic consent mode/i);
  assert.match(readme, /no GTM script, consent ping, or analytics request/i);
});
