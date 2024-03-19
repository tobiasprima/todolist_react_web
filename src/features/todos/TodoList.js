import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const TodoList = () => {
    const [ newTodo, setNewTodo ] = useState('')

    const handleSubmit = (e)=> {
        e.preventDefault()
        //addTodo
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

  return (
    <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>
  )
}

export default TodoList