import React from 'react';

const TodoToggleSwitch = ({ handleMoveDoneToEnd }) => {
    return (
        <div className="toggle-switch">
            <span className="switchlabel">Move done things to end</span>
            <label className="switch">
                <input type="checkbox" className="switchbox" onChange={handleMoveDoneToEnd} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default TodoToggleSwitch;