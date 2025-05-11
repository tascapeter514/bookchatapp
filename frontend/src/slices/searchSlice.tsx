import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    searchTerm: '',
    newItemId: NaN

}

const searchSlice = createSlice({

    name: 'search',
    initialState,
    reducers: {
        startSearch: (state, action) => {
            state.searchTerm = action.payload.searchTerm
        },
        checkSearchResult: (state, action) => {
            state.newItemId = action.payload.newItemId
        }

    }

})

export const {

    startSearch,
    checkSearchResult

} = searchSlice.actions


export default searchSlice.reducer

