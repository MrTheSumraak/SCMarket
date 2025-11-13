// store/itemsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getItems } from '../Async/items';
import type { TItemRank, TItemType } from '../../utils/types';

export interface INameGuns  {
  args: [],
  key: string,
  lines: {
    ru: string,
    en: string,
    es: string,
    fr: string
  }
}

export interface INameArtefacts {
  args: [],
  key: string,
  lines: {
      ru: string,
      en: string,
      es: string,
      fr: string
  }
}

export type TItemGun = {
  category: TItemType,
  color: TItemRank,
  id: string,
  infoBlocks: [],
  name: INameGuns,
  status: []
};

export type TItemArtefact = {};

export type TItemArmor = {
  id: string;
  name: string;
  color: string;
  type: TItemType;
};

export interface IAllItems {
  guns: TItemGun[];
  armors: TItemArmor[];
  artefacts: TItemArtefact[];
  loading: boolean;
}

export const initialState: IAllItems = {
  guns: [],
  armors: [],
  artefacts: [],
  loading: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {        
        state.guns.push(...action.payload);
        state.loading = false;
      });
  },
  selectors: {
    getAllGuns: (state) => state.guns,
    isLoading: (state) => state.loading
  }
});

export const { reducer } = itemsSlice;
export const { getAllGuns, isLoading } = itemsSlice.selectors;
export default itemsSlice.reducer;
