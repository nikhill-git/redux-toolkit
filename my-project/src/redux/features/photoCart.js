import { createSlice } from "@reduxjs/toolkit";

const photoCart = createSlice({
    name: "photoCart",
    initialState:{
        value : []
    },
    reducers: {
        addPhotoCart:(state, action) => {
            state.value.push(action.payload);
        },
        removePhotoCart : (state, action) => {
            //filter actually returns new array
            //here state.value is an array of objects, objects are not comparable, so we just check id.
            state.value = state.value.filter((item) => item.id !== action.payload.id)
        },
        clearPhotoCart:(state)=> {
            state.value = [];
        }
    }
})


export const {addPhotoCart, clearPhotoCart, removePhotoCart} = photoCart.actions;
export default photoCart.reducer;