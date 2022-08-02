import { faUser, faRegistered, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {useAppSelector } from '../../../hooks/useHooks'

import Registration from "../../auth/Registeration"
import Login from '../../auth/Login';
import Logout from '../../auth/Logout';
import "./SideBarMenu.css";
import { Link } from 'react-router-dom';
const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin,setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const user = useAppSelector(state =>state.user);
    
   

    

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    };
    const onClickToggleLogin = () => {
        setShowLogin(!showRegister);
    };

    const onClickToggleLogout = () => {
        setShowLogout(!showRegister);
    };
    return(
        <React.Fragment>
            <ul>
                <li>
                    <FontAwesomeIcon icon= {faUser} />
                    <span className='menu-name'>
                        <Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link>
                    </span>
                </li>
                <li>
                <FontAwesomeIcon icon= {faRegistered} />
                    <span onClick={onClickToggleRegister} className='menu-name'>
                        register
                        <Registration isOpen={showRegister}
                        onClickToggle={onClickToggleRegister} />
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span onClick={onClickToggleLogin} className="menu-name">
                        login
                    </span>
                     <Login isOpen={showLogin} onClickToggle={onClickToggleLogin} />
                 </li>

                 <li>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span onClick={onClickToggleLogout} className="menu-name">
                        logout
                    </span>
                     <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout} />
                 </li>
            </ul>
        </React.Fragment>
    );

};
export default SideBarMenus;