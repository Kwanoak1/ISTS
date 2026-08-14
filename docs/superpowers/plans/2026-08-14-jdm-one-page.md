# JDM One-Page Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a beginner-friendly, single-page JDM ministry photo-sharing prototype from the approved design.

**Architecture:** Create a minimal Vite React app with one page, local sample data, and small stateful interactions for region filtering, a photo detail modal, and an upload guidance panel. Keep all runtime behavior client-side and avoid backend services.

**Tech Stack:** React, Vite, plain CSS, JavaScript, npm.

**Spec:** `docs/superpowers/specs/2026-08-14-jdm-one-page-design.md`

## Global Constraints

- The first version provides no Firebase, login, permissions, database, or real upload.
- The page uses the regions 전체, 아시아, 아프리카, 유럽, 미주.
- The page must work on mobile and desktop.
- Filter controls expose selection through `aria-pressed`.
- Photo modal closes with a close button, backdrop click, and `Escape`.
- `npm run build` is the required production verification.

---

### Task 1: Scaffold The Minimal React App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

**Interfaces:**
- `src/main.jsx` mounts `<App />` into `#root`.
- `src/App.jsx` exports the default page component.

- [x] **Step 1: Add the package manifest**

Create a Vite React package with scripts `dev`, `build`, and `preview`, and dependencies `react` and `react-dom` plus dev dependency `vite`.

- [x] **Step 2: Add the HTML entry point**

Create `#root`, set the Korean document language, and include a useful page title and viewport metadata.

- [x] **Step 3: Add the React entry and placeholder page**

Import React and ReactDOM; render `<App />` with `createRoot`. Export an initial App heading so the scaffold is runnable. The stylesheet is created and imported in Task 2 so this scaffold remains buildable on its own.

- [x] **Step 4: Run the production build**

Run: `npm install; if ($?) { npm run build }`
Expected: Vite completes successfully and creates `dist/`.

### Task 2: Build The One-Page Experience

**Files:**
- Modify: `src/App.jsx`
- Create: `src/styles.css`

**Interfaces:**
- `photos` is an array of objects with `id`, `region`, `regionLabel`, `title`, `description`, `image`, and `alt`.
- `App` owns `selectedRegion`, `selectedPhoto`, and `showUploadGuide` state.

- [x] **Step 1: Define local sample photo data**

Add at least six entries spanning all five region filters, using remote Unsplash image URLs and descriptive Korean alt text.

- [x] **Step 2: Implement the page structure**

Render header, hero, gallery, upload guidance, and footer sections from the spec. Use anchor links from the hero to the gallery and a button in the header to reveal the upload guide.

- [x] **Step 3: Implement region filtering**

Render filter buttons for `all`, `asia`, `africa`, `europe`, and `americas`. Set `aria-pressed={selectedRegion === region}` and derive visible cards by matching `photo.region` or showing all for `all`.

- [x] **Step 4: Implement the detail modal**

Clicking a card sets `selectedPhoto`. Render a dialog-like overlay with the selected image, metadata, close button, and `onClick` backdrop close behavior. Add a `useEffect` keydown listener that closes on `Escape` while a photo is selected.

- [x] **Step 5: Implement upload guidance**

Make the header CTA reveal a clearly labeled three-step panel explaining that actual upload will be added later. Include a close button and no fake submit behavior.

- [x] **Step 6: Add responsive visual styling**

Use an ivory background, ink typography, forest green accent, and warm orange accent. Create a responsive hero grid, photo card grid, visible focus states, readable line lengths, and a mobile breakpoint without adding a UI framework.

- [x] **Step 7: Run the production build**

Run: `npm run build`
Expected: Vite completes without JSX or CSS errors.

### Task 3: Verify The Prototype Behavior

**Files:**
- Modify: `src/App.jsx` only if verification reveals a behavior issue.
- Modify: `src/styles.css` only if verification reveals a layout issue.

**Interfaces:**
- No new public interfaces; verify the browser-facing interactions from Task 2.

- [x] **Step 1: Start the development server**

Run: `npm run dev -- --host 127.0.0.1`
Expected: Vite reports a local URL without startup errors.

- [x] **Step 2: Manually verify desktop behavior**

Open the local URL and confirm the hero, gallery, five filters, upload guide, and footer are visible. Click each filter and confirm the cards change. Click a card and confirm the detail overlay opens and closes with its button, backdrop, and `Escape`.

- [x] **Step 3: Manually verify mobile behavior**

Use a narrow viewport and confirm text remains readable, cards fit within the viewport, filter controls remain usable, and modal content does not overflow horizontally.

- [x] **Step 4: Run the final build**

Run: `npm run build`
Expected: successful Vite production build with no errors.
