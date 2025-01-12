import {
    createSelector
} from "@reduxjs/toolkit"


export const allBotsChats = state => state.botChats.chatData;

// Selector to get the chatTranscript array content slice from the botChats state
export const selectTranscripts = state => state.botChats.chatTranscript;

const select2 = (state, id) => id
export const userInfo = state => state.persistedReducer.auth.user

// Selector to get the policyCard slice from the state
export const policyCard = state => state.pagenation.cardData

// Selector to get the userComments slice from the state
export const user_comments = state => state.all_comments.comments_array

export const userNow = createSelector([userInfo, select2],
    (state, id) => state.find(user => parseFloat(user.id) === parseFloat(id)))

export const botChatsbyID = createSelector(
    [allBotsChats, select2], //first input: 2 arrays
    (botChat, id) => botChat.filter(eachChat => String(eachChat.transcript) === String(id)) //Output and the task
)

export const policyByID = createSelector(
    [policyCard, select2],
    (policy, id) => policy.find(eachPolicy => String(eachPolicy.eid) === String(id))
)

export const isCommentDeleted = createSelector(
    [user_comments],
    (user_comments) => {
        const comment_deleted = user_comments.filter(({
            deleted
        }) => deleted !== true)

        // FILTER COMMENTS BY USER CLICK
        return comment_deleted
    }
)



// Selector to create an array of unique chat messages
export const selectUniqueBotChats = createSelector(
    [allBotsChats, select2],
    (allChats, id) => {
        const chatsByUserID = allChats.filter(({user}) => parseFloat(user) === parseFloat(id))

        // Check chats, if an ID is shown twice, only return the first prompt {index 0}
        const idIndexes = {}; //To store the first occurence of each promptID

        const uniqueIDs = chatsByUserID.map((item, index) => {
            //map to check if the current item's promptID has been encountered before
            if (idIndexes[item.transcript] === undefined) {
                idIndexes[item.transcript] = index; //Stores in idIndexes if it is the first occurence
                return item;
            }
            return null; //If it is not the first occurence
        }).filter(item => item !== null); //Remove the null values from idIndexes

        return uniqueIDs
        //  uniqueIDs is our new array
    }

);


export const sortCommentFunction = (sortingState, commentsArray) => {
    let comments;
    if(sortingState === "most_replies"){
        // To get replies total, create a new object key and push into it
        //  the objects in which their parent === eid

        // let newComments = []
        // let totalReplies = 0
        // commentsArray.map((item, index) => {

        //      commentsArray.filter((item2) => {
        //         if(item.eid === item2.parent){
        //           totalReplies = totalReplies + 1
        //           const newItem = {
        //             ...item,
        //             totalReplies: totalReplies
        //         }

        //          return newComments.push(newItem)
        //         }

        //     })
        // })
        // console.log(newComments)
        comments = commentsArray
    }else if(sortingState === "most_reactions" || sortingState === "top_trending"){
        let filteredComments = commentsArray.sort((a,b) => {
            let reactionsA = a.upvote_count + a.downvote_count
            let reactionsB = b.upvote_count + b.downvote_count
            return reactionsA - reactionsB
        })
        comments = filteredComments.toReversed()
    }else{
        comments = commentsArray.sort((a,b) => {
            return b.date_created.localeCompare(a.date_created)
        })
    }

    return comments
}
