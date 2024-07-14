import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: '', isLoggedIn: false,isUpdate:false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            },
            upDate(state){
                state.isUpdate=true;
            },
            upDateDone(state){
                state.isUpdate=false
            }
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});
