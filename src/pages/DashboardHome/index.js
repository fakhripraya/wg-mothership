import React from 'react'
import './style.scss';

export default function DashboardHome() {
    return (
        <div className="dashboard-home-container">
            <div className="dashboard-home-wrapper">
                <div className="dashboard-home-flex-container">
                    <div className="dashboard-home-flex-item">
                        <h2>Pesanan</h2>
                        <h1 className="margin-bottom-0 dashboard-home-flex-item-number">
                            6
                        </h1>
                        <h3 className="margin-top-0">4 belum terkonfirmasi</h3>
                    </div>
                    <div className="dashboard-home-flex-item  dashboard-home-flex-item-last">
                        <h2>Chat</h2>
                        <h1 className="margin-bottom-0 dashboard-home-flex-item-number">
                            12
                        </h1>
                        <h3 className="margin-top-0">6 Chat Belum Terbaca</h3>
                    </div>
                </div>
                <div className="dashboard-home-flex-container dashboard-home-flex-item-last">
                    <div className="dashboard-home-flex-item dashboard-home-flex-item-last">
                        <h2>Saldo</h2>
                        <h1 className="margin-bottom-0 dashboard-home-flex-item-number">
                            Rp.1.232.032.091
                        </h1>
                        <h3 className="margin-top-0">Masih Ada 2 Rental Berjalan</h3>
                    </div>
                </div>
                <div className="dashboard-home-grid-container">
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-statistic dashboard-home-grid-item-big main-bg-color">

                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-1 dashboard-home-grid-item-small main-bg-color">

                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-2 dashboard-home-grid-item-small main-bg-color">

                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-3 dashboard-home-grid-item-small main-bg-color">

                    </div>
                    <div className="dashboard-home-grid-item dashboard-home-grid-item-4 dashboard-home-grid-item-small main-bg-color">

                    </div>
                </div>
            </div>
        </div>
    )
}
