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
import CServices from "@/components/c/CServices";
import CFooter from "@/components/c/CFooter";

// /c — 외주 UX/UI 원안 충실 재현.
// 전체 12개 본문 블록 + Footer. Hero 인터랙션(검은 구체 reveal + 1/5 carousel)은 다음 단계.

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
        <CServices />
        <CFooter />
      </main>
    </>
  );
}
