import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataAsync, getUserTokens, refreshToken } from '../../utils/SCApi';
import type { IRefreshToken, ITokensUser, ITokenUser } from '../../utils/types';
import { getCookie, setCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { authChecked, clearUser, isUserData } from '../slices/user.slice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../store';

export const getTokenUser = createAsyncThunk(
  'getTokenUser/new',
  async (code: ITokensUser, thunkApi) => {
    try {
      const results = await getUserTokens(code);

      localStorage.setItem('refreshToken', results.refresh_token);
      setCookie('accessToken', results.access_token);

      thunkApi.dispatch(
        getUserData({
          access_token: results.access_token,
          refresh_token: results.refresh_token,
        }),
      );
    } catch (error) {
      console.log('Ошибка авторизации или получение токенов: ' + error);
    }
  },
);

export const getRefreshToken = createAsyncThunk('refreshToken', async (data: IRefreshToken) => {
  try {
    const results = await refreshToken(data);
    console.log(results);

    //сделать апдейт в локалсторрейдж и куки
  } catch (error) {
    console.log('Ошибка обновления токена: ' + error);
  }
});

export const getUserData = createAsyncThunk('getUserDataAsync', async (data: ITokenUser) => {
  try {
    const results = await getUserDataAsync(data);
    return results;
  } catch (error) {
    console.log('Ошибка получения данных по токену. Ошибка: ' + error);
  }
});

export const useCheckUser = () => {
  const userData = useSelector(isUserData);
  const dispatch = useDispatch<AppDispatch>();

  return () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Если токенов нет — пользователь точно не авторизован
    if (!accessToken && !refreshToken) {
      dispatch(clearUser());
      return;
    }

    // Если токены есть — отмечаем авторизацию
    dispatch(authChecked());
  };
};
