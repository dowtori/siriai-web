"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import TurntableCarousel from "./TurntableCarousel";

// ── 8 Philosophy concepts (gradients mirror TurntableCarousel) ──────
const CONCEPTS = [
  {
    num: "01",
    en: "Data Flow",
    ko: "데이터 흐름 설계",
    desc: "조직 내 데이터가 어떻게 생성되고, 이동하며, 판단에 도달하는지 설계합니다. 흐름이 없는 데이터는 소음입니다.",
    gradient: "radial-gradient(circle at 38% 38%, #00e5ff 0%, #0047ff 55%, #001a40 100%)",
  },
  {
    num: "02",
    en: "AI Strategy",
    ko: "AI 전략 구조",
    desc: "AI를 어디에, 언제, 어떻게 투입할지 결정하는 전략 레이어입니다. 도구 선택보다 투입 시점과 판단 기준이 더 중요합니다.",
    gradient: "radial-gradient(circle at 62% 35%, #ffb300 0%, #ff4500 55%, #1a0800 100%)",
  },
  {
    num: "03",
    en: "Insight Structure",
    ko: "인사이트 구조화",
    desc: "데이터를 수집하는 것과 읽는 것은 다릅니다. 숫자를 맥락으로, 맥락을 판단으로 번역하는 구조가 필요합니다.",
    gradient: "radial-gradient(circle at 45% 60%, #00ffb8 0%, #00aabb 50%, #002030 100%)",
  },
  {
    num: "04",
    en: "Architecture",
    ko: "AI 아키텍처 설계",
    desc: "AI 도구를 선택하기 전에 구조를 먼저 설계합니다. 데이터 흐름, 의사결정 노드, 피드백 루프 — 이 모든 것이 설계 대상입니다.",
    gradient: "radial-gradient(circle at 55% 40%, #d400ff 0%, #7700ff 55%, #10002b 100%)",
  },
  {
    num: "05",
    en: "Literacy",
    ko: "AI 리터러시",
    desc: "팀이 AI와 함께 생각할 수 없다면 AI는 블랙박스에 불과합니다. 리터러시는 조직의 판단 속도를 근본적으로 바꿉니다.",
    gradient: "radial-gradient(circle at 50% 50%, #dce8ff 0%, #8fa8ff 50%, #081020 100%)",
  },
  {
    num: "06",
    en: "Logic Layer",
    ko: "판단의 논리화",
    desc: "자동화는 반복을 해결합니다. 우리가 설계하는 것은 판단의 지능화 — AI가 인간의 결정을 보조하는 구조입니다.",
    gradient: "radial-gradient(circle at 42% 58%, #ffee00 0%, #ff7700 55%, #150a00 100%)",
  },
  {
    num: "07",
    en: "Workflow Design",
    ko: "워크플로우 설계",
    desc: "AI가 실제 업무 흐름 안에서 작동하도록 설계합니다. 도입이 아닌 통합 — 사람과 AI가 함께 판단하는 구조입니다.",
    gradient: "radial-gradient(circle at 60% 42%, #00ffee 0%, #6600ff 50%, #000e20 100%)",
  },
  {
    num: "08",
    en: "Integration",
    ko: "구조가 남는다",
    desc: "콘텐츠는 사라지지만 구조는 남습니다. 관계가 자산이 되고, 데이터가 기억이 됩니다. 이것이 우리가 설계하는 이유입니다.",
    gradient: "radial-gradient(circle at 50% 50%, #ff00c8 0%, #8800ff 38%, #00d4ff 72%, #000818 100%)",
  },
];

const FEATURES = [
  {
    number: "01",
    title: "AI 아키텍처 설계",
    desc: "조직의 데이터 흐름과 의사결정 구조를 분석합니다. AI가 실제로 작동할 수 있는 논리적 토대를 설계합니다.",
  },
  {
    number: "02",
    title: "AI 리터러시 구축",
    desc: "팀이 AI와 함께 생각하는 방법을 배웁니다. 조직 전체가 AI를 언어처럼 쓸 수 있도록 역량을 키웁니다.",
  },
  {
    number: "03",
    title: "인사이트 기반 운영",
    desc: "실행 결과를 측정 가능한 인사이트로 전환합니다. 데이터에서 판단으로, 판단에서 다음 설계로 이어집니다.",
  },
];

