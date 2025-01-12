import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    makeApiRequest
} from "../../components/common/API_request";

export const post_comment = createAsyncThunk(
    "comments_slice/post_comment",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/${payload.eid}/comments/`
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${payload.accessToken}`,
            }
            const body = {
                post: payload.eid,
                author: payload.user_id,
                text: payload.comment,
                parent: payload.parent_comment_id
            }
            return await makeApiRequest(url, "POST", headers, body);

        } catch (error) {
            // console.error("Error Posting Comment.", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
)


export const fetch_all_comments = createAsyncThunk(
    "comments_slice/fetch_all_comments",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/${payload.eid}/comments/`
            const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${payload.accessToken}`,
                }
            return await makeApiRequest(url, "GET", headers, null);
        } catch (error) {
            // console.error("Error fetching comments:", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
)


// DELETE COMMENTS API
export const delete_comment_by_id = createAsyncThunk(
    "comments_slice/delete_comment_by_id",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/comments/${payload.eid}/delete-patch/`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${payload.accessToken}`,
                }
            })

            if (response.ok || response.status === 204) {
                return payload.eid
            } else {
                // Handle error cases here, you can throw an error or return an error object
                const errorData = await response.json();
                throw new Error(errorData.message); // For example, assuming the API returns an error message in the response
            }
        } catch (error) {
            // console.error("Error fetching transcripts:", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
)


// UPDATE COMMENTS API
export const update_comment_by_id = createAsyncThunk(
    "comments_slice/update_comment_by_id",
    async ({eid, edited_comment, accessToken}) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/comments/${eid}/delete-patch/`
            const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            const body = { text: edited_comment}
            return await makeApiRequest(url, "PATCH", headers, body);
        } catch (error) {
            // console.error("Comment update error", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
)
