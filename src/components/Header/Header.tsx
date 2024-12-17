import React from "react";
import { settings } from "../../utils/settings"
import "./header.css";

const Header = ()=>{
  return(
    <header className="header-wrapper">
      <img src={settings.logo} alt="star-wars-logo"/>
    </header>
  )
}

export default Header;