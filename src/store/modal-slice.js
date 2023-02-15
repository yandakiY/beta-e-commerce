import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        show:false
    },
    reducers:{
        setShow(state , action){
            state.show = action.payload
        },
        showModal(state){
            state.show = true
        },
        closeModal(state){
            state.show = false
        }
    }
})

export const actionsModal = modalSlice.actions

export default modalSlice;