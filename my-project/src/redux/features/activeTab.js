import { createSlice } from "@reduxjs/toolkit";

const activeTab = createSlice({
    name: "activeTab",
    initialState: {
        value : 'photo'
    },
    reducers: {
        changeActiveTab : (state, action) => {
            state.value = action.payload
        }
    }
})


export const {changeActiveTab} = activeTab.actions
export default activeTab.reducer