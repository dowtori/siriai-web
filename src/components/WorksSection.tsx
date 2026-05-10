"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const IMAGE_DATA = [
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&crop=center",
    label: "Data Flow",
    alt: "Circuit board macro",
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&crop=center",
    label: "AI Strategy",
    alt: "Digital code matrix",
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&crop=center",
    label: "Insight",
    alt: "Digital globe",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    label: "Architecture",
    alt: "Abstract geometric neon",
  },
  {
    url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop&crop=center",
    label: "Literacy",
    alt: "Futuristic glass architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&crop=center",
    label: "Logic",
    alt: "Server room",
  },
  {
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop&crop=center",
    label: "Workflow",
    alt: "Network nodes",
  },
  {
    url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d8?w=400&h=400&fit=crop&crop=center",
    label: "Integration",
    alt: "Neural AI visualization",
  },
  {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop&crop=center",
    label: "Analysis",
    alt: "Open architecture interior",
  },
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop&crop=center",
    label: "Mapping",
    alt: "Laptop dark code screen",
  },
  {
    url: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&h=400&fit=crop&crop=center",
    label: "Training",
    alt: "Light trails abstract",
  },
  {
    url: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=400&fit=crop&crop=center",
    label: "Automation",
    alt: "Forest organic structure",
  },
  {
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop&crop=center",
    label: "Decision",
    alt: "Abstract light streaks",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    label: "Structure",
    alt: "Dramatic coastal cliffs",
  },
  {
    url: "https://images.unsplash.com/photo-1551808525-ddddbbec6021?w=400&h=400&fit=crop&crop=center",
    label: "Execution",
    alt: "Abstract grid pattern",
  },
  {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop&crop=center",
    label: "Alignment",
    alt: "Dark digital interface",
  },
];

function PhotoCircle({
  url,
  label,
  alt,
}: {
  url: string;
  label: string;
  alt: string;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-full cursor-pointer group"
      onMouseEnter={() => {
        if (overlayRef.current) overlayRef.current.style.backdropFilter = "blur(5px)";
      }}
      onMouseLeave={() => {
        if (overlayRef.current) overlayRef.current.style.backdropFilter = "blur(0px)";
      }}
    >
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
      />

      {/* gradient + blur overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.48) 100%)",
          backdropFilter: "blur(0px)",
          transition: "backdrop-filter 400ms ease",
          pointerEvents: "none",
        }}
      />

      {/* label */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.75)",
          textShadow: "0 1px 8px rgba(0,0,0,0.9)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function WorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="bg-[#111110] py-36 px-8 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-20 flex-wrap gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.22em] uppercase text-white/25"
          >
            Works
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <h2
              className="font-bold text-white leading-[1.2]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)", wordBreak: "keep-all" }}
            >
              구조가 있어야<br />
              AI가 작동합니다.
            </h2>
            <p
              className="mt-8 text-white/35 text-[14px] leading-[1.9] max-w-sm"
              style={{ wordBreak: "keep-all" }}
            >
              Siriai는 AI 도구를 나열하지 않습니다. 조직이 AI를 실제로 운영할 수 있는
              아키텍처를 설계합니다. 데이터, 판단, 실행이 연결되는 구조입니다.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center gap-8"
            >
              {[["30+", "프로젝트"], ["12+", "파트너사"], ["100%", "구조 기반"]].map(
                ([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[28px] font-bold text-white leading-none">
                      {num}
                    </span>
                    <span className="text-[11px] text-white/30 tracking-wide">
                      {label}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.18 }}
            className="relative"
          >
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {IMAGE_DATA.map((item, i) => (
                <PhotoCircle key={i} url={item.url} label={item.label} alt={item.alt} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
