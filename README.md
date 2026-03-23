# 品牌大脑 (Brand Brain)

基于 WorkfxAI 设计系统的品牌知识库构建应用。支持多模态输入与 Claude 风格的引用修改交互。

## 单文件版本

项目为**单文件 HTML**，无需安装依赖、无需构建。

### 使用方式

**方式一：直接打开**
- 用浏览器打开 `index.html` 即可（需联网加载 CDN）

**方式二：本地服务器**（推荐）
```bash
./run.sh
# 或
python3 -m http.server 3002
```
访问 **http://localhost:3002**

若出现 Internal Server Error，可尝试：
- 换用 `python3 -m http.server 3002`
- 检查 3002 端口是否被占用：`lsof -i :3002`

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
