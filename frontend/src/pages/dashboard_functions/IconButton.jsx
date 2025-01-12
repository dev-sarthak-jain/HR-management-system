import React from 'react';
import clsx from 'https://cdn.skypack.dev/clsx@1.1.1';

const IconButton = ({ onClick = () => {}, icon = 'options', className = 'w-4 h-4' }) => {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
    </button>
  );
};

export default IconButton;
