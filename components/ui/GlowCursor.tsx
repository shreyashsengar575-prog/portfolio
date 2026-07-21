"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function GlowCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const interactive = (e: Event) => {
      const t = e.target as HTMLElement;
      el.dataset.hover = t.closest("a,button,.interactive") ? "1" : "0";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", interactive);
    let raf: number;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${el.dataset.hover === "1" ? 2.2 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", interactive);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full mix-blend-screen transition-[scale] duration-200"
      style={{
        background:
          "radial-gradient(circle, rgba(94,234,212,0.9), rgba(167,139,250,0.2) 60%, transparent 70%)",
        boxShadow: "0 0 30px rgba(94,234,212,0.6)",
      }}
    />
  );
}
