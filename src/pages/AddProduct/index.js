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
  defaultCourier,
  initialValue,
  initialFetchedDatas,
  weightList,
} from "../../variables/initial/catalogue";
import {
  ADD_CATALOGUE_FORM,
  AUTHORIZATION,
  CLIENT_USER_INFO,
  CONTENT_TYPE,
  GENERAL_MULTIUPLOAD_LABEL,
  GENERAL_MULTIUPLOAD_SUBLABEL,
  IS_OTP_VERIFIED,
  LOGIN,
  NO_DATA,
  PDF,
  URL_GET_CATALOGUE_DATA,
  URL_GET_CATEGORIES,
  URL_GET_COURIERS,
  URL_POST_ADD_STORE_PRODUCT_CATALOGUE,
  X_SID,
} from "../../variables/global";
import AgreementIcon from "../../assets/svg/agreement-icon.svg";
import "./style.scss";
import Checkbox from "../../components/Checkbox";
import { useAxios } from "../../utils/hooks/useAxios";
import { checkAuthAndRefresh } from "../../utils/functions/middlewares";
import {
  acceptNumericOnly,
  b64toBlob,
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
import { PAGE_REDIRECTING_MESSAGE } from "../../variables/errorMessages/dashboard";
import {
  ShowAddNewCatalogueModal,
  ShowErrorModal,
  ShowSuccessModal,
  ShowUploadModal,
} from "./ModularComponents/ShowModals";

// TODO: Fix input lag caused by uploaded file re rendered
export default function AddProduct() {
  // HOOK
  const navigate = useNavigate();
  const zeusService = useAxios();
  const [data, setData] = useState(initialValue);
  const [fetchedDatas, setFetchedDatas] = useState(
    initialFetchedDatas
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
  const [searchParams, setSearchParams] = useSearchParams();

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
      ...defaultConfigs,
      url: URL_GET_CATALOGUE_DATA({
        storeId: storeId,
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
  function handleGoBackDashboard() {
    navigate(`/dashboard`);
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

  function handleSetFetchedDatas(array) {
    let newFetchedDatas = { ...fetchedDatas };
    let fetchedCatalogues =
      array[0].responseData.result.map(
        (obj) => obj.catalogueName
      );
    let fetchedCategories = array[1].responseData.map(
      (obj) => obj.categoryName
    );
    let fetchedCouriers = array[2].responseData.map(
      (obj) => obj.courierName
    );

    newFetchedDatas = {
      datas: {
        catalogues: array[0],
        categories: array[1],
        couriers: array[2],
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
  }

  function handleAgreementCheck() {
    setAgreementCheckbox(!agreementCheckbox);
  }

  function handleCreateFormData() {
    const formData = new FormData();
    const formProductCategory =
      fetchedDatas.datas.categories.responseData.filter(
        (val) => val.categoryName === data.productCategory
      )[0];
    const formProductCatalog =
      fetchedDatas.dropdowns.catalogues.filter(
        (val) => val === data.productCatalog
      )[0];

    formData.append("productName", data.productName);
    formData.append(
      "productCategory",
      JSON.stringify(formProductCategory)
    );
    formData.append("productCatalog", formProductCatalog);
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
    formData.append("productStocks", data.productStocks);
    formData.append(
      "productSafetyStocks",
      data.productSafetyStocks
    );
    formData.append(
      "courierChoosen",
      JSON.stringify(data.courierChoosen)
    );
    formData.append(
      "newCatalogues",
      JSON.stringify(
        fetchedDatas.datas.catalogues.responseData
      )
    );

    const maxLengthUpload =
      productPictures.length >= additionalDocuments.length
        ? productPictures.length
        : additionalDocuments.length;

    for (var i = 0; maxLengthUpload > i; i++) {
      productPictures[i] &&
        formData.append(
          "uploadedImageFiles",
          b64toBlob(productPictures[i].base64),
          productPictures[i].name
        );
      additionalDocuments[i] &&
        formData.append(
          "uploadedAdditionalFiles",
          b64toBlob(additionalDocuments[i].base64),
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

    // Process raw data and base64s to be sent via POST request
    const formData = handleCreateFormData();

    // Post data
    trackPromise(
      zeusService
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
          async () => {
            const result = await checkAuthAndRefresh(
              zeusService,
              cookies
            );

            return result;
          }
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
    async function init() {
      trackPromise(
        zeusService
          .getAllDataWithOnRequestInterceptors(
            endpoints,
            async () => {
              const result = await checkAuthAndRefresh(
                zeusService,
                cookies
              );
              if (result.responseStatus === 200)
                login = cookies.get(CLIENT_USER_INFO);
              return result;
            }
          )
          .then((result) => {
            if (result.responseStatus === 200)
              handleSetFetchedDatas(result.responseData);
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
          })
      );
    }
    trackPromise(init());
  }, []);

  if (!IS_OTP_VERIFIED(login))
    (() => {
      // Executing asynchronous call for redirecting to home page
      handleOpenOverridingHome(LOGIN);
      // Placeholder message while redirecting to home page
      return (
        <PageLoading
          loadingMessage={PAGE_REDIRECTING_MESSAGE}
        />
      );
    })();

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
          title="Katalog"
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
      <div className="add-catalogue-container">
        <div className="add-catalogue-wrapper">
          <div className="add-catalogue-text-container">
            <div className="add-catalogue-text-wrapper">
              <br />
              <Button
                style={{ paddingLeft: "0px" }}
                onClick={() =>
                  handleGoBackDashboard(navigate)
                }
                className="align-self-start add-catalogue-button darker-bg-color">
                <h4 className="add-catalogue-button-back-text">
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
              <div className="add-catalogue-textinput-box">
                <TextInput
                  value={data.productName}
                  onChange={(e) =>
                    handleTextChange("productName", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <br />
              <label className="margin-top-0 margin-bottom-12-18">
                Produkmu masuk kedalam{" "}
                <span className="main-color">kategori</span>{" "}
                apa ?
              </label>
              <div className="add-catalogue-textinput-box margin-top-0">
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
              <br />
              <br />
              <label className="margin-top-0 margin-bottom-12-18">
                Kamu harus memasukan{" "}
                <span className="main-color">produkmu</span>{" "}
                sesuai dengan{" "}
                <span className="main-color">katalog</span>{" "}
                yang kamu inginkan
              </label>
              <div className="add-catalogue-textinput-box margin-top-0">
                <Dropdown
                  onChange={(value) =>
                    handleValueChange(
                      "productCatalog",
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
                  value={data.productCatalog}
                  values={fetchedDatas.dropdowns.catalogues}
                />
                <Button
                  onClick={() =>
                    handleOpenModal(
                      setModalCatalogueToggle,
                      modalCatalogueToggle
                    )
                  }
                  className="margin-top-0 align-self-end add-catalogue-button main-bg-color">
                  <h4 className="add-catalogue-button-text">
                    +
                  </h4>
                </Button>
              </div>
              <br />
              <label className="margin-top-0 margin-bottom-0">
                Upload{" "}
                <span className="main-color">foto</span>{" "}
                produkmu{" "}
                <span className="main-color">disini</span>{" "}
                ya
              </label>
              <AcceptedFileItems
                base64s={productPictures}
                setBase64s={setProductPictures}
              />
              <FileRejectionItems
                rejected={rejectedProductPictures}
              />
              <div className="add-catalogue-textinput-box margin-top-0">
                <Button
                  onClick={handleOpenModalUpload}
                  className="align-self-end add-catalogue-button main-bg-color">
                  <h4 className="add-catalogue-button-text">
                    +
                  </h4>
                </Button>
              </div>
              <br />
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
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Deskripsi
                </label>
                <TextArea
                  className="add-catalogue-longtext-area"
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
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Hashtag
                </label>
                <TextInput
                  value={data.productHashtag}
                  onChange={(e) =>
                    handleTextChange("productHashtag", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <label className="margin-top-0 margin-bottom-12-18">
                Kondisi{" "}
                <span className="main-color">fisik</span>{" "}
                produkmu gimana nih sekarang ?
              </label>
              <div className="add-catalogue-textinput-box">
                <TextInput
                  value={data.productCondition}
                  onChange={(e) =>
                    handleTextChange("productCondition", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <label className="margin-top-0 margin-bottom-12-18">
                Kalau{" "}
                <span className="main-color">berat</span>{" "}
                produkmu ?
              </label>
              <div className="add-catalogue-textinput-box">
                <TextInput
                  value={formattedNumber(
                    data.productWeight
                  )}
                  onChange={(e) =>
                    handleNumericChange("productWeight", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
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
                  values={weightList}
                />
              </div>
              <br />
              <br />
              <h3 className="margin-bottom-12-18">
                Atur{" "}
                <span className="main-color">harga</span>
              </h3>
              <label className="margin-top-0 margin-bottom-12-18">
                Kira-kira{" "}
                <span className="main-color">harga</span>{" "}
                produkmu berapa nih ?
              </label>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
                  Rp.
                </label>
                <TextInput
                  value={formattedNumber(data.productPrice)}
                  onChange={(e) =>
                    handleNumericChange("productPrice", e)
                  }
                  type="text"
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
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
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
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
                  className="add-catalogue-textinput"
                />
              </div>
              <div className="add-catalogue-textinput-box">
                <label className="add-catalogue-input-title">
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
                  className="add-catalogue-textinput"
                />
              </div>
              <br />
              <br />
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
                    key={`add-catalogue-product-courier-${index}`}
                    className="add-catalogue-textinput-box">
                    <label className="add-catalogue-input-title">
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
                      value={val}
                      values={
                        fetchedDatas.dropdowns.couriers
                      }
                    />
                  </div>
                );
              })}
              <Button
                onClick={() =>
                  handleAddComponent(
                    "courierChoosen",
                    defaultCourier
                  )
                }
                className="align-self-end add-catalogue-button main-bg-color">
                <h4 className="add-catalogue-button-text">
                  +
                </h4>
              </Button>
              <br />
              <br />
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
                base64s={additionalDocuments}
                setBase64s={setAdditionalDocuments}
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
              <br />
              <br />
              <div className="add-catalogue-textinput-box">
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
                className="align-self-start add-catalogue-button main-bg-color">
                <label className="font-bold add-catalogue-button-text">
                  Submit
                </label>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
