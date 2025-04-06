import { createSlice } from "@reduxjs/toolkit";
import { Author, Book } from "../types";


export type AuthorState = {
    author: Author
}


const initialState = {
    
    author: {
        id: NaN,
        name: '',
        bio: '',
        books: [],
        authorPhoto: '',
        birthDate: '',
        deathDate: ''

    }
}


const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        loadAuthor: (state, action) => {
            state.author = action.payload


        }
    }

})


export const { loadAuthor } = authorSlice.actions

export default authorSlice.reducer