---
title: 'Pan the 3D model map with the middle mouse button'
type: 'feature'
created: '2026-11-08'
status: 'done'
route: 'oneshot'
route_source: 'auto'
baseline_commit: '704f38cb0823cc456ab2e33ef3b36cefaf06189c'
review: 'quick'
review_source: 'auto'
lenses_ran: ['quick']
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Dragging the 3D model map currently rotates it regardless of the mouse button. A middle-button drag must instead move the whole projected scheme through the viewport.

**Approach:** Track a two-dimensional camera offset in the existing view state. Apply middle-button drag deltas to that offset while preserving left-button rotation, wheel zoom, selection, and double-click navigation.

</frozen-after-approval>

## Implementation Notes

The change is localized to the existing canvas camera and pointer handlers in `src/Universe.jsx`, with matching localized help text in `src/translations.js`; estimated below 100 modified lines, so the oneshot route is appropriate. Camera reset must clear the new offset as well as yaw, pitch, and zoom. A moved middle-button gesture must not select a map entity on release, and the browser's native middle-click behavior must not interfere.

Implemented a screen-space `x`/`y` offset in the canvas camera. Pointer drags now record either `rotate` (left button) or `pan` (middle button), native middle-button behavior is suppressed, and only an unmoved rotate gesture can select an entity. Updated the camera reset and the Russian, English, and Chinese control hint. `npm test` passes all 17 tests and `npm run build` succeeds.

Quick review identified stale generated standalone artifacts after the translation change. Regenerated them with `npm run build:standalone`; the standalone consistency check now passes.

## Spec Change Log

## Review Triage Log

- `medium` → `patch`: `src/translations.js` changed while generated `standalone/parser.js` and `llm-anatomy-demo.html` remained stale; reproduced with a failing `npm run check:standalone`, regenerated both artifacts, and verified the check passes.

## Verification

**Commands:**
- `npm test` -- all regression tests pass.
- `npm run build` -- the production bundle builds successfully.

**Manual checks:**
- On the 3D map, hold the middle button and drag: the full scheme follows the pointer without changing its orientation.
- Hold the left button and drag: rotation still works.
- Click an entity without dragging: selection still works; reset camera recenters the translated scheme.
