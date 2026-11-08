# LLM Anatomy 0.1

[Русский](README.md) | [English](README.en.md) | [简体中文](README.zh-CN.md)

一个面向 Dense 和 MoE 语言模型架构的交互式本地检查器。它无需运行推理或将文件发送到服务器，即可显示模型结构与张量、构建交互式 3D 地图并估算内存。

## 环境要求与启动

需要 Node.js 20 或更高版本。

```bash
npm ci
npm run dev
```

打开终端中 Vite 输出的地址（通常为 `http://localhost:5173`）。构建生产版本并在本地预览：

```bash
npm run build
npm run preview
```

主要依赖包括 React 18、React Flow（`@xyflow/react`）12、Lucide React 和 Vite 5。只有安装 npm 依赖时需要网络；已经生成的独立演示不需要这些依赖。

## 功能

- 在本地导入 GGUF、一个或多个 SafeTensors 文件及 `config.json`，支持选择文件夹和拖放文件。
- 提供架构、张量目录和内存估算标签页，可按层、张量名称和 dtype 搜索。
- 可切换“模型剖析”和“3D 模型地图”，并查看 Dense 与 MoE 模型的组件级细节。
- 支持浅色和深色主题。选择保存在 `localStorage` 的 `llm-anatomy-theme` 键中。
- 支持俄语、英语和简体中文界面。语言保存在 `llm-anatomy-language` 键中，切换语言无需重新加载模型。
- 将摘要和元数据导出为 JSON：React 应用包含前 50,000 个张量，独立版本包含前 20,000 个。

## 使用方法

1. 点击“打开模型”选择 `.gguf`、一个或多个 `.safetensors` 文件或 `config.json`。如果浏览器支持选择文件夹，“文件夹”可打开包含 SafeTensors 分片以及可选 `config.json` 的目录。
2. 在“模型剖析”中展开模块和层，用鼠标移动图表，并通过滚轮或 React Flow 控件缩放。“张量”标签页可搜索名称和 dtype；“内存”标签页估算权重、FP16 KV 缓存和预留空间，支持请求 2K–128K 上下文以及 batch 1、2、4。计算会将请求限制在模型声明的最大上下文以内。
3. 在“3D 模型地图”中，左键旋转，中键平移，滚轮缩放；单击选择对象，双击打开组件。屏幕按钮可控制缩放和旋转；还提供全屏、重置相机、模型/组件面板，以及速度为 0.01×–100× 的 token 传递模拟。
4. 点击“导出”将当前模型摘要和元数据保存为 JSON。

## 支持的格式与限制

- **GGUF v2/v3：**通过 `File.slice()` 读取头部、metadata KV，以及张量名称、类型和维度。每次导入处理所选 GGUF 分片中的前 32 个。选择更多时，超出部分会被忽略，导入会标记为不完整，权重总大小和 GPU 适配估算将变为未知。
- **SafeTensors：**读取 JSON 头部及张量名称、形状和 dtype。每次导入处理前 128 个分片；`config.json` 可补充模型超参数。选择更多时，超出部分会被忽略，导入会标记为不完整，权重总大小和 GPU 适配估算将变为未知。
- **Config JSON：**在没有权重的情况下显示架构参数。张量目录为空，权重大小及能否装入 GPU 均为未知。

解析器安全限制如下：GGUF 最多允许 200,000 个张量、300,000 条头部元数据记录，且张量秩不得超过 8；SafeTensors 头部不得超过 128 MiB。层数、Q/KV 头数、专家数和活跃专家数必须是 0 到 4,096 之间的整数；hidden size 上限为 1,000,000，FFN size 为 100,000,000，上下文为 1,000,000,000，词表为 10,000,000。KV 头数不得超过 Q 头数，活跃专家数不得超过专家总数。

每个 3D 视图最多显示 12,000 个对象；打开组件可进入下一层细节。对于非标准架构，仅靠头部信息不一定能完整还原计算图和 MoE 参数。没有 `config.json` 时，部分 SafeTensors 属性会根据张量名称推断，也可能仍为未知。

VRAM 估算仅供参考：KV 缓存按 FP16 计算，实际占用取决于 backend、offload、runtime 和设置。多块 GPU 的总内存并不等同于单一内存池。不执行模型就无法得知真实的专家路由。

