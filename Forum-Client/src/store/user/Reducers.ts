import {createSlice} from '@reduxjs/toolkit'
import User from '../../models/User';

export const UserProfileSetType = "USER_PROFILE_SET";

export interface UserProfileState{
    user: User | null;
}


const initialState: UserProfileState = {
    user : null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userProfile: (state, action) => {
            state.user = action.payload;
        }
    }
})


export const {userProfile} = userSlice.actions;

export default userSlice.reducer;