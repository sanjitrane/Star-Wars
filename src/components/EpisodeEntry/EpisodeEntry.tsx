import React from "react";
import RatingWrapper from "../../features/Ratings/RatingWrapper";
import { Episode } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { selectEpisode } from "../../features/Episodes/episodesSlice";
import "./episodeEntry.css";

type EpisodeProps={
  data:Episode
}

const EpisodeEntry = ({data}:EpisodeProps)=>{
  const {selected} = useSelector((state:RootState)=>state.episodes)
  const dispatch = useDispatch<AppDispatch>()

  const onEpisodeClicked = ()=>{
    dispatch(selectEpisode(data.episode_id))
  }


  return(<div className={`episode-wrapper ${selected?.episode_id === data.episode_id ? 'selected' : ''}`}  onClick={onEpisodeClicked}>
    <div className="episode-number">
      <span>{`Episode ${data.episode_id}`}</span>
    </div>
    <div className="episode-name">
      <span>{data.title}</span>
    </div>
    <div className="ratings">
      <RatingWrapper movieTitle={data.title} year={data.release_date} episodeId={data.episode_id}/>
    </div>
    <div className="year">
      <span>{data.release_date}</span>
    </div>
  </div>
  )
}

export default EpisodeEntry