import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemsByCategory } from '../../utils/SCApi';
import { saveItems, loadItems } from '../../utils/db';
import type { IAllItems } from '../slices/items.slice';

const categories = [
  'weapon','armor','artefact','weapon_modules','weapon_style/skins',
  'bullet','other','misc','medicine','grenade','food','attachment',
  'backpacks','containers','drink','armor_style/skins'
] as const;

export const getItems = createAsyncThunk<IAllItems, void>(
  'items/getAllItems',
  async (_, { rejectWithValue }) => {
    try {
      // Попробуем взять из IndexedDB
      const stored = await loadItems();
      if (stored) return stored;

      // Если нет — загружаем с GitHub
      const results = await Promise.all(categories.map(c => getItemsByCategory(c)));

      const newItems: IAllItems = {
        weapons: results[0],
        armors: results[1],
        artefacts: results[2],
        weapon_modules: results[3],
        weapon_skins: results[4],
        bullet: results[5],
        other: results[6],
        misc: results[7],
        medicine: results[8],
        grenade: results[9],
        food: results[10],
        attachment: results[11],
        backpacks: results[12],
        containers: results[13],
        drink: results[14],
        armor_skins: results[15],
        loading: false,
      };

      // Сохраняем в IndexedDB
      await saveItems(newItems);

      return newItems;
    } catch (error) {
      console.error('Ошибка загрузки предметов: ', error);
      return rejectWithValue({ message: (error as Error).message || 'Ошибка загрузки' });
    }
  }
);
