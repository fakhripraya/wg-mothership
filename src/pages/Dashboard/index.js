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

    function handleOpenPage(keyword) {
        setToggleOpenBody(keyword);
    }

    function handleOpenPageMobile(keyword) {
        setToggleOpenBody(keyword);
        handleBottomSheet();
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
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_HOME)} className="dashboard-menu-button dashboard-menu-button-home" />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_ORDERS)} className="dashboard-menu-button dashboard-menu-button-order" />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_CHATS)} className="dashboard-menu-button dashboard-menu-button-chat" />
                            <FloatButton onClick={() => handleOpenPage(DASHBOARD_CATALOG)} className="dashboard-menu-button dashboard-menu-button-product" />
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
                <div className="dashboard-mobile-menu-container">
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_HOME)} className="dashboard-menu-button dashboard-menu-button-home" >
                        <br />
                        <br />
                        <br />
                        Home
                    </FloatButton>
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_ORDERS)} className="dashboard-menu-button dashboard-menu-button-order" >
                        <br />
                        <br />
                        <br />
                        Orders
                    </FloatButton>
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_CHATS)} className="dashboard-menu-button dashboard-menu-button-chat" >
                        <br />
                        <br />
                        <br />
                        Chats
                    </FloatButton>
                    <br />
                    <FloatButton onClick={() => handleOpenPageMobile(DASHBOARD_CATALOG)} className="dashboard-menu-button dashboard-menu-button-product" >
                        <br />
                        <br />
                        <br />
                        Catalogue
                    </FloatButton>
                </div>
            </BottomSheet>
        </Fragment>
    )
}
