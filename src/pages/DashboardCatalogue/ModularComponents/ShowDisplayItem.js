import React, { memo } from "react";
import Dropdown from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import {
  defaultCourier,
  stockTypes,
  weightList,
} from "../../../variables/initial/catalogue";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";

const ShowDisplayItem = ({
  item,
  index,
  formatDateID,
  formattedNumber,
  handleTextChange,
  handleNumberChange,
  handleOpenDetail,
  handleAddComponent,
  handleEditComponent,
  handleRemoveComponent,
  arrayDataValues,
  navigate,
}) => {
  return (
    <div
      key={`dashboard-catalogue-items-${item.id}`}
      className="dashboard-catalogue-body margin-top-12-18 dark-bg-color">
      <div className="dashboard-catalogue-body-sections">
        <div className="dashboard-catalogue-items dashboard-catalogue-body-identifier">
          <h3 className="margin-top-0 dashboard-catalogue-body-title">
            <span className="light-color">
              {item.productName}
            </span>
          </h3>
          <label className="margin-top-0 margin-bottom-0">
            {formatDateID(item.createdAt)}
          </label>
          <br />
          <label className="margin-top-0 margin-bottom-0">
            {item.productCode}
          </label>
          <div className="dashboard-catalogue-identifier-img-wrapper">
            <img
              className="dashboard-catalogue-identifier-img"
              src={`${process.env.REACT_APP_CHRONOS_SERVICE}${item.MasterFiles[0].destination}`}
              alt={item.MasterFiles[0].filename}
            />
          </div>
        </div>
        <div className="dashboard-catalogue-items dashboard-catalogue-body-statistic">
          <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
            <span className="light-color">Statistik</span>
          </h3>
          <br />
          <label className="margin-bottom-0">
            <span className="main-color">
              {formattedNumber("5222")} &nbsp;
            </span>
            Views
          </label>
          <br />
          <label className="margin-bottom-0">
            <span className="main-color">
              {formattedNumber("187")}&nbsp;
            </span>
            Terjual
          </label>
        </div>
        <br />
        <div className="dashboard-catalogue-items dashboard-catalogue-pricelist">
          <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
            <span className="light-color">Harga</span>
          </h3>
          <br />
          <div className="margin-top-bottom-0 dashboard-catalogue-textinput-box">
            Rp.&nbsp;
            <TextInput
              value={formattedNumber(item.productPrice)}
              onChange={(e) =>
                handleNumberChange(index, "productPrice", e)
              }
              className="dashboard-catalogue-textinput darker-bg-color light-color"
            />
          </div>
          <br />
        </div>
        <div className="dashboard-catalogue-items dashboard-catalogue-body-stock">
          <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
            <span className="light-color">Gudang</span>
          </h3>
          <br />
          <label className="margin-bottom-0">
            <span className="main-color">Stock</span>
          </label>
          <div className="dashboard-catalogue-textinput-box">
            <TextInput
              style={{
                marginTop: "8px",
                marginBottom: "8px",
              }}
              value={formattedNumber(item.productStocks)}
              onChange={(e) =>
                handleNumberChange(
                  index,
                  "productStocks",
                  e
                )
              }
              className="dashboard-catalogue-textinput darker-bg-color light-color"
            />
          </div>
          <label className="margin-bottom-0">
            <span className="main-color">Safety Stock</span>
          </label>
          <div className="dashboard-catalogue-textinput-box">
            <TextInput
              style={{
                marginTop: "8px",
              }}
              value={formattedNumber(
                item.productSafetyStocks
              )}
              onChange={(e) =>
                handleNumberChange(
                  index,
                  "productSafetyStocks",
                  e
                )
              }
              className="dashboard-catalogue-textinput darker-bg-color light-color"
            />
          </div>
          <Dropdown
            style={{
              marginTop: "8px",
            }}
            value={item.productStockType}
            onChange={(e) => {
              handleTextChange(
                index,
                "productStockType",
                e
              );
            }}
            showTitle={false}
            toggle={true}
            values={stockTypes}
          />
        </div>
        <br />
        <div className="dashboard-catalogue-items dashboard-catalogue-expedition">
          <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
            <span className="light-color">Pengantaran</span>
          </h3>
          <br />
          {JSON.parse(item.availableCourierList).map(
            (val, childIndex) => {
              return (
                <div
                  key={`dashboard-catalogue-product-courier-${childIndex}`}
                  className={`dashboard-catalogue-dropdown-box ${
                    childIndex === 0 && "margin-top-0"
                  }`}>
                  <Dropdown
                    onChange={(value) =>
                      handleEditComponent(
                        "availableCourierList",
                        index,
                        childIndex,
                        value
                      )
                    }
                    showTitle={false}
                    toggle={true}
                    value={val}
                    values={[
                      ...arrayDataValues.dropdowns.couriers,
                    ]}
                  />
                  <Button
                    onClick={() =>
                      handleRemoveComponent(
                        "availableCourierList",
                        index,
                        childIndex
                      )
                    }
                    className="dashboard-catalogue-delete-button red-bg-color">
                    <h5 className="add-catalogue-button-text">
                      X
                    </h5>
                  </Button>
                </div>
              );
            }
          )}
          <Button
            onClick={() =>
              handleAddComponent(
                "availableCourierList",
                index,
                defaultCourier
              )
            }
            className="dashboard-catalogue-plus-button main-bg-color">
            <h4 className="add-catalogue-button-text">+</h4>
          </Button>
        </div>
      </div>
      <div className="dashboard-catalogue-body-sections">
        <div className="dashboard-catalogue-items dashboard-catalogue-body-info">
          <h3 className="margin-top-0 dashboard-catalogue-body-title">
            <span className="light-color">Info</span>
          </h3>
          <label className="margin-bottom-0">
            <span className="main-color">Katalog</span>
          </label>
          <Dropdown
            style={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
            value={item.productStockType}
            onChange={(e) => {
              handleTextChange(
                index,
                "productStockType",
                e
              );
            }}
            showTitle={false}
            toggle={true}
            values={arrayDataValues.dropdowns.catalogues}
          />
          <label className="margin-bottom-0">
            <span className="main-color">Kategori</span>
          </label>
          <Dropdown
            style={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
            value={item.productStockType}
            onChange={(e) => {
              handleTextChange(
                index,
                "productStockType",
                e
              );
            }}
            showTitle={false}
            toggle={true}
            values={arrayDataValues.dropdowns.categories}
          />
          <label className="margin-bottom-0">
            <span className="main-color">Berat</span>
          </label>
          <div className="dashboard-catalogue-textinput-box">
            <TextInput
              style={{
                marginTop: "8px",
                marginBottom: "8px",
              }}
              value={formattedNumber(item.productWeight)}
              onChange={(e) =>
                handleNumberChange(
                  index,
                  "productWeight",
                  e
                )
              }
              className="dashboard-catalogue-textinput darker-bg-color light-color"
            />
            <Dropdown
              style={{
                marginLeft: "8px",
              }}
              value={item.productWeightUnit}
              onChange={(e) => {
                handleTextChange(
                  index,
                  "productWeightUnit",
                  e
                );
              }}
              showTitle={false}
              toggle={true}
              values={weightList}
            />
          </div>
          <label className="margin-bottom-0">
            <span className="main-color">Kondisi</span>
          </label>
          <div className="dashboard-catalogue-textinput-box">
            <TextArea
              style={{
                marginTop: "8px",
              }}
              value={item.productCondition}
              onChange={(e) =>
                handleTextChange(
                  index,
                  "productCondition",
                  e
                )
              }
              className="dashboard-catalogue-longtext-area"
            />
          </div>
        </div>
        <br />
        <div className="dashboard-catalogue-items dashboard-catalogue-body-description">
          <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
            <span className="light-color">Deskripsi</span>
          </h3>
          <br />
          <TextArea
            value={item.productDescription}
            onChange={(e) =>
              handleTextChange(
                index,
                "productDescription",
                e
              )
            }
            className="dashboard-catalogue-longtext-area"
          />
        </div>
        <br />
        <div className="dashboard-catalogue-items dashboard-catalogue-body-option-detail">
          <h3 className="margin-top-0 margin-bottom-0 dashboard-catalogue-body-title">
            <span className="light-color">Opsi</span>
          </h3>
          <br />
          <p className="main-bg-color margin-top-bottom-0 dashboard-catalogue-body-option-detail-status">
            {item.status}
          </p>
          <p
            onClick={() => handleOpenDetail(item, navigate)}
            className="dark-color light-bg-color dashboard-catalogue-body-option-button">
            Showcase
          </p>
          <p className="margin-top-0 margin-bottom-0 red-bg-color dashboard-catalogue-body-option-button">
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ShowDisplayItem);
