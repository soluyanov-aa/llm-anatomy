---
title: 'Clickable map entity legend'
type: 'feature'
created: '2026-11-08'
status: 'done'
route: 'oneshot'
route_source: 'auto'
review: 'quick'
review_source: 'auto'
lenses_ran: ['quick']
review_loop_iteration: 0
baseline_commit: '8d29ad536063fbb9f34abce2a0ed8bb1b9fe9d9f'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

Make the 3D map legend interactive. Clicking a marker or label selects all nodes of that type on the current level, retaining full brightness and adding selection outlines while other nodes and labels dim to 15%. Only one type can be selected; clicking it again clears selection and clicking another switches types. Only edges joining matching nodes stay bright; other edges and token transitions dim.

Type selection clears individual selection and closes individual details. Selecting a node restores existing individual selection behavior; clicking empty canvas clears focus. Navigation and model replacement reset type selection. Camera reset, theme and language changes preserve it. Missing types remain visible but disabled. Use keyboard-accessible buttons with aria-pressed and visible focus. Preserve label visibility thresholds for group selection to avoid drawing thousands of labels. Keep inspection local and header-only, with existing scene limits. Public import/export APIs and dependencies remain unchanged.

</frozen-after-approval>

## Implementation Notes

Small, contained UI change; oneshot route. Existing Universe canvas rendering already dims individual selections and neighbors. Extract focus calculation into a pure helper so node/edge brightness and type availability receive behavioral tests. Reuse existing translated legend labels; no new UI text needed. Standalone inputs are unaffected.

- Implemented group focus, shared classification and node/edge opacity in `src/map-focus.js`, integrated into `src/Universe.jsx`; legend buttons support native keyboard interaction, pressed/disabled states and theme-aware focus styles.
- Added five behavioral tests covering groups, switching/clearing, individual neighbors, absent types, stale selection and real scene classification.
- Verification: all 22 tests pass; standalone freshness, production build and whitespace checks pass. Dev server responds HTTP 200 at localhost:5173.
- Browser runtime discovery returned no available browsers; manual import, pointer/keyboard, theme/language and responsive checks could not be performed in this session.

## Spec Change Log

## Review Triage Log

- medium / patch: Reviewer found the taller interactive legend could be clipped on short stages (`overflow:hidden`). Confirmed stage constraints; added max-height relative to stage and vertical scrolling so lower controls remain reachable. No findings deferred.

## Verification

- npm test
- npm run check:standalone
- npm run build
- git diff --check
- Exercise local config import, legend pointer and keyboard activation, object selection and navigation, token animation, both themes and three languages, narrow layout.
