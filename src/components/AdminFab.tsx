"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const SIZE = 40;
const GAP = 24;

export function AdminFab() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  useEffect(() => {
    setPos({ x: window.innerWidth - SIZE - GAP, y: window.innerHeight - SIZE - GAP });
    setMounted(true);
  }, []);

  if (pathname.startsWith("/admin") || !mounted) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    origin.current = { x: pos.x, y: pos.y };
    start.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - SIZE, origin.current.x + dx)),
      y: Math.max(0, Math.min(window.innerHeight - SIZE, origin.current.y + dy)),
    });
  };

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    if (!moved.current) router.push("/admin/settings");
  }, [router]);

  return (
    <button
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
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
