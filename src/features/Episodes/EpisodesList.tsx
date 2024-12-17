import React, { useEffect, lazy, Suspense, useState } from "react";
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
  const [list, setList] = useState<Episode[]>([])
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(fetchEpisodes())
  },[dispatch])

  useEffect(()=>{
    setList(episodes)
  },[episodes])

  useEffect(()=>{
    
    const filtered = getFilteredList([...episodes], searchTerm)
    if(sortType === "imdbRating" && Object.keys(ratings).length > 0){
      const sortedList = filtered.map(episode=>{
        const rating = ratings[episode.title];
        return{...episode, imdbRating: rating?.imdbRating || '0'}
      })
      const sorted = sortData(sortType, sortedList);
      setList(sorted as Episode[])
      
    }else{
      const sorted = sortData(sortType, [...filtered]);
      setList(sorted as Episode[])
    }
  },[sortType, ratings, episodes, searchTerm])
  return (
    <div>
      {loading && <Shimmer lines={3}/>}
      {error && <p>{error}</p>}
      {list.map((episode)=>{
        return isDesktop ?  
        <Suspense key={episode.episode_id} fallback={<Shimmer lines={1}/>}><EpisodeEntryComponent  data={episode}/></Suspense>
        : <Suspense key={episode.episode_id} fallback={<Shimmer lines={1}/>}><AccordianComponent episode={episode}/></Suspense>
      })}
      
    </div>
  )
}

export default EpisodeList;