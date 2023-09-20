import React, { Fragment, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";
import "./style.scss";
import {
  filterCheckboxes,
  filterDropdowns,
  dumnmyValue,
} from "../../variables/initial/catalogue";
import { useEffect } from "react";
import { smoothScrollTop } from "../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_CATALOG } from "../../variables/global";
import {
  defaultPrice,
  pricePeriodValues,
} from "../../variables/initial/catalogue";

export default function DashboardCatalogue(props) {
  // HOOK
  const navigate = useNavigate();
  const [data, setData] = useState(dumnmyValue);

  // FUNCTIONS SPECIFIC //
  function handleOpenDetail(item, navigate) {
    navigate(`/detail?itemId=${item.ID}`);
  }

  function handleGoToAddProduct() {
    navigate(
      `/dashboard/add/product?code=${props.data.selectedStore.storeCode}`
    );
  }

  function handleTextChange(field, event) {
    const temp = { ...data };
    temp[field] = event.target.value;
    setData(temp);
  }

  function handlePriceChange(parentIndex, index, event) {
    const temp = [...data];
    temp[parentIndex].productPrices[index].price =
      event.target.value;
    setData(temp);
  }

  function handlePricesUnit(value, index) {
    const temp = { ...data };
    temp.productPrices[index].period = value;
    setData(temp);
  }

  function handleAddComponent(index, field, defaultValue) {
    const temp = [...data];
    temp[index][field].push(defaultValue);
    setData(temp);
  }

  // COMPONENTS SPECIFIC //
  const ShowCheckboxes = () => {
    return filterCheckboxes.map((item, index) => {
      return (
        <Checkbox
          key={`checkbox-${item.title}-${index}`}
          className="dashboard-catalogue-checkbox-item"
          title={item.title}
        />
      );
    });
  };

  const ShowDropdowns = () => {
    return filterDropdowns.map((item, index) => {
      return (
        <Dropdown
          onChange={(value) => {}}
          key={`dashboard-catalogue-filter-dropdown-${index}`}
          className="dashboard-catalogue-dropdown-item"
          style={{ width: "100px", maxWidth: "100px" }}
          showTitle={item.showTitle}
          toggle={item.toggle}
          values={item.values}
        />
      );
    });
  };

  const ShowAlterButton = (props) => {
    // HOOK
    const navigate = useNavigate();

    // RENDER
    return (
      <div
        onClick={() => handleGoToAddProduct()}
        className={`dashboard-catalogue-alter-button margin-top-12-18 justify-center ${props.className}`}>
        {props.children}
      </div>
    );
  };

  // INITIAL RENDER
  useEffect(() => {
    smoothScrollTop();
  }, []);

  return (
    <div
      className={
        props.toggleOpen === DASHBOARD_CATALOG
          ? "dashboard-catalogue-container"
          : "display-none"
      }>
      <div className="dashboard-catalogue-wrapper">
        <div className="dashboard-catalogue-header dark-bg-color">
          <div className="dashboard-catalogue-searchbar-container">
            <div className="dashboard-catalogue-searchbar-wrapper">
              <TextInput className="dashboard-catalogue-searchbar-input" />
              <Button>Search</Button>
            </div>
          </div>
          <div className="dashboard-catalogue-tools-container">
            <div className="dashboard-catalogue-tools-wrapper">
              <div className="dashboard-catalogue-checkbox">
                <div className="dashboard-catalogue-checkbox-wrapper">
                  <ShowCheckboxes />
                </div>
              </div>
              <div className="dashboard-catalogue-dropdown-wrapper">
                <ShowDropdowns />
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-catalogue-alter-button-container">
          <ShowAlterButton className="dashboard-catalogue-add-button dark-bg-color">
            <span className="main-color">Add +</span>
          </ShowAlterButton>
          <ShowAlterButton className="dashboard-catalogue-update-button main-bg-color">
            <span className="light-color">Update</span>
          </ShowAlterButton>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={`dashboard-catalogue-items-${index}`}
              className="dashboard-catalogue-body margin-top-12-18 dark-bg-color">
              <div className="dashboard-catalogue-items dashboard-catalogue-body-identifier">
                <h3 className="margin-top-0 dashboard-catalogue-body-title">
                  <span className="light-color">
                    {item.productName}
                  </span>
                </h3>
                <label className="margin-top-0 margin-bottom-0">
                  Code: {item.productCode}
                </label>
                <br />
                <label className="margin-top-0 margin-bottom-0">
                  Tanggal List: {item.CreatedAt}
                </label>
                <div className="dashboard-catalogue-identifier-img-wrapper">
                  <img
                    className="dashboard-catalogue-identifier-img"
                    src={item.productImg.src}
                    alt={item.productImg.alt}
                  />
                </div>
              </div>
              <div className="dashboard-catalogue-items dashboard-catalogue-body-statistic">
                <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
                  <span className="light-color">
                    Statistik
                  </span>
                </h3>
                <br />
                <label className="margin-bottom-0">
                  Views:{" "}
                  <span className="main-color">
                    {item.rentDetail.views}
                  </span>
                </label>
                <br />
                <label className="margin-top-0">
                  Total Penyewaan:{" "}
                  <span className="main-color">
                    {item.rentDetail.totalRentedCounts}
                  </span>
                </label>
                <br />
                <br />
              </div>
              <div className="dashboard-catalogue-items dashboard-catalogue-body-stock">
                <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
                  <span className="light-color">Stok</span>
                </h3>
                <br />
                <label className="margin-bottom-0">
                  Tersedia:{" "}
                  <span className="main-color">
                    {item.productStocks -
                      item.rentDetail.rented}
                  </span>
                </label>
                <br />
                <label className="margin-top-0 margin-bottom-0">
                  Tersewa:{" "}
                  <span className="main-color">
                    {item.rentDetail.rented}
                  </span>
                </label>
                <br />
                <br />
                <div className="dashboard-catalogue-textinput-box">
                  <TextInput
                    value={item.productStocks}
                    onChange={(e) =>
                      handleTextChange("productStocks", e)
                    }
                    className="dashboard-catalogue-textinput"></TextInput>
                  <label>
                    &nbsp;&nbsp;
                    <span className="main-color">Stok</span>
                  </label>
                </div>
                <br />
              </div>
              <div className="dashboard-catalogue-items dashboard-catalogue-pricelist">
                <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
                  <span className="light-color">
                    Pricing
                  </span>
                </h3>
                {item.productPrices.map(
                  (item, indexPrice) => {
                    return (
                      <Fragment
                        key={`dashboard-catalogue-pricelist-${indexPrice}`}>
                        <br />
                        <div className="margin-top-bottom-0 dashboard-catalogue-textinput-box">
                          <TextInput
                            value={item.price}
                            onChange={(e) =>
                              handlePriceChange(
                                index,
                                indexPrice,
                                e
                              )
                            }
                            className="dashboard-catalogue-textinput"></TextInput>
                          <Dropdown
                            value={item.period}
                            onChange={(value) =>
                              handlePricesUnit(
                                value,
                                indexPrice
                              )
                            }
                            style={{
                              marginLeft: "8px",
                              width: "75px",
                              maxWidth: "75px",
                            }}
                            showTitle={false}
                            toggle={true}
                            values={pricePeriodValues}
                          />
                        </div>
                      </Fragment>
                    );
                  }
                )}
                <Button
                  onClick={() =>
                    handleAddComponent(
                      index,
                      "productPrices",
                      { ...defaultPrice }
                    )
                  }
                  className="align-self-start add-catalogue-button main-bg-color">
                  <h4 className="add-catalogue-button-text">
                    +
                  </h4>
                </Button>
                <br />
              </div>
              <div className="dashboard-catalogue-items dashboard-catalogue-body-rent-detail">
                <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
                  <span className="light-color">Opsi</span>
                </h3>
                <p className="main-bg-color margin-bottom-0 dashboard-catalogue-body-rent-detail-status">
                  Status : {item.rentDetail.status}
                </p>
                <p
                  onClick={() =>
                    handleOpenDetail(item, navigate)
                  }
                  className="dark-color light-bg-color dashboard-catalogue-body-rent-button">
                  Details
                </p>
                <p className="margin-top-0 margin-bottom-0 red-bg-color dashboard-catalogue-body-rent-button">
                  Remove
                </p>
              </div>
            </div>
          );
        })}
        <div className="dashboard-catalogue-paging margin-top-12-18 justify-center">
          <div className="dark-bg-color dashboard-catalogue-paging-button">
            Prev
          </div>
          <div className="dark-bg-color dashboard-catalogue-paging-button">
            1
          </div>
          <div className="dark-bg-color dashboard-catalogue-paging-button">
            2
          </div>
          <div className="dark-bg-color dashboard-catalogue-paging-button">
            3
          </div>
          <div className="dark-bg-color dashboard-catalogue-paging-button">
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
