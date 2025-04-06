import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import bookReducer from '../slices/bookSlice'
import authorReducer from '../slices/authorSlice'
import { apiSlice } from '../slices/apiSlice'
import { userDataApi } from '../slices/userDataApiSlice'



const store = configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
        author: authorReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userDataApi.reducerPath]: userDataApi.reducer
    },
    middleware: (getdefaultMiddleWare) => getdefaultMiddleWare().concat(apiSlice.middleware, userDataApi.middleware),
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store