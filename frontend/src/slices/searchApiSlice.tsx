import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type BookData = {
    id: number,
    name: string
}


export type BookSearchData = {
    type: string,
    search_results: BookData[]

}


export const searchDataApi = createApi({
    reducerPath: 'searchDataApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getBookData: build.query<BookSearchData, string>({
            queryFn: async () => ({data: {type: '', search_results: []}}),
            async onCacheEntryAdded(
                searchTerm,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            )
            {   const encodedValue = encodeURIComponent(searchTerm)
                const ws = new WebSocket(`ws://localhost:8000/ws/search/books/${encodedValue}/`)
                try {

                    await cacheDataLoaded
                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        if (data.type === 'get_books_data') {
                            updateCachedData((draft) => {
                                if(!data) {
                                    console.warn("Draft is undefined")
                                    return
                                }
                                draft.type = data.type
                                draft.search_results = data.search_results

                            })
                        }
                    }
                    ws.addEventListener('message', listener)

                } catch (error) {
                    console.error('Error during websocket setup:', error);
                }
                await cacheEntryRemoved
                ws.close()
            }
        }),
        postBook: build.mutation({
            query: ({userId, bookshelfId, newBookId}: {userId: number, bookshelfId: number, newBookId: number }) => ({
                url: `api/user/book/${userId}`,
                method: 'PUT',
                body: {bookshelfId: bookshelfId, newBookId: newBookId}
            })
        })
    })
})


export const {useLazyGetBookDataQuery, usePostBookMutation} = searchDataApi