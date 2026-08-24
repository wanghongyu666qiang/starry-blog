---
title: "AskBridge"
description: "Windows 原生截图问答工具：用全局快捷键截取屏幕内容并准备到 AI 网页输入区，以隐私边界和手动确认发送为核心。"
date: "2026-08-13"
updated: "2026-08-24"
role: "Independent Developer — 负责产品设计、Rust/Win32 客户端、Chrome CDP 自动化、安全边界、安装打包与发布验收"
tech_stack: ["Rust", "Win32", "Chrome DevTools Protocol", "WebView2", "PowerShell", "GitHub Actions"]
github_url: "https://github.com/wanghongyu666qiang/AskBridge"
status: "已完成"
featured: true
---

## 项目背景

在学习和开发过程中，我经常需要把屏幕上的报错、题目或界面交给不同的 AI 工具分析。传统流程要经历截图、保存文件、打开网页、上传图片和输入问题等多个步骤。AskBridge 将这条链路压缩为一个 Windows 全局快捷键，同时保留最终发送前的人工确认。

## 使用体验

- `Alt+Q`：框选截图并显示工具条，可复制截图、切换模型或准备到网页输入区
- `Alt+Shift+Q`：使用默认模型和快速提示词准备截图内容
- `Alt+W`：打开默认模型网页，进行纯文字提问

当前源码支持 ChatGPT、Gemini、Claude、豆包和自定义 HTTPS 供应商。用户可以选择 AskBridge 专用 Chrome、已有桌面网页端或通用粘贴路径，在自动化能力与登录复用之间做取舍。

## 系统架构

项目使用 Rust workspace 组织为三层：

- **askbridge-core**：定义配置、请求模型和不依赖 Win32 的领域约束
- **askbridge-win**：实现托盘程序、截图覆盖层、原生设置界面、浏览器生命周期与供应商适配
- **xtask**：承载发布产物、哈希和性能报告等可测试的工程校验逻辑

自动准备网页时，AskBridge 通过 Chrome DevTools Protocol 维护持久连接与 Target Session，定位可编辑输入区并上传临时截图。页面、附件或目标状态不明确时会停止操作，避免猜测点击或重复写入。

## 隐私与安全边界

AskBridge 不调用模型 API，也不运行本地模型；不会读取密码、Cookie、网页正文或历史对话。日志只记录阶段、耗时和错误类别，不保存问题原文、截图内容或完整聊天 URL。所有请求的 `auto_submit` 固定为 `false`，工具只负责准备内容，最终发送始终由用户决定。

专用 Chrome 使用独立浏览器配置，不连接日常 Chrome 数据。需要临时落盘的截图会保存在 AskBridge 数据目录中，并在操作完成、失败或取消后删除。

## 工程化与发布

项目提供 Windows CI、格式检查、严格 Clippy、workspace 测试、Release 构建、安装包与便携包验证，以及真实 UI/浏览器流程的验收脚本。[AskBridge 1.0.0](https://github.com/wanghongyu666qiang/AskBridge/releases/tag/v1.0.0) 已通过 GitHub Releases 发布，提供 Windows 安装程序、便携 ZIP 与 SHA-256 校验文件，并以 Apache License 2.0 开源；当前 `main` 分支仍在继续迭代，部分新能力会早于下载版本。

## 项目反思

这个项目最难的部分不是“把图片放进网页”，而是在网页结构变化、浏览器状态不确定和多种登录方式并存时仍然保持可解释、可恢复且不误发送。开发过程中，我逐步把“失败时不猜测”和“发送权始终属于用户”落实为跨配置、运行时、打包与验收的系统约束。这让我更深入地理解了 Windows 原生开发、浏览器自动化与安全边界设计之间的关系。
