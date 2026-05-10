"use client";

import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-[#111110] px-8 pt-24 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 대형 워드마크 */}
        <div
          className="font-bold text-white/[0.07] leading-none select-none"
          style={{ fontSize: "clamp(5rem, 18vw, 18rem)", letterSpacing: "-0.04em" }}
          aria-hidden="true"
        >
          Siriai
        </div>

        {/* 실제 링크/정보 영역 */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-white/60">Siriai</span>
            <span className="text-[12px] text-white/25">Architecture for Insight, AI</span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Portfolio", href: "/portfolio" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[12px] text-white/30 hover:text-white/70 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} Siriai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
