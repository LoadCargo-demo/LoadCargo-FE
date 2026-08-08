// Figma node: 647:6462 (Desktop - 13) → C6. 단가 노하우 아카이브
// 멘토링 D7 "암묵지 확장: 배차 담당자 노하우까지"의 핵심 화면.
// 시간대별 체결 단가 통계 + 담당자들이 남긴 현장 메모(퇴사해도 기록은 남음)를
// AI가 구간·시간대·조건으로 자동 태깅해 다음 협상 시작가에 반영한다.

import CompanySidebar from "../../components/company/CompanySidebar";

type TimeSlotRow = {
  no: number;
  timeSlot: string;
  avgClosed: string;
  startRecommend: string;
  avgDuration: string;
  highlighted?: boolean;
};

const TIME_SLOT_ROWS: TimeSlotRow[] = [
  { no: 1, timeSlot: "06~09시", avgClosed: "438,000", startRecommend: "420,000", avgDuration: "42분" },
  { no: 2, timeSlot: "09~12시", avgClosed: "452,000", startRecommend: "435,000", avgDuration: "1시간 05분" },
  { no: 3, timeSlot: "12~15시", avgClosed: "486,000", startRecommend: "465,000", avgDuration: "3시간 20분", highlighted: true },
  { no: 4, timeSlot: "15~18시", avgClosed: "505,000", startRecommend: "480,000", avgDuration: "2시간 40분" },
];

type FieldNote = {
  author: string;
  date: string;
  resigned?: boolean;
  lines: string[];
};

const FIELD_NOTES: FieldNote[] = [
  { author: "이정훈", date: "3월", lines: ["명절 전주는 42만으로는 절 대 안 잡힘.", "처음부터 50만 불러야 함"] },
  {
    author: "박○○",
    date: "작년 11월",
    resigned: true,
    lines: ["김해 A물류는 상차 대기가 길어서", "기사들이 기피. 5천원 더 주면 잡힘"],
  },
  { author: "이정훈", date: "6월", lines: ["비 오는 날 파렛트 화물은 윙바디만 찾음.", "카고는 아예안 잡힘"] },
];

export default function CompanyPricingArchivePage() {
  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="pricingArchive" />

      <div className="flex-1 grid grid-cols-[550px_512px] gap-[40px] p-[24px] overflow-y-auto">
        {/* 좌측: 시간대별 체결 단가 */}
        <div className="flex flex-col gap-[24px]">
          <h1 className="text-[32px] font-semibold">
            김해 → 인천 <span className="font-bold">•</span> 5톤급
          </h1>

          <div>
            <h2 className="text-[24px] font-medium mb-[16px]">시간대 별 체결 단가</h2>
            <div className="border border-black rounded-[10px] overflow-hidden">
              <table className="w-full text-[16px] text-center border-collapse">
                <thead className="bg-[#f6f6f6]">
                  <tr className="text-[15px] text-[rgba(0,0,0,0.6)]">
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] w-[37px]" />
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">상차 시간</th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">평균 체결</th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">시작 권장</th>
                    <th className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">평균 소요</th>
                  </tr>
                </thead>
                <tbody>
                  {TIME_SLOT_ROWS.map((row) => (
                    <tr key={row.no} className={row.highlighted ? "bg-[#fff0f0]" : ""}>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.no}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.timeSlot}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.avgClosed}</td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.startRecommend}</td>
                      <td className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">{row.avgDuration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI 제안 */}
          <div className="border border-[#a0a0a0] rounded-[12px] p-[16px] flex gap-[10px]">
            <span className="bg-[#a0a0a0] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px] shrink-0 h-fit">
              AI 제안
            </span>
            <p className="text-[14px] text-[#707378] leading-[21px]">
              오후 상차는 오전보다 5만원 비싸고 세 배 오래걸립니다. 가능하면{" "}
              <b className="text-[16px] text-[#5fa4ff]">오전 상차로 협의</b>하는 것이 유리합니다.
            </p>
          </div>

          <button className="border-2 border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] font-bold text-[24px] rounded-[12px] h-[52px]">
            신입 온보딩용 요약 보기
          </button>
        </div>

        {/* 우측: 현장 메모 */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <h2 className="text-[24px] font-medium">현장 메모</h2>
            <span className="border border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] text-[12px] font-bold rounded-[4px] px-[6px] py-[4px]">
              담당자 기록 • 자동 구조화
            </span>
          </div>

          <div className="border border-[#a0a0a0] rounded-[10px] flex flex-col divide-y divide-[#a0a0a0]">
            {FIELD_NOTES.map((note, i) => (
              <div key={i} className="px-[33px] py-[22px] flex flex-col gap-[17px]">
                <div className="flex items-center gap-[8px]">
                  <div className="size-[37px] rounded-full bg-[#dcebff] shrink-0" />
                  <span className="font-semibold text-[20px]">{note.author}</span>
                  <span className="text-[#a0a0a0] text-[16px]">• {note.date}</span>
                  {note.resigned && (
                    <span className="bg-[#a0a0a0] text-white text-[16px] rounded-[10px] px-[10px]">퇴사</span>
                  )}
                </div>
                <div className="text-[16px]">
                  {note.lines.map((line, j) => (
                    <p key={j} className="leading-[1.42]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center py-[16px]">
              <button className="bg-[var(--color-action-primary)] text-white font-bold text-[24px] rounded-[12px] h-[52px] px-[24px] flex items-center gap-[8px]">
                + 메모 추가
              </button>
            </div>
          </div>

          {/* AI 메모 안내 배너 (핵심 메시지: 퇴사자 기록도 남는다) */}
          <div className="bg-[#eff6ff] rounded-[12px] p-[16px] flex gap-[10px]">
            <span className="bg-[var(--color-action-primary)] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px] shrink-0 h-fit">
              AI 메모
            </span>
            <p className="text-[14px] text-[#5fa4ff] leading-[21px]">
              메모는 구간 • 시간대 • 조건으로 자동 태깅되어{" "}
              <b className="text-[16px]">다음 협상의 시작가 산출에 반영</b>됩니다. 퇴사자의 기록도 남습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
