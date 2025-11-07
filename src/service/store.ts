import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as itemsReducer } from './slices/items.slice';

export const rootReducer = combineReducers({
  itemsList: itemsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
