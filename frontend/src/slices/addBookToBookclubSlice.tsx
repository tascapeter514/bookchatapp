import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    bookclubDataState : {
        selectedBookclub: 0,
        selectedBookshelf: 0
    }

   
    
}


const addBookToBookclubSlice = createSlice({
    name: 'addBookToBookclub',
    initialState,
    reducers: {
        selectBookclub: (state, action) => {
            state.bookclubDataState.selectedBookclub = action.payload
        },
        selectBookshelf: (state, action) => {
            state.bookclubDataState.selectedBookshelf = action.payload
        },
        selectDefault: (state) => {
            state.bookclubDataState.selectedBookclub = NaN
        }
    }
})


export const {
    selectBookclub,
    selectBookshelf,
    selectDefault
} = addBookToBookclubSlice.actions

export default addBookToBookclubSlice.reducer