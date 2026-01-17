import { createSlice } from "@reduxjs/toolkit";

const cacheResultsSlice = createSlice({
    name: "cacheResults",
    initialState: {},
    reducers: {
        cacheResults: (state, action)=> {
            state = Object.assign(state, action.payload)
        },
    }
})

export const {cacheResults} = cacheResultsSlice.actions
export default cacheResultsSlice.reducer
