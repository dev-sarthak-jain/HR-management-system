import React from 'react';

const TextArea = ({ htmlFor, handleChange, name, value, id, label, rows, cols }) => {
    return (
        <div className="col-span-1">
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-md font-medium text-white"
            >
                {label}
            </label>
            <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                rows={rows}
                cols={cols}
            />

        </div>
    );
}

export default TextArea;
