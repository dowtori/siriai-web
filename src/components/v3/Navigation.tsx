"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect when a dark-tone section is currently behind the nav strip (top ~10vh).
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-tone="dark"]');
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
      { rootMargin: "0px 0px -90% 0px" }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const bg = onDark ? "rgba(15, 20, 25, 0.66)" : "rgba(239, 233, 221, 0.72)";
  const lineColor = onDark
    ? "var(--line-on-inverse)"
    : "var(--line-default)";
  const fg = onDark ? "var(--fg-on-inverse)" : "var(--fg-default)";

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
          href="#hero"
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
          href="#contact"
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
