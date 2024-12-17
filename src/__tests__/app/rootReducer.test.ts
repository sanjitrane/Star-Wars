import rootReducer from "../../app/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import EpisodeReducer from "../../features/Episodes/episodesSlice";
import RatingReducer from "../../features/Ratings/ratingsSlice";
import SortReducer from "../../features/Sort/sortSlice";
import SearchReducer from "../../features/Search/searchSlice";

import {selectEpisode} from "../../features/Episodes/episodesSlice";
import { assignSort } from "../../features/Sort/sortSlice";
import { assignSearch } from "../../features/Search/searchSlice";

describe('rootReducer', ()=>{
  const store = configureStore({reducer: rootReducer});

  it('should have correct initial state for each slice', ()=>{
    const state = store.getState();
    expect(state.episodes).toEqual(EpisodeReducer(undefined, {type:''}));
    expect(state.ratings).toEqual(RatingReducer(undefined, {type:''}));
    expect(state.sort).toEqual(SortReducer(undefined, {type:''}));
    expect(state.search).toEqual(SearchReducer(undefined, {type:''}));
  });

  it('should handle selectEpisode action in episode slice', ()=>{
    const episode = {
      title: "The Empire Strikes Back",
      episode_id: 5,
      opening_crawl: "Test crawl",
      director: "Irvin Kershner",
      producer: "Gary Kurtz, Rick McCallum",
      release_date: "1980-05-17",
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: "2014-12-12T11:26:24.656000Z",
      edited: "2014-12-15T13:07:53.386000Z",
      url: ""
      }
    store.dispatch({ type: 'episodes/fetchList/fulfilled', payload: { results: [episode] } });
    store.dispatch(selectEpisode(5));

    const state = store.getState();
    expect(state.episodes.selected).toEqual(episode);
  });

  it('should handle assignSort action in sort slice', ()=>{
    const sortType = "imdbRating";
    store.dispatch(assignSort(sortType));
    const state = store.getState();
    expect(state.sort.sortType).toBe(sortType);
  });

  it('should handle assignSearch action in search slice', ()=>{
    const searchTerm = "Empire";
    store.dispatch(assignSearch(searchTerm));
    const state = store.getState();
    expect(state.search.searchTerm).toBe(searchTerm);
  })
})


