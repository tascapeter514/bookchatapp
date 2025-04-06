import { apiSlice } from "./apiSlice";

const AUTHOR_URL = 'api/author'


export const authorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAuthor: builder.mutation({
            query: (id: number) => ({
                url: `${AUTHOR_URL}/${id}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetAuthorMutation } = authorApiSlice
