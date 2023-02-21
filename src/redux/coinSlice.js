import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const coilList = createAsyncThunk("coins/markets", async (state, action, currency = "usd", orderBy = "market_cap_desc", perPage = "10", page = "1", sparkline = true, priceChangePerc = "7d") => {

    let coinListUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
    try {
        const res = await axios.get(coinListUrl)
        return res.data;
    } catch (error) {
        console.log("error", error)
        return error;
    }

})

const initialState = {
    status: 'idle',
    error: null,
    coinList: []
}
const coinSlice = createSlice({
    name: "coinList",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(coilList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(coilList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                console.log("action.payload",action.payload)
                state.coinList = state.coinList.concat(action.payload)
            })
            .addCase(coilList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export const { } = coinSlice.actions;
export default coinSlice.reducer