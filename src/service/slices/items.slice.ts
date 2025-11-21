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
  weapon_modules: TItemConfig[];
  loading?: boolean;
}

// Функция для безопасной загрузки из localStorage
function loadItemsFromStorage(): IAllItems {
  try {
    const stored = localStorage.getItem('ITEMS');
    if (stored) {
      const parsed = JSON.parse(stored) as IAllItems;
      // Проверка, что хотя бы один массив непустой
      if (Object.values(parsed).some(arr => Array.isArray(arr) && arr.length > 0)) {
        return parsed;
      }
    }
  } catch {
    // Если JSON битый, игнорируем
  }

  // Пустая структура
  return {
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
    weapon_modules: [],
    loading: false,
  };
}

const initialState: IAllItems = {
  weapons: [], armors: [], artefacts: [], bullet: [], other: [], misc: [],
  medicine: [], grenade: [], food: [], attachment: [], backpacks: [],
  containers: [], drink: [], weapon_skins: [], armor_skins: [], weapon_modules: [],
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
        Object.assign(state, action.payload); // Переносим все поля
        state.loading = false;
      })
      .addCase(getItems.rejected, (state, action) => {
        console.error('Ошибка загрузки предметов:', action.payload);
        state.loading = false;
      });
  },
});

// Селекторы
export const selectAllGuns = (state: { items: IAllItems }) => state.items.weapons;
export const selectAllArmors = (state: { items: IAllItems }) => state.items.armors;
export const selectAllArtefacts = (state: { items: IAllItems }) => state.items.artefacts;
export const selectItemsLoading = (state: { items: IAllItems }) => state.items.loading;
export const selectAllItems = (state: { items: IAllItems }) => state.items;

export const { reducer } = itemsSlice;
