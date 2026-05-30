import type { Metadata } from "next";
import "./v4-theme.css";

/**
 * /v4 — Redesign 프로토타입 (신비주의·느린·스마트).
 * 프로덕션 / (v3) 미변경. noindex. 콘텐츠/카피는 v3 그대로, 경험·형태만 재설계.
 */
export const metadata: Metadata = {
  title: "Siriai · v4 prototype",
  robots: { index: false, follow: false },
};

export default function V4Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="v4-scope">{children}</div>;
}
