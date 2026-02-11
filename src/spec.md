# Specification

## Summary
**Goal:** Improve mobile UX and performance by making interactions easier to tap, navigation faster to reach, layouts cleaner on small screens, and tool discovery swipe-friendly.

**Planned changes:**
- Increase touch target sizes and padding for mobile across buttons, links, and clickable card surfaces while maintaining balanced layouts on tool pages.
- Add a mobile-only sticky bottom navigation for tool categories with icons, English labels, and accessible focus/label behavior; ensure it does not cover key CTAs by adding appropriate bottom spacing.
- Optimize mobile rendering performance for images/icons (e.g., lazy-load non-critical visuals, reduce expensive effects on mobile, and respect `prefers-reduced-motion`).
- Update key mobile layouts to a clean single-column presentation on small screens with readable typography and no overflow/clipping.
- Add subtle, performant swipe-friendly browsing (e.g., horizontal swipe row/carousel with scroll-snap) for at least one key tool/category discovery surface, respecting `prefers-reduced-motion`.

**User-visible outcome:** On mobile, controls are easier to tap, categories are quickly accessible via a sticky bottom nav, pages load and animate more smoothly, content reads well in a one-column layout, and users can swipe through featured tools/categories without fighting vertical scrolling.
