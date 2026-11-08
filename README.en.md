# LLM Anatomy 0.1

[Русский](README.md) | [English](README.en.md) | [简体中文](README.zh-CN.md)

An interactive, local architecture inspector for Dense and MoE language models. It shows model structure and tensors, builds an interactive 3D map, and estimates memory without running inference or sending files to a server.

## Requirements and startup

Node.js 20 or newer is required.

```bash
npm ci
npm run dev
```

Open the Vite address printed in the terminal (usually `http://localhost:5173`). To build for production and preview the build locally:

```bash
npm run build
npm run preview
```

The main dependencies are React 18, React Flow (`@xyflow/react`) 12, Lucide React, and Vite 5. Network access is needed only to install npm dependencies; already generated standalone demos do not need them.

## Features

- Local import of GGUF, one or more SafeTensors files, and `config.json`, including folder selection and drag-and-drop.
- Architecture, tensor catalog, and memory estimate tabs, with search by layer, tensor name, and dtype.
- Switchable Model Anatomy and 3D Model Map views with component-level detail for Dense and MoE models.
- Light and dark themes. The selection is stored in `localStorage` under `llm-anatomy-theme`.
- Russian, English, and Simplified Chinese UI. The language is stored under `llm-anatomy-language` and changes without reloading the model.
- JSON export of the summary and metadata: the React app includes the first 50,000 tensors, while the standalone version includes the first 20,000.

## Usage

1. Select “Open model” to choose a `.gguf`, one or more `.safetensors` files, or `config.json`. “Folder” opens a directory containing SafeTensors shards and an optional `config.json` when the browser supports folder selection.
2. In Model Anatomy, expand blocks and layers, pan the diagram with the pointer, and zoom with the wheel or React Flow controls. The Tensors tab searches names and dtypes; Memory estimates weights, FP16 KV cache, and reserve for a requested 2K–128K context and batch 1, 2, or 4. The calculation caps the request at the maximum context declared by the model.
3. In the 3D Model Map, the left button rotates, the middle button pans, the wheel zooms, a single click selects an object, and a double-click opens a component. On-screen buttons control zoom and rotation; full screen, camera reset, model/component panels, and a 0.01×–100× token-pass simulation are also available.
4. “Export” saves the current model summary and metadata as JSON.

## Supported formats and limits

- **GGUF v2/v3:** reads the header, metadata KV, and tensor names, types, and dimensions through `File.slice()`. The first 32 selected GGUF parts are processed per import. If more are selected, the excess is ignored, the import is marked partial, and total weight size and GPU-fit estimates become unknown.
- **SafeTensors:** reads the JSON header and tensor names, shapes, and dtypes. The first 128 shards are processed per import; `config.json` supplies additional model hyperparameters. If more are selected, the excess is ignored, the import is marked partial, and total weight size and GPU-fit estimates become unknown.
- **Config JSON:** displays architecture parameters without weights. The tensor catalog is empty, and weight size and GPU fit remain unknown.

Parser safety limits are 200,000 tensors, 300,000 header metadata entries, and tensor rank no greater than 8 for GGUF; a SafeTensors header may be at most 128 MiB. Layer, Q/KV head, expert, and active-expert counts must be integers from 0 through 4,096; hidden size is limited to 1,000,000, FFN size to 100,000,000, context to 1,000,000,000, and vocabulary to 10,000,000. KV heads cannot exceed Q heads, and active experts cannot exceed total experts.

A 3D scene is limited to 12,000 objects per view; open a component for the next level of detail. For unusual architectures, the computational graph and MoE parameters cannot always be reconstructed completely from headers alone. Without `config.json`, some SafeTensors properties are inferred from tensor names and may remain unknown.

The VRAM estimate is approximate: KV cache is treated as FP16, while actual use depends on the backend, offload, runtime, and settings. Combined memory across multiple GPUs is not a single pool. Actual expert routes are unavailable without executing the model.

