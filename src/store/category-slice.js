// State of Category

import {createSlice} from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name:'category',
    initialState:{category:[] , total:0},
    reducers:{
        setCategory(state , action){
            state.category = action.payload
            state.total = state.category.length
        }
    }
})

export const actionsCategory = categorySlice.actions;

export default categorySlice;