#!/bin/bash
# 本地预览 - 使用 Python 内置服务器（无需安装依赖）
cd "$(dirname "$0")" || exit 1
PORT="${1:-3002}"
echo "👉 目录: $(pwd)"
echo "👉 访问 http://127.0.0.1:${PORT}/  （若 localhost 异常请用 127.0.0.1）"
echo "   按 Ctrl+C 停止"
exec python3 -m http.server "${PORT}" --bind 127.0.0.1
