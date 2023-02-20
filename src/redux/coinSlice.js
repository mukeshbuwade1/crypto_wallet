import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import constants from "../constants/constants"

export const callApi = createAsyncThunk("coins/markets", async () => {
    console.log("loading api")

    try {
        const res = await axios.get(constants.holdingsUrl)
        return res.data;
    } catch (error) {
        console.log("error", error)
        return error;
    }

})

const initialState = {
    status: 'idle',
    error: null,
    data: []
}
const coinSlice = createSlice({
    name: "coinList",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(callApi.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(callApi.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.data = state.data.concat(action.payload)
            })
            .addCase(callApi.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export const { } = coinSlice.actions;
export default coinSlice.reducer