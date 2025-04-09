import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import bookReducer from '../slices/bookSlice'
import authorReducer from '../slices/authorSlice'
import userDataReducer from '../slices/userDataSlice'
import { apiSlice } from '../slices/apiSlice'
import { userDataApi } from '../slices/userDataApiSlice'
import { searchDataApi } from '../slices/searchApiSlice'
import bookshelfReducer from '../slices/bookshelfSlice'



const store = configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
        author: authorReducer,
        bookshelf: bookshelfReducer,
        userData: userDataReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userDataApi.reducerPath]: userDataApi.reducer,
        [searchDataApi.reducerPath]: searchDataApi.reducer,
    },
    middleware: (getdefaultMiddleWare) => getdefaultMiddleWare().concat(apiSlice.middleware, userDataApi.middleware),
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store