/**
 * 라우트 경로를 문자열로 흩뿌리지 않고 여기서 한 번에 관리합니다.
 * 페이지 이동 시 <Link to={ROUTES.home} /> 처럼 사용하세요.
 */
export const ROUTES = {
  home: "/",
  offer: "/offer",
  negotiation: "/negotiation",
  myCriteria: "/my-criteria",
  onboarding: "/onboarding",
} as const;

export type RouteKey = keyof typeof ROUTES;
