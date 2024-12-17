import React,{forwardRef} from "react";
import "./input.css";

type InputProps = {
  placeholder?:string,
  onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void,
  styles?:string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "", styles = "input", onChange }, ref) => {
  return (<input 
      ref={ref}
      className={`input ${styles}`} 
      placeholder={placeholder}
      onChange={onChange}
    />)
})