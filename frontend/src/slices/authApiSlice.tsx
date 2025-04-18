import { apiSlice } from './apiSlice'
const AUTH_URL = '/api/auth'




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
                body: {},
                headers: {
                    Authorization: `Token ${authToken}`
                }

            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    })
})


export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApiSlice;

