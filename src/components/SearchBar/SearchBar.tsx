import React, { useCallback, useRef } from "react";
import { Input } from "../UI/Input/Input";
import { settings } from "../../utils/settings";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { assignSearch } from "../../features/Search/searchSlice";
import "./searchbar.css";

export const SearchBar = ()=>{
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {searchTerm} = useSelector((state:RootState)=>state.search)
  const dispatch = useDispatch<AppDispatch>()
  

  const onHandleChange = useCallback((str:string)=>{
    dispatch(assignSearch(str))
  },[])

  const debounced = useDebounce(onHandleChange, 500)

  const onHandleImageClick = ()=>{
    inputRef.current?.focus()
  }

  return (
  <div className="search-bar">
    <img 
    src={settings.searchIcon} 
    alt="search-icon"
    onClick={onHandleImageClick}
    />
    <Input
    ref= {inputRef}
    placeholder="Type to filter..."
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>debounced(e.target.value)}
    />
  </div>
  )
}

