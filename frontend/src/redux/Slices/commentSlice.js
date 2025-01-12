import {
    createSlice
} from "@reduxjs/toolkit";
import {
    post_comment,
    fetch_all_comments,
    delete_comment_by_id,
    update_comment_by_id
} from "../Thunks/commentsThunk";

import {
    setLoadingAndError,
    setError
} from "../../components/common/slice_state";

const initialState = {
    comments_array: [],
    loading: false,
    error: null
}
export const commentSlice = createSlice({
    name: "comments_slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // POST COMMENYTS CASE
            .addCase(post_comment.pending, setLoadingAndError)
            .addCase(post_comment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments_array.push(action.payload)
            })
            .addCase(post_comment.rejected, setError)


            // FETCH COMMENTS CASE
            .addCase(fetch_all_comments.pending, setLoadingAndError)
            .addCase(fetch_all_comments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments_array = action.payload
            })
            .addCase(fetch_all_comments.rejected, setError)

            // DELETE COMMENTS CASE
            .addCase(delete_comment_by_id.pending, setLoadingAndError)
            .addCase(delete_comment_by_id.fulfilled, (state, action) => {
                state.loading = false;
                state.comments_array = state.comments_array.filter(({
                    eid
                }) => String(eid) !== String(action.payload))
            })
            .addCase(delete_comment_by_id.rejected, setError)

            // UPDATE COMMENTS CASE
            .addCase(update_comment_by_id.pending, setLoadingAndError)
            .addCase(update_comment_by_id.fulfilled, (state, action) => {
                state.loading = false;

                const {
                    eid,
                    text
                } = action.payload

                const existingComment = state.comments_array.find((element) => element.eid === eid)
                if (existingComment) {
                    existingComment.text = text;
                }
            })
            .addCase(update_comment_by_id.rejected, setError)
    }
})



export default commentSlice.reducer
