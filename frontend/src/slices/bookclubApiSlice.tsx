import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bookclub, Bookshelf } from "../types";
const BASE_URL = import.meta.env.PROD
    ? 'https://bookchatapp-2r38.onrender.com/'
    : 'http://localhost:8000/'

const WEBSOCKET_URL = import.meta.env.PROD
    ? 'wss://bookchatapp-2r38.onrender.com'
    : 'ws://localhost:8000'


export interface BookclubData {
    type: string,
    bookclub: Bookclub | null,
    bookshelves: Bookshelf[]
}

export interface AddBookToBookclubData {
    bookshelfId: number,
    newBookId: number
}


export const bookclubApi = createApi({
    reducerPath: 'bookclubDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    endpoints: (build) => ({
        getBookclubData: build.query<BookclubData, number>({
            queryFn: async () => ({data: {type: '', bookclub: null, bookshelves: [] }}),
            async onCacheEntryAdded(
                bookclubId,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
            )
            {
                const ws = new WebSocket(`${WEBSOCKET_URL}/ws/bookclub/${bookclubId}`)
                console.log('ws:', ws)

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
                    method: 'GET'
            })
        }),
        inviteUser: build.mutation({
            query: (data) => ({
                url: 'api/bookclub/invite',
                method: 'POST',
                body: data
            })
        }),
        postBookshelf: build.mutation({
            query: ({keyword, bookclubId}:  {keyword: string, bookclubId: number}) => ({
                url: `/api/bookclub/bookshelf/${bookclubId}`,
                method: 'POST',
                body: {name: keyword}

            })
        }),
        postBookToBookclub: build.mutation({
            query: ({bookclubId, data} : {bookclubId: number, data: AddBookToBookclubData}) => ({
                url: `api/bookclub/bookshelf/book/${bookclubId}`,
                method: 'PUT',
                body: data
            })
        })

    })
})



export const {
    useGetBookclubDataQuery, 
    useGetUsersMutation, 
    useInviteUserMutation, 
    usePostBookshelfMutation,
    usePostBookToBookclubMutation

} = bookclubApi