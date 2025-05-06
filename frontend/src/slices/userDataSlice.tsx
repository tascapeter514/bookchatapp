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
        loadUserData: (state, action) => {
            state.type = 'userData',
            state.bookclubs = [...state.bookclubs, ...action.payload.bookclubs],
            state.bookshelves = [...state.bookshelves, ...action.payload.bookclubs],
            state.invitations = [...state.invitations, ...action.payload.invitations]

        },
        addBookclub: (state, action) => {
            state.bookclubs = [...state.bookclubs, action.payload]
        },
        addBookshelf: (state, action) => {
            state.bookshelves = [...state.bookshelves, action.payload]
        }
    }
})

export const {
    loadUserData,
    addBookclub,
    addBookshelf,
} = userDataSlice.actions
export default userDataSlice.reducer