// ── Desktop: scroll-scrubbed 8-concept sequential reveal ────────────
function PhilosophyDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Phase A: intro headline
  const introOpacity = useTransform(scrollYProgress, [0, 0.07, 0.14], [0, 1, 0]);

  // Phase B: concept gallery
  const mainOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [0, 1, 1, 0]);

  // Phase C: features strip
  const featuresOpacity = useTransform(scrollYProgress, [0.84, 0.96], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.84, 0.96], [32, 0]);

  // Track active concept index from scroll
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const CONCEPT_START = 0.12;
    const CONCEPT_END = 0.85;
    if (v <= CONCEPT_START) return setActiveIndex(0);
    if (v >= CONCEPT_END) return setActiveIndex(7);
    const normalized = (v - CONCEPT_START) / (CONCEPT_END - CONCEPT_START);
    setActiveIndex(Math.min(7, Math.floor(normalized * 8)));
  });

  const concept = CONCEPTS[activeIndex];

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#111110]">

        {/* grid overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: gridOpacity,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* ── Phase A: intro headline ── */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-8 lg:px-20 pointer-events-none"
          style={{ opacity: introOpacity }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/25">
              Philosophy
            </p>
            <h2
              className="mt-5 font-bold text-white leading-[1.18]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4.8rem)", wordBreak: "keep-all" }}
            >
              AI를 쓰는 것이 아니라,<br />AI로 생각하는 것.
            </h2>
          </div>
        </motion.div>

        {/* ── Phase B: concept gallery ── */}
        <motion.div
          className="absolute inset-0 flex items-center px-8 lg:px-20"
          style={{ opacity: mainOpacity }}
        >
          {/* counter top-right */}
          <div className="absolute top-8 right-8 lg:right-20">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[11px] text-white/20 tracking-widest"
              >
                {concept.num} / 08
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="max-w-6xl mx-auto w-full flex items-center gap-12 lg:gap-20">

            {/* Left: text */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">

              {/* progress pills */}
              <div className="flex gap-1.5 items-center">
                {CONCEPTS.map((_, i) => (
                  <div
                    key={i}
                    className="h-px rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? "28px" : "14px",
                      backgroundColor:
                        i === activeIndex
                          ? "rgba(196,181,253,0.7)"
                          : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-5"
                >
                  <p className="text-[10px] tracking-[0.26em] uppercase text-white/20 font-mono">
                    {concept.en}
                  </p>
                  <h3
                    className="font-bold text-white leading-[1.15]"
                    style={{
                      fontSize: "clamp(2rem, 3.2vw, 3.8rem)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {concept.ko}
                  </h3>
                  <p
                    className="text-[13px] text-white/38 leading-[2] max-w-sm"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {concept.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: large concept card */}
            <div className="flex-shrink-0" style={{ width: "min(38vw, 440px)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: "3 / 4",
                    maxHeight: "70vh",
                    background: concept.gradient,
                  }}
                >
                  {/* grid texture */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />

                  {/* large bg number */}
                  <div className="absolute top-5 left-6 select-none">
                    <span
                      className="font-mono font-bold text-white/[0.07] leading-none"
                      style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                    >
                      {concept.num}
                    </span>
                  </div>

                  {/* center glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 42%, rgba(255,255,255,0.12) 0%, transparent 60%)",
                    }}
                  />

                  {/* glassmorphism edge */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.18)",
                    }}
                  />

                  {/* bottom label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-7"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                    }}
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 font-mono">
                      {concept.en}
                    </p>
                    <p
                      className="text-[1.4rem] font-bold text-white/90 leading-[1.2]"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {concept.ko}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Phase C: feature strip ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 lg:px-20 pb-8 pointer-events-none"
          style={{ opacity: featuresOpacity, y: featuresY }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-white/[0.07]">
            {FEATURES.map((f) => (
              <div
                key={f.number}
                className="px-8 first:pl-0 last:pr-0 flex flex-col gap-3"
              >
                <span className="text-[11px] font-mono text-white/20 tracking-wider">
                  {f.number}
                </span>
                <h3
                  className="text-[14px] font-semibold text-white/85 leading-snug"
                  style={{ wordBreak: "keep-all" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[12px] text-white/35 leading-[1.85]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// ── Mobile: regular triggered layout ────────────────────────────────
function PhilosophyMobile() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="md:hidden relative bg-[#111110] min-h-screen flex flex-col py-20 px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.22em] uppercase text-white/25"
        >
          Philosophy
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mt-5 font-bold text-white leading-[1.18]"
          style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", wordBreak: "keep-all" }}
        >
          AI를 쓰는 것이 아니라,<br />AI로 생각하는 것.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative flex-1 flex items-center justify-center min-h-[360px]"
      >
        <TurntableCarousel height={420} />
      </motion.div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 flex flex-col gap-2"
            >
              <span className="text-[11px] font-mono text-white/20">{f.number}</span>
              <h3 className="text-[14px] font-semibold text-white/85">{f.title}</h3>
              <p
                className="text-[12px] text-white/35 leading-[1.85]"
                style={{ wordBreak: "keep-all" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PhilosophySection() {
  return (
    <>
      <PhilosophyDesktop />
      <PhilosophyMobile />
    </>
  );
}
