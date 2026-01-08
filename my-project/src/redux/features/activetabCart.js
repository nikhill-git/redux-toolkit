import { createSlice } from "@reduxjs/toolkit";


const activeTabCart = createSlice({
    name: "activeTabCart",
    initialState: {
        value: "photoCart"
    },
    reducers: {
        changeActiveTabCart: (state, action) => {
            state.value = action.payload
        }
    }
}) 

export const {changeActiveTabCart} = activeTabCart.actions
export default activeTabCart.reducer

