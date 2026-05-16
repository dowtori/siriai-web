import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · Siriai (v1 legacy)",
    default: "Siriai — v1 (legacy)",
  },
  description:
    "관계에서 시작해 데이터로 확장하고, 기록으로 증명합니다. (v1 legacy)",
  robots: { index: false, follow: true },
};

export default function V1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
