import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Auction } from '../pages/Auction/auction';
import { Auth } from '../pages/Auth/auth';
import { MainPage } from '../pages/Main/main';
import { Code } from '../pages/Auth/code';
import { useEffect } from 'react';
import type { AppDispatch } from '../../service/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { getUserData } from '../../service/Async/auth';
import { isLoadingSelector } from '../../service/slices/auth.slice';
import { isUserData } from '../../service/slices/user.slice';
import { AnalyticsPage } from '../pages/Analytics/analytics';
import { AnalyticCardPage } from '../pages/AnalyticCardPage';
import { ProfileLayout } from '../pages/Profile/profile-layout';
import Inventory from '../pages/Profile/inventory/inventory';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch: AppDispatch = useDispatch();
  let isCookie = getCookie('accessToken');
  const isStorage = localStorage.getItem('refreshToken');
  const userData = useSelector(isUserData);

  useEffect(() => {
    if (isCookie && isStorage) {
      if (userData === null) {
        console.log('do it');

        dispatch(getUserData({ access_token: isCookie, refresh_token: isStorage }));
      }
    }
  }, [isLoadingSelector]);
  return (
    <>
      <div>
        <Routes location={backgroundLocation || location}>
          <Route path="/main" element={<MainPage />} />
          <Route
            path="/auth"
            element={
              <ProtectedRoute onlyUnAuth="NoAuth">
                <Auth />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction"
            element={
              // <ProtectedRoute onlyUnAuth="Auth">
              <Auction />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/code"
            element={
              <ProtectedRoute onlyUnAuth="NoAuth">
                <Code />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute onlyUnAuth="Auth">
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/:id"
            element={
              <ProtectedRoute onlyUnAuth="Auth">
                <AnalyticCardPage />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <ProtectedRoute onlyUnAuth="Auth">
              <ProfileLayout />
              // </ProtectedRoute>
            }
          >
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
