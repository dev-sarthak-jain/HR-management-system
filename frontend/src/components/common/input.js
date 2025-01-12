import React from 'react';

const Input = ({htmlFor, id, value,onChange, labelName, name  }) => {
    return (
        <div className="mb-6 grid grid-cols-2 mt-10 space-x-9">
                <div className="col-span-1">
                  <label
                    htmlFor={htmlFor}
                    className="block mb-2 text-md font-medium text-white"
                  >
                   {labelName}
                  </label>
                  <input
                    type="text"
                    id={id}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=""
                    required
                  />
                </div>
              </div>
    );
}

export default Input;
