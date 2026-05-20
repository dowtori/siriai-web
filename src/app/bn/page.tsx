"use client";

import dynamic from "next/dynamic";

const ZJourney = dynamic(() => import("@/components/bn/ZJourney"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 grid place-items-center bg-[#05050A] text-white/40">
      <span className="text-[10px] tracking-[0.4em] uppercase">Loading the architecture…</span>
    </div>
  ),
});

export default function BNPage() {
  return <ZJourney />;
}
