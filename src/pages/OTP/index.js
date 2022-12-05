import React, { useState } from 'react';
import OverridingContainer from '../../components/OveriddingContainer';
import './style.scss';

export default function OTP() {

    const [toggleMenu, setToggleMenu] = useState(false);

    function handleOverridingMenu() {
        setToggleMenu(!toggleMenu)
    }

    return (
        <OverridingContainer toggle={toggleMenu}>
            <div className="sticky-top">
                <div className="navbar-container">
                    <div className="navbar-wrapper">
                        <div className="navbar-mobile-logo-wrapper">
                            <img onClick={() => navigate('/')} className="navbar-logo-img" src={WGLogo} alt="WG_LOGO"></img>
                        </div>
                        <img onClick={() => { handleOverridingMenu() }} className='navbar-mobile-hamburger-image' src={ICHamburger} alt="ic_hamburger" />
                    </div>
                </div>
                <ul className="navbar-mobile-menu-wrapper">
                    <ShowSearchBar />
                </ul>
                <ShowMenuRow>
                    <ShowProfile />
                </ShowMenuRow>
                <ShowMenuButtonsMobile />
                <Footer />
            </div>
        </OverridingContainer >
    )
}
