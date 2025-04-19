import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    poll: {
        bookOne: {id: NaN, name: ''},
        bookTwo: {id: NaN, name: ''},
        bookThree: {id: NaN, name: ''}

    }
    
}


const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        selectBookOne: (state, action) => {
            state.poll.bookOne = {id: action.payload.id, name: action.payload.name }
        },
        selectBookTwo: (state, action) => {
            state.poll.bookTwo = {id: action.payload.id, name: action.payload.name }
        },
        selectBookThree: (state, action) => {
            state.poll.bookThree = {id: action.payload.id, name: action.payload.name }
        }
    }

})


export const { selectBookOne, selectBookTwo, selectBookThree } = pollSlice.actions
export default pollSlice.reducer