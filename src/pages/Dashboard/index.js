import React, {
    Fragment,
    useEffect,
    useState
} from 'react';
import './style.scss';
import Dropdown from '../../components/Dropdown';
import { handleErrorMessage, smoothScrollTop } from '../../utils/functions/global';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DashboardHome from '../DashboardHome';
import DashboardCatalogue from '../DashboardCatalogue';
import {
    CLIENT_USER_INFO,
    DASHBOARD_CATALOG,
    DASHBOARD_CHATS,
    DASHBOARD_HOME,
    DASHBOARD_ORDERS,
    LOGIN,
    URL_GET_DASHBOARD_STORES
} from '../../variables/global';
import DashboardMyOrders from '../DashboardMyOrders';
import DashboardChat from '../DashboardChat';
import Avatar from 'react-avatar';
import Cookies from 'universal-cookie';
import {
    NO_STORE_FOUND_IN_THE_DASHBOARD,
    PAGE_REDIRECTING_MESSAGE
} from '../../variables/errorMessages/dashboard';
import ErrorHandling from '../ErrorHandling';
import Button from '../../components/Button';
import { useAxios } from '../../utils/hooks/useAxios';
import { trackPromise } from 'react-promise-tracker';
import { checkAuthAndRefresh } from '../../utils/functions/middlewares';

export default function Dashboard() {

    // OBJECT CLASSES
    const cookies = new Cookies();

    // VARIABLES //
    let login = cookies.get(CLIENT_USER_INFO);

    // HOOKS //
    const zeusService = useAxios();

    // STATES //
    const [userStore, setUserStores] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [toggleOpenBody, setToggleOpenBody] = useState(DASHBOARD_HOME);
    const [modalToggle, setModalToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // FUNCTIONS
    function handleBottomSheet() {
        setToggle(!toggle);
    }

    function handleOpenPage(keyword) {
        setToggleOpenBody(keyword);
    }

    function handleOpenPageMobile(keyword) {
        setToggleOpenBody(keyword);
        handleBottomSheet();
    }

    function handleGoToAddStore() {
        window.location.href = `/dashboard/add/store`;
    }

    function handleOpenOverridingHome(overridingName) {
        window.location.replace(`/?openWindow=${overridingName}`);
    }

    function showUserStores(userStores) {
        if (login && userStores <= 0) return ["Tidak ada toko"];
        else return userStores;
    }

    // COMPONENT FUNCTIONS //

    const ShowMenuTabs = () => {
        if (login && userStore.length <= 0) {
            // Placeholder message while redirecting to home page
            return <ErrorHandling containerStyle={{ width: 'auto' }} errorMessage={NO_STORE_FOUND_IN_THE_DASHBOARD} >
                <br />
                <br />
                <Button onClick={() => handleGoToAddStore()}>
                    Buat toko
                </Button>
            </ErrorHandling>
        }
        else if (login && userStore.length > 0) return <Fragment>
            <DashboardHome toggleOpen={toggleOpenBody} />
            <DashboardCatalogue toggleOpen={toggleOpenBody} />
            <DashboardMyOrders toggleOpen={toggleOpenBody} />
            <DashboardChat toggleOpen={toggleOpenBody} />
        </Fragment>
    }

    // EXECUTION AFTER RENDER
    useEffect(() => {
        // scroll to top on entering
        smoothScrollTop();
        // get user store from zeus service
        function getUserStores() {
            trackPromise(
                zeusService.getDataWithOnRequestInterceptors({
                    headers: { "authorization": `Bearer ${login.credentialToken.accessToken}` },
                    endpoint: process.env.REACT_APP_ZEUS_SERVICE,
                    url: URL_GET_DASHBOARD_STORES(login.user.userId),
                }, async () => {
                    const result = await checkAuthAndRefresh(zeusService, cookies);
                    if (result.responseStatus === 200) login = cookies.get(CLIENT_USER_INFO);
                    return result;
                }).then((result) => {
                    console.log(login)
                }).catch((error) => {
                    if (error.responseStatus === 401 || error.responseStatus === 403) {
                        cookies.remove(CLIENT_USER_INFO, { path: '/' });
                        handleOpenOverridingHome(LOGIN);
                    }
                    else handleErrorMessage(error, setErrorMessage, setModalToggle, modalToggle)
                })
            );
        }

        // dashboard initialization
        if (login) getUserStores();
    }, []);

    if (!login) {
        // Executing asynchronous call for redirecting to home page
        handleOpenOverridingHome(LOGIN);
        // Placeholder message while redirecting to home page
        return <ErrorHandling errorMessage={PAGE_REDIRECTING_MESSAGE} />
    }
    else return (
        <Fragment>
            <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="dashboard-flex-container">
                        <div className="dashboard-tools-container">
                            <Avatar style={{ cursor: "pointer" }} onClick={() => handleGoToAddStore()} size={"60px"} round={true} title={login.user.fullName} name={login.user.fullName} />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_HOME)} className="dashboard-menu-button dashboard-menu-button-home" />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_ORDERS)} className="dashboard-menu-button dashboard-menu-button-order" />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_CHATS)} className="dashboard-menu-button dashboard-menu-button-chat" />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_CATALOG)} className="dashboard-menu-button dashboard-menu-button-product" />
                        </div>
                        <div className="dashboard-cards-container">
                            <div className="dashboard-cards-header">
                                <div className="dashboard-cards-tool-items">
                                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button display-mobile dashboard-menu-button-main" />
                                    <h3>Hello, {login.user.fullName} !</h3>
                                </div>
                                <div className="dashboard-cards-tool-items">
                                    <FloatButton className="dashboard-menu-button dashboard-menu-button-no-complaint" />
                                    <FloatButton className="dashboard-menu-button dashboard-menu-button-bell" />
                                    <Dropdown onChange={(value) => { }} style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={showUserStores(userStore)} />
                                    <FloatButton onClick={() => handleGoToAddStore()} className="dashboard-menu-button dashboard-menu-button-plus" />
                                </div>
                            </div>
                            <ShowMenuTabs />
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="dashboard-mobile-menu-container">
                    <Avatar style={{ cursor: "pointer" }} onClick={() => handleGoToAddStore()} size={"60px"} round={true} title={login.user.fullName} name={login.user.fullName} />
                    <br />
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_HOME)} className="dashboard-menu-button dashboard-menu-button-home" >
                    </FloatButton>
                    <br />
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_ORDERS)} className="dashboard-menu-button dashboard-menu-button-order" >
                    </FloatButton>
                    <br />
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_CHATS)} className="dashboard-menu-button dashboard-menu-button-chat" >
                    </FloatButton>
                    <br />
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_CATALOG)} className="dashboard-menu-button dashboard-menu-button-product" >
                    </FloatButton>
                </div>
            </BottomSheet>
        </Fragment>
    )
}
