import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://siriai.io"),
  title: {
    default: "Siriai — Architecture for insight",
    template: "%s · Siriai",
  },
  description:
    "사람과 AI가 더불어 사는 방식 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
  openGraph: {
    title: "Siriai — Architecture for insight",
    description:
      "사람과 AI가 더불어 사는 방식 설계. 서울 기반 AI 아키텍처 · 리터러시 컨설팅.",
    type: "website",
    locale: "ko_KR",
    siteName: "Siriai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siriai — Architecture for insight",
    description: "사람과 AI가 더불어 사는 방식 설계.",
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
