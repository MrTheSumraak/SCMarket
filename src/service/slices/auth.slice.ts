import { createSlice } from "@reduxjs/toolkit"
import { getTokenUser } from "../Async/auth"

export interface IAuthState {
    loading: boolean;
    isTokens: boolean;
}

const initialState: IAuthState = {
    loading: true,
    isTokens: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        tokensChecked: (state) => {
            state.isTokens = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTokenUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTokenUser.fulfilled, (state) => {
                state.loading = false;
                state.isTokens = true;
            })
            .addCase(getTokenUser.rejected, (state, action) => {
                console.log('Ошибка получения токена: ', action.payload);
                state.loading = true;
            })
    },
    selectors: {
        isLoadingSelector: (state) => state.loading,
        isTokensSelector: (state) => state.isTokens
    }

});


export const { reducer } = authSlice;
export const { tokensChecked } = authSlice.actions
export const {
    isLoadingSelector,
    isTokensSelector
} = authSlice.selectors;