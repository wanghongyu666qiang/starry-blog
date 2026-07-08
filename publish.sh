#!/bin/bash
# 一键发布新内容到博客
# 用法：在 blog 目录下运行 ./publish.sh "更新内容描述"

cd "$(dirname "$0")"
git add content/
git commit -m "${1:-更新内容}"
echo "推送中..."
HTTP_PROXY= HTTPS_PROXY= http_proxy= https_proxy= git push origin main
echo "✓ 发布成功！1-2 分钟后网站自动更新。"
