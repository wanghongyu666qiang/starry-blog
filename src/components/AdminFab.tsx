"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SIZE_DESKTOP = 40;
const SIZE_MOBILE = 44;
const GAP = 24;
const DRAG_THRESHOLD = 5;

type View = "menu" | "login" | "theme";

const THEMES = [
  { name: "浅色", key: "light", bg: "#fafafa" },
  { name: "暖黄", key: "warm", bg: "#fefce8" },
  { name: "灰色", key: "gray", bg: "#f4f4f5" },
  { name: "深色", key: "dark", bg: "#18181b" },
] as const;

const STORAGE_THEME = "starry-theme";
const STORAGE_POS = "starry-fab-pos";

// ── helpers ──

function getStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function setStored(key: string, val: string) {
  localStorage.setItem(key, val);
}

function applyTheme(key: string) {
  document.documentElement.setAttribute("data-theme", key);
  setStored(STORAGE_THEME, key);
}

function getSavedTheme(): string {
  return getStored(STORAGE_THEME) || "light";
}

function getSavedPos(size: number): { x: number; y: number } {
  const raw = getStored(STORAGE_POS);
  if (raw) {
    try {
      const p = JSON.parse(raw);
      if (typeof p.x === "number" && typeof p.y === "number") return p;
    } catch {}
  }
  return { x: window.innerWidth - size - GAP, y: window.innerHeight - size - GAP };
}

function getSize(): number {
  return window.innerWidth < 640 ? SIZE_MOBILE : SIZE_DESKTOP;
}

// ── component ──

export function AdminFab() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [size, setSizeState] = useState(SIZE_DESKTOP);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  // ── init ──
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;

    const s = getSize();
    setSizeState(s);
    setPos(getSavedPos(s));

    const theme = getSavedTheme();
    applyTheme(theme);
    setCurrentTheme(theme);

    const onResize = () => {
      const ns = getSize();
      setSizeState(ns);
      // keep within bounds
      setPos((prev) => ({
        x: Math.min(prev.x, window.innerWidth - ns),
        y: Math.min(prev.y, window.innerHeight - ns),
      }));
    };
    window.addEventListener("resize", onResize);

    setMounted(true);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── external click to close ──
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

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setView("menu");
    setPassword("");
    setError("");
  }, []);

  // ── drag & click ──
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
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      moved.current = true;
    }
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - size, origin.current.x + dx)),
      y: Math.max(0, Math.min(window.innerHeight - size, origin.current.y + dy)),
    });
  };

  const onPointerUp = () => {
    dragging.current = false;
    if (!moved.current) {
      setMenuOpen((prev) => !prev);
    } else {
      // persist position
      setStored(STORAGE_POS, JSON.stringify(pos));
    }
  };

  // ── login ──
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

  // ── theme ──
  const onThemeChange = (key: string) => {
    applyTheme(key);
    setCurrentTheme(key);
    closeMenu();
  };

  // ── menu positioning ──
  const menuWidth = 160;
  const menuAbove = pos.y > 240;

  if (!mounted) return null;

  // clamp center so the 160px-wide menu stays inside viewport
  const menuCenter = Math.max(
    menuWidth / 2 + 8,
    Math.min(window.innerWidth - menuWidth / 2 - 8, pos.x + size / 2)
  );

  return (
    <div ref={containerRef}>
      {/* FAB button */}
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ left: pos.x, top: pos.y, width: size, height: size }}
        className="fixed z-[99] rounded-full bg-text-primary text-text-inverse shadow-lg
          flex items-center justify-center text-sm select-none touch-none
          hover:scale-110 active:scale-95 transition-transform cursor-grab active:cursor-grabbing"
        aria-label="设置"
        title="设置"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Menu */}
      {menuOpen && (
        <div
          style={{
            left: menuCenter,
            top: menuAbove ? pos.y - 8 : pos.y + size + 8,
            transform: `translateX(-50%) ${menuAbove ? "translateY(-100%)" : ""}`,
          }}
          className="fixed z-[100] w-40 bg-surface border border-border shadow-lg p-1"
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
              <div className="grid grid-cols-1 gap-0.5">
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => onThemeChange(t.key)}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-secondary hover:bg-bg-alt transition-colors rounded"
                  >
                    <span
                      className="w-4 h-4 rounded-full border-2 shrink-0 transition-colors"
                      style={{
                        background: t.bg,
                        borderColor:
                          currentTheme === t.key ? "var(--color-text-primary)" : "var(--color-border)",
                      }}
                    />
                    <span className="flex-1 text-left">{t.name}</span>
                    {currentTheme === t.key && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-text-primary shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
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
