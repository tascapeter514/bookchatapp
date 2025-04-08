import { createSlice } from "@reduxjs/toolkit";
import { Bookclub, Bookshelf, Invitation } from "../types";


export type UserDataState = {
    type: string,
    bookclubs: Bookclub[],
    bookshelves: Bookshelf[],
    invitations: Invitation[]
}

const initialState = {
    type: '',
    bookclubs: [] as Bookshelf[],
    bookshelves: [] as Bookclub[],
    invitations: [] as Invitation[]
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        addBookclub: (state, action) => {
            state.bookclubs = [...state.bookclubs, action.payload]
        }
    }
})

export const {addBookclub} = userDataSlice.actions
export default userDataSlice.reducer