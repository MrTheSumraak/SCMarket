import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemsHistory } from '../../utils/SCApi';

export const getItemsAsync = createAsyncThunk('getItems/all', async () => {
  console.log('Начало обновление базы данных');

  try {
    const results = await getItemsHistory();

    console.log('Все объекты SC:X успешно загрузились');

    return await results;
  } catch (error) {
    console.log('Ошибка загрузки объектов SC:X ' + error);
  }
});
