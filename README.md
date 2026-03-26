# 品牌大脑 (Brand Brain)

基于 WorkfxAI 设计系统的品牌知识库构建应用。支持多模态输入与 Claude 风格的引用修改交互。

## 单文件版本

项目为**单文件 HTML**，无需安装依赖、无需构建。

### 使用方式

**方式一：直接打开**
- 用浏览器打开 `index.html` 即可（需联网加载 CDN）

**方式二：本地服务器**（推荐）
```bash
cd /path/to/workfxHUB-main
./run.sh
# 指定端口：./run.sh 8080
# 或手动：
python3 -m http.server 3002 --bind 127.0.0.1
```
在浏览器打开 **http://127.0.0.1:3002/**（务必在项目根目录执行，且路径以 `/` 结尾更稳）

若出现 **Internal Server Error**，常见原因与处理：

1. **没在项目根目录启动** — 终端先 `cd` 到包含 `index.html` 的目录再运行 `./run.sh`。
2. **用 `localhost` 异常** — 改用 **http://127.0.0.1:3002/** 。
3. **端口被占用** — 换端口：`./run.sh 8080` 或 `lsof -i :3002` 查看占用。
4. **不依赖本地服务** — 可直接用浏览器打开项目里的 `index.html`（需联网加载 CDN）。

仍失败时可在项目目录试：`python3 -m http.server 0 --bind 127.0.0.1`，终端会打印实际端口号。

### 五态交互

| 状态 | 说明 |
|------|------|
| **Empty** | 首次进入，展示六大维度与多模态输入引导 |
| **Inputting** | 信息录入，展示已接收内容，支持继续添加 + 立即解析 |
| **Processing** | 解析中，动态文案缓解等待焦虑 |
| **Chat + Canvas** | 左右分屏：左侧对话，右侧品牌档案，支持选中引用修改 |
| **Saved Preview** | 保存后只读预览，可点击编辑回退到 Chat+Canvas |

### 依赖

通过 CDN 加载，需联网：
- React 17
- Babel Standalone
- Tailwind CSS
