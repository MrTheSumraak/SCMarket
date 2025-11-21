// store/itemsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { TItemConfig } from '../../utils/types';
import { getItems } from '../Async/items';

export interface IAllItems {
  weapons: TItemConfig[];
  armors: TItemConfig[];
  artefacts: TItemConfig[];
  bullet: TItemConfig[];
  other: TItemConfig[];
  misc: TItemConfig[];
  medicine: TItemConfig[];
  grenade: TItemConfig[];
  food: TItemConfig[];
  attachment: TItemConfig[];
  backpacks: TItemConfig[];
  containers: TItemConfig[];
  drink: TItemConfig[];
  weapon_skins: TItemConfig[];
  armor_skins: TItemConfig[];
  loading: boolean;
}

const initialState: IAllItems = {
  weapons: [],
  armors: [],
  artefacts: [],
  bullet: [],
  other: [],
  misc: [],
  medicine: [],
  grenade: [],
  food: [],
  attachment: [],
  backpacks: [],
  containers: [],
  drink: [],
  weapon_skins: [],
  armor_skins: [],
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
        // Разделяем по категориям
        state.weapons = action.payload.weapons || [];
        state.armors = action.payload.armors || [];
        state.artefacts = action.payload.artefacts || [];
        state.weapon_skins = action.payload.weaponSkins || [];
        state.bullet = action.payload.bullet || [];
        state.other = action.payload.other || [];
        state.misc = action.payload.misc || [];
        state.medicine = action.payload.medicine || [];
        state.grenade = action.payload.grenade || [];
        state.food = action.payload.food || [];
        state.attachment = action.payload.attachment || [];
        state.backpacks = action.payload.backpacks || [];
        state.containers = action.payload.containers || [];
        state.drink = action.payload.drink || [];
        state.armor_skins = action.payload.armor_skins || [];
        state.loading = false;
      })
      .addCase(getItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Селекторы отдельно
export const selectAllGuns = (state: { items: IAllItems }) => state.items.weapons;
export const selectAllArmors = (state: { items: IAllItems }) => state.items.armors;
export const selectAllArtefacts = (state: { items: IAllItems }) => state.items.artefacts;
export const selectItemsLoading = (state: { items: IAllItems }) => state.items.loading;
export const selectAllItems = (state: {items: IAllItems}) => state.items

export const {reducer} = itemsSlice
