// Figma node: 448:2066 (Desktop - 3) → C3. 용차 단가 에이전트
// 멘토링 D2 "협상 에이전트 복귀"의 핵심 화면. 배차 담당자가 반복하던
// "단가 올렸다 내렸다"를 AI가 가격대별 성사 확률 예측 + 자동 인상 스케줄로 대신한다.

import CompanySidebar from "../../components/company/CompanySidebar";

type PriceBar = {
  price: string;
  probability: number; // 0-100
  highlighted?: boolean;
};

const PRICE_BARS: PriceBar[] = [
  { price: "42만", probability: 23 },
  { price: "43.5만", probability: 38 },
  { price: "45만", probability: 52 },
  { price: "48만", probability: 81, highlighted: true },
  { price: "52만", probability: 94 },
];

type EscalationStep = {
  time: string;
  label: string;
  status: "active" | "pending" | "danger";
};

const ESCALATION_STEPS: EscalationStep[] = [
  { time: "09:20", label: "420,000 등록 - 지금 시작", status: "active" },
  { time: "09:50", label: "435,000 - 미성사 시 인상", status: "pending" },
  { time: "10:30", label: "450,000 - 미성사 시 인상", status: "pending" },
  { time: "11:30", label: "480,000 - 미성사 시 인상", status: "pending" },
];

export default function CompanyNegotiationAgentPage() {
  const maxProbability = Math.max(...PRICE_BARS.map((b) => b.probability));

  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="negotiation" />

      <div className="flex-1 grid grid-cols-[1fr_457px] gap-[36px] p-[24px] overflow-y-auto">
        {/* 좌측 컬럼 */}
        <div className="flex flex-col gap-[24px]">
          <h1 className="text-[32px] font-semibold tracking-[-0.128px]">
            김해 → 인천 <span className="text-[24px] font-bold">•</span> 파렛트 8{" "}
            <span className="text-[24px] font-bold">•</span> 15:00 상차
          </h1>

          {/* 가격대별 성사 확률 */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="text-[24px] font-medium">가격대별 성사 확률</h2>
              <span className="bg-[var(--color-action-primary)] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px]">
                AI 예측
              </span>
            </div>
            <div className="flex items-end gap-[24px] h-[220px] px-[24px]">
              {PRICE_BARS.map((bar) => (
                <div key={bar.price} className="flex flex-col items-center gap-[8px] flex-1">
                  <span className="text-[11px] text-[#808080]">{bar.probability}</span>
                  <div
                    className={`w-full rounded-[3px] ${
                      bar.highlighted ? "bg-[var(--color-action-primary)]" : "bg-[#dcebff]"
                    }`}
                    style={{ height: `${(bar.probability / maxProbability) * 180}px` }}
                  />
                  <span className="text-[11px] text-[#808080]">{bar.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI 예측 근거 */}
          <div className="flex flex-col gap-[13px]">
            <div className="bg-[#eff6ff] rounded-[12px] p-[16px] flex gap-[10px]">
              <span className="bg-[var(--color-action-primary)] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px] shrink-0 h-fit">
                AI 예측
              </span>
              <p className="text-[14px] text-[#5fa4ff] leading-[21px]">
                기준가 <b className="text-[16px]">42만으로 시작하되 48만을 넘기지 않는 선에서</b> 단계인상을
                권합니다. 과거 이 구간 사람 수배 평균 체결가는 <b className="text-[16px]">486,000원</b>, 평균
                소요 <b className="text-[16px]">3시간 20분</b>이었습니다.
              </p>
            </div>
            <div className="border border-[#a0a0a0] rounded-[12px] p-[16px] flex gap-[10px]">
              <span className="bg-[#a0a0a0] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px] shrink-0 h-fit">
                AI 예측 근거
              </span>
              <p className="text-[14px] leading-[21px]">
                <span className="text-[#707378]">최근 이 구간 체결</span> <b className="text-[16px]">41건</b>{" "}
                <span className="text-[#737373]">• 화요일 오후 상차 • 상행 공급 지수</span>{" "}
                <b className="text-[16px]">낮음</b>
              </p>
            </div>
          </div>

          {/* 가격 말고 다른 레버 */}
          <div className="flex flex-col gap-[5px]">
            <p className="text-[16px] font-medium">가격 말고 다른 레버</p>
            <div className="bg-[#f0f0f0] rounded-[20px] p-[16px] flex flex-col gap-[10px]">
              <ul className="list-disc text-[#737373] text-[14px] leading-[21px] ps-[21px]">
                <li>
                  상차를 13:00로 앞당기면 420,000원에 성사 확률 <b className="text-black">67%</b>
                </li>
                <li>파렛트 8 → 4+4 분할 시 두 건 모두 기준가 성사 가능</li>
              </ul>
              <p className="text-[14px] text-black leading-[21px]">
                화주 협의가 필요한 안건입니다. 문의 초안을 만들어 드릴까요?
              </p>
            </div>
          </div>
        </div>

        {/* 우측 컬럼: 자동 인상 스케줄 */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center gap-[8px]">
            <h2 className="text-[24px] font-medium">자동 인상 스케줄</h2>
            <span className="border border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] text-[12px] font-bold rounded-[4px] px-[6px] py-[4px]">
              담당자 승인 대기
            </span>
          </div>

          <div className="border-t border-[rgba(0,0,0,0.35)] pt-[26px] flex flex-col gap-[14px]">
            {ESCALATION_STEPS.map((step) => (
              <div key={step.time} className="flex items-center gap-[22px]">
                <span className="text-[#707378] text-[16px] w-[42px]">{step.time}</span>
                <div
                  className={
                    step.status === "active"
                      ? "flex-1 h-[50px] flex items-center px-[17px] rounded-[10px] bg-[#dcebff] border border-[var(--color-action-primary)]"
                      : "flex-1 h-[50px] flex items-center px-[17px] rounded-[10px] bg-[#f4f4f4] border border-dashed border-[#666]"
                  }
                >
                  <span className="text-[16px]">{step.label}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-[25px]">
              <span className="text-[#707378] text-[16px] w-[42px]">상한</span>
              <div className="flex-1 h-[50px] flex items-center px-[17px] rounded-[10px] bg-[#fff0f0] border border-[#ff4b4b]">
                <span className="text-[16px] text-[#ff4b4b]">480,000 초과 시 담당자 호출</span>
              </div>
            </div>
          </div>

          {/* 예상 체결가 카드 */}
          <div className="border-2 border-[#949494] rounded-[10px] px-[21px] py-[16px] flex flex-col gap-[35px]">
            <p className="text-[20px] font-semibold text-[color:var(--color-text-secondary)]">예상 체결가</p>
            <div className="flex flex-col gap-[24px]">
              <p className="text-[40px] font-semibold">475,000</p>
              <div className="flex gap-[15px] text-[20px] text-[#707378]">
                <span>기존 대비</span>
                <span className="flex gap-[8px] font-bold text-[color:var(--color-action-primary)]">
                  <span>▼ 11,000원</span>
                  <span>▼ 2시간 10분</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <button className="border-2 border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] font-bold text-[24px] rounded-[12px] h-[52px]">
              상한 조정
            </button>
            <button className="bg-[var(--color-action-primary)] text-white font-bold text-[24px] rounded-[12px] h-[52px]">
              이 스케줄로 위임
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
