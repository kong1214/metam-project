import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../../context/Themes";
import ThemeSelector from "./ThemeSelector";
import ThemeDropDown from "./ThemeDropDown";
import "./ThemeSelector.css"

function ThemeButton() {
  // showMenu State Variable
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(false)
  const { currentTheme, theme } = useContext(ThemeContext)
  const buttonRef = useRef();
  // const iconRef = useRef()

  // Open menu function when clicking button
  const openMenu = (e) => {
    if (showMenu) return;
    setShowMenu(true);
    setIsActive(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // If any elements other than the dropdown, the button, or the icon are clicked, close the dropdown and set the button to inactive
      if (!buttonRef.current.contains(e.target)) {
        setShowMenu(false);
        setIsActive(false);
      }
    };

    // Adding event listener to close the dropdown
    document.addEventListener('click', closeMenu);

    // Removing the event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const dropdownClassName = "theme-dropdown-wrapper" + (showMenu ? "" : " hidden");
  const colorsArr = Object.values(theme)
  return (
    <div id="theme-button-dropdown-wrapper">
      <button id="theme-button" onClick={openMenu} style={isActive ? { backgroundColor: theme["primary"] } : { backgroundColor: "transparent" }}>
        <i className="fa-solid fa-palette fa-2xl" style={{ color: theme["secondary"] }} />
      </button>
      <div className={dropdownClassName} ref={buttonRef} >
        <div id="theme-dropdown-header">Site Styles</div>
        <div id="theme-selector-wrapper">
          Theme
          <ThemeSelector />
        </div>
        <div id="current-theme-circles-wrapper">
          Theme Colors
          <div id="current-theme-colors">
            {colorsArr.map((color) => (
              <div id="current-theme-single-color-circle" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeButton;
