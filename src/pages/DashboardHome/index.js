import React, { useState } from 'react'
import ProductIcon from '../../assets/svg/bag-shopping-solid.svg';
import ChatIcon from '../../assets/svg/comment-dots-regular.svg';
import RentalIcon from '../../assets/svg/book-solid.svg';
import BellIcon from '../../assets/svg/bell-solid.svg';
import LineChart from "../../components/LineChart";
import './style.scss';
import { DASHBOARD_HOME } from '../../variables/global';

const UserData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823,
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345,
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555,
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555,
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234,
    },
];

export default function DashboardHome(props) {

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Produk Tersewa",
                data: UserData.map((data) => data.userGain),
                backgroundColor: "#0DA34D",
                borderColor: "#0DA34D",
                borderWidth: 2,
                pointBackgroundColor: "#0DA34D",
                pointBorderColor: "#0DA34D"
            },
        ],
    });

    return (
        <div className={props.toggleOpen === DASHBOARD_HOME ? "dashboard-home-container" : "display-none"}>
            <div className="dashboard-home-wrapper">
                <div className="dashboard-home-grid-container">
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-statistic">
                        <LineChart chartData={userData} />
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-1 dashboard-home-grid-item-small main-bg-color">
                        <img src={ProductIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h4>Katalog</h4>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-2 dashboard-home-grid-item-small main-bg-color">
                        <img src={ChatIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h4>Broadcast</h4>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-3 dashboard-home-grid-item-small main-bg-color">
                        <img src={RentalIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h4>Lihat Sewaan</h4>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-4 dashboard-home-grid-item-small main-bg-color">
                        <img src={BellIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h4>Reminder</h4>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-small-1 dashboard-home-grid-item-big dark-bg-color">
                        <h3>Pesanan</h3>
                        <h2 className="margin-bottom-0">
                            6
                        </h2>
                        <p className="margin-top-0">4 belum terkonfirmasi</p>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-small-2 dashboard-home-grid-item-big dark-bg-color">
                        <h3>Chat</h3>
                        <h2 className="margin-bottom-0">
                            12
                        </h2>
                        <p className="margin-top-0">6 Belum Terbaca</p>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-big-1 dashboard-home-grid-item-big dark-bg-color">
                        <h3>Saldo</h3>
                        <h2 className="margin-bottom-0">
                            Rp.1.232.032.091
                        </h2>
                        <p className="margin-top-0">2 Rental Berjalan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
