// 외주 원안 최상단 얇은 그라디언트 캡슐.
// Frame 2147239162 spec 정밀: 1280×32, top 12, padding 10, border-radius 12.
// background: 다중 그라디언트(베이지→올리브→그린 톤). 가운데 카피 14/500 #000.

export default function CTopBanner() {
  return (
    <div
      className="mx-auto flex items-center justify-center"
      role="note"
      style={{
        marginTop: 12,
        marginInline: "auto",
        maxWidth: 1280,
        width: "calc(100% - 24px)",
        height: 32,
        padding: 10,
        borderRadius: 12,
        background:
          "linear-gradient(101.15deg, #E8E6E0 48.15%, #C5BD60 100%, #5E8867 100%)",
      }}
    >
      <p
        className="m-0"
        style={{
          fontFamily: "Pretendard",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.2,
          color: "#000",
          textAlign: "center",
        }}
      >
        사람을 이해하고, 세상을 연결하는 AI
      </p>
    </div>
  );
}
