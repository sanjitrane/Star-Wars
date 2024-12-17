import React from "react";
import "./badge.css";

type BadgeProps = {
  styles?:string,
  text:string
}
export const Badge = ({text, styles=''}:BadgeProps)=>{
  return <div className={`badge ${styles}`}>{text}</div>
}
