// 외주 원안 섹션 — Growth: 브랜드의 성장 곡선
// 외주 Figma spec(Frame 2147239155) 픽셀 정밀 재구현.
// 좌측 큰 헤드라인(605×141, 36/700 130%) + 4개 서비스 카드 가로 row(각 302×332, 라운드 48,
// 배경 #E8E6E0, 상단 label 11.2px + 큰 Times New Roman 24px 카피, 하단 시각 요소).
// 카드 내부 다이어그램은 외주 캡처 톤대로 단순 placeholder 미니 비주얼로 구성.

import Image from "next/image";

type Card = {
  label: string;
  title: string; // 줄바꿈 \n 허용
  visualKey: "mediaOps" | "adaptive" | "funnel" | "multiAgent";
};

const CARDS: Card[] = [
  {
    label: "Examples of rising owners",
    title: "Generative\nMedia Ops",
    visualKey: "mediaOps",
  },
  {
    label: "Examples of rising content",
    title: "Adaptive\nTargeting",
    visualKey: "adaptive",
  },
  {
    label: "Examples of rising career",
    title: "Predictive\nFunnels",
    visualKey: "funnel",
  },
  {
    label: "Real-Time Sync:",
    title: "Multi-Agent\nCampaign Orchestration",
    visualKey: "multiAgent",
  },
];

