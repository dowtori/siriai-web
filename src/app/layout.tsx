import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://siriai.io"),
  title: {
    default: "Siriai — Architecture for thinking with AI",
    template: "%s · Siriai",
  },
  description:
    "AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
  openGraph: {
    title: "Siriai — Architecture for thinking with AI",
    description:
      "AI로 사고하는 조직을 위한 의사결정 구조 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
    type: "website",
    locale: "ko_KR",
    siteName: "Siriai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siriai — Architecture for thinking with AI",
    description: "AI로 사고하는 조직을 위한 의사결정 구조 설계.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
