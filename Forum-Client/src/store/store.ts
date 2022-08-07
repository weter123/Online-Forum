import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/Reducers";
import categoriesReducer from "./categories/Reducer"
export const store = configureStore({
    reducer:{
        user: userReducer,
        categories: categoriesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;