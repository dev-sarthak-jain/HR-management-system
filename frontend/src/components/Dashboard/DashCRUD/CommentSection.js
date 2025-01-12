import React, { useState, useEffect } from 'react';
import CommentImpression from './commentImpression';
import { Replies, ShowReplies } from './Replies';
import ChatPrompt from '../../ChatBox/ChatPrompt';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { delete_comment_by_id, post_comment, update_comment_by_id } from '../../../redux/Thunks/commentsThunk';
import { isCommentDeleted, sortCommentFunction } from '../../../redux/Selectors/selectors';
import { readableDate } from '../../common/set_date';
import { arrayInputOnChange, changeArrayItemState, resetActions } from '../../common/show_and_hide';
import ChatPopUp from '../../ChatBox/ChatPopUp';
import { userInfo } from '../../../redux/Selectors/selectors';
import { getNewCommentsTotal, sortingCategory } from '../../../redux/Slices/sharedUseEffectSlice';

import { testingComments } from '../../../mockups/Dashboard';

const CommentSection = () => {
    let userID;
  const user = useSelector(state => userInfo(state))
 if(user){
   userID = user.id;
 }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    const { policyCardID } = useParams(); // Access the parameter value
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState(false)  //PopUp Hidden initially

    const sortedBy = useSelector(state => sortingCategory(state))
    const unFilteredCommentsTotal = useSelector(isCommentDeleted)
    const commentsTotal =  sortCommentFunction(sortedBy, unFilteredCommentsTotal)





    // console.log(sortedBy)

    // Filter all comments to only show those that the parent field is null. These will
    // be the comments to each policy card
    // and not the reply(comments with parent that is not  null) to each comments
    const comments_with_null_parent = commentsTotal.filter(({ parent }) => {
        return parent === null
    })



    const [editAction, setEditAction] = useState(Array.from({ length: comments_with_null_parent.length }, () => false));
    const [showHideReplies, setShowHideReplies] = useState(Array.from({ length: comments_with_null_parent.length }, () => false));
    const [hideBox, setHideBox] = useState(Array.from({ length: comments_with_null_parent.length }, () => false));
    const [moreAction, setMoreAction] = useState(Array.from({ length: comments_with_null_parent.length }, () => false));

    const [comment, setComment] = useState("")
    const [reply, setReply] = useState("")
    const [commentID, setCommentID] = useState("")
    let [inputValue, setInputValue] = useState(
        Array.from({ length: comments_with_null_parent.length }, () => "")
    );



    // SHOW AND HIDE REPLIES
    const handleClick = (index) => {
        changeArrayItemState(index, showHideReplies, setShowHideReplies)
    }

    // SHOW AND HIDE REPLY INPUT
    const toggle_reply_box = (index) => {
        resetActions(index, comments_with_null_parent, setHideBox)
        setMoreAction(Array.from(
            { length: comments_with_null_parent.length },
            () => false
        ))
    }

    // SHOW AND HIDE EDIT/DELETE CONTAINER
    const show_more_actions = (index) => {
        changeArrayItemState(index, moreAction, setMoreAction)
    }

    //ON COMMENT CHANGE
    const inputOnChange = (index, e) => {
        arrayInputOnChange(index, e, inputValue, setInputValue)
    }

    // POST COMMENT
    const submitComment = (e) => {
        toggle_reply_box()
        e.preventDefault()
        if(comment){
            dispatch(
                post_comment({
                    accessToken: token,
                    eid: policyCardID,
                    user_id: userID, //user_id will be fetched from user details
                    comment,
                    parent_comment_id: null
                    //Since it is a comment to the policy card,
                    // it does not have a parent
                })
            )
        }

        setComment("")
    }

    // POST REPLY
    const submitReply = (id) => {
        toggle_reply_box()
        if(reply){
            dispatch(
                post_comment({
                    accessToken: token,
                    eid: policyCardID,
                    user_id: userID,
                    comment: reply,
                    parent_comment_id: id
                    //parent_comment_id is set to the id of the comment it is replied to.
                })
            )
        }

        setReply("")
    }

    // SHOW THE EDIT INPUT BOX
    const handleEdit = (comment_id, index) => {
        setInputValue(
            comments_with_null_parent.map(({ text }) => {
                return text;
            })
        )
        resetActions(index, comments_with_null_parent, setEditAction)
        setCommentID(comment_id)
        show_more_actions(index)
    }

    // UPDATE COMMENT
    const confirmUpdate = (comment_id, index) => {
        handleEdit()
        show_more_actions()
        toggle_reply_box()

        if (!inputValue[index]) {
            alert("This field cannot be empty!")
        } else {
            dispatch(
                update_comment_by_id({
                    accessToken: token,
                    eid: comment_id,
                    edited_comment: inputValue[index]
                })
            )
        }



    }
    const handleDelete = () => {
        toggle_reply_box()
        if(commentID){
            dispatch(
                delete_comment_by_id({
                    accessToken: token,
                    eid: commentID
                })
            )
        }
        setPopUp(!popUp)

    }


    useEffect(() => {
        // // RESET COMMENTS TOTAL ON EACH PAGE ENTRY:
        // dispatch(
        //     getNewCommentsTotal({
        //         currentNumberOfComments:0
        //     })
        // )
        // console.log(comments_with_null_parent)

        if(comments_with_null_parent){
            dispatch(
                getNewCommentsTotal({
                    currentNumberOfComments:comments_with_null_parent.length
                })
            )
        }
        sortCommentFunction(sortedBy, unFilteredCommentsTotal)

         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortedBy])

    return (
        <div>
            {comments_with_null_parent &&

                comments_with_null_parent.map(({ eid, date_created, upvote_count,
                    downvote_count, text, post, author, username }, index) => {



                    const date_object = readableDate(date_created)
                    // Filter all comments to only show those that the parent field is not null.
                    // These will be the reply to each comments
                    const replies_per_comment = commentsTotal.filter(({ parent }) => {
                        return String(parent) === String(eid)
                    })

                    return (
                        <div key={index} data-id={eid}>
                            <CommentImpression
                                id={eid}
                                commentPoster={userID}
                                index={index}
                                username={username}
                                comment_date={date_object}
                                comment_text={text}
                                upvote_count={upvote_count}
                                downvote_count={downvote_count}
                                size="35"
                                replyComment={submitReply}
                                reply={reply}
                                handleReplyChange={e => setReply(e.target.value)}
                                replyPromptShow={hideBox}
                                edit_delete_div={moreAction}
                                edit_box={editAction}
                                input_value={inputValue[index]}
                                set_Input_Value={(e) => inputOnChange(index, e)}
                                toggleReplyBox={toggle_reply_box}
                                showMoreActions={show_more_actions}
                                cancelAction={() => {
                                    handleEdit()
                                    show_more_actions()
                                    toggle_reply_box()
                                }}
                                deleteComment={(comment_id) => {
                                    setCommentID(comment_id)
                                    setPopUp(!popUp)
                                }}
                                handleUpdate={confirmUpdate}
                                editComment={handleEdit}
                                setInputValue={e => setCommentID(e.target.value)}
                            />

                            <ShowReplies
                                index={index}
                                arrayToMap={replies_per_comment}
                                seeReplies={handleClick}
                                setArray={showHideReplies}
                            />

                            <Replies
                                showHideReplies={showHideReplies}
                                index={index}
                                arrayToMap={replies_per_comment}

                            />

                            {/* <hr /> */}
                        </div>
                    )
                })}
            <ChatPrompt
                currentMode={true}
                bgOnDark="bg-nightModeDark"
                position="static"
                placeholder="Comment Something here..."
                submitPrompt={submitComment}
                value={comment}
                handleChange={(e) => {
                    setComment(e.target.value)
                }} />


            {/* POP UP */}
            {popUp && <ChatPopUp
                objectModel="Comment?"
                handleClosePopUp={() => setPopUp(!popUp)}
                handleCancel={() => setPopUp(!popUp)}
                promptTarget="This comment"
                handleDelete={handleDelete}

            />}




        </div>

    );
}

export default CommentSection;
