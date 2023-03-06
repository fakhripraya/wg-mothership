import React, {
    Fragment,
    useEffect,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import './style.scss';
import { smoothScrollTop } from '../../utils/functions/global';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DashboardHome from '../DashboardHome';
import DashboardCatalogue from '../DashboardCatalogue';
import {
    DASHBOARD_CATALOG,
    DASHBOARD_CHATS,
    DASHBOARD_HOME,
    DASHBOARD_ORDERS
} from '../../variables/global';
import DashboardMyOrders from '../DashboardMyOrders';
import DashboardChat from '../DashboardChat';
import Avatar from 'react-avatar';

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

    function handleGoToAddToko() {
        window.location.href = `/dashboard/add/toko`;
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
                            <Avatar style={{ cursor: "pointer" }} onClick={() => handleGoToAddToko()} size={"60px"} round={true} title="Wim Mostmans" name="Wim Mostmans" />
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
                                    <Dropdown onChange={(value) => { }} style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Toko 1", "Toko 2"]} />
                                    <FloatButton onClick={() => handleGoToAddToko()} className="dashboard-menu-button dashboard-menu-button-plus" />
                                </div>
                            </div>
                            <DashboardHome toggleOpen={toggleOpenBody} />
                            <DashboardCatalogue toggleOpen={toggleOpenBody} />
                            <DashboardMyOrders toggleOpen={toggleOpenBody} />
                            <DashboardChat toggleOpen={toggleOpenBody} />
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="dashboard-mobile-menu-container">
                    <Avatar style={{ cursor: "pointer" }} onClick={() => handleGoToAddToko()} size={"60px"} round={true} title="Wim Mostmans" name="Wim Mostmans" />
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
