import React, { Fragment, memo, useState } from "react";
import Dropdown from "../../../components/DynamicDropdown";
import TextInput from "../../../components/TextInput";
import {
  ADD_CATALOGUE_INITIAL_COURIER_VALUE,
  ADD_CATALOGUE_WEIGHTUNIT_OPTIONS,
} from "../../../variables/initial/catalogue";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import { NO_DATA } from "../../../variables/global";
import Modal from "../../../components/Modal";
import { ShowDisplayItemImagesModal } from "./ShowModals";
import { handleOpenModal } from "../../../utils/functions/global";
import SkeletonWrapper from "../../../components/SkeletonWrapper";
import { defineFileSrc } from "../../../components/MultiUpload";

function handleFormatDropdownFromID(id, array) {
  const found = array.find((val) => val.id === id);

  if (found) return found;
  else return null;
}

const ShowDisplayItemImages = (props) => {
  const mappedImages = props.imagesData?.[props.item.id];
  return (
    <div className="dashboard-catalogue-identifier-img-wrapper">
      <SkeletonWrapper
        skeletonClassName="dashboard-catalogue-identifier-img cursor-pointer"
        className="dashboard-catalogue-identifier-img cursor-pointer"
        dependencyData={mappedImages}>
        <img
          className="content-wrapper"
          src={
            mappedImages?.[0] &&
            defineFileSrc(mappedImages[0])
          }
          alt={mappedImages?.[0]?.name}
          onClick={() => props.handleOpenModalUpload()}
        />
      </SkeletonWrapper>
      <div className="dashboard-catalogue-identifier-sub-img-wrapper">
        {!mappedImages &&
          [...Array(4)].map((_, index) => {
            return (
              <SkeletonWrapper
                key={`dashboard-catalogue-skeleton-img-${props.item.productName}-${index}`}
                skeletonClassName="dashboard-catalogue-identifier-sub-img cursor-pointer"
                className="dashboard-catalogue-identifier-sub-img cursor-pointer"
                dependencyData={mappedImages}
              />
            );
          })}
        {mappedImages?.map(
          (val, index) =>
            index > 0 && (
              <img
                key={`dashboard-catalogue-img-${props.item.productName}-${index}`}
                className="dashboard-catalogue-identifier-sub-img cursor-pointer"
                src={defineFileSrc(val)}
                alt={val.name}
                onClick={() =>
                  props.handleOpenModalUpload()
                }
              />
            )
        )}
      </div>
    </div>
  );
};

