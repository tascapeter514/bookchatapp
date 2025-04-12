import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bookclub, Bookshelf } from "../types";


export interface BookclubData {
    type: string,
    bookclub: Bookclub | null,
    bookshelves: Bookshelf[]
}


export const bookclubApi = createApi({
    reducerPath: 'bookclubDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getBookclubData: build.query<BookclubData, number>({
            queryFn: async () => ({data: {type: '', bookclub: null, bookshelves: [] }}),
            async onCacheEntryAdded(
                bookclubId,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
            )
            {
                const ws = new WebSocket(`ws://localhost:8000/ws/bookclub/${bookclubId}`)

                try {

                    await cacheDataLoaded
                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        if (data.type === 'get_bookclub_data') {
                            updateCachedData((draft) => {
                                if (!draft) {
                                    console.warn('Draft is undefined')
                                }
                                draft.type = data.type,
                                draft.bookclub = data.bookclub_data,
                                draft.bookshelves = data.bookshelves_data
                            })
                        }
                    }

                    ws.addEventListener('message', listener)

                } catch (error) {
                    console.error('Error conecting to bookclub websocket:', error)
                }

                await cacheEntryRemoved;
                ws.close()

            }
        }),
        getUsers: build.mutation({
            query: (bookclubId: number) => ({
                    url: `api/bookclub/users/${bookclubId}`,
                    post: 'GET'
            })
        })
    })
})

export const {useGetBookclubDataQuery, useGetUsersMutation} = bookclubApi