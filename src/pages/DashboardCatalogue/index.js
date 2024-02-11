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
  getURLParams,
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
  CONTENT_TYPE,
  DASHBOARD_CATALOG,
  LOGIN,
  NO_DATA,
  PRODUCT_CATALOGUE_ADDITIONAL_FILES,
  PRODUCT_CATALOGUE_IMAGE,
  UPLOADED_UPDATE_ADDITIONAL_FILES,
  UPLOADED_UPDATE_IMAGE_FILES,
  URL_GET_CATALOGUE_DATA,
  URL_GET_CATEGORIES,
  URL_GET_COURIERS,
  URL_GET_UOM,
  URL_PATCH_STORE_PRODUCT,
  X_SID,
} from "../../variables/global";
import { useAxios } from "../../utils/hooks/useAxios";
import { cookies } from "../../config/cookie";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import ShowDisplayItem from "./ModularComponents/ShowDisplayItem";
import cloneDeep from "lodash-es/cloneDeep";
import SearchIcon from "../../assets/svg/search-icon.svg";
import { authInterceptor } from "../../utils/functions/credentials";
import { isEqual } from "lodash-es";
import { getFilesFromImagesUrl } from "../../utils/functions/asynchronous";

export default function DashboardCatalogue(props) {
  // HOOK
  const navigate = useNavigate();
  const itemPerPage = 5;
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [imagesData, setImagesData] = useState({});
  const [removedImagesData, setRemovedImagesData] =
    useState({});
  const [filesData, setFilesData] = useState({});
  const [removedFilesData, setRemovedFilesData] = useState(
    {}
  );
  const [fetchedDatas, setFetchedDatas] = useState(
    ADD_CATALOGUE_INITIAL_FETCHED_DATAS
  );
  const [defaultResponse, setDefaultResponse] = useState(
    []
  );
  const [defaultImagesData, setDefaultImagesData] =
    useState({});
  const [defaultFilesData, setDefaultFilesData] = useState(
    {}
  );
  const [isNextShow, setIsNextShow] = useState(true);
  const [isPrevShow, setIsPrevShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingImages, setIsUpdatingImages] =
    useState(false);
  const [isUpdatingFiles, setIsUpdatingFiles] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axiosService = useAxios();
  const [modalToggle, setModalToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // VARIABLES
  const currentLocation = new URL(document.location);
  const currentTab = getURLParams(currentLocation, "tab");
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
    {
      ...defaultConfigs,
      url: URL_GET_UOM,
    },
  ];

  // FUNCTIONS SPECIFIC //
  function handleMapResponses(array) {
    // map the responses to the states
    if (array[0].responseData.result.length > 0) {
      const result = array[0].responseData.result;

      // both cloned deep to prevent having the same reference
      handleGetFilesAsync(result);
      setDefaultResponse(cloneDeep(result));
      setData(cloneDeep(result));
    }

    let [fct, fcs, fcr, fuom] = [
      "catalogueName",
      "categoryName",
      "courierName",
      "uom",
    ].map((property, index) =>
      handleDropdownProperties(array, index, property)
    );

    let newFetchedDatas = { ...fetchedDatas };
    newFetchedDatas = {
      datas: {
        catalogues: array[0].responseData.catalogues,
        categories: array[1].responseData,
        couriers: array[2].responseData,
        productUOM: array[3].responseData,
      },
      dropdowns: {
        catalogues: handleFetchedDataDropdowns(fct),
        categories: handleFetchedDataDropdowns(fcs),
        couriers: handleFetchedDataDropdowns(fcr),
        productUOM: handleFetchedDataDropdowns(fuom),
      },
    };

    setFetchedDatas(newFetchedDatas);
    setIsNextShow(
      array[0].responseData.instructions.isNext
    );
    setIsPrevShow(
      array[0].responseData.instructions.isPrev
    );

    // set loading false after doing all the process
    setIsLoading(false);
  }

  function handleFetchedDataDropdowns(data) {
    return data.length ? data : [NO_DATA];
  }

  function handleDropdownProperties(
    array,
    index,
    property
  ) {
    let temp;
    if (array[index].responseData.catalogues)
      temp = array[index].responseData.catalogues;
    else temp = array[index].responseData;
    return temp.map((obj) => obj[property]);
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
    let objToBeUpdated = [];
    let updatedImagesData = [];
    let updatedFilesData = [];

    for (let i = 0; i < defaultResponse.length; i++) {
      const temp = defaultResponse[i];
      const compare = data.find(
        (val) => val.id === temp.id
      );

      if (compare && !isEqual(compare, temp))
        objToBeUpdated.push(compare);
    }

    // Constructing an object with the fields to update
    const targetUpdates = objToBeUpdated.reduce(
      (accumulator, data) => {
        accumulator[data.id] = {
          productName: data.productName,
          productDescription: data.productDescription,
          productHashtag: data.productHashtag,
          productCondition: data.productCondition,
          productWeight: data.productWeight,
          productWeightUnit: data.productWeightUnit,
          productPrice: data.productPrice,
          productSKU: data.productSKU,
          productStocks: data.productStocks,
          productSafetyStocks: data.productSafetyStocks,
          courierChoosen: data.availableCourierList,
          productCatalogue: data.catalogueId,
          productCategory: data.categoryId,
          productUOM: data.uomId,
        };
        return accumulator;
      },
      {}
    );

    let payload = {
      products: targetUpdates,
    };

    if (isUpdatingImages)
      payload = {
        ...payload,
        [UPLOADED_UPDATE_IMAGE_FILES]:
          JSON.stringify(imagesData),
      };
    if (isUpdatingFiles)
      payload = {
        ...payload,
        [UPLOADED_UPDATE_ADDITIONAL_FILES]:
          JSON.stringify(filesData),
      };

    axiosService
      .patchDataWithOnRequestInterceptors(
        {
          endpoint: process.env.REACT_APP_ZEUS_SERVICE,
          url: URL_PATCH_STORE_PRODUCT(storeId),
          headers: {
            ...defaultConfigs.headers,
            [CONTENT_TYPE]: "application/json",
          },
          data: payload,
        },
        async () =>
          await authInterceptor(axiosService, cookies)
      )
      .then(() => {
        setDefaultResponse(cloneDeep(data));
        setIsUpdating(false);
        setIsUpdatingImages(false);
        setIsUpdatingFiles(false);
      })
      .catch((err) => console.error(err));
    // .catch((error) => handleAxiosError(error));
  }

  function handleSetDataToUpdate(value) {
    if (
      isEqual(defaultResponse, data) &&
      !(isUpdatingImages || isUpdatingFiles)
    )
      setIsUpdating(false);
    else {
      setIsUpdating(true);
      setData(value);
    }
  }

  function handleClearDataToUpdate() {
    setData(cloneDeep(defaultResponse));
    setImagesData(cloneDeep(defaultImagesData));
    setRemovedImagesData([]);
    setFilesData(cloneDeep(defaultFilesData));
    setRemovedImagesData([]);
    setIsUpdating(false);
    setIsUpdatingImages(false);
    setIsUpdatingFiles(false);
  }

  function handleNumberChange(index, field, event) {
    const temp = [...data];
    const targetValue = event.target.value;
    temp[index][field] = unformattedNumber(targetValue);
    handleSetDataToUpdate(temp);
  }

  function handleTextChange(index, field, value) {
    const temp = [...data];
    temp[index][field] = value;
    handleSetDataToUpdate(temp);
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
    handleSetDataToUpdate(temp);
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
    handleSetDataToUpdate(temp);
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
    handleSetDataToUpdate(temp);
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
    handleSetDataToUpdate(temp);
  }

  function handleSetImagesData(id, state) {
    let temp = cloneDeep(imagesData);
    temp[id] = state;
    setImagesData(temp);
    setIsUpdating(true);
    setIsUpdatingImages(true);
  }

  function handleRemovedImagesData(id, state) {
    let temp = cloneDeep(removedImagesData);
    temp[id] = state;
    setRemovedImagesData(temp);
    setIsUpdating(true);
    setIsUpdatingImages(true);
  }

  function handleSetFilesData(id, state) {
    let temp = cloneDeep(filesData);
    temp[id] = state;
    setFilesData(state);
    setIsUpdating(true);
    setIsUpdatingFiles(true);
  }

  function handleRemovedFilesData(id, state) {
    let temp = cloneDeep(removedFilesData);
    temp[id] = state;
    setRemovedFilesData(temp);
    setIsUpdating(true);
    setIsUpdatingImages(true);
  }

  function handleNextPage() {
    setPage(page + 1);
    setIsUpdating(false);
    setIsLoading(true);
    setData([]);
  }

  function handlePrevPage() {
    if (page > 0) setPage(page - 1);
    setIsUpdating(false);
    setIsLoading(true);
    setData([]);
  }

  function handleAxiosError(error) {
    setIsLoading(false);
    if (error.responseStatus === 500) handleError500();
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
  }

  async function handleGetFilesAsync(result) {
    let fetchedImageDatas = {};
    let fetchedFileDatas = {};
    for (let index = 0; index < result.length; index++) {
      const current = result[index];
      const mappedFileInfos = current.MasterFiles.reduce(
        (acc, val) => {
          let targetFile = {
            fileId: val.id,
            fileName: val.filename,
            fileType: val.fileType,
            mimeType: val.mimetype,
          };
          if (val.fileType === PRODUCT_CATALOGUE_IMAGE) {
            acc[PRODUCT_CATALOGUE_IMAGE].push(targetFile);
          } else if (
            val.fileType ===
            PRODUCT_CATALOGUE_ADDITIONAL_FILES
          ) {
            acc[PRODUCT_CATALOGUE_ADDITIONAL_FILES].push(
              targetFile
            );
          }
          return acc;
        },
        {
          [PRODUCT_CATALOGUE_IMAGE]: [],
          [PRODUCT_CATALOGUE_ADDITIONAL_FILES]: [],
        }
      );

      await Promise.all([
        getFilesFromImagesUrl(
          axiosService,
          mappedFileInfos[PRODUCT_CATALOGUE_IMAGE]
        ),
        getFilesFromImagesUrl(
          axiosService,
          mappedFileInfos[
            PRODUCT_CATALOGUE_ADDITIONAL_FILES
          ]
        ),
      ])
        .then((response) => {
          fetchedImageDatas[current.id] =
            response[0].responseData;
          fetchedFileDatas[current.id] =
            response[1].responseData;
        })
        .catch((error) => console.error(error));
    }

    setImagesData(cloneDeep(fetchedImageDatas));
    setDefaultImagesData(cloneDeep(fetchedImageDatas));
    setFilesData(cloneDeep(fetchedFileDatas));
    setDefaultFilesData(cloneDeep(fetchedFileDatas));
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
            value={item.values[0]}
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
    if (currentTab !== DASHBOARD_CATALOG) return;
    smoothScrollTop();
    (async () => {
      await axiosService
        .getAllData(endpoints)
        .then((result) => {
          handleMapResponses(result.responseData);
        })
        .catch((error) => {
          handleAxiosError(error);
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
                <Button className="dashboard-catalogue-searchbar-button lighter-bg-color">
                  <img
                    src={SearchIcon}
                    alt="search-icon-dashboard-catalogue"
                  />
                </Button>
                <TextInput className="dashboard-catalogue-searchbar-input" />
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
                  onClick={handleClearDataToUpdate}
                  className="dashboard-catalogue-update-button red-bg-color">
                  <span className="light-color">
                    Cancel
                  </span>
                </ShowAlterButton>
              </Fragment>
            )}
          </div>
          {data?.map((item, index) => (
            <ShowDisplayItem
              key={index}
              item={item}
              index={index}
              formatDateID={formatDateID}
              formattedNumber={formattedNumber}
              imagesData={imagesData}
              filesData={filesData}
              handleSetImagesData={handleSetImagesData}
              handleRemovedImagesData={
                handleRemovedImagesData
              }
              handleSetFilesData={handleSetFilesData}
              handleRemovedFilesData={
                handleRemovedFilesData
              }
              handleTextChange={handleTextChange}
              handleDropdownChange={handleDropdownChange}
              handleNumberChange={handleNumberChange}
              handleOpenDetail={handleOpenDetail}
              handleAddComponent={handleAddComponent}
              handleEditComponent={handleEditComponent}
              handleRemoveComponent={handleRemoveComponent}
              arrayDataValues={fetchedDatas}
              navigate={navigate}
            />
          ))}
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
