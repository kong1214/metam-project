import { useRef, useEffect, useState, useContext } from "react";
import { siteThemes } from "../../constants/siteThemes";
import { ThemeContext } from "../../context/Themes";


function ThemeSelector(props) {
    const { currentTheme, setCurrentTheme, theme  } = useContext(ThemeContext)
    const divRef = useRef();

    const [showThemesMenu, setShowThemesMenu] = useState(false);

    const openThemesMenu = () => {
        if (showThemesMenu) return;
        setShowThemesMenu(true);
    };

    useEffect(() => {
        if (!showThemesMenu) return;

        const closeThemesMenu = (e) => {
            // Only close the Theme Dropdown menu if anything other than the dropdown and the input box is clicked
            if (!divRef.current.contains(e.target) && e.target.id !== "theme-input") {
                setShowThemesMenu(false);
            }
        };

        document.addEventListener("click", closeThemesMenu);

        return () => document.removeEventListener("click", closeThemesMenu);
    }, [showThemesMenu]);

    // Title Casing the Theme Names For Display
    const toTitleCase = (string) => {
        const stringArr = string.toLowerCase().split('')
        stringArr[0] = stringArr[0].toUpperCase()
        return stringArr.join('')
    }

    const themesEntriesArr = Object.entries(siteThemes)
    const ulClassName = "theme-input-dropdown" + (showThemesMenu ? "" : " hidden");


    // Theme Change Handle
    const handleThemeChange = (newTheme) => {
        setCurrentTheme(newTheme)
        localStorage.setItem("localTheme", newTheme)
    }
    return (
        <>
        <div id="theme-selector-input">
            {toTitleCase(currentTheme)}
        </div>
        </>
    )
}

export default ThemeSelector
