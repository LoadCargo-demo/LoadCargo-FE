// Figma node: 535:2710 (Desktop - 12) → C5. 배차 보증 대시보드
// 멘토링 D3 "배차 책임에 대한 답"의 핵심 화면. 화주가 걱정하는
// "내 화물이 실릴 확률"에 대해 안정/주의로 나누고, 이탈 위험 건마다
// 백업 차주·대체 소요시간 등 사전 조치를 보여줘 배차 책임을 보증한다.

import CompanySidebar from "../../components/company/CompanySidebar";

type RiskRow = {
  no: number;
  route: string;
  driver: string;
  driverType: string;
  riskReason: string;
  riskSub?: string;
  churnRate: number;
  action: string;
  actionSub: string;
};

const RISK_ROWS: RiskRow[] = [
  {
    no: 1,
    route: "울산 → 이천",
    driver: "박○○",
    driverType: "개별",
    riskReason: "상차 지연",
    riskSub: "이력 2회",
    churnRate: 22,
    action: "백업 차주 2명 대기",
    actionSub: "대체 시 +8분, 운임 동일",
  },
  {
    no: 2,
    route: "김해 → 인천",
    driver: "협상 중",
    driverType: "",
    riskReason: "미확정",
    riskSub: "상차 5시간 전",
    churnRate: 32,
    action: "고정차 1대 예비 지정",
    actionSub: "14:00까지 미성사 시 자동 투입",
  },
  {
    no: 3,
    route: "창원 → 평택",
    driver: "김만수",
    driverType: "패키지",
    riskReason: "앞 구간 지연가능",
    churnRate: 14,
    action: "패키지 내 재조립으로 흡수 가능",
    actionSub: "차주 앱에서 자동 처리",
  },
];

export default function CompanyGuaranteeDashboardPage() {
  const totalConfirmed = 37;
  const stableCount = 34;
  const cautionCount = 3;
  const stablePercent = (stableCount / totalConfirmed) * 100;
  const cautionPercent = (cautionCount / totalConfirmed) * 100;

  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="guarantee" />

      <div className="flex-1 flex flex-col p-[24px] overflow-y-auto">
        {/* 상단: 오늘 확정 배차 + 안정/주의 게이지 + 평균 대체 소요 */}
        <div className="flex gap-[16px] mb-[24px]">
          <div className="flex-1 border border-[#a0a0a0] rounded-[10px] px-[35px] py-[28px] flex gap-[50px] items-center">
            <div className="flex flex-col gap-[15px]">
              <p className="text-[15px] text-[#666]">오늘 확정 배차</p>
              <p className="text-[32px] font-semibold">{totalConfirmed}건</p>
            </div>
            <div className="flex-1 flex flex-col gap-[16px]">
              <div className="flex gap-[18px] items-end">
                <div className="flex-1 flex flex-col gap-[3px]">
                  <p className="text-[15px] font-semibold text-[color:var(--color-action-primary)]">안정</p>
                  <div className="bg-[#e4e4e4] h-[20px] rounded-[2px] overflow-hidden">
                    <div
                      className="bg-[var(--color-action-primary)] h-full rounded-[2px]"
                      style={{ width: `${stablePercent}%` }}
                    />
                  </div>
                </div>
                <p className="text-[16px] whitespace-nowrap">{stableCount} /{totalConfirmed} 건</p>
              </div>
              <div className="flex gap-[18px] items-end">
                <div className="flex-1 flex flex-col gap-[3px]">
                  <p className="text-[15px] font-semibold text-[#ff4b4b]">주의</p>
                  <div className="bg-[#e4e4e4] h-[20px] rounded-[2px] overflow-hidden">
                    <div className="bg-[#ff4b4b] h-full rounded-[2px]" style={{ width: `${cautionPercent}%` }} />
                  </div>
                </div>
                <p className="text-[16px] whitespace-nowrap">{cautionCount} /{totalConfirmed} 건</p>
              </div>
            </div>
          </div>

          <div className="w-[170px] rounded-full border border-[#e4e4e4] flex flex-col items-center justify-center gap-[7px]">
            <p className="text-[20px] font-semibold text-[#626262] text-center">평균 대체 소요</p>
            <p className="text-[40px] font-semibold text-[#626262]">18분</p>
          </div>
        </div>

        {/* 주의 목록 */}
        <div className="flex items-center gap-[8px] mb-[16px]">
          <h2 className="text-[24px] font-medium">
            <span className="font-bold text-[#ff4b4b]">주의</span> 목록 <span className="font-bold">{cautionCount}</span>건
          </h2>
          <span className="bg-[#ff5b66] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px]">
            AI 리스크 예측 - 이탈 위험 감지
          </span>
        </div>

        <div className="border border-black rounded-[10px] overflow-hidden">
          <table className="w-full text-[16px] text-center border-collapse">
            <thead className="bg-[#f6f6f6]">
              <tr className="text-[15px] text-[rgba(0,0,0,0.6)]">
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] w-[44px]" />
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">구간 / 화주</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">배차 기사</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">위험 사유</th>
                <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">이탈 확률</th>
                <th className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">사전 조치</th>
              </tr>
            </thead>
            <tbody>
              {RISK_ROWS.map((row) => (
                <tr key={row.no} className="bg-[#fff0f0]">
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.no}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.route}</td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                    {row.driver}
                    {row.driverType && <span className="text-[#707070]"> ({row.driverType})</span>}
                  </td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                    <p>{row.riskReason}</p>
                    {row.riskSub && <p className="text-[#707070]">{row.riskSub}</p>}
                  </td>
                  <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                    {row.churnRate}
                    <b>%</b>
                  </td>
                  <td className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                    <p className="font-bold">{row.action}</p>
                    <p className="text-[#707070]">{row.actionSub}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 화주 공유 지표 배너 */}
        <div className="bg-[#e7e7e7] rounded-[10px] px-[25px] py-[26px] mt-[16px] flex gap-[40px]">
          <p className="text-[16px] font-bold text-[#a8a8a8] shrink-0 whitespace-nowrap">화주에게 공유되는 지표</p>
          <p className="text-[16px]">배차 확정 여부, 이탈 시 대체 소요 예상 시간, 백업 확보 여부를 제공합니다.</p>
        </div>
      </div>
    </div>
  );
}
