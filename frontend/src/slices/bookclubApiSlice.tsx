import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bookclub, Bookshelf } from "../types";

const PRODUCTION_BASE_URL = 'https://bookchatapp-2r38.onrender.com'
const PRODUCTION_WEBSOCKET_URL = 'wss://bookchatapp-2r38.onrender.com'


export interface BookclubData {
    type: string,
    bookclub: Bookclub | null,
    bookshelves: Bookshelf[]
}


export const bookclubApi = createApi({
    reducerPath: 'bookclubDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: PRODUCTION_BASE_URL}),
    endpoints: (build) => ({
        getBookclubData: build.query<BookclubData, number>({
            queryFn: async () => ({data: {type: '', bookclub: null, bookshelves: [] }}),
            async onCacheEntryAdded(
                bookclubId,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
            )
            {
                const ws = new WebSocket(`${PRODUCTION_WEBSOCKET_URL}/ws/bookclub/${bookclubId}`)
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
        acceptInvite: build.mutation({
            query: ({userId, bookclubId}: {userId: number, bookclubId: number}) => ({
                url: `/api/user/invite/accept`,
                method: 'PUT',
                body: {userId: userId, bookclubId: bookclubId}
            })
        }),
        declineInvite: build.mutation({
            query: ({userId, bookclubId}: {userId: Number, bookclubId: number}) => ({
                url: '/api/user/invite/decline',
                method: 'DELETE',
                body: {userId: userId, bookclubId: bookclubId}
            })
        })
    })
})



export const {useGetBookclubDataQuery, useGetUsersMutation, useInviteUserMutation, usePostBookshelfMutation} = bookclubApi