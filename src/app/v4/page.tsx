import V4HeroV2 from "@/components/v4/V4HeroV2";
import V4Practice from "@/components/v4/V4Practice";
import V4Proof from "@/components/v4/V4Proof";
import V4Closing from "@/components/v4/V4Closing";

/**
 * /v4 — Redesign 프로토타입 홈.
 * Hero(다크·신비) → Practice(흰색·틴트카드) → Signals(라이트 변주) → Closing(monopo 다크·스크롤 연출).
 * 긴 스크롤 대신 압축 + 하단 드라마틱 마무리.
 */
export default function V4Home() {
  return (
    <main>
      <V4HeroV2 />
      <V4Practice />
      <V4Proof />
      <V4Closing />
    </main>
  );
}
