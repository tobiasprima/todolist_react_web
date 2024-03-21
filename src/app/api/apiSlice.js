import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // https://todolistapi-kcjj.onrender.com
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://todolistapi-kcjj.onrender.com' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a,b) => b.order - a.order),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todo',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${todo.id}/title`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        doneTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${todo.id}/status`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id })=> ({
                url: `/todo/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
        reorderTodo: builder.mutation({
            query: (todos)=> ({
                url: '/todos/reorder',
                method: 'PATCH',
                body: todos
            }),
            invalidatesTags: ['Todos']
        }),
        resetTodo: builder.mutation({
            query: (todos) => ({
                url: '/todos/reset',
                method: 'POST',
                body: todos
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDoneTodoMutation,
    useDeleteTodoMutation,
    useReorderTodoMutation,
    useResetTodoMutation
} = apiSlice