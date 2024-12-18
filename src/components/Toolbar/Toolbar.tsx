/**
 * This component acts as a parent component to hoist the required tools. 
 * ie; Sort Button , Search Button
 */
import React from "react";
import { SortButton } from "../SortButton/SortButton";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { assignSort } from "../../features/Sort/sortSlice";
import "./toolbar.css";
import { settings } from "../../utils/settings";

const Toolbar = ()=>{
const {sortType} = useSelector((state:RootState)=>state.sort)
const dispatch = useDispatch<AppDispatch>()

  const onCaptureSort = (str:string)=>{
    dispatch(assignSort(str))
  }

  return(<div className="toolbar-wrapper">
    <SortButton title="Sort by..." childrenConfig={settings.sortConfig} cb={onCaptureSort}/>
    <SearchBar/>
    </div>)
}

export default Toolbar;