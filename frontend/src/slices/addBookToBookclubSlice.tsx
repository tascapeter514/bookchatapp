import { createSlice } from '@reduxjs/toolkit'


const initialState = {

   selectedBookclub: 0,
   selectedBookshelf: 0
    
}


const addBookToBookclubSlice = createSlice({
    name: 'addBookToBookclub',
    initialState,
    reducers: {
        selectBookclub: (state, action) => {
            state.selectedBookclub = action.payload
        },
        selectBookshelf: (state, action) => {
            state.selectedBookshelf = action.payload
        },
        selectDefault: (state) => {
            state.selectedBookclub = NaN
        }
    }
})


export const {
    selectBookclub,
    selectBookshelf,
    selectDefault
} = addBookToBookclubSlice.actions

export default addBookToBookclubSlice.reducer