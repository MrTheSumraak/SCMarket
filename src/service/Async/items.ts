import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemsByCategory } from '../../utils/SCApi';

const categories = [
  'weapon', 'armor', 'artefact', 'weapon_modules', 'weapon_style/skins',
  'bullet', 'other', 'misc', 'medicine', 'grenade',
  'food', 'attachment', 'backpacks', 'containers', 'drink', 'armor_style/skins'
] as const;

export const getItems = createAsyncThunk(
  'items/getAllItems',
  async (_, { rejectWithValue }) => {
    try {
      // Загружаем все категории параллельно
      const results = await Promise.all(categories.map(c => getItemsByCategory(c)));

      return {
        weapons: results[0],
        armors: results[1],
        artefacts: results[2],
        weaponsModules: results[3],
        weaponSkins: results[4],
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
      };
    } catch (error) {
      console.error('Ошибка загрузки предметов: ', error);
      return rejectWithValue(error);
    }
  }
);
