/**The component  displays the episode information in the list view
 * External Component:
 * Rating Wrapper: to display the ratings
*/

import React, { memo } from "react";
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

  /**Captures the click on the episode and sets the episode id in the state. If the same episode is clicked then it sets the value to -1 */
  const onEpisodeClicked = ()=>{
    if(selected?.episode_id === data.episode_id){
      dispatch(selectEpisode(-1))  
    }else{
    dispatch(selectEpisode(data.episode_id))
    }
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

export default memo(EpisodeEntry);