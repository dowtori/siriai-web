"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";
import SmoothScroll from "@/components/SmoothScroll";

const DOMAINS = [
  {
    number: "01",
    title: "AI 아키텍처 설계",
    desc: "데이터 흐름과 의사결정 구조 설계. 조직이 AI를 실제로 운영할 수 있는 논리적 토대를 구축합니다.",
    count: "12+",
    unit: "프로젝트",
  },
  {
    number: "02",
    title: "AI 리터러시 구축",
    desc: "팀 단위 역량 교육과 워크숍. 조직 전체가 AI를 언어처럼 쓸 수 있도록 체계적으로 설계합니다.",
    count: "10+",
    unit: "팀",
  },
  {
    number: "03",
    title: "인사이트 기반 운영",
    desc: "인플루언서 채널과 AI 기반 콘텐츠 운영의 결합. 데이터에서 판단, 판단에서 실행으로 이어집니다.",
    count: "8+",
    unit: "채널",
  },
];

export default function PortfolioPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <section ref={ref} className="bg-[#F4F1EB] min-h-screen pt-32 pb-32 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.22em] uppercase text-black/30"
            >
              Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-6 font-bold text-black leading-[1.2] max-w-2xl"
              style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", wordBreak: "keep-all" }}
            >
              구조는 있습니다.<br />지금 기록하고 있습니다.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-8 text-[14px] leading-[1.9] text-black/40 max-w-md"
              style={{ wordBreak: "keep-all" }}
            >
              30개 이상의 AI 운영 구조 프로젝트를 케이스 스터디로 정리하는 중입니다.
              구체적인 레퍼런스가 필요하시면 직접 문의해 주세요.
            </motion.p>

            <div
              className="mt-24 grid md:grid-cols-3"
              style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.07)" }}
            >
              {DOMAINS.map((d, i) => (
                <motion.div
                  key={d.number}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.38 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 flex flex-col gap-6 border border-black/[0.07]"
                >
                  <span className="text-[11px] font-mono text-black/20 tracking-wider">
                    {d.number}
                  </span>
                  <div className="flex-1">
                    <h2
                      className="text-[15px] font-semibold text-black leading-snug"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {d.title}
                    </h2>
                    <p
                      className="mt-3 text-[12px] text-black/40 leading-[1.85]"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {d.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-black/[0.07] flex items-baseline gap-1.5">
                    <span className="text-[24px] font-bold text-black leading-none">{d.count}</span>
                    <span className="text-[11px] text-black/30">{d.unit}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-20 flex flex-wrap items-center gap-4"
            >
              <p className="text-[13px] text-black/40" style={{ wordBreak: "keep-all" }}>
                케이스 공개까지 기다리기 어려우신가요?
              </p>
              <Link
                href="/contact"
                className="text-[13px] font-medium text-black hover:text-black/50 transition-colors duration-200"
              >
                문의하기 →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <FooterSection />
    </SmoothScroll>
  );
}
