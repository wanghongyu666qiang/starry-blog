"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarryLogo } from "./StarryLogo";
import { ThemeSwitcher } from "./ThemeSwitcher";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/articles", label: "文章" },
  { href: "/about", label: "关于" },
  { href: "/resume", label: "简历" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-6"
        aria-label="主导航"
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 font-medium tracking-tight text-text-primary"
        >
          <StarryLogo size={28} />
          Starry
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-text-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            ref={buttonRef}
            type="button"
            className="-mr-1 p-2 text-text-secondary transition-colors hover:text-text-primary"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          className="border-t border-border bg-bg md:hidden"
        >
          <ul className="space-y-1 px-4 py-3">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-bg-alt font-medium text-text-primary"
                        : "text-text-secondary hover:bg-bg-alt hover:text-text-primary"
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
