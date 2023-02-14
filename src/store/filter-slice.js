import { configureStore, createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name:'filter',
    initialState:{
        search:'',
        available:false
    },
    reducers:{
        setAvailable(state , action){
            state.available = action.payload
        },
        setSearch(state , action){
            state.search = action.payload
        }
    }
})

export const filterActions = filterSlice.actions;

export default filterSlice