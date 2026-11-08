---
title: 'Give map entities outlines and three-dimensional depth'
type: 'feature'
created: '2026-11-08'
status: 'done'
route: 'oneshot'
route_source: 'auto'
baseline_commit: '35f0bcd080396f734ade8cdf41a60c6e093113c0'
review: 'quick'
review_source: 'auto'
lenses_ran: ['quick']
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Entities on the 3D map are rendered as flat, borderless colored circles, which weakens separation and the perception of depth.

**Approach:** Render every entity with a visible rim plus screen-space shading and a highlight that makes it read as a small three-dimensional sphere. Preserve entity colors, depth ordering, selection emphasis, labels, animation dimming, hit targets, and map performance.

</frozen-after-approval>

## Implementation Notes

The renderer change is localized to the per-entity draw pass in `src/Universe.jsx` and is estimated below 100 modified lines, so the oneshot route is appropriate. Prefer simple canvas primitives over per-frame filters or DOM overlays because the scene may contain thousands of entities. The existing outer white selection ring remains distinct from the new always-visible entity rim.

Implemented `drawEntity` with four inexpensive canvas operations: an offset dark silhouette, the original type-colored body, a light rim, and an upper-left highlight. The main draw loop retains depth sorting, selection opacity, labels, block orbit ellipses, and the separate white selection ring. No gradients, filters, or DOM nodes were added.

Verification completed successfully: all 17 tests pass, the production build succeeds, standalone artifacts are current, and quick review reported no findings.

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm test` -- all regression tests pass.
- `npm run build` -- the production bundle builds successfully.
- `npm run check:standalone` -- generated standalone artifacts remain current.

**Manual checks:**
- Entities of every type have a visible outline, dark lower-right depth shading, and a light upper-left highlight.
- Selected and dimmed entities remain distinguishable, and rotation, pan, zoom, labels, and token animation still work.
