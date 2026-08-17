# 2026 ISTS Editorial Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the document-style ISTS page with an A-direction, photo-led editorial landing page whose primary CTA scrolls to an interactive program section and includes a standalone infographic card.

**Architecture:** Keep the page as one Next.js route with local typed content arrays and small React interaction components inside `app/page.tsx`, using client-side state only for menu, timeline, day tabs, and expandable cards. Use CSS background images with stable fallback URLs so the Google Photos album can be substituted later without changing layout or requiring Next image configuration.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Netlify Next.js runtime.

**Spec:** `docs/superpowers/specs/2026-08-17-ists-editorial-landing-design.md`

## Global Constraints

- Preserve the source manuscript's Korean content and factual dates, counts, and names.
- The primary CTA text is `프로그램 자세히 보기` and links to the program section.
- Keep the existing navy, warm cream, and gold palette, adding a deep green accent for field and growth moments.
- Use user-provided Google Photos imagery when publicly accessible; always keep stable fallback images.
- The page must work on desktop and narrow mobile widths.
- Do not add authentication, backend storage, or new runtime dependencies.
- Actual Netlify deployment requires an authenticated CLI or connected repository; never commit credentials or claim a deployment URL without verification.

---

### Task 1: Replace Page Content With Editorial Data And Interactions

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Produces the page sections and DOM hooks consumed by `app/globals.css`.
- State values: `menuOpen: boolean`, `activeYear: number`, `activeDay: number`, `openProgram: string | null`.
- Content arrays: `history`, `purposes`, `days`, `programs`, `photos`, and `stats` remain local typed constants.

- [ ] **Step 1: Add client directive and typed content arrays**

Create typed local arrays for the six history milestones, five purpose cards, five schedule days, program cards, photo captions, and infographic stats. Include the source facts: JDM started in 1977, local staff development began in 1997, Staff Academy began in 2009, ISTS naming began in 2017, the pandemic cohort was in 2022, and the sixth ISTS is in 2026.

- [ ] **Step 2: Add navigation and hero markup**

Create a sticky header with section links and a mobile menu button. Use a `#program` anchor for every `프로그램 자세히 보기` CTA. Add hero copy based on the manuscript conclusion: `세계를 향한 제자도의 산실` and `AI시대, 흔들리지 않는 비전 / 재생산 사역`.

- [ ] **Step 3: Add editorial story sections**

Render the introduction, timeline, purpose cards, photo mosaic, global statistics, and 2026 feature section. The timeline must render the active year narrative and mark the selected year button with `aria-pressed`.

- [ ] **Step 4: Add interactive program section**

Render day tabs with `aria-selected`, the active day's schedule, and expandable program cards. Use buttons rather than clickable non-semantic elements. Keep all detail available in the DOM for keyboard users.

- [ ] **Step 5: Add infographic and closing CTA**

Render one standalone card with the visual flow `사람 → 훈련 → 관계 → 재생산`, headline `현지 사령관을 키우는 재생산의 산실`, and key stats. End with a second anchor CTA and the prayer/support copy from the manuscript.

### Task 2: Build The Editorial Visual System And Responsive Layout

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Styles the class names and IDs created in Task 1.
- Must retain print-safe defaults only if they do not compromise the landing page; the primary target is screen/mobile presentation.

- [ ] **Step 1: Define palette, typography, motion, and base layout**

Keep navy, cream, gold, and green variables. Add display sizing, rounded image treatment, subtle reveal/hover transitions, visible focus styles, and `prefers-reduced-motion` overrides.

- [ ] **Step 2: Style hero and navigation**

Use a full-bleed hero photo with a dark gradient overlay, readable title lockup, metadata, and a high-contrast gold CTA. Make navigation sticky and collapse it below the mobile breakpoint.

- [ ] **Step 3: Style timeline, cards, and photo mosaic**

Use an editorial two-column layout on desktop and one column on mobile. Give the timeline a vertical rule and highlighted year. Use CSS grid for the mosaic with varied spans while preserving a simple stacked layout on narrow screens.

- [ ] **Step 4: Style program tabs, expandable cards, and infographic**

Provide clear active states, touch-sized controls, and a visually distinct infographic card suitable for screenshot/share use. Prevent overflow from long Korean/English names and schedule content.

- [ ] **Step 5: Verify responsive and accessibility states in CSS**

Check focus-visible, contrast, reduced-motion, no-horizontal-overflow, and readable text at approximately 390px and 1440px widths.

### Task 3: Add Netlify Build Configuration And Replace Photo Slots

**Files:**
- Create: `netlify.toml`
- Modify: `app/page.tsx`

**Interfaces:**
- Netlify runs `npm run build` from the repository root and uses Next.js runtime support.
- Photo objects expose `src`, `alt`, `caption`, and `position` so a future public Google Photos URL can replace a single source without changing markup.

- [ ] **Step 1: Add `netlify.toml`**

Configure the build command as `npm run build` and set the Next.js publish/runtime integration expected by Netlify. Do not add secrets or hard-code a site ID.

- [ ] **Step 2: Add stable fallback image URLs and explicit alt text**

Use stable `images.unsplash.com` URLs for the hero, community, travel, learning, and prayer slots. Add descriptive Korean alt text and captions. Keep the user album URL documented in a code-adjacent note only if it is useful; do not make the private Google Photos page a required runtime dependency.

### Task 4: Verify The Working Landing Page And Deployment Readiness

**Files:**
- Test: `app/page.tsx`, `app/globals.css`, `netlify.toml`

- [ ] **Step 1: Run the production build**

Run `npm run build`.

Expected: Next.js production build completes without TypeScript or CSS compilation errors.

- [ ] **Step 2: Run the local server and check the main flow**

Run `npm run dev`, then verify hero CTA scrolls to `#program`, navigation anchors move to their sections, and the mobile menu opens/closes.

- [ ] **Step 3: Check interactive states**

Verify selecting timeline years changes the narrative, changing day tabs changes the schedule, program cards expand/collapse, and all buttons remain keyboard reachable.

- [ ] **Step 4: Check responsive layout**

At approximately 390px and 1440px widths, confirm no horizontal overflow, images retain their crop, the infographic remains readable, and CTA controls are not clipped.

- [ ] **Step 5: Check Netlify readiness**

Confirm `netlify.toml` is included and no credentials are present. If Netlify authentication is available, run the provider's non-destructive deploy command and report the actual result; otherwise report that only local build readiness was verified.

## Self-Review

- The source manuscript, A visual direction, CTA behavior, interactive requirements, fallback photo behavior, infographic card, responsive behavior, build verification, and Netlify limitation are covered by Tasks 1–4.
- No task relies on an undefined function, component, or dependency.
- No placeholders such as `TBD` or `TODO` are required for implementation.
