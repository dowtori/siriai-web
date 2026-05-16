"use client";

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
              Start with
              <br />a diagnosis.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
              className="mt-7"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                lineHeight: 1.85,
                color: "var(--fg-muted)",
                wordBreak: "keep-all",
                maxWidth: "32ch",
              }}
            >
              진단 통화로 시작합니다. 현재 운영의 구조를 함께 살펴보고, 어디부터 손대야 할지 한 페이지로 정리해 드립니다.
            </motion.p>
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
