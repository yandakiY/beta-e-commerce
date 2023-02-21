import {createSlice} from '@reduxjs/toolkit'

// Create our state
// Create our action and export this

const listSlice = createSlice({
    name:'lists',
    initialState: {lists:[] , total:0} ,
    reducers:{
        setLists(state , action){
            state.lists = action.payload.filter(e => e !== null)
            state.total = state.lists.length
        },
        deleteList(state , action){
            const id = action.payload;

            // Check presence of id in the array

            const existing = state.lists.find(e => e.id === id);

            if(existing){
                state.lists = state.lists.filter(e => e.id !== id);
            }else{
                console.log('Error id not find')
            }
        }
    }
})

// Send actions
export const actionsLists = listSlice.actions;
export default listSlice;