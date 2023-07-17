import React, { useState } from 'react';
import { siteThemes } from '../constants/siteThemes'

export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {

    let localTheme = localStorage.getItem("localTheme")
    const [currentTheme, setCurrentTheme] = useState(localTheme || "default")
    const theme = siteThemes[currentTheme]

    localTheme = "ember"
    return (
        <>
            <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, theme }}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}
