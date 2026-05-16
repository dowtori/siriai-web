"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "s-hero",         num: "00", label: "Intro",         dark: false },
  { id: "s-connection",   num: "01", label: "AI Connection", dark: false },
  { id: "s-relationship", num: "02", label: "Relationship",  dark: false },
  { id: "s-architecture", num: "03", label: "Structure",     dark: true  },
  { id: "s-philosophy",   num: "04", label: "Philosophy",    dark: true  },
  { id: "s-aistudio",     num: "05", label: "AI Studio",     dark: false },
  { id: "s-creator",      num: "06", label: "Creators",      dark: true  },
  { id: "s-archiving",    num: "07", label: "Archiving",     dark: false },
  { id: "s-manifesto",    num: "08", label: "Manifesto",     dark: true  },
  { id: "s-growth",       num: "09", label: "Growth",        dark: true  },
  { id: "s-services",     num: "10", label: "Services",      dark: false },
];

export default function SectionIndicator() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { threshold: 0, rootMargin: "-42% 0px -42% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const active = SECTIONS[activeIdx];
  const isDark = active.dark;

  const dotColor = isDark ? "rgba(196,181,253,0.85)" : "rgba(0,0,0,0.55)";
  const dotInactive = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
  const labelColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";
  const numColor = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.25)";

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-[6px] pointer-events-none hidden md:flex"
    >
      {/* label — changes per section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-[6px] mb-2"
        >
          <span
            className="text-[9px] font-mono transition-colors duration-500"
            style={{ color: numColor }}
          >
            {active.num}
          </span>
          <span
            className="text-[9px] tracking-[0.15em] uppercase transition-colors duration-500"
            style={{ color: labelColor }}
          >
            {active.label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* dot rail */}
      {SECTIONS.map((s, i) => {
        const isActive = i === activeIdx;
        return (
          <motion.div
            key={s.id}
            animate={{
              width: isActive ? 18 : 4,
              opacity: isActive ? 1 : 0.6,
            }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "2px",
              borderRadius: "999px",
              background: isActive ? dotColor : dotInactive,
              transition: "background 0.5s",
            }}
          />
        );
      })}
    </div>
  );
}
