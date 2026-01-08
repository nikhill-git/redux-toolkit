import { createSlice } from "@reduxjs/toolkit";

const gifsSlice = createSlice({
    name: "gifs",
    initialState:{
        value : [],
        isActive : false,
    },
    reducers:{
        pushDataG : (state, action)=> {
            state.value.push(action.payload);
        },
        toggleIsActiveGif: (state)=> {
            state.isActive = !state.isActive;
        },
        clearGifData : (state) => {
            state.value = [];
        }
    }
})

export const {pushDataG, toggleIsActiveGif, clearGifData} = gifsSlice.actions
export default gifsSlice.reducer