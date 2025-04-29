import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type BookData = {
    id: number,
    name: string
}


export type BookSearchData = {
    type: string,
    search_results: BookData[]

}

const apiBase = import.meta.env.PROD
    ? 'https://bookchatapp-2r38.onrender.com/'
    : 'http://localhost:8000/'


const wsBase = 'wss://bookchatapp-2r38.onrender.com'

export const searchDataApi = createApi({
    reducerPath: 'searchDataApi',
    baseQuery: fetchBaseQuery({baseUrl: apiBase }),
    endpoints: (build) => ({
        getBookData: build.query<BookSearchData, string>({
            queryFn: async () => ({data: {type: '', search_results: []}}),
            async onCacheEntryAdded(
                searchTerm,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            )
            {   const encodedValue = encodeURIComponent(searchTerm)
                const ws = new WebSocket(`${wsBase}/ws/search/books/${encodedValue}/`)
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
        })
    })
})


export const {useLazyGetBookDataQuery} = searchDataApi