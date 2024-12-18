/**
 * Shimmer component to display as a loading view when data is being loaded in the hoisted component.
 * It displays lines or image based on the type passed.
 * The number of animated lines can be controlled by the lines props.
 */
import React from "react"
import "./shimmer.css";

type ShimmerProps={
  lines?:number
  type?:'lines' | 'image'
}

export const Shimmer = ({ lines=2, type='lines' }:ShimmerProps)=>{

  const renderLines = ()=>{
    return(
      <div className="wrapper">
        {Array.from({length:lines}).map((_, index)=>{
          return <div key={index} className="stroke animate title"></div>  
        })}
      </div>
    )
  }

  const renderImage=()=>{
    return(
      <div className="wrapper">
        <div className="image-card animate"/>
      </div>
    )
  }

  const renderByType = ()=>{
    switch(type){
      case "lines":
        return renderLines();
      case "image":
        return renderImage();
      default:
        return renderLines();
    }
  }

  return(<div className="shimmer" data-testid="shimmer">
    {renderByType()}
  </div>)
  
}

