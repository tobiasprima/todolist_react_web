import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos'
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todo',
                method: 'POST',
                body: todo
            })
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${todo.id}/title`,
                method: 'PATCH',
                body: todo
            })
        }),
        doneTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${todo.id}/status`,
                method: 'PATCH',
                body: todo
            })
        }),
        deleteTodo: builder.mutation({
            query: ({ id })=> ({
                url: `/todo/${id}`,
                method: 'DELETE',
                body: id
            })
        })
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDoneTodoMutation,
    useDeleteTodoMutation
} = apiSlice