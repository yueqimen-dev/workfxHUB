#!/bin/bash
# 本地预览 - 使用 Python 内置服务器（无需安装依赖）
cd "$(dirname "$0")"
echo "👉 访问 http://localhost:3002"
echo "   按 Ctrl+C 停止"
python3 -m http.server 3002
