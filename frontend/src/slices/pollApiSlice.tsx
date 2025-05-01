import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Poll, VoteRequest } from "../types";




export const pollApi = createApi({
    reducerPath: 'pollDataApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getPolls: build.query<Poll, number>({
            queryFn: async () => ({
                data: {} as Poll
            }),
            async onCacheEntryAdded(
                bookclubId,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
            )
            {
                const ws = new WebSocket(`ws://localhost:8000/ws/polls/${bookclubId}`)

        
                try {

                    await cacheDataLoaded
                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        console.log('poll query data:', data)
                        if (data.type === 'poll_data') {
                            updateCachedData((draft) => {
                                if (!draft) {
                                    console.warn('Draft is undefined')
                                    return
                                }
                                draft.id = data.polls.id
                                draft.bookOne = data.polls.book_one;
                                draft.bookTwo = data.polls.book_two;
                                draft.bookThree = data.polls.book_three;
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
            query: (data) => ({
                url: 'api/polls/create',
                method: 'POST',
                body: data
            })
        }),
        vote: build.mutation({
            query: ({data, pollId}: {data: VoteRequest, pollId: number}) => ({
                url: `api/poll/vote/${pollId}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {useGetPollsQuery, useCreatePollMutation, useVoteMutation} = pollApi
