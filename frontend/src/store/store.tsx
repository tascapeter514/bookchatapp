import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import bookReducer from '../slices/bookSlice'
import { apiSlice } from '../slices/apiSlice'



const store = configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getdefaultMiddleWare) => getdefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store