# Connect Workflows Image Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the “Connect workflows” stage image and integrate its light artwork into the dark CloudLotse chapter layout without a visible panel seam.

**Architecture:** Reuse the existing `Stage` image-opacity and conditional edge-blending interface. Add a cool blue-grey transition variant for the workflows stage so the first two stages remain unchanged.

**Tech Stack:** Static React-via-Babel prototype, inline React styles, GitHub Pages, Playwright browser verification.

## Global Constraints

- Use `istockphoto-1473832849-1024x1024.jpg` as the workflows stage image.
- Render the new image at exactly 70% opacity.
- Begin the transition with the exact `var(--ink)` colour of the text panel.
- Keep the tasks and knowledge stages unchanged.
- Preserve existing crop behaviour, section dimensions, text, and navigation.

---

### Task 1: Replace and blend the workflows stage image

**Files:**
- Create: `assets/workflows-growth-dashboard.jpg`
- Modify: `ui_kits/website/Chapters.jsx:11-24,169`
- Verify: Playwright assertions against the locally served page

**Interfaces:**
- Consumes: the existing `Stage` component props `src`, `imageOpacity`, and `seamlessEdge`
- Produces: a new `edgeTone` prop accepting `"ink" | "cool"`, with `"ink"` as the default

- [ ] **Step 1: Copy the supplied image and verify its checksum**

```bash
cp '/Users/thorsten/Downloads/istockphoto-1473832849-1024x1024.jpg' assets/workflows-growth-dashboard.jpg
shasum -a 256 '/Users/thorsten/Downloads/istockphoto-1473832849-1024x1024.jpg' assets/workflows-growth-dashboard.jpg
```

Expected: both SHA-256 values are identical.

- [ ] **Step 2: Add the cool transition variant and select it for workflows**

Update the `Stage` signature and overlay selection:

```jsx
function Stage({ id, no, small, title, copy, src, imageOpacity = 1, seamlessEdge = false, edgeTone = "ink" }) {
  const edgeGradient = edgeTone === "cool"
    ? "linear-gradient(90deg, var(--ink) 0%, rgb(22 31 38 / 96%) 8%, rgb(42 62 74 / 68%) 22%, rgb(84 112 124 / 28%) 38%, transparent 54%)"
    : "linear-gradient(90deg, var(--ink) 0%, rgb(16 20 17 / 96%) 7%, rgb(16 20 17 / 72%) 20%, rgb(16 20 17 / 28%) 36%, transparent 52%)";
```

Use `edgeGradient` when `seamlessEdge` is true, and update the workflows stage:

```jsx
<Stage
  id="workflows"
  no="03"
  small="Handoffs without duplicate work"
  title="Connect workflows"
  copy="Information moves completely between the systems involved — and stays with the right customer or project, available to the whole team."
  src="../../assets/workflows-growth-dashboard.jpg"
  imageOpacity={0.7}
  seamlessEdge
  edgeTone="cool"
/>
```

- [ ] **Step 3: Verify the local implementation in a browser**

Run Playwright at a 1920×1080 viewport and assert:

```js
const image = page.locator('#workflows img');
await image.waitFor();
console.assert(await image.getAttribute('src') === '../../assets/workflows-growth-dashboard.jpg');
console.assert(await image.evaluate(img => getComputedStyle(img).opacity) === '0.7');
console.assert((await image.evaluate(img => [img.naturalWidth, img.naturalHeight])).join('x') === '1024x640');
```

Expected: all assertions pass, no console or page errors occur, and the screenshot shows no hard vertical seam.

- [ ] **Step 4: Commit and publish through the existing review flow**

```bash
git add assets/workflows-growth-dashboard.jpg ui_kits/website/Chapters.jsx
git commit -m "style: integrate workflows stage image"
git push -u origin style/connect-workflows-image
```

Create and merge a pull request into `main`, wait for the matching GitHub Pages build, then repeat the Playwright opacity and error checks against the public URL.
