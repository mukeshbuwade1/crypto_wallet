import { configureStore } from '@reduxjs/toolkit'
import tabSlice from "./tabSlice";
import coinSlice from "./coinSlice";

export default configureStore({
    reducer: {
        showTrade: tabSlice,
        coinList:coinSlice,
    }
})