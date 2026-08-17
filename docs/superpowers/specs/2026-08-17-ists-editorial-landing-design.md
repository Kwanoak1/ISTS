# 2026 ISTS Editorial Landing Design

## Goal

Transform the current document-style ISTS plan into a photo-led editorial landing page based on the source manuscript. The primary CTA is `프로그램 자세히 보기`, which scrolls to the interactive program section. Preserve the existing Korean content and use the A direction selected in the visual companion: history and people first, then training and reproduction.

## Content Structure

1. Sticky navigation with section anchors and a compact mobile menu.
2. Full-bleed hero with a community photograph, ISTS title, theme, dates, and primary CTA.
3. Editorial introduction describing ISTS as a global discipleship community.
4. Interactive history timeline covering 1977, 1997, 2009, 2017, 2022, and 2026.
5. Five purpose cards covering vision, calling, holistic growth, leadership reproduction, and international awareness.
6. Photo mosaic and global participation statistics.
7. 2026 sixth-school feature section highlighting expected participation, wider countries, local senior staff leadership, and leadership succession.
8. Five-day program section with day tabs and expandable program cards.
9. Single infographic card summarizing `사람 → 훈련 → 관계 → 재생산` and the key numbers.
10. Closing prayer/support statement and repeated program CTA.

## Visual Direction

- Keep the existing navy, warm cream, and gold palette, adding a deep green accent for field and growth moments.
- Use large editorial photography with restrained captions, offset grids, thin rules, and mono labels.
- Use the user-provided Google Photos album as the preferred source when its images are publicly accessible. The album currently redirects to Google sign-in, so the implementation must also provide stable remote fallback images and preserve the photo slots for later replacement.
- Keep all text legible over images with gradients and sufficient contrast.
- Ensure the single infographic card is readable as a standalone shareable block on desktop and mobile.

## Interaction and Data Flow

- `app/page.tsx` becomes a client component because the timeline, mobile menu, day tabs, expandable cards, and scroll CTA require browser state.
- Content remains local arrays in the page module; no backend or authentication is needed.
- Timeline selection updates one highlighted year and its narrative without navigating away.
- Day tabs update the visible schedule; expandable cards reveal speaker and activity detail.
- CTA buttons use in-page anchors and work without JavaScript as standard links.
- Images use CSS/background or native image URLs so deployment does not require a remote image loader configuration.

## Deployment

- Add `netlify.toml` with the Next.js build command and publish configuration suitable for Netlify's Next.js runtime.
- Verify with `npm run build` before deployment.
- Actual Netlify deployment requires a logged-in Netlify CLI or connected repository; do not commit credentials or invent a deployment URL.

## Verification

- Run the production Next.js build.
- Check TypeScript errors and ensure all interactive controls compile.
- Confirm responsive layout at desktop and narrow mobile widths.
- Confirm anchor CTA, timeline selection, day tabs, card expansion, and mobile menu behavior.
- Check that fallback images render when the Google Photos album is unavailable.
