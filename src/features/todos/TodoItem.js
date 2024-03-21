import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// TodoItem component represents an individual todo item in the todo list
const TodoItem = ({ 
    todo,                   // Todo object containing title and status
    newTodoId,              // ID of the newly created todo (used for scrolling)
    scrollToRef,            // Ref to scroll to the newly created todo
    doneTodo,               // Function to mark todo as done (if there is connection to database)
    deleteTodo,             // Function to delete todo (if there is connection to database)
    handleToggleStatus,     // Function to handle toggle status (if no database interaction)
    handleDeleteTodo        // Function to delete todo (if no database interaction)
}) => {
    const toggleStatus = ()=> {
        // Function to toggle the status of the todo item
        if (doneTodo) {
            // Call doneTodo to mark todo as done (database connection exist)
            doneTodo({ id: todo._id, status: !todo.status})
        } else if (handleToggleStatus) {
            // Call handleToggleStatus to mark todo as done (no database connection)
            handleToggleStatus(todo._id)
        }
    }

    // Function to handle deletion of the todo item
    const handleDelete = () => {
        if (deleteTodo) {
            // Call deleteTodo function to delete todo (database connection exist)
            deleteTodo({ id: todo._id })
        } else if (handleDelete) {
            // Call handleDeleteTodo function to delete todo (no database connection)
            handleDeleteTodo(todo._id)
        }
    }

    // Render todo item
    return (
        <article ref={todo._id === newTodoId ? scrollToRef : null}>
            <div className="todo">
                <input
                    type="checkbox"
                    checked={todo.status}
                    id={todo._id}
                    onChange={toggleStatus}
                />
                <label htmlFor={todo._id}>{todo.title}</label>
            </div>
            <button className="trash" onClick={handleDelete}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </article>
    );
};

export default TodoItem;