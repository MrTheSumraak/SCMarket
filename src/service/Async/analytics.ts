import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAnalyticsItem } from '../../utils/SCApi';
import { findItemIdByName } from '../../utils/methods/getInfoItem';

export const getAnalyticItem = createAsyncThunk(
  'getAnalytic/item',
  async (itemName: string, { rejectWithValue }) => {
    console.log('Test TS and ' + itemName);

    try {
      // 1. Находим ID предмета по названию
      const itemId = findItemIdByName(itemName);

      if (!itemId) {
        return rejectWithValue(`Предмет "${itemName}" не найден в базе`);
      } else {
        console.log('Предмет был найден по ID: ' + itemName);
      }

      // 2. Получаем аналитику по ID
      const analytics = await getAnalyticsItem(itemId);

      return analytics;
    } catch (error) {
      console.log('Have error on find analytic:', error);
      return rejectWithValue('Ошибка при получении аналитики');
    }
  },
);
