import React, { memo, useEffect, useState } from "react";
import { Rating } from "../Rating/Rating"
import { Badge } from "../UI/Badge/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./detailView.css";
import { Episode, EpisodeDetail } from "../../types";
import { getRatingObj } from "../../utils/helpers";
import { Poster } from "../Poster/Poster";

const DetailView = ()=>{
const {selected} = useSelector((state:RootState)=>state.episodes);
const {ratings} = useSelector((state:RootState)=>state.ratings);

const [data, setData] = useState<EpisodeDetail | null>(null)

useEffect(()=>{
  if(selected){
    const ratingObj = getRatingObj(ratings, "episodeId", selected.episode_id)
    
    const withRatings:EpisodeDetail = {
      ...selected, 
      ratings: ratingObj?.Ratings || [], 
      poster: ratingObj?.Poster || "", 
      imdbRating: ratingObj?.imdbRating || "", 
    }
    setData(withRatings)
  }else{
    setData(null)
  }
},[selected])

if(!selected){
  return <section className="detail-section">
    <h3>Star Wars</h3>
    <p>Star Wars is an American epic space opera media franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon. The franchise has been expanded into various films and other media, including television series, video games, novels, comic books, theme park attractions, and themed areas, comprising an all-encompassing fictional universe. Star Wars is one of the highest-grossing media franchises of all time.</p>
  </section>
}

  return(
    <section className="detail-section">
      <h2 className="title">{data?.title}</h2>
      <div className="info-wrapper">
        <Poster 
        source={data?.poster || ""}
        styles="poster"
        alt={data?.title || "Episode Poster"}
        />
        <p className="info">{data?.opening_crawl}</p>
      </div>
      <p className="director">{`Directed by: ${data?.director}`}</p>
      <div className="ratings-wrapper">
        <p className="ratings-title">Average rating:</p>
        <Rating showStars={true} score={6} maxScore={10} />
      </div>
      {data?.ratings && (
        <div className="badges-wrapper">
          {data?.ratings.map((r, index)=>{
            return <Badge key={index} text={`${r.Source} : ${r.Value}`} styles="rating-badge"/>
          })}
        
        </div>)
      }
    </section>
  )
}

export default memo(DetailView);