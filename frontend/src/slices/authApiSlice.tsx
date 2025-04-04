import { apiSlice } from './apiSlice'
const AUTH_URL = '/api/auth'
const LOGOUT_URL = 'api/auth/logout'




export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (authToken) => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
                headers: {
                    Authorization: `Token ${authToken}`
                }

            })
        })
    })
})


export const { useLoginMutation } = authApiSlice;

