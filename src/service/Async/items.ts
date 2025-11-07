import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItem } from '../../utils/SCApi';

export const getItems = createAsyncThunk('items/getAllItems', async () => {
  try {
    const response = await getAllItem();
    return response;
  } catch (error) {
    return console.error(error);
  }
});
