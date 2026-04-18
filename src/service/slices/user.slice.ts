import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../../utils/types';
import { getUserData } from '../Async/auth';

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuth = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) state.user = action.payload;
        if (state.user) {
          state.isAuth = true;
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.isLoading = true;
      });
  },
  selectors: {
    isLoaingUser: (state) => state.isLoading,
    isUserData: (state) => state.user,
    isAuth: (state) => state.isAuth,
  },
});

export const { reducer } = userSlice;
export const { authChecked, clearUser } = userSlice.actions;
export const { isLoaingUser, isUserData, isAuth } = userSlice.selectors;
