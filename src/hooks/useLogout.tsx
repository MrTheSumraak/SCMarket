import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../service/store';
import { deleteCookie } from '../utils/cookie';
import { clearUser } from '../service/slices/user.slice';
import React from 'react';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Хук возвращает функцию, а не хук
  return React.useCallback(() => {
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(clearUser());
    navigate('/auth', { replace: true });
  }, [dispatch, navigate]);
};
