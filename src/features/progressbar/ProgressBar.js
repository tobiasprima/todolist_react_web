import React from 'react';

const ProgressBar = ({ todos }) => {
    return (
        <div className="progress-container">
            <div className="progress-label">{todos ? Math.round((todos.filter((todo) => todo.status).length / todos.length) * 100) : 0}%</div>
            <progress
                className="progress-bar"
                value={todos ? todos.filter((todo) => todo.status).length : 0}
                max={todos ? todos.length : 0}
            />
        </div>
    );
};

export default ProgressBar;