"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * V4 Hero CTA — 단 하나의 3D 글라스 버튼 (히어로 포인트).
 * 글라스모피즘 + 베벨 + 커서 추종 3D 틸트 + 스페큘러 하이라이트. 원본 구현.
 * reduced-motion이면 틸트 없이 정적 글라스.
 */
export default function V4GlassButton({
  label = "Talk to us",
  href = "#contact",
}: {
  label?: string;
  href?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [s, setS] = useState({ rx: 0, ry: 0, gx: 50, gy: 35, active: false });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setS({ rx: -(py - 0.5) * 14, ry: (px - 0.5) * 18, gx: px * 100, gy: py * 100, active: true });
  }
  function onLeave() {
    setS({ rx: 0, ry: 0, gx: 50, gy: 35, active: false });
  }

  return (
    <div style={{ perspective: 900, display: "inline-block" }}>
      <a
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.7em",
          padding: "1.15em 2.2em",
          borderRadius: 999,
          textDecoration: "none",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "#f2f5fa",
          isolation: "isolate",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          transform: `rotateX(${s.rx}deg) rotateY(${s.ry}deg) translateZ(0)`,
          transition: s.active
            ? "transform 0.12s ease-out"
            : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: [
            "inset 0 1.5px 0 rgba(255,255,255,0.45)",      // top bevel highlight
            "inset 0 -2px 6px rgba(0,0,0,0.35)",            // bottom inner shadow
            "0 18px 40px rgba(0,0,0,0.45)",                 // drop
            `0 0 ${s.active ? 46 : 30}px rgba(79,123,191,${s.active ? 0.5 : 0.32})`, // glow
          ].join(", "),
        }}
      >
        {/* 커서 추종 스페큘러 */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: `radial-gradient(120px 80px at ${s.gx}% ${s.gy}%, rgba(255,255,255,0.5), rgba(255,255,255,0.0) 60%)`,
            opacity: s.active ? 0.9 : 0.5,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
        <span style={{ position: "relative" }}>{label}</span>
        <span
          aria-hidden
          style={{
            position: "relative",
            display: "inline-block",
            transform: s.active ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          →
        </span>
      </a>
    </div>
  );
}
