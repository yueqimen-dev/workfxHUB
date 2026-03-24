# 推送到 GitHub

本地已提交。在终端执行以下命令完成推送：

## 1. 在 GitHub 创建新仓库

- 打开 https://github.com/new
- 仓库名填 `workfxHUB`（或自选）
- 不要勾选「Add a README」
- 点击 Create repository

## 2. 关联并推送

把 `YOUR_USERNAME` 换成你的 GitHub 用户名：

```bash
cd /Users/mira/Desktop/workfxHUB-main

git remote add origin https://github.com/YOUR_USERNAME/workfxHUB.git

git push -u origin main
```

若仓库名不是 `workfxHUB`，请把上面命令里的 `workfxHUB` 改成你的仓库名。
