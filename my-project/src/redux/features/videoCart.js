import { createSlice } from "@reduxjs/toolkit";

const videoCart = createSlice({
    name: "videoCart",
    initialState: {
        value: []
    },
    reducers:{
        addVideoCart: (state, action) => {
            state.value.push(action.payload)
        },
        removeVideoCart: (state, action)=> {
            //filter actually returns new array
            //here state.value is an array of objects, objects are not comparable, so we just check id.
            state.value = state.value.filter((item) => item.id !== action.payload.id)
        },
        clearVideoCart:(state)=> {
            state.value = []
        }
    }
})

export const {addVideoCart, removeVideoCart, clearVideoCart} = videoCart.actions;
export default videoCart.reducer