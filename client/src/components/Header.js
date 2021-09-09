import React, { useContext } from "react";
import Headroom from "react-headroom";
import "../components/css/Header.css";
// import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
// import StyleContext from "../../contexts/StyleContext";

function Header() {
  const isDark = false;
  //   const {isDark} = useContext(StyleContext);
  const viewAchievement = true;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          <span className="logo-name">
            {"GOVERNMENT COLLEGE OF ENGINEERING AMRAVATI"}
          </span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{ color: "white" }}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          <li>
            <a href="#contact">About</a>
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
