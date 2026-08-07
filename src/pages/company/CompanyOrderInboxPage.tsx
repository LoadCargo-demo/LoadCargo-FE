// Figma node: 433:2434 (Desktop - 1) → C1. 오더 수신함 - 카톡/문자 자동 정규화
// 화주가 카톡/문자로 보낸 비정형 오더를 AI가 구조화 테이블로 정규화하는 화면.
// (멘토링 D5: DX 서사의 1번 기능 — 카톡에 갇힌 데이터를 꺼내는 화면)

import CompanySidebar from '../../components/company/CompanySidebar';

type RawMessage = {
  sender: string;
  text: string;
};

type NormalizedRow = {
  no: number;
  route: string;
  cargo: string;
  timeWindow: string;
  loading: string;
  needsCheck?: boolean;
};

const RAW_MESSAGES: RawMessage[] = [
  {
    sender: '한성 대한 부품 단톡',
    text: '내일 오전 9에 양산에서 군포로 파렛트 6개 보낼게요. 지게차 있습니다.',
  },
  {
    sender: '김해 A물류',
    text: '내일 김해 → 인천 파렛트 8개 15시 상차 가능한 차 있나요?',
  },
  {
    sender: '창원 협력사',
    text: '평택 건 물량 좀 늘었습니다. 4파렛 → 6파렛',
  },
];

const NORMALIZED_ROWS: NormalizedRow[] = [
  {
    no: 1,
    route: '양산 → 군포',
    cargo: '파렛트 6',
    timeWindow: '7/29 09:00',
    loading: '지게차',
  },
  {
    no: 2,
    route: '김해 → 인천',
    cargo: '파렛트 8',
    timeWindow: '7/29 15:00',
    loading: '지게차',
  },
  {
    no: 3,
    route: '창원 → 평택',
    cargo: '파렛트 6',
    timeWindow: '7/29 19:00',
    loading: '지게차',
  },
  {
    no: 4,
    route: '부산 → 대전',
    cargo: '“많음”',
    timeWindow: '미정',
    loading: '확인 필요',
    needsCheck: true,
  },
  {
    no: 5,
    route: '대구 → 천안',
    cargo: '파렛트 7',
    timeWindow: '7/29 09:00',
    loading: '지게차',
  },
  {
    no: 6,
    route: '광주 → 오산',
    cargo: '파렛트 5',
    timeWindow: '7/29 14:00',
    loading: '지게차',
  },
  {
    no: 7,
    route: '안성 → 익산',
    cargo: '파렛트 10',
    timeWindow: '7/29 16:00',
    loading: '지게차',
  },
  {
    no: 8,
    route: '포항 → 김해',
    cargo: '파렛트 4',
    timeWindow: '7/29 16:30',
    loading: '지게차',
  },
  {
    no: 9,
    route: '평택 → 세종',
    cargo: '파렛트 8',
    timeWindow: '7/30 10:00',
    loading: '지게차',
  },
];

