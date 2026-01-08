import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
    name: "videos",
    initialState: {
        value: [],
        isActive : false,
    },
    reducers: {
        pushDataV: (state, action)=> {
            state.value.push(action.payload);
        },
        toggleIsActiveVideo : (state) => {
            state.isActive = !state.isActive;
        },
        clearVideoData: (state)=> {
            state.value = [];
        }
    }
})

export const {pushDataV, toggleIsActiveVideo, clearVideoData} = videosSlice.actions
export default videosSlice.reducer