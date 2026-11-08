---
title: 'Add multilingual README files and project agent guidance'
type: 'chore'
created: '2026-11-08'
status: 'done'
route: 'full'
route_source: 'auto'
baseline_commit: '203f32bf746132d83c96d18349c7c36d294e6f68'
review: 'thorough'
review_source: 'auto'
lenses_ran: ['blind-hunter', 'edge-case-hunter', 'verification-gap', 'intent-alignment']
review_loop_iteration: 1
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Project documentation exists only in Russian and there is no repository-level guide that lets a new coding agent safely understand the architecture, generated artifacts, validation workflow, and documentation obligations.

**Approach:** Refresh the Russian README, add complete English and Simplified Chinese equivalents, and create a root `AGENTS.md` with portable operating rules. Treat Russian as the canonical language while requiring all three README files to remain semantically equivalent in the same change.

## Boundaries & Constraints

**Always:** Use `README.md`, `README.en.md`, and `README.zh-CN.md`; add reciprocal language links; translate the complete document rather than summaries; describe current behavior and actual repository configuration; document Node.js 20+, formats, privacy limits, standalone generation, tests, map controls, theming, publishing and roadmap. The agent guide must cover architecture, generated files, i18n, safety, Git discipline, verification, and mandatory README synchronization.

**Never:** Change runtime behavior, dependencies, remote configuration, credentials, generated standalone output, or application translations. Do not claim GitHub is currently configured when `git remote` lists only `origin`. Do not include machine-specific absolute paths or secrets in committed documentation.

</frozen-after-approval>

## Code Map

- `README.md` -- existing Russian source; update stale feature and publishing descriptions while preserving useful operational detail.
- `README.en.md` / `README.zh-CN.md` -- new complete translations with matching structure and code samples.
- `AGENTS.md` -- new root instructions inherited by agents working anywhere in the repository.
- `package.json`, `src/Universe.jsx`, `src/parsers.js`, `src/model-map.js` -- sources of truth for commands, controls, supported formats and limits; inspect only, do not change.

## Tasks & Acceptance

**Execution:**
- [x] `README.md` -- add language navigation and align content with the current multilingual, theme-aware 3D map and configured remotes.
- [x] `README.en.md` and `README.zh-CN.md` -- provide complete, natural translations with identical section order, facts, commands, limits and links.
- [x] `AGENTS.md` -- document safe project pickup, architecture, source/generated boundaries, verification and the three-README synchronization rule.

**Acceptance Criteria:**
- Given any README, when a reader follows its language navigation, then all three local files resolve and provide equivalent complete documentation.
- Given the current application, when README claims are checked against code and package scripts, then controls, themes, formats, limits and commands are accurate.
- Given a new coding agent, when it reads root `AGENTS.md`, then it can identify source-of-truth files, avoid unsafe/generated edits, run required checks and know when all README translations must change.
- Given a documentation-only change, when verification runs, then tests, standalone consistency, production build and whitespace checks all pass.

## Implementation Notes

- Refreshed the canonical Russian README and added complete English and Simplified Chinese translations with reciprocal local links and matching structure.
- Added root agent guidance for architecture, generated artifacts, i18n, safety, Git discipline, and verification.
- Review iteration 1 corrected detailed parser/export/partial-import limits, standalone language scope, ignored-file scope, and safe publishing guidance in all three languages.

## Spec Change Log

## Review Triage Log

| Finding | Verdict | Route | Resolution |
| --- | --- | --- | --- |
| Generic Chinese language label | confirmed | fixed | Named Simplified Chinese consistently in all three READMEs. |
| JSON export limit omitted standalone difference | confirmed | fixed | Documented React 50,000 and standalone 20,000 tensor limits. |
| Memory context range omitted model cap | confirmed | fixed | Stated that 2K–128K requests are capped by the model-declared maximum. |
| Excess shard behavior undocumented | confirmed | fixed | Documented ignored excess files, partial status, and unknown weight/GPU totals. |
| Parser and structure safety limits incomplete | confirmed | fixed | Added GGUF, SafeTensors, structure, relationship, and numeric limits. |
| `.gitignore` claim too broad | confirmed | fixed | Limited the claim to listed weight extensions and warned about other JSON/metadata files. |
| Standalone localization claim too broad | confirmed | fixed | Distinguished shared i18n messages from the Russian-only standalone UI. |
| Publishing guidance could expose credentials or omit prerequisites | confirmed | fixed | Uses `git remote`, adds branch requirement, helper host allowlist, and noninteractive failure. |
| Agent guide generated/local-only rules incomplete | confirmed | fixed | Listed every standalone input via the authoritative build script and narrowed ignored-file claims. |
| Verification-gap reviewer found no gaps | rejected | no change | Required automated and manual verification remained complete. |
| Intent-alignment reviewer found no material divergence | rejected | no change | Implementation remains within the approved documentation-only scope. |

## Verification

**Commands:**
- `npm test` -- passed, 17/17 tests.
- `npm run check:standalone` -- passed; generated artifacts are current.
- `npm run build` -- passed; Vite production build completed.
- `git diff --check` -- passed with no whitespace errors.

**Manual checks:**
- Compared headings, code blocks, lists, limits, links, publishing state and roadmap items across the three README files; each has 11 level-two headings, 12 code fences, 7 Markdown links, 19 bullets, and 4 numbered steps, with matching facts.
- Confirmed reciprocal language links resolve to all three local README files.
- Searched translated files for accidental untranslated Russian prose; only the intentional `Русский` language-navigation label remains.

