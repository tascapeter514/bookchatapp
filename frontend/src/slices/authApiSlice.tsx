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
        })
    })
})


export const { useLoginMutation } = authApiSlice;