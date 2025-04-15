import { apiSlice } from "./apiSlice";
import { Book } from "../types";




export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => ({
                url: 'api/books',
                method: 'GET'
            })
        }),
        getBook: builder.mutation({
            query: (id) => ({
                url: `api/book/${id}`,
                method: 'GET'
            })
        })
    })
})

export const {useGetBooksQuery, useGetBookMutation} = bookApiSlice