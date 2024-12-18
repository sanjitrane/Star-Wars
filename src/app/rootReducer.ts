/** Combines the required reducers for the store to consume  */

import { combineReducers } from '@reduxjs/toolkit';
import EpisodeReducer from "../features/Episodes/episodesSlice";
import RatingsReducer from "../features/Ratings/ratingsSlice";
import SortReducer from "../features/Sort/sortSlice";
import SearchReducer from "../features/Search/searchSlice";

const rootReducer = combineReducers({
  episodes: EpisodeReducer,
  ratings: RatingsReducer,
  sort: SortReducer,
  search: SearchReducer,
});

export default rootReducer;
