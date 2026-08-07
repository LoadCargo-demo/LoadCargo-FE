// Figma node: 286:5701 (_System/StatusBar)
// 모바일 화면 최상단에 고정으로 붙는 상태바입니다. 시각은 정적 텍스트이며,
// 실 서비스에서는 부모에서 현재 시각을 props로 내려주도록 확장하세요.

const imgNetworkSignalLight =
  "https://www.figma.com/api/mcp/asset/49b1698e-15dd-4622-9ebf-5938552ba685.svg";
const imgWiFiSignalLight =
  "https://www.figma.com/api/mcp/asset/cc0621fb-c035-492e-a25f-ddf476928564.svg";
const imgBatteryLight =
  "https://www.figma.com/api/mcp/asset/3b7d9374-94c3-401e-aa47-8630aa2c1c18.svg";

export type SystemStatusBarProps = {
  className?: string;
  time?: string;
};

export default function SystemStatusBar({ className, time = "9:41" }: SystemStatusBarProps) {
  return (
    <div
      className={
        className ||
        "bg-[var(--color-white-1000)] h-[45px] overflow-clip relative w-full max-w-[390px]"
      }
      data-name="_System/StatusBar"
    >
      <div className="absolute content-stretch flex gap-[4px] items-center right-[14px] top-[16px]">
        <div className="h-[14px] relative shrink-0 w-[20px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNetworkSignalLight} />
        </div>
        <div className="h-[14px] relative shrink-0 w-[16px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWiFiSignalLight} />
        </div>
        <div className="h-[14px] relative shrink-0 w-[25px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBatteryLight} />
        </div>
      </div>
      <div className="absolute h-[21px] left-[10px] overflow-clip rounded-[20px] top-[12px] w-[54px]">
        <p
          className="-translate-x-1/2 absolute font-semibold leading-normal left-[27px] not-italic text-[15px] text-[color:var(--color-black-900)] text-center top-[calc(50%-8.5px)] tracking-[-0.3px] w-[54px]"
          style={{ fontFamily: "'SF Pro Text', sans-serif" }}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
