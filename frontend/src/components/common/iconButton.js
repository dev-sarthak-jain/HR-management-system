import React from 'react';
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";

const IconButton = ({confirmClick, cancelEditing, index, backgroundColor}) => {
return (
    <div className={`${backgroundColor} rounded`}>
    <MdOutlineCancel
     onClick={() => {
        cancelEditing(index)
    }
    }
    className="mx-2 my-2.5 text-xl text-red-700  inline cursor-pointer"
    />
    {/* Cancel Operation icon */}
    <TiTick onClick={confirmClick}
     className="mx-2 my-2.5 text-xl  text-green-700 inline cursor-pointer"
     />
    {/* continue Operation icon */}
    </div>

);
}

export default IconButton;
