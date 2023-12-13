import "./style.scss";
import React, { useState } from "react";
import LineChart from "../../components/LineChart";
import VisitIcon from "../../assets/svg/logout.svg";
import RentalIcon from "../../assets/svg/book-solid.svg";
import RatingIcon from "../../assets/svg/face-smile-solid.svg";
import ProductIcon from "../../assets/svg/bag-shopping-solid.svg";
import {
  DASHBOARD_CATALOG,
  DASHBOARD_HOME,
  DASHBOARD_TRANSACTIONS,
} from "../../variables/global";
import { useNavigate } from "react-router-dom";

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
  // STATES //
  const navigate = useNavigate();
  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Produk Terjual",
        data: UserData.map((data) => data.userGain),
        backgroundColor: "#0DA34D",
        borderColor: "#0DA34D",
        borderWidth: 2,
        pointBackgroundColor: "#0DA34D",
        pointBorderColor: "#0DA34D",
      },
    ],
  });

  // FUNCTIONS
  function handleOpenPage(keyword) {
    props.toggleOpenHandler(keyword);
  }

  function handleGoToCreativeStore(navigate) {
    navigate(
      `/creative-store?id=${props.data.selectedStore.id}`
    );
  }

  return (
    <div
      className={
        props.toggleOpen === DASHBOARD_HOME
          ? "dashboard-home-container"
          : "display-none"
      }>
      <div className="dashboard-home-wrapper">
        <div className="dashboard-home-grid-container">
          <div className="dashboard-home-grid-item dashboard-home-grid-item-statistic">
            <LineChart chartData={userData} />
          </div>
          <div
            onClick={() =>
              handleOpenPage(DASHBOARD_CATALOG)
            }
            className="dashboard-home-grid-item dashboard-home-grid-item-1 dashboard-home-grid-item-small main-bg-color">
            <img
              src={ProductIcon}
              alt="product_catalog_icon"
              className="dashboard-home-grid-item-icon"
            />
            <label>Katalog</label>
          </div>
          <div
            onClick={() => {}}
            className="dashboard-home-grid-item dashboard-home-grid-item-2 dashboard-home-grid-item-small main-bg-color">
            <img
              src={RatingIcon}
              alt="product_catalog_icon"
              className="dashboard-home-grid-item-icon"
            />
            <label>Rating</label>
          </div>
          <div
            onClick={() =>
              handleOpenPage(DASHBOARD_TRANSACTIONS)
            }
            className="dashboard-home-grid-item dashboard-home-grid-item-3 dashboard-home-grid-item-small main-bg-color">
            <img
              src={RentalIcon}
              alt="product_catalog_icon"
              className="dashboard-home-grid-item-icon"
            />
            <label>Transaksi</label>
          </div>
          <div
            onClick={() =>
              handleGoToCreativeStore(navigate)
            }
            className="dashboard-home-grid-item dashboard-home-grid-item-4 dashboard-home-grid-item-small main-bg-color">
            <img
              src={VisitIcon}
              alt="product_catalog_icon"
              className="dashboard-home-grid-item-icon"
            />
            <label>Masuk ke toko</label>
          </div>
          <div className="dashboard-home-grid-item dashboard-home-grid-small-1 dashboard-home-grid-item-big dark-bg-color">
            <h3>Pesanan</h3>
            <h2 className="margin-bottom-0">6</h2>
            <p style={{ marginTop: "8px" }}>
              4 belum terkonfirmasi
            </p>
          </div>
          <div className="dashboard-home-grid-item dashboard-home-grid-small-2 dashboard-home-grid-item-big dark-bg-color">
            <h3>Rating</h3>
            <h2 className="margin-bottom-0">
              <img
                aria-hidden="true"
                src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                alt="home-star-icon"
              />{" "}
              4.9 / 5.0
            </h2>
            <p style={{ marginTop: "8px" }}>
              Dari 151 pesanan sukses
            </p>
          </div>
          <div className="dashboard-home-grid-item dashboard-home-grid-big-1 dashboard-home-grid-item-big dark-bg-color">
            <h3>Saldo</h3>
            <h2 className="margin-bottom-0">
              Rp.1.232.032.091
            </h2>
            <p style={{ marginTop: "8px" }}>
              2 Rental Berjalan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
