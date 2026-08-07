// Figma node: 434:2665 (Desktop - 2) → C2. 오늘의 배차 보드
// 고정차로 자동 완료된 물량과 용차 수배가 필요한 물량을 한눈에 보여주고,
// AI가 제안한 시작가로 협상(C3/C4)에 넘길 수 있는 화면.

import CompanySidebar from "../../components/company/CompanySidebar";

type SummaryCard = {
  label: string;
  value: string;
  sub: string;
  tone: "primary" | "warning" | "neutral";
};

const SUMMARY_CARDS: SummaryCard[] = [
  { label: "고정차 배정", value: "32 / 32", sub: "자동 완료", tone: "primary" },
  { label: "용차 필요", value: "5 건", sub: "수배 대기", tone: "warning" },
  { label: "오늘 총 물량", value: "37 건", sub: "계약 100 대비 +7", tone: "neutral" },
];

type CharterRow = {
  no: number;
  route: string;
  cargo: string;
  timeWindow: string;
  baseFare: string;
  aiStartFare: string;
  estClose: string;
  status: "대기" | "난이도⇧";
};

const CHARTER_ROWS: CharterRow[] = [
  { no: 1, route: "부산 → 대전", cargo: "“많음”", timeWindow: "미정", baseFare: "미정", aiStartFare: "435,000", estClose: "1시간 10분", status: "대기" },
  { no: 2, route: "양산 → 군포", cargo: "파렛트 6", timeWindow: "7/29 09:00", baseFare: "420,000", aiStartFare: "400,000", estClose: "40분", status: "대기" },
  { no: 3, route: "김해 → 인천", cargo: "파렛트 8", timeWindow: "7/29 15:00", baseFare: "135,000", aiStartFare: "142,000", estClose: "1시간 50분", status: "대기" },
  { no: 4, route: "창원 → 평택", cargo: "파렛트 6", timeWindow: "7/29 19:00", baseFare: "350,000", aiStartFare: "358,000", estClose: "30분", status: "대기" },
  { no: 5, route: "대구 → 천안", cargo: "파렛트 7", timeWindow: "7/29 09:00", baseFare: "380,000", aiStartFare: "380,000", estClose: "3시간 40분", status: "대기" },
  { no: 6, route: "광주 → 오산", cargo: "파렛트 5", timeWindow: "7/29 14:00", baseFare: "410,000", aiStartFare: "445,000", estClose: "2시간", status: "난이도⇧" },
];

const cardToneClass: Record<SummaryCard["tone"], string> = {
  primary: "bg-[var(--color-action-primary)] text-white",
  warning: "bg-[var(--color-gray-200)] border-2 border-[#c6c6cd] text-[color:var(--color-text-primary)]",
  neutral: "bg-white border-2 border-[rgba(108,116,120,0.45)] text-[color:var(--color-text-primary)]",
};

export default function CompanyDispatchBoardPage() {
  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="dispatchBoard" />

      <div className="flex-1 flex flex-col p-[24px] overflow-y-auto">
        {/* 요약 카드 3개 */}
        <div className="flex gap-[16px] mb-[24px]">
          {SUMMARY_CARDS.map((card) => (
            <div
              key={card.label}
              className={`flex-1 rounded-[10px] px-[28px] py-[24px] flex flex-col gap-[12px] ${cardToneClass[card.tone]}`}
            >
              <p className="text-[15px] opacity-80">{card.label}</p>
              <div className="flex items-end gap-[12px]">
                <span className="text-[32px] font-semibold">{card.value}</span>
                <span className="text-[16px] opacity-80">{card.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 용차 수배 대상 테이블 */}
        <div className="flex items-center gap-[8px] mb-[16px]">
          <h2 className="text-[24px] font-medium">용차 수배 대상</h2>
          <span className="bg-[#a0a0a0] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px]">
            AI 시작가 제안
          </span>
        </div>

        <div className="border border-black rounded-[10px] overflow-hidden">
          <table className="w-full text-[16px] text-center border-collapse">
            <thead className="bg-[#f6f6f6]">
              <tr className="text-[15px] text-[rgba(0,0,0,0.6)]">
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] w-[44px]" />
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">구간</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">화물</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">시간창</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">기준 단가</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">AI 시작가</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">예상 성사</th>
                <th className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">상태</th>
              </tr>
            </thead>
            <tbody>
              {CHARTER_ROWS.map((row) => (
                <tr key={row.no} className={row.no === 1 ? "bg-[var(--color-gray-200)]" : row.status === "난이도⇧" ? "bg-[#fdfff0]" : ""}>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.no}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.route}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.cargo}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.timeWindow}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.baseFare}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.aiStartFare}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.estClose}</td>
                  <td className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                    <span
                      className={
                        row.status === "난이도⇧"
                          ? "inline-block border border-[#d4b200] text-[#d4b200] rounded-[15px] px-[10px] py-[6px] text-[16px]"
                          : "inline-block border border-[#4d4d4d] text-[color:var(--color-text-secondary)] rounded-[15px] px-[10px] py-[6px] text-[16px]"
                      }
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI 분석 배너 */}
        <div className="bg-[var(--color-blue-50)] border border-[var(--color-icon-brand)] rounded-[10px] p-[17px] mt-[16px] flex items-center gap-[10px]">
          <span className="bg-[var(--color-action-primary)] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px] shrink-0">
            AI 분석
          </span>
          <p className="text-[16px]">
            울산 → 이천 건은 오늘 상행 공급이 없습니다. 기준가로는 성사 확률 18%. 시작가를 올리거나 상차 시간을 1시간 늦추면 확률이 63% 상승합니다.
          </p>
        </div>

        {/* 하단 액션 */}
        <div className="flex gap-[8px] mt-[24px]">
          <button className="border-2 border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] font-bold text-[24px] rounded-[12px] h-[52px] w-[260px]">
            원문 대조
          </button>
          <button className="flex-1 bg-[var(--color-action-primary)] text-white font-bold text-[24px] rounded-[12px] h-[52px]">
            11건 확정하고 배치 보드로
          </button>
        </div>
      </div>
    </div>
  );
}
