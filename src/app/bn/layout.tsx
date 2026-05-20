import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Siriai — Architecture of Thought",
  description: "A z-axis journey into Siriai's operating model.",
};

export default function BNLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#05050A] text-white antialiased selection:bg-white selection:text-black">
      {children}
    </div>
  );
}
