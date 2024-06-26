import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";
import "./style.scss";
import {
  PURCHASE_ORDER_FILTER_DROPDOWN,
  PURCHASE_ORDER_FILTER_CHECKBOXES,
  PURCHASE_ORDER_DATA_DUMMY,
} from "../../variables/initial/dashboardTransaction";
import { useEffect } from "react";
import { smoothScrollTop } from "../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_TRANSACTIONS } from "../../variables/global";
import TextArea from "../../components/TextArea";
import SearchIcon from "../../assets/svg/search-icon.svg";

export default function DashboardTransaction(props) {
  // FUNCTIONS SPECIFIC //
  function handleOpenDetail(item, navigate) {
    navigate(`/product-detail?productId=${item.ID}`);
  }

  // COMPONENTS SPECIFIC //
  const ShowCheckboxes = () => {
    return PURCHASE_ORDER_FILTER_CHECKBOXES.map(
      (item, index) => {
        return (
          <Checkbox
            key={`checkbox-${item.title}-${index}`}
            className="my-orders-checkbox-item"
            title={item.title}
          />
        );
      }
    );
  };

  const ShowDropdowns = () => {
    return PURCHASE_ORDER_FILTER_DROPDOWN.map(
      (item, index) => {
        return (
          <Dropdown
            onChange={(value) => {}}
            key={`my-orders-filter-dropdown-${index}`}
            className="my-orders-dropdown-item"
            style={{ width: "100px", maxWidth: "100px" }}
            showTitle={item.showTitle}
            toggle={item.toggle}
            value={item.values[0]}
            values={item.values}
          />
        );
      }
    );
  };

  const ShowBody = () => {
    // HOOK
    const navigate = useNavigate();
    // Render list
    return PURCHASE_ORDER_DATA_DUMMY.map((item, index) => {
      return (
        <div
          key={`my-orders-items-${index}`}
          className="my-orders-body margin-top-12-18 dark-bg-color">
          <div className="my-orders-body-items my-orders-body-identifier">
            <h3 className="margin-top-0">
              {item.productName}
            </h3>
            <label className="margin-top-0 margin-bottom-0">
              Transaksi: {item.transactionCode}
            </label>
            <div className="breakline" />
            <div className="breakline" />
            <label className="margin-top-0 margin-bottom-0">
              Kode Barang: {item.productCode}
            </label>
            <div className="breakline" />
            <label className="margin-top-0 margin-bottom-0">
              List date: {item.CreatedAt}
            </label>
            <div className="breakline" />
            <div className="my-orders-identifier-img-wrapper">
              <img
                className="my-orders-identifier-img"
                src={item.productImg.src}
                alt={item.productImg.alt}
              />
            </div>
          </div>
          <div className="my-orders-body-items my-orders-body-note-box">
            <h3 className="margin-top-0">Note</h3>
            <TextArea
              readOnly={true}
              value={item.transactionNote}
              className="my-orders-body-longtext-area"></TextArea>
          </div>
          <div className="my-orders-body-items my-orders-body-rent-detail">
            <label className="margin-top-0 margin-bottom-0">
              Kurir:{" "}
              <span className="main-color">
                {item.transactionCourier}
              </span>
            </label>
            <div className="breakline" />
            <div className="breakline" />
            <label className="margin-top-0 margin-bottom-0">
              Durasi Rental :{" "}
              <span className="main-color">
                {item.transactionRentalDuration}
              </span>
            </label>
            <div className="breakline" />
            <label className="margin-top-0 margin-bottom-0">
              Charging:{" "}
              <span className="main-color">
                {item.transactionRentalPricing.price}{" "}
                {item.transactionRentalPricing.period}
              </span>
            </label>
            <h5 className="main-bg-color my-orders-body-rent-detail-status">
              Status : {item.status}
            </h5>
            <h5
              onClick={() =>
                handleOpenDetail(item, navigate)
              }
              className="margin-bottom-0 dark-color light-bg-color my-orders-body-rent-button">
              Detail Transaksi
            </h5>
            <div className="breakline" />
            <h5 className="margin-top-0 margin-bottom-0 red-bg-color my-orders-body-rent-button">
              Batalkan Pesanan
            </h5>
          </div>
        </div>
      );
    });
  };

  // INITIAL RENDER
  useEffect(() => {
    smoothScrollTop();
  }, []);

  return (
    <div
      className={
        props.toggleOpen === DASHBOARD_TRANSACTIONS
          ? "my-orders-container"
          : "display-none"
      }>
      <div className="my-orders-wrapper">
        <div className="my-orders-header dark-bg-color">
          <div className="my-orders-searchbar-container">
            <div className="my-orders-searchbar-wrapper">
              <Button className="my-orders-searchbar-button lighter-bg-color">
                <img
                  src={SearchIcon}
                  alt="search-icon-my-orders"
                />
              </Button>
              <TextInput className="my-orders-searchbar-input" />
            </div>
          </div>
          <div className="my-orders-tools-container">
            <div className="my-orders-tools-wrapper">
              <div className="my-orders-checkbox">
                <div className="my-orders-checkbox-wrapper">
                  <ShowCheckboxes />
                </div>
              </div>
              <div className="my-orders-dropdown-wrapper">
                <ShowDropdowns />
              </div>
            </div>
          </div>
        </div>
        <ShowBody />
        <div className="my-orders-paging margin-top-12-18 justify-center">
          <div className="dark-bg-color my-orders-paging-button">
            Prev
          </div>
          <div className="dark-bg-color my-orders-paging-button">
            1
          </div>
          <div className="dark-bg-color my-orders-paging-button">
            2
          </div>
          <div className="dark-bg-color my-orders-paging-button">
            3
          </div>
          <div className="dark-bg-color my-orders-paging-button">
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
