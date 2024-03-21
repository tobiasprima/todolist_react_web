import React from 'react';

// ProgressBar component displays the progress of completed todos in the todo list
const ProgressBar = ({ todos }) => {
    // Extracting progress data from props
    const progressData = todos || [];

     // Counting the number of completed todos
    const completedTodos = progressData.filter(todo => todo.status).length;

    // Total number of todos
    const totalTodos = progressData.length;

     // Calculating the progress percentage
    const progressPercentage = totalTodos !== 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    return (
        <div className="progress-container">
            <div className="progress-label">{progressPercentage}%</div>
            <progress
                className="progress-bar"
                value={completedTodos}
                max={totalTodos}
            />
        </div>
    );
};

export default ProgressBar;