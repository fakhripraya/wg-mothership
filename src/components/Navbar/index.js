import React, {
    Fragment,
    useEffect,
    useRef,
    useState
} from 'react';
import './style.scss';
import Button from '../Button';
import Footer from '../Footer';
import TextInput from '../TextInput';
import {
    useNavigate
} from 'react-router-dom';
import OverridingContainer from '../OveriddingContainer';
import WGLogo from '../../assets/images/ic_new_wg_logo.png';
import ICHamburger from '../../assets/svg/ic_hamburg_3.svg';
import XMark from '../../assets/svg/xmark-solid.svg';
import {
    getMenus
} from '../../variables/path/navbar';
import Dropdown from '../Dropdown';
import Login from '../../pages/Login';

export default function Navbar() {

    const ref = useRef();
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);
    const [login, setLogin] = useState(null);
    const [menus, setMenus] = useState(() => getMenus());

    // FUNCTIONS SPECIFIC //

    function handleNavbarDisplay() {
        function displayChange(opacity, visibility) {
            ref.current.style.opacity = opacity;
            ref.current.style.visibility = visibility;
        }

        if (!toggleLogin) displayChange("0", "hidden");
        else displayChange("1", "visible");
    }

    function handleOverridingMenu() {
        setToggleMenu(!toggleMenu)
    }

    function handleOpenLoginModal() {
        handleNavbarDisplay();
        setToggleLogin(!toggleLogin)
    }

    // COMPONENTS SPECIFIC //
    const ShowNavbar = (props) => {
        return <div className="navbar-container">
            <div className="navbar-wrapper">
                <div className="navbar-mobile-logo-wrapper">
                    <img onClick={() => navigate('/')} className="navbar-logo-img" src={WGLogo} alt="WG_LOGO"></img>
                </div>
                {props.children}
            </div>
        </div>
    }
    const ShowProfile = () => {
        if (!login) return <Button onClick={() => handleOpenLoginModal()}>Login</Button>
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
                <Dropdown showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
                <Dropdown showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
                <Dropdown showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
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
                <Button onClick={() => navigate(menu.route)}>{menu.name}</Button>
            </ShowMenuRow>
        })
    }

    const ShowMenuButtons = () => {
        return menus.map((menu, index) => {
            return <Button onClick={() => navigate(menu.route)} key={`button-${index}`}><span className="white-space-no-wrap">{menu.name}</span></Button>
        })
    }

    // RENDERS SPECIFIC //
    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <div ref={ref} className="fixed-top navbar">
                <div className="navbar-container">
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
                    <ShowNavbar>
                        <img onClick={() => { handleOverridingMenu() }} className='navbar-mobile-hamburger-image' src={ICHamburger} alt="ic_hamburger" />
                    </ShowNavbar>
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
            <OverridingContainer toggle={toggleLogin}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => { handleOpenLoginModal() }} className='navbar-mobile-hamburger-image' src={XMark} alt="ic_hamburger" />
                    </ShowNavbar>
                    <Login />
                    <Footer />
                </div>
            </OverridingContainer >
        </Fragment >
    )
}
