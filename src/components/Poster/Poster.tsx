import React, { useState } from "react";
import { Shimmer } from "../UI/Shimmer/Shimmer";

type PosterProps = {
  source: string,
  styles?:string,
  alt: string
}

export const Poster = ({source, alt, styles=''}:PosterProps)=>{
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const handleImageLoad = () => setImageLoaded(true);
  return(
    <>
    {!imageLoaded && <Shimmer type="image" />}
    <img
      className={styles}
      src={source || ""}
      alt={alt || "Episode Poster"}
      style={{ display: imageLoaded ? "block" : "none" }} // Hide image till it loads
      onLoad={handleImageLoad} // Trigger when image is loaded
    />
    </>
  )
}