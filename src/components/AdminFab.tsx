"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SIZE_DESKTOP = 40;
const SIZE_MOBILE = 44;
const GAP = 24;
const DRAG_THRESHOLD = 5;

type View = "menu" | "login" | "theme";

const THEMES = [
  { name: "星空", key: "starry", bg: "#0B1020" },
  { name: "浅色", key: "light", bg: "#fafafa" },
  { name: "暖黄", key: "warm", bg: "#fefce8" },
  { name: "灰色", key: "gray", bg: "#f4f4f5" },
  { name: "深色", key: "dark", bg: "#18181b" },
] as const;

const STORAGE_THEME = "starry-theme";
const STORAGE_POS = "starry-fab-pos";

// ── helpers ──

function applyTheme(key: string) {
  document.documentElement.setAttribute("data-theme", key);
  localStorage.setItem(STORAGE_THEME, key);
}

function getSize(): number {
  return window.innerWidth < 640 ? SIZE_MOBILE : SIZE_DESKTOP;
}

function defaultPos(size: number) {
  return { x: window.innerWidth - size - GAP, y: window.innerHeight - size - GAP };
}

function loadPos(size: number): { x: number; y: number } {
  try {
    const raw = localStorage.getItem(STORAGE_POS);
    if (raw) {
      const p = JSON.parse(raw);
      if (typeof p.x === "number" && typeof p.y === "number") return p;
    }
  } catch {}
  return defaultPos(size);
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
  const [currentTheme, setCurrentTheme] = useState("warm");
  const [size, setSize] = useState(SIZE_DESKTOP);

  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const dragOrigin = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  // ── init ──
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;

    const s = getSize();
    setSize(s);
    const p = loadPos(s);
    setPos(p);

    const theme = localStorage.getItem(STORAGE_THEME) || "warm";
    setCurrentTheme(theme);

    const onResize = () => {
      const ns = getSize();
      setSize(ns);
      setPos((prev) => ({
        x: Math.min(prev.x, window.innerWidth - ns),
        y: Math.min(prev.y, window.innerHeight - ns),
      }));
    };
    window.addEventListener("resize", onResize);
    setMounted(true);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── ESC to close ──
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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

  // ── drag & click (ref-based for zero-lag) ──
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;

    // read current DOM position (may differ from pos state during render)
    const el = btnRef.current;
    if (el) {
      dragOrigin.current = {
        x: parseFloat(el.style.left) || pos.x,
        y: parseFloat(el.style.top) || pos.y,
      };
    } else {
      dragOrigin.current = { x: pos.x, y: pos.y };
    }
    dragStart.current = { x: e.clientX, y: e.clientY };

    // capture pointer so we get events even outside the button
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      moved.current = true;
    }
    const x = Math.max(0, Math.min(window.innerWidth - size, dragOrigin.current.x + dx));
    const y = Math.max(0, Math.min(window.innerHeight - size, dragOrigin.current.y + dy));
    // direct DOM for zero lag
    if (btnRef.current) {
      btnRef.current.style.left = x + "px";
      btnRef.current.style.top = y + "px";
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if (!moved.current) {
      setMenuOpen((prev) => !prev);
    } else {
      // compute final position from refs (never stale)
      const x = Math.max(
        0,
        Math.min(
          window.innerWidth - size,
          dragOrigin.current.x + (e.clientX - dragStart.current.x)
        )
      );
      const y = Math.max(
        0,
        Math.min(
          window.innerHeight - size,
          dragOrigin.current.y + (e.clientY - dragStart.current.y)
        )
      );
      setPos({ x, y });
      localStorage.setItem(STORAGE_POS, JSON.stringify({ x, y }));
    }
  };

  const onPointerLeave = () => {
    // only clean up drag state — do NOT toggle menu
    if (dragging.current) {
      // keep dragging = true to allow re-entry (pointercapture handles it)
    }
    // no-op for click case: pointerLeave should not affect menu
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

  if (!mounted) return null;

  // ── menu positioning ──
  const menuWidth = 160;
  const menuAbove = pos.y > 240;
  const menuCenter = Math.max(
    menuWidth / 2 + 8,
    Math.min(window.innerWidth - menuWidth / 2 - 8, pos.x + size / 2)
  );

  return (
    <div ref={containerRef}>
      <button
        ref={btnRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
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
          {view === "menu" && (
            <div className="py-1">
              <button onClick={() => setView("login")} className="block w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors">
                登录后台
              </button>
              <button onClick={() => setView("theme")} className="block w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors">
                背景颜色
              </button>
            </div>
          )}

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
                <button onClick={() => setView("menu")} className="flex-1 py-1 text-xs text-text-tertiary hover:text-text-primary transition-colors">
                  返回
                </button>
                <button onClick={login} disabled={loading || !password} className="flex-1 py-1 text-xs font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors disabled:opacity-50">
                  {loading ? "…" : "登录"}
                </button>
              </div>
            </div>
          )}

          {view === "theme" && (
            <div className="p-2">
              <div className="text-xs text-text-tertiary mb-2">选择背景</div>
              <div className="grid grid-cols-1 gap-0.5">
                {THEMES.map((t) => (
                  <button key={t.key} onClick={() => onThemeChange(t.key)} className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-secondary hover:bg-bg-alt transition-colors rounded">
                    <span
                      className="w-4 h-4 rounded-full border-2 shrink-0 transition-colors"
                      style={{
                        background: t.bg,
                        borderColor: currentTheme === t.key ? "var(--color-text-primary)" : "var(--color-border)",
                      }}
                    />
                    <span className="flex-1 text-left">{t.name}</span>
                    {currentTheme === t.key && (
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="text-text-primary shrink-0">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <button onClick={() => setView("menu")} className="mt-2 w-full py-1 text-xs text-text-tertiary hover:text-text-primary transition-colors">
                返回
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
