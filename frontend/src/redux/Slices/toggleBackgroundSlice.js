import { createSlice, createSelector } from "@reduxjs/toolkit";

export const toggleBackgroundSlice = createSlice({
    name: "toggleBackground",
    initialState:{
        isLightMode: true
    },
    reducers: {
        changeBackgoundMode: (state) => {
            return {
                ...state,
                isLightMode : !state.isLightMode
            }
        }
    }
})


export const selectA = state => state.backgroundMode;   //backgroundMode from reducer name

//check backgroundMode value which is isbackgroundMode 
export const selectbackground = createSelector([selectA], x => x.isLightMode)  

// dispatch action
export  const {changeBackgoundMode} = toggleBackgroundSlice.actions


export default toggleBackgroundSlice.reducer