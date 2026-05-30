import V4Hero from "@/components/v4/V4Hero";
import V4Practice from "@/components/v4/V4Practice";
import V4Proof from "@/components/v4/V4Proof";

/**
 * /v4 — Redesign 프로토타입 홈.
 * Hero(다크·신비) → Practice(흰색) → Proof & Contact(다크 변주).
 * 긴 스크롤 대신 3 act 복합 경험.
 */
export default function V4Home() {
  return (
    <main>
      <V4Hero />
      <V4Practice />
      <V4Proof />
    </main>
  );
}