## 隐私与安全

解析在浏览器中运行。应用只读取必要的头部和元数据，不读取权重值、不运行推理、不把模型加载到 GPU，也不上传所选文件。`.gitignore` 排除了常见权重扩展名（`.gguf`、`.safetensors`、`.pt`、`.pth`、`.ckpt`），但不一定排除 `config.json`、tokenizer/元数据文件或导出的 JSON。提交前请检查这些文件；请勿将模型、秘密或凭据加入仓库。

## 独立版本

`standalone/index.html` 和 `llm-anatomy-demo.html` 提供早期的 2D 界面，不含 3D 地图或演示 token 控件。可以通过 `file://` 打开，并选择自己的模型文件。

共享的解析器、模型架构、i18n 消息和内存估算模块从 `src/` 组装，但独立版本界面仍仅支持俄语，且没有语言选择器：

```bash
npm run build:standalone
npm run check:standalone
```

第一条命令生成 `standalone/parser.js` 和单文件 `llm-anatomy-demo.html`；请勿手动编辑这两个文件。第二条命令会在它们落后于源文件时失败。

## 验证更改

```bash
npm test
npm run check:standalone
npm run build
git diff --check
```

Node.js 测试覆盖 React 与 standalone 解析器、验证、地图、本地化、内存计算、播放模拟，以及向所有 remote 发布。修改界面后，还应手动检查两种主题、三种语言、文件加载和主要控件。

## 项目结构

```text
llm-anatomy/
├── index.html                    # Vite 入口
├── src/
│   ├── App.jsx                   # 仪表板、导入与 2D 剖析
│   ├── Universe.jsx              # 交互式 3D 地图
│   ├── parsers.js                # 仅头部 GGUF/SafeTensors 解析器
│   ├── model-map.js              # 3D 层级与场景限制
│   ├── memory.js                 # 内存估算
│   ├── i18n.js / translations.js # 应用本地化
│   └── styles.css                # 主题与响应式界面
├── standalone/                   # 早期界面源文件和生成的解析器
├── scripts/                      # standalone 生成与发布脚本
├── tests/                        # node:test 测试套件
└── llm-anatomy-demo.html         # 生成的单文件演示
```

`dist/` 是 `npm run build` 产生并被忽略的输出。行为源文件位于 `src/`、`standalone/index.html`、`standalone/app.js` 和 `standalone/styles.css`，而不是生成文件中。

## 发布源代码

当前配置只有 `origin` remote；不能假定已经配置 GitHub 或 GitVerse。发布前请用 `git remote` 安全地仅检查名称；该命令不会输出可能包含嵌入式 credentials 的 URL。普通的 `git push` 使用当前分支的 upstream。

```bash
npm run push:all
```

此命令要求已检出本地分支，并将该分支和所有标签推送到每个已配置的 remote，`origin` 优先。遇到错误后仍会继续处理其余 remote，报告每个结果，并以非零状态退出。它不会执行 force push 或删除分支。自定义 HTTPS credential helper 仅支持 `scripts/git-credential.mjs` 中声明的主机；不支持的主机会以非交互方式失败。该 helper 从仓库外的用户文件读取 token；可用 `LLM_ANATOMY_CREDENTIALS` 覆盖其路径。remote URL、文档和源代码中都不得出现 token。

## 灵感来源

- [Weightless](https://github.com/kkipngenokoech/weightless) — 模型头部和架构图。
- [Weights Viz](https://github.com/justinchuby/weights-viz) — 格式、张量和权重。
- [ModelMap](https://github.com/lizhaoliu/modelmap) — 架构与 VRAM 估算。
- [React Flow](https://reactflow.dev/) — 交互式 React 图表。

本项目是教学与实验性原型，不保证兼容所有 GGUF 和 SafeTensors 变体。

## 路线图

- [x] 本地导入 GGUF、SafeTensors 和 `config.json`，检查架构与张量。
- [x] 浅色和深色主题、三种界面语言、3D 地图及 token 模拟。
- [x] 回归测试、独立产物生成，以及推送到所有已配置的 remotes。
- [ ] 在有访问权限后配置额外的 GitHub 和 GitVerse remotes。
- [ ] 连接运行中的推理引擎事件。
- [ ] 提高地图细节并验证大型真实模型。
