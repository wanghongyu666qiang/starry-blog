---
title: "智学 (ZhiXue)"
description: "Obsidian AI 知识助手。支持本地 Ollama 与云端 SiliconFlow 大模型，结合 RAG 图算法挖掘个人笔记，打造真正理解你知识库的 AI 助手。"
date: "2026-07-01"
role: "Full-stack Developer — 负责 Obsidian 插件前端（TypeScript）开发、Python/FastAPI 后端搭建、RAG 系统集成与模型适配"
tech_stack: ["TypeScript", "Python", "FastAPI", "LightRAG", "Ollama", "Obsidian Plugin"]
github_url: "https://github.com/wanghongyu666qiang/---obsidian-rag-"
demo_url: null
status: "已完成"
---

## 项目背景

Obsidian 是我日常使用的知识管理工具，但笔记多了之后，检索和关联变得困难。传统的全文搜索只能匹配关键词，无法理解语义关联。我希望构建一个能真正"理解"我笔记内容的 AI 助手——不是简单的聊天机器人，而是能基于我的个人知识库进行推理和回答。

## 系统架构

采用前后端分离架构：

- **前端**：Obsidian 插件（TypeScript），通过侧边栏提供对话界面，支持 Markdown 渲染和代码高亮
- **后端**：Python + FastAPI，封装 RAG 引擎，提供 RESTful API
- **RAG 引擎**：LightRAG 图算法，将笔记内容构建为知识图谱，支持多跳推理
- **模型层**：同时支持本地 Ollama 模型（隐私优先）和云端 SiliconFlow 模型（性能优先），可灵活切换

## 实现细节

1. **Obsidian 插件开发**：使用 Obsidian Plugin API，实现了侧边栏视图、设置面板、API Key 管理
2. **RAG 管道**：笔记 → 文档切分 → LightRAG 图谱构建 → 向量检索 + 图遍历 → 上下文组装 → LLM 生成
3. **模型适配层**：统一的 LLM 接口抽象，支持 Ollama 和 SiliconFlow 无缝切换
4. **异步通信**：插件通过 HTTP 与后端通信，支持流式响应

## 遇到的挑战

- LightRAG 的图构建对中文文本的分词和实体识别需要额外调优
- Obsidian 插件的沙箱环境限制了部分 Node.js API 的使用
- 本地 Ollama 模型的推理速度与精度的平衡需要反复测试

## 项目反思

这个项目让我深入理解了 RAG 系统的全链路——从文档处理、知识图谱构建到 LLM 生成。最大的收获是：一个好的 AI 助手不是靠更大的模型，而是靠更好的知识组织方式。未来计划加入多模态支持（图片、PDF）和更智能的知识图谱更新机制。
