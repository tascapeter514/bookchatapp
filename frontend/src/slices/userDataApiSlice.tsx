import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bookclub, Bookshelf, Invitation } from "../types";
const WEBSOCKET_URL = 'ws://localhost:8000'




export interface UserData {

    type: string,
    bookclubs: Bookclub[],
    bookshelves: Bookshelf[],
    invitations: Invitation[]

}


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/'}),
    endpoints: (build) => ({
        getUserData: build.query<UserData, number>({
            query: (id: number) => `userData/${id}`,
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved},
            ) {
                const ws = new WebSocket(`${WEBSOCKET_URL}/ws/userData/${arg}`)
                try {

                    await cacheDataLoaded

                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)

                        updateCachedData((draft) => {
                            draft.bookclubs = data.bookclubs,
                            draft.bookshelves = data.bookshelves,
                            draft.invitations = data.invitations
                        })
                    }

                    ws.addEventListener('message', listener)

                } catch {

                }

                await cacheEntryRemoved

                ws.close()
            }


        })
    })
})