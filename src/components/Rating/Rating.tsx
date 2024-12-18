/** Based on the props the component decides to display rating info as stars or numbers  */

import React, { memo } from "react";
import { settings } from "../../utils/settings";
import "./rating.css";

type RatingProps = {
  showStars:boolean,
  score: number,
  maxScore?:number 
}

export const Rating = memo(({showStars, score = 0, maxScore=settings.maxRating}:RatingProps)=>{

  const starRatings = ()=>{
    const activeStars = Math.floor(score);
    const max = maxScore;
    return Array.from({length:max}).map((star, index)=>{
      if(index < activeStars){
        return <img key={index} src={settings.starFilled} alt="Filled Star"/>
      }else{
        return <img key={index} src={settings.starOutlined} alt="Outlined Star"/>
      }
    })

  }

  const numberRating = ()=>{
    return <p>{score} / {maxScore}</p>
  }

  /**Conditional rendering based on the prop showStars */
  return(<div className="rating-wrapper">
    {showStars ? starRatings() : numberRating()}
  </div>)
})