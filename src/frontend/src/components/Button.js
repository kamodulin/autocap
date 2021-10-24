import React from 'react';

function Button(props) {
    const { value, onClick } = props;
    return (
        <button className="hover:bg-gray-200 hover:text-gray-800 group flex items-center rounded-md bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2" onClick={onClick} >
            {value}
        </button>
    );
}

export default Button;