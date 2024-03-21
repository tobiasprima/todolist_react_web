import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// TodoForm component renders a form to add new todos to the list
// Props:
// - newTodo: Current value of the new todo input field
// - setNewTodo: Function to update the newTodo state when input changes
// - handleSubmit: Function to handle form submission when adding a new todo
const TodoForm = ({ newTodo, setNewTodo, handleSubmit }) => {
    return (
        <div className='new-item-section'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='new-todo'>Add to list</label>
                <div className='new-todo'>
                    <input type='text' id='new-todo' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                </div>
                <button className='submit plus'>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </form>
        </div>
    );
};

export default TodoForm;