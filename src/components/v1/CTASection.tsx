"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="bg-[#F4F1EB] min-h-screen flex flex-col justify-center py-16 px-8"
    >
      <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.22em] uppercase text-black/30 mb-12"
        >
          Get in touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="font-bold text-black leading-[1.2]"
          style={{ fontSize: "clamp(2.2rem, 4vw, 4.8rem)", wordBreak: "keep-all" }}
        >
          시작할 준비가<br />됐나요?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-6 text-black/40 text-[15px] leading-[1.85] max-w-md"
          style={{ wordBreak: "keep-all" }}
        >
          Siriai와 함께 조직의 AI 운영 구조를 설계해보세요.
          데이터로 시작해 판단과 실행이 연결됩니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-black text-white text-[13px] font-medium hover:bg-black/80 transition-colors duration-200"
          >
            문의하기
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-3.5 rounded-full border border-black/20 text-[13px] font-medium hover:border-black/50 transition-colors duration-200"
          >
            포트폴리오 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
