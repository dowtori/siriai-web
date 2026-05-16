"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "studio",
    mode: "Studio",
    nameKr: "스튜디오",
    tagline: "운영을 함께 설계하고, 함께 운영합니다.",
    includes: ["운영 구조 설계", "콘텐츠·캠페인 파이프라인 구축", "데이터·KPI 정의"],
  },
  {
    id: "advisory",
    mode: "Advisory",
    nameKr: "어드바이저리",
    tagline: "정기 자문으로 의사결정 구조를 정렬합니다.",
    includes: ["월간 진단·회고", "의사결정 트리 정비", "임원 1:1 세션"],
  },
  {
    id: "literacy",
    mode: "Literacy",
    nameKr: "리터러시",
    tagline: "조직이 AI로 사고하는 법을 학습합니다.",
    includes: ["진단 워크숍", "트랙별 커리큘럼", "사내 매뉴얼화"],
  },
];

function pinMode(mode: string) {
  try {
    sessionStorage.setItem("siriai-mode", mode);
  } catch {
    /* noop */
  }
}

export default function ServicesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      id="services"
      ref={ref}
      style={{ backgroundColor: "var(--surface-base)", color: "var(--fg-default)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-32 md:px-10 md:py-40">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fg-muted)" }}
          >
            04 — Services
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
            Three modes of engagement.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, ease: EASE, delay: 0.24 }}
            className="mt-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.125rem, 1.35vw, 1.375rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--fg-muted)",
              wordBreak: "keep-all",
              maxWidth: "32ch",
            }}
          >
            세 모드로 함께합니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.36 }}
            className="mt-4 text-sm"
            style={{
              lineHeight: 1.7,
              color: "var(--fg-muted)",
              wordBreak: "keep-all",
              maxWidth: "32ch",
            }}
          >
            곁에 서는 깊이를 모드로 나눕니다.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:mt-20 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.a
              key={s.id}
              href="#contact"
              onClick={() => pinMode(s.mode)}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, ease: EASE, delay: 0.3 + i * 0.1 }}
              className="group relative flex flex-col overflow-hidden p-8 md:p-10
                         border-t border-[color:var(--line-default)] md:border-t md:border-l
                         transition-colors duration-300
                         hover:bg-[color:var(--surface-raised)]
                         hover:border-[color:var(--accent)]"
              style={{
                color: "var(--fg-default)",
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--fg-muted)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="flex items-baseline justify-between">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.mode}
                </h3>
                <span
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {s.nameKr}
                </span>
              </div>

              <p
                className="mt-5"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  wordBreak: "keep-all",
                  maxWidth: "32ch",
                }}
              >
                {s.tagline}
              </p>

              <ul
                className="mt-7 space-y-2.5"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.65,
                }}
              >
                {s.includes.map((item, j) => (
                  <li key={j} className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 3,
                        height: 3,
                        borderRadius: 3,
                        background: "var(--fg-muted)",
                        transform: "translateY(-2px)",
                        flex: "0 0 auto",
                      }}
                    />
                    <span style={{ wordBreak: "keep-all" }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center justify-between border-t pt-5
                              border-[color:var(--line-default)]
                              transition-colors duration-300
                              group-hover:border-[color:var(--accent)]">
                <span
                  className="text-[11px] uppercase tracking-[0.22em] transition-colors group-hover:text-[color:var(--accent)]"
                  style={{ color: "var(--fg-default)" }}
                >
                  Inquire
                </span>
                <span
                  className="transition-transform group-hover:translate-x-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