const ShowDisplayItem = ({
  item,
  index,
  formatDateID,
  formattedNumber,
  imagesData,
  filesData,
  handleSetImagesData,
  handleRemovedImagesData,
  handleSetFilesData,
  handleRemovedFilesData,
  handleTextChange,
  handleDropdownChange,
  handleNumberChange,
  handleOpenDetail,
  handleAddComponent,
  handleEditComponent,
  handleRemoveComponent,
  handleRemoveProduct,
  arrayDataValues,
  navigate,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] =
    useState(false);
  const [rejectedImagesData, setRejectedImagesData] =
    useState([]);
  const [rejectedFilesData, setRejectedFilesData] =
    useState([]);
  const [
    modalImagesUploadToggle,
    setModalImagesUploadToggle,
  ] = useState(false);

  function handleOpenModalUpload() {
    handleOpenModal(
      setModalImagesUploadToggle,
      modalImagesUploadToggle
    );
  }

  async function handleRemove() {
    setIsLoadingRemove(true);
    await handleRemoveProduct(item.id).finally(() =>
      setIsLoadingRemove(false)
    );
  }

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalUpload}
        toggle={modalImagesUploadToggle}>
        <ShowDisplayItemImagesModal
          item={item}
          imagesData={imagesData}
          handleSetImagesData={handleSetImagesData}
          handleRemovedImagesData={handleRemovedImagesData}
          rejectedImagesData={rejectedImagesData}
          setRejectedImagesData={setRejectedImagesData}
          modalImagesUploadToggle={modalImagesUploadToggle}
          handleOpenModalUpload={handleOpenModalUpload}
        />
      </Modal>
      <div
        key={`dashboard-catalogue-items-${item.id}`}
        className="dashboard-catalogue-body margin-top-12-18 dark-bg-color">
        <div className="dashboard-catalogue-body-sections">
          <div className="dashboard-catalogue-items dashboard-catalogue-body-identifier">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <TextArea
                value={item.productName}
                onChange={(e) =>
                  handleTextChange(
                    index,
                    "productName",
                    e.target.value
                  )
                }
                className="dashboard-catalogue-product-name-inputarea dark-bg-color light-color"
              />
            </p>
            <label className="margin-top-0 margin-bottom-0">
              {formatDateID(item.createdAt)}
            </label>
            <div className="breakline" />
            <label className="margin-top-0 margin-bottom-0">
              {item.productCode}
            </label>
            <ShowDisplayItemImages
              item={item}
              imagesData={imagesData}
              handleOpenModalUpload={handleOpenModalUpload}
            />
          </div>
          <div className="dashboard-catalogue-items dashboard-catalogue-body-statistic">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">Statistik</span>
            </p>
            <label className="margin-bottom-0">
              <span className="main-color">
                {formattedNumber("5222")} &nbsp;
              </span>
              Views
            </label>
            <div className="breakline" />
            <label className="margin-bottom-0">
              <span className="main-color">
                {formattedNumber("187")}&nbsp;
              </span>
              Terjual
            </label>
          </div>
          <div className="breakline" />
          <div className="dashboard-catalogue-items dashboard-catalogue-pricelist">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">Harga</span>
            </p>
            <div className="margin-top-bottom-0 dashboard-catalogue-textinput-box">
              Rp.&nbsp;
              <TextInput
                value={formattedNumber(item.productPrice)}
                onChange={(e) =>
                  handleNumberChange(
                    index,
                    "productPrice",
                    e
                  )
                }
                className="dashboard-catalogue-textinput darker-bg-color light-color"
              />
            </div>
            <div className="breakline" />
          </div>
          <div className="dashboard-catalogue-items dashboard-catalogue-body-stock">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">Gudang</span>
            </p>
            <label className="margin-bottom-0">
              <span className="main-color">SKU</span>
            </label>
            <div className="dashboard-catalogue-textinput-box">
              <TextInput
                value={item.productSKU}
                onChange={(e) =>
                  handleTextChange(
                    index,
                    "productSKU",
                    e.target.value
                  )
                }
                className="dashboard-catalogue-textinput darker-bg-color light-color margin-top-bottom-8"
              />
            </div>
            <label className="margin-bottom-0">
              <span className="main-color">Stock</span>
            </label>
            <div className="dashboard-catalogue-textinput-box">
              <TextInput
                value={formattedNumber(item.productStocks)}
                onChange={(e) =>
                  handleNumberChange(
                    index,
                    "productStocks",
                    e
                  )
                }
                className="dashboard-catalogue-textinput darker-bg-color light-color margin-top-bottom-8"
              />
            </div>
            <label className="margin-bottom-0">
              <span className="main-color">
                Safety Stock
              </span>
            </label>
            <div className="dashboard-catalogue-textinput-box">
              <TextInput
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
                className="dashboard-catalogue-textinput darker-bg-color light-color margin-top-bottom-8"
              />
            </div>
            <label className="margin-bottom-0">
              <span className="main-color">Satuan</span>
            </label>
            <Dropdown
              className="margin-top-bottom-8"
              value={() => {
                let result = handleFormatDropdownFromID(
                  item.uomId,
                  arrayDataValues.datas.productUOM
                );
                return result ? result.uom : NO_DATA;
              }}
              onChange={(value) => {
                handleDropdownChange(
                  index,
                  "uomId",
                  "uom",
                  "productUOM",
                  value
                );
              }}
              showTitle={false}
              toggle={true}
              values={arrayDataValues.dropdowns.productUOM}
            />
          </div>
          <div className="breakline" />
          <div className="dashboard-catalogue-items dashboard-catalogue-expedition">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">
                Pengantaran
              </span>
            </p>
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
                      value={
                        val ||
                        ADD_CATALOGUE_INITIAL_COURIER_VALUE
                      }
                      values={[
                        ...arrayDataValues.dropdowns
                          .couriers,
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
                      <h5 className="add-product-button-text">
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
                  null
                )
              }
              className="dashboard-catalogue-plus-button main-bg-color">
              <h4 className="add-product-button-text">+</h4>
            </Button>
          </div>
        </div>
        <div className="dashboard-catalogue-body-sections">
          <div className="dashboard-catalogue-items dashboard-catalogue-body-detail">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">Detail</span>
            </p>
            <label className="margin-bottom-0">
              <span className="main-color">Katalog</span>
            </label>
            <Dropdown
              style={{
                marginTop: "8px",
                marginBottom: "8px",
              }}
              value={() => {
                let result = handleFormatDropdownFromID(
                  item.catalogueId,
                  arrayDataValues.datas.catalogues
                );
                return result
                  ? result.catalogueName
                  : NO_DATA;
              }}
              onChange={(value) => {
                handleDropdownChange(
                  index,
                  "catalogueId",
                  "catalogueName",
                  "catalogues",
                  value
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
              value={() => {
                let result = handleFormatDropdownFromID(
                  item.categoryId,
                  arrayDataValues.datas.categories
                );
                return result
                  ? result.categoryName
                  : NO_DATA;
              }}
              onChange={(value) => {
                handleDropdownChange(
                  index,
                  "categoryId",
                  "categoryName",
                  "categories",
                  value
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
                value={() => {
                  return item.productWeightUnit || NO_DATA;
                }}
                onChange={(value) => {
                  handleTextChange(
                    index,
                    "productWeightUnit",
                    value
                  );
                }}
                showTitle={false}
                toggle={true}
                values={ADD_CATALOGUE_WEIGHTUNIT_OPTIONS}
              />
            </div>
            <label className="margin-bottom-0">
              <span className="main-color">Hashtag</span>
            </label>
            <div className="dashboard-catalogue-textinput-box margin-bottom-8">
              <TextArea
                style={{
                  marginTop: "8px",
                }}
                value={item.productHashtag}
                onChange={(e) =>
                  handleTextChange(
                    index,
                    "productHashtag",
                    e.target.value
                  )
                }
                className="dashboard-catalogue-longtext-area"
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
                    e.target.value
                  )
                }
                className="dashboard-catalogue-longtext-area"
              />
            </div>
          </div>
          <div className="breakline" />
          <div className="dashboard-catalogue-items dashboard-catalogue-body-description">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">Deskripsi</span>
            </p>
            <div className="dashboard-catalogue-description-longtext-area-box">
              <TextArea
                style={{ minHeight: "300px" }}
                value={item.productDescription}
                onChange={(e) =>
                  handleTextChange(
                    index,
                    "productDescription",
                    e.target.value
                  )
                }
                className="dashboard-catalogue-longtext-area"
              />
            </div>
          </div>
          <div className="breakline" />
          <div className="dashboard-catalogue-items dashboard-catalogue-body-option-detail">
            <p className="margin-top-0 dashboard-catalogue-body-title">
              <span className="light-color">Opsi</span>
            </p>
            <p className="main-bg-color margin-top-bottom-0 dashboard-catalogue-body-option-detail-status">
              {item.status}
            </p>
            <p
              onClick={() =>
                handleOpenDetail(item, navigate)
              }
              className="dark-color light-bg-color dashboard-catalogue-body-option-button">
              Showcase
            </p>
            {!isRemoving && (
              <p
                onClick={() =>
                  !isRemoving && setIsRemoving(true)
                }
                className="margin-top-0 margin-bottom-0 red-bg-color dashboard-catalogue-body-option-button">
                Remove
              </p>
            )}
            {isRemoving && (
              <div className="dashboard-catalogue-body-remove-button-wrapper">
                <p
                  onClick={() =>
                    !isLoadingRemove && handleRemove()
                  }
                  className="margin-top-0 margin-bottom-0 red-bg-color dashboard-catalogue-body-option-button">
                  {isLoadingRemove
                    ? "...Loading"
                    : "Confirm"}
                </p>
                <p
                  onClick={() =>
                    isRemoving && setIsRemoving(false)
                  }
                  className="margin-top-0 margin-bottom-0 transparent-bg-color dashboard-catalogue-body-option-button">
                  Cancel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ShowDisplayItem);
