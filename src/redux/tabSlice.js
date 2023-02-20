import { createSlice } from "@reduxjs/toolkit";

let initialState = false;

const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setTradeModelVisible: (state, action) => {
            return action.payload
        }
    }
})

export const {setTradeModelVisible} = tabSlice.actions;
export default tabSlice.reducer
