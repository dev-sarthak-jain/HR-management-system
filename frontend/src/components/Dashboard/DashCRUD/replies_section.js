import React from 'react';
import { GoThumbsup, GoThumbsdown } from "react-icons/go"


const RepliesSection = ({size, username, comment_date, comment_text,
                            upvote_count, downvote_count }) => {

    return (
        <div className='flex flex-wrap ml-[3%] sm:ml-[14%]'>
                <div className='w-[10%]'>
                            {/* LAPTOP AVATAR */}
                            <svg className="hidden lg:block " height="100" width="100" >
                    <circle cx="50" cy="40" r={size} fill="#3C6E71" />
                </svg>
                {/* MOBILE AVATAR */}
                <svg className="block lg:hidden" height="50" width="50" >
                    <circle cx={50 / 2} cy={50 / 2} r="20" fill="#3C6E71" />
                </svg>
                </div>




                <div className='px-3 lg:p-4 w-[85%] ml-3'>
                <p className='inline m-2.5 ml-0'>User: {username}</p>
                <p className='inline m-1 sm:m-2.5 text-xs md:text-sm'>{comment_date}</p>
                    {/* <p className='m-2.5'>Title</p> */}
                    <p className='inter-justify my-3'>
                    {comment_text}
                    </p>

                    <div className='flex w-full my-3 space-x-6'>
                        <p>{upvote_count}<GoThumbsup className="mx-1 text-2xl inline cursor-pointer" /></p>
                        <p>{downvote_count}<GoThumbsdown className="mx-1 text-2xl inline cursor-pointer" /></p>
                    </div>
            </div>


            </div>
    );
}

export default RepliesSection;
