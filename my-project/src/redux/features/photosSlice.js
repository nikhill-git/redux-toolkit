import { createSlice } from "@reduxjs/toolkit";

const  photosSlice = createSlice({
    name: "photos",
    initialState:{
        value : [],
        isActive : false,
    },  
    reducers:{
        pushDataP : (state, action)=> {
            state.value.push(action.payload);
        },
        toggleIsActivePhoto : (state)=> {
            state.isActive = !state.isActive;
        },
        clearPhotoData : (state) => {
            state.value = [];
        }
    }
})

export const {pushDataP, toggleIsActivePhoto, clearPhotoData} = photosSlice.actions
export default photosSlice.reducer
