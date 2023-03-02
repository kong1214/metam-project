import { NavLink } from "react-router-dom";
import "./NotFound.css"

export default function NotFound() {
    return (
        <div id="not-found-container">
            <div id="not-found-header">Oops! You seem to be lost.</div>
            <p>Click below to go back to something useful!</p>
            <NavLink to='/' style={{fontWeight: "bold"}}>Home</NavLink>
        </div>
    )
}
