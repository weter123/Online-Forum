import {createSlice} from '@reduxjs/toolkit'

export const UserProfileSetType = "USER_PROFILE_SET";

export interface UserProfileState{
    id: string;
    userName: string;
}


const initialState: UserProfileState = {
    id: '',
    userName: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userProfile: (state, action) => {
            state.id = action.payload.id
            state.userName =action.payload.username
        }
    }
})


export const {userProfile} = userSlice.actions;

export default userSlice.reducer;