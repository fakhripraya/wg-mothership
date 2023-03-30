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
import {
    getMenus
} from '../../variables/path/navbar';
import Dropdown from '../Dropdown';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import NewPassword from '../../pages/NewPassword';
import OTP from '../../pages/OTP';
import {
    NO_STRING,
    LOGIN,
    MENU_MOBILE,
    CLIENT_USER_INFO,
    LOGOUT_MODAL,
    URL_POST_LOGOUT,
    ERROR_MODAL
} from '../../variables/global';
import { ShowNavbar } from '../Global';
import { navbarInitialStyle } from '../../variables/styles/navbar';
import Cookies from 'universal-cookie';
import Avatar from 'react-avatar';
import FloatButton from '../FloatButton';
import Modal from '../Modal';
import { trackPromise } from 'react-promise-tracker';
import { useAxios } from '../../utils/hooks/useAxios';

export default function Navbar() {

    // OBJECT CLASSES
    const cookies = new Cookies();

    // HOOKS //
    const postCredentialService = useAxios();

    // VARIABLE
    const ref = useRef();
    const navigate = useNavigate();
    const menus = getMenus();

    // STATES
    const [toggleOverride, setToggleOverride] = useState(NO_STRING);
    const [modalToggle, setModalToggle] = useState(false);
    const [modalName, setModalName] = useState(NO_STRING);
    const [navbarStyle, setNavbarStyle] = useState(navbarInitialStyle);
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTIONS SPECIFIC //
    function handleOpenModal(modalName) {
        setModalName(modalName);
        setModalToggle(!modalToggle);
    }

    function handleErrorMessage(error) {
        if (typeof error.errorContent !== 'string') setErrorMessage(JSON.stringify(error.errorContent));
        else setErrorMessage(error.errorContent);
        handleOpenModal(ERROR_MODAL);
    }

    function handleNavbarDisplay(overridingToggle) {
        function displayChange(opacity, visibility) {
            ref.current.style.opacity = opacity;
            ref.current.style.visibility = visibility;
        }

        if (overridingToggle === NO_STRING) displayChange("1", "visible");
        else displayChange("0", "hidden");
    }

    function handleWindowScroll(overridingToggle) {
        // Scroll window to top
        window.scrollTo(0, 0);

        // Then use condition for the scrolling behavior
        if (overridingToggle === NO_STRING) window.document.getElementsByTagName('html')[0].style.overflow = "auto";
        else window.document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }

    function handleNavbarHide() {
        if (window.scrollY > 80) setNavbarStyle({ transform: 'translateY(-100%)' });
        else setNavbarStyle({ transform: 'translateY(0)' });
    }

    function handlePageNavigation(navMenu) {
        window.handleOpenOverriding(NO_STRING);
        navigate(navMenu);
    }

    function handleLogout() {
        trackPromise(
            postCredentialService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_LOGOUT,
                headers: { "authorization": `Bearer ${cookies.get(CLIENT_USER_INFO, { path: '/' }).credentialToken.accessToken}` },
            }).then(() => {
                cookies.remove(CLIENT_USER_INFO, { path: '/' });
            }).catch((error) => {
                return handleErrorMessage(error);
            })
        );
    }

    // WINDOW FUNCTIONS //
    window.handleOpenOverriding = function (overridingToggle) {
        handleWindowScroll(overridingToggle);
        handleNavbarDisplay(overridingToggle);
        setToggleOverride(overridingToggle);
    }

    // COMPONENTS SPECIFIC //
    const ShowProfile = () => {
        const login = cookies.get(CLIENT_USER_INFO);
        if (!login) return <Button onClick={() => window.handleOpenOverriding(LOGIN)}>Login</Button>
        else if (login.user && login.credentialToken) return <Fragment>
            <FloatButton className="navbar-icon-button navbar-icon-button-bell" />
            <FloatButton onClick={() => handleOpenModal(LOGOUT_MODAL)} className="navbar-icon-button navbar-icon-button-logout" />
            <Avatar style={{ cursor: "pointer" }} onClick={() => { }} size={"60px"} round={true} title={login.user.fullName} name={login.user.fullName} />
        </Fragment>
        else return <Button onClick={() => window.handleOpenOverriding(LOGIN)}>Login</Button>
    }

    const ShowSearchBar = () => {
        return <Fragment>
            <li className="navbar-search-wrapper">
                <TextInput className="navbar-search"></TextInput>
                <Button >Search</Button>
            </li>
            <li className="navbar-menu-item-wrapper">
                <Dropdown onChange={(value) => { }} showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
                <Dropdown onChange={(value) => { }} showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
                <Dropdown onChange={(value) => { }} showTitle={false} toggle={true} values={["Fittest", "Jancokest"]} />
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

    const ShowMenuButtons = () => {
        return menus.map((menu, index) => {
            return <ShowMenuRow key={`mobile-button-${index}`}>
                <Button onClick={() => handlePageNavigation(menu.route)}>{menu.name}</Button>
            </ShowMenuRow>
        })
    }

    const ShowLogoutModal = () => {
        return <div className="navbar-modal-container dark-bg-color">
            <div className="navbar-modal-wrapper">
                <Button onClick={() => handleOpenModal(NO_STRING)} className="align-self-end add-catalogue-button red-bg-color">
                    <h4 className="add-catalogue-button-text">X</h4>
                </Button>
                <br />
                <h2 className="margin-top-0 margin-bottom-12-18">Are you sure to logout your account ?</h2>
                <div style={{ padding: "0px" }} className="navbar-mobile-menu-row-wrapper">
                    <Button onClick={() => handleLogout()} style={{ marginRight: "8px" }} >Yes</Button>
                    <Button className="red-bg-color" onClick={() => handleOpenModal(NO_STRING)}>No</Button>
                </div>
            </div>
        </div>
    }

    // RENDERS SPECIFIC //
    useEffect(() => {
        window.addEventListener("scroll", handleNavbarHide);
        return () => window.removeEventListener("scroll", handleNavbarHide);
    }, []);

    return (
        <Fragment>
            <Modal className="dark-bg-color" clicked={() => handleOpenModal(NO_STRING)} toggle={modalToggle} >
                <ShowLogoutModal />
            </Modal>
            <div style={navbarStyle} ref={ref} className="fixed-top navbar">
                <div className="navbar-container">
                    <div className="navbar-wrapper">
                        <div className="navbar-logo-wrapper">
                            <img onClick={() => handlePageNavigation('/')} className="navbar-logo-img" src={WGLogo} alt="WG_LOGO"></img>
                        </div>
                        <img onClick={() => { window.handleOpenOverriding(MENU_MOBILE) }} className='navbar-mobile-hamburger-image navbar-mobile-hamburger-image-view' src={ICHamburger} alt="ic_hamburger" />
                    </div>
                </div>
            </div>
            <OverridingContainer toggle={toggleOverride === MENU_MOBILE}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => { window.handleOpenOverriding(NO_STRING) }} className='navbar-mobile-hamburger-image' src={ICHamburger} alt="ic_hamburger" />
                    </ShowNavbar>
                    <ul className="navbar-mobile-menu-wrapper">
                        <ShowSearchBar />
                    </ul>
                    <ShowMenuRow>
                        <ShowProfile />
                    </ShowMenuRow>
                    <ShowMenuButtons />
                    <Footer />
                </div>
            </OverridingContainer >
            <Login toggle={toggleOverride} handleOpen={window.handleOpenOverriding} />
            <Register toggle={toggleOverride} handleOpen={window.handleOpenOverriding} />
            <ForgotPassword toggle={toggleOverride} handleOpen={window.handleOpenOverriding} />
            <NewPassword toggle={toggleOverride} handleOpen={window.handleOpenOverriding} />
            <OTP toggle={toggleOverride} handleOpen={window.handleOpenOverriding} />
        </Fragment >
    )
}
