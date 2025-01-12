import React, { useState } from "react";

const Avatar = ({ name, title, imageUrl }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer text-white border-4 border-blue-800"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Avatar Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover hover:blur-sm "
      />

      {/* Name and Title */}
      {isHovering && (
        <div className="absolute bottom-1 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs">{title}</p>
        </div>
      )}
    </div>
  );
};

export default Avatar;
