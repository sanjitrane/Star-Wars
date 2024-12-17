import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  searchTerm: string
}

const initialState:SearchState={
  searchTerm:''
}

const searchSlice = createSlice({
  name:"search",
  initialState,
  reducers:{
    assignSearch:(state, action:PayloadAction<string>)=>{
      state.searchTerm = action.payload
    }
  }
})

export default searchSlice.reducer;
export const {assignSearch} = searchSlice.actions;
