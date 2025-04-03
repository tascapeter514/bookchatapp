import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {},
    middleware: (getdefaultMiddleWare) => getdefaultMiddleWare(),
    devTools: true
})


export default store