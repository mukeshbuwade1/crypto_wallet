import { configureStore } from '@reduxjs/toolkit'
import tabSlice from "./tabSlice";
import coinSlice from "./coinSlice";
import holdingSlice from './holdingSlice';

export default configureStore({
    reducer: {
        showTrade: tabSlice,
        coinList:coinSlice,
        holdingList:holdingSlice
    }
})