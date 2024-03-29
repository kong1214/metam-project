import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditSectionModal from "../SectionModals/EditSectionModal";
import DeleteSectionModal from "../SectionModals/DeleteSectionModal";
import "./SingleProjectPage.css"
import DeleteModal from "../Modals/DeleteModal";

function SectionDropDown({ section }) {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "section-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu} className="project-page-dropdown-button">
                <i className="fa-solid fa-ellipsis fa-xl section-ellipsis-icon"></i>
            </button>
            <div className={ulClassName} ref={ulRef}>
                <OpenModalButton
                    buttonText="Edit Section"
                    onButtonClick={closeMenu}
                    modalComponent={<EditSectionModal section={section}/>}
                    className="modal-button"
                />
                <OpenModalButton
                    buttonText="Delete Section"
                    onButtonClick={closeMenu}
                    modalComponent={<DeleteModal type='section' item={section}/>}
                    className="modal-button"
                />
            </div>
        </>
    );
}

export default SectionDropDown;
