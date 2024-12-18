/** This component is used to fetch the rating information based on the episode id and year passed from the parent component (EpisodeEntry).
 * External Components:
 * Shimmer
 * Rating
 */

import React, { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchRatings } from "./ratingsSlice";
import { Rating } from "../../components/Rating/Rating";
import { getYearFromDate } from "../../utils/helpers";
import { useResponsive } from "../../hooks/useResponsive";
import { Shimmer } from "../../components/UI/Shimmer/Shimmer";

type RatingWrapperProps = {
  movieTitle:string,
  year: string,
  episodeId:number,
}

const RatingWrapper = ({movieTitle, year, episodeId}:RatingWrapperProps)=>{
  const {isDesktop, isTablet} = useResponsive();
  const rating = useSelector((state:RootState)=> state.ratings.ratings[movieTitle]);
  const loading = useSelector((state:RootState)=>state.ratings.loading);
  const error = useSelector((state:RootState)=>state.ratings.error);

  const dispatch = useDispatch<AppDispatch>();

  /**Fetch the rating detail  */
  useEffect(()=>{
    if(!rating){
      const onlyYr = getYearFromDate(year).toString();
      dispatch(fetchRatings({movieTitle, year:onlyYr, episodeId}))
    }
  },[dispatch, movieTitle, year, episodeId, rating])
  
  return(<>
  {loading && <Shimmer lines={1}/>}
  {error && <p>{error}</p>}
  {rating && (
      <Rating showStars={isDesktop|| isTablet} score={parseFloat(rating.imdbRating)}/>
    )}
  </>)
}

export default memo(RatingWrapper);