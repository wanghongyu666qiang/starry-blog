---
title: "多智能体系统聚合机制综述"
description: "梳理 MAS 中的协调模式：从 Free-MAD 到 LLMASC，探索智能体如何讨论、投票与达成共识。"
date: "2026-06-25"
category: "Research"
tags: ["MAS", "LLM", "综述", "论文阅读", "AI研究"]
published: true
---

## 引言

多智能体系统（Multi-Agent System, MAS）近年来随着大语言模型（LLM）的进步获得了新的发展动力。然而，如何让多个智能体有效**协调和聚合**各自的输出，仍然是一个核心挑战。

本文系统梳理了当前主流的聚合机制，涵盖投票、讨论和共识三类范式。

## 背景

### 为什么需要聚合？

单个 LLM 的推理能力有限。通过引入多个智能体，可以实现：

- **多样性视角**：不同智能体从不同角度分析问题
- **错误纠正**：通过交叉验证减少幻觉
- **能力互补**：各智能体专注于不同子任务

聚合机制的核心是在多样性和一致性之间取得平衡：

$$
\text{Quality} = \alpha \cdot \text{Diversity} + (1 - \alpha) \cdot \text{Consistency}
$$

其中 $\alpha \in [0, 1]$ 是权衡因子。

## 聚合机制分类

### 投票机制

投票是最直接的方式。各智能体给出独立答案，通过多数决定最终输出。

> 投票机制的优点是简单高效，但忽略了智能体之间的推理过程。

主要方法：

| 方法 | 特点 | 适用场景 |
|------|------|----------|
| 多数投票 | 简单直接 | 分类任务 |
| 加权投票 | 考虑置信度 | 需要不确定性估计 |
| 排名投票 | 保留更多信息 | 排序任务 |

### 讨论式方法

讨论式方法让智能体相互交流后再做出决策：

1. 各智能体独立生成初始响应
2. 相互阅读对方的输出
3. 基于同行的反馈修正自己的答案
4. 最终聚合修正后的结果

```python
# 示例：智能体讨论流程
def agent_deliberation(agents, question):
    responses = []
    for agent in agents:
        initial = agent.respond(question)
        responses.append(initial)

    refined = []
    for i, agent in enumerate(agents):
        other = [r for j, r in enumerate(responses) if j != i]
        refined.append(agent.refine(question, other))

    return aggregate(refined)
```

## 总结

聚合机制是 MAS 系统的关键组成部分。选择哪种取决于场景：

- 简单分类任务 → **多数投票**
- 复杂推理任务 → **讨论式方法**
- 安全关键场景 → **共识机制**

未来研究将关注自适应聚合策略和人机协作下的聚合优化。
