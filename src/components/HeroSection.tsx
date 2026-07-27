import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { StarryLogo } from "./StarryLogo";

function Reveal({
  delay,
  children,
  className = "",
}: {
  delay: number;
  children: ReactNode;
  className?: string;
}) {
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  return (
    <div className={`hero-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 pb-12 pt-20 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <Reveal delay={0} className="shrink-0">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border bg-bg-alt sm:h-24 sm:w-24">
            <Image
              src="/avatar.jpg"
              alt="Starry 的头像"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </Reveal>

        <div>
          <Reveal delay={100}>
            <p className="mb-2 text-sm font-medium text-text-tertiary">
              Software Engineering Student · Builder · Writer
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              你好，我是 Starry。
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              海南大学软件工程在读，专注 C++ WebAssembly
              底层移植、多智能体系统协同机制与开发者工具。用项目验证想法，用文章沉淀思考。
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["C++", "WebAssembly", "AI Agent", "RAG", "Developer Tools"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-bg-alt px-2.5 py-1 text-xs text-text-secondary"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center bg-text-primary px-5 py-2.5 text-sm font-medium text-text-inverse transition-transform hover:-translate-y-0.5"
              >
                查看项目
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary"
              >
                阅读文章
              </Link>
              <Link
                href="/resume"
                className="px-2 py-2.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                查看简历 →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href="https://github.com/wanghongyu666qiang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                GitHub ↗
              </a>
              <a
                href="mailto:why17573315302@gmail.com"
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                Email
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-16 hidden lg:block">
        <StarryLogo size={200} watermark />
      </div>
    </section>
  );
}
