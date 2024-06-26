import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.scss";
import Button from "../Button";
import Footer from "../Footer";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import OverridingContainer from "../OverridingContainer";
import ICHamburger from "../../assets/svg/ic_hamburg_3.svg";
import { getMenus } from "../../variables/path/navbar";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import NewPassword from "../../pages/NewPassword";
import OTP from "../../pages/OTP";
import {
  NO_STRING,
  LOGIN,
  MENU_MOBILE,
  CLIENT_USER_INFO,
  URL_POST_LOGOUT,
  NEW_PASSWORD,
  URL_POST_GOOGLE_CALLBACK,
  DASHBOARD,
  X_SID,
  IS_OTP_VERIFIED,
} from "../../variables/global";
import { ShowNavbar } from "../Global";
import { navbarInitialStyle } from "../../variables/styles/navbar";
import Avatar from "react-avatar";
import FloatButton from "../FloatButton";
import Modal from "../Modal";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  catchPromiseErrors,
  clearAllUrlParameters,
  handleErrorMessage,
  handleOpenModal,
  handlePageNavigation,
} from "../../utils/functions/global";
import { cookies } from "../../config/cookie";
import { useSelector, useDispatch } from "react-redux";
import { setOverridingToggle } from "../../utils/redux/reducers/navbar/navbarReducer";
import { ShowCart } from "./ModularComponents/ShowCart";
import { ShowSearchBar } from "./ModularComponents/ShowSearch";
import { PRODUCT_SORT_OPTIONS } from "../../variables/constants/dropdown";
import { cloneDeep } from "lodash-es";

