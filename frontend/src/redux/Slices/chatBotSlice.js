import {
    createSlice,
} from "@reduxjs/toolkit"

import {
    createTranscriptID,
    postUserNeed,
    getUserTranscriptFromAPIAsync,
    createChatTitle,
    getUserChatFromAPIAsync,
    getAllMessages,
    updateChatTitle,
    deleteChatsFromAPI,
    generateSurvey,
    update_survey_by_id
} from "../Thunks/chatBotThunk";

import {
    setLoadingAndError,
    setError
} from "../../components/common/slice_state";

const initialState = {
    surveyByChat: [],
    chatTranscript: [],
    chatData: [],
    loading: null,
    error: null,
};


export const chatBotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE TRANSCRIPT ID CASE
            .addCase(createTranscriptID.pending, setLoadingAndError)
            .addCase(createTranscriptID.fulfilled, (state, action) => {
                state.loading = false;
                state.chatTranscript.push(action.payload)
            })
            .addCase(createTranscriptID.rejected, setError)


            // USER TRANSCRIPT IDS BY A USER CASE
            .addCase(getUserTranscriptFromAPIAsync.pending, setLoadingAndError)
            .addCase(getUserTranscriptFromAPIAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.chatTranscript = action.payload
            })
            .addCase(getUserTranscriptFromAPIAsync.rejected, setError)


            // POST USER NEED TO THE API CASE
            .addCase(postUserNeed.pending, setLoadingAndError)
            .addCase(postUserNeed.fulfilled, (state, action) => {
                state.loading = false;
                state.chatData.push(action.payload)
            })
            .addCase(postUserNeed.rejected, setError)


            // CREATE CHAT TITLE API CASE
            .addCase(createChatTitle.pending, setLoadingAndError)
            .addCase(createChatTitle.fulfilled, (state, action) => {
                state.loading = false;

                const {
                    transcript_id,
                    title
                } = action.payload

                const existingChat = state.chatTranscript.find(conversation =>
                    String(conversation.transcript_id) === String(transcript_id)
                )

                if (existingChat) {
                    existingChat.title = title
                }
            })
            .addCase(createChatTitle.rejected, setError)


            //  CHAT TITLE UPDATE FUNCTION
            .addCase(updateChatTitle.pending, setLoadingAndError)
            .addCase(updateChatTitle.fulfilled, (state, action) => {
                state.loading = false;

                const {
                    id,
                    title
                } = action.payload

                const existingChat = state.chatTranscript.find(conversation =>
                    String(conversation.transcript_id) === String(id)
                )
                if (existingChat) {
                    existingChat.title = title
                }

            })
            .addCase(updateChatTitle.rejected, setError)

            // GET USER MESSAGES BY TRANSCRIPT CASE
            .addCase(getUserChatFromAPIAsync.pending, setLoadingAndError)
            .addCase(getUserChatFromAPIAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.chatData = action.payload
            })
            .addCase(getUserChatFromAPIAsync.rejected, setError)

            // GET ALL USER MESSAGES
            .addCase(getAllMessages.pending, setLoadingAndError)
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.chatData = action.payload
            })
            .addCase(getAllMessages.rejected, setError)


            // DELETE COMMENTS CASE
            .addCase(deleteChatsFromAPI.pending, setLoadingAndError)
            .addCase(deleteChatsFromAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.chatData = state.chatData.filter(({
                    transcript
                }) => String(transcript) !== String(action.payload))

                state.chatTranscript = state.chatTranscript.filter(({
                    transcript_id
                }) => String(transcript_id) !== String(action.payload))
            })
            .addCase(deleteChatsFromAPI.rejected, setError)

            // GET USER MESSAGES BY TRANSCRIPT CASE
            .addCase(generateSurvey.pending, setLoadingAndError)
            .addCase(generateSurvey.fulfilled, (state, action) => {
                state.loading = false;
                state.surveyByChat = action.payload
            })
            .addCase(generateSurvey.rejected, setError)


            //  SURVEY UPDATE FUNCTION
            .addCase(update_survey_by_id.pending, setLoadingAndError)
            .addCase(update_survey_by_id.fulfilled, (state, action) => {
                state.loading = false;
                const {
                    options
                } = action.payload;
                state.surveyByChat.options = options;

            })
            .addCase(update_survey_by_id.rejected, setError)


    }
})




export const {
    addChatPrompt,
    deleteConversationPrompt,
    updateChatPrompt
} = chatBotSlice.actions

export default chatBotSlice.reducer
