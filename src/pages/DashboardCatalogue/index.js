import React, { Fragment, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal";
import "./style.scss";
import {
  DASHBOARD_CATALOGUE_FILTER_CHECKBOXES,
  DASHBOARD_CATALOGUE_FILTER_DROPDOWNS,
  ADD_CATALOGUE_INITIAL_FETCHED_DATAS,
} from "../../variables/initial/catalogue";
import { useEffect } from "react";
import {
  formatDateID,
  formattedNumber,
  handleError500,
  handleErrorMessage,
  handleOpenModal,
  handleOpenOverridingHome,
  smoothScrollTop,
  unformattedNumber,
} from "../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import {
  AUTHORIZATION,
  CLIENT_USER_INFO,
  DASHBOARD_CATALOG,
  LOGIN,
  NO_DATA,
  URL_GET_CATALOGUE_DATA,
  URL_GET_CATEGORIES,
  URL_GET_COURIERS,
  X_SID,
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import ShowDisplayItem from "./ModularComponents/ShowDisplayItem";
import cloneDeep from "lodash-es/cloneDeep";

export default function DashboardCatalogue(props) {
  // HOOK
  const navigate = useNavigate();
  const itemPerPage = 5;
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [fetchedDatas, setFetchedDatas] = useState(
    ADD_CATALOGUE_INITIAL_FETCHED_DATAS
  );
  const [defaultResponse, setDefaultResponse] = useState(
    []
  );
  const [isNextShow, setIsNextShow] = useState(true);
  const [isPrevShow, setIsPrevShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const zeusService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES
  const storeId = props.data.selectedStore.id;
  const defaultConfigs = {
    headers: {
      [AUTHORIZATION]: `Bearer ${
        cookies.get(CLIENT_USER_INFO, {
          path: "/",
        }).credentialToken.accessToken
      }`,
      [X_SID]: cookies.get(CLIENT_USER_INFO, {
        path: "/",
      }).sid,
    },
    endpoint: process.env.REACT_APP_ZEUS_SERVICE,
  };

  // API ENDPOINTS
  const endpoints = [
    {
      ...defaultConfigs,
      url: URL_GET_CATALOGUE_DATA({
        storeId: storeId,
        isWithProducts: true,
        isProductOnly: false,
        itemPage: page,
        itemPerPage: itemPerPage,
      }),
    },
    {
      ...defaultConfigs,
      url: URL_GET_CATEGORIES,
    },
    {
      ...defaultConfigs,
      url: URL_GET_COURIERS,
    },
  ];

  // FUNCTIONS SPECIFIC //
  function handleMapResponses(array) {
    // set loading false after recieving the response
    setIsLoading(false);

    // map the responses to the states
    if (array[0].responseData.result.length > 0) {
      setDefaultResponse(
        cloneDeep(array[0].responseData.result)
      );
      setData(cloneDeep(array[0].responseData.result));
    }

    const fetchedCatalogues =
      array[0].responseData.catalogues.map(
        (obj) => obj.catalogueName
      );
    const fetchedCategories = array[1].responseData.map(
      (obj) => obj.categoryName
    );
    const fetchedCouriers = array[2].responseData.map(
      (obj) => obj.courierName
    );

    let newFetchedDatas = { ...fetchedDatas };
    newFetchedDatas = {
      datas: {
        catalogues: array[0].responseData.catalogues,
        categories: array[1].responseData,
        couriers: array[2].responseData,
      },
      dropdowns: {
        catalogues:
          fetchedCatalogues.length === 0
            ? [NO_DATA]
            : fetchedCatalogues,
        categories:
          fetchedCategories.length === 0
            ? [NO_DATA]
            : fetchedCategories,
        couriers:
          fetchedCouriers.length === 0
            ? [NO_DATA]
            : fetchedCouriers,
      },
    };

    setFetchedDatas(newFetchedDatas);
    setIsNextShow(
      array[0].responseData.instructions.isNext
    );
    setIsPrevShow(
      array[0].responseData.instructions.isPrev
    );
  }

  function setDataAndUpdate(value) {
    setIsUpdating(true);
    setData(value);
  }

  function handleOpenDetail(item, navigate) {
    navigate(`/product-detail?productId=${item.id}`);
  }

  function handleGoToAddProduct() {
    navigate(
      `/dashboard/add/product?storeId=${props.data.selectedStore.id}`
    );
  }

  function handleUpdateProducts() {
    setIsUpdating(false);
  }

  function handleCancelUpdateProducts() {
    setData(cloneDeep(defaultResponse));
    setIsUpdating(false);
  }

  function handleNumberChange(index, field, event) {
    const temp = [...data];
    temp[index][field] = unformattedNumber(
      event.target.value
    );
    setDataAndUpdate(temp);
  }

  function handleTextChange(index, field, value) {
    const temp = [...data];
    temp[index][field] = value;
    setDataAndUpdate(temp);
  }

  function handleDropdownChange(
    index,
    field,
    fromValueField,
    dropdownField,
    value
  ) {
    const temp = [...data];
    const dropdownValues = [
      ...fetchedDatas.datas[dropdownField],
    ];

    const found = dropdownValues.find(
      (val) => val[fromValueField] === value
    );

    temp[index][field] = found.id;
    setDataAndUpdate(temp);
  }

  function handleEditComponent(
    field,
    parentIndex,
    targetIndex,
    value
  ) {
    let temp = [...data];
    let targetVal = JSON.parse(temp[parentIndex][field]);

    targetVal[targetIndex] = value;
    temp[parentIndex][field] = JSON.stringify(targetVal);
    setDataAndUpdate(temp);
  }

  function handleAddComponent(
    field,
    parentIndex,
    defaultValue
  ) {
    let temp = [...data];
    let targetVal = JSON.parse(temp[parentIndex][field]);
    targetVal.push(defaultValue);

    temp[parentIndex][field] = JSON.stringify(targetVal);
    setDataAndUpdate(temp);
  }

  function handleRemoveComponent(
    field,
    parentIndex,
    targetIndex
  ) {
    let temp = [...data];
    let targetVal = JSON.parse(temp[parentIndex][field]);
    targetVal.splice(targetIndex, 1);

    temp[parentIndex][field] = JSON.stringify(targetVal);
    setDataAndUpdate(temp);
  }

  function handleNextPage() {
    setPage(page + 1);
    setIsUpdating(false);
  }

  function handlePrevPage() {
    if (page > 0) setPage(page - 1);
    setIsUpdating(false);
  }

  // COMPONENTS SPECIFIC //
  const ShowCheckboxes = () => {
    return DASHBOARD_CATALOGUE_FILTER_CHECKBOXES.map(
      (item, index) => {
        return (
          <Checkbox
            key={`checkbox-${item.title}-${index}`}
            className="dashboard-catalogue-checkbox-item"
            title={item.title}
          />
        );
      }
    );
  };

  const ShowDropdowns = () => {
    return DASHBOARD_CATALOGUE_FILTER_DROPDOWNS.map(
      (item, index) => {
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
      }
    );
  };

  const ShowAlterButton = (props) => {
    return (
      <div
        onClick={() => props.onClick()}
        className={`dashboard-catalogue-alter-button margin-top-12-18 justify-center ${props.className}`}>
        {props.children}
      </div>
    );
  };

  const ShowResultMessage = () => {
    const messageStyle = {
      color: "white",
      justifyContent: "center",
      alignItems: "center",
      height: "stretch",
      textAlign: "center",
    };
    if (!isLoading && data.length > 0) return;
    return (
      <div
        className="dashboard-catalogue-body margin-top-12-18"
        style={messageStyle}>
        {isLoading && <p>Loading Bentar...</p>}
        {!isLoading && data.length <= 0 && (
          <p>Belum Ada Barang nih, tambahin dulu gih !</p>
        )}
      </div>
    );
  };

  // INITIAL RENDER
  useEffect(() => {
    smoothScrollTop();
    (async () => {
      await zeusService
        .getAllData(endpoints)
        .then((result) => {
          handleMapResponses(result.responseData);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.responseStatus === 500)
            handleError500();
          if (
            error.responseStatus === 401 ||
            error.responseStatus === 403
          ) {
            cookies.remove(CLIENT_USER_INFO, { path: "/" });
            handleOpenOverridingHome(LOGIN);
          } else
            handleErrorMessage(
              error,
              setErrorMessage,
              setModalToggle,
              modalToggle
            );
        });
    })();
  }, [page]);

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setModalToggle, modalToggle)
        }
        toggle={modalToggle}>
        <ShowErrorModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setModalToggle}
          modalToggle={modalToggle}
          errorMessage={errorMessage}
        />
      </Modal>
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
            <ShowAlterButton
              onClick={handleGoToAddProduct}
              className="dashboard-catalogue-add-button dark-bg-color">
              <span className="main-color">Add +</span>
            </ShowAlterButton>
            {isUpdating && (
              <Fragment>
                <ShowAlterButton
                  onClick={handleUpdateProducts}
                  className="dashboard-catalogue-update-button main-bg-color">
                  <span className="light-color">
                    Update
                  </span>
                </ShowAlterButton>
                <ShowAlterButton
                  onClick={handleCancelUpdateProducts}
                  className="dashboard-catalogue-update-button red-bg-color">
                  <span className="light-color">
                    Cancel
                  </span>
                </ShowAlterButton>
              </Fragment>
            )}
          </div>
          {data.map((item, index) => {
            return (
              <ShowDisplayItem
                key={index}
                item={item}
                index={index}
                formatDateID={formatDateID}
                formattedNumber={formattedNumber}
                handleTextChange={handleTextChange}
                handleDropdownChange={handleDropdownChange}
                handleNumberChange={handleNumberChange}
                handleOpenDetail={handleOpenDetail}
                handleAddComponent={handleAddComponent}
                handleEditComponent={handleEditComponent}
                handleRemoveComponent={
                  handleRemoveComponent
                }
                arrayDataValues={fetchedDatas}
                navigate={navigate}
              />
            );
          })}
          <ShowResultMessage />
          {!isLoading && data.length > 0 && (
            <div className="dashboard-catalogue-paging justify-center">
              {isPrevShow && (
                <Button
                  onClick={handlePrevPage}
                  className="dark-bg-color dashboard-catalogue-paging-button">
                  <span className="red-color">
                    {"◄ Prev"}
                  </span>
                </Button>
              )}
              {isNextShow && (
                <Button
                  onClick={handleNextPage}
                  className="dark-bg-color dashboard-catalogue-paging-button">
                  <span className="main-color">
                    {"Next ►"}
                  </span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
