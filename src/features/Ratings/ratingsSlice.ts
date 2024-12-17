import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MovieTitle, OMDBResponse } from "../../types";
import { settings } from '../../utils/settings';

type RatingState = {
  loading: boolean,
  ratings: Record<MovieTitle,OMDBResponse>,
  error:string | null,
}

const initialState:RatingState = {
  loading:false,
  ratings:{},
  error: null
}

export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async({movieTitle, year, episodeId}:{movieTitle: string, year: string, episodeId: number})=>{
  const response = await fetch(`${settings.omdbApiURI}?apikey=${process.env.REACT_APP_API_KEY}&y=${year}&t=${movieTitle}`)
  let obj:OMDBResponse;
  if(!response.ok){
    throw new Error('Failed to fetch Ratings');
  }else{
    const data = await response.json();
    obj = {
      Title: data.Title,
      Year: data.Year,
      Poster:data.Poster,
      Ratings: data.Ratings,
      imdbRating:data.imdbRating,
      episodeId: episodeId,
    }
  }
  
  return {title: movieTitle, rating: obj}
})

export const ratingSlice = createSlice({
  name:"ratings",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchRatings.pending,(state)=>{
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRatings.fulfilled, (state, action: PayloadAction<{title:MovieTitle, rating: OMDBResponse}>)=>{
      state.loading = false;
      state.error = null;
      state.ratings[action.payload.title] = action.payload.rating;
    });
    builder.addCase(fetchRatings.rejected,(state, action)=>{
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch rating';
    })
  }
})

export default ratingSlice.reducer;