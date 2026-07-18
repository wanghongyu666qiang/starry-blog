import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";

export const metadata: Metadata = {
  title: "关于",
  description: "海南大学软件工程专业在读，基于海口。构建软件、阅读论文、撰写技术文章。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24">
      <BackButton href="/" label="返回首页" />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">关于</h1>

      {/* Introduction */}
      <section className="mt-12">
        <p className="text-text-secondary leading-relaxed">
          我是海南大学软件工程专业的学生，现居海口。
          我构建软件、阅读论文、写技术文章来记录所学。
        </p>
        <p className="mt-4 text-text-secondary leading-relaxed">
          我的兴趣涵盖从 C++ 底层系统编程到 TypeScript 和 Vue 现代 Web 开发。
          我特别着迷于图算法、多智能体系统，以及理论计算机科学与实用软件工程的交叉领域。
        </p>
      </section>

      {/* Development Philosophy */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold text-text-primary">我的开发理念</h2>
        <div className="mt-4 space-y-3">
          <p className="text-text-secondary leading-relaxed">
            我喜欢构建能够真正解决问题的软件，而不是堆叠技术。
          </p>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-start gap-3">
              <span className="text-text-tertiary shrink-0 mt-0.5">01</span>
              <p><span className="font-medium text-text-primary">为什么需要它？</span> — 从真实痛点出发，而非为了用某个技术而创造需求。</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-text-tertiary shrink-0 mt-0.5">02</span>
              <p><span className="font-medium text-text-primary">用户为什么使用它？</span> — 关注体验，让工具真正融入工作流，而非增加负担。</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-text-tertiary shrink-0 mt-0.5">03</span>
              <p><span className="font-medium text-text-primary">系统如何长期维护？</span> — 写清晰的代码、做好文档，对未来的自己和其他开发者友好。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold text-text-primary">教育</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-text-primary font-medium">海南大学</h3>
            <p className="text-sm text-text-secondary">软件工程 本科，2025 &ndash; 2029</p>
            <p className="mt-1 text-sm text-text-tertiary">海甸校区，海口</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold text-text-primary">技能</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-text-secondary">编程语言</h3>
            <p className="mt-1.5 text-sm text-text-tertiary">
              C/C++、TypeScript、JavaScript、Python、HTML/CSS
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">框架</h3>
            <p className="mt-1.5 text-sm text-text-tertiary">
              Vue 3、React、Next.js、Emscripten
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">工具</h3>
            <p className="mt-1.5 text-sm text-text-tertiary">
              Git、Linux、VS Code、Obsidian、Supabase
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">领域</h3>
            <p className="mt-1.5 text-sm text-text-tertiary">
              数据结构、图算法、WebAssembly、多智能体系统
            </p>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold text-text-primary">兴趣</h2>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          算法设计、系统编程、AI 智能体协作、开发者工具和技术写作。
          计算机之外，我喜欢阅读和探索海口的美食。
        </p>
      </section>

      {/* Contact */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold text-text-primary">联系方式</h2>
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="text-text-tertiary">GitHub：</span>
            <a
              href="https://github.com/wanghongyu666qiang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              @wanghongyu666qiang
            </a>
          </p>
          <p>
            <span className="text-text-tertiary">邮箱：</span>
            <a
              href="mailto:why17573315302@gmail.com"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              why17573315302@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
