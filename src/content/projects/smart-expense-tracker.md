---
title: "智能开支追踪器"
description: "基于 Vue 3 的个人财务管理应用，支持分类管理、预算提醒与数据可视化。"
date: "2026-03-15"
role: "Frontend Developer — 负责 Vue 3 组件架构设计、Pinia 状态管理、Chart.js 可视化集成、CSV 导出功能"
tech_stack: ["Vue 3", "TypeScript", "Chart.js", "Pinia"]
github_url: "https://github.com/wanghongyu666qiang/smart-expense-tracker"
demo_url: null
status: "已完成"
---

## 项目背景

管理个人财务是学生群体中的常见痛点。现有应用要么过于复杂，要么过于简陋。本项目旨在构建一个聚焦的开支追踪器，在易用性与有意义的洞察之间取得平衡。

## 系统架构

基于 Vue 3 Composition API 与 TypeScript 构建，确保类型安全。状态管理使用 Pinia store 配合 localStorage 持久化。Chart.js 提供交互式可视化，包括分类占比和月度趋势图。组件架构遵循清晰的分层：数据层（stores）→ 展示层（components）→ 用户交互（events）。

## 实现细节

应用支持 8 项核心功能：增删改查开支记录、分类管理、月度预算设置、按日期/分类筛选、CSV 数据导出和汇总统计。每项功能均对照项目需求文档进行验证，确保完整性。

## 遇到的挑战

带嵌套分类的响应式状态管理需要精心的 Pinia store 设计。Chart.js 集成需要自定义封装组件以正确处理 Vue 的响应式系统。数据表格在移动端的响应式适配尤其棘手——在小屏幕上，卡片形式比表格更可用。

## 项目反思

Vue 3 的 Composition API 相比我之前使用的 Options API 显著改善了代码组织。项目强化了一个认知：前期良好的状态管理设计可以避免后期大量重构。未来迭代方向包括添加周期性开支追踪和云端同步功能。
