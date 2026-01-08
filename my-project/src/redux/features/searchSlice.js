import {createSlice} from "@reduxjs/toolkit"

const searchSlice = createSlice({
    name: "query",
    initialState:{
        value: ''
    },
    reducers:{
        setQuery:(state, action)=>{
            state.value = action.payload
        }
    }

})

export const {setQuery} = searchSlice.actions
export default searchSlice.reducer