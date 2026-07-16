"use client";

import { useState, type FormEvent } from "react";

type ButtonState = "idle" | "loading" | "success";

export function SubscribeCard() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ButtonState>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || state !== "idle") return;

    setState("loading");

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    setState("success");

    // Reset after 3s
    setTimeout(() => {
      setState("idle");
      setEmail("");
    }, 3000);
  };

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="border border-border p-6 sm:p-10 text-center">
        <h2 className="text-lg font-semibold text-text-primary">
          保持联系
        </h2>
        <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto">
          订阅我的 Newsletter，获取最新文章和项目动态。不打扰，每月最多一封。
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={state !== "idle"}
            className="flex-1 px-4 py-2.5 text-sm border border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={state !== "idle"}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-text-primary text-text-inverse min-w-[88px]
              disabled:opacity-70 transition-all duration-300 ease-out"
            style={
              state === "success"
                ? {
                    transform: "scale(1.1)",
                    transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }
                : undefined
            }
          >
            {state === "idle" && "订阅"}
            {state === "loading" && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {state === "success" && (
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{
                  animation: "checkBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </form>

        {state === "success" && (
          <p className="mt-3 text-xs text-text-tertiary">
            感谢订阅！我会在下次更新时通知你。
          </p>
        )}
      </div>
    </section>
  );
}
