import { createSlice } from "@reduxjs/toolkit";

const isSignUpSlice = createSlice({
    name: "isSignUp",
    initialState : {
        value : ""
    },
    reducers: {
        toggleIsSignUp : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {toggleIsSignUp} = isSignUpSlice.actions
export default isSignUpSlice.reducer