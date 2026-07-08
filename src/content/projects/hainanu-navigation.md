---
title: "海南大学导航系统"
description: "覆盖三个校区的校园导航系统，基于稀疏图的双图架构，C++ 实现并通过 WebAssembly 部署至浏览器。"
date: "2026-06-17"
tech_stack: ["C++", "WebAssembly", "图算法", "HTML/CSS", "Emscripten"]
github_url: "https://github.com/wanghongyu666qiang/The_navigation_of_hainanu_web"
demo_url: "https://wanghongyu666qiang.github.io/The_navigation_of_hainanu_web/"
status: "已完成"
---

## 项目背景

海南大学横跨海甸、观澜湖、儋州三个校区，各自拥有独立的路网和兴趣点。师生和访客常常难以找到最优路径，尤其是在需要经过多个地点的情况下。本项目是数据结构课程的结课设计，将图论与实用软件工程相结合。

## 系统架构

系统采用双图架构：一张图用于车辆路线（可通车的道路），另一张用于行人路线（包括校园步道的所有路径）。C++ 后端使用优先队列优化的 Dijkstra 算法，前端通过 HTML Canvas 渲染结果。整个 C++ 代码库通过 Emscripten 编译为 WebAssembly，在浏览器中实现接近原生的性能。

## 实现细节

关键技术决策包括：使用稀疏图表示（每校区约 20 个节点、50 条边）优化内存占用；DFS + 哈希表实现必经点筛选以支持多点路径规划；将红绿灯统计数据整合到边权重中，提供更真实的行程时间估算。WASM 模块通过一层薄 C 兼容 API 与 JavaScript 前端通信。

## 遇到的挑战

最大的挑战是 C++ 到 WebAssembly 的编译流水线。跨边界的内存管理需要精心设计——C++ 中的堆分配需要从 JavaScript 显式释放。浏览器兼容性测试揭示了 Chrome 与 Firefox 之间 Canvas 渲染的细微差异，需要 polyfill 处理。双图在跨校区路线中的同步问题也相当棘手。

## 项目反思

这个项目教会我算法课的知识可以直接转化为实际应用。双图抽象源于实际约束而非理论优美性，而 WebAssembly 带来的性能提升是可量化的（路径计算比纯 JS 快约 3 倍）。如果重来一次，我会在 WASM 边界层投入更多自动化测试。
