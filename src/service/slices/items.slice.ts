import { createSlice } from '@reduxjs/toolkit';
import type { IItems } from '../../utils/types';

export interface IAuctionState {
  isLoading: boolean;
  items: IItems[] | null;
}
const initialState: IAuctionState = {
  isLoading: true,
  items: null,
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    enableLoading: (state) => {
      state.isLoading = true;
    },
    disableLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
  selectors: {
    isLoadingAuction: (state) => state.isLoading,
  },
});

export const { reducer } = auctionSlice;
export const { isLoadingAuction } = auctionSlice.selectors;
export const { enableLoading, disableLoading } = auctionSlice.actions;
