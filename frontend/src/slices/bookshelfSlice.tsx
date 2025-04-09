import { createSlice } from "@reduxjs/toolkit";
import { Bookshelf } from "../types";


const initialState = {
    bookshelves: [] as Bookshelf[]
}

const bookshelfSlice = createSlice({
    name: 'bookshelves',
    initialState,
    reducers: {
    
        addBook: (state, action) => {
            state.bookshelves = state.bookshelves.map((bookshelf) => {
                if (bookshelf.id === action.payload.bookshelfId) {
                    bookshelf.books = [...bookshelf.books, action.payload.newBook]
                }
                return bookshelf
            })
        }
    }
})

export const { addBook } = bookshelfSlice.actions
export default bookshelfSlice.reducer