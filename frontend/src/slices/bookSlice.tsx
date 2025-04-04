import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../types";


export type BookState = {
    book: Book
}

const initialState = {

    book: {
        id: 0,
        name: '',
        publisher: '',
        description: '',
        ISBN_Identifiers: [],
        averageRating: NaN,
        ratingsCount: NaN,
        imageLinks: {smallThumbnail: '', thumbnail: ''},
        pageCount: NaN,
        genres: {id: NaN, name: ''},
        authors: []
    }

}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        getBook: (state, action) => {
            state.book = action.payload
        }

    }
})


export const { getBook } = bookSlice.actions
export default bookSlice.reducer
