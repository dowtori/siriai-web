import CTopBanner from "@/components/c/CTopBanner";
import CHeader from "@/components/c/CHeader";
import CHero from "@/components/c/CHero";
import CConnection from "@/components/c/CConnection";
import CRelationship from "@/components/c/CRelationship";
import CArchitecture from "@/components/c/CArchitecture";
import CAIStudio from "@/components/c/CAIStudio";
import CCreator from "@/components/c/CCreator";
import CArchiving from "@/components/c/CArchiving";
import CManifestoQuote from "@/components/c/CManifestoQuote";
import CGrowth from "@/components/c/CGrowth";
import CFooter from "@/components/c/CFooter";

// /c — 외주 UX/UI 원안 충실 재현.
// 외주 spec에 Services 단독 카드 그리드 없음 — Growth(Frame 2147239155)가 4 서비스 카드를
// 포함하는 통합 섹션. CServices 컴포넌트는 page에서 미사용(파일은 보존, 후속 결정).

export default function CPage() {
  return (
    <>
      <CTopBanner />
      <main>
        <CHeader />
        <CHero />
        <CConnection />
        <CRelationship />
        <CArchitecture />
        <CAIStudio />
        <CCreator />
        <CArchiving />
        <CManifestoQuote />
        <CGrowth />
        <CFooter />
      </main>
    </>
  );
}