export default function Navbar() {
  // HOOKS //
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credentialService = useAxios();

  // VARIABLES
  let timer = null;
  let navbarDisplayAdditionalClassName = "";
  const cart = useSelector((state) => {
    let temp = null;
    const login = cookies.get(CLIENT_USER_INFO, {
      path: "/",
    });
    if (!IS_OTP_VERIFIED(login)) return;
    if (state?.cart)
      temp = state.cart.filter((val) => {
        if (val.userId === login.user.userId) return val;
      });

    return temp && temp.length > 0 && [...temp];
  });

  const isRender = window.location.pathname.includes(
    "creative-store"
  );
  if (isRender)
    navbarDisplayAdditionalClassName = "display-none";
  const menus = getMenus();

  // STATES
  const [login, setLogin] = useState(
    cookies.get(CLIENT_USER_INFO, { path: "/" })
  );
  const [toggleOverride, setToggleOverride] =
    useState(NO_STRING);
  const [modalToggle, setModalToggle] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState(
    navbarInitialStyle
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchParams] = useSearchParams();

  // FUNCTIONS SPECIFIC //
  function handleGoogleAuthListener() {
    const queryString = window.location.search;
    trackPromise(
      credentialService
        .postData({
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          url: `${URL_POST_GOOGLE_CALLBACK}/${queryString}`,
        })
        .then((result) => {
          cookies.set(
            CLIENT_USER_INFO,
            result.responseData,
            { path: "/" }
          );

          setLogin(
            cookies.get(CLIENT_USER_INFO, { path: "/" })
          );
        })
        .catch((error) => catchPromiseErrors(error))
        .finally(() => clearAllUrlParameters())
    );
  }

  function handleNavbarDisplay(overridingToggle) {
    function displayChange(opacity, visibility) {
      ref.current.style.opacity = opacity;
      ref.current.style.visibility = visibility;
    }

    if (overridingToggle === NO_STRING)
      displayChange("1", "visible");
    else displayChange("0", "hidden");
  }

  function handleWindowScroll(overridingToggle) {
    // Scroll window to top
    window.scrollTo(0, 0);
    // Then use condition for the scrolling behavior
    if (overridingToggle === NO_STRING) {
      document
        .querySelector("html")
        .style.setProperty("overflow-y", "scroll");
      dispatch(setOverridingToggle(false));
    } else {
      document
        .querySelector("html")
        .style.setProperty("overflow-y", "hidden");
      dispatch(setOverridingToggle(true));
    }
  }

  function handleNavbarHide() {
    if (window.scrollY > 80)
      setNavbarStyle({ transform: "translateY(-100%)" });
  }

  function handleLogout() {
    trackPromise(
      credentialService
        .postData({
          headers: {
            [X_SID]: cookies.get(CLIENT_USER_INFO, {
              path: "/",
            }).sid,
          },
          endpoint: process.env.REACT_APP_OLYMPUS_SERVICE,
          url: URL_POST_LOGOUT,
        })
        .then(() => {
          window.handleOpenOverriding(NO_STRING);
          handleOpenModal(setModalToggle, modalToggle);
          setError(false);
          window.location.href = "/";
        })
        .catch((error) => {
          setError(true);
          return handleErrorMessage(
            error,
            setErrorMessage,
            setModalToggle,
            modalToggle
          );
        })
        .finally(() => {
          cookies.remove(CLIENT_USER_INFO, { path: "/" });
          setLogin(
            cookies.get(CLIENT_USER_INFO, { path: "/" })
          );
        })
    );
  }

  // WINDOW FUNCTIONS //
  window.handleOpenOverriding = function (
    overridingToggle
  ) {
    handleWindowScroll(overridingToggle);
    handleNavbarDisplay(overridingToggle);
    setToggleOverride(overridingToggle);
  };

  window.handleProductSearchSort = function (
    key,
    setSortKey
  ) {
    const foundIndex = PRODUCT_SORT_OPTIONS.findIndex(
      (x) => x.key === key
    );
    if (foundIndex > -1)
      setSortKey(
        cloneDeep({
          key: PRODUCT_SORT_OPTIONS[foundIndex].key,
          field: PRODUCT_SORT_OPTIONS[foundIndex].field,
          value: PRODUCT_SORT_OPTIONS[foundIndex].value,
        })
      );
  };

  // COMPONENTS SPECIFIC //
  const ShowProfile = () => {
    // Check if the user is logged in
    const isLoggedIn = IS_OTP_VERIFIED(login);
    const handleLoginClick = () => {
      window.handleOpenOverriding(LOGIN);
    };

    const handleLogoutClick = () => {
      setError(false);
      handleOpenModal(setModalToggle, modalToggle);
    };

    return isLoggedIn ? (
      <Fragment>
        <FloatButton className="navbar-icon-button navbar-icon-button-bell" />
        <FloatButton className="navbar-icon-button navbar-icon-button-shipping" />
        <FloatButton
          onClick={handleLogoutClick}
          className="navbar-icon-button navbar-icon-button-logout"
        />
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={() => {}}
          size={"60px"}
          round={true}
          title={login.user.fullName}
          name={login.user.fullName}
        />
      </Fragment>
    ) : (
      <Button
        className="transparent-bg-color"
        onClick={handleLoginClick}>
        Login
      </Button>
    );
  };

  const ShowMenuRow = (props) => {
    const { children } = props;
    return (
      <ul className="navbar-mobile-menu-row-wrapper">
        <li className="navbar-submenu-section">
          {children}
        </li>
      </ul>
    );
  };

  const ShowMenuButtons = () => {
    let renderMenus = menus;
    if (!IS_OTP_VERIFIED(login)) {
      const dashboardButtonInfo = renderMenus.find(
        (item) => item.key === DASHBOARD
      );
      const dashboardButtonIndex = renderMenus.indexOf(
        dashboardButtonInfo
      );
      renderMenus.splice(dashboardButtonIndex, 1);
    }

    return renderMenus?.map((menu, index) => (
      <ShowMenuRow key={`mobile-button-${index}`}>
        <Button
          className="transparent-bg-color"
          onClick={() => handlePageNavigation(menu.route)}>
          {menu.name}
        </Button>
      </ShowMenuRow>
    ));
  };

  const ShowErrorModal = () => (
    <div className="navbar-modal-container dark-bg-color">
      <div className="navbar-modal-wrapper">
        <Button
          onClick={() =>
            handleOpenModal(setModalToggle, modalToggle)
          }
          className="align-self-end navbar-modal-button red-bg-color">
          <h4 className="navbar-modal-button-text">X</h4>
        </Button>
        <div className="breakline" />
        <h3 className="margin-top-0 margin-bottom-12-18">
          There is an{" "}
          <span className="red-color">ERROR</span>
        </h3>
        <div className="breakline" />
        <label className="margin-top-0 margin-bottom-12-18 white-space-pre-line">
          {errorMessage}
        </label>
      </div>
    </div>
  );

  const ShowLogoutModal = () => (
    <div className="navbar-modal-container dark-bg-color">
      <div className="navbar-modal-wrapper">
        <Button
          onClick={() =>
            handleOpenModal(setModalToggle, modalToggle)
          }
          className="align-self-end navbar-modal-button red-bg-color">
          <h4 className="navbar-modal-button-text">X</h4>
        </Button>
        <div className="breakline" />
        <h3 className="margin-top-0 margin-bottom-12-18">
          Yakin Mau{" "}
          <span className="red-color">Keluar</span> Dari
          Akun Kamu ?
        </h3>
        <label className="margin-top-0 margin-bottom-12-18">
          Kalo udah logout magger banget ga sih loginnya?
          stay aja dulu !
        </label>
        <div
          style={{ padding: "0px" }}
          className="navbar-mobile-menu-row-wrapper">
          <Button
            onClick={() => handleLogout()}
            style={{ marginRight: "8px" }}>
            Yes
          </Button>
          <Button
            className="red-bg-color"
            onClick={() =>
              handleOpenModal(setModalToggle, modalToggle)
            }>
            No
          </Button>
        </div>
      </div>
    </div>
  );

  const ShowModal = () => {
    if (error) return <ShowErrorModal />;
    else return <ShowLogoutModal />;
  };

  // RENDERS SPECIFIC //
  useEffect(() => {
    const handleScroll = () => {
      // Clear the previous timer if it exists
      if (timer) clearTimeout(timer);
      if (window.scrollY <= 80)
        setNavbarStyle({ transform: "translateY(0)" });
      // Set a new timer to execute the scroll handling function after a delay
      timer = setTimeout(() => {
        // Scroll handling logic here
        // Update state or perform any necessary actions
        handleNavbarHide();
      }, 150); // Adjust the delay as needed (300 milliseconds in this example)
    };
    window.addEventListener("scroll", handleScroll);
    // Get the query param from the url
    const recoveryToken = searchParams.get("recoveryToken");
    const searchParamScopes = searchParams.get("scope");
    const toggleOpenWindow = searchParams.get("openWindow");
    // Navbar initialization to check the authentication
    if (recoveryToken)
      window.handleOpenOverriding(NEW_PASSWORD);
    else if (searchParamScopes?.includes("googleapis"))
      handleGoogleAuthListener();
    else if (toggleOpenWindow)
      window.handleOpenOverriding(toggleOpenWindow);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setModalToggle, modalToggle)
        }
        toggle={modalToggle}>
        <ShowModal />
      </Modal>
      <div
        style={navbarStyle}
        ref={ref}
        className={`fixed-top navbar ${navbarDisplayAdditionalClassName}`}>
        <div className="navbar-container">
          <div className="navbar-wrapper">
            {/* <div className="navbar-logo-wrapper">
              <img
                onClick={() => handlePageNavigation("/")}
                className="navbar-logo-img"
                src={WGLogo}
                alt="WG_LOGO"></img>
            </div> */}
            <div className="navbar-logo-wrapper" />
            <ShowCart
              login={login}
              cart={cart}
            />
            <img
              onClick={() =>
                window.handleOpenOverriding(MENU_MOBILE)
              }
              className="navbar-mobile-hamburger-image"
              src={ICHamburger}
              alt="ic_hamburger"
            />
          </div>
        </div>
      </div>
      <OverridingContainer
        toggle={toggleOverride === MENU_MOBILE}>
        <div className="sticky-top">
          <ShowNavbar>
            <ShowCart
              login={login}
              cart={cart}
              isOverriding
              className="navbar-mobile-hamburger-image-overriding"
            />
            <img
              onClick={() =>
                window.handleOpenOverriding(NO_STRING)
              }
              className="navbar-mobile-hamburger-image navbar-mobile-hamburger-image-overriding"
              src={ICHamburger}
              alt="ic_hamburger"
            />
          </ShowNavbar>
          <ul className="navbar-mobile-menu-wrapper">
            <ShowSearchBar navigate={navigate} />
          </ul>
          <ShowMenuRow>
            <ShowProfile />
          </ShowMenuRow>
          <ShowMenuButtons />
          <Footer isOverriding={true} />
        </div>
      </OverridingContainer>
      <Login
        toggle={toggleOverride}
        handleOpen={window.handleOpenOverriding}
      />
      <Register
        toggle={toggleOverride}
        handleOpen={window.handleOpenOverriding}
      />
      <ForgotPassword
        toggle={toggleOverride}
        handleOpen={window.handleOpenOverriding}
      />
      <NewPassword
        toggle={toggleOverride}
        handleOpen={window.handleOpenOverriding}
      />
      <OTP
        toggle={toggleOverride}
        handleOpen={window.handleOpenOverriding}
      />
    </Fragment>
  );
}
