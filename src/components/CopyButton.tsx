"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2500);
    }
  }

  const label =
    status === "copied" ? "已复制" : status === "error" ? "复制失败" : "复制";

  return (
    <button
      type="button"
      onClick={copy}
      className="absolute right-2 top-2 rounded border border-border bg-bg-alt px-2 py-1 text-xs text-text-tertiary opacity-100 transition-colors hover:text-text-primary sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
      aria-live="polite"
    >
      {label}
    </button>
  );
}
