// store/itemsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getAllItem } from '../../utils/SCApi';
import { getItems } from '../Async/items';

export type TItemGun = {
  id: string;
  name: string;
  color: string;
  type: string;
  maxDistance: number;
  startDamage: number;
  endDamage: number;
};

export type TItemArtefact = {};

export type TItemArmor = {
  id: string;
  name: string;
  color: string;
  type: string;
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
        console.log(action.payload);
      });
  },
});

export const { reducer } = itemsSlice;
export default itemsSlice.reducer;
