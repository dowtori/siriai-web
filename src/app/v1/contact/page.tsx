"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navigation from "@/components/v1/Navigation";
import FooterSection from "@/components/v1/FooterSection";
import SmoothScroll from "@/components/v1/SmoothScroll";

const FIELDS = [
  { id: "name", label: "이름", type: "text", required: true },
  { id: "company", label: "회사 / 소속", type: "text", required: false },
  { id: "email", label: "이메일", type: "email", required: true },
] as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setError("전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <section ref={ref} className="bg-[#F4F1EB] min-h-screen pt-32 pb-32 px-8">
          <div className="max-w-5xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.22em] uppercase text-black/30 mb-14"
            >
              Contact
            </motion.p>

            <div className="grid md:grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                <h1
                  className="font-bold text-black leading-[1.2]"
                  style={{ fontSize: "clamp(2rem, 3vw, 3.6rem)", wordBreak: "keep-all" }}
                >
                  함께<br />설계합니다.
                </h1>
                <p
                  className="mt-8 text-[14px] leading-[1.9] text-black/40"
                  style={{ wordBreak: "keep-all" }}
                >
                  프로젝트 문의, 컨설팅 상담, 강연 요청 모두 환영합니다.<br />
                  보통 영업일 1–2일 이내에 답변드립니다.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-12"
                  >
                    <p className="text-[11px] tracking-[0.22em] uppercase text-black/30 mb-6">
                      Received
                    </p>
                    <p
                      className="font-bold text-black leading-[1.25]"
                      style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.6rem)", wordBreak: "keep-all" }}
                    >
                      전달되었습니다.<br />곧 연락드리겠습니다.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {FIELDS.map(({ id, label, type, required }) => (
                      <div key={id} className="flex flex-col gap-2">
                        <label
                          htmlFor={id}
                          className="text-[11px] tracking-[0.16em] uppercase text-black/35"
                        >
                          {label}
                          {required && <span className="ml-1 text-black/25">*</span>}
                        </label>
                        <input
                          id={id}
                          type={type}
                          required={required}
                          value={form[id]}
                          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                          className="border-b border-black/15 bg-transparent py-3 text-[14px] text-black outline-none focus:border-black/50 transition-colors duration-200"
                        />
                      </div>
                    ))}

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="text-[11px] tracking-[0.16em] uppercase text-black/35"
                      >
                        문의 내용 <span className="text-black/25">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="border-b border-black/15 bg-transparent py-3 text-[14px] text-black outline-none focus:border-black/50 transition-colors duration-200 resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-[13px] text-red-600/80">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="self-start mt-2 px-8 py-3.5 rounded-full bg-black text-white text-[13px] font-medium hover:bg-black/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "전송 중..." : "보내기"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </SmoothScroll>
  );
}
