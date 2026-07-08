"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 40;
const GAP = 24;

const MENU_ITEMS = [
  { href: "/admin/dashboard", label: "仪表盘" },
  { href: "/admin/posts", label: "文章管理" },
  { href: "/admin/projects", label: "项目管理" },
  { href: "/admin/timeline", label: "时间线" },
  { href: "/admin/settings", label: "设置" },
];

export function AdminFab() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetHref, setTargetHref] = useState("");

  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    setPos({ x: window.innerWidth - SIZE - GAP, y: window.innerHeight - SIZE - GAP });
    setMounted(true);

    // 点击外部关闭菜单
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

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
    if (!moved.current) setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (href: string) => {
    setTargetHref(href);
    setPassword("");
    setError("");
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
      window.location.href = targetHref || "/admin/dashboard";
    } else {
      setError("密码错误");
      setLoading(false);
    }
  };

  // 菜单定位：优先显示在按钮上方，空间不够时显示在下方
  const menuAbove = pos.y > 220;

  return (
    <>
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ left: pos.x, top: pos.y }}
        className="fixed z-[99] w-10 h-10 rounded-full bg-text-primary text-text-inverse shadow-lg
          flex items-center justify-center text-sm select-none touch-none
          hover:scale-110 active:scale-95 transition-transform cursor-grab active:cursor-grabbing"
        aria-label="管理后台"
        title="管理后台"
      >
        ⚙
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          style={{ left: pos.x + SIZE / 2, top: menuAbove ? pos.y - 8 : pos.y + SIZE + 8 }}
          className="fixed z-[100] -translate-x-1/2 w-44 bg-surface border border-border shadow-lg p-1"
        >
          {/* 未选目标：显示菜单项 */}
          {!targetHref && (
            <div className="py-1">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* 选了目标：显示登录表单 */}
          {targetHref && (
            <div className="p-2">
              <div className="text-xs text-text-tertiary mb-2">
                登录以访问
              </div>
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
                  onClick={() => setTargetHref("")}
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
        </div>
      )}
    </>
  );
}
