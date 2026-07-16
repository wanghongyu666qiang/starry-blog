"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface HeroSectionProps {
  zhiXue: Project | undefined;
}

export function HeroSection({ zhiXue }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Staggered fade-in
    const t1 = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t1);
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
        {/* Avatar */}
        <div
          className="shrink-0 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "0ms",
          }}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border bg-bg-alt">
            <Image
              src="/avatar.jpg"
              alt="Starry"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Text */}
        <div>
          {/* Title */}
          <h1
            className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "100ms",
            }}
          >
            你好，我是 Starry。
          </h1>

          {/* Sub-headline */}
          <p
            className="mt-4 text-lg text-text-secondary leading-relaxed max-w-xl transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "200ms",
            }}
          >
            Software Engineering Student
          </p>
          <p
            className="mt-1 text-base text-text-secondary leading-relaxed max-w-xl transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "250ms",
            }}
          >
            海南大学软件工程在读。专注于 C++ WebAssembly
            底层移植与多智能体系统（MAS）协同机制。相信好的软件始于清晰的思考与优雅的工程实践。
          </p>

          {/* Focus tags */}
          <div
            className="mt-5 flex flex-wrap gap-1.5 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "350ms",
            }}
          >
            {["AI Agent", "RAG", "WebAssembly", "Developer Tools"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-1 text-xs text-text-secondary bg-bg-alt border border-border"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Currently building */}
          {zhiXue && (
            <div
              className="mt-6 p-4 border border-border bg-bg-alt max-w-lg transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transitionDelay: "450ms",
              }}
            >
              <p className="text-xs text-text-tertiary uppercase tracking-wider">
                Currently Building
              </p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {zhiXue.title}
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                {zhiXue.description}
              </p>
              <Link
                href={`/projects/${zhiXue.slug}`}
                className="inline-block mt-2 text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                查看项目 &rarr;
              </Link>
            </div>
          )}

          {/* Currently learning */}
          <div
            className="mt-4 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "550ms",
            }}
          >
            <p className="text-xs text-text-tertiary uppercase tracking-wider">
              Currently Learning
            </p>
            <p className="text-sm text-text-secondary">
              LLM Agent Architecture
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="mt-6 flex items-center gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "650ms",
            }}
          >
            {/* Primary: magnetic lift + slow glow */}
            <Link
              href="/articles"
              className="group relative inline-flex items-center px-5 py-2.5 text-sm font-medium bg-text-primary text-text-inverse hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out overflow-hidden"
            >
              {/* Slow border glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-[-2px] bg-[conic-gradient(from_0deg,transparent_60%,rgba(250,250,250,0.3)_80%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
              </span>
              <span className="relative z-10">阅读文章</span>
            </Link>

            {/* Secondary: background slide from left */}
            <Link
              href="/projects"
              className="group relative inline-flex items-center px-5 py-2.5 text-sm font-medium border border-border text-text-primary transition-all duration-300 ease-out overflow-hidden"
            >
              <span className="absolute inset-0 bg-text-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              <span className="relative z-10 group-hover:text-text-inverse transition-colors duration-300">
                查看项目
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
