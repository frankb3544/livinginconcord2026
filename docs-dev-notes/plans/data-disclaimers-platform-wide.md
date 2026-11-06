---
created: 2026-06-30T17:49:32.818Z
updated: 2026-06-30T17:49:32.818Z
---

# Platform-Wide Data Disclaimers

## Summary
Add data disclaimers throughout the platform — at the **top** of data-heavy pages and **midway** through longer pages — so visitors always see a relevant disclaimer near the data they're reading. Also fix the many pages that currently have zero disclaimer at all. A new lightweight inline `DataDisclaimer` component will handle top/mid-page placements, while existing `PageAuthorBlock` bottom disclaimers will be added where missing.

## Files to Create

### `components/DataDisclaimer`
A lightweight, visually subtle inline disclaimer banner for top and mid-page placement. Not a full author block — just a small, styled note (e.g. a muted text bar with an info icon) that says something contextually appropriate. Props:
- `variant`: `"top"` | `"mid"` — top variant is slightly more prominent; mid variant is a softer inline divider style
- `text`: custom disclaimer text (required) — must be topic-specific per the project system prompt
- Styling: muted background, small font, info icon (lucide `Info`), blends with the page without being intrusive. Should be clearly visible but not dominating.

## Files to Modify

### Pages that need disclaimers ADDED (currently have none):

1. **`pages/moving-to-concord`** (14 sections, moderate data — $370K median, drive times, comparisons)
   - Add `DataDisclaimer` variant="top" after hero with text about market data estimates/Canopy MLS sourcing
   - Add `DataDisclaimer` variant="mid" around section 7 (after GuideSchoolsSection) referencing school/community data sources
   - Add `disclaimer` prop to existing `PageAuthorBlock` — general relocation data sourced from Canopy MLS, Cabarrus County, and public records

2. **`pages/moving-to-concord.schools-guide`** (12 sections, heavy school data — enrollment, ratings, charts)
   - Add `DataDisclaimer` variant="top" after hero citing Cabarrus County Schools & NC DPI
   - Add `DataDisclaimer` variant="mid" after the high school performance charts (~section 5) referencing NC School Report Card data
   - Add `disclaimer` prop to existing `PageAuthorBlock` — school data from Cabarrus County Schools, NC DPI, GreatSchools

3. **`pages/moving-to-concord.cabarrus-county`** (10 sections, population/tax/school data)
   - Add `DataDisclaimer` variant="top" after hero about community/real estate data from public records
   - Add `DataDisclaimer` variant="mid" after property tax section (~section 5) about tax/school data sources
   - Add `disclaimer` prop to existing `PageAuthorBlock`

4. **`pages/moving-to-concord.harrisburg`** (8 sections, price ranges, resident count)
   - Add `DataDisclaimer` variant="top" after hero about real estate estimates from Canopy MLS
   - Add `disclaimer` prop to existing `PageAuthorBlock`

5. **`pages/moving-to-concord.kannapolis`** (8 sections, price ranges, resident count)
   - Add `DataDisclaimer` variant="top" after hero about real estate estimates from Canopy MLS
   - Add `disclaimer` prop to existing `PageAuthorBlock`

6. **`pages/moving-to-concord.moving-from-new-york-to-concord-nc`** (10 sections, dense price/tax comparisons)
   - Add `DataDisclaimer` variant="top" after hero about cost comparison data from public records/MLS
   - Add `DataDisclaimer` variant="mid" after the cost comparison table (~section 5) about pricing/tax data sources
   - Add `disclaimer` prop to existing `PageAuthorBlock`

7. **`pages/neighborhoods`** (4 sections, light data — median price range mention)
   - Add `DataDisclaimer` variant="top" after hero about neighborhood data from Canopy MLS
   - Add `PageAuthorBlock` with appropriate disclaimer at bottom

8. **`pages/neighborhoods.$neighborhoodSlug`** (8-10 sections, price/commute/school data)
   - Add `DataDisclaimer` variant="top" after hero about neighborhood market data from Canopy MLS
   - Add `disclaimer` prop to existing `PageAuthorBlock`

