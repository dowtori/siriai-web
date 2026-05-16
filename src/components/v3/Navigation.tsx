"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(239, 233, 221, 0.72)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line-default)" : "transparent"}`,
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
            color: "var(--fg-default)",
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
            color: "var(--fg-default)",
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