export default function CompanyOrderInboxPage() {
  const totalCount = NORMALIZED_ROWS.length + 3; // 정규화 실패분 등 데모용 여유치
  const needsCheckCount = NORMALIZED_ROWS.filter((r) => r.needsCheck).length;
  const okCount = totalCount - needsCheckCount;

  return (
    <div className="flex h-screen bg-white text-black">
      <CompanySidebar active="orderInbox" orderInboxBadge={totalCount} />

      <div className="flex-1 flex flex-col p-[24px] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-baseline gap-[14px]">
            <h1 className="text-[36px] font-semibold tracking-[-0.144px]">
              오늘 들어온 오더
            </h1>
            <span className="text-[64px] font-semibold text-[color:var(--color-action-primary)] tracking-[-0.256px] leading-none">
              {totalCount}
            </span>
            <span className="text-[36px] font-semibold tracking-[-0.144px]">
              건
            </span>
          </div>

          <div className="flex gap-[15px] text-[16px] font-semibold tracking-[-0.064px]">
            <span className="bg-[#a0a0a0] text-white rounded-[15px] px-[10px] py-[8px]">
              AI 자동 판독 {okCount}
            </span>
            <span className="border-2 border-red-600 text-red-600 rounded-[15px] px-[10px] py-[8px]">
              확인 필요 {needsCheckCount}
            </span>
          </div>
        </div>

        <div className="flex gap-[20px] flex-1 min-h-0">
          {/* 좌측: 원문 */}
          <div className="w-[400px] flex flex-col border border-[#bfbfbf] rounded-[10px] px-[17px] pt-[24px] pb-[32px] overflow-y-auto">
            <div className="flex items-center gap-[16px] mb-[16px] text-[24px]">
              <span className="font-medium">원문</span>
              <span className="flex items-center gap-[10px] text-[15px] font-semibold">
                <span>카톡방</span>
                <span className="text-[rgba(0,0,0,0.44)]">문자</span>
              </span>
            </div>

            <div className="flex flex-col gap-[24px]">
              {RAW_MESSAGES.map((msg, i) => (
                <div key={i} className="flex flex-col gap-[5px]">
                  <p className="text-[13px] font-semibold text-[#707378]">
                    {msg.sender}
                  </p>
                  <div className="bg-[var(--color-blue-50)] border border-[var(--color-blue-090)] rounded-[10px] p-[17px] text-[16px]">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div className="bg-[var(--color-blue-50)] border border-[var(--color-blue-090)] rounded-[10px] p-[17px] text-[16px] font-bold">
                ...
              </div>
            </div>
          </div>

          {/* 우측: 정규화 결과 */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-[8px] mb-[16px] text-[24px] font-medium">
              <span>정규화 결과</span>
              <span className="bg-[#a0a0a0] text-white text-[12px] font-bold rounded-[4px] px-[6px] py-[4px]">
                AI 판독
              </span>
            </div>

            <div className="flex-1 overflow-y-auto border border-[#737373] rounded-[10px]">
              <table className="w-full text-[16px] text-center border-collapse table-fixed">
                <colgroup>
                  <col className="w-[8%]" />
                  <col className="w-[24%]" />
                  <col className="w-[21%]" />
                  <col className="w-[29%]" />
                  <col className="w-[18%]" />
                </colgroup>
                <thead className="bg-[#f6f6f6] sticky top-0">
                  <tr className="text-[15px] text-[rgba(0,0,0,0.6)] tracking-[0.28px]">
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px] w-[45px]" />
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                      구간
                    </th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                      화물
                    </th>
                    <th className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                      시간창
                    </th>
                    <th className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                      상하차
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NORMALIZED_ROWS.map((row) => (
                    <tr
                      key={row.no}
                      className={
                        row.needsCheck ? 'bg-[#fff0f0] text-red-600' : ''
                      }
                    >
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                        {row.no}
                      </td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                        {row.route}
                      </td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                        {row.cargo}
                      </td>
                      <td className="border-b border-r border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                        {row.timeWindow}
                      </td>
                      <td className="border-b border-[rgba(0,0,0,0.35)] px-[18px] py-[10px]">
                        {row.loading}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 확인 필요 알림 (테이블 위 플로팅) */}
            {needsCheckCount > 0 && (
              <div className="absolute bottom-[10px] right-[10px] bg-[#fff0f0] border border-red-600 rounded-[15px] shadow-lg px-[18px] py-[10px] flex flex-col gap-[20px] w-[364px]">
                <p className="text-[20px] text-red-600">4번 항목 확인 필요</p>
                <div className="flex gap-[12px] justify-end">
                  <button className="bg-white border border-[#191b24] rounded-[15px] px-[12px] py-[8px] text-[16px]">
                    화주에게 되묻기
                  </button>
                  <button className="bg-white border border-[#191b24] rounded-[15px] px-[12px] py-[8px] text-[16px]">
                    과거 데이터 평균값 적용
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="flex gap-[8px] mt-[20px]">
          <button className="border-2 border-[var(--color-action-primary)] text-[color:var(--color-action-primary)] font-bold text-[24px] rounded-[12px] h-[52px] w-[260px]">
            원문 대조
          </button>
          <button className="flex-1 bg-[var(--color-action-primary)] text-white font-bold text-[24px] rounded-[12px] h-[52px]">
            {okCount}건 확정하고 배치 보드로
          </button>
        </div>
      </div>
    </div>
  );
}
