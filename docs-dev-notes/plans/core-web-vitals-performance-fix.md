---
created: 2026-07-01T13:17:08.531Z
updated: 2026-07-01T13:17:08.531Z
---

# Core Web Vitals Performance Fix

## Summary
Fix critical LCP (Largest Contentful Paint) and overall performance issues on livinginconcordnc.com. The primary bottleneck is a **GIF background image** on the homepage hero section loaded via CSS `background-image` — this alone likely accounts for the 66.8s mobile LCP. Secondary issues include missing image optimization attributes site-wide and no code splitting for heavy components.

**Important platform note:** Floot handles JS bundling/defer, CSS inlining/deferring, and cache headers at the platform level — these are NOT configurable in code. This plan focuses on what we CAN control: image optimization, resource hints, and code splitting.

## Root Causes
1. **Hero GIF** (`_index.module.css`) — A full-size `.gif` from Cloudinary loaded via CSS `background-image`. GIFs are enormous, and CSS background-images are discovered late by the browser (after CSS parse). No preload exists.
2. **Zero image optimization** — No `loading="lazy"`, no `width`/`height`, no `fetchpriority`, no `<link rel="preload">` on any image.
3. **No code splitting** — Heavy components (Chatbot, recharts/MarketStatsGrid, pdfjs-dist/PdfFlipbook) are eagerly loaded on every page.
4. **No resource hints** — No `preconnect` for external domains (res.cloudinary.com, assets.floot.app, images.unsplash.com).

## Files to Modify

### 1. `pages/_index.module.css` — Hero image optimization
- Replace the Cloudinary GIF URL with Cloudinary's WebP transformation URL:
  - **Old:** `https://res.cloudinary.com/builder06/image/upload/f_jpg,q_auto,w_1920/v1775921398/living_in_concord_gif_file_ikbgt3.gif`
  - **New:** `https://res.cloudinary.com/builder06/image/upload/f_auto,q_auto,w_1920/v1775921398/living_in_concord_gif_file_ikbgt3`
  - `f_auto` serves WebP/AVIF based on browser support; `q_auto` optimizes quality; `w_1920` caps width to display size

### 2. `pages/_index.tsx` — Add preload for hero image
- Add a `<link rel="preload">` for the hero background image via `react-helmet` `<Helmet>`:
  ```jsx
  <Helmet>
    <link rel="preload" as="image" href="https://res.cloudinary.com/builder06/image/upload/f_auto,q_auto,w_1920/v1775921398/living_in_concord_gif_file_ikbgt3" fetchpriority="high" />
  </Helmet>
  ```
  This tells the browser to start fetching the hero image immediately during HTML parse, before CSS is even discovered.

### 3. `components/_globalContextProviders.tsx` — Add resource hints
- Add `preconnect` hints in the existing `<Helmet>` block:
  ```jsx
  <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
  <link rel="preconnect" href="https://assets.floot.app" crossOrigin="" />
  <link rel="dns-prefetch" href="https://images.unsplash.com" />
  ```

### 4. `components/HomeAbout.tsx` — Image optimization
- Add `loading="lazy"` (below fold on homepage)
- Add `width` and `height` attributes
- Add `decoding="async"`

### 5. `components/NeighborhoodCard.tsx` — Image optimization
- Add `loading="lazy"` (below fold, in neighborhoods grid)
- Add `width` and `height` attributes
- Add `decoding="async"`

### 6. `components/AboutHero.tsx` — Image optimization
- Add `width` and `height` attributes
- Add `fetchpriority="high"` (above fold on About page)
- Add `decoding="async"`

### 7. `components/NeighborhoodAuthorCard.tsx` — Image optimization
- Add `loading="lazy"`, `width`, `height`, `decoding="async"`

### 8. `components/GuideRelocationSpecialist.tsx` — Image optimization
- Already has `loading="lazy"` ✓
- Add `width` and `height` attributes
- Add `decoding="async"`

### 9. `components/PdfFlipbook.tsx` — Image optimization
- Add `loading="lazy"`, `width`, `height`, `decoding="async"` to page images

### 10. `pages/blog.tsx` — Image optimization
- Add `loading="lazy"`, `width`, `height`, `decoding="async"` to blog post listing images

### 11. `pages/blog.$blogSlug.tsx` — Image optimization
- Add `loading="lazy"` to sidebar author avatar
- Add `width`, `height`, `decoding="async"` to featured image and avatar
- Add `fetchpriority="high"` to the featured/hero blog image (above fold)

### 12. `components/SharedLayout.tsx` — Lazy load Chatbot
- Replace direct `import { Chatbot }` with `React.lazy(() => import("./Chatbot"))`
- Wrap in `<Suspense fallback={null}>` — the chatbot is a floating widget, no visible loading state needed
- This removes Chatbot + its dependencies from the initial bundle on every page

### 13. `components/AdminBlogEditor.tsx` — Image optimization
- Add `loading="lazy"`, `width`, `height` to blog preview image (admin only, low priority)

## Files to Create
None — all changes are modifications to existing files.

## Approach

### Step 1: Hero Image Fix (highest impact)
1. Update the Cloudinary URL in `_index.module.css` to use `f_auto,q_auto,w_1920` transforms
2. Add preload `<link>` in `_index.tsx` via Helmet with `fetchpriority="high"`
3. Add `preconnect` resource hints in `_globalContextProviders.tsx`

### Step 2: Image Optimization (all img tags)
4. Update every `<img>` tag across components and pages to include:
   - `loading="lazy"` for below-fold images
   - `width` and `height` attributes (use reasonable defaults based on CSS/display size)
   - `decoding="async"` for all images
   - `fetchpriority="high"` ONLY for above-fold hero images

### Step 3: Code Splitting
5. Lazy load the `Chatbot` component in `SharedLayout.tsx` using `React.lazy` + `Suspense`

### Step 4: Verify
6. User publishes and tests with PageSpeed Insights

## Expected Impact
- **Hero image fix alone** should dramatically reduce LCP — converting GIF→WebP typically reduces file size by 80-90%, and preloading eliminates the CSS discovery delay
- **Image lazy loading** reduces initial page weight significantly
- **Chatbot lazy loading** reduces JS bundle size on every page
- **Preconnect hints** save 100-300ms on external resource connections

## Risks & Considerations
- **Cloudinary f_auto transform**: Depends on Cloudinary account supporting auto-format. If the transform URL returns a 404 or error, the hero will have no background. Should verify the transformed URL loads correctly before deploying.
- **Animated GIF**: If the hero GIF is animated, `f_auto` will convert to animated WebP (still much smaller than GIF). If animation isn't needed, adding `/pg_1` to extract just the first frame would be even more performant.
- **Width/height on dynamic images**: For images with dynamic URLs from the database (neighborhood cards, blog posts), the actual dimensions may vary. Using reasonable CSS-matched values prevents CLS but may not perfectly match every image.
- **React.lazy for Chatbot**: This is a floating widget that appears after page load anyway, so lazy loading has zero visual impact for users.
- **Items we CANNOT fix in code** (Floot platform controls these):
  - JS defer/bundling strategy
  - CSS critical-path inlining
  - Static asset cache headers (already set to long-duration by Floot)
  - Image CDN optimization for `/_cdn/` assets
