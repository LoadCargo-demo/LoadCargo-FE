// Figma node: 472:2275 (Desktop - 6) → C4. 협상 진행 현황
// 용차 협상 건들의 진행 상태를 한눈에 보여주고, 그중 일부가 차주의
// "하루 패키지"에 편입되는 지점(용차 협상 ↔ 만차 앱의 접점)을 보여주는 화면.

import CompanySidebar from "../../components/company/CompanySidebar";

type SummaryCard = {
  label: string;
  value: string;
  tone: "success" | "neutral" | "alert" | "info";
};

const SUMMARY_CARDS: SummaryCard[] = [
  { label: "성사", value: "3 건", tone: "success" },
  { label: "진행 중", value: "2건", tone: "neutral" },
  { label: "담당자 호출", value: "0 건", tone: "alert" },
  { label: "하루 패키지 편입", value: "2 건", tone: "info" },
];

type NegotiationRow = {
  no: number;
  route: string;
  currentPrice: string;
  views: number;
  elapsed: string;
  statusLines: string[];
  success: boolean;
};

const ROWS: NegotiationRow[] = [
  { no: 1, route: "부산 → 대전", currentPrice: "380,000", views: 22, elapsed: "26분", statusLines: ["성사 - 개별 배차"], success: true },
  { no: 2, route: "양산 → 군포", currentPrice: "142,000", views: 14, elapsed: "38분", statusLines: ["성사 - 김민수 기사", "하루 패키지에 편입"], success: true },
  { no: 3, route: "창원 → 평택", currentPrice: "358,000", views: 9, elapsed: "1시간 4분", statusLines: ["성사 - 하루 패키지에 편입"], success: true },
  { no: 4, route: "김해 → 인천", currentPrice: "435,000 (2단계)", views: 6, elapsed: "45분", statusLines: ["진행 - 10:30에", "450,000으로 인상 예정"], success: false },
  { no: 5, route: "울산 → 이천", currentPrice: "445,000", views: 3, elapsed: "45분", statusLines: ["진행 - 상차 1시간 지연", "협의 제안됨"], success: false },
];

const cardToneClass: Record<SummaryCard["tone"], string> = {
  success: "bg-[#f1ffee] border-2 border-[#63ad6b]",
  neutral: "border-2 border-[var(--color-text-placeholder,#999)]",
  alert: "bg-[#fff0f0] border-2 border-[var(--color-status-alert,#f34045)]",
  info: "bg-[var(--color-blue-50)] border-2 border-[var(--color-action-primary)]",
};

export default function CompanyNegotiationStatusPage() {
  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="negotiation" />

      <div className="flex-1 flex flex-col p-[24px] overflow-y-auto">
        {/* 요약 카드 4개 */}
        <div className="flex gap-[15px] mb-[24px]">
          {SUMMARY_CARDS.map((card) => (
            <div
              key={card.label}
              className={`flex-1 rounded-[10px] px-[24px] py-[20px] flex flex-col gap-[16px] ${cardToneClass[card.tone]}`}
            >
              <p className="text-[15px] text-[rgba(0,0,0,0.6)]">{card.label}</p>
              <p className="text-[32px] font-semibold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* 협상 현황 테이블 */}
        <div className="border border-black rounded-[10px] overflow-hidden">
          <table className="w-full text-[16px] text-center border-collapse">
            <thead className="bg-[#f6f6f6]">
              <tr className="text-[15px] text-[rgba(0,0,0,0.6)]">
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] w-[44px]" />
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">구간</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">현재가</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">조회</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">경과</th>
                <th className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">상태</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.no} className={row.success ? "bg-[#f1ffee]" : ""}>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.no}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.route}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.currentPrice}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.views}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.elapsed}</td>
                  <td className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                    {row.statusLines.map((line, i) => (
                      <p key={i} className="leading-[25px]">
                        {line}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 하루 패키지 편입 설명 배너 (멘토링 D3 배차 보증 개념과 연결) */}
        <div className="bg-[var(--color-blue-50)] border border-[var(--color-action-primary)] rounded-[10px] px-[25px] py-[26px] mt-[16px] flex gap-[40px]">
          <p className="text-[16px] font-bold text-[rgba(0,0,0,0.35)] shrink-0 whitespace-nowrap">
            하루 패키지 편입이란?
          </p>
          <p className="text-[16px] leading-[1.29]">
            단독으로는 잡히기 어려운 소형 오더가, 그 시간대에 그 경로를 지나는 차주의 하루 계획 안 빈칸으로
            들어간 것입니다. 개별 배차보다 평균 성사가 빠르고 운임도 낮습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
