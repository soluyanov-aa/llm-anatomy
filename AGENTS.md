# Agent guide

## Start here

LLM Anatomy is a Vite/React browser application that inspects local GGUF, SafeTensors, and `config.json` metadata. It must remain local-first: do not add uploads, inference, weight-value reads, telemetry, credentials, or network requirements without an explicit product decision.

Before changing behavior, read `package.json` and the relevant source and tests. Treat the current code and configured Git remotes as authoritative; do not copy assumptions from generated artifacts or stale documentation.

## Architecture and sources of truth

- `src/App.jsx`: application state, file/folder import, 2D architecture UI, tensor and memory panels, themes, and JSON export.
- `src/Universe.jsx` and `src/model-map.js`: 3D controls, scene hierarchy, component drill-down, and the 12,000-object limit.
- `src/parsers.js` and `src/model-schema.js`: header-only import, supported formats, shard limits, inference from metadata, and structural validation.
- `src/memory.js` and `src/playback.js`: memory estimation and token-animation timing.
- `src/i18n.js`, `src/translations.js`, and `src/LanguageSelector.jsx`: application localization. Russian message keys are the fallback/source language.
- `src/styles.css`: light/dark themes, layout, responsive behavior, and map overlays.
- `standalone/index.html`, `standalone/app.js`, and `standalone/styles.css`: editable sources for the earlier standalone UI.
- `scripts/build-standalone.mjs`: assembles shared `src/` modules into standalone artifacts.
- `tests/`: Node.js regression tests. Add or update focused tests when behavior changes.

## Generated and local-only files

Do not hand-edit `standalone/parser.js` or `llm-anatomy-demo.html`. `scripts/build-standalone.mjs` is the authoritative dependency list: it builds them from `src/translations.js`, `src/i18n.js`, `src/model-schema.js`, `src/parsers.js`, `src/memory.js`, `standalone/index.html`, `standalone/app.js`, and `standalone/styles.css`. Run `npm run build:standalone` after changing any of those shared modules or standalone sources. `npm run check:standalone` verifies that both generated files are current.

`dist/`, `node_modules/`, test reports, environment files, logs, credentials, and common weight extensions (`.gguf`, `.safetensors`, `.pt`, `.pth`, `.ckpt`) are ignored/local artifacts. Other model-related files, including `config.json`, tokenizer/metadata files, and exported JSON, are not necessarily ignored; inspect them before committing. Never place secrets in source, docs, logs, remote URLs, fixtures, or examples.

## Internationalization and documentation

For user-facing UI text, preserve the Russian source key and add complete English and Simplified Chinese entries in `src/translations.js`. Verify interpolation and the untranslated-key fallback. Do not translate model names, tensor names, file names, or metadata values.

The three root README files are one document in three languages:

- `README.md` — canonical Russian version.
- `README.en.md` — complete English translation.
- `README.zh-CN.md` — complete Simplified Chinese translation.

Any change to README facts, commands, links, limits, publishing state, structure, or roadmap must update all three files in the same change. Keep their heading order, code blocks, numeric limits, and reciprocal language links equivalent; do not replace a translation with a summary.

## Safety and Git discipline

- Preserve header-only, browser-local inspection and the documented limits unless the requested behavior explicitly changes them.
- Validate counts and sizes before allocating or rendering. Keep large-file reads bounded with slices rather than loading model weights into memory.
- Do not edit dependencies, runtime behavior, Git remotes, credentials, or publishing configuration as a side effect of unrelated work.
- Inspect `git status` before and after work. Existing changes belong to the user; do not discard or overwrite them.
- Do not push, force-push, rewrite history, delete branches/tags, or modify remotes unless the user explicitly requests it.
- Before documenting publishing state, inspect `git remote` without exposing credential-bearing URLs. Do not assume GitHub or GitVerse is configured.

## Verification

For normal code or documentation changes, run:

```bash
npm test
npm run check:standalone
npm run build
git diff --check
```

If shared standalone inputs changed intentionally, first run `npm run build:standalone`, then rerun the full checks. For UI changes, manually exercise the affected file-loading path, both themes, all three UI languages, keyboard/pointer behavior, and responsive layout as appropriate. For README changes, compare all headings, code blocks, links, limits, publishing claims, and roadmap items across all three language files.
