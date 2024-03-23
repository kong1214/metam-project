import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/Themes";
import "./NotFound.css"

export default function NotFound() {
    const { theme } = useContext(ThemeContext)
    const history = useHistory()
    return (
        <div id="not-found-container">
            <div id="not-found-header">Oops! You seem to be lost.</div>
            <p>Click below to go back to something useful!</p>
            <button style={{ backgroundColor: theme["active"] }} id='go-to-home-button' onClick={() => history.push("/")}>
                <NavLink to='/' style={{ fontWeight: "bold" }}>Home</NavLink>
            </button>
        </div>
    )
}
