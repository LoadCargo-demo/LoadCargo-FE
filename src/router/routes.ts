/**
 * 라우트 경로를 문자열로 흩뿌리지 않고 여기서 한 번에 관리합니다.
 * 페이지 이동 시 <Link to={ROUTES.home} /> 처럼 사용하세요.
 */
export const ROUTES = {
  home: '/',
  offer: '/offer',
  negotiation: '/negotiation',
  myCriteria: '/my-criteria',
  onboarding: '/onboarding',

  // 화주(업체) 콘솔 — 데스크톱 전용, 하단 탭바 없음
  companyOrders: '/company/orders',
  companyDispatchBoard: '/company/dispatch-board',
  companyNegotiation: '/company/negotiation',
  companyGuarantee: '/company/guarantee',
  companyPricingArchive: '/company/pricing-archive',
  companyDailyReport: '/company/daily-report',
} as const;

export type RouteKey = keyof typeof ROUTES;
