import { configureStore } from '@reduxjs/toolkit'
import tabSlice from "./tabSlice";
import coinSlice from "./coinSlice";
import holdingSlice from './holdingSlice';
import themeSlice from './themeSlice';

export default configureStore({
    reducer: {
        showTrade: tabSlice,
        coinList:coinSlice,
        holdingList:holdingSlice,
        theme:themeSlice
    }
})