---
title: 'Add an accessible light theme to the model map'
type: 'feature'
created: '2026-11-08'
status: 'done'
route: 'oneshot'
route_source: 'auto'
baseline_commit: '0501cc6193abb078c83adc90a1ae268df8ee524a'
review: 'quick'
review_source: 'auto'
lenses_ran: ['quick']
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The application theme toggle does not affect the model map: its canvas and overlays remain dark, and the existing scene text and entity colors are tuned only for a dark background.

**Approach:** Pass the active application theme into the map, select a dedicated light canvas palette for the background, edges, labels, entity colors, outlines, selection and token animation, and add light-theme styling for every map overlay. Keep the dark appearance unchanged and verify the light result visually for comfortable reading.

</frozen-after-approval>

## Implementation Notes

The change should reuse the existing `theme` state in `src/App.jsx`, make the canvas palette explicit in `src/Universe.jsx`, and add scoped `html[data-theme="light"]` overrides in `src/styles.css`. Entity colors need enough separation from the pale canvas and from one another; labels, captions, controls, legend and detail windows must use dark text in light mode. Selection cannot remain a white ring on the light canvas. Estimated below 100 modified lines, so the oneshot route is appropriate.

Implemented separate stable dark/light Canvas palettes and passed the existing app theme into `Universe`. Light mode now changes the scene background, entities, edges, labels, outlines, selection ring and token animation; scoped CSS changes the toolbar, caption, legend, detail window and speed control. Updated the localized caption so it no longer claims selection is always white or the token always yellow, then regenerated standalone artifacts. Calculated entity-to-background contrast ranges from 4.39:1 to 5.72:1 and label contrast is 11.55:1. The in-app browser runtime reported no available browser, so screenshot-based inspection could not be completed in this environment.

Quick-review patches added letter markers to larger map entities and matching legend markers so type is not communicated by hue alone. Light-theme edges now use darker opaque colors, and animated inactive edges retain 65% opacity; their composited contrast remains above 3:1. Re-ran all verification commands successfully after these patches.

## Spec Change Log

## Review Triage Log

- `medium` → `patch`: entity type relied on hue alone; added stable letter markers to visible entities and the legend while retaining the existing labels and colors.
- `medium` → `patch`: light edges composited below 3:1; replaced them with darker colors and raised light-mode animation opacity so composited contrast remains above 3:1.
- `maybe-false` → `defer`: screenshot-based usability verification could not run because the browser runtime exposed no browser; a rendered dark/light comparison with a representative model would settle it.

## Verification

**Commands:**
- `npm test` -- all regression tests pass.
- `npm run build` -- the production bundle builds successfully.
- `npm run check:standalone` -- generated standalone artifacts remain current.

**Visual checks:**
- Load a representative model, open the 3D map and compare dark and light modes in the browser.
- In light mode, confirm the canvas, toolbar, legend, caption, camera controls and detail window are light and all text is readable.
- Confirm every entity type, edge, outline, selected entity and animated token remains distinguishable on the light canvas.

