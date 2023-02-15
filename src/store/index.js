import {configureStore} from '@reduxjs/toolkit'
import categorySlice from './category-slice'
import filterSlice from './filter-slice'
import listSlice from './lists-slice'
import modalSlice from './modal-slice'

const store = configureStore({
    reducer:{
        lists: listSlice.reducer,
        category: categorySlice.reducer,
        filter: filterSlice.reducer,
        modal:modalSlice.reducer
    }
})

export default store