"use client";

/**
 * StageOrchestrator
 * 6 stage 컴포넌트를 perspective 컨테이너 안에 합성.
 * 각 stage가 자기 wrapper + 자기 mechanic을 가짐.
 * 본 컴포넌트는 stage 데이터를 stage 컴포넌트에 전달만 한다.
 */

import { STAGES, type ZJourneyHandle } from "../useZJourney";
import StageI_Hero from "./StageI_Hero";
import StageII_Stance from "./StageII_Stance";
import StageIII_System from "./StageIII_System";
import StageIV_Methodology from "./StageIV_Methodology";
import StageV_Voice from "./StageV_Voice";
import StageVI_Contact from "./StageVI_Contact";

const STAGE_COMPONENTS = [
  StageI_Hero,
  StageII_Stance,
  StageIII_System,
  StageIV_Methodology,
  StageV_Voice,
  StageVI_Contact,
];

export default function StageOrchestrator({ handle }: { handle: ZJourneyHandle }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        perspective: "1400px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {STAGES.map((s, i) => {
        const Stage = STAGE_COMPONENTS[i];
        return <Stage key={s.id} handle={handle} from={s.from} to={s.to} />;
      })}
    </div>
  );
}
