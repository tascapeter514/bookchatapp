import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bookclub, Bookshelf, Invitation } from "../types";
const WEBSOCKET_URL = 'ws://localhost:8000'

export interface UserData {
    type: string,
    bookclubs: Bookclub[],
    bookshelves: Bookshelf[],
    invitations: Invitation[]
}


export const userDataApi = createApi({
    reducerPath: 'userDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getUserData: build.query<UserData, number>({
            queryFn: async () => ({data: {type: '', bookclubs: [], bookshelves: [], invitations: []}}),
            async onCacheEntryAdded(
                userId,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved},
            )
            {
                const ws = new WebSocket(`${WEBSOCKET_URL}/ws/userData/${userId}`)
                try {

                    await cacheDataLoaded
                    const listener = (event: MessageEvent) => {
                    const data = JSON.parse(event.data)
                    if (data.type === 'get_user_data') {
                        updateCachedData((draft) => {
                            if (!draft) {
                                console.warn('Draft is undefined')
                                return;
                            }
                            draft.bookclubs = data.bookclubs,
                            draft.bookshelves = data.bookshelves,
                            draft.invitations = data.invitations
                        });
                    }
                    }
                    ws.addEventListener('message', listener)
                } catch (error) {
                    console.error('Error during websocket setup:', error);
                }

                await cacheEntryRemoved;
                ws.close();
            }
        }),
        postBookclub: build.mutation({
            query: ({keyword, userId}: { keyword: string, userId: number}) => ({
                url: `/api/user/bookclub/${userId}`,
                method: 'POST',
                body: {name: keyword}

            })
        }),
        postBookshelf: build.mutation({
            query: ({keyword, userId}:  {keyword: String, userId: number}) => ({
                url: `/api/user/bookshelf/${userId}`,
                method: 'POST',
                body: {name: keyword}

            })
        })
        
    })
})

export const { useGetUserDataQuery, usePostBookclubMutation } = userDataApi