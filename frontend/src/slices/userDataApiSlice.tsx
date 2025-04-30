import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bookclub, Bookshelf, Invitation } from "../types";


const BASE_URL = import.meta.env.PROD
    ? 'https://bookchatapp-2r38.onrender.com/'
    : 'http://localhost:8000/'

const WEBSOCKET_URL = import.meta.env.PROD
    ? 'wss://bookchatapp-2r38.onrender.com'
    : 'ws://localhost:8000'

export interface UserData {
    type: string,
    bookclubs: Bookclub[],
    bookshelves: Bookshelf[],
    invitations: Invitation[]
}


export const userDataApi = createApi({
    reducerPath: 'userDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
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
            query: ({keyword, userId}:  {keyword: string, userId: number}) => ({
                url: `/api/user/bookshelf/${userId}`,
                method: 'POST',
                body: {name: keyword}

            })
        }),
        acceptInvite: build.mutation({
            query: (inviteId: number) => ({
                url: `/api/user/invite/accept`,
                method: 'PUT',
                body: {inviteId: inviteId}
            })
        }),
        declineInvite: build.mutation({
            query: (inviteId: number) => ({
                url: '/api/user/invite/decline',
                method: 'DELETE',
                body: {inviteId: inviteId}
            })
        })
        
        
    })
})

export const { useGetUserDataQuery, usePostBookclubMutation, usePostBookshelfMutation, useAcceptInviteMutation, useDeclineInviteMutation } = userDataApi

