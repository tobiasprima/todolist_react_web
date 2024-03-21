import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// apiSlice defines an API for interacting with the backend server for managing todos
export const apiSlice = createApi({
    // https://todolistapi-kcjj.onrender.com    --> backend url
    reducerPath: 'api', // Path for the reducer
    baseQuery: fetchBaseQuery({ baseUrl: 'https://todolistapi-kcjj.onrender.com' }), // To test without db set this to empty string ''
    tagTypes: ['Todos'], // Define tag types for caching
    endpoints: (builder) => ({
        // Endpoint to fetch todos
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a,b) => b.order - a.order),
            providesTags: ['Todos']
        }),
        // Endpoint to add a new todo
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todo',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        // Endpoint to mark todo as done
        doneTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${todo.id}/status`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        // Endpoint to delete todo
        deleteTodo: builder.mutation({
            query: ({ id })=> ({
                url: `/todo/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
        // Endpoint to reorder todo (Gives order value to todos based on todos' status)
        reorderTodo: builder.mutation({
            query: (todos)=> ({
                url: '/todos/reorder',
                method: 'PATCH',
                body: todos
            }),
            invalidatesTags: ['Todos']
        }),
        // Endpoint to reset todos' order values
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

// Extracting hooks for each API endpoint
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDoneTodoMutation,
    useDeleteTodoMutation,
    useReorderTodoMutation,
    useResetTodoMutation
} = apiSlice