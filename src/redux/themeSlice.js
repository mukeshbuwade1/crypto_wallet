import { createSlice } from "@reduxjs/toolkit";

const initialState = {isDark:false};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme:(state,payload)=>{
            return {...state,isDark:!state.isDark};
        }
    }
})

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer