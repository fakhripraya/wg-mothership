import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Button from "../../components/Button";
import Dropdown from "../../components/DynamicDropdown";
import Modal from "../../components/Modal";
import MultiUpload, {
  AcceptedFileItems,
  FileRejectionItems,
} from "../../components/MultiUpload";
import TextInput from "../../components/TextInput";
import {
  ADD_CATALOGUE_INITIAL_COURIER_VALUE,
  ADD_CATALOGUE_INITIAL_VALUE,
  ADD_CATALOGUE_INITIAL_FETCHED_DATAS,
  ADD_CATALOGUE_WEIGHTUNIT_OPTIONS,
} from "../../variables/initial/catalogue";
import {
  ADD_CATALOGUE_FORM,
  AUTHORIZATION,
  CLIENT_USER_INFO,
  CONTENT_TYPE,
  DASHBOARD_CATALOG,
  GENERAL_MULTIUPLOAD_LABEL,
  GENERAL_MULTIUPLOAD_SUBLABEL,
  IS_OTP_VERIFIED,
  LOGIN,
  NO_DATA,
  PDF,
  UPLOADED_ADDITIONAL_FILES,
  UPLOADED_IMAGE_FILES,
  URL_GET_CATALOGUE_DATA,
  URL_GET_CATEGORIES,
  URL_GET_COURIERS,
  URL_GET_UOM,
  URL_POST_ADD_STORE_PRODUCT_CATALOGUE,
  X_SID,
} from "../../variables/global";
import AgreementIcon from "../../assets/svg/agreement-icon.svg";
import "./style.scss";
import Checkbox from "../../components/Checkbox";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  acceptNumericOnly,
  formattedNumber,
  handleError500,
  handleErrorMessage,
  handleOpenModal,
  handleOpenOverridingHome,
} from "../../utils/functions/global";
import { trackPromise } from "react-promise-tracker";
import {
  AGREEMENT_CHECKBOX_UNCHECKED,
  INPUT_NEW_CATALOGUE_VALUE,
} from "../../variables/errorMessages/catalogue";
import { cookies } from "../../config/cookie";
import TextArea from "../../components/TextArea";
import PageLoading from "../PageLoading";
import { LOGIN_PAGE_REDIRECTING_MESSAGE } from "../../variables/errorMessages/dashboard";
import {
  ShowAddNewCatalogueModal,
  ShowErrorModal,
  ShowSuccessModal,
  ShowUploadModal,
} from "./ModularComponents/ShowModals";
import { authInterceptor } from "../../utils/functions/credentials";

// TODO: Fix input lag caused by uploaded file re rendered
export default function AddProduct() {
  // HOOK
  const navigate = useNavigate();
  const axiosService = useAxios();
  const [searchParams] = useSearchParams();

  // STATE
  const [data, setData] = useState(
    ADD_CATALOGUE_INITIAL_VALUE
  );
  const [fetchedDatas, setFetchedDatas] = useState(
    ADD_CATALOGUE_INITIAL_FETCHED_DATAS
  );
  const [agreementCheckbox, setAgreementCheckbox] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalUploadToggle, setModalUploadToggle] =
    useState(false);
  const [modalCatalogueToggle, setModalCatalogueToggle] =
    useState(false);
  const [errorModalToggle, setErrorModalToggle] =
    useState(false);
  const [productPictures, setProductPictures] = useState(
    []
  );
  const [
    rejectedProductPictures,
    setRejectedProductPictures,
  ] = useState([]);
  const [additionalDocuments, setAdditionalDocuments] =
    useState([]);
  const [
    rejectedAdditionalDocuments,
    setRejectedAdditionalDocuments,
  ] = useState([]);
  const [success, setSuccess] = useState(false);

  // VARIABLES
  let login = cookies.get(CLIENT_USER_INFO);
  const storeId = searchParams.get("storeId");
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
      config: {
        ...defaultConfigs,
        url: URL_GET_CATALOGUE_DATA({
          storeId: storeId,
        }),
      },
      callbackInterceptors: async () =>
        await authInterceptor(axiosService, cookies),
    },
    {
      config: {
        ...defaultConfigs,
        url: URL_GET_CATEGORIES,
      },
    },
    {
      config: { ...defaultConfigs, url: URL_GET_COURIERS },
    },
    {
      config: {
        ...defaultConfigs,
        url: URL_GET_UOM,
      },
    },
  ];

  // FUNCTIONS SPECIFIC //
  function handleGoBackDashboard() {
    navigate(
      `/dashboard?storeId=${storeId}&tab=${DASHBOARD_CATALOG}`
    );
  }

  function handleAddComponent(field, defaultValue) {
    const temp = { ...data };
    temp[field].push(defaultValue);
    setData(temp);
  }

  function handleTextChange(field, event) {
    const temp = { ...data };
    temp[field] = event.target.value;
    setData(temp);
  }

  function handleNumericChange(field, event) {
    const temp = { ...data };
    temp[field] = acceptNumericOnly(event.target.value);
    setData(temp);
  }

  function handleValueChange(field, value) {
    const temp = { ...data };
    temp[field] = value;
    setData(temp);
  }

  function handleCourierChange(value, index) {
    const temp = { ...data };
    temp.courierChoosen[index] = value;
    setData(temp);
  }

  function handleAddCatalogueError() {
    handleErrorMessage(
      { errorContent: INPUT_NEW_CATALOGUE_VALUE },
      setErrorMessage,
      setErrorModalToggle,
      errorModalToggle
    );
  }

  function handleOpenModalError() {
    handleOpenModal(setErrorModalToggle, errorModalToggle);
  }

  function handleOpenModalUpload() {
    handleOpenModal(
      setModalUploadToggle,
      modalUploadToggle
    );
  }

  function handleOpenModalAddCatalogue() {
    handleOpenModal(
      setModalCatalogueToggle,
      modalCatalogueToggle
    );
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
    if (array[index].responseData.result)
      temp = array[index].responseData.result;
    else temp = array[index].responseData;
    return temp.map((obj) => obj[property]);
  }

  function handleSetFetchedDatas(array) {
    let [fct, fcs, fcr, fuom] = [
      "catalogueName",
      "categoryName",
      "courierName",
      "uom",
    ].map((property, index) =>
      handleDropdownProperties(array, index, property)
    );

    let newFetchedDatas = {
      datas: {
        catalogues: array[0],
        categories: array[1],
        couriers: array[2],
        productUOM: array[3],
      },
      dropdowns: {
        catalogues: handleFetchedDataDropdowns(fct),
        categories: handleFetchedDataDropdowns(fcs),
        couriers: handleFetchedDataDropdowns(fcr),
        productUOM: handleFetchedDataDropdowns(fuom),
      },
    };

    setFetchedDatas(newFetchedDatas);
  }

  function handleAgreementCheck() {
    setAgreementCheckbox(!agreementCheckbox);
  }

  function handleCreateFormData() {
    const formData = new FormData();
    const formProductCategory =
      fetchedDatas.datas.categories.responseData.find(
        (val) => val.categoryName === data.productCategory
      );
    const formProductCatalogue =
      fetchedDatas.dropdowns.catalogues.find(
        (val) => val === data.productCatalogue
      );
    const formProductUOM =
      fetchedDatas.datas.productUOM.responseData.find(
        (val) => val.uom === data.productUOM
      );
    const formCourierChoosen = data.courierChoosen.reduce(
      (arr, obj) => {
        const addedCourier =
          fetchedDatas.datas.couriers.responseData.find(
            (val) => val.courierName === obj
          );
        if (addedCourier)
          arr.push(addedCourier.courierName);
        return arr;
      },
      []
    );
    const maxLengthUpload =
      productPictures.length >= additionalDocuments.length
        ? productPictures.length
        : additionalDocuments.length;

    formData.append("productName", data.productName);
    formData.append(
      "productCategory",
      JSON.stringify(formProductCategory)
    );
    formData.append(
      "productCatalogue",
      formProductCatalogue
    );
    formData.append(
      "productDescription",
      data.productDescription
    );
    formData.append("productHashtag", data.productHashtag);
    formData.append(
      "productCondition",
      data.productCondition
    );
    formData.append("productWeight", data.productWeight);
    formData.append(
      "productWeightUnit",
      data.productWeightUnit
    );
    formData.append("productPrice", data.productPrice);
    formData.append("productSKU", data.productSKU);
    formData.append("productStocks", data.productStocks);
    formData.append(
      "productSafetyStocks",
      data.productSafetyStocks
    );
    formData.append(
      "productUOM",
      JSON.stringify(formProductUOM)
    );
    formData.append(
      "courierChoosen",
      JSON.stringify(formCourierChoosen)
    );
    formData.append(
      "newCatalogues",
      JSON.stringify(
        fetchedDatas.datas.catalogues.responseData
      )
    );

    for (var i = 0; maxLengthUpload > i; i++) {
      if (productPictures[i])
        formData.append(
          UPLOADED_IMAGE_FILES,
          productPictures[i].blob,
          productPictures[i].name
        );
      if (additionalDocuments[i])
        formData.append(
          UPLOADED_ADDITIONAL_FILES,
          additionalDocuments[i].blob,
          additionalDocuments[i].name
        );
    }

    return formData;
  }

  async function handleSubmit() {
    // Validate the form submission
    if (!agreementCheckbox)
      return handleErrorMessage(
        { errorContent: AGREEMENT_CHECKBOX_UNCHECKED },
        setErrorMessage,
        setErrorModalToggle,
        errorModalToggle
      );

    // Process raw data and files to be sent via POST request
    const formData = handleCreateFormData();

    // Post data
    trackPromise(
      axiosService
        .postDataWithOnRequestInterceptors(
          {
            endpoint: process.env.REACT_APP_ZEUS_SERVICE,
            url: URL_POST_ADD_STORE_PRODUCT_CATALOGUE(
              storeId
            ),
            headers: {
              ...defaultConfigs.headers,
              [CONTENT_TYPE]: "multipart/form-data",
            },
            data: formData,
          },
          async () =>
            await authInterceptor(axiosService, cookies)
        )
        .then((res) => {
          if (res.responseStatus === 200) setSuccess(true);
        })
        .catch((error) => {
          if (error.responseStatus === 500)
            handleError500();
          if (
            error.responseStatus === 401 ||
            error.responseStatus === 403
          ) {
            cookies.remove(CLIENT_USER_INFO, { path: "/" });
            handleOpenOverridingHome(LOGIN);
          } else
            return handleErrorMessage(
              error,
              setErrorMessage,
              setErrorModalToggle,
              errorModalToggle
            );
        })
    );
  }

  useEffect(() => {
    trackPromise(
      (async () => {
        axiosService
          .getAllDataWithOnRequestInterceptors(endpoints)
          .then((result) => {
            if (result.responseStatus === 200) {
              login = cookies.get(CLIENT_USER_INFO);
              handleSetFetchedDatas(result.responseData);
            }
          })
          .catch((error) => {
            if (error.responseStatus === 500)
              handleError500();
            if (
              error.responseStatus === 401 ||
              error.responseStatus === 403
            ) {
              cookies.remove(CLIENT_USER_INFO, {
                path: "/",
              });
              handleOpenOverridingHome(LOGIN);
            } else
              handleErrorMessage(
                error,
                setErrorMessage,
                setErrorModalToggle,
                errorModalToggle
              );
          });
      })()
    );
  }, []);

  if (!IS_OTP_VERIFIED(login)) {
    // Executing asynchronous call for redirecting to home page
    handleOpenOverridingHome(LOGIN);
    // Placeholder message while redirecting to home page
    return (
      <PageLoading
        loadingMessage={LOGIN_PAGE_REDIRECTING_MESSAGE}
      />
    );
  }

  return (
    <Fragment>
      <Modal
        className="dark-bg-color"
        toggle={success}>
        <ShowSuccessModal
          handleGoBackDashboard={handleGoBackDashboard}
        />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalAddCatalogue}
        toggle={modalCatalogueToggle}>
        <ShowAddNewCatalogueModal
          fetchedDatas={fetchedDatas}
          setFetchedDatas={setFetchedDatas}
          handleOpenModalAddCatalogue={
            handleOpenModalAddCatalogue
          }
          handleAddCatalogueError={handleAddCatalogueError}
        />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalUpload}
        toggle={modalUploadToggle}>
        <ShowUploadModal
          handleOpenModalUpload={handleOpenModalUpload}
          productPictures={productPictures}
          setProductPictures={setProductPictures}
          rejectedProductPictures={rejectedProductPictures}
          setRejectedProductPictures={
            setRejectedProductPictures
          }
        />
      </Modal>
      <Modal
        className="dark-bg-color"
        clicked={handleOpenModalError}
        toggle={errorModalToggle}>
        <ShowErrorModal
          errorMessage={errorMessage}
          handleOpenModalError={handleOpenModalError}
        />
      </Modal>
      <div className="add-product-container">
        <div className="add-product-wrapper">
          <div className="add-product-text-container">
            <div className="add-product-text-wrapper">
              <div className="breakline" />
              <Button
                style={{ paddingLeft: "0px" }}
                onClick={() =>
                  handleGoBackDashboard(navigate)
                }
                className="align-self-start add-product-button darker-bg-color">
                <h4 className="add-product-button-back-text">
                  Go back
                </h4>
              </Button>
              <h3 className="margin-bottom-12-18">
                Ayo beri tahu kami{" "}
                <span className="main-color">
                  informasi produkmu
                </span>
              </h3>
              <label className="margin-top-0">
                Kita mulai dari{" "}
                <span className="main-color">nama</span>{" "}
                produkmu dulu yuk !
              </label>
              <div className="add-product-textinput-box">
                <TextInput
                  value={data.productName}
                  onChange={(e) =>
                    handleTextChange("productName", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-12-18">
                Produkmu masuk kedalam{" "}
                <span className="main-color">kategori</span>{" "}
                apa ?
              </label>
              <div className="add-product-textinput-box margin-top-0">
                <Dropdown
                  onChange={(value) =>
                    handleValueChange(
                      "productCategory",
                      value
                    )
                  }
                  style={{
                    marginRight: "8px",
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.productCategory}
                  values={fetchedDatas.dropdowns.categories}
                />
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-12-18">
                Kamu harus memasukan{" "}
                <span className="main-color">produkmu</span>{" "}
                sesuai dengan{" "}
                <span className="main-color">katalog</span>{" "}
                yang kamu inginkan
              </label>
              <div className="add-product-textinput-box margin-top-0">
                <Dropdown
                  onChange={(value) =>
                    handleValueChange(
                      "productCatalogue",
                      value
                    )
                  }
                  style={{
                    marginRight: "8px",
                    width: "150px",
                    maxWidth: "150px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.productCatalogue}
                  values={fetchedDatas.dropdowns.catalogues}
                />
                <Button
                  onClick={() =>
                    handleOpenModal(
                      setModalCatalogueToggle,
                      modalCatalogueToggle
                    )
                  }
                  className="margin-top-0 align-self-end add-product-button main-bg-color">
                  <h4 className="add-product-button-text">
                    +
                  </h4>
                </Button>
              </div>
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-0">
                Upload{" "}
                <span className="main-color">foto</span>{" "}
                produkmu{" "}
                <span className="main-color">disini</span>{" "}
                ya
              </label>
              <AcceptedFileItems
                uniqueKey="product-image-upload"
                files={productPictures}
                setFiles={setProductPictures}
              />
              <FileRejectionItems
                rejected={rejectedProductPictures}
              />
              <div className="add-product-textinput-box margin-top-0">
                <Button
                  onClick={handleOpenModalUpload}
                  className="align-self-end add-product-button main-bg-color">
                  <h4 className="add-product-button-text">
                    +
                  </h4>
                </Button>
              </div>
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">
                  detail produk
                </span>
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Selanjutnya kasih tau kita dulu yuk{" "}
                <span className="main-color">detail</span>{" "}
                informasi produkmu
              </label>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  Deskripsi
                </label>
                <TextArea
                  className="add-product-longtext-area"
                  value={data.productDescription}
                  onChange={(e) =>
                    handleTextChange(
                      "productDescription",
                      e
                    )
                  }
                  type="text"
                />
              </div>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  Hashtag
                </label>
                <TextInput
                  value={data.productHashtag}
                  onChange={(e) =>
                    handleTextChange("productHashtag", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-12-18">
                Kondisi{" "}
                <span className="main-color">fisik</span>{" "}
                produkmu gimana nih sekarang ?
              </label>
              <div className="add-product-textinput-box">
                <TextInput
                  value={data.productCondition}
                  onChange={(e) =>
                    handleTextChange("productCondition", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="breakline" />
              <label className="margin-top-0 margin-bottom-12-18">
                Kalau{" "}
                <span className="main-color">berat</span>{" "}
                produkmu ?
              </label>
              <div className="add-product-textinput-box">
                <TextInput
                  value={formattedNumber(
                    data.productWeight
                  )}
                  onChange={(e) =>
                    handleNumericChange("productWeight", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
                <Dropdown
                  onChange={(value) =>
                    handleValueChange(
                      "productWeightUnit",
                      value
                    )
                  }
                  style={{
                    width: "fit-content",
                    marginLeft: "8px",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.productWeightUnit}
                  values={ADD_CATALOGUE_WEIGHTUNIT_OPTIONS}
                />
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">harga</span>
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Kira-kira{" "}
                <span className="main-color">harga</span>{" "}
                produkmu berapa nih ?
              </label>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  Rp.
                </label>
                <TextInput
                  value={formattedNumber(data.productPrice)}
                  onChange={(e) =>
                    handleNumericChange("productPrice", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">stok</span>{" "}
                produk
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Sekarang kita atur{" "}
                <span className="main-color">stok</span>{" "}
                barang yang kamu lelang
              </label>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  SKU (opsional)
                </label>
                <TextInput
                  value={data.productSKU}
                  onChange={(e) =>
                    handleTextChange("productSKU", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  Stok
                </label>
                <TextInput
                  value={formattedNumber(
                    data.productStocks
                  )}
                  onChange={(e) =>
                    handleNumericChange("productStocks", e)
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  Safety Stok
                </label>
                <TextInput
                  value={formattedNumber(
                    data.productSafetyStocks
                  )}
                  onChange={(e) =>
                    handleNumericChange(
                      "productSafetyStocks",
                      e
                    )
                  }
                  type="text"
                  className="add-product-textinput"
                />
              </div>
              <div className="add-product-textinput-box">
                <label className="add-product-input-title">
                  Satuan
                </label>
                <Dropdown
                  onChange={(value) =>
                    handleValueChange("productUOM", value)
                  }
                  style={{
                    width: "fit-content",
                  }}
                  showTitle={false}
                  toggle={true}
                  value={data.productUOM}
                  values={fetchedDatas.dropdowns.productUOM}
                />
              </div>
              <div className="breakline" />
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">kurir</span>{" "}
                pengantaran
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Kira-kira kurir mana nih yang boleh{" "}
                <span className="main-color">
                  nganterin
                </span>{" "}
                produkmu ke pemenang lelang ?
              </label>
              {data.courierChoosen.map((val, index) => {
                return (
                  <div
                    key={`add-product-product-courier-${index}`}
                    className="add-product-textinput-box">
                    <label className="add-product-input-title">
                      Pilih Kurir {index + 1}
                    </label>
                    <Dropdown
                      style={{
                        width: "75px",
                        maxWidth: "75px",
                      }}
                      onChange={(value) =>
                        handleCourierChange(value, index)
                      }
                      showTitle={false}
                      toggle={true}
                      value={
                        val ||
                        ADD_CATALOGUE_INITIAL_COURIER_VALUE
                      }
                      values={
                        fetchedDatas.dropdowns.couriers
                      }
                    />
                  </div>
                );
              })}
              <Button
                onClick={() =>
                  handleAddComponent("courierChoosen", null)
                }
                className="align-self-end add-product-button main-bg-color">
                <h4 className="add-product-button-text">
                  +
                </h4>
              </Button>
              <div className="breakline" />
              <div className="breakline" />
              <h3 className="margin-bottom-12-18">
                Upload{" "}
                <span className="main-color">
                  file tambahan
                </span>
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Ini juga gak kalah penting nih, kamu bisa
                upload{" "}
                <span className="main-color">
                  file tambahan
                </span>{" "}
                untuk mendukung data informasi produkmu{" "}
                <span className="main-color">
                  (opsional)
                </span>
              </label>
              <MultiUpload
                formName={ADD_CATALOGUE_FORM}
                customIcon={AgreementIcon}
                files={additionalDocuments}
                setFiles={setAdditionalDocuments}
                rejected={rejectedAdditionalDocuments}
                setRejected={setRejectedAdditionalDocuments}
                maxLength={5}
                maxSize={5 * 1000 * 1000} //5mb
                extensions={PDF}
                label={GENERAL_MULTIUPLOAD_LABEL}
                subLabel={GENERAL_MULTIUPLOAD_SUBLABEL(PDF)}
                additionalElement={
                  <span className="red-color">
                    MAX 5 FILE
                  </span>
                }
              />
              <div className="breakline" />
              <div className="breakline" />
              <div className="add-product-textinput-box">
                <Checkbox
                  checked={agreementCheckbox}
                  onChange={() => handleAgreementCheck()}
                  className="dashboard-chat-checkbox-item"
                  title={
                    "Dengan menyontreng ini, kamu telah membaca dan menyetujui syarat dan ketentuan yang berlaku"
                  }
                />
              </div>
              <Button
                onClick={() => handleSubmit()}
                className="align-self-start add-product-button main-bg-color">
                <p className="add-product-button-text">
                  Submit
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
