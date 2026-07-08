"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 40;
const GAP = 24;

export function AdminFab() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    setPos({ x: window.innerWidth - SIZE - GAP, y: window.innerHeight - SIZE - GAP });
    setMounted(true);
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
    if (!moved.current) setShowModal(true);
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

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-6"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="w-full max-w-xs bg-surface border border-border p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-medium text-text-primary mb-4">管理后台</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") login(); }}
              placeholder="请输入密码"
              autoFocus
              className="w-full px-3 py-2 border border-border bg-bg text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-text-primary transition-colors"
            />
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 text-sm text-text-tertiary hover:text-text-primary transition-colors"
              >
                取消
              </button>
              <button
                onClick={login}
                disabled={loading || !password}
                className="flex-1 py-2 text-sm font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors disabled:opacity-50"
              >
                {loading ? "…" : "登录"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
