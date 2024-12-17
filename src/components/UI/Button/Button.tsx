import React from "react";
import "./button.css";

type BtnProps={
  children: React.ReactNode
  type?: 'button'| 'submit' | 'reset',
  onClick?:()=>void,
  disabled?: boolean,
  styles?:string
}

export const Button = ({
children,
type = 'button',
onClick,
disabled = false,
styles=''
}:BtnProps)=>{
  return (
    <button className={`btn ${styles}`} onClick={onClick}>{children}</button>
  )
}