import type { Metadata } from "next";
import { A1MotionProvider } from "@/components/a1/motion-context";
import DebugPanel from "@/components/a1/DebugPanel";

export const metadata: Metadata = {
  title: {
    template: "%s · Siriai (A1 mystic compressed)",
    default: "Siriai · A1 Mystic Compressed",
  },
  description:
    "A1 — Mystic Compressed track preview. Dark hero × white composition × voice + contact.",
  robots: { index: false, follow: true },
};

export default function A1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <A1MotionProvider>
      {children}
      <DebugPanel />
    </A1MotionProvider>
  );
}
