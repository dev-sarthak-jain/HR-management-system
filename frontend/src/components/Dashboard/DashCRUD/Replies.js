import React from 'react';
import { readableDate } from '../../common/set_date';
import RepliesSection from './replies_section';
import { AiOutlineCaretRight, AiFillCaretDown } from 'react-icons/ai';


export const Replies = ({ showHideReplies, index, arrayToMap }) => {
    return (<div className={`mx-6 ${showHideReplies[index] ? `block` : `hidden`}`} >
        {arrayToMap.map((element, index) => {
            const reply_date_object = readableDate(element.date_created)

            return <RepliesSection size="20" key={index}
                username={element.author}
                comment_date={reply_date_object}
                comment_text={element.text}
                upvote_count={element.upvote_count}
                downvote_count={element.downvote_count}
            />

        })}
    </div>)
}


export const ShowReplies = ({index, arrayToMap, seeReplies, setArray}) => {
    return(
        <div className='ml-[25%] lg:ml-[20%] '>
        {arrayToMap.length > 0 &&
            <button
                onClick={() => {
                    seeReplies(index)
                }}
                className='text-lg cursor-pointer'
                >
                {arrayToMap.length > 1 ? "Replies" : "Reply"}
                ({arrayToMap.length})

                {setArray[index] ?
                    <AiFillCaretDown className="my-2 text-2xl inline" />
                     :
                    <AiOutlineCaretRight className="my-2 text-2xl inline" />}
            </button>
        }
    </div>
    )
}
