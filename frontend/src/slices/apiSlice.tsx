import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const baseUrl = import.meta.env.PROD
    ? 'https://bookchatapp-2r38.onrender.com/'
    : 'http://localhost:8000/'

const baseQuery = fetchBaseQuery({ baseUrl })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
});