import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemsByCategory } from '../../utils/SCApi';

export const getItems = createAsyncThunk(
  'items/getAllItems',
  async (_, { rejectWithValue }) => {
    try {
      const weapons = await getItemsByCategory('weapon');
      const armor = await getItemsByCategory('armor');
      const artefacts = await getItemsByCategory('artefact');
      const weaponsModules = await getItemsByCategory('weapon_modules');
      const weaponSkins = await getItemsByCategory('weapon_skins');
      const bullet = await getItemsByCategory('bullet');
      const other = await getItemsByCategory('other');
      const misc = await getItemsByCategory('misc');
      const medicine = await getItemsByCategory('medicine');
      const grenade = await getItemsByCategory('grenade');
      const food = await getItemsByCategory('food');
      const attachment = await getItemsByCategory('attachment');
      const backpacks = await getItemsByCategory('backpacks');
      const containers = await getItemsByCategory('containers');
      const drink = await getItemsByCategory('drink');
      const armor_skins = await getItemsByCategory('armor_skins');

      return {
        weapons,
        armor,
        artefacts,
        weaponsModules,
        weaponSkins,
        bullet,
        other,
        misc,
        medicine,
        grenade,
        food,
        attachment,
        backpacks,
        containers,
        drink,
        armor_skins
      };
    } catch (error) {
      console.error('Ошибка загрузки предметов: ', error);
      return rejectWithValue(error);
    }
  }
);
