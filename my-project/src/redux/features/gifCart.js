import { createSlice } from "@reduxjs/toolkit";

const gifCart = createSlice({
    name: "gifCart",
    initialState: {
        value : []
    },
    reducers: {
        addGifCart: (state, action)=> {
            state.value.push(action.payload)
        },
        removeGifCart: (state, action) => {
            //filter actually returns new array
            //here state.value is an array of objects, objects are not comparable, so we just check id.
            state.value = state.value.filter((item) => item.id !== action.payload.id)
        },
        clearGifCart: (state) => {
            state.value = []
        }
    }
})


export const {addGifCart, removeGifCart, clearGifCart} = gifCart.actions
export default gifCart.reducer