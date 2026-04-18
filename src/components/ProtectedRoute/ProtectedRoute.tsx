import { useEffect, type FC, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../service/store';
import { getCookie } from '../../utils/cookie';
import { authChecked, isUserData } from '../../service/slices/user.slice';
import { getUserData } from '../../service/Async/auth';

type TProtectedRoute = {
  children: ReactNode;
  onlyUnAuth?: 'Auth' | 'NoAuth' | 'Only';
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, onlyUnAuth }) => {
  const isUser = useSelector(isUserData);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (isUser && accessToken && refreshToken) {
      dispatch(authChecked());
    } else if (accessToken && refreshToken) {
      dispatch(getUserData({ access_token: accessToken, refresh_token: refreshToken }));
    } else {
      navigate('/auth');
    }
  }, []);

  if (onlyUnAuth === 'NoAuth' && isUser) {
    const from = location.state?.from || { pathname: '/auction' };
    return <Navigate replace to={from} />;
  }

  if (onlyUnAuth === 'Auth' && !isUser) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
