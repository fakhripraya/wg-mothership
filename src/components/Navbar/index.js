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
    useNavigate, useSearchParams
} from 'react-router-dom';
import OverridingContainer from '../OveriddingContainer';
import WGLogo from '../../assets/images/baru2.png';
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
    URL_POST_LOGOUT,
    NEW_PASSWORD,
    URL_POST_RECOVERY_TOKEN_CHECK,
    URL_POST_GOOGLE_CALLBACK,
    DASHBOARD
} from '../../variables/global';
import { ShowNavbar } from '../Global';
import { navbarInitialStyle } from '../../variables/styles/navbar';
import Avatar from 'react-avatar';
import FloatButton from '../FloatButton';
import Modal from '../Modal';
import { trackPromise } from 'react-promise-tracker';
import { useAxios } from '../../utils/hooks/useAxios';
import { catchPromiseErrors, handleErrorMessage, handleOpenModal } from '../../utils/functions/global';
import { cookies } from '../../config/cookie';

export default function Navbar() {

    // HOOKS //
    const ref = useRef();
    const navigate = useNavigate();
    const credentialService = useAxios();

    // VARIABLES
    let navbarDisplayAdditionalClassName = "";
    const isRender = window.location.pathname.includes("creative-store");
    if (isRender) navbarDisplayAdditionalClassName = "display-none";
    const menus = getMenus();
    const login = cookies.get(CLIENT_USER_INFO, { path: '/' });

    // STATES
    const [toggleOverride, setToggleOverride] = useState(NO_STRING);
    const [modalToggle, setModalToggle] = useState(false);
    const [navbarStyle, setNavbarStyle] = useState(navbarInitialStyle);
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    // FUNCTIONS SPECIFIC //
    function handleRecoveryTokenListener(recoveryToken) {
        trackPromise(
            credentialService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_RECOVERY_TOKEN_CHECK,
                data: {
                    recoveryToken: recoveryToken
                }
            }).then(() => {
                setError(false);
                window.handleOpenOverriding(NEW_PASSWORD);
            }).catch((error) => {
                catchPromiseErrors(error, navigate);
            })
        );
    }

    function handleGoogleAuthListener() {
        const queryString = window.location.search;
        trackPromise(
            credentialService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
            }).then((result) => {
                cookies.set(CLIENT_USER_INFO, result.responseData, { path: '/' });
            }).catch((error) => {
                catchPromiseErrors(error, navigate);
            })
        );
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

    // TODO: FIX SCROLL RERENDER PLS
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
            credentialService.postData({
                endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
                url: URL_POST_LOGOUT,
                data: cookies.get(CLIENT_USER_INFO, { path: '/' })
            }).then(() => {
                window.handleOpenOverriding(NO_STRING);
                handleOpenModal(setModalToggle, modalToggle);
                setError(false);
                navigate('/');
            }).catch((error) => {
                setError(true);
                return handleErrorMessage(error, setErrorMessage, setModalToggle, modalToggle);
            }).finally(() => {
                cookies.remove(CLIENT_USER_INFO, { path: '/' });
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
        if (!login) return <Button onClick={() => window.handleOpenOverriding(LOGIN)}>Login</Button>
        else if (login.user && login.credentialToken) return <Fragment>
            <FloatButton className="navbar-icon-button navbar-icon-button-bell" />
            <FloatButton onClick={() => {
                setError(false);
                handleOpenModal(setModalToggle, modalToggle);
            }} className="navbar-icon-button navbar-icon-button-logout" />
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
        let renderMenus = menus;
        if (!login) {
            const dashboardButtonInfo = renderMenus.find((item) => item.key === DASHBOARD);
            const dashboardButtonIndex = renderMenus.indexOf(dashboardButtonInfo);
            renderMenus.splice(dashboardButtonIndex, 1);
        }
        return renderMenus.map((menu, index) => {
            return <ShowMenuRow key={`mobile-button-${index}`}>
                <Button onClick={() => handlePageNavigation(menu.route)}>{menu.name}</Button>
            </ShowMenuRow>
        })
    }

    const ShowErrorModal = () => {
        return <div className="navbar-modal-container dark-bg-color">
            <div className="navbar-modal-wrapper">
                <Button onClick={() => handleOpenModal(setModalToggle, modalToggle)} className="align-self-end navbar-modal-button red-bg-color">
                    <h4 className="navbar-modal-button-text">X</h4>
                </Button>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">
                    There is an <span className="red-color">ERROR</span>
                </h3>
                <br />
                <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
                    {errorMessage}
                </label>
            </div>
        </div>
    }

    const ShowLogoutModal = () => {
        return <div className="navbar-modal-container dark-bg-color">
            <div className="navbar-modal-wrapper">
                <Button onClick={() => handleOpenModal(setModalToggle, modalToggle)} className="align-self-end navbar-modal-button red-bg-color">
                    <h4 className="navbar-modal-button-text">X</h4>
                </Button>
                <br />
                <h3 className="margin-top-0 margin-bottom-12-18">Yakin mau logout akun kamu ?</h3>
                <label className="margin-top-0 margin-bottom-12-18">Kalo udah logout magger banget ga sih loginnya? stay aja dulu !</label>
                <div style={{ padding: "0px" }} className="navbar-mobile-menu-row-wrapper">
                    <Button onClick={() => handleLogout()} style={{ marginRight: "8px" }} >Yes</Button>
                    <Button className="red-bg-color" onClick={() => handleOpenModal(setModalToggle, modalToggle)}>No</Button>
                </div>
            </div>
        </div>
    }

    const ShowModal = () => {
        if (error) return <ShowErrorModal />
        else return <ShowLogoutModal />
    }

    // RENDERS SPECIFIC //
    useEffect(() => {
        window.addEventListener("scroll", handleNavbarHide);
        // Get the query param from the url 
        const recoveryToken = searchParams.get("recoveryToken");
        const searchParamScopes = searchParams.get("scope");
        const toggleOpenWindow = searchParams.get("openWindow");
        // Navbar initialization to check the authentication
        if (recoveryToken) handleRecoveryTokenListener(recoveryToken);
        else if (searchParamScopes && searchParamScopes.includes("googleapis")) handleGoogleAuthListener();
        else if (toggleOpenWindow) window.handleOpenOverriding(toggleOpenWindow);
        return () => window.removeEventListener("scroll", handleNavbarHide);
    }, []);

    return (
        <Fragment>
            <Modal className="dark-bg-color" clicked={() => handleOpenModal(setModalToggle, modalToggle)} toggle={modalToggle} >
                <ShowModal />
            </Modal>
            <div style={navbarStyle} ref={ref} className={`fixed-top navbar ${navbarDisplayAdditionalClassName}`}>
                <div className="navbar-container">
                    <div className="navbar-wrapper">
                        <div className="navbar-logo-wrapper">
                            <img onClick={() => handlePageNavigation('/')} className="navbar-logo-img" src={WGLogo} alt="WG_LOGO"></img>
                        </div>
                        <img onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='navbar-mobile-hamburger-image navbar-mobile-hamburger-image-view' src={ICHamburger} alt="ic_hamburger" />
                    </div>
                </div>
            </div>
            <OverridingContainer toggle={toggleOverride === MENU_MOBILE}>
                <div className="sticky-top">
                    <ShowNavbar>
                        <img onClick={() => window.handleOpenOverriding(NO_STRING)} className='navbar-mobile-hamburger-image' src={ICHamburger} alt="ic_hamburger" />
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
