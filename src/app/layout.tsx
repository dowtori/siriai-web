import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siriai — 관계에서 시작해 데이터로 확장하고, 기록으로 증명합니다.",
  description: "Creators remembered. Connection, accelerated.",
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
