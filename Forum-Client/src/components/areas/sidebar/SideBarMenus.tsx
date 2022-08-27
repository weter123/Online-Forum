import { faUser, faRegistered, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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
        setShowLogin(!showLogin);
    };

    const onClickToggleLogout = () => {
        setShowLogout(!showLogout);
    };

    return(
        <React.Fragment>
            <ul>
                
                {user.user && user.user.id !== "0"  ? null : (
                    <li>
                        <FontAwesomeIcon icon= {faRegistered} />
                        <span onClick={onClickToggleRegister} className='menu-name'>
                            register
                        </span>
                        <Registration 
                            isOpen={showRegister}
                            onClickToggle={onClickToggleRegister} 
                        />
                        
                    </li>
                )}

                {user.user && user.user.id !== "0"  ? null : (
                    <li>
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span onClick={onClickToggleLogin} className="menu-name">
                            login
                        </span>
                        <Login isOpen={showLogin} onClickToggle={onClickToggleLogin} />
                    </li>
                )}

                {user.user && user.user.id !== "0"  ? (
                     <li>
                        <FontAwesomeIcon icon= {faUser} />
                        <span className='menu-name'>
                            <Link to={`/userprofile/${user.user?.id}`}>{user.user?.userName}</Link>
                        </span>
                    </li>
                ): null}

                {user.user && user.user.id !== "0" ? (
                    <li>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span onClick={onClickToggleLogout} className="menu-name">
                            logout
                        </span>
                        <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout} />
                    </li>
                 ): null}
            </ul>
            
        </React.Fragment>
    );

};
export default SideBarMenus;