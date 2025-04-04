import { createSlice } from '@reduxjs/toolkit'
import { ActiveUser, AuthToken } from '../types'


export type UserState = {
    user: ActiveUser,
    authToken: AuthToken
}

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    authToken: localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('user') as string) : null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.active_user;
            state.authToken = action.payload.auth_token,
            localStorage.setItem('user', JSON.stringify(action.payload))
            localStorage.setItem('authToken', JSON.stringify(action.payload))
            console.log('set credentials action:', action)
        },
        removeCredentials: (state) => {
            state.user = null,
            state.authToken = null,
            localStorage.removeItem('user')
            localStorage.removeItem('authToken')
        }
    }
})

export const { setCredentials, removeCredentials } = authSlice.actions

export default authSlice.reducer