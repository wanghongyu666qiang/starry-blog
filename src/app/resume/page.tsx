import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";

export const metadata: Metadata = {
  title: "简历",
  description: "在线简历 — 教育背景、项目经历、技能。",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      <BackButton href="/" label="返回首页" />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">简历</h1>

      {/* Education */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
          教育背景
        </h2>
        <div className="mt-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-medium text-text-primary">海南大学</h3>
            <span className="text-sm text-text-tertiary">2025 &ndash; 2029</span>
          </div>
          <p className="text-sm text-text-secondary">软件工程 本科</p>
          <p className="mt-1 text-sm text-text-tertiary">海甸校区，海口</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
          项目经历
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-text-primary">
                海南大学导航系统
              </h3>
              <span className="text-sm text-text-tertiary">2026</span>
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              覆盖三个校区的校园导航系统，采用双图架构。C++ 后端通过 Emscripten 编译为
              WebAssembly，使用 Dijkstra 算法、DFS 必经点筛选，并将红绿灯统计数据
              整合到边权重中。
            </p>
            <p className="mt-1 text-xs text-text-tertiary">
              C++ &middot; WebAssembly &middot; 图算法 &middot; Emscripten
            </p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-text-primary">智能开支追踪器</h3>
              <span className="text-sm text-text-tertiary">2026</span>
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              Vue 3 个人财务应用，支持分类管理、预算提醒与交互式数据可视化。
              8 项核心功能对照项目需求文档验证。
            </p>
            <p className="mt-1 text-xs text-text-tertiary">
              Vue 3 &middot; TypeScript &middot; Chart.js &middot; Pinia
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
          技能
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium text-text-secondary">编程语言</h3>
            <p className="mt-1 text-sm text-text-tertiary">C/C++、TypeScript、JavaScript、Python</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">前端</h3>
            <p className="mt-1 text-sm text-text-tertiary">Vue 3、React、Next.js、Tailwind CSS</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">工具</h3>
            <p className="mt-1 text-sm text-text-tertiary">Git、Linux、VS Code、Supabase</p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
          获奖情况
        </h2>
        <p className="mt-4 text-sm text-text-tertiary">
          获奖情况将在获得后更新于此。
        </p>
      </section>

      {/* Experience */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
          实习经历
        </h2>
        <p className="mt-4 text-sm text-text-tertiary">
          实习经历将在获得后更新于此。
        </p>
      </section>
    </div>
  );
}
