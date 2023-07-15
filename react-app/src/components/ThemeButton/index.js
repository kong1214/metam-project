import React, { useState, useEffect, useRef } from "react";
import "./ThemeButton.css"

function ThemeButton (props) {
    // showMenu State Variable
    const [showMenu, setShowMenu] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const ulRef = useRef();
    const iconRef = useRef()

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
        if (!ulRef.current.contains(e.target) && e.target.id !== "sidebar-theme-button" && !iconRef.current.contains(e.target)) {
          setShowMenu(false);
          setIsActive(false);
        }
      };

      // Adding event listener to close the dropdown
      document.addEventListener('click', closeMenu);

      // Removing the event listener
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "theme-dropdown" + (showMenu ? "" : " hidden");

    return (
        <button id="theme-button" className={isActive ? "active" : ""}>
            <i className="fa-solid fa-palette fa-xl" />
        </button>
    );
}

export default ThemeButton;
