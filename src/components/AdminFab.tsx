"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 40;
const GAP = 24;

type View = "menu" | "login" | "theme";

const THEMES = [
  { name: "浅色", bg: "#fafafa" },
  { name: "暖黄", bg: "#fefce8" },
  { name: "灰色", bg: "#f4f4f5" },
  { name: "深色", bg: "#18181b" },
];

function getSavedTheme(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("starry-theme");
}

function saveTheme(bg: string) {
  localStorage.setItem("starry-theme", bg);
  document.documentElement.style.setProperty("--theme-bg", bg);
}

export function AdminFab() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    setPos({ x: window.innerWidth - SIZE - GAP, y: window.innerHeight - SIZE - GAP });

    // 恢复保存的主题
    const saved = getSavedTheme();
    if (saved) document.documentElement.style.setProperty("--theme-bg", saved);

    setMounted(true);
  }, []);

  // 外部点击关闭
  useEffect(() => {
    if (!menuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", onMouseDown), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setView("menu");
    setPassword("");
    setError("");
  };

  if (!mounted) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    origin.current = { x: pos.x, y: pos.y };
    start.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved.current = true;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - SIZE, origin.current.x + dx)),
      y: Math.max(0, Math.min(window.innerHeight - SIZE, origin.current.y + dy)),
    });
  };

  const onPointerUp = () => {
    dragging.current = false;
    if (!moved.current) setMenuOpen((prev) => !prev);
  };

  const login = async () => {
    if (!password) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      setError("密码错误");
      setLoading(false);
    }
  };

  const menuAbove = pos.y > 280;

  return (
    <div ref={containerRef}>
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ left: pos.x, top: pos.y }}
        className="fixed z-[99] w-10 h-10 rounded-full bg-text-primary text-text-inverse shadow-lg
          flex items-center justify-center text-sm select-none touch-none
          hover:scale-110 active:scale-95 transition-transform cursor-grab active:cursor-grabbing"
        aria-label="设置"
        title="设置"
      >
        ⚙
      </button>

      {menuOpen && (
        <div
          style={{ left: pos.x + SIZE / 2, top: menuAbove ? pos.y - 8 : pos.y + SIZE + 8 }}
          className="fixed z-[100] -translate-x-1/2 w-40 bg-surface border border-border shadow-lg p-1"
        >
          {/* 主菜单 */}
          {view === "menu" && (
            <div className="py-1">
              <button
                onClick={() => setView("login")}
                className="block w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors"
              >
                登录后台
              </button>
              <button
                onClick={() => setView("theme")}
                className="block w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors"
              >
                背景颜色
              </button>
            </div>
          )}

          {/* 登录 */}
          {view === "login" && (
            <div className="p-2">
              <div className="text-xs text-text-tertiary mb-2">管理员登录</div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") login(); }}
                placeholder="密码"
                autoFocus
                className="w-full px-2 py-1.5 border border-border bg-bg text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-text-primary"
              />
              {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setView("menu")}
                  className="flex-1 py-1 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                >
                  返回
                </button>
                <button
                  onClick={login}
                  disabled={loading || !password}
                  className="flex-1 py-1 text-xs font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors disabled:opacity-50"
                >
                  {loading ? "…" : "登录"}
                </button>
              </div>
            </div>
          )}

          {/* 背景颜色 */}
          {view === "theme" && (
            <div className="p-2">
              <div className="text-xs text-text-tertiary mb-2">选择背景</div>
              <div className="grid grid-cols-2 gap-1.5">
                {THEMES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => { saveTheme(t.bg); closeMenu(); }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:bg-bg-alt transition-colors"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-border shrink-0"
                      style={{ background: t.bg }}
                    />
                    {t.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setView("menu")}
                className="mt-2 w-full py-1 text-xs text-text-tertiary hover:text-text-primary transition-colors"
              >
                返回
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
