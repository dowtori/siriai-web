// /c — Homepage C-Version (외주 UX/UI 원안 충실 재현 트랙)
// Track 격리: components/c/* + c-tokens.css 스코핑. A/B 영향 0.
// 운영 후보 결정 전 unlisted (noindex + robots Disallow).
// 폰트: 외주 원안 확인 결과 Pretendard 단일 (헤드라인·바디·로고타입 모두).

import type { Metadata } from "next";
import "./c-tokens.css";

export const metadata: Metadata = {
  title: "Siriai · C",
  description: "외주 UX/UI 원안 트랙 — 픽셀 퍼펙트 재현.",
  robots: { index: false, follow: false },
};

export default function CLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-route="c" className="c-root">
      {children}
    </div>
  );
}
