// Figma node: 586:5903 (Bottom Navigation Bar (Shell))
// 홈 / 오퍼 / 협상 / 내 기준 4개 탭의 하단 내비게이션 바입니다.
// 아이콘은 Figma에서 내보낸 SVG를 그대로 사용합니다 (7일 후 URL 만료 — 실 서비스 반영 전 로컬로 다운받아 교체하세요).

const imgHome = "https://www.figma.com/api/mcp/asset/405767f7-6f4a-4dcf-b6df-bd8f2b8f6519.svg";
const imgOffer = "https://www.figma.com/api/mcp/asset/441ca717-730b-4ef8-89fa-38d0b26399e1.svg";
const imgNegotiation = "https://www.figma.com/api/mcp/asset/8ed5bd3c-0594-4ffd-b996-18d5f49419d6.svg";
const imgMyCriteria = "https://www.figma.com/api/mcp/asset/d175ee88-202c-4010-a44f-cf9e77832604.svg";

export type BottomTabKey = "home" | "offer" | "negotiation" | "myCriteria";

const TABS: { key: BottomTabKey; label: string; icon: string; iconSize: { w: number; h: number } }[] = [
  { key: "home", label: "홈", icon: imgHome, iconSize: { w: 48, h: 26 } },
  { key: "offer", label: "오퍼", icon: imgOffer, iconSize: { w: 54, h: 24 } },
  { key: "negotiation", label: "협상", icon: imgNegotiation, iconSize: { w: 54.01, h: 28 } },
  { key: "myCriteria", label: "내 기준", icon: imgMyCriteria, iconSize: { w: 53.175, h: 28 } },
];

export type BottomTabBarProps = {
  className?: string;
  activeTab?: BottomTabKey;
  onTabChange?: (tab: BottomTabKey) => void;
};

export default function BottomTabBar({ className, activeTab = "home", onTabChange }: BottomTabBarProps) {
  return (
    <div
      className={
        className ||
        "bg-white drop-shadow-[0px_-4px_8px_rgba(0,0,0,0.05)] flex gap-[33.5px] items-center pb-[24px] pt-[8px] px-[16.75px] relative rounded-tl-[20px] rounded-tr-[20px] w-full max-w-[390px]"
      }
    >
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange?.(tab.key)}
            className="flex flex-col items-center justify-center relative shrink-0 w-[64px]"
            aria-current={isActive ? "page" : undefined}
          >
            <div className="flex flex-col items-start pb-[4px] relative shrink-0">
              <img
                alt={tab.label}
                className="shrink-0"
                style={{ width: tab.iconSize.w, height: tab.iconSize.h, opacity: isActive ? 1 : 0.85 }}
                src={tab.icon}
              />
            </div>
            <span
              className="font-medium text-[11px] text-center whitespace-nowrap leading-[13.75px]"
              style={{ color: isActive ? "#3366ff" : "#434655" }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
      <div className="-translate-x-1/2 absolute bg-[#191b24] bottom-[6px] h-[5px] left-1/2 rounded-[9999px] w-[134px]" />
    </div>
  );
}
