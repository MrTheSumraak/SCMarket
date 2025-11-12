import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItem } from '../../utils/SCApi';

export const getItems = createAsyncThunk('items/getAllItems', async (_, {rejectWithValue}) => {
  try {
    const response = await getAllItem();
    return response;
  } catch (error) {
    console.log('Ошибка загрузки оружия: ', error);
    return rejectWithValue(error)
  }
}
);


