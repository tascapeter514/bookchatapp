import { apiSlice } from "./apiSlice";
import { Book } from "../types";



interface BookData {
    best_sellers: Book[],
    biography: Book[],
    drama: Book[],
    literary_criticism: Book[],
    literary_fiction: Book[],
    philosophical_nonfiction: Book[],
    poetry: Book[],
    political_nonfiction: Book[],
    science_fiction: Book[],
    contemporary_fiction: Book[],
    fantasy: Book[],
    detective_fiction: Book[]
}


export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<BookData, void>({
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