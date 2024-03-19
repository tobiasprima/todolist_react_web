import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons'
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
    <div className="new-item-section">
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
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
    </div>

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
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error.message || 'Error fetching todos'}</p>
    }

  return (
    <main>
        <header>
            <h1>Todo List</h1>
            <p>Add Things to do</p>
        </header>
        <hr />
        <div className='progress-container'>
            <div className="progress-label">
                {todos ? Math.round((todos.filter(todo => todo.status).length / todos.length) * 100) : 0}%
            </div>
            <progress
            className="progress-bar" 
            value={todos ? todos.filter(todo => todo.status).length : 0} 
            max={todos ? todos.length : 0}
            />
        </div>
        
        <div className="content">
            {content}
        </div>
        <hr />
        <div className="bottom-section">
            <h3>Add to list</h3>
            {newItemSection}
        </div>
    </main>
  )
}

export default TodoList