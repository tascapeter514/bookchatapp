import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



// const baseUrl = import.meta.env.PROD
//     ? 'https://bookchatapp.onrender.com/'
//     : 'http://localhost:8000/'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8000/'})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
});