import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { settings } from '../../utils/settings';
import { Episode } from '../../types';


type EpisodeState = {
  loading:boolean;
  error: string | null;
  episodes:Episode[];
  selected: Episode | null;
}

const initialState: EpisodeState = {
  loading:false,
  error:null,
  episodes:[],
  selected: null
}

export const fetchEpisodes = createAsyncThunk<{results: Episode[]}>("episodes/fetchList", async()=>{
  const resp = await fetch(`${settings.episodesApiURI}`)
  if(!resp.ok){
    throw new Error('Failed to fetch episodes')
  }
  const data = await resp.json();
  return data;
})

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    selectEpisode:(state, action:PayloadAction<number>)=>{
     const episode = state.episodes.find((episode)=>episode?.episode_id === action.payload);
      state.selected = episode || null;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchEpisodes.pending,(state)=>{
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      state.episodes = action.payload.results;
    });
    builder.addCase(fetchEpisodes.rejected,(state, action)=>{
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
      state.episodes = []
    })
  }
});

export const { selectEpisode } = episodesSlice.actions;
export default episodesSlice.reducer;
