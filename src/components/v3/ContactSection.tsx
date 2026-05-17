"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ContactForm from "./ContactForm";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{ backgroundColor: "var(--surface-base)", color: "var(--fg-default)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-32 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-12 md:gap-y-0">
          {/* Left: header */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--fg-muted)" }}
            >
              06 — Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
              className="mt-8 tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                fontWeight: 500,
                lineHeight: 1.08,
              }}
            >
              Let&apos;s start
              <br />with coffee.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, ease: EASE, delay: 0.24 }}
              className="mt-7"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                lineHeight: 1.85,
                color: "var(--fg-muted)",
                wordBreak: "keep-all",
                maxWidth: "32ch",
              }}
            >
              커피 한 잔으로 시작합니다. 메모 한 줄이면 충분하고, 어떤 대화든 먼저 듣는 자리부터.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/contact#schedule"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--fg-muted)" }}
              >
                직접 시간을 정하시려면
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: 0.32 }}
            className="md:col-span-6 md:col-start-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
