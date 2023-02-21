import React, { useState } from 'react'
import ProductIcon from '../../assets/svg/bag-shopping-solid.svg';
import ChatIcon from '../../assets/svg/comment-dots-regular.svg';
import RentalIcon from '../../assets/svg/book-solid.svg';
import BellIcon from '../../assets/svg/bell-solid.svg';
import LineChart from "../../components/LineChart";
import './style.scss';

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

export default function DashboardHome() {

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
        <div className="dashboard-home-container">
            <div className="dashboard-home-wrapper">
                <div className="dashboard-home-grid-container">
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-statistic dashboard-home-grid-item-big">
                        <LineChart chartData={userData} />
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-1 dashboard-home-grid-item-small main-bg-color">
                        <img src={ProductIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h3>Katalog Rental</h3>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-2 dashboard-home-grid-item-small main-bg-color">
                        <img src={ChatIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h3>Broadcast Chat</h3>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-3 dashboard-home-grid-item-small main-bg-color">
                        <img src={RentalIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h3>Lihat Sewaan</h3>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-4 dashboard-home-grid-item-small main-bg-color">
                        <img src={BellIcon} alt="product_catalog_icon" className="dashboard-home-grid-item-icon" />
                        <h3>Reminder</h3>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-small-1 dashboard-home-grid-item-small dark-bg-color">
                        <h2>Pesanan</h2>
                        <h1 className="margin-bottom-0 dashboard-home-flex-item-number">
                            6
                        </h1>
                        <h3 className="margin-top-0">4 belum terkonfirmasi</h3>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-small-2 dashboard-home-grid-item-small dark-bg-color">
                        <h2>Chat</h2>
                        <h1 className="margin-bottom-0 dashboard-home-flex-item-number">
                            12
                        </h1>
                        <h3 className="margin-top-0">6 Chat Belum Terbaca</h3>
                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-big-1 dashboard-home-grid-item-small dark-bg-color">
                        <h2>Saldo</h2>
                        <h1 className="margin-bottom-0 dashboard-home-flex-item-number">
                            Rp.1.232.032.091
                        </h1>
                        <h3 className="margin-top-0">2 Rental Berjalan</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
