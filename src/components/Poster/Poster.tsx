/**Component to load poster image.
 * It displays a shimmer component till the time the actual image loads.
 * This can be futher extended by passing different size of image for different viewport.
 */

import React, { memo, useState } from "react";
import { Shimmer } from "../UI/Shimmer/Shimmer";

type PosterProps = {
  source: string,
  styles?:string,
  alt: string
}

export const Poster = memo(({source, alt, styles=''}:PosterProps)=>{
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const handleImageLoad = () => setImageLoaded(true);
  return(
    <>
    {!imageLoaded && <Shimmer type="image" />}
    <img
      className={styles}
      src={source || ""}
      alt={alt || "Episode Poster"}
      style={{ display: imageLoaded ? "block" : "none" }} 
      onLoad={handleImageLoad} 
    />
    </>
  )
})