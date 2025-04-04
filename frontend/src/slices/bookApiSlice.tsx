import { apiSlice } from "./apiSlice";
const BOOK_URL = 'api/book'



export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBook: builder.mutation({
            query: (id) => ({
                url: `${BOOK_URL}/${id}`,
                method: 'GET'
            })
        })
    })
})

export const {useGetBookMutation} = bookApiSlice