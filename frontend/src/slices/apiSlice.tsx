import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 'ws://localhost:8000/ws
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8000/'})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
});