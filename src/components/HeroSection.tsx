"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarryLogo } from "@/components/StarryLogo";

const spring = "cubic-bezier(0.16, 1, 0.3, 1)";
const dur = "800ms";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t1);
  }, []);

  const fadeIn = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
    transition: `opacity ${dur} ${spring}, transform ${dur} ${spring}`,
    transitionDelay: `${delay}ms`,
  });

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-24 relative">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
        {/* Avatar */}
        <div className="shrink-0" style={fadeIn(0)}>
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
            className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl"
            style={fadeIn(100)}
          >
            你好，我是 Starry。
          </h1>

          {/* Sub-headline */}
          <p
            className="mt-4 text-lg text-text-secondary leading-relaxed max-w-xl"
            style={fadeIn(200)}
          >
            Software Engineering Student
          </p>
          <p
            className="mt-1 text-base text-text-secondary leading-relaxed max-w-xl"
            style={fadeIn(280)}
          >
            海南大学软件工程在读。专注于 C++ WebAssembly
            底层移植与多智能体系统（MAS）协同机制。相信好的软件始于清晰的思考与优雅的工程实践。
          </p>

          {/* Focus tags */}
          <div className="mt-5 flex flex-wrap gap-1.5" style={fadeIn(380)}>
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

          {/* Contact */}
          <div className="mt-6" style={fadeIn(480)}>
            <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              {/* GitHub */}
              <a
                href="https://github.com/wanghongyu666qiang"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-text-primary hover:opacity-80 transition-opacity duration-200 w-fit"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                github.com/wanghongyu666qiang
              </a>

              {/* Email */}
              <a
                href="mailto:why17573315302@gmail.com"
                className="group inline-flex items-center gap-2 text-sm text-text-primary hover:opacity-80 transition-opacity duration-200 w-fit"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                why17573315302@gmail.com
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex items-center gap-4" style={fadeIn(600)}>
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

      {/* Watermark logo */}
      <div className="hidden lg:block absolute right-6 top-16 pointer-events-none">
        <StarryLogo size={200} watermark />
      </div>
    </section>
  );
}
