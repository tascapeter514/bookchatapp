import { apiSlice } from "./apiSlice";

export const bookshelfApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postBook: builder.mutation({
            query: ({bookshelfId, newBookId}: {bookshelfId: number, newBookId: number }) => ({
                url: 'api/bookshelf/book/add',
                method: 'PUT',
                body: {bookshelfId: bookshelfId, newBookId: newBookId}
            })
        }),
        deleteBook: builder.mutation({
            query: ({bookId, bookshelfId, id}: {bookId: number, bookshelfId: number, id: number}) => ({
                url: 'api/bookshelf/book/delete',
                method: 'DELETE',
                body: {bookId: bookId, bookshelfId: bookshelfId, id: id}
            })
        })
    })
})

export const {  usePostBookMutation, useDeleteBookMutation } = bookshelfApiSlice

