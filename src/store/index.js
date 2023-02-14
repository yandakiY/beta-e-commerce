import {configureStore} from '@reduxjs/toolkit'
import categorySlice from './category-slice'
import filterSlice from './filter-slice'
import listSlice from './lists-slice'

const store = configureStore({
    reducer:{
        lists: listSlice.reducer,
        category: categorySlice.reducer,
        filter: filterSlice.reducer
    }
})

export default store