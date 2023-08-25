import React, { useState, useEffect } from 'react';
import { siteThemes } from '../constants/siteThemes'

export const SideBarVisibleContext = React.createContext();

export function SidebarVisibleProvider({ children }) {

    const [sidebarVisible, setSidebarVisible] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1450) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };

        // Initial check
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <SideBarVisibleContext.Provider value={{ sidebarVisible, setSidebarVisible}}>
                {children}
            </SideBarVisibleContext.Provider>
        </>
    )
}
