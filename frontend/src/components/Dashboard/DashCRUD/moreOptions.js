import React from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi"

const MoreOptions = ({ id, show_more_actions, index, editDelete,
     edit_comment, delete_comment }) => {
    return (
        <div className='w-[15%] cursor-pointer absolute top-0 right-0'>
            <BiDotsVerticalRounded className='relative'
                onClick={() => { show_more_actions(index) }} />
            {editDelete[index] &&
                <div className='absolute top-2 left-[-105px] lg:left-3 lg:w-3/4 bg-gray-200 text-black py-2 rounded my-2'>
                    <button
                        className='p-2.5 border-none w-full hover:bg-gray-400'
                        onClick={(e) => {
                            e.preventDefault()
                            edit_comment(id, index)
                        }}>
                        Edit
                    </button>
                    <button
                        className='p-2.5 border-none text-red-700 w-full  hover:bg-gray-400'
                        onClick={(e) => {
                            e.preventDefault()
                            delete_comment(id)
                        }}
                    >
                        Delete
                    </button>
                </div>
            }

        </div>
    );
}

export default MoreOptions;
