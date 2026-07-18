"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarryLogo } from "@/components/StarryLogo";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/articles", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/timeline", label: "时间线" },
  { href: "/about", label: "关于" },
  { href: "/resume", label: "简历" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-5xl flex items-center justify-between h-14 px-6" aria-label="主导航">
        <Link href="/" className="flex items-center gap-1.5 text-text-primary font-medium tracking-tight" onClick={() => setOpen(false)}>
          <StarryLogo size={28} />
          Starry
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 md:gap-0.5">
          {NAV_ITEMS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative px-2 md:px-3 py-1.5 text-sm transition-colors rounded-md ${
                    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-text-primary rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-1 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg">
          <ul className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                      active
                        ? "bg-bg-alt text-text-primary font-medium"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-alt"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
