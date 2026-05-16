"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ContactForm from "./ContactForm";
import CalInlineEmbed from "./CalInlineEmbed";

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
        {/* Header */}
        <div className="max-w-3xl">
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
            Start with a diagnosis.
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
              maxWidth: "44ch",
            }}
          >
            진단 통화로 시작합니다. 현재 운영의 구조를 함께 살핍니다. 시간을 정하셔도 좋고, 메모만 남기셔도 됩니다.
          </motion.p>
        </div>

        {/* Dual entry */}
        <div className="mt-16 grid grid-cols-1 gap-y-12 md:mt-20 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
          {/* Left — Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: 0.36 }}
          >
            <div className="mb-5 flex items-baseline gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--fg-muted)" }}
              >
                01 — Schedule
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--fg-default)" }}
              >
                시간 정하기
              </span>
            </div>
            <CalInlineEmbed />
          </motion.div>

          {/* Right — Note */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: 0.48 }}
          >
            <div className="mb-5 flex items-baseline gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--fg-muted)" }}
              >
                02 — Note
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--fg-default)" }}
              >
                메모 남기기
              </span>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
