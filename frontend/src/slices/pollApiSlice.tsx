import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Poll } from "../types";




export const pollApi = createApi({
    reducerPath: 'pollDataApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getPolls: build.query<Poll, number>({
            queryFn: async () => ({data: {
                bookOne: {id: NaN, name: ''},
                bookTwo: {id: NaN, name: ''}, 
                bookThree: {id: NaN, name: ''}
                }
            }),
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
                        if (data.type === 'get_poll') {
                            updateCachedData((draft) => {
                                if (!draft) {
                                    console.warn('Draft is undefined')
                                }
                                draft.bookOne = data.book_one,
                                draft.bookTwo = data.book_two,
                                draft.bookThree = data.book_three
                            })
                        }
                    }

                    ws.addEventListener('message', listener)

                } catch (err) {
                    console.error('Error connecting to poll websocket', err)
                }
                await cacheEntryRemoved;
                ws.close()
            }
        }),
        createPoll: build.mutation({
            query: (data: Poll) => ({
                url: 'api/polls/create',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {useGetPollsQuery, useCreatePollMutation} = pollApi
