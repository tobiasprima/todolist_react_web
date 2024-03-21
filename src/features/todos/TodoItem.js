import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const TodoItem = ({ todo, newTodoId, scrollToRef, doneTodo, deleteTodo, handleToggleStatus, handleDeleteTodo  }) => {
    const toggleStatus = ()=> {
        if (doneTodo) {
            doneTodo({ id: todo._id, status: !todo.status})
        } else if (handleToggleStatus) {
            handleToggleStatus(todo._id)
        }
    }
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
            <button className="trash" onClick={() => deleteTodo({ id: todo._id })}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </article>
    );
};

export default TodoItem;