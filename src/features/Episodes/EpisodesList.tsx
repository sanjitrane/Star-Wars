/**
 * The component is used to fetch data from an api and render the information as an accordian or normal entry based on the viewport size.
 * The child components are lazy loaded for better performance 
 * This can be further extended to use pagination, react-virtualised list for a larger data set. 
 */

import React, { useEffect, lazy, Suspense, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {fetchEpisodes} from "./episodesSlice";
import { getFilteredList, sortData } from "../../utils/helpers";
import { Episode } from "../../types";
import { useResponsive } from "../../hooks/useResponsive";
import { Shimmer } from "../../components/UI/Shimmer/Shimmer";

const AccordianComponent = lazy(()=>import("../../components/AccordianView/AccordianView"));
const EpisodeEntryComponent = lazy(()=>import("../../components/EpisodeEntry/EpisodeEntry"));


const EpisodeList = ()=>{
  const {isDesktop} = useResponsive();
  const {episodes, loading, error} = useSelector((state:RootState)=> state.episodes)
  const {ratings} = useSelector((state:RootState)=>state.ratings)
  const {sortType} = useSelector((state:RootState)=>state.sort)
  const {searchTerm} = useSelector((state:RootState)=>state.search)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(fetchEpisodes())
  },[dispatch])

  /**Function to filter and sort data based on the user interaction with the sort and search component */
  /**Since episodes and ratings are stored in different keys in the state, they must be merged here before displaying */
  /**
   * Ratings are individually fetched by the entry component, hence if the information is merged with the episode state, then it would result in re-rendering of this component multiple times hampering the performance
   */
  
  const filteredAndSortedList = useMemo(()=>{
    const filtered = getFilteredList([...episodes], searchTerm)
    if (sortType === "imdbRating" && Object.keys(ratings).length > 0) {
      const sortedList = filtered.map((episode) => {
        const rating = ratings[episode.title];
        return { ...episode, imdbRating: rating?.imdbRating || "0" };
      });
      return sortData(sortType, sortedList) as Episode[];
    }
    return sortData(sortType, filtered) as Episode[];

  },[sortType, ratings, episodes, searchTerm])

  return (
    <div>
      {loading && <Shimmer lines={3}/>}
      {error && <p>{error}</p>}
      {filteredAndSortedList.map((episode)=>{
        return isDesktop ?  
        <Suspense key={episode.episode_id} fallback={<Shimmer lines={1}/>}><EpisodeEntryComponent  data={episode}/></Suspense>
        : <Suspense key={episode.episode_id} fallback={<Shimmer lines={1}/>}><AccordianComponent episode={episode}/></Suspense>
      })}
      
    </div>
  )
}

export default EpisodeList;