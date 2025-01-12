import {
    createSlice
} from "@reduxjs/toolkit";

import {
    create_policy_card_API,
    get_all_policy_card_API,
    delete_policy_card_API,
    get_all_policy_card_by_location_API,
    surveyCards

} from "../Thunks/policyCardThunk";

import {
    setLoadingAndError,
    setError
} from "../../components/common/slice_state";

export const pagenationSlice = createSlice({
    name: "policyCard",
    initialState: {
        cardData: [],
        loading: false,
        error: null,
        loadingPage: 1,
    },
    reducers: {
        changePageNumber: (state, action) => {
            state.loadingPage = action.payload;
        },
        updatePolicyCard: (state, action) => {
            const {
                eid,
                content,
                category,
                policy_makers,
                regional_info,
                effective_date,
                voting_status
            } = action.payload

            const existingPolicy = state.cardData.find((element) => element.eid === eid)
            if (existingPolicy) {
                // Update the properties with the new values
                existingPolicy.content = content;
                existingPolicy.category = category;
                existingPolicy.policy_makers = policy_makers;
                existingPolicy.regional_info = regional_info;
                existingPolicy.effective_date = effective_date;
                existingPolicy.voting_status = voting_status;
            }

        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL POLICY CARDS CASE
            .addCase(get_all_policy_card_API.pending, setLoadingAndError)
            .addCase(get_all_policy_card_API.fulfilled, (state, action) => {
                state.loading = false;
                state.cardData = action.payload
            })
            .addCase(get_all_policy_card_API.rejected, setError)

            // GET ALL POLICY CARDS  BY LOCATIOnCASE
            .addCase(get_all_policy_card_by_location_API.pending, setLoadingAndError)
            .addCase(get_all_policy_card_by_location_API.fulfilled, (state, action) => {
                state.loading = false;
                state.cardData = action.payload
            })
            .addCase(get_all_policy_card_by_location_API.rejected, setError)

            // CREATE POLICY CARDS CASE
            .addCase(create_policy_card_API.pending, setLoadingAndError)
            .addCase(create_policy_card_API.fulfilled, (state, action) => {
                state.loading = false;
                state.cardData.push(action.payload)
            })
            .addCase(create_policy_card_API.rejected, setError)

            // GENERATE  POLICY CARDS BY SURVEY CASE
            .addCase(surveyCards.pending, setLoadingAndError)
            .addCase(surveyCards.fulfilled, (state, action) => {
                state.loading = false
                // console.log(action.payload)
            })
            .addCase(surveyCards.rejected, setError)


            // DELETE POLICY CARD BY ID
            .addCase(delete_policy_card_API.pending, setLoadingAndError)
            .addCase(delete_policy_card_API.fulfilled, (state, action) => {
                state.loading = false;
                state.cardData = state.cardData.filter(({
                    eid
                }) => String(eid) !== String(action.payload))
            })
            .addCase(delete_policy_card_API.rejected, setError)

    }
});

export const selectPolicyCardData = (state) => state.pagenation.cardData;
export const selectLoadingPage = (state) => state.pagenation.loadingPage;


export const {
    changePageNumber,
    updatePolicyCard
} = pagenationSlice.actions;

export default pagenationSlice.reducer;
