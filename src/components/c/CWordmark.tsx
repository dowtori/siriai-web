// Siriai 워드마크 — 외주 Figma spec(Frame 2147239184 Union 48.29×16) 정밀 매칭.
// path data 없이 좌표만 제공된 외주 spec → SVG <text>로 폰트 weight·size·letter-spacing
// spec 정확 적용. italic 미사용(spec에 italic 명시 없음).
// Header: width=48.29(=16px height), Footer: width=60(=19.87px height).

type Props = {
  /** 너비(px). 48 → 16px height (Header), 60 → 19.87px height (Footer 내 작은 워드마크) */
  width?: number;
  color?: string;
};

export default function CWordmark({ width = 48, color = "#000000" }: Props) {
  // spec ratio: 48.29:16, 60:19.87 — 모두 약 3:1
  const height = width / 3;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Siriai"
      role="img"
      style={{ display: "block" }}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily='"Pretendard Variable", Pretendard, system-ui, -apple-system, sans-serif'
        fontWeight={700}
        fontSize={height * 0.92}
        letterSpacing={-0.4}
        fill={color}
      >
        Siriai
      </text>
    </svg>
  );
}
