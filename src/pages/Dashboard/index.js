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
import { DASHBOARD_CATALOG, DASHBOARD_HOME, DASHBOARD_ORDERS } from '../../variables/global';
import DashboardMyOrders from '../DashboardMyOrders';

export default function Finder() {

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
                            <FloatButton className="dashboard-menu-button dashboard-menu-button-chat" />
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
                                    <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Fittest", "Jancokest"]} />
                                </div>
                            </div>
                            <DashboardHome toggleOpen={toggleOpenBody} />
                            <DashboardMyRentals toggleOpen={toggleOpenBody} />
                            <DashboardMyOrders toggleOpen={toggleOpenBody} />
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="dashboard-mobile-tools-container">
                    <FloatButton onClick={() => handleOpenHome()} className="dashboard-menu-button dashboard-menu-button-home" />
                    <FloatButton onClick={() => handleOpenOrders()} className="dashboard-menu-button dashboard-menu-button-order" />
                    <FloatButton className="dashboard-menu-button dashboard-menu-button-chat" />
                    <FloatButton onClick={() => handleOpenCatalogue()} className="dashboard-menu-button dashboard-menu-button-product" />
                </div>
            </BottomSheet>
        </Fragment>
    )
}
