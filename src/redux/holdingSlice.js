import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dummyData } from "../constants";
import constants from "../constants/constants"

export const myHoldingsApi = createAsyncThunk("coins/holding", async (state, action, holdings = [], currency = "usd", orderBy = "market_cap_desc", perPage = "10", page = "1", sparkline = true, priceChangePerc = "7d") => {
    let ids = dummyData.holdings.map(e => e.id).join(",")
    let holdingsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
    try {
        const res = await axios.get(holdingsUrl)
        return res.data;
    } catch (error) {
        console.log("error", error)
        return error;
    }

});

const initialState = {
    status: 'idle',
    error: null,
    holdings: []
}
const holdingSlice = createSlice({
    name: "holdingList",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(myHoldingsApi.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(myHoldingsApi.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.holdings = state.holdings.concat(action.payload)
            })
            .addCase(myHoldingsApi.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export const { } = holdingSlice.actions;
export default holdingSlice.reducer