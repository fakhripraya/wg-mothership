import React, { Fragment, useEffect, useRef, useState } from 'react';
import './style.scss';
import Button from '../Button';
import Footer from '../Footer';
import { v4 as uuidv4 } from 'uuid';
import TextInput from '../TextInput';
import { useNavigate } from 'react-router-dom';
import { sendWACS } from '../../utils/functions/global';
import OverridingContainer from '../OveriddingContainer';
import WGLogo from '../../assets/images/ic_new_wg_logo.png';
import ICHamburger from '../../assets/svg/ic_hamburg_3.svg';
import { handleOpenLoginModal } from '../../utils/functions/credentials';
import { styleInitialState, onScrollY, getMenus } from '../../variables/styles/navbar';

export default function Navbar() {

    const navigate = useNavigate();
    const navHeader = useRef();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [login, setLogin] = useState(null);
    const [menus, setMenus] = useState(() => getMenus());
    const [style, setStyle] = useState(styleInitialState);

    // FUNCTIONS SPECIFIC //
    function handleStyleChange() {
        if (window.scrollY >= 10)
            setStyle(onScrollY(navHeader));
        else
            setStyle(styleInitialState);
    }

    function handleOverridingMenu() {
        setToggleMenu(!toggleMenu)
    }

    // COMPONENTS SPECIFIC //
    const ShowProfile = () => {
        if (!login) return <Button onClick={() => handleOpenLoginModal(setLogin)}>Login</Button>
        return <Fragment>
            <Button onClick={() => { navigator.clipboard.writeText("markontolito") }}>Notification</Button>
            <Button >Profile</Button>
        </Fragment>
    }

    const ShowSearchBar = () => {
        return <Fragment>
            <li className="navbar-search-wrapper">
                <TextInput className="navbar-search"></TextInput>
                <Button >Search</Button>
            </li>
            <li className="navbar-menu-item-wrapper">
                <Button >Device</Button>
                <Button >Pricing</Button>
                <Button >Location</Button>
            </li>
        </Fragment>
    }

    const ShowMenuRow = (props) => {
        const { children } = props;
        return <ul className="navbar-mobile-menu-row-wrapper">
            <li className="navbar-submenu-section">
                {children}
            </li>
        </ul>
    }

    const ShowMenuButtonsMobile = () => {
        return menus.map((menu, index) => {
            return <ShowMenuRow key={`mobile-button-${index}`}>
                <Button >{menu.name}</Button>
            </ShowMenuRow>
        })
    }

    const ShowMenuButtons = () => {
        return menus.map((menu, index) => {
            return <Button key={`button-${index}`}>{menu.name}</Button>
        })
    }

    // RENDERS SPECIFIC //
    useEffect(() => {
        window.addEventListener('scroll', handleStyleChange)
        return () => {
            window.removeEventListener('scroll', handleStyleChange)
        }
    }, []);

    return (
        <Fragment>
            <div className="sticky-top">
                <div style={style.navbarHeader} className="navbar-header-container" ref={navHeader}>
                    <div className="navbar-header-wrapper">
                        <ul >
                            <Button >Privacy and Policy</Button>
                            <Button >Terms and Conditions</Button>
                            <Button onClick={() => sendWACS()}>Customer Service</Button>
                        </ul>
                    </div>
                </div>
                <div style={style.navbar} className="navbar-container">
                    <div className="navbar-wrapper">
                        <div className="navbar-logo-wrapper">
                            <img onClick={() => navigate('/')} className="navbar-logo-img" src={WGLogo} alt="WG_LOGO"></img>
                        </div>
                        <ul className="navbar-menu-wrapper">
                            <ShowSearchBar />
                        </ul>
                        <ul className="navbar-submenu-wrapper">
                            <ul className="navbar-submenu-section">
                                <ShowMenuButtons />
                            </ul>
                            <ul className="navbar-submenu-section">
                                <ShowProfile />
                            </ul>
                        </ul>
                        <img onClick={() => { handleOverridingMenu() }} className='navbar-mobile-hamburger-image navbar-mobile-hamburger-image-view' src={ICHamburger} alt="ic_hamburger" />
                    </div>
                </div>
            </div>
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
        </Fragment >
    )
}
