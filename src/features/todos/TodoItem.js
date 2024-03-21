import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ todo, newTodoId, scrollToRef, doneTodo, deleteTodo }) => {
    return (
        <article ref={todo._id === newTodoId ? scrollToRef : null}>
            <div className="todo">
                <input
                    type="checkbox"
                    checked={todo.status}
                    id={todo._id}
                    onChange={() => doneTodo({ id: todo._id, status: !todo.status })}
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