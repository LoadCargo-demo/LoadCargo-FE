// Figma: 433:2436 그룹 (Desktop 시리즈 공통 좌측 사이드바)
// 오더 수신함(C1) / 배치 보드(C2) / 용차 협상(C3·C4) / 배차 보증(C5) / 단가 아카이브(C6) / 마감 리포트(C7)

import { Link } from 'react-router-dom';

export type CompanyMenuKey =
  | 'orderInbox'
  | 'dispatchBoard'
  | 'negotiation'
  | 'guarantee'
  | 'pricingArchive'
  | 'dailyReport';

const MENU_ITEMS: { key: CompanyMenuKey; label: string; path: string }[] = [
  { key: 'orderInbox', label: '오더 수신함', path: '/company/orders' },
  { key: 'dispatchBoard', label: '배치 보드', path: '/company/dispatch-board' },
  { key: 'negotiation', label: '용차 협상', path: '/company/negotiation' },
  { key: 'guarantee', label: '배차 보증', path: '/company/guarantee' },
  {
    key: 'pricingArchive',
    label: '단가 아카이브',
    path: '/company/pricing-archive',
  },
  { key: 'dailyReport', label: '마감 리포트', path: '/company/daily-report' },
];

export type CompanySidebarProps = {
  active: CompanyMenuKey;
  orderInboxBadge?: number;
  userName?: string;
  userTeam?: string;
  companyName?: string;
};

export default function CompanySidebar({
  active,
  orderInboxBadge = 12,
  userName = '이정훈 대리',
  userTeam = '배차팀',
  companyName = '한성로지스',
}: CompanySidebarProps) {
  return (
    <div className="border-r border-[#9e9e9e] flex flex-col gap-[82px] h-full items-start px-[16px] py-[48px] w-[254px] shrink-0">
      <p className="font-bold text-[40px] text-black tracking-[-0.16px] leading-none">
        만차
      </p>

      <nav className="flex flex-col gap-[43px] w-full text-[20px] font-semibold tracking-[-0.08px]">
        {MENU_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              to={item.path}
              className={
                isActive
                  ? 'flex items-center gap-[9px] text-white bg-[var(--color-action-primary)] rounded-[10px] px-[10px] py-[5px] -mx-[10px]'
                  : 'text-[rgba(0,0,0,0.5)]'
              }
            >
              {item.label}
              {isActive &&
                orderInboxBadge != null &&
                item.key === 'orderInbox' && <span>{orderInboxBadge}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#bfbfbf] pt-[16px] w-full mt-auto flex flex-col gap-[10px]">
        <p className="text-[20px] font-semibold text-black tracking-[-0.08px]">
          {userName}
        </p>
        <p className="flex gap-[5px] items-center text-[16px] text-[#707378] tracking-[-0.064px]">
          <span>{userTeam}</span>
          <span className="text-[13px]">•</span>
          <span>{companyName}</span>
        </p>
      </div>
    </div>
  );
}
