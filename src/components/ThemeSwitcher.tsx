"use client";

import { useEffect, useRef } from "react";

const THEMES = [
  { value: "warm", label: "暖色" },
  { value: "starry", label: "星空" },
  { value: "light", label: "浅色" },
  { value: "gray", label: "灰色" },
  { value: "dark", label: "深色" },
] as const;

type Theme = (typeof THEMES)[number]["value"];

export function ThemeSwitcher() {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    if (current && THEMES.some((item) => item.value === current)) {
      if (selectRef.current) {
        selectRef.current.value = current;
      }
    }
  }, []);

  function updateTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("starry-theme", nextTheme);
  }

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">选择主题</span>
      <select
        ref={selectRef}
        defaultValue="warm"
        onChange={(event) => updateTheme(event.target.value as Theme)}
        className="rounded-md border border-border bg-bg px-2 py-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
        aria-label="选择网站主题"
      >
        {THEMES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
