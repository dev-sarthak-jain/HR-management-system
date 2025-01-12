// Alert.js
import React from 'react';

const Alert = ({ message, type, isVisible }) => {
  return (
    <div className="w-4/5 lg:w-2/4 flex justify-center items-center py-2.5 fixed top-0 left-0 z-[10] bg-opacity-7">
      <div
        className={`text-sm sm:text-[16px] p-4 my-2 lg:w-2/4 rounded-md transform transition-transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Alert;
