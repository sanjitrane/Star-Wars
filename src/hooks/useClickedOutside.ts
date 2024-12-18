/**Hook to capture any click outside the passed eleemnt */
import { RefObject, useEffect } from "react"

type EventType = MouseEvent | TouchEvent

export const useClickedOutside = <T extends HTMLElement>(
  ref: RefObject<T>, 
  cb:(event: EventType)=>void
)=>{
  useEffect(()=>{
    const listener = (event:EventType)=>{
      if(!ref.current || ref.current.contains(event.target as Node)){
        return;
      }
      cb(event)
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return ()=>{
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener)
    }
  },[ref, cb])
}