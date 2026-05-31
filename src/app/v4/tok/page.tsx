import V4HeroToken from "@/components/v4/V4HeroToken";

// 토큰 격리 테스트 라우트 (오로라 없이 렌더 검증용).
export default function TokTest() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--v4-midnight)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <V4HeroToken />
    </main>
  );
}
