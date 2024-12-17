import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortState={
  sortType:string
}

const initialState:SortState = {
  sortType:''
}

const sortSlice = createSlice({
  name:"sort",
  initialState,
  reducers:{
    assignSort:(state, action:PayloadAction<string>)=>{
      state.sortType = action.payload
    }
  }
})

export default sortSlice.reducer;
export const {assignSort} = sortSlice.actions;