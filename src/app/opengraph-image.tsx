import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Siriai — Architecture for Insight with AI";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#EFE9DD",
          color: "#0F1419",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Pretendard Variable", "Inter", sans-serif',
        }}
      >
        {/* Top: brand + meta line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 5,
            color: "#5E6470",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span>Siriai</span>
          <span style={{ fontSize: 14 }}>Architecture for Insight with AI</span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 500,
            letterSpacing: -3,
            lineHeight: 1.03,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Architecture for</span>
          <span>Insight with AI.</span>
        </div>

        {/* Bottom rule + caption */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "rgba(15, 20, 25, 0.18)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 18,
              letterSpacing: 4,
              color: "#5E6470",
              textTransform: "uppercase",
            }}
          >
            <span>Founded in Seoul · Est. 2024</span>
            <span>siriai.io</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
