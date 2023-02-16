import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        show:false,
        valueModalUpdateArticle:{}
    },
    reducers:{
        setShow(state , action){
            state.show = action.payload
        },
        showModal(state , action){
            state.show = true
            state.valueModalUpdateArticle = action.payload.article
        },
        closeModal(state){
            state.show = false
        }
    }
})

export const actionsModal = modalSlice.actions

export default modalSlice;