"use client";

import { useEffect, useState } from "react";

/**
 * A1 고정 상단 Nav.
 * - scroll > 16px 시 bg-blur + 높이 축소 (v3 패턴 미러).
 * - [data-a1-tone="dark"] 섹션이 상단 strip 뒤에 있으면 dark 모드로 색 반전.
 *   (Stage 1 Hero · Stage 1→2 transition · Footer = dark)
 */
export default function A1Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true); // 진입 시 hero(dark) 위 — 깜빡임 방지

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets =
      document.querySelectorAll<HTMLElement>('[data-a1-tone="dark"]');
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setOnDark(visible.size > 0);
      },
      { rootMargin: "0px 0px -90% 0px" },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const bg = onDark ? "rgba(11, 15, 20, 0.62)" : "rgba(250, 250, 247, 0.72)";
  const lineColor = onDark
    ? "var(--a1-hairline-on-midnight)"
    : "var(--a1-hairline)";
  const fg = onDark ? "var(--a1-on-midnight)" : "var(--a1-ink)";

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300"
      style={{
        backgroundColor: scrolled ? bg : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? lineColor : "transparent"}`,
        color: fg,
      }}
    >
      <div
        className="mx-auto flex max-w-screen-xl items-center justify-between px-6 transition-[height] duration-300 md:px-10"
        style={{ height: scrolled ? 56 : 72 }}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-[15px] tracking-[-0.01em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            color: "inherit",
          }}
        >
          Siriai
        </a>
        <a
          href="#a1-contact"
          className="text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-60"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "inherit",
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
