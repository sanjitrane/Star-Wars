import React,{ useCallback, useState, useRef, RefObject} from "react"
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
  const ref = useRef<HTMLDivElement>(null)
  const [toggleView, onToggleView] = useState<boolean>(false)

  const onHandleToggle = useCallback(()=>{
    onToggleView((view)=>!view)
  },[])

  const onHandleViewSelection = useCallback((str:string)=>{
    onToggleView(false)
    cb(str)
  },[cb])

  useClickedOutside(ref as RefObject<HTMLDivElement>, ()=>onToggleView(false))

  return <div className="sort-btn" ref={ref}>
    <Button onClick={onHandleToggle}>{title || "Sort by..."}</Button>
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