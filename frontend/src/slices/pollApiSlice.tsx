import { apiSlice } from "./apiSlice";
import { Poll } from "../types";


export const pollApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPoll: builder.mutation({
            query: (data: Poll) => ({
                url: 'api/polls/create',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {useCreatePollMutation} = pollApi
