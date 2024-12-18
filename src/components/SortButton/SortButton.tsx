/**
 * The component works as a select box to display the options to sort the listed data
 * It requires :
 * Title - to display on the button
 * Children Config - To display the options
 * Callback - to pass the information about the value selected to the hosting component 
 */

import React,{ useCallback, useState, useRef, RefObject} from "react"
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useClickedOutside } from "../../hooks/useClickedOutside";
import { Button } from "../UI/Button/Button";
import "./sortButton.css";

type Config = {name: string, value: string}

type SortButtonProps={
  title: string,
  childrenConfig?: Config[],
  cb:(str:string)=>void
}

export const SortButton = ({
  title,
  childrenConfig = [],
  cb
}:SortButtonProps)=>{
  const {episodes} = useSelector((state:RootState)=>state.episodes)
  const ref = useRef<HTMLDivElement>(null)
  const [toggleView, onToggleView] = useState<boolean>(false)

  const onHandleToggle = useCallback(()=>{
    onToggleView((view)=>!view)
  },[])

  const onHandleViewSelection = useCallback((str:string)=>{
    onToggleView(false)
    cb(str)
  },[cb])

  /**hook used to capture click event outside this component, inorder to trigger the closing of the drop-down */
  useClickedOutside(ref as RefObject<HTMLDivElement>, ()=>onToggleView(false))

  return <div className="sort-btn" ref={ref}>
    <Button disabled={!episodes || episodes.length === 0} onClick={onHandleToggle}>{title || "Sort by..."}</Button>
    {
    toggleView && childrenConfig.length > 0 && (
      <ul>
        {childrenConfig.map((option, index)=>{
        return <li key={index} onClick={()=>onHandleViewSelection(option.value)}><span>{option.name}</span></li>
      })}
      </ul>
      )
    }
  </div>
}