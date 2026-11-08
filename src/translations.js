export const messages = {
  "Нажмите, чтобы раскрыть слой": {
    "en": "Click to expand the layer",
    "zh": "点击展开该层"
  },
  "Слои объединены в один блок для читаемости": {
    "en": "Layers are grouped into one block for readability",
    "zh": "为便于阅读，多个层合并显示为一个模块"
  },
  "Входные токены": {
    "en": "Input tokens",
    "zh": "输入词元"
  },
  "Token IDs · последовательность": {
    "en": "Token IDs · sequence",
    "zh": "Token IDs · 序列"
  },
  "{0} измерений": {
    "en": "{0} dimensions",
    "zh": "{0} 维"
  },
  "Нормализация выходных состояний": {
    "en": "Output state normalization",
    "zh": "输出状态归一化"
  },
  "Логиты следующего токена": {
    "en": "Next-token logits",
    "zh": "下一个词元的 logits"
  },
  "{0} из {1} экспертов": {
    "en": "{0} of {1} experts",
    "zh": "{1} 个专家中的 {0} 个"
  },
  "Следующий Transformer block": {
    "en": "Next Transformer block",
    "zh": "下一个 Transformer 模块"
  },
  "Top-{0} из {1}": {
    "en": "Top-{0} of {1}",
    "zh": "从 {1} 个中选择前 {0} 个"
  },
  "Объединение выходов": {
    "en": "Merge outputs",
    "zh": "合并输出"
  },
  "Обзор модели": {
    "en": "Model overview",
    "zh": "模型概览"
  },
  "Структурная схема": {
    "en": "Structural diagram",
    "zh": "结构图"
  },
  "Модель /": {
    "en": "Model /",
    "zh": "模型 /"
  },
  "Назад": {
    "en": "Back",
    "zh": "返回"
  },
  "МЕТАДАННЫЕ": {
    "en": "METADATA",
    "zh": "元数据"
  },
  "⇢ Клик по блоку — раскрыть": {
    "en": "⇢ Click a block to expand",
    "zh": "⇢ 点击模块展开"
  },
  "✋ Перетаскивание — панорама": {
    "en": "✋ Drag to pan",
    "zh": "✋ 拖动平移"
  },
  "◎ Колесо — масштаб": {
    "en": "◎ Scroll to zoom",
    "zh": "◎ 滚轮缩放"
  },
  "Структура восстановлена по метаданным": {
    "en": "Structure reconstructed from metadata",
    "zh": "根据元数据重建的结构"
  },
  "Блоки представляют типовую Transformer-архитектуру. Точный вычислительный граф зависит от исходного кода модели; реальная активация экспертов требует инференса.": {
    "en": "Blocks represent a typical Transformer architecture. The exact computation graph depends on the model implementation; actual expert activation requires inference.",
    "zh": "模块表示典型的 Transformer 架构。准确的计算图取决于模型实现；专家的实际激活需要运行推理。"
  },
  "Модель целиком": {
    "en": "Entire model",
    "zh": "完整模型"
  },
  "Описание загруженного файла и обнаруженных весов. Для полного графа нужен код реализации.": {
    "en": "Loaded file and detected weights. A complete graph also requires the implementation code.",
    "zh": "已加载文件和检测到的权重。完整计算图还需要实现代码。"
  },
  "Формат": {
    "en": "Format",
    "zh": "格式"
  },
  "Архитектура": {
    "en": "Architecture",
    "zh": "架构"
  },
  "Параметры": {
    "en": "Parameters",
    "zh": "参数"
  },
  "Тензоров": {
    "en": "Tensors",
    "zh": "张量数"
  },
  "Таблица векторов для преобразования идентификаторов токенов в скрытые состояния.": {
    "en": "A vector table that converts token IDs into hidden states.",
    "zh": "将词元 ID 转换为隐藏状态的向量表。"
  },
  "Токенизатор преобразует исходный текст в идентификаторы. Он может быть вынесен в отдельные файлы.": {
    "en": "The tokenizer converts text into IDs. It may be stored in separate files.",
    "zh": "分词器将文本转换为 ID，也可能存储在独立文件中。"
  },
  "Внимание связывает токены через Q, K, V и выходную проекцию. В GQA несколько query-голов разделяют KV-головы.": {
    "en": "Attention connects tokens through Q, K, V and the output projection. In GQA, multiple query heads share KV heads.",
    "zh": "注意力通过 Q、K、V 和输出投影连接词元。在 GQA 中，多个查询头共享 KV 头。"
  },
  "Разреженная FFN, в которой роутер выбирает подмножество экспертов. Неактивные эксперты обычно всё равно занимают память.": {
    "en": "A sparse FFN whose router selects a subset of experts. Inactive experts usually still occupy memory.",
    "zh": "由路由器选择部分专家的稀疏 FFN。未激活的专家通常仍占用内存。"
  },
  "Всего экспертов": {
    "en": "Total experts",
    "zh": "专家总数"
  },
  "Активных / токен": {
    "en": "Active / token",
    "zh": "每词元激活数"
  },
  "Вид": {
    "en": "Type",
    "zh": "类型"
  },
  "Полносвязные проекции Gate, Up и Down с нелинейной активацией. В плотном блоке они задействованы для каждого токена.": {
    "en": "Gate, Up and Down projections with a nonlinear activation. Dense blocks use them for every token.",
    "zh": "带有非线性激活的 Gate、Up 和 Down 投影。稠密模块对每个词元使用这些投影。"
  },
  "Нормализация представлений (вариант зависит от архитектуры).": {
    "en": "Representation normalization (varies by architecture).",
    "zh": "表示归一化（具体形式取决于架构）。"
  },
  "Метод": {
    "en": "Method",
    "zh": "方法"
  },
  "Выходная проекция в логиты словаря. Следующий токен выбирается стратегией декодирования.": {
    "en": "Output projection to vocabulary logits. The decoding strategy selects the next token.",
    "zh": "将隐藏状态投影为词表 logits。解码策略选择下一个词元。"
  },
  "Взвешенная сумма выходов выбранных экспертов.": {
    "en": "Weighted sum of selected expert outputs.",
    "zh": "选中专家输出的加权和。"
  },
  "Повторяющийся блок: attention, нормализации, residual-связи и FFN либо MoE.": {
    "en": "Repeated block: attention, normalization, residual connections and FFN or MoE.",
    "zh": "重复模块：注意力、归一化、残差连接以及 FFN 或 MoE。"
  },
  "Слоёв": {
    "en": "Layers",
    "zh": "层数"
  },
  "Инспектор компонентов": {
    "en": "Component inspector",
    "zh": "组件检查器"
  },
  "Свойства элемента": {
    "en": "Element properties",
    "zh": "元素属性"
  },
  "Выбери любой блок схемы для подробной информации.": {
    "en": "Select any diagram block for more information.",
    "zh": "选择图中的任意模块以查看详细信息。"
  },
  "Связанные тензоры": {
    "en": "Related tensors",
    "zh": "关联张量"
  },
  "Не найдено подходящих тензоров.": {
    "en": "No matching tensors found.",
    "zh": "未找到匹配的张量。"
  },
  "← К слою": {
    "en": "← Back to layer",
    "zh": "← 返回层"
  },
  "↳ Раскрыть": {
    "en": "↳ Expand",
    "zh": "↳ 展开"
  },
  "Тензоры": {
    "en": "Tensors",
    "zh": "张量"
  },
  "Уровень уверенности": {
    "en": "Confidence level",
    "zh": "置信度"
  },
  "Атрибуты получены из заголовков; топология реконструирована.": {
    "en": "Attributes read from headers; topology reconstructed.",
    "zh": "属性读取自文件头；拓扑为重建结果。"
  },
  "Каталог тензоров": {
    "en": "Tensor catalog",
    "zh": "张量目录"
  },
  "Быстрый поиск по имени и типу. Значения весов не загружаются — только заголовки файлов.": {
    "en": "Search by name or type. Weight values are not loaded — only file headers.",
    "zh": "按名称或类型搜索。仅读取文件头，不加载权重值。"
  },
  "тензоров": {
    "en": "tensors",
    "zh": "个张量"
  },
  "Прочитано из заголовков файлов": {
    "en": "Read from file headers",
    "zh": "读取自文件头"
  },
  "Поиск по имени / dtype...": {
    "en": "Search by name / dtype...",
    "zh": "按名称 / dtype 搜索..."
  },
  "Тензор": {
    "en": "Tensor",
    "zh": "张量"
  },
  "Размерность": {
    "en": "Shape",
    "zh": "形状"
  },
  "Тип": {
    "en": "Type",
    "zh": "类型"
  },
  "Элементов": {
    "en": "Elements",
    "zh": "元素数"
  },
  "Нет совпадений": {
    "en": "No matches",
    "zh": "无匹配结果"
  },
  "{0}–{1} из {2}": {
    "en": "{0}–{1} of {2}",
    "zh": "第 {0}–{1} 项，共 {2} 项"
  },
  "0 тензоров": {
    "en": "0 tensors",
    "zh": "0 个张量"
  },
  "← Назад": {
    "en": "← Previous",
    "zh": "← 上一页"
  },
  "Далее →": {
    "en": "Next →",
    "zh": "下一页 →"
  },
  "32 GB GDDR7 · одна видеокарта": {
    "en": "32 GB GDDR7 · one GPU",
    "zh": "32 GB GDDR7 · 单张显卡"
  },
  "до 96 GB UMA · в зависимости от системы": {
    "en": "Up to 96 GB UMA · system dependent",
    "zh": "最高 96 GB UMA · 取决于系统"
  },
  "6 × 24 GB · не единый пул памяти": {
    "en": "6 × 24 GB · not a unified memory pool",
    "zh": "6 × 24 GB · 非统一内存池"
  },
  "Планировщик памяти GPU": {
    "en": "GPU memory planner",
    "zh": "GPU 内存规划器"
  },
  "Приближённая оценка весов, KV-cache FP16 и дополнительного резерва. Фактическое потребление зависит от backend, offload, runtime и настроек.": {
    "en": "Approximate weights, FP16 KV-cache and reserve estimate. Actual usage depends on backend, offload, runtime and settings.",
    "zh": "权重、FP16 KV 缓存和预留空间的近似估算。实际用量取决于后端、卸载、运行时及设置。"
  },
  "Размер весов неизвестен или набор файлов неполон. Для итоговой оценки откройте полный набор весов. KV-cache показан отдельно.": {
    "en": "Weight size is unknown or files are incomplete. Open all weight files for a total estimate. KV-cache is shown separately.",
    "zh": "权重大小未知或文件不完整。请打开全部权重文件以获得总量估算。KV 缓存单独显示。"
  },
  "Контекст:": {
    "en": "Context:",
    "zh": "上下文："
  },
  "Веса на диске": {
    "en": "Weights on disk",
    "zh": "磁盘上的权重"
  },
  "Резерв": {
    "en": "Reserve",
    "zh": "预留空间"
  },
  "Неизвестно": {
    "en": "Unknown",
    "zh": "未知"
  },
  "Веса": {
    "en": "Weights",
    "zh": "权重"
  },
  "Устройство": {
    "en": "Device",
    "zh": "设备"
  },
  "Недостаточно данных о весах": {
    "en": "Insufficient weight data",
    "zh": "权重数据不足"
  },
  "✓ По объёму теоретически помещается": {
    "en": "✓ May theoretically fit by capacity",
    "zh": "✓ 理论上可能容纳"
  },
  "⚠ Оценка превышает объём": {
    "en": "⚠ Estimate exceeds capacity",
    "zh": "⚠ 估算超出容量"
  },
  " · требуется распределение модели": {
    "en": " · model distribution required",
    "zh": " · 需要分布式存放模型"
  },
  "Ограничения оценки": {
    "en": "Estimate limitations",
    "zh": "估算限制"
  },
  "KV-cache: 2 × слои × KV-головы × размер головы × контекст × batch × 2 байта. Для MoE неактивные эксперты обычно всё равно хранятся в памяти. Сумма VRAM нескольких GPU не эквивалентна единому блоку памяти.": {
    "en": "KV-cache: 2 × layers × KV heads × head dimension × context × batch × 2 bytes. Inactive MoE experts usually remain in memory. Combined GPU capacity is not equivalent to a single memory block.",
    "zh": "KV 缓存：2 × 层数 × KV 头数 × 头维度 × 上下文 × batch × 2 字节。未激活的 MoE 专家通常仍保留在内存中。多张显卡容量之和不等同于单块统一内存。"
  },
  "Открыта модель: {0}. Тензоров: {1}": {
    "en": "Model opened: {0}. Tensors: {1}",
    "zh": "已打开模型：{0}。张量数：{1}"
  },
  "Ошибка чтения модели: ": {
    "en": "Error reading model: ",
    "zh": "读取模型出错："
  },
  "ПАРАМЕТРЫ": {
    "en": "PARAMETERS",
    "zh": "参数量"
  },
  "по тензорам": {
    "en": "from tensors",
    "zh": "根据张量计算"
  },
  "СЛОИ": {
    "en": "LAYERS",
    "zh": "层数"
  },
  "КОНТЕКСТ": {
    "en": "CONTEXT",
    "zh": "上下文"
  },
  "токенов": {
    "en": "tokens",
    "zh": "词元"
  },
  "АРХИТЕКТУРА": {
    "en": "ARCHITECTURE",
    "zh": "架构"
  },
  "единая FFN": {
    "en": "single FFN",
    "zh": "单一 FFN"
  },
  "ТОЧНОСТЬ": {
    "en": "PRECISION",
    "zh": "精度"
  },
  "НА ДИСКЕ": {
    "en": "ON DISK",
    "zh": "磁盘大小"
  },
  "размер файлов": {
    "en": "file size",
    "zh": "文件大小"
  },
  "Открыть меню": {
    "en": "Open menu",
    "zh": "打开菜单"
  },
  "3D-карта модели": {
    "en": "3D model map",
    "zh": "模型 3D 地图"
  },
  "Анатомия модели": {
    "en": "Model anatomy",
    "zh": "模型解剖"
  },
  "Переключить тему": {
    "en": "Toggle theme",
    "zh": "切换主题"
  },
  "Экспорт": {
    "en": "Export",
    "zh": "导出"
  },
  "Папка": {
    "en": "Folder",
    "zh": "文件夹"
  },
  "Чтение...": {
    "en": "Reading...",
    "zh": "正在读取..."
  },
  "Открыть модель": {
    "en": "Open model",
    "zh": "打开模型"
  },
  "Закрыть меню по фону": {
    "en": "Close menu backdrop",
    "zh": "关闭菜单遮罩"
  },
  "Закрыть меню": {
    "en": "Close menu",
    "zh": "关闭菜单"
  },
  "Развернуть меню": {
    "en": "Expand menu",
    "zh": "展开菜单"
  },
  "Свернуть меню": {
    "en": "Collapse menu",
    "zh": "折叠菜单"
  },
  "Данные остаются локально": {
    "en": "Data stays local",
    "zh": "数据保留在本地"
  },
  "Считываются только заголовки GGUF и SafeTensors. Файлы не отправляются на сервер и не загружаются на GPU.": {
    "en": "Only GGUF and SafeTensors headers are read. Files are not uploaded or loaded onto the GPU.",
    "zh": "仅读取 GGUF 和 SafeTensors 文件头。文件不会上传，也不会加载到 GPU。"
  },
  "Интерактивный исследователь моделей": {
    "en": "Interactive model explorer",
    "zh": "交互式模型探索器"
  },
  "Метаданные локальной модели": {
    "en": "Local model metadata",
    "zh": "本地模型元数据"
  },
  "⚠ Частичная загрузка": {
    "en": "⚠ Partial load",
    "zh": "⚠ 部分加载"
  },
  "Память": {
    "en": "Memory",
    "zh": "内存"
  },
  "Структура модели": {
    "en": "Model structure",
    "zh": "模型结构"
  },
  "Найти слой…": {
    "en": "Find a layer…",
    "zh": "查找层…"
  },
  "− Свернуть": {
    "en": "− Collapse",
    "zh": "− 折叠"
  },
  "＋ Ещё {0} слоёв": {
    "en": "＋ {0} more layers",
    "zh": "＋ 还有 {0} 层"
  },
  "Выберите модель": {
    "en": "Select a model",
    "zh": "选择模型"
  },
  "Откройте GGUF, SafeTensors или config.json. Выбранная модель будет доступна во всех разделах дашборда.": {
    "en": "Open GGUF, SafeTensors or config.json. The selected model will be available across the dashboard.",
    "zh": "打开 GGUF、SafeTensors 或 config.json。所选模型将在整个仪表板中可用。"
  },
  "Слои": {
    "en": "Layers",
    "zh": "层"
  },
  "Эксперты": {
    "en": "Experts",
    "zh": "专家"
  },
  "Нормализация": {
    "en": "Normalization",
    "zh": "归一化"
  },
  "Элементы весов": {
    "en": "Weight elements",
    "zh": "权重元素"
  },
  "Модель": {
    "en": "Model",
    "zh": "模型"
  },
  "Модель и параметры": {
    "en": "Model and parameters",
    "zh": "模型与参数"
  },
  "Компоненты": {
    "en": "Components",
    "zh": "组件"
  },
  "Выйти из полного экрана": {
    "en": "Exit fullscreen",
    "zh": "退出全屏"
  },
  "Полный экран": {
    "en": "Fullscreen",
    "zh": "全屏"
  },
  "Сброс камеры": {
    "en": "Reset camera",
    "zh": "重置相机"
  },
  "Скорость токена": {
    "en": "Token speed",
    "zh": "词元速度"
  },
  "Сверхмедленно · 0,01× — 100× · Максимум": {
    "en": "Ultra slow · 0.01× — 100× · Maximum",
    "zh": "超慢 · 0.01× — 100× · 最快"
  },
  "Пауза": {
    "en": "Pause",
    "zh": "暂停"
  },
  "▶ Проход токена": {
    "en": "▶ Token playback",
    "zh": "▶ 播放词元"
  },
  "Интерактивная трёхмерная карта модели": {
    "en": "Interactive 3D model map",
    "zh": "交互式模型 3D 地图"
  },
  "Типы сущностей": {
    "en": "Entity types",
    "zh": "实体类型"
  },
  "Управление камерой": {
    "en": "Camera controls",
    "zh": "相机控制"
  },
  "Приблизить": {
    "en": "Zoom in",
    "zh": "放大"
  },
  "Отдалить": {
    "en": "Zoom out",
    "zh": "缩小"
  },
  "Повернуть влево": {
    "en": "Rotate left",
    "zh": "向左旋转"
  },
  "Повернуть вправо": {
    "en": "Rotate right",
    "zh": "向右旋转"
  },
  "Повернуть вверх": {
    "en": "Rotate up",
    "zh": "向上旋转"
  },
  "Повернуть вниз": {
    "en": "Rotate down",
    "zh": "向下旋转"
  },
  "Детализация ограничена: откройте компонент, чтобы рассмотреть его содержимое.": {
    "en": "Detail is limited: open a component to inspect its contents.",
    "zh": "细节数量已受限：打开组件以查看其内容。"
  },
  "Вращение — левая кнопка · Перемещение — средняя · Масштаб — колесо · Погружение — двойной клик": {
    "en": "Rotate — left button · Pan — middle button · Zoom — scroll · Explore — double-click",
    "zh": "旋转 — 左键 · 平移 — 中键 · 缩放 — 滚轮 · 深入查看 — 双击"
  },
  "Цвет обозначает тип сущности · Белый контур — выбор · Жёлтый ромб — токен, яркая линия — текущий переход (симуляция).": {
    "en": "Color indicates entity type · White outline — selection · Yellow diamond — token, bright line — current transition (simulation).",
    "zh": "颜色表示实体类型 · 白色轮廓表示选中 · 黄色菱形为词元，亮线表示当前转换（模拟）。"
  },
  "Закрыть окно": {
    "en": "Close window",
    "zh": "关闭窗口"
  },
  "Слоёв:": {
    "en": "Layers:",
    "zh": "层数："
  },
  "· Размерность:": {
    "en": "· Hidden size:",
    "zh": "· 隐藏维度："
  },
  "Тензоров:": {
    "en": "Tensors:",
    "zh": "张量数："
  },
  "· Параметров:": {
    "en": "· Parameters:",
    "zh": "· 参数量："
  },
  "Данные из заголовков модели. Проход токена — демонстрационная симуляция.": {
    "en": "Data from model headers. Token playback is a simulation.",
    "zh": "数据来自模型文件头。词元播放为模拟。"
  },
  "Выберите компонент": {
    "en": "Select a component",
    "zh": "选择组件"
  },
  "{0} объектов на этом уровне. Карта восстановлена из метаданных; значения весов не прочитаны.": {
    "en": "{0} objects at this level. Map reconstructed from metadata; weight values are not read.",
    "zh": "此层级有 {0} 个对象。地图根据元数据重建；未读取权重值。"
  },
  "Открыть компонент →": {
    "en": "Open component →",
    "zh": "打开组件 →"
  },
  "Для этого компонента в метаданных нет доступных тензоров.": {
    "en": "No tensors are available for this component in the metadata.",
    "zh": "元数据中没有此组件可用的张量。"
  },
  "Не удалось построить карту": {
    "en": "Unable to build the map",
    "zh": "无法构建地图"
  },
  "Можно открыть другую модель или вернуться в «Анатомию».": {
    "en": "Open another model or return to Model anatomy.",
    "zh": "请打开其他模型或返回模型解剖。"
  },
  "Повторить": {
    "en": "Retry",
    "zh": "重试"
  },
  "Голова внимания — вычислительная часть. Ниже показаны общие тензоры Attention; срез конкретной головы не определён.": {
    "en": "An attention head is a computational part. The shared Attention tensors are shown below; the head-specific slice is not determined.",
    "zh": "注意力头是计算组件。下方显示共享的注意力张量；尚未确定此头的具体切片。"
  },
  "Элемент {0}": {
    "en": "Element {0}",
    "zh": "元素 {0}"
  },
  "Схематический элемент. Значение веса не прочитано.": {
    "en": "Schematic element. Weight value has not been read.",
    "zh": "示意元素。尚未读取权重值。"
  },
  " · Общий тензор экспертов; выбран Expert {0}, срез не выделен.": {
    "en": " · Shared expert tensor; Expert {0} selected, slice not extracted.",
    "zh": " · 共享专家张量；已选择专家 {0}，未提取切片。"
  },
  " · Общий тензор Attention; срез головы не определён.": {
    "en": " · Shared Attention tensor; head slice not determined.",
    "zh": " · 共享注意力张量；尚未确定头的切片。"
  },
  "Некорректный параметр {0}: ожидается целое число от 0 до {1}": {
    "en": "Invalid parameter {0}: expected an integer from 0 to {1}",
    "zh": "参数 {0} 无效：需要 0 到 {1} 之间的整数"
  },
  "Число KV-голов превышает число Q-голов": {
    "en": "KV head count exceeds Q head count",
    "zh": "KV 头数超出 Q 头数"
  },
  "Число активных экспертов превышает общее число экспертов": {
    "en": "Active expert count exceeds total expert count",
    "zh": "激活专家数超出专家总数"
  },
  "Некорректный или обрезанный заголовок файла": {
    "en": "Invalid or truncated file header",
    "zh": "文件头无效或被截断"
  },
  "GGUF содержит некорректную длину": {
    "en": "GGUF contains an invalid length",
    "zh": "GGUF 包含无效长度"
  },
  "Недопустимая длина строки GGUF": {
    "en": "Invalid GGUF string length",
    "zh": "GGUF 字符串长度无效"
  },
  "[строка {0} байт]": {
    "en": "[string of {0} bytes]",
    "zh": "[长度为 {0} 字节的字符串]"
  },
  "Слишком глубокий вложенный массив": {
    "en": "Nested array is too deep",
    "zh": "数组嵌套过深"
  },
  "Неверная длина массива": {
    "en": "Invalid array length",
    "zh": "数组长度无效"
  },
  "Слишком длинный массив": {
    "en": "Array is too long",
    "zh": "数组过长"
  },
  "Массив массивов GGUF пока не поддерживается": {
    "en": "GGUF arrays of arrays are not yet supported",
    "zh": "尚不支持 GGUF 嵌套数组"
  },
  "Неизвестный тип большого массива GGUF": {
    "en": "Unknown type of large GGUF array",
    "zh": "大型 GGUF 数组的类型未知"
  },
  "Неизвестный тип метаданных GGUF: ": {
    "en": "Unknown GGUF metadata type: ",
    "zh": "未知的 GGUF 元数据类型："
  },
  "Локальная модель": {
    "en": "Local model",
    "zh": "本地模型"
  },
  "Не GGUF: неверная сигнатура": {
    "en": "Not GGUF: invalid signature",
    "zh": "非 GGUF：签名无效"
  },
  "Версия GGUF {0} не поддерживается (ожидается 2 или 3)": {
    "en": "GGUF version {0} is not supported (expected 2 or 3)",
    "zh": "不支持 GGUF 版本 {0}（应为 2 或 3）"
  },
  "Слишком большое число записей заголовка": {
    "en": "Too many header entries",
    "zh": "文件头条目过多"
  },
  "Некорректная размерность тензора": {
    "en": "Invalid tensor rank",
    "zh": "张量阶数无效"
  },
  "Файл SafeTensors слишком короткий": {
    "en": "SafeTensors file is too short",
    "zh": "SafeTensors 文件过短"
  },
  "Некорректная длина заголовка SafeTensors": {
    "en": "Invalid SafeTensors header length",
    "zh": "SafeTensors 文件头长度无效"
  },
  "Не выбраны файлы": {
    "en": "No files selected",
    "zh": "未选择文件"
  },
  "Ожидается объект": {
    "en": "Expected an object",
    "zh": "需要一个对象"
  },
  "config.json не является корректным JSON": {
    "en": "config.json is not valid JSON",
    "zh": "config.json 不是有效的 JSON"
  },
  "{0} файлов SafeTensors": {
    "en": "{0} SafeTensors files",
    "zh": "{0} 个 SafeTensors 文件"
  },
  "Модель из config.json": {
    "en": "Model from config.json",
    "zh": "来自 config.json 的模型"
  },
  "Поддерживаются .gguf, .safetensors и папки с config.json": {
    "en": "Supported: .gguf, .safetensors and folders containing config.json",
    "zh": "支持 .gguf、.safetensors 和包含 config.json 的文件夹"
  },
  "Layer {0}": {
    "en": "Layer {0}",
    "zh": "第 {0} 层"
  },
  "Expert {0}": {
    "en": "Expert {0}",
    "zh": "专家 {0}"
  },
  "Q Head {0}": {
    "en": "Q Head {0}",
    "zh": "Q 头 {0}"
  },
  "KV Head {0}": {
    "en": "KV Head {0}",
    "zh": "KV 头 {0}"
  },
  "Embeddings": {
    "en": "Embeddings",
    "zh": "嵌入层"
  },
  "Attention": {
    "en": "Attention",
    "zh": "注意力"
  },
  "Attention Norm": {
    "en": "Attention Norm",
    "zh": "注意力归一化"
  },
  "FFN Norm": {
    "en": "FFN Norm",
    "zh": "FFN 归一化"
  },
  "Final Norm": {
    "en": "Final Norm",
    "zh": "最终归一化"
  },
  "LM Head": {
    "en": "LM Head",
    "zh": "语言模型输出头"
  },
  "Q heads": {
    "en": "Q heads",
    "zh": "Q 头"
  },
  "KV heads": {
    "en": "KV heads",
    "zh": "KV 头"
  },
  "FFN / MoE": {
    "en": "FFN / MoE",
    "zh": "FFN / MoE"
  },
  "Hidden dim": {
    "en": "Hidden dim",
    "zh": "隐藏维度"
  },
  "Vocab size": {
    "en": "Vocab size",
    "zh": "词表大小"
  },
  "Context": {
    "en": "Context",
    "zh": "上下文"
  },
  "Head dim": {
    "en": "Head dim",
    "zh": "头维度"
  },
  "FFN dim": {
    "en": "FFN dim",
    "zh": "FFN 维度"
  },
  "FFN type": {
    "en": "FFN type",
    "zh": "FFN 类型"
  },
  "Self Attention": {
    "en": "Self Attention",
    "zh": "自注意力"
  },
  "Transformer block": {
    "en": "Transformer block",
    "zh": "Transformer 模块"
  },
  "Feed Forward Network": {
    "en": "Feed Forward Network",
    "zh": "前馈网络"
  },
  "Normalization": {
    "en": "Normalization",
    "zh": "归一化"
  },
  "Expert aggregation": {
    "en": "Expert aggregation",
    "zh": "专家聚合"
  },
  "Router / Gating": {
    "en": "Router / Gating",
    "zh": "路由器 / 门控"
  },
  "Transformer blocks": {
    "en": "Transformer blocks",
    "zh": "Transformer 模块"
  },
  "TRANSFORMER BLOCK": {
    "en": "TRANSFORMER BLOCK",
    "zh": "TRANSFORMER 模块"
  },
  "Token IDs · sequence": {
    "en": "Token IDs · sequence",
    "zh": "词元 ID · 序列"
  }
};
