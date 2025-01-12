import React from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";

const DashSearchBox = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative">
                <input
                    className="h-[33px] lg:h-[70px] text-[14px] lg:text-[24px] w-[290px] lg:w-[868px] pl:3 pr-12 lg:pl-8 lg:pr-32 bg-white rounded-[10px] lg:rounded-[30px] border-[1px solid #6B846B]
                    focus:ring-blue-50 focus:border-blue-50 block"
                    type="text"
                    name="searchKey"
                    id="searchKey"
                    placeholder="Type search keyword..."
                    required
                />
                <button
                    className="absolute inset-y-0 right-0 pr-7 lg:pr-20"
                    type="submit"
                >
                <CiMicrophoneOn className='lg:text-3xl' />
                </button>
                <button
                    className="absolute inset-y-0 right-0 pr-2 lg:pr-7"
                    type="submit"
                >
                <VscSend className='lg:text-3xl ' />
                </button>
            </div>
        </form>
    );
};

export default DashSearchBox;
