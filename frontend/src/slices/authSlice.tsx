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
            console.log('set credentials action:', action)
            const {active_user, auth_token} = action.payload
            console.log('set credentials auth token:', auth_token)
            state.user = {
                ...state.user,
                id: active_user.id,
                username: active_user.username,
                password: active_user.password,
                profile: active_user.profile,
                firstName: active_user.first_name,
                lastName: active_user.last_name,
                emailAddress: active_user.email,
                dateJoined: active_user.date_joined
            };
            console.log('state user:', state.user)
            state.authToken = auth_token,
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('authToken', JSON.stringify(auth_token))
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