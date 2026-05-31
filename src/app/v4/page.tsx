import V4HeroV2 from "@/components/v4/V4HeroV2";
import V4Act2 from "@/components/v4/V4Act2";
import V4Proof from "@/components/v4/V4Proof";
import V4Closing from "@/components/v4/V4Closing";

/**
 * /v4 — Redesign 프로토타입 홈.
 * ACT1 Hero(다크·아우로라) → ACT2 Practice(기술 시각화·pinned) → Signals(라이트) → Closing(다크·monopo).
 */
export default function V4Home() {
  return (
    <main>
      <V4HeroV2 />
      <V4Act2 />
      <V4Proof />
      <V4Closing />
    </main>
  );
}
