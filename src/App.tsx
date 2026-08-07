import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MobileLayout from './layouts/MobileLayout';
import { ROUTES } from './router/routes';

// 화주(업체) 콘솔 — 데스크톱 화면, 자체 사이드바를 쓰므로 MobileLayout 밖에 둠
import CompanyOrderInboxPage from './pages/company/CompanyOrderInboxPage';
import CompanyDispatchBoardPage from './pages/company/CompanyDispatchBoardPage';
import CompanyNegotiationAgentPage from './pages/company/CompanyNegotiationAgentPage';
import CompanyNegotiationStatusPage from './pages/company/CompanyNegotiationStatusPage';
import CompanyGuaranteeDashboardPage from './pages/company/CompanyGuaranteeDashboardPage';
import CompanyPricingArchivePage from './pages/company/CompanyPricingArchivePage';
import CompanyDailyReportPage from './pages/company/CompanyDailyReportPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 하단 탭바가 있는 화면들 (차주 모바일 앱) */}
        <Route element={<MobileLayout />}></Route>

        {/* 탭바 없이 독립적으로 쓰는 화면 (온보딩 등) */}

        {/* 화주(업체) 콘솔 */}
        <Route
          path={ROUTES.companyOrders}
          element={<CompanyOrderInboxPage />}
        />
        <Route
          path={ROUTES.companyDispatchBoard}
          element={<CompanyDispatchBoardPage />}
        />
        {/* 용차 협상: C3(단가 에이전트)와 C4(진행 현황)를 하위 경로로 분리 */}
        <Route
          path={ROUTES.companyNegotiation}
          element={<CompanyNegotiationStatusPage />}
        />
        <Route
          path={`${ROUTES.companyNegotiation}/:orderId`}
          element={<CompanyNegotiationAgentPage />}
        />
        <Route
          path={ROUTES.companyGuarantee}
          element={<CompanyGuaranteeDashboardPage />}
        />
        <Route
          path={ROUTES.companyPricingArchive}
          element={<CompanyPricingArchivePage />}
        />
        <Route
          path={ROUTES.companyDailyReport}
          element={<CompanyDailyReportPage />}
        />

        {/* 하단 탭바가 있는 화면들 */}
        <Route element={<MobileLayout />}></Route>

        {/* 탭바 없이 독립적으로 쓰는 화면 (온보딩 등) */}
      </Routes>
    </BrowserRouter>
  );
}
