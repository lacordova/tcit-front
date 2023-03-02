import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001"
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/api/posts',
      providesTags: ["Posts"]
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/api/posts',
        method: 'POST',
        body: newPost
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  })
});

export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation } = apiSlice;