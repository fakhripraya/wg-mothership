import React, {
    Fragment,
    useEffect,
    useRef,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import './style.scss';
import { smoothScrollTop } from '../../utils/functions/global';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DashboardHome from '../DashboardHome';
import DashboardMyRentals from '../DashboardMyRentals';
import { DASHBOARD_CATALOG, DASHBOARD_CHATS, DASHBOARD_HOME, DASHBOARD_ORDERS } from '../../variables/global';
import DashboardMyOrders from '../DashboardMyOrders';
import DashboardChat from '../DashboardChat';

export default function Dashboard() {

    // STATES //
    const [toggle, setToggle] = useState(false);
    const [toggleOpenBody, setToggleOpenBody] = useState(DASHBOARD_HOME);

    // FUNCTIONS SPECIFIC //
    function handleBottomSheet() {
        setToggle(!toggle);
    }

    function handleOpenHome() {
        setToggleOpenBody(DASHBOARD_HOME);
    }

    function handleOpenCatalogue() {
        setToggleOpenBody(DASHBOARD_CATALOG);
    }

    function handleOpenOrders() {
        setToggleOpenBody(DASHBOARD_ORDERS);
    }

    function handleOpenChats() {
        setToggleOpenBody(DASHBOARD_CHATS);
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="dashboard-flex-container">
                        <div className="dashboard-tools-container">
                            <FloatButton onClick={() => handleOpenHome()} className="dashboard-menu-button dashboard-menu-button-home" />
                            <FloatButton onClick={() => handleOpenOrders()} className="dashboard-menu-button dashboard-menu-button-order" />
                            <FloatButton onClick={() => handleOpenChats()} className="dashboard-menu-button dashboard-menu-button-chat" />
                            <FloatButton onClick={() => handleOpenCatalogue()} className="dashboard-menu-button dashboard-menu-button-product" />
                        </div>
                        <div className="dashboard-cards-container">
                            <div className="dashboard-cards-header">
                                <div className="dashboard-cards-tool-items">
                                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button display-mobile dashboard-menu-button-main" />
                                    <h3>Hello, Fakhri !</h3>
                                </div>
                                <div className="dashboard-cards-tool-items">
                                    <FloatButton className="dashboard-menu-button dashboard-menu-button-no-complaint" />
                                    <FloatButton className="dashboard-menu-button dashboard-menu-button-bell" />
                                    <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Toko 1", "Toko 2"]} />
                                    <FloatButton className="dashboard-menu-button dashboard-menu-button-plus" />
                                </div>
                            </div>
                            <DashboardHome toggleOpen={toggleOpenBody} />
                            <DashboardMyRentals toggleOpen={toggleOpenBody} />
                            <DashboardMyOrders toggleOpen={toggleOpenBody} />
                            <DashboardChat toggleOpen={toggleOpenBody} />
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="dashboard-mobile-tools-container">
                    <FloatButton onClick={() => handleOpenHome()} className="dashboard-menu-button dashboard-menu-button-home" />
                    <p className="dashboard-menu-button-text" onClick={() => handleOpenHome()} >Home</p>
                    <FloatButton onClick={() => handleOpenOrders()} className="dashboard-menu-button dashboard-menu-button-order" />
                    <p className="dashboard-menu-button-text" onClick={() => handleOpenOrders()}>Pesanan</p>
                    <FloatButton onClick={() => handleOpenChats()} className="dashboard-menu-button dashboard-menu-button-chat" />
                    <p className="dashboard-menu-button-text" onClick={() => handleOpenChats()}>Chats</p>
                    <FloatButton onClick={() => handleOpenCatalogue()} className="dashboard-menu-button dashboard-menu-button-product" />
                    <p className="dashboard-menu-button-text" onClick={() => handleOpenCatalogue()}>Katalog</p>
                </div>
            </BottomSheet>
        </Fragment>
    )
}
