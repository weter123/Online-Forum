import {createSlice} from '@reduxjs/toolkit'
import Category from '../../models/Category';

export interface CategoriesState {
    categories: Array<Category> | null;
}


const initialState: CategoriesState = {
    categories: null
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers:{
        ThreadCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
})


export const {ThreadCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;