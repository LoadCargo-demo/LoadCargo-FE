import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MobileLayout from './layouts/MobileLayout';
import { ROUTES } from './router/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 하단 탭바가 있는 화면들 */}
        <Route element={<MobileLayout />}></Route>

        {/* 탭바 없이 독립적으로 쓰는 화면 (온보딩 등) */}
      </Routes>
    </BrowserRouter>
  );
}
