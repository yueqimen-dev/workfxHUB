# 品牌大脑 (Brand Brain)

基于 WorkfxAI 设计系统的品牌知识库构建应用。支持多模态输入与 Claude 风格的引用修改交互。

## 技术栈

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **WorkfxAI 设计系统**（黑白灰主色调、Manrope/Inter 字体）

## 五态交互

| 状态 | 说明 |
|------|------|
| **Empty** | 首次进入，展示六大维度与多模态输入引导 |
| **Inputting** | 信息录入，展示已接收内容，支持继续添加 + 立即解析 |
| **Processing** | 解析中，动态文案缓解等待焦虑 |
| **Chat + Canvas** | 左右分屏：左侧对话，右侧品牌档案，支持选中引用修改 |
| **Saved Preview** | 保存后只读预览，可点击编辑回退到 Chat+Canvas |

## 本地运行

```bash
npm install

# 方式一：生产模式（推荐，更稳定）
npm run build && npm run start

# 方式二：开发模式
npm run dev
```

访问 **http://localhost:3002**

> 若遇端口占用，先结束其他进程：`lsof -i :3002` 查看后 `kill <PID>`

## 项目结构

```
src/
├── app/
│   ├── globals.css      # WorkfxAI 设计令牌
│   ├── layout.tsx
│   └── page.tsx         # 品牌大脑主页面
├── components/
│   ├── brand-brain/     # 五态组件
│   └── ui/              # 基础组件
└── lib/
    └── brand-brain-state.ts
```
