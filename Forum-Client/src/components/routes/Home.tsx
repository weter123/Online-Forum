import React, {FC} from "react";
import Main from '../areas/main/Main'
import SideBar from '../areas/sidebar/SideBar';
import Nav from '../areas/Nav';
import RightMenu from '../areas/rightMenu/RightMenu';
import LeftMenu from '../areas/LeftMenu';
import "./Home.css"
const Home:FC =() =>  {
    return(
        <div className="screen-root-container home-container">
            <div className="navigation">
                <Nav />
            </div>
            <SideBar />
            <LeftMenu />
            <Main />
            <RightMenu />
        </div>
    );
};

export default Home;