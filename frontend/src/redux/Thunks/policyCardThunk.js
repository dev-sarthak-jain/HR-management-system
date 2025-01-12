import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    makeApiRequest
} from "../../components/common/API_request";



// CREATE POLICY  CARD
export const create_policy_card_API = createAsyncThunk(
    "policyCard/create_policy_card_API",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/`
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${payload.accessToken}`,
            }
            const body = {
                content: payload.content,
                category: payload.category,
                policy_makers: payload.policy_makers,
                regional_info: payload.regional_info,
                location: payload.location,
                userneed_id: payload.userneed_id,
                effective_date: payload.effective_date,
                voting_status: payload.voting_status
            }
            return await makeApiRequest(url, "POST", headers, body);
        } catch (error) {
            // console.error("Error creating Policy card:", error);
            // console.error("Error details:", error.message);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    })

// GET ALL POLICY CARDS FROM THE SERVER
export const get_all_policy_card_API = createAsyncThunk(
    "policyCard/get_all__policy_card_API",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/`;
            const headers = {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${payload.accessToken}`,
            }

            return await makeApiRequest(url, "GET", headers, null);
        } catch (error) {
            // console.error("Error fetching policy cards:", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
);


// GET ALL POLICY CARDS BY LOCATION
export const get_all_policy_card_by_location_API = createAsyncThunk(
    "policyCard/get_all_policy_card_by_location_API",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/location/${payload.location}/`;
            const headers = {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${payload.accessToken}`,
            }

            return await makeApiRequest(url, "GET", headers, null);
        } catch (error) {
            // console.error("Error fetching policy cards:", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
);


// DELETE POLICY CARD BY ID FROM SERVER
export const delete_policy_card_API = createAsyncThunk(
    "policyCard/delete_policy_card_API",
    async (payload) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/policy_cards/${payload.eid}/`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${payload.accessToken}`,
                }
            })
            if (response.ok || response.status === 204) {
                return payload.eid; // Return the parsed response data
            } else {
                // Handle error cases here, you can throw an error or return an error object
                const errorData = await response.json();
                throw new Error(errorData.message); // For example, assuming the API returns an error message in the response
            }

        } catch (error) {
            // console.log(error)
        }
    }
)


// GENERATE POLICY CARD BY SURVEY
export const surveyCards = createAsyncThunk(
    "policyCard/surveyCards",
    async ({survey_id, transcript_id}) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/api/policycardgeneration/${survey_id}/${transcript_id}`
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.ok || response.status === 204) {
                return null; // Return the parsed response data
            } else {
                // Handle error cases here, you can throw an error or return an error object
                const errorData = await response.json();
                throw new Error(errorData.message); // For example, assuming the API returns an error message in the response
            }

        } catch (error) {
            // console.error("Error creating generated policy cards:", error);
            throw error; // Rethrow the error to handle it in the Redux reducer
        }
    }
);
