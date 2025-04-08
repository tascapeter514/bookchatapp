import { createSlice } from "@reduxjs/toolkit";
import { Bookclub } from "../types";

export type BookclubState = {
    bookclubs: Bookclub[]
}

const initialState = {
    bookclubs: [] as Bookclub[]
}

const bookclubSlice = createSlice({
    name: 'bookclubs',
    initialState,
    reducers: {
        addBookclub: (state, action) => {
            state.bookclubs = [...state.bookclubs, action.payload]
        }

    }

})

export const {addBookclub} = bookclubSlice.actions
export default bookclubSlice.reducer