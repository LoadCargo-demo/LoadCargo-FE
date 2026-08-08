// Figma node: 647:6599 (Desktop - 14) → C7. 하루 마감 리포트
// 하루치 용차 협상 건별 결과 + AI 학습 포인트(다음 협상 시작가 자동 보정) +
// 배차 완결/평균 체결/수배 소요/패키지 편입 요약 카드. 하루 사이클의 마지막 화면.

import CompanySidebar from "../../components/company/CompanySidebar";
import { CheckCircle2, Receipt, Clock, PackageCheck } from "lucide-react";

type DealRow = {
  no: number;
  route: string;
  basePrice: string;
  closedPrice: string;
  duration: string;
  route2: "패키지" | "개별";
  overBudget?: boolean;
};

const DEAL_ROWS: DealRow[] = [
  { no: 1, route: "양산 → 군포", basePrice: "135,000", closedPrice: "142,000", duration: "38분", route2: "패키지" },
  { no: 2, route: "부산 →대전", basePrice: "380,000", closedPrice: "380,000", duration: "26분", route2: "개별" },
  { no: 3, route: "창원 → 평택", basePrice: "350,000", closedPrice: "358,000", duration: "1시간 04분", route2: "패키지" },
  { no: 4, route: "김해 → 인천", basePrice: "420,000", closedPrice: "465,000", duration: "1시간 22분", route2: "개별", overBudget: true },
  { no: 5, route: "울산 → 이천", basePrice: "410,000", closedPrice: "460,000", duration: "1시간 10분", route2: "개별" },
];

const SUMMARY_ITEMS = [
  { icon: CheckCircle2, iconColor: "text-[#70b492]", label: "배차 완결", value: "37 /37", sub: "펑크 0건", subColor: "text-[#70b492]" },
  { icon: Receipt, iconColor: "text-[#191919]", label: "용차 5건 평균 체결", value: "381,000", sub: "기준 단가표 대비 ▼9,400원", subColor: "text-[#b5b8bc]" },
  { icon: Clock, iconColor: "text-[#191919]", label: "수배 소요 합계", value: "4시간 20분", sub: "기존 방식 대비 ▼13시간", subColor: "text-[#be7592]" },
  { icon: PackageCheck, iconColor: "text-[#191919]", label: "하루 패키지 편입", value: "2건", sub: "개별 배차 대비 ▼38분", subColor: "text-[#769bf4]" },
];

export default function CompanyDailyReportPage() {
  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="dailyReport" />

      <div className="flex-1 grid grid-cols-[633px_446px] gap-[36px] p-[24px] overflow-y-auto">
        {/* 좌측: 건별 결과 */}
        <div className="flex flex-col gap-[24px]">
          <h1 className="text-[32px] font-semibold">7월 29일 화요일 마감</h1>

          <div>
            <h2 className="text-[24px] font-medium mb-[16px]">건별 결과</h2>
            <div className="border border-black rounded-[10px] overflow-hidden">
              <table className="w-full text-[16px] text-center border-collapse">
                <thead className="bg-[#f6f6f6]">
                  <tr className="text-[15px] text-[rgba(0,0,0,0.6)]">
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] w-[37px]" />
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">구간</th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">기준가</th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">체결가</th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">소요</th>
                    <th className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">경로</th>
                  </tr>
                </thead>
                <tbody>
                  {DEAL_ROWS.map((row) => (
                    <tr key={row.no} className={row.overBudget ? "bg-[#fff0f0]" : ""}>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.no}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.route}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.basePrice}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] font-bold">{row.closedPrice}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.duration}</td>
                      <td className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.route2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 우측: AI 학습 포인트 + 요약 카드 + 완료 보고 */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[5px]">
            <span className="bg-[#a0a0a0] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px] w-fit">
              AI 학습 포인트 - 자동적립
            </span>
            <div className="bg-[#f0f0f0] rounded-[20px] p-[16px]">
              <ul className="list-disc text-[#737373] text-[14px] leading-[21px] ps-[18px] flex flex-col gap-[8px]">
                <li>
                  김해→ 인천 12~15시 상차는 예측(475,000)보다{" "}
                  <b className="text-black">1만원 낮게(465,000)</b> 체결. 시작가 모델 하향 조정
                </li>
                <li>
                  울산 → 이천은 3주 연속 기준가 미달로 성사. <b className="text-black text-[16px]">기준 단가표 갱신 제안</b>
                </li>
                <li>
                  하루 패키지 편입 건은 개별 배차보다 평균 <b className="text-black text-[16px]">38분 빨랐음</b>
                </li>
              </ul>
            </div>
            <button className="self-end border border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] text-[16px] font-semibold rounded-[15px] px-[10px] py-[8px]">
              기준 단가표 2건 갱신하기 →
            </button>
          </div>

          {/* 요약 카드 */}
          <div className="bg-white rounded-[10px] shadow-lg p-[20px] flex flex-col gap-[24px]">
            {SUMMARY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-[13px]">
                  <div className="size-[65px] rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                    <Icon className={`size-[28px] ${item.iconColor}`} />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px] text-[#666]">{item.label}</p>
                    <div className="flex items-end gap-[8px]">
                      <p className="text-[20px] font-bold">{item.value}</p>
                      <p className={`text-[12px] ${item.subColor}`}>{item.sub}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="bg-[var(--color-action-primary)] text-white font-bold text-[24px] rounded-[12px] h-[52px]">
            화주 3곳에 운송 완료 보고 발송
          </button>
        </div>
      </div>
    </div>
  );
}
