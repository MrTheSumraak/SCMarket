import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as itemsReducer } from './slices/items.slice';
import { 
  useSelector as selectorHook,
  type TypedUseSelectorHook, 
  type useDispatch as dispatchHook} from 'react-redux';


export const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
