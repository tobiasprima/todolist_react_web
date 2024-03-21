import React from 'react';

// ToggleSwitch component renders a switch to toggle moving done items to the end of the list
// Props:
// - handleMoveDoneToEnd: Function to handle moving done todos to the bottom of the list
const ToggleSwitch = ({ handleMoveDoneToEnd }) => {
    return (
        <div className="toggle-switch">
            <span className="switchlabel">Move done things to end?</span>
            <label className="switch">
                <input type="checkbox" className="switchbox" onChange={handleMoveDoneToEnd} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;