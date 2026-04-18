import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as AuthReducer } from './slices/auth.slice';
import {reducer as UserReducer} from './slices/user.slice';
import {reducer as AuctionReducer} from './slices/items.slice';


export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  auction: AuctionReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;
