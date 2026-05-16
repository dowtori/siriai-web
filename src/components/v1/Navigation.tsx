"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-8 flex items-center justify-between transition-all duration-500"
      style={{
        paddingTop: scrolled ? "14px" : "20px",
        paddingBottom: scrolled ? "14px" : "20px",
        backgroundColor: scrolled ? "rgba(244, 241, 235, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
      }}
    >
      <Link href="/" className="text-[15px] font-semibold tracking-tight">
        Siriai
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/portfolio"
          className="px-4 py-2 text-[13px] font-medium rounded-full border border-black/15 hover:border-black/40 transition-colors duration-200"
        >
          Portfolio
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 text-[13px] font-medium rounded-full bg-black text-white hover:bg-black/80 transition-colors duration-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
