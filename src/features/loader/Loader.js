import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

// Loader component displays a spinning loader animation
const Loader = () => {
    return (
        <div className='loader'>
            <MoonLoader color='#92aafa' loading size={100} />
        </div>
    );
};

export default Loader;
