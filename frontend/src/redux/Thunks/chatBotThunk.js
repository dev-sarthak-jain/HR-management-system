import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  makeApiRequest
} from "../../components/common/API_request";

// CREATE TRANSCRIPT ID THUNK
export const createTranscriptID = createAsyncThunk(
  "chatbot/createTranscriptID",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/transcription/`;
      const headers = {
        "Content-Type": "application/json"
      };
      const body = {
        user: payload.user
      };

      return await makeApiRequest(url, "POST", headers, body);
    } catch (error) {
      // console.error("Error creating transcript:", error);
      throw error;
    }
  }
);


// GET ALL TRANSCRIPTS FROM THE SERVER
export const getUserTranscriptFromAPIAsync = createAsyncThunk(
  "chatbot/getUserTranscriptFromAPIAsync",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/all-transcripts/${payload.user_id}/`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${payload.accessToken}`,
      };

      return await makeApiRequest(url, "GET", headers, null);
    } catch (error) {
      // console.error("Error fetching transcripts:", error);
      throw error;
    }
  }
);

// SEND USER NEEDS TO SERVER THUNK
export const postUserNeed = createAsyncThunk(
  "chatbot/postUserNeed",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/create-messages/${payload.transcriptID}/`;
      const headers = {
        "Content-Type": "application/json",
        //  "Authorization": `Bearer ${payload.accessToken}`
      };
      const body = {
        user_response: payload.prompt,
        user: payload.user_id
      };

      return await makeApiRequest(url, "POST", headers, body);
    } catch (error) {
      // console.error("Error creating chat:", error);
      throw error;
    }
  }
);

// CREATE CHAT TITLE THUNK
export const createChatTitle = createAsyncThunk(
  "chatbot/createChatTitle",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/generate-update-title/${payload.transcriptID}/`;
      const headers = { "Content-Type": "application/json" };
      const body = { title: payload.prompt };

      return await makeApiRequest(url, "POST", headers, body);
    } catch (error) {
      // console.error("Error creating chat title:", error);
      throw error;
    }
  }
);

// GET USER CHAT FROM API ASYNC
export const getUserChatFromAPIAsync = createAsyncThunk(
  "chatbot/getUserChatFromAPIAsync",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/create-messages/${payload.transcript_id}/`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${payload.accessToken}`,
      };

      return await makeApiRequest(url, "GET", headers, null);
    } catch (error) {
      // console.error("Error fetching chats by transcripts:", error);
      throw error;
    }
  }
);

// GET ALL MESSAGES
export const getAllMessages = createAsyncThunk(
  "chatbot/getAllMessages",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/all-messages/`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${payload.accessToken}`,
      };

      return await makeApiRequest(url, "GET", headers, null);
    } catch (error) {
      // console.error("Error fetching transcripts:", error);
      throw error;
    }
  }
);

// UPDATE COMMENTS API
export const updateChatTitle = createAsyncThunk(
  "comments_slice/updateChatTitle",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/generate-update-title/${payload.transcriptID}/`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${payload.accessToken}`,
        },
        body: JSON.stringify({
          title: payload.user_response
        })
      })

      if (response.ok || response.status === 204) {
        const id = payload.transcriptID
        const title = payload.user_response
        return {
          id,
          title
        }
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

// AN ASYNC THUNK THAT DELETES CHATS
export const deleteChatsFromAPI = createAsyncThunk(
  "chatbot/deleteChatsFromAPI",
  async (payload) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/create-messages/${payload.transcriptID}/`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${payload.accessToken}`,
        },
      });

      if (response.ok || response.status === 204) {
        return payload.transcriptID; // Return the parsed response data
      } else {
        // Handle error cases here, you can throw an error or return an error object
        const errorData = await response.json();
        throw new Error(errorData.message); // For example, assuming the API returns an error message in the response
      }
    } catch (error) {

    }
  })

  // GENERATE A SURVEY FROM THE SERVER
export const generateSurvey = createAsyncThunk(
  "chatbot/generateSurvey",
  async ({ user_id, transcript_id }) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/surveys/${user_id}/${transcript_id}`;
      const headers = { "Content-Type": "application/json" };

      return await makeApiRequest(url, "GET", headers, null);
    } catch (error) {
      // console.error("Error generating survey:", error);
      throw error;
    }
  }
);

// UPDATE COMMENTS API
export const update_survey_by_id = createAsyncThunk(
  "chatbot/update_survey_by_id",
  async ({
    survey_id,
    accessToken,
    ranking
  }) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/surveys/${survey_id}/update`
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          options: ranking
        })
      })

      if (response.ok || response.status === 204) {
        const updated_comments = await response.json()
        return updated_comments
      } else {
        // Handle error cases here, you can throw an error or return an error object
        const errorData = await response.json();
        throw new Error("This is a bad request"); // For example, assuming the API returns an error message in the response
      }
    } catch (error) {
      // console.error("Error fetching transcripts:", error);
      throw error; // Rethrow the error to handle it in the Redux reducer
    }
  }
)
