import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDoneTodoMutation,
    useDeleteTodoMutation 
} from '../../app/api/apiSlice'

const TodoList = () => {
    const [ newTodo, setNewTodo ] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [ addTodo ] = useAddTodoMutation()
    const [ doneTodo ] = useDoneTodoMutation()
    const [ deleteTodo ] = useDeleteTodoMutation()

    const handleSubmit = (e)=> {
        e.preventDefault()
        addTodo({title: newTodo})
        setNewTodo('')
    }

    const newItemSection = 
    <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Add to list</label>
        <div className="new-todo">
            <input 
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e)=> setNewTodo(e.target.value)}
            placeholder="Add New Todo"
            />
        </div>
        <button className="submit">
            <FontAwesomeIcon icon={faUpload} />
        </button>
    </form>

    let content;
    if (isLoading) {
        content = <p>Loading ...</p>
    } else if (isSuccess){
        content = todos.map(todo => {
            return (
                <article key={todo._id}>
                    <div className="todo">
                        <input 
                        type="checkbox" 
                        checked={todo.status}
                        id={todo._id}
                        onChange={()=> doneTodo({ id: todo._id, status: !todo.status})}
                        />
                        <label htmlFor={todo._id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={()=> deleteTodo({ id: todo._id})}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error.message || 'Error fetching todos'}</p>
    }

  return (
    <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>
  )
}

export default TodoList