"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 40;
const GAP = 24;

export function AdminFab() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  useEffect(() => {
    // 在 admin 页面不显示
    if (window.location.pathname.startsWith("/admin")) return;

    setPos({
      x: window.innerWidth - SIZE - GAP,
      y: window.innerHeight - SIZE - GAP,
    });
    setVisible(true);

    const onResize = () => {
      setPos((prev) => ({
        x: Math.min(prev.x, window.innerWidth - SIZE),
        y: Math.min(prev.y, window.innerHeight - SIZE),
      }));
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!visible) return null;

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
    if (!moved.current) window.location.href = "/admin/settings";
  };

  return (
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
  );
}
