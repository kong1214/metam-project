import React, { useState } from 'react';
import { siteThemes } from '../constants/siteThemes'

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {

    const localTheme = localStorage.getItem("localTheme")
    const [currentTheme, setCurrentTheme] = useState(localTheme || "default")

    return (
        <>
            <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}
