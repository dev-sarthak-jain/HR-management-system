// Loading.js
import React from 'react';

const Loading = ({width}) => {
  return (
    <div className={`bg-nightModeDark h-full ${width} flex justify-center items-center
     py-2.5 fixed top-0 right-0 z-[12] opacity-90`}
     >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#3C6E71]"></div>
    </div>
  );
};

export default Loading;
