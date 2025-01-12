import React from 'react';
import { GoThumbsup, GoThumbsdown } from "react-icons/go"
import ChatPrompt from '../../ChatBox/ChatPrompt';
import IconButton from '../../common/iconButton';
import MoreOptions from './moreOptions';

const CommentImpression = ({ index, id, commentPoster,size, username, comment_date, comment_text,
    upvote_count, downvote_count, replyComment, input_value, set_Input_Value,
    handleReplyChange, reply, replyPromptShow, edit_box,
    toggleReplyBox, edit_delete_div, showMoreActions,
    deleteComment, editComment, handleUpdate, cancelAction }) => {



    return (
        <div className='flex flex-wrap justify-center mx-2 relative my-3'>
            <div className='w-[10%]'>
            {/* LAPTOP AVATAR */}
                <svg className="hidden lg:block " height="100" width="100" >
                    <circle cx="50" cy="50" r={size} fill="#3C6E71" />
                </svg>
                {/* MOBILE AVATAR */}
                <svg className="block lg:hidden" height="50" width="50" >
                    <circle cx={50 / 2} cy={50 / 2} r="25" fill="#3C6E71" />
                </svg>
            </div>

            <div className='p-2.5 lg:p-4 w-[80%] ml-4'>
                <p className='inline m-2.5 ml-0'>{username}</p>
                <p className='inline m-1 my-2.5 sm:m-2.5 text-xs md:text-sm'>{comment_date}</p>
                {/* <p className='m-2.5'>Title</p> */}
                {edit_box[index] ?
                    <div className='sm:w-[70%] relative'>
                        <input
                            className='pr-[35%] sm:pr-[25%] w-full bg-transparent rounded
                            border-b border-gray-500 focus:outline-none'
                            type="text"
                            value={input_value}
                            onChange={set_Input_Value}
                            autoFocus
                        />
                        <div className='absolute right-0 top-0'>
                        <IconButton
                        confirmClick={() => {
                            handleUpdate(id, index)
                        }}
                        cancelEditing={cancelAction}
                        index={index}
                        backgroundColor="bg-gray-400"
                        />
                        </div>
                        </div>
                    :
                    <p className='inter-justify my-3'>
                        {comment_text}
                    </p>

                }


                <div className='flex w-full my-3 space-x-6'>
                    <p>{upvote_count}
                    <GoThumbsup className="mx-1 text-2xl inline cursor-pointer" /></p>
                    <p>{downvote_count}
                    <GoThumbsdown className="mx-1 text-2xl inline cursor-pointer" /></p>
                    <button
                        onClick={() => {
                            toggleReplyBox(index)
                        }}
                        className='cursor-pointer'>
                        Reply
                    </button>
                </div>

                                 {/* REPLY BOX TO TOGGLE: DESKTOP AND TABLET */}
                <div className='hidden md:block'>
               {replyPromptShow[index] &&
                    <ChatPrompt
                        currentMode={true}
                        bgOnDark="bg-nightModeDark"
                        position="static"
                        placeholder="Reply..."
                        submitPrompt={e => {
                            e.preventDefault()
                            replyComment(id, index)
                        }}
                        value={reply}
                        handleChange={handleReplyChange}
                    />}
                </div>


            </div>
               {/* REPLY BOX TO TOGGLE: MOBILE ONLY*/}
               <div className='block md:hidden w-full'>
               {replyPromptShow[index] &&
                    <ChatPrompt
                        currentMode={true}
                        bgOnDark="bg-nightModeDark"
                        position="static"
                        placeholder="Reply..."
                        submitPrompt={e => {
                            e.preventDefault()
                            replyComment(id, index)
                        }}
                        value={reply}
                        handleChange={handleReplyChange}
                    />}
               </div>


{/* SHOW/HIDE DELETE OR EDIT DIV */}
            {commentPoster === username &&
                <MoreOptions
                        id={id} show_more_actions={showMoreActions}
                        index={index} editDelete={edit_delete_div} edit_comment={editComment}
                        delete_comment={deleteComment}
                        />
                        }



        </div>
    );
}

export default CommentImpression;