export default function CGrowth() {
  return (
    <section
      id="growth"
      aria-labelledby="c-growth-heading"
      className="c-shell py-[var(--c-section-y)]"
    >
      <div
        className="mx-auto flex w-full flex-col items-start"
        style={{ maxWidth: 1280, gap: 64 }}
      >
        {/* Headline */}
        <h2
          id="c-growth-heading"
          className="m-0"
          style={{
            fontFamily: "Pretendard",
            fontWeight: 700,
            fontSize: "clamp(24px, 3vw, 36px)",
            lineHeight: 1.3,
            color: "#000",
            maxWidth: 605,
            wordBreak: "keep-all",
          }}
        >
          브랜드의 성장 곡선을 더 짧게, 더 높게,
          <br />
          더 똑똑하게 설계합니다.
          <br />
          우리는 자동화하지 않습니다. 지능화합니다.
        </h2>

        {/* 4 cards row — Frame 2147239297 */}
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {CARDS.map((c) => (
            <ServiceCard key={c.title} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ card }: { card: Card }) {
  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "302 / 332",
        backgroundColor: "#E8E6E0",
        borderRadius: 48,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* 상단 label + title */}
      <div
        className="absolute"
        style={{
          left: 24,
          top: 36,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <p
          className="m-0"
          style={{
            fontFamily: "Helvetica Neue, system-ui, sans-serif",
            fontWeight: 400,
            fontSize: 11.2367,
            lineHeight: 1.4,
            letterSpacing: 0.112367,
            color: "#000",
          }}
        >
          {card.label}
        </p>
        <p
          className="m-0"
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: 400,
            fontSize: "clamp(18px, 2vw, 24px)",
            lineHeight: 1.2,
            letterSpacing: -0.144472,
            color: "#000",
            whiteSpace: "pre-line",
          }}
        >
          {card.title}
        </p>
      </div>

      {/* 하단 시각 요소 — visualKey별 placeholder */}
      <div
        className="absolute"
        style={{ left: "50%", top: 160, transform: "translateX(-50%)", width: "calc(100% - 48px)", maxWidth: 240 }}
        aria-hidden="true"
      >
        {card.visualKey === "mediaOps" && <MediaOpsVisual />}
        {card.visualKey === "adaptive" && <AdaptiveVisual />}
        {card.visualKey === "funnel" && <FunnelVisual />}
        {card.visualKey === "multiAgent" && <MultiAgentVisual />}
      </div>
    </div>
  );
}

/* Card 1 — Smart Media OPS System: 3개 동그란 노드(Enhance / Admin / Publishing) */
function MediaOpsVisual() {
  const NODES = ["Enhance", "Admin", "Publishing"];
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center"
        style={{
          gap: 4,
          background: "#FFF",
          borderRadius: 8,
          padding: "4px 10px 4px 4px",
          width: 152,
          height: 20,
          fontFamily: "Helvetica Neue, system-ui, sans-serif",
          fontSize: 10,
          color: "#000",
        }}
      >
        <span
          className="inline-block"
          style={{
            width: 16,
            height: 16,
            background: "#F4F4F4",
            border: "0.5px solid #DFDFDF",
            borderRadius: 6,
          }}
        />
        <span>Smart Media OPS System</span>
      </div>
      <div className="flex flex-row items-start" style={{ gap: 16, marginTop: 8 }}>
        {NODES.map((n) => (
          <div key={n} className="flex flex-col items-center" style={{ gap: 6 }}>
            <span
              style={{
                display: "block",
                width: 32,
                height: 32,
                borderRadius: 16,
                background: "#FFF",
                border: "0.5px solid #DFDFDF",
              }}
            />
            <span
              style={{
                fontFamily: "Helvetica Neue, system-ui, sans-serif",
                fontSize: 9,
                color: "#000",
              }}
            >
              {n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card 2 — Adaptive Targeting: "Target" pill + 작은 이미지 */
function AdaptiveVisual() {
  return (
    <div className="flex flex-col items-center" style={{ gap: 8 }}>
      <div className="flex flex-row items-center" style={{ gap: 8 }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 96,
            height: 36,
            background: "#FFF",
            borderRadius: 12,
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 13,
            color: "#000",
            gap: 4,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: 6,
              border: "1.5px solid #000",
            }}
          />
          <span>Target</span>
        </div>
        <div
          style={{
            width: 96,
            height: 36,
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/c/assets/services/s1.jpg"
            alt=""
            fill
            sizes="96px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        style={{
          width: 200,
          height: 58,
          background: "#F4F4F4",
          border: "0.5px solid #DFDFDF",
          borderRadius: 16,
          padding: "10px 12px",
          marginTop: 6,
          fontFamily: "Helvetica Neue, system-ui, sans-serif",
          fontSize: 9,
          lineHeight: 1.1,
          color: "#000",
          display: "flex",
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            border: "0.75px solid #000",
            borderRadius: 2,
            marginTop: 2,
            flex: "0 0 auto",
          }}
        />
        <span>
          Audience segments adapt in real time as new signals arrive — targeting tightens by context.
        </span>
      </div>
    </div>
  );
}

/* Card 3 — Predictive Funnels: 3 미니 카드(Exposure / Interest / Decision) */
function FunnelVisual() {
  const STEPS = [
    { label: "Exposure", src: "/c/assets/services/s2.jpg", textColor: "#FFFFFF" },
    { label: "Interest", src: null, textColor: "#000" },
    { label: "Decision", src: "/c/assets/services/s3.jpg", textColor: "#000" },
  ];
  return (
    <div className="flex flex-row items-center" style={{ gap: 9 }}>
      {STEPS.map((s) => (
        <div
          key={s.label}
          className="relative"
          style={{
            width: 73,
            height: 73,
            borderRadius: 16,
            background: s.src ? undefined : "#FFFFFF",
            overflow: "hidden",
            border: s.src ? undefined : "0.5px solid #DFDFDF",
          }}
        >
          {s.src && (
            <Image
              src={s.src}
              alt=""
              fill
              sizes="73px"
              style={{ objectFit: "cover", filter: "brightness(0.6)" }}
            />
          )}
          <span
            className="absolute"
            style={{
              left: "50%",
              bottom: 8,
              transform: "translateX(-50%)",
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: 13,
              color: s.textColor,
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Card 4 — Multi-Agent: 3 미니 row(ChatGPT/Gemini/Midjourney) */
function MultiAgentVisual() {
  const AGENTS = [
    { name: "ChatGPT", desc: "is an AI for text generation.", src: "/c/assets/services/s4.png" },
    { name: "Gemini", desc: "is an AI model for multimodal reasoning.", src: "/c/assets/services/s5.jpg" },
    { name: "Midjourney", desc: "is an AI for image generation.", src: "/c/assets/services/s6.jpg" },
  ];
  return (
    <div className="flex flex-col" style={{ gap: 6 }}>
      {AGENTS.map((a) => (
        <div key={a.name} className="flex flex-row items-center" style={{ gap: 8 }}>
          <div
            className="relative"
            style={{ width: 30, height: 30, borderRadius: 8, overflow: "hidden", flex: "0 0 auto" }}
          >
            <Image
              src={a.src}
              alt=""
              fill
              sizes="30px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              flex: 1,
              height: 30,
              background: "#FFFFFF",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              fontFamily: "Helvetica Neue, system-ui, sans-serif",
              fontSize: 9,
              color: "#000",
              lineHeight: 1.1,
            }}
          >
            <strong style={{ marginRight: 4 }}>{a.name}</strong>
            <span>{a.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
