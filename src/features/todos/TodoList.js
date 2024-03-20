import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDoneTodoMutation,
    useDeleteTodoMutation
} from '../../app/api/apiSlice'

const TodoList = () => {
    const [ todoWithoutDB, setTodoWithoutDB ] = useState([])
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

    // Effect to load todos from local storage if there is cache
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (!todos && storedTodos) {
            // Set todos to local storage's todos
            setTodoWithoutDB(storedTodos)
        } else if (!todos){
            // If there is no DB and nothing on cache, set the todos to empty array
            setTodoWithoutDB([])
        }
    }, [todos])

    // Effect to save todos to local storage when todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoWithoutDB))
    }, [todoWithoutDB])

    // Effect to update local state when there is DB and todos are fetched
    useEffect(()=> {
        if (todos && !isError) {
            setTodoWithoutDB(todos)
        }
    }, [todos])

    const handleSubmit = (e)=> {
        e.preventDefault()
        if (newTodo.trim() === '') return // Prevent adding empty todos
        if (!isError){
            addTodo({title: newTodo})
        } else {
            // Handle submit without database
            const newTodoWithoutDB = {_id: Date.now(), title: newTodo, status: false}
            setTodoWithoutDB(prevTodos => [...prevTodos, newTodoWithoutDB])
        }
        
        setNewTodo('')
    }

    // Handle toggle without database
    const handleToggleStatus = (id) => {
        setTodoWithoutDB(prevTodos => 
            prevTodos.map(todo => todo._id === id ? {...todo, status: !todo.status} : todo
                )
            )
    }

    // Handle delete without database
    const handleDeleteTodo = (id) => {
        setTodoWithoutDB(prevTodos => prevTodos.filter(todo => todo._id !== id))
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
        content = (
            todoWithoutDB.map(todo => (
                <article key={todo._id}>
                    <div className="todo">
                        <input 
                        type="checkbox" 
                        checked={todo.status}
                        onChange={()=> handleToggleStatus(todo._id)}
                        />
                        <label>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => handleDeleteTodo(todo._id)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </article>
            ))
        )
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