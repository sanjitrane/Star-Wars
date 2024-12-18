/**Top Header component to display the website logo 
 * This can be futher utilised to add navigation and other feature btns
*/

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