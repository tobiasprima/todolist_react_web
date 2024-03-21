import React from 'react';

const ProgressBar = ({ todos }) => {
    const progressData = todos || [];
    const completedTodos = progressData.filter(todo => todo.status).length;
    const totalTodos = progressData.length;
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