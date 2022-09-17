import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import ReactModal from "react-modal";
import SideBarMenus from "./sidebar/SideBarMenus";
import "./Nav.css";
import {useLocation, useNavigate } from "react-router-dom";
const Nav = () => {
    const[showMenu, setShowMenu] = useState(false);
    const {width} = useWindowDimensions();

    const navigate = useNavigate();
    const location = useLocation();

    const getMobileMenu = () => {
        if(width <= 768){
            return(
                <FontAwesomeIcon 
                onClick={onClickToggle}
                icon= {faBars} size ="lg" className= "nav-mobile-menu" />
            );
        }
        return null;
    }

    const onClickToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
        setShowMenu(!showMenu);
    }

    const onRequestClose = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) =>{
        setShowMenu(false);
    }
    const onClickGoHome = () => {
        navigate("/", {replace : true});
        window.location.reload();
    }
    return( 
    
        <React.Fragment>
            <ReactModal className='modal-menu'
            isOpen ={showMenu}
            onRequestClose ={onRequestClose}
            shouldCloseOnOverlayClick = {true}
            >
                <SideBarMenus />
            </ReactModal>
        <nav >
        {getMobileMenu()}

        <strong onClick ={onClickGoHome}>SuperForum</strong>

        </nav>
        </React.Fragment>
    );
};

export default Nav;