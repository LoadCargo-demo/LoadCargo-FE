import { BrowserRouter, Routes, Route } from "react-router-dom";

import MobileLayout from "./layouts/MobileLayout";
import { ROUTES } from "./router/routes";

import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import NegotiationPage from "./pages/NegotiationPage";
import MyCriteriaPage from "./pages/MyCriteriaPage";
import OnboardingPage from "./pages/OnboardingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 하단 탭바가 있는 화면들 */}
        <Route element={<MobileLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.offer} element={<OfferPage />} />
          <Route path={ROUTES.negotiation} element={<NegotiationPage />} />
          <Route path={ROUTES.myCriteria} element={<MyCriteriaPage />} />
        </Route>

        {/* 탭바 없이 독립적으로 쓰는 화면 (온보딩 등) */}
        <Route path={ROUTES.onboarding} element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