## Privacy and safety

Parsing runs in the browser. The app reads only required headers and metadata, does not read weight values, run inference, load the model onto a GPU, or upload selected files. `.gitignore` excludes common weight extensions (`.gguf`, `.safetensors`, `.pt`, `.pth`, `.ckpt`), but does not necessarily exclude `config.json`, tokenizer/metadata files, or exported JSON. Check such files before committing; do not add models, secrets, or credentials to the repository.

## Standalone version

`standalone/index.html` and `llm-anatomy-demo.html` provide the earlier 2D interface without the 3D map or demo-token controls. They can be opened through `file://` and used with your own model file.

Shared parser, model-schema, i18n-message, and memory-estimation modules are assembled from `src/`, but the standalone UI remains Russian-only and has no language selector:

```bash
npm run build:standalone
npm run check:standalone
```

The first command generates `standalone/parser.js` and the single-file `llm-anatomy-demo.html`; do not edit those two files by hand. The second command fails if they are out of date with their sources.

## Verifying changes

```bash
npm test
npm run check:standalone
npm run build
git diff --check
```

The Node.js tests cover the React and standalone parsers, validation, map, localization, memory calculation, playback, and publishing to all remotes. After UI changes, also check both themes, all three languages, file loading, and the main controls manually.

## Project structure

```text
llm-anatomy/
├── index.html                    # Vite entry point
├── src/
│   ├── App.jsx                   # dashboard, import, and 2D anatomy
│   ├── Universe.jsx              # interactive 3D map
│   ├── parsers.js                # header-only GGUF/SafeTensors parsers
│   ├── model-map.js              # 3D hierarchy and scene limits
│   ├── memory.js                 # memory estimation
│   ├── i18n.js / translations.js # application localization
│   └── styles.css                # themes and responsive UI
├── standalone/                   # earlier UI sources and generated parser
├── scripts/                      # standalone generation and publishing
├── tests/                        # node:test test suite
└── llm-anatomy-demo.html         # generated single-file demo
```

`dist/` is the ignored output of `npm run build`. Behavior sources live in `src/`, `standalone/index.html`, `standalone/app.js`, and `standalone/styles.css`, not in generated files.

## Publishing source code

The current configuration has only the `origin` remote; GitHub or GitVerse must not be assumed. Before publishing, safely inspect names only with `git remote`, which cannot print URLs containing embedded credentials. A regular `git push` uses the current branch's upstream.

```bash
npm run push:all
```

This command requires a checked-out local branch and pushes it with all tags to every configured remote, with `origin` first. After an error, it continues with the remaining remotes, reports each result, and exits nonzero. It does not force-push or delete branches. The custom HTTPS credential helper supports only hosts declared in `scripts/git-credential.mjs`; unsupported hosts fail noninteractively. The helper reads tokens from an external user file; override its path with `LLM_ANATOMY_CREDENTIALS`. Tokens must not appear in remote URLs, documentation, or source files.

## Inspirations

- [Weightless](https://github.com/kkipngenokoech/weightless) — model headers and architecture diagrams.
- [Weights Viz](https://github.com/justinchuby/weights-viz) — formats, tensors, and weights.
- [ModelMap](https://github.com/lizhaoliu/modelmap) — architecture and VRAM estimation.
- [React Flow](https://reactflow.dev/) — the interactive React graph.

This is an educational and experimental prototype with no guarantee of compatibility with every GGUF and SafeTensors variant.

## Roadmap

- [x] Local GGUF, SafeTensors, and `config.json` import with architecture and tensor inspection.
- [x] Light and dark themes, three UI languages, the 3D map, and token simulation.
- [x] Regression tests, standalone artifact generation, and pushing to all configured remotes.
- [ ] Configure additional GitHub and GitVerse remotes when access is available.
- [ ] Connect events from a running inference engine.
- [ ] Increase map detail and validate large real-world models.
