"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;
const CAL_NAMESPACE = "diagnosis";

export default function CalInlineEmbed() {
  useEffect(() => {
    if (!CAL_LINK) return;
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#2B3A4A",
            "cal-text": "#0F1419",
            "cal-text-emphasis": "#0F1419",
            "cal-text-muted": "#5E6470",
            "cal-bg": "#EFE9DD",
            "cal-bg-emphasis": "#E8E1D2",
            "cal-border-default": "rgba(15, 20, 25, 0.12)",
            "cal-border-emphasis": "rgba(15, 20, 25, 0.24)",
          },
          dark: {
            "cal-brand": "#2B3A4A",
            "cal-text": "#0F1419",
            "cal-text-emphasis": "#0F1419",
            "cal-text-muted": "#5E6470",
            "cal-bg": "#EFE9DD",
            "cal-bg-emphasis": "#E8E1D2",
            "cal-border-default": "rgba(15, 20, 25, 0.12)",
            "cal-border-emphasis": "rgba(15, 20, 25, 0.24)",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  if (!CAL_LINK) {
    return (
      <div
        className="flex h-full min-h-[480px] flex-col items-center justify-center border p-10 text-center"
        style={{ borderColor: "var(--line-strong)" }}
      >
        <p
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--fg-muted)" }}
        >
          Schedule
        </p>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            fontWeight: 500,
            color: "var(--fg-muted)",
            wordBreak: "keep-all",
            lineHeight: 1.6,
            maxWidth: "28ch",
          }}
        >
          비어있는 시간을 직접 선택해 사전 미팅을 정합니다.
        </p>
        <p
          className="mt-4 text-sm"
          style={{
            color: "var(--fg-muted)",
            wordBreak: "keep-all",
            lineHeight: 1.7,
          }}
        >
          (Cal 연결 후 활성화 — <code>NEXT_PUBLIC_CAL_LINK</code> 환경변수 설정 필요)
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