9. **`pages/_index`** (homepage, 9 sections — stats in hero and "at a glance")
   - Add `DataDisclaimer` variant="top" after the at-a-glance/stats section about market data from Canopy MLS
   - No bottom PageAuthorBlock needed (homepage doesn't use one)

10. **`pages/about`** (stats banner — 150+ homes, 15+ years)
    - Add `DataDisclaimer` variant="top" after the stats banner about career statistics being approximate
    - No bottom PageAuthorBlock needed (about page doesn't need one)

11. **`pages/blog.$blogSlug`** (data varies by post)
    - Add `DataDisclaimer` variant="top" after the blog post title/meta area with a general informational disclaimer
    - Add `disclaimer` prop to existing `PageAuthorBlock`

### Pages that need MID-PAGE disclaimers added (already have bottom disclaimer):

12. **`pages/market-reports`** (9 sections, heavy data throughout)
    - Add `DataDisclaimer` variant="top" after hero about MLS-sourced data
    - Already has `AboutTheData` + bottom `PageAuthorBlock` — keep those

13. **`pages/market-reports.local-trends`** (4 sections, heavy data)
    - Add `DataDisclaimer` variant="top" after hero about MLS-sourced data
    - Already has bottom `PageAuthorBlock` — keep that

14. **`pages/moving-to-concord.cost-of-living-concord-nc`** (12 sections, heavy cost data)
    - Add `DataDisclaimer` variant="top" after hero about cost estimates from public sources
    - Add `DataDisclaimer` variant="mid" after the comparison table (~section 8) about pricing variability
    - Already has bottom disclaimer — keep that

15. **`pages/moving-to-concord.is-concord-nc-safe`** (9 sections, qualitative safety claims)
    - Add `DataDisclaimer` variant="top" after hero about safety information sourcing
    - Already has bottom disclaimer — keep that

16. **`pages/moving-to-concord.cox-mill-high-school`** (11 sections, school data)
    - Add `DataDisclaimer` variant="top" after hero about school data from CCS/NC DPI
    - Add `DataDisclaimer` variant="mid" after zoned neighborhoods section (~section 6) about home price estimates
    - Already has bottom disclaimer — keep that

17. **`pages/neighborhoods.28027-concord-nc`** (12 sections, heavy market data)
    - Add `DataDisclaimer` variant="top" after hero about market data from Canopy MLS
    - Add `DataDisclaimer` variant="mid" after market snapshot table (~section 4) reinforcing data recency
    - Already has bottom disclaimer — keep that

## Approach

1. **Create the `DataDisclaimer` component** — lightweight inline banner with `top` and `mid` variants, an info icon, and topic-specific text via a required `text` prop. Top variant has slightly more visual weight; mid variant is a softer horizontal divider style.

2. **Update all pages in batches** (group by similarity):
   - Batch 1: Moving guide pages (moving-to-concord, schools-guide, cabarrus-county, harrisburg, kannapolis, moving-from-nyc) — add top disclaimers, mid-page disclaimers where applicable, and bottom PageAuthorBlock disclaimer props
   - Batch 2: Market/data pages (market-reports, local-trends, cost-of-living, is-concord-safe, cox-mill, 28027) — add top disclaimers and mid-page disclaimers
   - Batch 3: Neighborhood pages (neighborhoods hub, neighborhoods.$slug) — add top disclaimers and bottom disclaimer props
   - Batch 4: Homepage, About, Blog — add contextually appropriate top disclaimers

3. **Each disclaimer text is topic-specific** — tailored to the data on that particular page (market data → Canopy MLS, school data → CCS/NC DPI, safety → NeighborhoodScout, cost data → public records, etc.)

## Risks & Considerations
- **Visual clutter**: Disclaimers should be subtle — muted colors, small text, no harsh borders. They should inform without distracting from content.
- **Mobile responsiveness**: The `DataDisclaimer` component must work well on mobile without taking up too much vertical space.
- **Blog posts**: Since blog content varies, the blog disclaimer should be general ("Information is for educational purposes and may not reflect current conditions").
- **Dynamic neighborhood pages**: The disclaimer on `neighborhoods.$neighborhoodSlug` should use generic MLS language since the specific neighborhood varies.
- **No admin pages**: Admin pages are internal and do not need disclaimers.
- **No disclaimers on**: login, contact, thank-you, privacy-policy, terms-of-service — these don't contain market/statistical data.
