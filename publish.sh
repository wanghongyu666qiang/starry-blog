#!/bin/bash
# 校验并提交内容。推送目标由当前分支决定，不直接写 main。
# 用法：./publish.sh "新增文章：标题"

cd "$(dirname "$0")"
npm run content:validate || exit 1
git add src/content/
git commit -m "${1:-更新内容}"
git push
echo "✓ 内容已推送，请检查对应的 Vercel Preview。"
