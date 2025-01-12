import {
  createSlice,
  createSelector
} from '@reduxjs/toolkit';

const sharedSlice = createSlice({
  name: 'shared_useEffect',
  initialState: {
    isRendered: true,
    isFive: 0,
    surveyEnd: false,
    isChatSideBarOpen: false,
    sortByCategory: "most_recent",
    location: "",
    currentNumberOfComments:0,
  },
  reducers: {
    searchedLocation: (state, action) => {
      state.location = action.payload.location
    },
    setSharedState: (state, action) => {
      state.isRendered = action.payload
    },
    addOne: (state, action) => {
      state.isFive = action.payload.isFive
    },
    endSurvey: (state) => {
      state.surveyEnd = !state.surveyEnd
    },
    toggleChatSideBar: (state) => {
      state.isChatSideBarOpen = !state.isChatSideBarOpen
    },
    sortBySlicer: (state, action) => {
      state.sortByCategory = action.payload.sortByCategory
    },
    getNewCommentsTotal:(state, action) =>{
      state.currentNumberOfComments = action.payload.currentNumberOfComments
    }
  },
});


export const selectA = state => state.shared_useEffect; //backgroundMode from reducer name

//check backgroundMode value which is isbackgroundMode
export const selectRenderedState = createSelector([selectA], x => x.isRendered)
export const surveyActivity = createSelector([selectA], x => x.surveyEnd)

// Check if sidebar is opened/closed on mobile or tablet
export const chatSideOpen = createSelector([selectA], x => x.isChatSideBarOpen)

export const sortingCategory = createSelector([selectA], x => x.sortByCategory)

export const policySearchedLocation = createSelector([selectA], x => x.location)

export const selectNumberOfComments = createSelector([selectA], item => item.currentNumberOfComments)

export const {
  setSharedState,
  addOne,
  endSurvey,
  toggleChatSideBar,
  sortBySlicer,
  searchedLocation,
  getNewCommentsTotal

} = sharedSlice.actions;
export default sharedSlice.reducer;
